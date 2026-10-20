#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int main() {
    int M, N, K;
    if (scanf("%d %d %d", &M, &N, &K) != 3) return 0;
    vector<ll> g((size_t)M * N);
    for (auto &x : g) scanf("%lld", &x);

    if (g[0] < 0) { puts("-1"); return 0; }

    const ll NEG = LLONG_MIN / 4;          // marks an unreachable state
    const int last = M * N - 1;

    vector<ll> dp(M * N), init(M * N, NEG), nxt(M * N);
    vector<ll> colMax(N), rowMax(M);
    init[0] = g[0];                        // layer 0: start cell only
    ll ans = NEG;

    for (int k = 0; k <= K; k++) {
        // Fill layer k using right/down moves plus arrivals by jump (init)
        for (int r = 0; r < M; r++) {
            for (int c = 0; c < N; c++) {
                int id = r * N + c;
                ll cand = NEG;
                if (r > 0) cand = max(cand, dp[id - N]);
                if (c > 0) cand = max(cand, dp[id - 1]);
                ll v = init[id];
                if (cand >= 0) {
                    ll t = cand + g[id];
                    if (t >= 0) v = max(v, t);
                }
                dp[id] = v;
            }
        }
        ans = max(ans, dp[last]);
        if (k == K) break;

        // Best energy per column / row (exit excluded: the route ends there)
        fill(colMax.begin(), colMax.end(), NEG);
        fill(rowMax.begin(), rowMax.end(), NEG);
        for (int r = 0; r < M; r++) {
            for (int c = 0; c < N; c++) {
                int id = r * N + c;
                if (id == last) continue;
                colMax[c] = max(colMax[c], dp[id]);
                rowMax[r] = max(rowMax[r], dp[id]);
            }
        }

        // Build arrivals for layer k+1
        for (int r = 0; r < M; r++) {
            for (int c = 0; c < N; c++) {
                int id = r * N + c;
                ll best = NEG;
                if (c + 1 < N && colMax[c + 1] >= 0)   // jump from column c+1 to column c
                    best = max(best, colMax[c + 1] + g[id]);
                if (r + 1 < M && rowMax[r + 1] >= 0)   // jump from row r+1 to row r
                    best = max(best, rowMax[r + 1] + g[id]);
                nxt[id] = (best >= 0) ? best : NEG;
            }
        }
        init.swap(nxt);
    }

    if (ans < 0) puts("-1");
    else printf("%lld\n", ans);
    return 0;
}
