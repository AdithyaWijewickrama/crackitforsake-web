/*
  Q16 - The Segment Tree Beats Energy Limiter
  ===========================================

  TASK
    Array A (N <= 150000), Q <= 150000 operations:
      1 L R X : A[i] = min(A[i], X) for i in [L, R]   (range chmin)
      2 L R   : sum of A[L..R] mod 998244353
    Print the sum of all type-2 answers mod 998244353.

  INSIGHT (Segment Tree Beats, Ji Ruyi)
    A lazy "min with X" tag does not let you update a range sum directly,
    because you don't know how many elements change. Each node stores:
        mx  = maximum value in the segment
        se  = strict second maximum (-1 if all equal)
        cnt = how many elements equal mx
        sum = segment sum (64-bit; max 1.5e5 * 1e9 = 1.5e14 fits)
    For chmin(X) on a fully covered node:
      - X >= mx       : nothing changes, stop.
      - se < X < mx   : only the cnt maximum elements change, each by (mx - X):
                        sum -= cnt * (mx - X); mx = X. Stop (lazy, O(1)).
      - X <= se       : can't handle in O(1) -> recurse into children ("beat").

  WHY IT IS FAST
    The third case only happens when X <= se, i.e. the node holds >= 2 distinct
    values that are >= X; after the update they merge into one value. The number
    of distinct values in a node is a potential that each extra recursion
    reduces, giving amortised O((N + Q) log N) total.

  PUSHDOWN
    The tag is implicit: a child whose mx exceeds the parent's mx gets clamped
    with the same O(1) rule (it must be in case 2 because the parent's maximum
    elements were exactly the child's maximum elements).

  SAMPLE
    A = 5 10 15 20 25
    1 2 4 12 -> 5 10 12 12 25
    2 1 5    -> 64
    1 1 5 8  -> (no more queries)
    Output 64.

  COMPLEXITY
    O((N + Q) log N) amortised, O(N) memory. Answers are summed as exact
    64-bit values reduced mod p at each query.
*/
#include <cstdio>
#include <climits>
#include <algorithm>
#include <vector>
using namespace std;

typedef long long ll;
const ll MOD = 998244353LL;
const ll NEG = LLONG_MIN;

vector<ll> mx, se, sm, A;
vector<int> cnt;

void pull(int o) {
    int l = o * 2, r = o * 2 + 1;
    sm[o] = sm[l] + sm[r];
    if (mx[l] == mx[r]) {
        mx[o] = mx[l]; cnt[o] = cnt[l] + cnt[r];
        se[o] = max(se[l], se[r]);
    } else if (mx[l] > mx[r]) {
        mx[o] = mx[l]; cnt[o] = cnt[l];
        se[o] = max(se[l], mx[r]);
    } else {
        mx[o] = mx[r]; cnt[o] = cnt[r];
        se[o] = max(mx[l], se[r]);
    }
}

void applyMin(int o, ll x) {
    if (x >= mx[o]) return;
    sm[o] -= (ll)cnt[o] * (mx[o] - x);
    mx[o] = x;
}

void push(int o) {
    applyMin(o * 2, mx[o]);
    applyMin(o * 2 + 1, mx[o]);
}

void build(int o, int l, int r) {
    if (l == r) {
        mx[o] = sm[o] = A[l]; se[o] = NEG; cnt[o] = 1;
        return;
    }
    int m = (l + r) / 2;
    build(o * 2, l, m);
    build(o * 2 + 1, m + 1, r);
    pull(o);
}

void update(int o, int l, int r, int ql, int qr, ll x) {
    if (qr < l || r < ql || x >= mx[o]) return;
    if (ql <= l && r <= qr && x > se[o]) {
        applyMin(o, x);
        return;
    }
    push(o);
    int m = (l + r) / 2;
    update(o * 2, l, m, ql, qr, x);
    update(o * 2 + 1, m + 1, r, ql, qr, x);
    pull(o);
}

ll query(int o, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return 0;
    if (ql <= l && r <= qr) return sm[o];
    push(o);
    int m = (l + r) / 2;
    return query(o * 2, l, m, ql, qr) + query(o * 2 + 1, m + 1, r, ql, qr);
}

static char buf[1 << 25];
int len, pos;

bool nextLine(vector<ll> &v) {
    v.clear();
    if (pos >= len) return false;
    while (pos < len && buf[pos] != '\n') {
        char c = buf[pos];
        if (c == '-' || (c >= '0' && c <= '9')) {
            bool neg = false;
            if (c == '-') { neg = true; pos++; }
            if (pos < len && buf[pos] >= '0' && buf[pos] <= '9') {
                ll x = 0;
                while (pos < len && buf[pos] >= '0' && buf[pos] <= '9') x = x * 10 + (buf[pos++] - '0');
                v.push_back(neg ? -x : x);
            }
        } else {
            pos++;
        }
    }
    pos++;
    return true;
}

int main() {
    len = (int)fread(buf, 1, sizeof(buf) - 1, stdin);
    pos = 0;
    vector<ll> tok, line;
    while (tok.size() < 2 && nextLine(line)) tok.insert(tok.end(), line.begin(), line.end());
    if (tok.size() < 2) return 0;
    ll n = tok[0], q = tok[1];
    vector<ll> arr(tok.begin() + 2, tok.end());
    while ((ll)arr.size() < n && nextLine(line)) arr.insert(arr.end(), line.begin(), line.end());
    A.assign(n + 1, 0);
    for (int i = 1; i <= n && i <= (int)arr.size(); i++) A[i] = arr[i - 1];
    mx.assign(4 * n + 4, 0); se.assign(4 * n + 4, NEG);
    sm.assign(4 * n + 4, 0); cnt.assign(4 * n + 4, 0);
    build(1, 1, (int)n);
    ll ans = 0, done = 0;
    vector<ll> pend;
    if ((ll)arr.size() > n) pend.assign(arr.begin() + n, arr.end());
    size_t at = 0;
    bool more = true;
    while (done < q) {
        if (at >= pend.size()) {
            pend.clear(); at = 0;
            if (!more || !(more = nextLine(line))) break;
            pend = line;
            continue;
        }
        ll t = pend[at];
        if (t != 1 && t != 2) { at = pend.size(); continue; }
        size_t need = (t == 1) ? 4 : 3;
        while (pend.size() - at < need && more && (more = nextLine(line)))
            pend.insert(pend.end(), line.begin(), line.end());
        if (pend.size() - at < need) break;
        ll l = pend[at + 1], r = pend[at + 2];
        ll x = (t == 1) ? pend[at + 3] : 0;
        at += need;
        done++;
        if (l > r) swap(l, r);
        if (l < 1) l = 1;
        if (r > n) r = n;
        if (l > r) continue;
        if (t == 1) {
            update(1, 1, (int)n, (int)l, (int)r, x);
        } else {
            ll sv = query(1, 1, (int)n, (int)l, (int)r) % MOD;
            if (sv < 0) sv += MOD;
            ans = (ans + sv) % MOD;
        }
    }
    printf("%lld\n", ans);
    return 0;
}
