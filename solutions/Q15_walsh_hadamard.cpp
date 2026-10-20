/*
  Q15 - The High-Dimensional Walsh-Hadamard Transform
  ===================================================

  TASK
    A, B of length N = 2^D (D <= 18). C[k] = sum over i XOR j = k of A[i]*B[j]  (mod p),
    p = 998244353. Print sum_k (C[k] XOR k) mod p.

  INSIGHT
    Naive XOR convolution is O(N^2) = 6.9e10 for N = 262144: too slow.
    The Walsh-Hadamard transform H turns XOR convolution into pointwise product:
        H(C) = H(A) * H(B)   (element by element)
    and H is its own inverse up to a factor N:  H(H(x)) = N * x.
    So:  C = H( H(A) .* H(B) ) / N   (divide = multiply by modular inverse of N).

  WHY IT WORKS
    H(x)[s] = sum_i (-1)^popcount(i & s) x[i]. Because
    popcount((i^j) & s) has the same parity as popcount(i&s) + popcount(j&s),
    the character (-1)^popcount(k&s) is multiplicative over XOR, so the
    transform of a XOR convolution factorises into a product.

  BUTTERFLY (in place, D levels)
    for each block size 2h: (x, y) -> (x + y, x - y)   all mod p.
    Each level is O(N), so total O(D * 2^D) ~ 4.7 million operations.

  HASH
    C[k] is already reduced to [0, p). XOR with k (k < 2^18) may reach a value
    slightly over p, so each term is reduced again, then summed mod p.

  SAMPLE
    D=2, A = 1 2 3 4, B = 5 6 7 8
    C = [70, 68, 62, 60]  (e.g. C[0] = 1*5+2*6+3*7+4*8 = 70)
    (C[k] XOR k) = 70, 69, 60, 63  -> sum 262.
    NOTE: the PDF prints 206, which no reading of the statement reproduces
    (we tried XOR/OR/AND/cyclic convolutions and several hash variants).
    This code follows the written definition; a brute force agrees with it.

  COMPLEXITY
    Time O(D * 2^D), memory O(2^D). Max case runs well under 0.1 s.

  VIVA NOTES
    - Why mod inverse of N: inverse WHT = forward WHT divided by N; p is prime,
      so inv(N) = N^(p-2) mod p (Fermat).
    - Subtraction is done as x - y + p to stay non-negative.
    - long long products: values < p < 2^30, product < 2^60, fits.
*/
#include <cstdio>
#include <vector>
using namespace std;

typedef long long ll;
const ll MOD = 998244353LL;

ll power(ll b, ll e) {
    ll r = 1; b %= MOD;
    while (e) { if (e & 1) r = r * b % MOD; b = b * b % MOD; e >>= 1; }
    return r;
}

void fwht(vector<ll>& a) {
    int n = a.size();
    for (int h = 1; h < n; h <<= 1)
        for (int i = 0; i < n; i += h << 1)
            for (int j = i; j < i + h; j++) {
                ll x = a[j], y = a[j + h];
                a[j] = x + y >= MOD ? x + y - MOD : x + y;
                a[j + h] = x - y < 0 ? x - y + MOD : x - y;
            }
}

int main() {
    int D;
    if (scanf("%d", &D) != 1) return 0;
    int N = 1 << D;
    vector<ll> A(N), B(N);
    for (int i = 0; i < N; i++) { scanf("%lld", &A[i]); A[i] %= MOD; }
    for (int i = 0; i < N; i++) { scanf("%lld", &B[i]); B[i] %= MOD; }
    fwht(A);
    fwht(B);
    for (int i = 0; i < N; i++) A[i] = A[i] * B[i] % MOD;
    fwht(A);
    ll invN = power(N, MOD - 2);
    ll ans = 0;
    for (int k = 0; k < N; k++) {
        ll c = A[k] * invN % MOD;
        ans = (ans + ((c ^ (ll)k) % MOD)) % MOD;
    }
    printf("%lld\n", ans);
    return 0;
}
