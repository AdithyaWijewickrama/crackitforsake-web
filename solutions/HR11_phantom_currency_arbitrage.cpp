#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, m;
    scanf("%d %d", &n, &m);
    vector<vector<int>> g(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        g[u].push_back(v);
    }

    // state = node*2 + p ; p=0 -> next move must go UP, p=1 -> must go DOWN
    vector<int> d(2 * (n + 1), -1);
    queue<int> q;
    d[1 * 2 + 0] = 0;
    q.push(1 * 2 + 0);

    while (!q.empty()) {
        int s = q.front(); q.pop();
        int u = s >> 1, p = s & 1;
        for (int v : g[u]) {
            bool ok = (p == 0) ? (v > u) : (v < u);
            if (!ok) continue;
            if (v == 1) {                 // closed the cycle
                printf("%d\n", d[s] + 1);
                return 0;
            }
            int t = v * 2 + (p ^ 1);
            if (d[t] < 0) {
                d[t] = d[s] + 1;
                q.push(t);
            }
        }
    }
    puts("-1");
    return 0;
}