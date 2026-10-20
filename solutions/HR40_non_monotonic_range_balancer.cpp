#include <iostream>
#include <vector>
#include <deque>
#include <algorithm>

using namespace std;

int main() {
    // Optimize standard I/O operations for performance
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    long long k;
    
    if (!(cin >> n >> k)) return 0;

    vector<long long> a(n);
    for (int i = 0; i < n; ++i) {
        cin >> a[i];
    }

    // P[i] will store the sum of elements from A[0] to A[i-1]
    vector<long long> p(n + 1, 0);
    for (int i = 0; i < n; ++i) {
        p[i + 1] = p[i] + a[i];
    }

    deque<int> dq;
    int min_length = n + 1; // Initialize with a value strictly greater than max possible length

    for (int i = 0; i <= n; ++i) {
        // 1. Check if we can form a valid subarray >= K using the front of the deque
        while (!dq.empty() && p[i] - p[dq.front()] >= k) {
            min_length = min(min_length, i - dq.front());
            dq.pop_front(); // We found the shortest valid subarray starting at dq.front()
        }

        // 2. Maintain the monotonic property (increasing prefix sums)
        while (!dq.empty() && p[i] <= p[dq.back()]) {
            dq.pop_back(); // Remove larger prefix sums as they are worse starting points
        }

        // 3. Add the current index as a potential future starting point
        dq.push_back(i);
    }

    // Output the result
    if (min_length == n + 1) {
        cout << -1 << "\n";
    } else {
        cout << min_length << "\n";
    }

    return 0;
}
