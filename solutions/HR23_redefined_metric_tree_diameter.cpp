#include <cstdio>
#include <vector>
#include <algorithm>
using namespace std;

const int MAXN = 200005;
const int LOG = 18;

int up[LOG][MAXN], dep[MAXN];
int par[MAXN], ea[MAXN], eb[MAXN], dm[MAXN];
vector<int> adj[MAXN];

struct Edge { int u, v; long long w; };
bool cmp(const Edge& a, const Edge& b) { return a.w > b.w; }

int findp(int x) {
    while (par[x] != x) { par[x] = par[par[x]]; x = par[x]; }
    return x;
}

int lca(int u, int v) {
    if (dep[u] < dep[v]) swap(u, v);
    int diff = dep[u] - dep[v];
    for (int k = 0; k < LOG; k++)
        if ((diff >> k) & 1) u = up[k][u];
    if (u == v) return u;
    for (int k = LOG - 1; k >= 0; k--)
        if (up[k][u] != up[k][v]) { u = up[k][u]; v = up[k][v]; }
    return up[0][u];
}

int dist(int u, int v) {
    return dep[u] + dep[v] - 2 * dep[lca(u, v)];
}

int main() {
    int n;
    scanf("%d", &n);
    vector<Edge> es(n - 1);
    for (int i = 0; i < n - 1; i++) {
        scanf("%d %d %lld", &es[i].u, &es[i].v, &es[i].w);
        adj[es[i].u].push_back(es[i].v);
        adj[es[i].v].push_back(es[i].u);
    }

    // iterative BFS from root 1
    vector<int> q;
    q.reserve(n);
    vector<char> vis(n + 1, 0);
    q.push_back(1);
    vis[1] = 1;
    up[0][1] = 1;
    dep[1] = 0;
    for (size_t h = 0; h < q.size(); h++) {
        int x = q[h];
        for (size_t j = 0; j < adj[x].size(); j++) {
            int y = adj[x][j];
            if (!vis[y]) {
                vis[y] = 1;
                up[0][y] = x;
                dep[y] = dep[x] + 1;
                q.push_back(y);
            }
        }
    }
    for (int k = 1; k < LOG; k++)
        for (int i = 1; i <= n; i++)
            up[k][i] = up[k - 1][up[k - 1][i]];

    for (int i = 1; i <= n; i++) {
        par[i] = i; ea[i] = eb[i] = i; dm[i] = 0;
    }

    sort(es.begin(), es.end(), cmp);

    long long ans = 0;
    for (int i = 0; i < n - 1; i++) {
        int ru = findp(es[i].u), rv = findp(es[i].v);
        int pts[4] = { ea[ru], eb[ru], ea[rv], eb[rv] };

        int bA = ea[ru], bB = eb[ru], bD = dm[ru];
        if (dm[rv] > bD) { bA = ea[rv]; bB = eb[rv]; bD = dm[rv]; }
        for (int x = 0; x < 2; x++)
            for (int y = 2; y < 4; y++) {
                int d = dist(pts[x], pts[y]);
                if (d > bD) { bD = d; bA = pts[x]; bB = pts[y]; }
            }

        par[ru] = rv;
        ea[rv] = bA; eb[rv] = bB; dm[rv] = bD;

        long long cand = es[i].w * (long long)bD;
        if (cand > ans) ans = cand;
    }

    printf("%lld\n", ans);
    return 0;
}
