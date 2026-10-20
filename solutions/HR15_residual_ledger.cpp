#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll MOD = 1000000007LL;
const ll INF = 1000000000000000000LL; // cost of x[0]=1 (forces x[0]=0)

int n, q, m;
vector<int> par_, dpar, sz_;
vector<ll> A, B;      // A: cost if root=0, B: cost if root=1
ll S; int E, bad;     // S = sum of min(A,B); E = #components with A==B

struct Rec { int rc, rr; ll oa, ob; int type; };
vector<Rec> st;

inline int findp(int x, int &p) {
    p = 0;
    while (par_[x] != x) { p ^= dpar[x]; x = par_[x]; }
    return x;
}
inline void rem(int r) { S -= min(A[r], B[r]); E -= (A[r] == B[r]); }
inline void addc(int r) { S += min(A[r], B[r]); E += (A[r] == B[r]); }

void unite(int u, int v, int b) {
    int pu, pv;
    int ru = findp(u, pu), rv = findp(v, pv);
    if (ru == rv) { if ((pu ^ pv) != b) bad++; return; }
    if (sz_[ru] < sz_[rv]) swap(ru, rv);
    int d = b ^ pu ^ pv;
    rem(ru); rem(rv);
    st.push_back({rv, ru, A[ru], B[ru], 0});
    par_[rv] = ru; dpar[rv] = d; sz_[ru] += sz_[rv];
    if (d == 0) { A[ru] += A[rv]; B[ru] += B[rv]; }
    else { ll na = A[ru] + B[rv], nb = B[ru] + A[rv]; A[ru] = na; B[ru] = nb; }
    addc(ru);
}
void addCost(int i, ll a, ll b) {
    int p; int r = findp(i, p);
    rem(r);
    st.push_back({r, 0, A[r], B[r], 1});
    if (p == 0) { A[r] += a; B[r] += b; } else { A[r] += b; B[r] += a; }
    addc(r);
}
void undoTo(size_t sp) {
    while (st.size() > sp) {
        Rec r = st.back(); st.pop_back();
        if (r.type == 0) {
            par_[r.rc] = r.rc; dpar[r.rc] = 0; sz_[r.rr] -= sz_[r.rc];
            A[r.rr] = r.oa; B[r.rr] = r.ob;
        } else { A[r.rc] = r.oa; B[r.rc] = r.ob; }
    }
}

// segment tree with linked lists of entries
vector<int> headE, headC, nxtE, valE, nxtC, valC;
vector<int> eu, ev, eb;
vector<ll> ca, cb; vector<int> ci;

void ins(vector<int> &head, vector<int> &nxt, vector<int> &val, int node, int l, int r, int ql, int qr, int idx) {
    if (ql > r || qr < l) return;
    if (ql <= l && r <= qr) { val.push_back(idx); nxt.push_back(head[node]); head[node] = (int)val.size() - 1; return; }
    int mid = (l + r) / 2;
    ins(head, nxt, val, node * 2, l, mid, ql, qr, idx);
    ins(head, nxt, val, node * 2 + 1, mid + 1, r, ql, qr, idx);
}

vector<int> ak; vector<array<int, 9>> at_;
vector<ll> ansS; vector<int> ansE; // ansS=-1 -> infeasible
vector<ll> pw2;

void dfs(int node, int l, int r) {
    ll sS = S; int sE = E, sb = bad; size_t sp = st.size();
    for (int e = headE[node]; e != -1; e = nxtE[e]) { int id = valE[e]; unite(eu[id], ev[id], eb[id]); }
    for (int e = headC[node]; e != -1; e = nxtC[e]) { int id = valC[e]; addCost(ci[id], ca[id], cb[id]); }
    if (bad > 0) {
        for (int i = l; i <= r; i++) ansS[i] = -1;
    } else if (l == r) {
        for (int j = 0; j < ak[l]; j++) unite(at_[l][3 * j], at_[l][3 * j + 1], at_[l][3 * j + 2]);
        if (bad > 0) ansS[l] = -1; else { ansS[l] = S; ansE[l] = E; }
    } else {
        int mid = (l + r) / 2;
        dfs(node * 2, l, mid);
        dfs(node * 2 + 1, mid + 1, r);
    }
    undoTo(sp); S = sS; E = sE; bad = sb;
}

