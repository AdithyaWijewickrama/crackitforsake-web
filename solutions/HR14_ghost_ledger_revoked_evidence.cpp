#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll MOD = 1000000007LL, INF = (ll)1e18;

struct E { int u, v, b; };
struct C { int i; ll a, b; };
struct Rec { int type, a, b; ll v0, v1, G; int T; };

int n, q, k;
vector<int> par_, sz_, pr_;
vector<array<ll,2>> S;
ll G; int T, bad;
vector<Rec> st;
vector<E> edges; vector<C> costs;
vector<vector<int>> seg;
vector<int> au, av, ab;
vector<ll> ansS, ansC, pw;

inline ll mn(int r) { return min(S[r][0], S[r][1]); }
inline int tie(int r) { return S[r][0] == S[r][1]; }

pair<int,int> find(int x) {
    int p = 0;
    while (par_[x] != x) { p ^= pr_[x]; x = par_[x]; }
    return {x, p};
}

void applyEdge(const E& e) {
    auto [ru, pu] = find(e.u);
    auto [rv, pv] = find(e.v);
    int d = e.b ^ pu ^ pv;               // required x[ru]^x[rv]
    if (ru == rv) {
        if (d) { st.push_back({0,0,0,0,0,0,0}); bad++; }
        return;
    }
    if (sz_[ru] < sz_[rv]) swap(ru, rv); // ru = new root
    st.push_back({1, rv, ru, S[ru][0], S[ru][1], G, T});
    G -= mn(ru) + mn(rv);
    T -= tie(ru) + tie(rv);
    par_[rv] = ru; pr_[rv] = d; sz_[ru] += sz_[rv];
    S[ru][0] += S[rv][d];
    S[ru][1] += S[rv][d ^ 1];
    G += mn(ru); T += tie(ru);
}

void applyCost(const C& c) {
    auto [r, p] = find(c.i);
    st.push_back({2, r, 0, S[r][0], S[r][1], G, T});
    G -= mn(r); T -= tie(r);
    S[r][0] += p ? c.b : c.a;
    S[r][1] += p ? c.a : c.b;
    G += mn(r); T += tie(r);
}

void undo(const Rec& r) {
    if (r.type == 0) { bad--; return; }
    if (r.type == 1) {
        int c = r.a, p = r.b;
        par_[c] = c; pr_[c] = 0; sz_[p] -= sz_[c];
        S[p] = {r.v0, r.v1};
    } else {
        S[r.a] = {r.v0, r.v1};
    }
    G = r.G; T = r.T;
}

void query(int j) {
    auto [ru, pu] = find(au[j]);
    auto [rv, pv] = find(av[j]);
    int d = ab[j] ^ pu ^ pv;
    if (ru == rv) {
        if (d) { ansS[j] = -1; ansC[j] = 0; }
        else   { ansS[j] = G;  ansC[j] = pw[T]; }
    } else {
        ll s0 = S[ru][0] + S[rv][d], s1 = S[ru][1] + S[rv][d ^ 1];
        ansS[j] = G - mn(ru) - mn(rv) + min(s0, s1);
        int nt = T - tie(ru) - tie(rv) + (s0 == s1);
        ansC[j] = pw[nt];
    }
}

void ins(int node, int l, int r, int ql, int qr, int code) {
    if (ql <= l && r <= qr) { seg[node].push_back(code); return; }
    int m = (l + r) / 2;
    if (ql <= m) ins(2*node, l, m, ql, qr, code);
    if (qr > m)  ins(2*node+1, m+1, r, ql, qr, code);
}

void dfs(int node, int l, int r) {
    size_t mark = st.size();
    for (int code : seg[node]) {
        if (code >= 0) applyEdge(edges[code]);
        else applyCost(costs[~code]);
    }
    if (bad) {
        for (int j = l; j <= r; j++) { ansS[j] = -1; ansC[j] = 0; }
    } else if (l == r) {
        query(l);
    } else {
        int m = (l + r) / 2;
        dfs(2*node, l, m);
        dfs(2*node+1, m+1, r);
    }
    while (st.size() > mark) { undo(st.back()); st.pop_back(); }
}

