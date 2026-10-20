/*
PROBLEM: Resilient Clusters / Critical Nodes / Macro-Tree (two-phase)

WHAT IT REALLY IS
  Resilient Cluster = BICONNECTED COMPONENT (block) of the graph.
  Critical Node     = ARTICULATION POINT (cut vertex).
  Macro-Tree        = the BLOCK-CUT TREE (forest): one node per block, one per cut vertex,
                      with an edge block--cut whenever the cut vertex is inside that block.

PHASE 1: Tarjan (iterative), O(N + M)
  DFS with discovery time tin[] and low-link low[] (the earliest tin reachable using
  one back edge). Keep a stack of visited vertices.
  When we come back from child `to` to `v` and low[to] >= tin[v], nothing below `to`
  can climb above v, so v separates that part. Pop the stack down to `to`; those
  vertices plus v form one block.
  v is a cut vertex if that happens and v is not the DFS root, or if v is the root
  with >= 2 DFS children.
  Isolated vertex (no edges): counted as its own cluster of size 1 (a one-node set is
  never "disconnected"). See COUNT_ISOLATED below if the expected hash disagrees.
  H = Nc * Na mod 1e9+7. Print it and flush.

PHASE 2: pairs of clusters at fragility distance K, centroid decomposition, O(T log T)
  In the block-cut tree, the path between two blocks alternates
  block - cut - block - cut - ... - block, so
      #critical nodes on the path = tree distance / 2.
  So we need: sum of |Su| * |Sv| over block pairs at tree distance exactly D = 2K.
  (Pairs in different connected components have no path, so they are never counted.)
  Centroid decomposition: pick the centroid c of the current tree piece. Every path
  through c is split into two halves with depths d1 + d2 = D. Keep
  cnt[d] = sum of block weights at depth d from c, filled from earlier subtrees.
  For each node in the next subtree (depth d, weight w): ans += w * cnt[D - d], then
  add that subtree's nodes into cnt. (c itself sits in cnt[0] if it is a block.)
  Then remove c and repeat on each remaining piece. Each node takes part in
  O(log T) levels, so this is O(T log T), where T = Nc + Na <= 2N.

WHY NOT BRUTE FORCE
  Up to 2*10^5 clusters gives ~2*10^10 pairs, so BFS from every block is far too slow.

SAMPLE: two separate triangles -> 2 blocks, 0 cut vertices -> H = 2*0 = 0.
        K = 1: the blocks are in different components -> answer 0.

COMPLEXITY  O((N + M) + N log N) time, O(N + M) memory. All loops are iterative
            (no deep recursion on a 2e5 chain).

VIVA NOTES
  - Blocks and cut vertices come from Tarjan's low-link: low[child] >= tin[v] means
    v separates the child's subtree.
  - The block-cut tree alternates node types, so critical nodes on a path = distance / 2,
    and we need pairs at distance 2K.
  - Weighted count of pairs at an exact distance: centroid decomposition with a
    depth -> weight-sum array, all modulo 1e9+7.
*/
#include <bits/stdc++.h>
using namespace std;

