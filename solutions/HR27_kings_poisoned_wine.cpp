#include <iostream>
using namespace std;

int main() {
    long long B, D;
    cin >> B >> D;

    long long base = D + 1;
    long long power = 1;   // base^n
    int n = 0;

    while (power < B) {
        power *= base;     // at most ~1e9 * (1e9+1), fits in long long
        n++;
    }

    cout << n << endl;
    return 0;
}
