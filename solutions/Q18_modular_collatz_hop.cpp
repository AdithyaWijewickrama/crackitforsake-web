/*
 Q18 - The Modular Collatz Hop

 Problem: from index i we always jump to (i*i + C) mod N. Find the minimum number of
 jumps from S to Dest, or -1 if Dest is never reached.

 Insight: every index has exactly ONE next index, so this is a functional graph. The
 path from S is forced: there is no choice, so "minimum jumps" is simply the first time
 the walk hits Dest. The walk visits at most N distinct indices before it repeats an
 index; once an index repeats, the walk is inside a cycle and will only revisit indices
 it has already seen. So if Dest was not seen by then, it is unreachable -> -1.

 Algorithm: walk from S, counting steps, marking each visited index. Stop when we reach
 Dest (answer = steps) or land on an already-marked index (answer = -1).
 S == Dest gives 0 jumps.

 Overflow: i < 200000 so i*i < 4e10, which does not fit in int -> use long long.

 Sample walkthrough:
  10 1 2 5 : 2 -> 4+1=5. Reached in 1 jump.
  10 1 2 8 : 2 -> 5 -> 6 -> 7 -> 0 -> 1 -> 2 (seen) -> cycle without 8 -> -1.
  7 3 1 4  : 1 -> 1+3=4. Reached in 1 jump.

 Complexity: O(N) time and memory per testcase; sum of N <= 300000.

 Viva notes: a plain while(cur != Dest) loops forever when Dest is off the cycle; the
 visited array is the cycle detection (Floyd's tortoise/hare would also work with O(1)
 memory). BFS is unnecessary because out-degree is 1.
*/
#include <cstdio>
#include <vector>
using namespace std;

int main() {
    int T;
    if (scanf("%d", &T) != 1) return 0;
    while (T--) {
        long long N, C, S, D;
        scanf("%lld %lld %lld %lld", &N, &C, &S, &D);
        vector<char> seen(N, 0);
        long long cur = S, steps = 0, ans = -1;
        while (true) {
            if (cur == D) { ans = steps; break; }
            if (seen[cur]) break;
            seen[cur] = 1;
            cur = (cur * cur + C) % N;
            steps++;
        }
        printf("%lld\n", ans);
    }
    return 0;
}
