#include <bits/stdc++.h>
using namespace std;
typedef unsigned long long ull;
const ull P = 998244353ULL;
int N;

vector<ull> mul(const vector<ull>& a, const vector<ull>& b) {
    vector<ull> c(N, 0);
    for (int i = 0; i < N; i++) {
        if (!a[i]) continue;
        for (int j = 0; j < N; j++) {
            int k = i + j; if (k >= N) k -= N;
            c[k] = (c[k] + a[i] * b[j]) % P;
        }
    }
    return c;
}

int main() {
    ull T;
    scanf("%d %llu", &N, &T);
    if (N <= 0) return 0;
    vector<ull> a(N);
    for (auto& x : a) scanf("%llu", &x);

    const ull inv3 = 332748118ULL;
    vector<ull> base(N, 0), res(N, 0);
    // += handles tiny N where offsets overlap
    base[(N - 1) % N] += inv3;
    base[0]           += inv3;
    base[1 % N]       += inv3;
    for (auto& x : base) x %= P;

    res[0] = 1;                      // identity (delta at 0)
    while (T) {
        if (T & 1) res = mul(res, base);
        base = mul(base, base);
        T >>= 1;
    }

    vector<ull> out = mul(res, a);   // cyclic convolution
    for (int i = 0; i < N; i++)
        printf("%llu%c", out[i], i + 1 < N ? ' ' : '\n');
}
