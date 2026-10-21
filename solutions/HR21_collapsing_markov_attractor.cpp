#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll MOD = 1000000007LL;

ll power(ll b, ll e) {
    ll r = 1;
    b %= MOD;
    while (e > 0) {
        if (e & 1) r = r * b % MOD;
        b = b * b % MOD;
        e >>= 1;
    }
    return r;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int K;
    ll T;
    cin >> K >> T;

    ll tr = 0, corner = 0;
    for (int i = 0; i < K; i++) {
        for (int j = 0; j < K; j++) {
            ll x;
            cin >> x;
            x %= MOD;
            if (i == j) tr = (tr + x) % MOD;       // trace
            if (i == 0 && j == K - 1) corner = x;  // M[1][K]
        }
    }

    if (T == 0) {                                   // M^0 = identity
        cout << (K == 1 ? 1 : 0) << "\n";
        return 0;
    }
    cout << power(tr, T - 1) * corner % MOD << "\n";
    return 0;
}
