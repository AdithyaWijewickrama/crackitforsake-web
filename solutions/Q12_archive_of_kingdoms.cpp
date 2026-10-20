/*
Q12 - The Archive of Kingdoms

PROBLEM
  Versioned array. "C V P X" makes a new version = version V with A[P] = X.
  "Q V L R K" asks for the K-th smallest value in A[L..R] of version V.
  N, Q <= 150000, values up to 1e9. Offline processing is explicitly allowed.

KEY INSIGHT 1 - the versions form a tree
  Every version (except 0) has exactly one parent V and differs from it in exactly
  one cell. So the versions form a rooted tree with version 0 as the root.
  If we walk this tree with a DFS and keep ONE live array:
    - going down the edge parent -> child: apply A[P] = X
    - going back up: restore the old value
  then, while we stand at a version, the live array IS that version. Every query
  on version v is answered while the DFS stands at v.
  This turns the persistent problem into an ordinary sequence of
    "point change" and "range K-th smallest" operations, in DFS order.
  The sequence has at most N + 4*C + (#queries) operations (each edge = remove old,
  add new on the way down; remove new, add old on the way up).

KEY INSIGHT 2 - range K-th with point changes, offline = overall binary search
  Write each point change as two events: (pos, oldValue, -1) and (pos, newValue, +1).
  Initial array = N events (i, A[i], +1).
  Now compress all values. solve(lo, hi, events) knows that every query in
  'events' has its answer inside compressed range [lo, hi]. Let mid = (lo+hi)/2.
  Scan events in time order with a Fenwick tree over positions:
    - an update with value <= mid: add its sign at pos in the BIT, send it LEFT;
      an update with value > mid: send it RIGHT (it can only matter there).
    - a query: cnt = number of live values <= mid in [L, R] (BIT range sum).
      If K <= cnt the answer is <= mid -> send LEFT.
      Otherwise the answer is > mid -> K -= cnt, send RIGHT.
  Undo the BIT additions, then recurse on both halves (relative order is kept,
  so time order is still correct inside each half).
  When lo == hi every query in the group has answer = value[lo].

WHY "K -= cnt" IS CORRECT
  On the right side we ignore all values <= mid. Exactly cnt of them were inside
  [L, R] at the moment of the query, so the K-th smallest overall is the
  (K - cnt)-th smallest among the values > mid.

WHY THE DFS IS ITERATIVE
  The version tree can be a chain of 150000 versions; a recursive DFS could
  overflow the stack. An explicit stack with an "enter/exit" flag is used.

SAMPLE 0 WALKTHROUGH
  A = [10 20 30 40 50]
  Q 0 1 5 3 -> sorted 10 20 30 40 50 -> 30
  v1 = v0 with A[3]=5  -> [10 20 5 40 50],  Q 1 1 5 3 -> 5 10 20 40 50 -> 20
  v2 = v0 with A[1]=100-> [100 20 30 40 50], Q 2 1 3 2 -> 20 30 100 -> 30
  v3 = v1 with A[2]=1  -> [10 1 5 40 50],   Q 3 1 3 2 -> 1 5 10 -> 5
  Output: 30 20 30 5

COMPLEXITY
  E = N + 4C + Qq <= 750000 events, D = #distinct values <= 300000.
  Overall binary search: O(E log D log N) time, O(E) memory.

VIVA NOTES
  - Why not a persistent segment tree? The usual "persistent tree over prefixes"
    trick answers K-th in a range of a FIXED array; here each version changes the
    array, so prefixes differ per version. The version tree + offline trick avoids it.
  - Equal values are counted separately automatically: the BIT counts multiplicity.
  - Output is only the answers, one per line (HackerRank compares with a file).
*/
#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;

struct Ev { int t, a, b, c, d; };

int n;
vector<int> bit, vals, ans;
vector<Ev> ev, tmp;
vector<char> goLeft;

void add(int i, int v) { for (; i <= n; i += i & -i) bit[i] += v; }
int sum(int i) { int s = 0; for (; i > 0; i -= i & -i) s += bit[i]; return s; }

