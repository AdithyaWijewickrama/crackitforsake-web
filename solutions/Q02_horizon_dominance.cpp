/*
PROBLEM 2: Horizon Dominance Ray Projection (Right Dominator range queries)

WHAT IT ASKS
  R(i) = the first index j > i with A[j] > A[i] (the "next greater element").
  For each query [L, R], count the i with L <= i <= R, L <= R(i) <= R and R(i) - i <= K.

KEY INSIGHT
  1. R(i) - i <= K doesn't depend on the query, so first throw away every i that
     fails it (or has R(i) = INF). The rest are fixed "arrows" i -> R(i).
  2. Because i < R(i) always:
        L <= i      already gives  L <= R(i)
        R(i) <= R   already gives  i <= R
     So the 4 conditions collapse to just TWO:   i >= L   and   R(i) <= R.
  3. That's a 2D counting problem, solved OFFLINE with a sweep + Fenwick tree (BIT):
     sort the queries by R; sweep r = 1..N; at step r insert every arrow ending at r
     (add 1 at position i). After the inserts for r = R, the BIT holds exactly the
     arrows with R(i) <= R, and we count those with i >= L:
        answer = total_inserted - prefix(L - 1).

ALGORITHM
  1. Next greater element with a monotonic stack: O(N).
  2. Bucket arrow i into ends[R(i)] if R(i) exists and R(i) - i <= K.
  3. Sort queries by R and sweep with the BIT: O((N + Q) log N).

SAMPLE WALKTHROUGH  A = 4 2 3 6 1 5, K = 3
  R(1)=4 (D=3 ok), R(2)=3 (1), R(3)=4 (1), R(4)=INF, R(5)=6 (1), R(6)=INF
  Arrows: 1->4, 2->3, 3->4, 5->6
  [1,4]: arrows with i>=1 and end<=4 -> 1->4, 2->3, 3->4        = 3
  [2,5]: i>=2, end<=5               -> 2->3, 3->4               = 2
  [1,6]: all four                                               = 4

WHY NOT BRUTE FORCE
  Q * N = 4e10 operations, far too slow. Offline sweep is O((N+Q) log N).

COMPLEXITY  O((N + Q) log N) time, O(N + Q) memory.

VIVA NOTES
  - The next greater element comes from a monotonic stack (each index pushed/popped once).
  - Since i < R(i), the range conditions reduce to i >= L and R(i) <= R.
  - Answer queries offline in increasing R; the BIT over i counts arrows with i >= L.
*/
#include <bits/stdc++.h>
using namespace std;

int n;
vector<int> bit;
void bitAdd(int i) { for (; i <= n; i += i & -i) bit[i]++; }
int bitSum(int i) { int s = 0; for (; i > 0; i -= i & -i) s += bit[i]; return s; }

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    long long K;
    if (!(cin >> n >> K)) return 0;
    vector<long long> A(n + 1);
    for (int i = 1; i <= n; i++) cin >> A[i];

    // next greater element; 0 = none (INF)
    vector<int> nxt(n + 1, 0), st;
    for (int i = n; i >= 1; i--) {
        while (!st.empty() && A[st.back()] < A[i]) st.pop_back();
        nxt[i] = st.empty() ? 0 : st.back();
        st.push_back(i);
    }

    // ends[r] = all i whose valid arrow ends at r
    vector<vector<int> > ends(n + 1);
    for (int i = 1; i <= n; i++)
        if (nxt[i] != 0 && nxt[i] - i <= K) ends[nxt[i]].push_back(i);

    int q;
    cin >> q;
    vector<int> ql(q), qr(q), ord(q);
    for (int j = 0; j < q; j++) { cin >> ql[j] >> qr[j]; ord[j] = j; }
    sort(ord.begin(), ord.end(), [&](int a, int b) { return qr[a] < qr[b]; });

    bit.assign(n + 1, 0);
    vector<int> ans(q);
    int r = 0, inserted = 0;
    for (int t = 0; t < q; t++) {
        int j = ord[t];
        while (r < qr[j]) {  // insert all arrows ending at r+1
            r++;
            for (size_t k = 0; k < ends[r].size(); k++) { bitAdd(ends[r][k]); inserted++; }
        }
        ans[j] = inserted - bitSum(ql[j] - 1);  // arrows with i >= L
    }

    string out;
    for (int j = 0; j < q; j++) { out += to_string(ans[j]); out += '\n'; }
    cout << out;
    return 0;
}
