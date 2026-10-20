/*
PROBLEM: Agent Jurisdiction + Strict Domination (two-phase)

WHAT IT ASKS
  Phase 1: for each agent i, find the widest segment [Li, Ri] containing i in which
           Ei is the maximum.  Print H = sum(i * Li * Ri) mod 1e9+7, flush.
  Phase 2: after the judge answers 1, count pairs (u, v) with v in [Lu, Ru],
           Xu < Xv and Yu < Yv  (v != u is automatic because of the strict "<").

PHASE 1 - MONOTONIC STACK, O(N)
  Li - 1 = index of the nearest agent to the LEFT with a bigger E (0 if none).
  Ri + 1 = index of the nearest agent to the RIGHT with a bigger E (N+1 if none).
  Walk left->right keeping a stack of indices whose E values decrease. Before pushing i,
  pop everything with a smaller E: the element left on top is i's previous greater.
  Do the same right->left for the next greater.
  Each index is pushed and popped once, so this is O(N).

PHASE 2 - 3D DOMINANCE COUNTING (CDQ divide & conquer), O(N log^2 N)
  For each u we need  #{ v : Lu <= v <= Ru, Xv > Xu, Yv > Yu }.
  Split the index range into two prefixes:
      count(v <= Ru) - count(v <= Lu-1)
  Each prefix query asks for points with index <= p, X > x, Y > y. That's a
  3-dimensional dominance query, solved offline with CDQ:
    * Events: N points (index i, Xi, Yi) and up to 2N queries (p, Xu, Yu, sign +/-1).
    * Sort events by index (time); at equal index, points come before queries
      (because the prefix includes index p itself).
    * CDQ(lo, hi): solve both halves recursively, then add what the LEFT half's
      points contribute to the RIGHT half's queries (left points have smaller index,
      so the index condition is already satisfied). For that cross step:
        - sort the left points and right queries by X DESCENDING,
          with queries first on equal X (we need X strictly greater),
        - point: add 1 to a Fenwick tree (BIT) at its compressed Y,
        - query: ans += sign * (#inserted with Y > y) = inserted - prefix(y),
        - undo the BIT insertions afterwards.
  Every (point, query) pair with point index <= query index is handled at exactly
  one CDQ level, so each one is counted exactly once.

WHY NOT BRUTE FORCE
  The segments can be huge (e.g. sorted E means agent N owns the whole array), so
  summing segment sizes is O(N^2) = 10^10 for N = 1e5. Too slow.

SAMPLE WALKTHROUGH (E = 10 20 15 5 25)
  [L,R] = [1,1] [1,4] [3,4] [4,4] [1,5]
  H = 1*1*1 + 2*1*4 + 3*3*4 + 4*4*4 + 5*1*5 = 1+8+36+64+25 = 134
  Domination: u=2 (2,2) beats agents 1,3,4 -> 3 ; u=3 (6,6) beats 4 -> 1 ;
              u=5 (1,1) beats 1,2,3,4 -> 4 ; total = 8

COMPLEXITY
  Phase 1 O(N). Phase 2 O(N log^2 N) time, O(N) memory.
  The pair count can be ~5e9, so use long long and apply the mod at the end.

VIVA NOTES
  - Jurisdiction = previous/next greater element, computed with a monotonic stack.
  - A range count turns into two prefix counts, giving 3D dominance (index, X, Y),
    which CDQ handles: divide on index, sort on X, BIT on Y.
  - Strict inequalities: on equal X, queries go before points; on Y we count
    "> y" as total - prefix(y).
*/
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;

struct Ev {
    int t, x, y;  // index (time), X, compressed Y
    int isQuery;  // 0 = point, 1 = query
    int sign;     // +1 / -1 for queries
};

int n, m;              // m = number of distinct Y values
vector<int> bit;
vector<Ev> ev;
long long total = 0;

void bitAdd(int i, int v) { for (; i <= m; i += i & -i) bit[i] += v; }
int bitSum(int i) { int s = 0; for (; i > 0; i -= i & -i) s += bit[i]; return s; }

void cdq(int lo, int hi) {  // half-open [lo, hi)
    if (hi - lo <= 1) return;
    int mid = (lo + hi) / 2;
    cdq(lo, mid);
    cdq(mid, hi);

    vector<Ev> cur;
    for (int i = lo; i < mid; i++) if (!ev[i].isQuery) cur.push_back(ev[i]);
    for (int i = mid; i < hi; i++) if (ev[i].isQuery) cur.push_back(ev[i]);
    if (cur.empty()) return;

    // X descending; on equal X, queries first (need strictly greater X)
    sort(cur.begin(), cur.end(), [](const Ev& a, const Ev& b) {
        if (a.x != b.x) return a.x > b.x;
        return a.isQuery > b.isQuery;
    });

    int inserted = 0;
    for (size_t k = 0; k < cur.size(); k++) {
        if (!cur[k].isQuery) { bitAdd(cur[k].y, 1); inserted++; }
        else total += (long long)cur[k].sign * (inserted - bitSum(cur[k].y));  // count Y > y
    }
    for (size_t k = 0; k < cur.size(); k++)
        if (!cur[k].isQuery) bitAdd(cur[k].y, -1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    if (!(cin >> n)) return 0;
    vector<long long> E(n + 1);
    vector<int> X(n + 1), Y(n + 1);
    for (int i = 1; i <= n; i++) cin >> E[i] >> X[i] >> Y[i];

    // ---- Phase 1: previous / next greater with a monotonic stack ----
    vector<int> L(n + 1), R(n + 1), st;
    for (int i = 1; i <= n; i++) {
        while (!st.empty() && E[st.back()] < E[i]) st.pop_back();
        L[i] = st.empty() ? 1 : st.back() + 1;
        st.push_back(i);
    }
    st.clear();
    for (int i = n; i >= 1; i--) {
        while (!st.empty() && E[st.back()] < E[i]) st.pop_back();
        R[i] = st.empty() ? n : st.back() - 1;
        st.push_back(i);
    }

    long long H = 0;
    for (int i = 1; i <= n; i++)
        H = (H + (long long)i % MOD * L[i] % MOD * R[i]) % MOD;
    cout << H << endl;  // endl flushes, as Phase 1 requires

    int resp;
    if (cin >> resp && resp != 1) return 0;  // judge rejected the hash

    // ---- Phase 2: CDQ 3D dominance ----
    vector<int> ys(Y.begin() + 1, Y.end());
    sort(ys.begin(), ys.end());
    ys.erase(unique(ys.begin(), ys.end()), ys.end());
    m = ys.size();
    bit.assign(m + 1, 0);
    vector<int> cy(n + 1);
    for (int i = 1; i <= n; i++)
        cy[i] = lower_bound(ys.begin(), ys.end(), Y[i]) - ys.begin() + 1;

    ev.reserve(3 * n);
    for (int i = 1; i <= n; i++) {
        Ev p = {i, X[i], cy[i], 0, 0};
        ev.push_back(p);
        Ev q1 = {R[i], X[i], cy[i], 1, +1};
        ev.push_back(q1);
        if (L[i] > 1) { Ev q2 = {L[i] - 1, X[i], cy[i], 1, -1}; ev.push_back(q2); }
    }
    // time ascending; at equal time, points before queries (prefix includes p)
    sort(ev.begin(), ev.end(), [](const Ev& a, const Ev& b) {
        if (a.t != b.t) return a.t < b.t;
        return a.isQuery < b.isQuery;
    });

    cdq(0, ev.size());
    cout << (total % MOD + MOD) % MOD << endl;
    return 0;
}
