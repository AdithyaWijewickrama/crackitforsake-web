#include <bits/stdc++.h>
using namespace std;

int N, Q;
vector<int> bit;
void upd(int i){ for(; i <= N; i += i & -i) bit[i]++; }
int qry(int i){ int s = 0; for(; i > 0; i -= i & -i) s += bit[i]; return s; }

int main(){
    scanf("%d %d", &N, &Q);

    vector<int> st(N + 1, 0);
    int mx = 0;
    for(int n = 2; n <= N; n++){
        long long x = n;
        int c = 0;
        while(x >= n){
            x = (x & 1) ? 3 * x + 1 : x >> 1;
            c++;
        }
        st[n] = c + st[(int)x];
        mx = max(mx, st[n]);
    }

    vector<vector<int>> byStep(mx + 1);
    for(int n = 1; n <= N; n++) byStep[st[n]].push_back(n);

    vector<int> L(Q), R(Q), ans(Q);
    vector<vector<int>> byK(mx + 1);
    for(int i = 0; i < Q; i++){
        int k;
        scanf("%d %d %d", &L[i], &R[i], &k);
        byK[min(k, mx)].push_back(i);
    }

    bit.assign(N + 1, 0);
    for(int k = 0; k <= mx; k++){
        for(int n : byStep[k]) upd(n);
        for(int i : byK[k]) ans[i] = qry(R[i]) - qry(L[i] - 1);
    }

    for(int i = 0; i < Q; i++) printf("%d\n", ans[i]);
    return 0;
}
