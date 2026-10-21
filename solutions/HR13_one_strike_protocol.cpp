#include <bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef unsigned long long ull;
const ull MOD = 1000000007ULL;

typedef vector<vector<ull>> Mat;

Mat mul(const Mat& A, const Mat& B) {
    int n = A.size();
    Mat C(n, vector<ull>(n, 0));
    for (int i = 0; i < n; i++)
        for (int k = 0; k < n; k++) {
            ull a = A[i][k];
            if (!a) continue;
            for (int j = 0; j < n; j++)
                C[i][j] = (C[i][j] + a * B[k][j]) % MOD;
        }
    return C;
}

vector<ull> vecMul(const vector<ull>& v, const Mat& T) {
    int n = v.size();
    vector<ull> r(n, 0);
    for (int k = 0; k < n; k++) {
        if (!v[k]) continue;
        for (int j = 0; j < n; j++)
            r[j] = (r[j] + v[k] * T[k][j]) % MOD;
    }
    return r;
}

int main() {
    int K, M;
    ll L;
    cin >> K >> M >> L;
    string alpha;
    cin >> alpha;
    int idx[256];
    memset(idx, -1, sizeof idx);
    for (int i = 0; i < K; i++) idx[(unsigned char)alpha[i]] = i;

    // trie
    vector<array<int, 6>> go(1);
    go[0].fill(-1);
    vector<int> cnt(1, 0), fail(1, 0);
    for (int i = 0; i < M; i++) {
        string s;
        cin >> s;
        int v = 0;
        for (char ch : s) {
            int c = idx[(unsigned char)ch];
            if (go[v][c] == -1) {
                int id = go.size();
                go[v][c] = id;
                go.push_back({});
                go.back().fill(-1);
                cnt.push_back(0);
                fail.push_back(0);
            }
            v = go[v][c];
        }
        cnt[v]++;
    }

    // Aho-Corasick (BFS), cnt[v] = # signatures that are suffixes of node v's string
    int n = go.size();
    queue<int> q;
    for (int c = 0; c < K; c++) {
        if (go[0][c] == -1) go[0][c] = 0;
        else { fail[go[0][c]] = 0; q.push(go[0][c]); }
    }
    while (!q.empty()) {
        int v = q.front(); q.pop();
        cnt[v] += cnt[fail[v]];
        for (int c = 0; c < K; c++) {
            int u = go[v][c];
            if (u == -1) go[v][c] = go[fail[v]][c];
            else { fail[u] = go[fail[v]][c]; q.push(u); }
        }
    }

    // state = (node, strikes so far in {0,1}) -> index s*n + node
    int N = 2 * n;
    Mat T(N, vector<ull>(N, 0));
    for (int v = 0; v < n; v++)
        for (int c = 0; c < K; c++) {
            int u = go[v][c];
            int w = cnt[u];
            if (w == 0) {
                T[v][u]++;
                T[n + v][n + u]++;
            } else if (w == 1) {
                T[v][n + u]++;      // 0 -> 1 strike
            }                       // w>=2, or 1 -> 2: dropped
        }

    vector<ull> r(N, 0);
    r[0] = 1; // root, 0 strikes
    ll e = L;
    while (e > 0) {
        if (e & 1) r = vecMul(r, T);
        e >>= 1;
        if (e) T = mul(T, T);
    }
    ull ans = 0;
    for (int u = 0; u < n; u++) ans = (ans + r[n + u]) % MOD;
    cout << ans << "\n";
}
