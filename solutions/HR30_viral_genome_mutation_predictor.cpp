#include <bits/stdc++.h>
using namespace std;

typedef long long ll;
typedef unsigned long long ull;
const ll MOD = 1000000007LL;

typedef vector<vector<ll>> Mat;

Mat mul(const Mat& A, const Mat& B) {
    int n = A.size();
    Mat C(n, vector<ll>(n, 0));
    for (int i = 0; i < n; i++)
        for (int k = 0; k < n; k++) {
            if (A[i][k] == 0) continue;
            ll a = A[i][k];
            for (int j = 0; j < n; j++)
                C[i][j] = (C[i][j] + a * B[k][j]) % MOD;
        }
    return C;
}

int idx(char c) {
    switch (c) {
        case 'A': return 0;
        case 'C': return 1;
        case 'G': return 2;
        default:  return 3;
    }
}

int main() {
    int n;
    ll L;
    cin >> n >> L;

    // Trie
    vector<array<int, 4>> go(1, {-1, -1, -1, -1});
    vector<int> fail(1, 0);
    vector<bool> bad(1, false);

    for (int i = 0; i < n; i++) {
        string s;
        cin >> s;
        int cur = 0;
        for (char ch : s) {
            int c = idx(ch);
            if (go[cur][c] == -1) {
                go[cur][c] = go.size();
                go.push_back({-1, -1, -1, -1});
                fail.push_back(0);
                bad.push_back(false);
            }
            cur = go[cur][c];
        }
        bad[cur] = true;
    }

    // Build failure links + full automaton (BFS)
    queue<int> q;
    for (int c = 0; c < 4; c++) {
        if (go[0][c] == -1) go[0][c] = 0;
        else {
            fail[go[0][c]] = 0;
            q.push(go[0][c]);
        }
    }
    while (!q.empty()) {
        int u = q.front(); q.pop();
        bad[u] = bad[u] || bad[fail[u]];
        for (int c = 0; c < 4; c++) {
            int v = go[u][c];
            if (v == -1) {
                go[u][c] = go[fail[u]][c];
            } else {
                fail[v] = go[fail[u]][c];
                q.push(v);
            }
        }
    }

    int S = go.size();

    // Transition matrix (only safe states)
    Mat M(S, vector<ll>(S, 0));
    for (int i = 0; i < S; i++) {
        if (bad[i]) continue;
        for (int c = 0; c < 4; c++) {
            int j = go[i][c];
            if (!bad[j]) M[i][j] += 1;
        }
    }

    // Result = start vector * M^L ; keep as vector, square the matrix
    vector<ll> vec(S, 0);
    vec[0] = 1;

    while (L > 0) {
        if (L & 1) {
            vector<ll> nv(S, 0);
            for (int i = 0; i < S; i++) {
                if (vec[i] == 0) continue;
                for (int j = 0; j < S; j++)
                    nv[j] = (nv[j] + vec[i] * M[i][j]) % MOD;
            }
            vec = nv;
        }
        L >>= 1;
        if (L) M = mul(M, M);
    }

    ll ans = 0;
    for (int i = 0; i < S; i++)
        if (!bad[i]) ans = (ans + vec[i]) % MOD;

    cout << ans << endl;
    return 0;
}