void solve(int lo, int hi, int L, int R) {
    if (L > R) return;
    if (lo == hi) {
        for (int i = L; i <= R; i++) if (ev[i].t == 1) ans[ev[i].d] = vals[lo];
        return;
    }
    int mid = (lo + hi) / 2;
    for (int i = L; i <= R; i++) {
        Ev &e = ev[i];
        if (e.t == 0) {
            goLeft[i] = e.c <= mid;
            if (goLeft[i]) add(e.a, e.d);
        } else {
            int cnt = sum(e.b) - sum(e.a - 1);
            if (e.c <= cnt) goLeft[i] = 1;
            else { goLeft[i] = 0; e.c -= cnt; }
        }
    }
    for (int i = L; i <= R; i++) if (ev[i].t == 0 && goLeft[i]) add(ev[i].a, -ev[i].d);
    int k = L;
    for (int i = L; i <= R; i++) if (goLeft[i]) tmp[k++] = ev[i];
    int m = k;
    for (int i = L; i <= R; i++) if (!goLeft[i]) tmp[k++] = ev[i];
    for (int i = L; i <= R; i++) ev[i] = tmp[i];
    solve(lo, mid, L, m - 1);
    solve(mid + 1, hi, m, R);
}

int main() {
    int q;
    if (scanf("%d %d", &n, &q) != 2) return 0;
    vector<int> A(n + 1);
    for (int i = 1; i <= n; i++) scanf("%d", &A[i]);
    vector<int> par(1, -1), cp(1, 0), cx(1, 0);
    vector<vector<int> > qs(1);
    vector<int> QL, QR, QK;
    for (int i = 0; i < q; i++) {
        char op[4];
        scanf("%s", op);
        if (op[0] == 'C') {
            int v, p, x;
            scanf("%d %d %d", &v, &p, &x);
            par.push_back(v); cp.push_back(p); cx.push_back(x);
            qs.push_back(vector<int>());
        } else {
            int v, l, r, kk;
            scanf("%d %d %d %d", &v, &l, &r, &kk);
            qs[v].push_back((int)QL.size());
            QL.push_back(l); QR.push_back(r); QK.push_back(kk);
        }
    }
    int V = par.size(), nq = QL.size();
    if (nq == 0) return 0;

    vals.assign(A.begin() + 1, A.end());
    for (int i = 1; i < V; i++) vals.push_back(cx[i]);
    sort(vals.begin(), vals.end());
    vals.erase(unique(vals.begin(), vals.end()), vals.end());
    int D = vals.size();
    vector<int> cA(n + 1), cX(V, 0);
    for (int i = 1; i <= n; i++) cA[i] = lower_bound(vals.begin(), vals.end(), A[i]) - vals.begin();
    for (int i = 1; i < V; i++) cX[i] = lower_bound(vals.begin(), vals.end(), cx[i]) - vals.begin();

    vector<int> head(V, -1), nxt(V, -1);
    for (int i = V - 1; i >= 1; i--) { nxt[i] = head[par[i]]; head[par[i]] = i; }

    for (int i = 1; i <= n; i++) { Ev e = {0, i, 0, cA[i], 1}; ev.push_back(e); }
    vector<int> cur(cA), saved(V, 0);
    vector<int> st;
    st.push_back(0);
    vector<char> entered(V, 0);
    while (!st.empty()) {
        int v = st.back();
        if (!entered[v]) {
            entered[v] = 1;
            if (v > 0) {
                int p = cp[v];
                saved[v] = cur[p];
                if (saved[v] != cX[v]) {
                    Ev e1 = {0, p, 0, saved[v], -1}; ev.push_back(e1);
                    Ev e2 = {0, p, 0, cX[v], 1}; ev.push_back(e2);
                    cur[p] = cX[v];
                }
            }
            for (size_t j = 0; j < qs[v].size(); j++) {
                int id = qs[v][j];
                Ev e = {1, QL[id], QR[id], QK[id], id};
                ev.push_back(e);
            }
            for (int c = head[v]; c != -1; c = nxt[c]) st.push_back(c);
        } else {
            st.pop_back();
            if (v > 0) {
                int p = cp[v];
                if (saved[v] != cX[v]) {
                    Ev e1 = {0, p, 0, cX[v], -1}; ev.push_back(e1);
                    Ev e2 = {0, p, 0, saved[v], 1}; ev.push_back(e2);
                    cur[p] = saved[v];
                }
            }
        }
    }

    bit.assign(n + 1, 0);
    ans.assign(nq, 0);
    tmp.resize(ev.size());
    goLeft.assign(ev.size(), 0);
    solve(0, D - 1, 0, (int)ev.size() - 1);
    for (int i = 0; i < nq; i++) printf("%d\n", ans[i]);
    return 0;
}
