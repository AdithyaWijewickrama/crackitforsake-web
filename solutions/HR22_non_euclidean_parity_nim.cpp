#include <bits/stdc++.h>
using namespace std;

// By Lucas' theorem, C(a, k) is odd  <=>  k is a submask of a  (k & a == k).
// Subtracting such a k gives a - k = a ^ k, a proper submask of a.
// So each pile is the game "move x to any proper submask of x".
// Grundy(x) = popcount(x): the proper submasks of x have popcounts 0..p-1
// (all of them achieved), and none has popcount p, so mex = p.
// The whole game is a sum of piles, so Alice wins iff XOR of popcounts != 0.

int main() {
    int T;
    if (scanf("%d", &T) != 1) return 0;
    while (T--) {
        int n;
        scanf("%d", &n);
        int x = 0;
        for (int i = 0; i < n; i++) {
            unsigned long long a;
            scanf("%llu", &a);
            x ^= __builtin_popcountll(a);
        }
        puts(x ? "ALICE" : "BOB");
    }
    return 0;
}
