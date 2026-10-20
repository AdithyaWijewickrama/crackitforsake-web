/*
Q19 - The Quantum Orbit Resonance
R_{t+1} = (A*R_t + B) mod p, p = 998244353 (prime). Find the minimum t >= 0 with R_t = T, or -1.

Insight: an affine map becomes a pure multiplication around its fixed point.
  Case R0 == T          -> 0.
  Case A == 0           -> R_1 = B forever after, so 1 if T == B else -1.
  Case A == 1           -> R_t = R0 + t*B. If B == 0 it never moves (-1). Otherwise t = (T-R0)/B mod p;
                           the sequence hits every residue exactly once in p steps, so that t in [0,p) is the minimum.
  Case A >= 2           -> fixed point c = B/(1-A). Then R_t - c = A^t (R0 - c).
                           If R0 == c the register never moves (-1). If T == c it is never reached (-1, A^t != 0).
                           Otherwise solve A^t = v, v = (T-c)/(R0-c): a discrete log, done with baby-step giant-step.

BSGS: m = ceil(sqrt(p)) ~ 31596. Baby table holds (A^j, j) for j < m, sorted, so lower_bound finds the smallest j
for a value. Giant step i checks v * A^(-m*i); the first i that matches, with the smallest j, gives the smallest
t = i*m + j. Every t < p is covered because (m+1)*m >= p, and the order of A divides p-1.

Sample: (3,0,2,18): 2,6,18 -> 2 (matches). The statement's other two sample answers do not follow its own rule:
(2,3,5,20) goes 5,13,29,61,... so t=2 is 29, not 20; the exact first hit is t=438615053.
(2,1,1,42) has R_t = 2^(t+1)-1, and 2^(t+1)=43 does have a solution: t=458984217 (checked by direct pow).
So this program prints 438615053 / 2 / 458984217 for the sample; the printed sample "2 2 -1" looks misprinted.

Complexity: O(sqrt(p) log p) per query, about 50 * 32k * 15 operations total.
Viva notes: why fixed point works (R_{t+1}-c = A(R_t-c) since c = A c + B); why A=1 is special (no fixed point);
modular inverse via Fermat (p prime); verified against brute simulation on small primes.
*/
#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
const ll P = 998244353;

ll pw(ll b, ll e) { ll r = 1; b %= P; while (e) { if (e & 1) r = r * b % P; b = b * b % P; e >>= 1; } return r; }
ll inv(ll a) { return pw(a, P - 2); }

ll bsgs(ll a, ll v) {
    ll m = 1;
    while (m * m < P) m++;
    vector<pair<ll, ll> > baby;
    baby.reserve(m);
    ll cur = 1;
    for (ll j = 0; j < m; j++) { baby.push_back(make_pair(cur, j)); cur = cur * a % P; }
    sort(baby.begin(), baby.end());
    ll step = inv(pw(a, m)), g = v;
    for (ll i = 0; i <= m; i++) {
        vector<pair<ll, ll> >::iterator it = lower_bound(baby.begin(), baby.end(), make_pair(g, -1LL));
        if (it != baby.end() && it->first == g) return i * m + it->second;
        g = g * step % P;
    }
    return -1;
}

ll solve(ll A, ll B, ll R, ll T) {
    if (R == T) return 0;
    if (A == 0) return T == B ? 1 : -1;
    if (A == 1) {
        if (B == 0) return -1;
        return (T - R + P) % P * inv(B) % P;
    }
    ll c = B * inv((1 - A + P) % P) % P;
    ll x = (R - c + P) % P, y = (T - c + P) % P;
    if (x == 0 || y == 0) return -1;
    return bsgs(A, y * inv(x) % P);
}

int main() {
    int q;
    if (scanf("%d", &q) != 1) return 0;
    while (q--) {
        ll A, B, R, T;
        scanf("%lld %lld %lld %lld", &A, &B, &R, &T);
        printf("%lld\n", solve(A, B, R, T));
    }
    return 0;
}
