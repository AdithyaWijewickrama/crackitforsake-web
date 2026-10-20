#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll MOD = 998244353, G = 3;

ll pw(ll b, ll e) {
    ll r = 1; b %= MOD;
    for (; e; e >>= 1, b = b * b % MOD) if (e & 1) r = r * b % MOD;
    return r;
}

void ntt(vector<ll>& a, bool inv) {
    int n = a.size();
    for (int i = 1, j = 0; i < n; i++) {
        int bit = n >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) swap(a[i], a[j]);
    }
    for (int len = 2; len <= n; len <<= 1) {
        ll w = pw(G, (MOD - 1) / len);
        if (inv) w = pw(w, MOD - 2);
        for (int i = 0; i < n; i += len) {
            ll cur = 1;
            for (int j = 0; j < len / 2; j++) {
                ll u = a[i + j], v = a[i + j + len / 2] * cur % MOD;
                a[i + j] = (u + v) % MOD;
                a[i + j + len / 2] = (u - v + MOD) % MOD;
                cur = cur * w % MOD;
            }
        }
    }
    if (inv) {
        ll ni = pw(n, MOD - 2);
        for (auto& x : a) x = x * ni % MOD;
    }
}

int main() {
    ll p, a; int Q;
    scanf("%lld %lld %d", &p, &a, &Q);

    // Legendre symbol table
    vector<int> chi(p, -1);
    chi[0] = 0;
    for (ll x = 1; x < p; x++) chi[x * x % p] = 1;

    // cnt[v] = #x with x^3 + a x == v (mod p)
    vector<int> cnt(p, 0);
    for (ll x = 0; x < p; x++) cnt[((x * x % p) * x + a * x) % p]++;

    int N = 1 << 19;
    vector<ll> A(N, 0), B(N, 0);
    for (ll i = 0; i < p; i++) A[i] = cnt[p - 1 - i];
    for (ll u = 0; u <= 2 * p - 2; u++) {
        int c = chi[u % p];
        B[u] = (c == -1) ? MOD - 1 : c;
    }

    ntt(A, false); ntt(B, false);
    for (int i = 0; i < N; i++) A[i] = A[i] * B[i] % MOD;
    ntt(A, true);

    string out;
    while (Q--) {
        ll b; scanf("%lld", &b);
        ll s = A[p - 1 + b];
        if (s > MOD / 2) s -= MOD;
        out += to_string(p + 1 + s);
        out += '\n';
    }
    fputs(out.c_str(), stdout);
}
