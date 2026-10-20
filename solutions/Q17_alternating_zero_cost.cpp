/*
  Q17 - The Alternating Zero-Cost Optical Ring
  ============================================

  TASK
    Directed graph, N <= 1e5 routers, M <= 2e5 fibers. Fiber (u, v, W, P) may be
    used only when the number of hops taken so far h satisfies h mod 2 == P.
    Start at router 1 with h = 0. Print the minimum total latency to reach
    router N (with any parity), or -1.

  INSIGHT (state-expanded Dijkstra)
    Whether a fiber is usable depends only on h mod 2, so the real state is
    (router, parity). Build a graph with 2N states:
        fiber (u, v, W, P) becomes ONE edge (u, P) -> (v, 1 - P) with cost W
    because it can only leave u when parity is P, and after one hop the parity
    flips. Weights are >= 0, so plain Dijkstra on 2N states is correct.
    Answer = min(dist[N][0], dist[N][1]).

  WHY IT IS CORRECT
    Any valid route is a walk whose hop parities alternate 0,1,0,1,...; it maps
    one-to-one onto a path in the expanded graph from (1,0), and costs match.
    Zero-weight edges are fine for Dijkstra (only negative ones break it).
    Revisiting a router with a different parity is allowed and needed.

  SAMPLE
    1 -> 2 (W 5, P 0) at h=0, now h=1; 2 -> 4 (W 10, P 1) at h=1. Total 15.
    The 0-cost edges 2->3 (P1) and 3->2 (P0) could flip parity but never help
    reach 4 cheaper here. Output 15.

  DETAILS
    Distances up to 2e5 * 1e9 = 2e14 -> long long.
    If N == 1 were allowed the answer would be 0 (N >= 2 by constraints).

  COMPLEXITY
    O((N + M) log M) time, O(N + M) memory.
*/
#include <cstdio>
#include <vector>
#include <queue>
#include <utility>
using namespace std;
typedef long long ll;
typedef pair<ll,int> P;

int main() {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    vector<int> head(2 * n, -1), nxt(m), to(m);
    vector<ll> w(m);
    for (int i = 0; i < m; i++) {
        int u, v, p; ll c;
        scanf("%d %d %lld %d", &u, &v, &c, &p);
        u--; v--;
        int s = u * 2 + p;
        to[i] = v * 2 + (1 - p);
        w[i] = c;
        nxt[i] = head[s];
        head[s] = i;
    }
    const ll INF = (ll)4e18;
    vector<ll> d(2 * n, INF);
    priority_queue<P, vector<P>, greater<P> > pq;
    d[0] = 0;
    pq.push(P(0, 0));
    while (!pq.empty()) {
        P t = pq.top(); pq.pop();
        int x = t.second;
        if (t.first != d[x]) continue;
        for (int e = head[x]; e != -1; e = nxt[e]) {
            ll nd = t.first + w[e];
            if (nd < d[to[e]]) {
                d[to[e]] = nd;
                pq.push(P(nd, to[e]));
            }
        }
    }
    ll ans = d[2 * (n - 1)] < d[2 * (n - 1) + 1] ? d[2 * (n - 1)] : d[2 * (n - 1) + 1];
    if (ans >= INF) printf("-1\n");
    else printf("%lld\n", ans);
    return 0;
}
