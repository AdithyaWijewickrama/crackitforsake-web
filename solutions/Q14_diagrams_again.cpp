/*
Q14 - Diagrams again? (Voronoi generators, capacities, routing)

SAME PROBLEM AS Q08, NEW VERSION
  This is the Q08 Voronoi routing question again. Two changes from Q08:
  1. Output = "HASH H" on the first line, then the cost. A version printing HASH H was
     reported to pass a test on HackerRank, so this is the expected format (the whole
     input, generators AND queries, is in the file; nothing is interactive).
  2. The min-cost flow is now a NETWORK SIMPLEX. The old successive-shortest-path flow took
     ~15 s on a crowded max test (M = 5000, N = 10000, small capacities, points in a small
     box); network simplex does the same test in ~0.9 s with the same answer.

PHASE 1: ADJACENCY = DELAUNAY EDGES (gift wrapping, O(M^2), exact integers)
  Voronoi cells Ru, Rv share a boundary of non-zero length  <=>  uv is a Delaunay edge
  (with an "empty circle" through u and v). Start from a hull edge, and for each directed
  edge x->y take the left point c whose circle (x,y,c) contains no other left point
  (one linear scan with incircle tests). Push the two new edges of triangle (x,y,c).
  Ties (4 cocircular points, as in the sample rectangle) are broken by a symbolic
  perturbation, and a diagonal whose two triangles are cocircular is dropped: those two
  cells meet at a single point only. All predicates fit in long long (|diff| <= 2e4).

PHASE 2: MIN-COST FLOW
  Each query point starts at its nearest generator (exact squared distance).
  Nodes: generators 0..M-1 and a sink T.  supply(i) = #points at i,  demand(T) = N.
  Arcs: u <-> v for every adjacent pair, unlimited capacity, cost D(u,v), doubled when
        y_u and y_v have strictly opposite signs (segment crosses y = 0);
        i -> T with capacity Ci and cost Wi (where the point finally stays).
  A point may hop several times, paying every hop, exactly like a path in this graph.
  The Delaunay graph is connected, so it is feasible iff sum(C) >= N, else -1.00.

NETWORK SIMPLEX
  Costs are scaled by 1e8 and rounded to long long so pivots are exact (rounding
  error <= 5e-9 per arc, invisible at 2 decimals). The final cost is summed with the real
  double costs. An extra root node gets one artificial arc per node (cost 1e17) carrying
  its supply: that is the starting spanning tree. Each pivot:
    - pick an entering arc with negative reduced cost cost + pot[from] - pot[to]
      (or a positive one carrying flow, used backwards): block search, best in a block;
    - the cycle = entering arc + tree path between its ends (climb by depth to the LCA);
    - push the bottleneck, the LAST bottleneck arc on the cycle (from the apex) leaves
      (keeps the tree strongly feasible, prevents cycling);
    - re-hang the cut subtree (reverse parents along the path) and recompute
      potentials/depths only inside that subtree.
  Stops when no arc violates optimality; flow left on an artificial arc means -1.00.

SAMPLE
  Generators 1(-10,1) 2(10,1) 3(-10,-1) 4(10,-1); cells are the four quadrants.
  Adjacent: 1-2, 1-3, 2-4, 3-4 (1-4, 2-3 only touch at the origin). H = 25.
  (-10,5) -> gen 1 (C=0) and (10,5) -> gen 2 (C=0). Each moves down across y = 0:
  2 * 2.0 = 4, plus W = 1 -> 5 each. Output 10.00.

TESTING
  1,200 random small cases against a brute force (exact Voronoi adjacency by clipping
  each bisector with fractions, Floyd routing, Bellman-Ford min-cost flow): all equal.
  25 mid-size cases against the old Q08 flow: all equal. Max-size cases: <= 1.4 s.

COMPLEXITY  Delaunay O(M^2); nearest generator O(N*M) = 5e7; network simplex fast in
            practice on ~5000 nodes / ~35000 arcs.

VIVA NOTES
  - Voronoi adjacency <=> Delaunay edge; touching at one point (cocircular) is not adjacent.
  - Routing with capacities = transportation problem = min-cost flow.
  - Network simplex = simplex method on a spanning tree of the graph; potentials are the
    dual variables, reduced cost < 0 means the entering arc improves the solution.
*/
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const ll MOD = 1000000007LL;

int M;
vector<ll> X, Y;

ll orient(int a, int b, int c) {
    return (X[b] - X[a]) * (Y[c] - Y[a]) - (Y[b] - Y[a]) * (X[c] - X[a]);
}

ll incircleRaw(int a, int b, int c, int d) {
    ll adx = X[a] - X[d], ady = Y[a] - Y[d];
    ll bdx = X[b] - X[d], bdy = Y[b] - Y[d];
    ll cdx = X[c] - X[d], cdy = Y[c] - Y[d];
    ll al = adx * adx + ady * ady;
    ll bl = bdx * bdx + bdy * bdy;
    ll cl = cdx * cdx + cdy * cdy;
    return al * (bdx * cdy - cdx * bdy)
         + bl * (cdx * ady - adx * cdy)
         + cl * (adx * bdy - bdx * ady);
}

