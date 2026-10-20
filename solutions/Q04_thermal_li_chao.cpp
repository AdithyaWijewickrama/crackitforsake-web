/*
PROBLEM 4: Thermal Dissipation (weighted job scheduling + Li Chao tree)

WHAT IT ASKS
  Pick non-overlapping jobs (next job must start strictly after the previous ends:
  L_j > R_i). Profit = sum of P minus (L_j - R_i)^2 for each consecutive pair.
  Maximize the profit (choosing nothing gives 0).

DP
  dp[j] = best profit of a schedule that ENDS with job j
        = P_j + max( 0,                                  // j is the first job
                     max over i with R_i < L_j of  dp[i] - (L_j - R_i)^2 )
  Answer = max(0, max dp[j]).
  Plain DP is O(N^2) = 1e10, too slow.

KEY INSIGHT: THE TRANSITION IS A LINE (convex hull trick)
  dp[i] - (L_j - R_i)^2 = (2*R_i) * L_j + (dp[i] - R_i^2)  -  L_j^2
                          \_ slope _/          \_ intercept _/
  So each finished job i is a LINE  y = m*x + c  with m = 2R_i, c = dp[i] - R_i^2,
  and for job j we need the MAXIMUM of all such lines at x = L_j, minus L_j^2.
  A Li Chao tree stores lines and answers "max at x" in O(log) each.

ORDER OF PROCESSING
  Sort jobs by L. Keep a second list of jobs sorted by R. Before computing dp[j],
  insert every job i with R_i < L_j (pointer over the R-sorted list). Such an i has
  L_i < R_i < L_j, so dp[i] is already computed when it gets inserted.
  The Li Chao tree is built over the sorted distinct L values (the only x we ever
  query), so it uses O(N) memory instead of a 1e6 range.

SAMPLE WALKTHROUGH   jobs [1,4] 20, [5,8] 30, [9,12] 25
  dp1 = 20
  dp2 = 30 + max(0, 20 - (5-4)^2) = 30 + 19 = 49
  dp3 = 25 + max(0, 49 - (9-8)^2) = 25 + 48 = 73      -> answer 73

OVERFLOW CHECK (long long is enough)
  dp <= 1e5 * 1e12 = 1e17; m*x <= 2e6 * 1e6 = 2e12; R^2 <= 1e12.

COMPLEXITY  O(N log N) time, O(N) memory.

VIVA NOTES
  - Expanding the square splits the cost into (part depending on i) * L_j + (part
    depending on i) + (part depending on j), so each i is a line evaluated at L_j.
  - The Li Chao tree keeps, in each segment, the line that wins at the midpoint, and
    pushes the loser down to the one half where it could still win: O(log) per insert.
  - Insert a job only once its R is strictly less than the current L (the strict
    non-overlap rule).
*/
#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
const ll NEG = LLONG_MIN;

struct Line { ll m, c; bool ok; };
vector<ll> xs;           // sorted distinct query points (L values)
vector<Line> tr;

ll eval(const Line& ln, ll x) { return ln.m * x + ln.c; }

void insertLine(int node, int lo, int hi, Line ln) {
    if (!tr[node].ok) { tr[node] = ln; return; }
    int mid = (lo + hi) / 2;
    bool leftBetter = eval(ln, xs[lo]) > eval(tr[node], xs[lo]);
    bool midBetter  = eval(ln, xs[mid]) > eval(tr[node], xs[mid]);
    if (midBetter) swap(tr[node], ln);  // keep the midpoint winner here
    if (lo == hi) return;
    if (leftBetter != midBetter) insertLine(2 * node, lo, mid, ln);
    else insertLine(2 * node + 1, mid + 1, hi, ln);
}

ll query(int node, int lo, int hi, int idx) {
    ll res = tr[node].ok ? eval(tr[node], xs[idx]) : NEG;
    if (lo == hi) return res;
    int mid = (lo + hi) / 2;
    ll sub = (idx <= mid) ? query(2 * node, lo, mid, idx) : query(2 * node + 1, mid + 1, hi, idx);
    return max(res, sub);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    if (!(cin >> n)) return 0;
    vector<ll> L(n), R(n), P(n);
    for (int i = 0; i < n; i++) cin >> L[i] >> R[i] >> P[i];

    xs = L;
    sort(xs.begin(), xs.end());
    xs.erase(unique(xs.begin(), xs.end()), xs.end());
    int sz = xs.size();
    Line empty = {0, 0, false};
    tr.assign(4 * sz + 4, empty);

    vector<int> byL(n), byR(n);
    for (int i = 0; i < n; i++) byL[i] = byR[i] = i;
    sort(byL.begin(), byL.end(), [&](int a, int b) { return L[a] < L[b]; });
    sort(byR.begin(), byR.end(), [&](int a, int b) { return R[a] < R[b]; });

    vector<ll> dp(n, 0);
    ll best = 0;
    int ptr = 0;
    for (int t = 0; t < n; t++) {
        int j = byL[t];
        // insert all jobs that end strictly before job j starts
        while (ptr < n && R[byR[ptr]] < L[j]) {
            int i = byR[ptr++];
            Line ln = {2 * R[i], dp[i] - R[i] * R[i], true};
            insertLine(1, 0, sz - 1, ln);
        }
        int idx = lower_bound(xs.begin(), xs.end(), L[j]) - xs.begin();
        ll q = query(1, 0, sz - 1, idx);
        ll prev = 0;  // j as the first job
        if (q != NEG) prev = max(prev, q - L[j] * L[j]);
        dp[j] = P[j] + prev;
        best = max(best, dp[j]);
    }
    cout << best << '\n';
    return 0;
}
