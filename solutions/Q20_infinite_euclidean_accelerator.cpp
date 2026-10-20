/*
Q20 - The Infinite Euclidean Accelerator
From (A,B), each step does (x,y)->(x+y,y) or (x,y)->(x,x+y). Min steps to reach (X,Y), or -1.

Insight: run it backwards. Every value stays positive, so a pair (x,y) with x != y has exactly ONE
predecessor: if x > y it must have come from (x-y, y), otherwise from (x, y-x). A pair with x == y has none.
So the reverse path from (X,Y) is unique, which means "minimum steps" is just "the number of steps on that
one path", if (A,B) lies on it at all.

Walking back one subtraction at a time can take 10^18 steps (sample 3), so we batch them like the Euclidean
algorithm: while x > y we subtract y repeatedly, i.e. jump with x %= y and add x / y steps.
Before jumping, check whether (A,B) is in the middle of that run of subtractions:
  x > y, y == B, x >= A, (x - A) % y == 0  ->  answer = steps + (x - A) / y.
  x > y, y == B but that fails              ->  -1 (after this run x < y = B, so the next run shrinks y below B
                                                 and y can never come back up to B).
  x > y, x % y == 0 (and y != B)           ->  -1 (the run ends at (y,y), which has no predecessor).
  otherwise                                 ->  steps += x / y, x %= y.
Symmetric for y > x. Pruning: x < A or y < B -> -1, since coordinates never grow when walking backwards.
x == y and not equal to (A,B) -> -1.

Sample: (1,1)->(5,3): (5,3)<-(2,3)<-(2,1)<-(1,1), 3 steps.
        (2,3)->(10,15): gcd(10,15)=5, walking back goes (10,5)->(5,5) dead end -> -1.
        (1,1)->(10^18,1): y == B = 1, (10^18 - 1) / 1 = 999999999999999999.

Complexity: O(log max(X,Y)) per test (same as gcd). Each step lowers x + y by at least 1 and x + y >= 2,
so steps <= X + Y - 2 < 2e18, which fits in signed long long (max ~9.2e18).
Viva notes: uniqueness of predecessor => min = unique path length; modulo batches subtractions;
checked against a BFS brute force on all small pairs.

Robustness (hidden tests are locked, so the input is read defensively):
  - every number is read as text and parsed into unsigned __int128, so values above 10^18 (even above
    2^64) cannot break cin and silently stop the output;
  - if the token count does not fit "T then 4*T numbers", every group of 4 numbers is treated as a test;
  - a zero coordinate cannot cause division by zero (such a pair can only "reach" itself).
*/
#include <bits/stdc++.h>
using namespace std;
typedef unsigned __int128 u128;

const u128 NONE = ~(u128)0;

u128 solve(u128 A, u128 B, u128 x, u128 y) {
    u128 steps = 0;
    while (true) {
        if (x == A && y == B) return steps;
        if (x == 0 || y == 0) return NONE;
        if (x < A || y < B || x == y) return NONE;
        if (x > y) {
            if (y == B) return (x - A) % y == 0 ? steps + (x - A) / y : NONE;
            if (x % y == 0) return NONE;
            steps += x / y;
            x %= y;
        } else {
            if (x == A) return (y - B) % x == 0 ? steps + (y - B) / x : NONE;
            if (y % x == 0) return NONE;
            steps += y / x;
            y %= x;
        }
    }
}

u128 parse(const string &s) {
    u128 v = 0;
    for (size_t i = 0; i < s.size(); i++)
        if (s[i] >= '0' && s[i] <= '9') v = v * 10 + (s[i] - '0');
    return v;
}

string show(u128 v) {
    if (v == 0) return "0";
    string r;
    while (v) { r += char('0' + (int)(v % 10)); v /= 10; }
    reverse(r.begin(), r.end());
    return r;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    vector<u128> a;
    string tok;
    while (cin >> tok) a.push_back(parse(tok));
    if (a.empty()) return 0;
    size_t start = 1, n = a.size();
    if ((n - 1) % 4 != 0 || a[0] != (u128)((n - 1) / 4)) {
        if ((n - 1) % 4 == 0) start = 1;
        else if (n % 4 == 0) start = 0;
    }
    for (size_t i = start; i + 3 < n; i += 4) {
        u128 r = solve(a[i], a[i + 1], a[i + 2], a[i + 3]);
        if (r == NONE) cout << "-1\n";
        else cout << show(r) << "\n";
    }
    return 0;
}