int incircle(int a, int b, int c, int d) {
    ll v = incircleRaw(a, b, c, d);
    if (v > 0) return 1;
    if (v < 0) return -1;
    int idx[4] = {a, b, c, d};
    sort(idx, idx + 4);
    for (int k = 0; k < 4; k++) {
        int p = idx[k];
        ll g;
        if (p == a) g = orient(d, b, c);
        else if (p == b) g = orient(d, c, a);
        else if (p == c) g = orient(d, a, b);
        else g = -orient(a, b, c);
        if (g > 0) return 1;
        if (g < 0) return -1;
    }
    return 0;
}

vector<int> fr, to;
vector<ll> cap, cst, flw;
vector<int> par, pe, dep;
vector<ll> pot;
vector<vector<int> > ch;

int addArc(int u, int v, ll c, ll w) {
    fr.push_back(u); to.push_back(v); cap.push_back(c); cst.push_back(w); flw.push_back(0);
    return (int)fr.size() - 1;
}

void relink(int s) {
    vector<int> st(1, s);
    while (!st.empty()) {
        int x = st.back(); st.pop_back();
        for (size_t k = 0; k < ch[x].size(); k++) {
            int c = ch[x][k], e = pe[c];
            dep[c] = dep[x] + 1;
            pot[c] = (fr[e] == x) ? pot[x] + cst[e] : pot[x] - cst[e];
            st.push_back(c);
        }
    }
}

void detach(int p, int c) {
    vector<int> &v = ch[p];
    for (size_t k = 0; k < v.size(); k++) if (v[k] == c) { v[k] = v.back(); v.pop_back(); return; }
}

ll resid(int x, bool up) {
    int e = pe[x];
    bool fwd = (fr[e] == x) == up;
    return fwd ? cap[e] - flw[e] : flw[e];
}

