/*
PROBLEM 5: Harmonious Substrings (Dyck-path prefix sums)

WHAT IT ASKS
  Count substrings S[l..r] where #vowels == #consonants, and every proper prefix
  has strictly more vowels than consonants.

KEY INSIGHT: PREFIX-SUM WALK
  Let P[0] = 0, P[t] = P[t-1] + 1 if S[t] is a vowel, else P[t-1] - 1.
  For a substring starting at l, the "surplus" after k letters is P[k] - P[l-1].
    Rule 1 (balanced):          P[r] == P[l-1]
    Rule 2 (prefixes positive): P[k] >  P[l-1] for every l <= k < r
  So r must be the FIRST index >= l where the walk comes back down to the
  starting height P[l-1]. That means:
    * Each l gives AT MOST ONE harmonious substring (the first return is unique).
    * S[l] must be a vowel (otherwise P[l] = P[l-1]-1 already breaks rule 2,
      and a 1-letter substring can't be balanced).
    * The walk moves by exactly +-1, so it cannot skip over the level P[l-1].
      Starting from P[l-1]+1, the first time it reaches <= P[l-1] it is exactly
      P[l-1]. So a return exists  <=>  min(P[l..N]) <= P[l-1].
  ANSWER = number of l with S[l] a vowel and sufMin[l] <= P[l-1],
           where sufMin[l] = min(P[l], P[l+1], ..., P[N]).

ALGORITHM, O(N)
  1. Build P[0..N].
  2. Build the suffix minimum sufMin from right to left.
  3. Count the l that satisfy the condition above.

SAMPLE WALKTHROUGH
  "ab": P = 0 1 0. l=1 ('a'): sufMin[1] = min(1,0) = 0 <= P[0] = 0 -> count 1.
        l=2 ('b') is a consonant -> skip.  Answer 1.
  "aababb" (picture): P = 0 1 2 1 2 1 0
        l=1 'a': min(P[1..6]) = 0 <= 0 -> "aababb"
        l=2 'a': min(P[2..6]) = 0 <= 1 -> "ab" (2..3)
        l=4 'a': min(P[4..6]) = 0 <= 1 -> "ab" (4..5)
        Answer 3.

WHY NOT BRUTE FORCE
  N = 5e5 means about 1.25e11 substrings, so O(N^2) is impossible. This is one pass.

COMPLEXITY  O(N) time, O(N) memory. The answer is <= N, but use long long anyway.

VIVA NOTES
  - Vowel = +1 and consonant = -1 turns both rules into a statement about a walk:
    it must stay strictly above its starting height and then come back to it.
  - Steps are +-1, so the walk can't jump over the starting level. The first
    return exists exactly when the suffix minimum is <= the start height.
  - Each start l has at most one valid end (the first return), so we just count starts.
*/
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    string s;
    if (!(cin >> n >> s)) return 0;
    n = s.size();  // trust the actual string length

    vector<int> P(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        char c = s[i - 1];
        bool vowel = (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u');
        P[i] = P[i - 1] + (vowel ? 1 : -1);
    }

    // sufMin[l] = min(P[l..n]); sufMin[n+1] = +infinity
    vector<int> sufMin(n + 2, INT_MAX);
    for (int i = n; i >= 1; i--) sufMin[i] = min(P[i], sufMin[i + 1]);

    long long ans = 0;
    for (int l = 1; l <= n; l++)
        if (P[l] == P[l - 1] + 1 && sufMin[l] <= P[l - 1]) ans++;

    cout << ans << '\n';
    return 0;
}
