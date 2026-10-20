#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll MOD = 998244353;

int M;
vector<ll> bit;
void upd(int i, ll v) { for (; i <= M; i += i & -i) bit[i] += v; }
ll qry(int i) { ll s = 0; for (; i > 0; i -= i & -i) s += bit[i]; return s; }

int main() {
    int n, q;
    scanf("%d %d", &n, &q);
    vector<array<ll,3>> pts(n);              // x, y, w
    vector<ll> ys(n);
    for (int i = 0; i < n; i++) {
        scanf("%lld %lld %lld", &pts[i][0], &pts[i][1], &pts[i][2]);
        ys[i] = pts[i][1];
    }
    sort(pts.begin(), pts.end());
    sort(ys.begin(), ys.end());
    ys.erase(unique(ys.begin(), ys.end()), ys.end());
    M = ys.size();
    bit.assign(M + 1, 0);

    struct Ev { ll x; int id, sign, lo, hi; };
    vector<Ev> ev;
    ev.reserve(2 * q);
    vector<ll> ans(q, 0);

    for (int j = 0; j < q; j++) {
        ll x1, x2, y1, y2;
        scanf("%lld %lld %lld %lld", &x1, &x2, &y1, &y2);
        if (x1 > x2 || y1 > y2) continue;    // empty zone -> answer 0
        // closed zone: x1 <= x <= x2, y1 <= y <= y2
        int lo = lower_bound(ys.begin(), ys.end(), y1) - ys.begin();  // count of ys < y1
        int hi = upper_bound(ys.begin(), ys.end(), y2) - ys.begin();  // count of ys <= y2
        if (lo >= hi) continue;
        ev.push_back({x2,     j, +1, lo, hi});
        ev.push_back({x1 - 1, j, -1, lo, hi});
    }
    sort(ev.begin(), ev.end(), [](const Ev& a, const Ev& b){ return a.x < b.x; });

    int p = 0;
    for (auto& e : ev) {
        while (p < n && pts[p][0] <= e.x) {
            int yi = lower_bound(ys.begin(), ys.end(), pts[p][1]) - ys.begin() + 1;
            upd(yi, pts[p][2]);
            p++;
        }
        ans[e.id] += e.sign * (qry(e.hi) - qry(e.lo));
    }

    ll res = 0;
    for (int j = 0; j < q; j++) res ^= (ans[j] % MOD);
    printf("%lld\n", res);
    return 0;
}