const long long MOD = 1000000007LL;
const bool COUNT_ISOLATED = true;  // isolated vertex = its own cluster of size 1

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<vector<pair<int,int> > > adj(n + 1);  // (neighbor, edge id)
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        if (u == v) continue;  // a self-loop never affects connectivity
        adj[u].push_back(make_pair(v, i));
        adj[v].push_back(make_pair(u, i));
    }

    // ---------- Phase 1: iterative Tarjan for blocks + articulation points ----------
    vector<int> tin(n + 1, 0), low(n + 1, 0), parEdge(n + 1, -1), it(n + 1, 0);
    vector<char> isCut(n + 1, 0);
    vector<vector<int> > blocks;
    vector<int> vstk, cstk;  // vertex stack (for blocks), call stack (for the DFS)
    int timer = 0;

    for (int s = 1; s <= n; s++) {
        if (tin[s]) continue;
        if (adj[s].empty()) {
            tin[s] = ++timer;
            if (COUNT_ISOLATED) blocks.push_back(vector<int>(1, s));
            continue;
        }
        int rootChildren = 0;
        tin[s] = low[s] = ++timer;
        vstk.push_back(s);
        cstk.push_back(s);
        while (!cstk.empty()) {
            int v = cstk.back();
            if (it[v] < (int)adj[v].size()) {
                int to = adj[v][it[v]].first, id = adj[v][it[v]].second;
                it[v]++;
                if (id == parEdge[v]) continue;
                if (tin[to]) {
                    low[v] = min(low[v], tin[to]);  // back edge
                } else {
                    parEdge[to] = id;
                    tin[to] = low[to] = ++timer;
                    vstk.push_back(to);
                    cstk.push_back(to);
                    if (v == s) rootChildren++;
                }
            } else {
                cstk.pop_back();  // v is finished, return to its parent
                if (cstk.empty()) break;
                int p = cstk.back();
                low[p] = min(low[p], low[v]);
                if (low[v] >= tin[p]) {
                    if (p != s) isCut[p] = 1;
                    vector<int> b;
                    while (true) {
                        int x = vstk.back(); vstk.pop_back();
                        b.push_back(x);
                        if (x == v) break;
                    }
                    b.push_back(p);
                    blocks.push_back(b);
                }
            }
        }
        vstk.clear();
        if (rootChildren >= 2) isCut[s] = 1;
    }

    long long Nc = blocks.size(), Na = 0;
    for (int i = 1; i <= n; i++) Na += isCut[i];
    cout << (Nc % MOD) * (Na % MOD) % MOD << endl;  // endl flushes

    long long K;
    if (!(cin >> K)) return 0;

    // ---------- Build the block-cut forest ----------
    // tree nodes: 0..Nc-1 are blocks, Nc.. are cut vertices
    vector<int> cutId(n + 1, -1);
    int T = Nc;
    for (int i = 1; i <= n; i++) if (isCut[i]) cutId[i] = T++;
    vector<vector<int> > g(T);
    vector<long long> w(T, 0);  // weight = |Su| for blocks, 0 for cut nodes
    for (int b = 0; b < (int)Nc; b++) {
        w[b] = blocks[b].size();
        for (size_t j = 0; j < blocks[b].size(); j++) {
            int x = blocks[b][j];
            if (isCut[x]) { g[b].push_back(cutId[x]); g[cutId[x]].push_back(b); }
        }
    }

    long long D = 2 * K;
    long long ans = 0;
    if (D <= T) {  // a path can't be longer than the number of nodes
        // ---------- Centroid decomposition (iterative) ----------
        vector<char> removed(T, 0);
        vector<int> sz(T, 0), par(T, -1), order, comps;
        vector<long long> cnt(T + 1, 0);
        order.reserve(T);
        // start one decomposition per tree of the forest
        vector<char> started(T, 0);
        for (int r = 0; r < T; r++) {
            if (started[r]) continue;
            // mark the whole tree of r as started
            vector<int> q(1, r); started[r] = 1;
            for (size_t h = 0; h < q.size(); h++)
                for (size_t j = 0; j < g[q[h]].size(); j++)
                    if (!started[g[q[h]][j]]) { started[g[q[h]][j]] = 1; q.push_back(g[q[h]][j]); }
            comps.push_back(r);
        }

        while (!comps.empty()) {
            int r = comps.back(); comps.pop_back();
            // BFS order of the current piece, then subtree sizes bottom-up
            order.clear(); order.push_back(r); par[r] = -1;
            for (size_t h = 0; h < order.size(); h++) {
                int v = order[h];
                for (size_t j = 0; j < g[v].size(); j++) {
                    int to = g[v][j];
                    if (!removed[to] && to != par[v]) { par[to] = v; order.push_back(to); }
                }
            }
            for (int h = order.size() - 1; h >= 0; h--) {
                int v = order[h]; sz[v] = 1;
                for (size_t j = 0; j < g[v].size(); j++) {
                    int to = g[v][j];
                    if (!removed[to] && to != par[v]) sz[v] += sz[to];
                }
            }
            int total = order.size(), c = r;
            while (true) {  // walk toward a child with more than half of the nodes
                int nxt = -1;
                for (size_t j = 0; j < g[c].size(); j++) {
                    int to = g[c][j];
                    if (!removed[to] && to != par[c] && sz[to] * 2 > total) { nxt = to; break; }
                }
                if (nxt == -1) break;
                c = nxt;
            }

            // count pairs at distance D passing through centroid c
            int maxDep = 0;
            cnt[0] = w[c] % MOD;
            vector<pair<int,int> > items;  // (depth, node) of the current subtree
            for (size_t j = 0; j < g[c].size(); j++) {
                int s0 = g[c][j];
                if (removed[s0]) continue;
                items.clear();
                items.push_back(make_pair(1, s0));
                par[s0] = c;
                for (size_t h = 0; h < items.size(); h++) {
                    int v = items[h].second, d = items[h].first;
                    if (d >= D) continue;  // deeper nodes can't help
                    for (size_t k = 0; k < g[v].size(); k++) {
                        int to = g[v][k];
                        if (!removed[to] && to != par[v]) { par[to] = v; items.push_back(make_pair(d + 1, to)); }
                    }
                }
                for (size_t h = 0; h < items.size(); h++) {
                    long long need = D - items[h].first;
                    if (need >= 0 && need <= maxDep && w[items[h].second])
                        ans = (ans + w[items[h].second] % MOD * cnt[need]) % MOD;
                }
                for (size_t h = 0; h < items.size(); h++) {
                    int d = items[h].first;
                    cnt[d] = (cnt[d] + w[items[h].second]) % MOD;
                    if (d > maxDep) maxDep = d;
                }
            }
            for (int d = 0; d <= maxDep; d++) cnt[d] = 0;

            removed[c] = 1;
            for (size_t j = 0; j < g[c].size(); j++)
                if (!removed[g[c][j]]) comps.push_back(g[c][j]);
        }
    }
    cout << ans % MOD << endl;
    return 0;
}