int main() {
    scanf("%d %d", &n, &q);
    vector<array<ll,2>> cur(n + 1);
    for (int i = 1; i <= n; i++) scanf("%lld %lld", &cur[i][0], &cur[i][1]);

    struct Op { int t, a, b, c, d; };
    vector<Op> ops(q);
    vector<int> askBefore(q + 2, 0);
    char s[8];
    for (int t = 0; t < q; t++) {
        scanf("%s", s);
        if (s[0] == 'A' && s[1] == 'D') { ops[t].t = 0; scanf("%d %d %d %d", &ops[t].a, &ops[t].b, &ops[t].c, &ops[t].d); }
        else if (s[0] == 'D') { ops[t].t = 1; scanf("%d", &ops[t].a); }
        else if (s[0] == 'C') { ops[t].t = 2; scanf("%d %d %d", &ops[t].a, &ops[t].b, &ops[t].c); }
        else { ops[t].t = 3; scanf("%d %d %d", &ops[t].a, &ops[t].b, &ops[t].c); }
    }
    for (int t = 0; t < q; t++) askBefore[t + 1] = askBefore[t] + (ops[t].t == 3);
    k = askBefore[q];

    au.resize(k); av.resize(k); ab.resize(k);
    ansS.assign(k, 0); ansC.assign(k, 0);
    seg.assign(4 * max(k, 1), {});

    auto addIv = [&](int l, int r, int code) {
        if (r < l) return;
        int lo = askBefore[l], hi = askBefore[r + 1] - 1;
        if (lo > hi) return;
        ins(1, 0, k - 1, lo, hi, code);
    };

    vector<int> eIdx(q + 1, -1), eStart(q + 1, 0);
    vector<int> cStart(n + 1, 0);
    int aj = 0;
    for (int t = 0; t < q; t++) {
        Op& o = ops[t];
        if (o.t == 0) {                       // ADD id u v b
            eIdx[o.a] = edges.size();
            edges.push_back({o.b, o.c, o.d});
            eStart[o.a] = t;
        } else if (o.t == 1) {                // DEL id
            addIv(eStart[o.a], t - 1, eIdx[o.a]);
            eIdx[o.a] = -1;
        } else if (o.t == 2) {                // COST i a b
            int i = o.a;
            costs.push_back({i, cur[i][0], cur[i][1]});
            addIv(cStart[i], t - 1, ~(int)(costs.size() - 1));
            cur[i] = {o.b, o.c}; cStart[i] = t;
        } else {                              // ASK
            au[aj] = o.a; av[aj] = o.b; ab[aj] = o.c; aj++;
        }
    }
    for (int id = 1; id <= q; id++)
        if (eIdx[id] >= 0) addIv(eStart[id], q - 1, eIdx[id]);
    for (int i = 1; i <= n; i++) {
        costs.push_back({i, cur[i][0], cur[i][1]});
        addIv(cStart[i], q - 1, ~(int)(costs.size() - 1));
    }

    par_.resize(n + 1); sz_.assign(n + 1, 1); pr_.assign(n + 1, 0);
    iota(par_.begin(), par_.end(), 0);
    S.assign(n + 1, {0, 0});
    S[0] = {0, INF};                          // vertex 0 forced to state 0
    G = 0; T = n; bad = 0;                    // vertices 1..n start tied at (0,0)
    pw.assign(n + 2, 1);
    for (int i = 1; i <= n + 1; i++) pw[i] = pw[i-1] * 2 % MOD;

    dfs(1, 0, k - 1);

    for (int j = 0; j < k; j++) {
        if (ansS[j] < 0) puts("-1 0");
        else printf("%lld %lld\n", ansS[j], ansC[j]);
    }
}
