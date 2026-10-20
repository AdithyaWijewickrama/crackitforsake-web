#include <bits/stdc++.h>
using namespace std;

static const int LOG = 17;

int n, q;
vector<int> val, st, en, ord, dep;
vector<vector<int>> adj;
vector<array<int, LOG + 1>> up;

int lca(int a, int b) {
    if (dep[a] < dep[b]) swap(a, b);
    int d = dep[a] - dep[b];
    for (int k = 0; k <= LOG; k++)
        if (d >> k & 1) a = up[a][k];
    if (a == b) return a;
    for (int k = LOG; k >= 0; k--)
        if (up[a][k] != up[b][k]) a = up[a][k], b = up[b][k];
    return up[a][0];
}

int main() {
    scanf("%d %d", &n, &q);
    val.assign(n + 1, 0);
    for (int i = 1; i <= n; i++) scanf("%d", &val[i]);
    adj.assign(n + 1, {});
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        scanf("%d %d", &a, &b);
        adj[a].push_back(b);
        adj[b].push_back(a);
    }

    st.assign(n + 1, 0);
    en.assign(n + 1, 0);
    dep.assign(n + 1, 0);
    ord.assign(2 * n, 0);
    up.assign(n + 1, {});

    // iterative DFS: each vertex appears twice in the Euler order (enter / exit)
    int timer = 0;
    vector<int> it(n + 1, 0), stack_;
    stack_.push_back(1);
    for (int k = 0; k <= LOG; k++) up[1][k] = 1;
    st[1] = timer; ord[timer++] = 1;
    while (!stack_.empty()) {
        int u = stack_.back();
        if (it[u] < (int)adj[u].size()) {
            int w = adj[u][it[u]++];
            if (w == up[u][0]) continue;
            dep[w] = dep[u] + 1;
            up[w][0] = u;
            for (int k = 1; k <= LOG; k++) up[w][k] = up[up[w][k - 1]][k - 1];
            st[w] = timer; ord[timer++] = w;
            stack_.push_back(w);
        } else {
            en[u] = timer; ord[timer++] = u;
            stack_.pop_back();
        }
    }

    struct Query { int l, r, extra, idx; };
    vector<Query> qs(q);
    for (int i = 0; i < q; i++) {
        int u, v;
        scanf("%d %d", &u, &v);
        if (st[u] > st[v]) swap(u, v);
        int w = lca(u, v);
        if (w == u) qs[i] = {st[u], st[v], -1, i};
        else        qs[i] = {en[u], st[v], w, i};
    }

    int B = max(1, (int)(2.0 * n / sqrt((double)q)));
    sort(qs.begin(), qs.end(), [&](const Query& a, const Query& b) {
        int ba = a.l / B, bb = b.l / B;
        if (ba != bb) return ba < bb;
        return (ba & 1) ? a.r > b.r : a.r < b.r;
    });

    vector<int> cnt(n + 1, 0);
    vector<char> active(n + 1, 0);
    int cur = 0;
    auto toggle = [&](int x) {
        int c = val[x];
        if (active[x]) {
            active[x] = 0;
            if (--cnt[c] == 1) cur--;
        } else {
            active[x] = 1;
            if (++cnt[c] == 2) cur++;
        }
    };

    vector<int> ans(q);
    int L = 0, R = -1;
    for (auto& Q : qs) {
        while (L > Q.l) toggle(ord[--L]);
        while (R < Q.r) toggle(ord[++R]);
        while (L < Q.l) toggle(ord[L++]);
        while (R > Q.r) toggle(ord[R--]);
        if (Q.extra != -1) toggle(Q.extra);
        ans[Q.idx] = cur;
        if (Q.extra != -1) toggle(Q.extra);
    }

    for (int i = 0; i < q; i++) printf("%d\n", ans[i]);
    return 0;
}
