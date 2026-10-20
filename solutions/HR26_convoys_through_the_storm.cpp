#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

struct Line {
    ll m, b;
    ll eval(ll x) const { return m * x + b; }
};

int M;
vector<ll> xs;
vector<Line> tr;
vector<char> has;

void insertLine(int node, int lo, int hi, Line ln) {
    if (!has[node]) {
        tr[node] = ln;
        has[node] = 1;
        return;
    }
    int mid = (lo + hi) / 2;
    if (ln.eval(xs[mid]) < tr[node].eval(xs[mid])) swap(ln, tr[node]);
    if (lo == hi) return;
    if (ln.eval(xs[lo]) < tr[node].eval(xs[lo]))
        insertLine(node * 2, lo, mid, ln);
    else if (ln.eval(xs[hi]) < tr[node].eval(xs[hi]))
        insertLine(node * 2 + 1, mid + 1, hi, ln);
}

ll query(int pos) {
    ll x = xs[pos];
    ll best = LLONG_MAX;
    int node = 1, lo = 0, hi = M - 1;
    while (true) {
        if (has[node]) best = min(best, tr[node].eval(x));
        if (lo == hi) break;
        int mid = (lo + hi) / 2;
        if (pos <= mid) { node = node * 2; hi = mid; }
        else            { node = node * 2 + 1; lo = mid + 1; }
    }
    return best;
}

int main() {
    int n;
    ll C;
    scanf("%d %lld", &n, &C);
    vector<ll> P(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        ll a;
        scanf("%lld", &a);
        P[i] = P[i - 1] + a;
    }

    xs.assign(P.begin() + 1, P.end());
    sort(xs.begin(), xs.end());
    xs.erase(unique(xs.begin(), xs.end()), xs.end());
    M = xs.size();
    tr.assign(4 * M + 4, Line{0, 0});
    has.assign(4 * M + 4, 0);

    // j = 0: dp[0] = 0, P[0] = 0
    insertLine(1, 0, M - 1, Line{0, 0});

    ll dp = 0;
    for (int i = 1; i <= n; i++) {
        int pos = lower_bound(xs.begin(), xs.end(), P[i]) - xs.begin();
        dp = P[i] * P[i] + C + query(pos);
        insertLine(1, 0, M - 1, Line{-2 * P[i], dp + P[i] * P[i]});
    }

    printf("%lld\n", dp);
    return 0;
}