int main() {
    scanf("%d %d", &n, &q);
    vector<ll> c0(n + 1), c1(n + 1);
    for (int i = 1; i <= n; i++) scanf("%lld %lld", &c0[i], &c1[i]);
    par_.resize(n + 1); dpar.assign(n + 1, 0); sz_.assign(n + 1, 1);
    A.assign(n + 1, 0); B.assign(n + 1, 0);
    for (int i = 0; i <= n; i++) par_[i] = i;
    A[0] = 0; B[0] = INF;
    for (int i = 1; i <= n; i++) { A[i] = c0[i]; B[i] = c1[i]; }
    S = 0; E = 0; bad = 0;
    for (int i = 0; i <= n; i++) addc(i);
    pw2.assign(n + 2, 1);
    for (int i = 1; i <= n + 1; i++) pw2[i] = pw2[i - 1] * 2 % MOD;

    unordered_map<int, int> idMap; idMap.reserve(q * 2 + 10);
    vector<int> estart; vector<char> eact;
    struct Iv { int l, r, idx; };
    vector<Iv> edgeIv; vector<pair<int, int>> costIv; // (start, idx) -> [start, m-1]
    vector<ll> cur0 = c0, cur1 = c1;
    int t = 0;
    for (int op = 0; op < q; op++) {
        char w[8]; scanf("%s", w);
        if (!strcmp(w, "ADD")) {
            int id, u, v, b; scanf("%d %d %d %d", &id, &u, &v, &b);
            int e = (int)eu.size(); eu.push_back(u); ev.push_back(v); eb.push_back(b);
            estart.push_back(t); eact.push_back(1); idMap[id] = e;
        } else if (!strcmp(w, "DEL")) {
            int id; scanf("%d", &id);
            int e = idMap[id]; eact[e] = 0;
            if (estart[e] < t) edgeIv.push_back({estart[e], t - 1, e});
        } else if (!strcmp(w, "COST")) {
            int i; ll a, b; scanf("%d %lld %lld", &i, &a, &b);
            int id = (int)ci.size(); ci.push_back(i); ca.push_back(a - cur0[i]); cb.push_back(b - cur1[i]);
            cur0[i] = a; cur1[i] = b;
            costIv.push_back({t, id});
        } else {
            int k; scanf("%d", &k);
            array<int, 9> arr; arr.fill(0);
            for (int j = 0; j < 3 * k; j++) scanf("%d", &arr[j]);
            ak.push_back(k); at_.push_back(arr); t++;
        }
    }
    m = t;
    for (int e = 0; e < (int)eu.size(); e++) if (eact[e] && estart[e] < m) edgeIv.push_back({estart[e], m - 1, e});
    headE.assign(4 * m + 4, -1); headC.assign(4 * m + 4, -1);
    for (auto &iv : edgeIv) ins(headE, nxtE, valE, 1, 0, m - 1, iv.l, iv.r, iv.idx);
    for (auto &p : costIv) if (p.first < m) ins(headC, nxtC, valC, 1, 0, m - 1, p.first, m - 1, p.second);
    ansS.assign(m, -1); ansE.assign(m, 0);
    dfs(1, 0, m - 1);
    string out;
    for (int i = 0; i < m; i++) {
        if (ansS[i] < 0) out += "-1 0\n";
        else { out += to_string(ansS[i]); out += ' '; out += to_string(pw2[ansE[i]]); out += '\n'; }
    }
    fputs(out.c_str(), stdout);
    return 0;
}
