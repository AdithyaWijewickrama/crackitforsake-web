#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef priority_queue<ll, vector<ll>, greater<ll> > MinHeap;

int n, q;
vector<vector<pair<int,int> > > adj;
vector<vector<pair<int,ll> > > lst;
vector<char> rem;
vector<int> sz, par;
vector<MinHeap> addH, delH;

int main() {
    if (scanf("%d %d", &n, &q) != 2) return 0;
    adj.assign(n + 1, vector<pair<int,int> >());
    for (int i = 0; i < n - 1; i++) {
        int u, v, w;
        scanf("%d %d %d", &u, &v, &w);
        adj[u].push_back(make_pair(v, w));
        adj[v].push_back(make_pair(u, w));
    }
    lst.assign(n + 1, vector<pair<int,ll> >());
    rem.assign(n + 1, 0);
    sz.assign(n + 1, 0);
    par.assign(n + 1, 0);
    vector<int> order;
    vector<int> bq, bf;
    vector<ll> bd;
    vector<int> st;
    st.push_back(1);
    while (!st.empty()) {
        int r = st.back(); st.pop_back();
        order.clear();
        order.push_back(r);
        par[r] = 0;
        for (size_t i = 0; i < order.size(); i++) {
            int u = order[i];
            for (size_t j = 0; j < adj[u].size(); j++) {
                int v = adj[u][j].first;
                if (v != par[u] && !rem[v]) { par[v] = u; order.push_back(v); }
            }
        }
        int tot = order.size();
        for (int i = tot - 1; i >= 0; i--) sz[order[i]] = 1;
        for (int i = tot - 1; i >= 1; i--) sz[par[order[i]]] += sz[order[i]];
        int c = r;
        for (int i = 0; i < tot; i++) {
            int u = order[i];
            int mx = tot - sz[u];
            for (size_t j = 0; j < adj[u].size(); j++) {
                int v = adj[u][j].first;
                if (v != par[u] && !rem[v]) mx = max(mx, sz[v]);
            }
            if (2 * mx <= tot) { c = u; break; }
        }
        bq.clear(); bf.clear(); bd.clear();
        bq.push_back(c); bf.push_back(0); bd.push_back(0);
        for (size_t i = 0; i < bq.size(); i++) {
            int u = bq[i], f = bf[i];
            ll d = bd[i];
            lst[u].push_back(make_pair(c, d));
            for (size_t j = 0; j < adj[u].size(); j++) {
                int v = adj[u][j].first;
                if (v != f && !rem[v]) {
                    bq.push_back(v); bf.push_back(u); bd.push_back(d + adj[u][j].second);
                }
            }
        }
        rem[c] = 1;
        for (size_t j = 0; j < adj[c].size(); j++) {
            int v = adj[c][j].first;
            if (!rem[v]) st.push_back(v);
        }
    }
    addH.resize(n + 1);
    delH.resize(n + 1);
    vector<char> on(n + 1, 0);
    for (int k = 0; k < q; k++) {
        char t; int v;
        scanf(" %c %d", &t, &v);
        if (t == 'T') {
            vector<MinHeap>& h = on[v] ? delH : addH;
            for (size_t i = 0; i < lst[v].size(); i++) h[lst[v][i].first].push(lst[v][i].second);
            on[v] = !on[v];
        } else {
            ll best = -1;
            for (size_t i = 0; i < lst[v].size(); i++) {
                int c = lst[v][i].first;
                MinHeap& a = addH[c];
                MinHeap& b = delH[c];
                while (!a.empty() && !b.empty() && a.top() == b.top()) { a.pop(); b.pop(); }
                if (!a.empty()) {
                    ll cand = lst[v][i].second + a.top();
                    if (best < 0 || cand < best) best = cand;
                }
            }
            printf("%lld\n", best);
        }
    }
    return 0;
}