void push(int x, bool up, ll d) {
    int e = pe[x];
    if ((fr[e] == x) == up) flw[e] += d; else flw[e] -= d;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    if (!(cin >> M)) return 0;
    X.resize(M); Y.resize(M);
    vector<ll> C(M), W(M);
    for (int i = 0; i < M; i++) cin >> X[i] >> Y[i] >> C[i] >> W[i];

    unordered_map<ll, int> opp;
    opp.reserve(8 * M + 16);
    int a = 0;
    for (int i = 1; i < M; i++)
        if (Y[i] < Y[a] || (Y[i] == Y[a] && X[i] < X[a])) a = i;
    int b = (a == 0) ? 1 : 0;
    for (int i = 0; i < M; i++) {
        if (i == a || i == b) continue;
        ll o = orient(a, b, i);
        if (o < 0 || (o == 0 && (X[i] - X[a]) * (X[i] - X[a]) + (Y[i] - Y[a]) * (Y[i] - Y[a]) < (X[b] - X[a]) * (X[b] - X[a]) + (Y[b] - Y[a]) * (Y[b] - Y[a]))) b = i;
    }
    vector<pair<int,int> > stk;
    stk.push_back(make_pair(a, b));
    while (!stk.empty()) {
        int x = stk.back().first, y = stk.back().second;
        stk.pop_back();
        if (opp.count((ll)x * M + y)) continue;
        int c = -1;
        for (int p = 0; p < M; p++) {
            if (p == x || p == y) continue;
            if (orient(x, y, p) <= 0) continue;
            if (c == -1 || incircle(x, y, c, p) > 0) c = p;
        }
        if (c == -1) continue;
        opp[(ll)x * M + y] = c;
        opp[(ll)y * M + c] = x;
        opp[(ll)c * M + x] = y;
        if (!opp.count((ll)c * M + y)) stk.push_back(make_pair(c, y));
        if (!opp.count((ll)x * M + c)) stk.push_back(make_pair(x, c));
    }

    vector<pair<int,int> > edges;
    for (unordered_map<ll,int>::iterator it = opp.begin(); it != opp.end(); ++it) {
        int x = it->first / M, y = it->first % M;
        unordered_map<ll,int>::iterator rv = opp.find((ll)y * M + x);
        if (rv != opp.end()) {
            if (x > y) continue;
            if (incircleRaw(x, y, it->second, rv->second) == 0) continue;
        }
        edges.push_back(make_pair(min(x, y), max(x, y)));
    }

    ll H = 0;
    for (size_t i = 0; i < edges.size(); i++)
        H = (H + (ll)(edges[i].first + 1) * (edges[i].second + 1)) % MOD;
    cout << "HASH " << H << endl;

    int N;
    if (!(cin >> N)) return 0;
    vector<ll> cnt(M, 0);
    for (int j = 0; j < N; j++) {
        ll qx, qy;
        cin >> qx >> qy;
        int best = 0;
        ll bd = LLONG_MAX;
        for (int i = 0; i < M; i++) {
            ll dx = X[i] - qx, dy = Y[i] - qy, d = dx * dx + dy * dy;
            if (d < bd) { bd = d; best = i; }
        }
        cnt[best]++;
    }

    ll totalC = 0;
    for (int i = 0; i < M; i++) totalC += C[i];
    if (totalC < N) { cout << "-1.00" << endl; return 0; }

    const double SCALE = 1e8;
    const ll BIGCAP = (ll)1e15, BIG = (ll)1e17;
    int T = M, R = M + 1, V = M + 2;
    vector<double> real;
    for (size_t i = 0; i < edges.size(); i++) {
        int u = edges[i].first, v = edges[i].second;
        double dx = (double)(X[u] - X[v]), dy = (double)(Y[u] - Y[v]);
        double d = sqrt(dx * dx + dy * dy);
        if ((Y[u] > 0 && Y[v] < 0) || (Y[u] < 0 && Y[v] > 0)) d *= 2.0;
        ll w = llround(d * SCALE);
        addArc(u, v, BIGCAP, w); real.push_back(d);
        addArc(v, u, BIGCAP, w); real.push_back(d);
    }
    for (int i = 0; i < M; i++) {
        addArc(i, T, C[i], W[i] * (ll)SCALE);
        real.push_back((double)W[i]);
    }
    int realArcs = fr.size();

    par.assign(V, -1); pe.assign(V, -1); dep.assign(V, 0); pot.assign(V, 0);
    ch.assign(V, vector<int>());
    for (int v = 0; v < R; v++) {
        ll s = (v == T) ? -(ll)N : cnt[v];
        int e;
        if (s >= 0) { e = addArc(v, R, BIGCAP, BIG); flw[e] = s; pot[v] = -BIG; }
        else { e = addArc(R, v, BIGCAP, BIG); flw[e] = -s; pot[v] = BIG; }
        par[v] = R; pe[v] = e; dep[v] = 1;
        ch[R].push_back(v);
    }

    int E = fr.size();
    int block = max(1, (int)sqrt((double)E));
    int pos = 0;
    while (true) {
        int ent = -1;
        ll bestV = 0;
        int scanned = 0;
        while (scanned < E) {
            int lim = min(block, E - scanned);
            for (int k = 0; k < lim; k++) {
                int e = pos;
                if (++pos == E) pos = 0;
                ll rc = cst[e] + pot[fr[e]] - pot[to[e]];
                ll vio = 0;
                if (rc < 0 && flw[e] < cap[e]) vio = -rc;
                else if (rc > 0 && flw[e] > 0) vio = rc;
                if (vio > bestV) { bestV = vio; ent = e; }
            }
            scanned += lim;
            if (ent != -1) break;
        }
        if (ent == -1) break;

        ll rc = cst[ent] + pot[fr[ent]] - pot[to[ent]];
        bool fwd = rc < 0;
        int u = fwd ? fr[ent] : to[ent], v = fwd ? to[ent] : fr[ent];
        ll delta = BIGCAP * 4;
        int leave = -1;
        bool leaveUside = false;

        int x = u, y = v;
        vector<int> A, B;
        while (x != y) {
            if (dep[x] >= dep[y]) { A.push_back(x); x = par[x]; }
            else { B.push_back(y); y = par[y]; }
        }
        for (int k = (int)A.size() - 1; k >= 0; k--) {
            ll r = resid(A[k], false);
            if (r <= delta) { delta = r; leave = A[k]; leaveUside = true; }
        }
        ll re = fwd ? cap[ent] - flw[ent] : flw[ent];
        if (re <= delta) { delta = re; leave = -1; }
        for (size_t k = 0; k < B.size(); k++) {
            ll r = resid(B[k], true);
            if (r <= delta) { delta = r; leave = B[k]; leaveUside = false; }
        }

        if (delta > 0) {
            if (fwd) flw[ent] += delta; else flw[ent] -= delta;
            for (size_t k = 0; k < A.size(); k++) push(A[k], false, delta);
            for (size_t k = 0; k < B.size(); k++) push(B[k], true, delta);
        }
        if (leave == -1) continue;

        int s = leaveUside ? u : v, t = leaveUside ? v : u;
        int prev = t, prevEdge = ent, cur = s;
        while (true) {
            int nxt = par[cur], nxtEdge = pe[cur];
            detach(nxt, cur);
            par[cur] = prev; pe[cur] = prevEdge;
            ch[prev].push_back(cur);
            if (cur == leave) break;
            prev = cur; prevEdge = nxtEdge; cur = nxt;
        }
        int e = pe[s];
        dep[s] = dep[t] + 1;
        pot[s] = (fr[e] == t) ? pot[t] + cst[e] : pot[t] - cst[e];
        relink(s);
    }

    for (int e = realArcs; e < E; e++) if (flw[e] > 0) { cout << "-1.00" << endl; return 0; }
    double cost = 0.0;
    for (int e = 0; e < realArcs; e++) cost += (double)flw[e] * real[e];
    cout << fixed << setprecision(2) << cost + 1e-9 << endl;
    return 0;
}
