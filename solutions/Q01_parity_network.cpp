/*
PROBLEM 1: Desynchronized Parity Network (BFS on an expanded state graph)

WHAT IT ASKS
  Start at station 1 at t = 0 and reach station N as fast as possible.
    even t: you may only move to a HIGHER-numbered neighbor (u -> v with v > u)
    odd  t: you may only move to a LOWER-numbered neighbor  (v < u)
    or wait 1 minute, but never twice in a row.

KEY INSIGHT: THE STATION ALONE IS NOT ENOUGH STATE
  Which moves are allowed depends on
    (a) the parity of the current time (t % 2), and
    (b) whether the last action was a wait (no second wait allowed).
  So BFS over states (station, parity, waitedLast): 2 * 2 * N states.
  Every action takes exactly 1 minute, so the graph is unweighted and plain BFS
  gives the minimum time. Time parity flips on every action.

TRANSITIONS from (u, p, w) at time t (p = t % 2):
  move along edge u-v if (p == 0 && v > u) || (p == 1 && v < u)  ->  (v, 1-p, 0)
  wait, only if w == 0                                            ->  (u, 1-p, 1)
  The answer is the first time any state with station N is popped. If none, -1.

WHY THE PARITY IS IN THE STATE
  Reaching station u at an even time can allow totally different moves than
  reaching it at an odd time. A plain BFS on stations would wrongly treat
  them as the same visit (see the picture: 1->2 arrives at t=1, then 2->4 is forbidden).

SAMPLE WALKTHROUGH  (edges 1-3, 3-2, 2-4, 1-2;  N = 4)
  t=0 (even): 1 -> 3 (3 > 1)
  t=1 (odd) : 3 -> 2 (2 < 3)
  t=2 (even): 2 -> 4 (4 > 2)  -> arrive at t = 3.   Answer 3.
  The direct 1 -> 2 arrives at t=1 (odd), when 2 -> 4 (going up) is forbidden.

COMPLEXITY  O(4 * (N + M)) time and memory: each state is visited once and
            scans its adjacency list once.

VIVA NOTES
  - Time-dependent rules -> put the time parity (and the wait flag) into the state.
  - Every action costs exactly 1 minute -> BFS, no Dijkstra needed.
  - The "no two waits in a row" rule is the waitedLast bit in the state.
*/
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<vector<int> > adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    // state id = (u * 2 + parity) * 2 + waitedLast
    vector<int> dist(4 * (n + 1), -1);
    queue<int> q;
    int start = (1 * 2 + 0) * 2 + 0;
    dist[start] = 0;
    q.push(start);

    while (!q.empty()) {
        int s = q.front(); q.pop();
        int w = s & 1, p = (s >> 1) & 1, u = s >> 2;
        int d = dist[s];
        if (u == n) { cout << d << '\n'; return 0; }

        // move along a track
        for (size_t k = 0; k < adj[u].size(); k++) {
            int v = adj[u][k];
            if ((p == 0 && v > u) || (p == 1 && v < u)) {
                int ns = (v * 2 + (1 - p)) * 2 + 0;
                if (dist[ns] == -1) { dist[ns] = d + 1; q.push(ns); }
            }
        }
        // wait one minute (not twice in a row)
        if (w == 0) {
            int ns = (u * 2 + (1 - p)) * 2 + 1;
            if (dist[ns] == -1) { dist[ns] = d + 1; q.push(ns); }
        }
    }
    cout << -1 << '\n';
    return 0;
}
