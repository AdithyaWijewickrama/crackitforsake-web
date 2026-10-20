#include <bits/stdc++.h>
using namespace std;
typedef long long ll;

int n, K;
vector<ll> pref;
vector<ll> prv, cur;

inline ll cost(int j, int i) {
    ll s = pref[i] - pref[j];
    ll l = i - j;
    return s * s + l * l;
}

// compute cur[i] for i in [lo, hi], optimal j in [optlo, opthi]
void solve(int lo, int hi, int optlo, int opthi) {
    if (lo > hi) return;
    int mid = (lo + hi) / 2;
    ll best = LLONG_MAX;
    int bestj = optlo;
    int up = min(mid - 1, opthi);
    for (int j = optlo; j <= up; j++) {
        if (prv[j] == LLONG_MAX) continue;
        ll v = prv[j] + cost(j, mid);
        if (v < best) { best = v; bestj = j; }
    }
    cur[mid] = best;
    solve(lo, mid - 1, optlo, bestj);
    solve(mid + 1, hi, bestj, opthi);
}

int main() {
    scanf("%d %d", &n, &K);
    pref.assign(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        ll a; scanf("%lld", &a);
        pref[i] = pref[i - 1] + a;
    }
    prv.assign(n + 1, LLONG_MAX);
    cur.assign(n + 1, LLONG_MAX);
    prv[0] = 0;
    for (int k = 1; k <= K; k++) {
        fill(cur.begin(), cur.end(), LLONG_MAX);
        solve(k, n, k - 1, n - 1);
        swap(prv, cur);
    }
    printf("%lld\n", prv[n]);
    return 0;
}
