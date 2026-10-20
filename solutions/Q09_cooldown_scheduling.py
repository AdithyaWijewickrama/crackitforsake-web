import sys


def main():
    data = sys.stdin.buffer.read().split()
    if not data:
        return
    n = int(data[0])
    V = 2 * n
    lits = []
    for i in range(n):
        a = int(data[1 + 3 * i])
        b = int(data[2 + 3 * i])
        d = int(data[3 + 3 * i])
        lits.append((a, a + d))
        lits.append((b, b + d))

    OFF = 1 << 33
    VV = V * V
    keys = []
    ext = keys.extend
    for p in range(V):
        si, ei = lits[p]
        base = p * V + OFF * VV
        start = (p | 1) + 1
        ext([(sj - ei if sj - ei > si - ej else si - ej) * VV + base + q
             for q, (sj, ej) in enumerate(lits[start:], start)])
    keys.sort()
    M = len(keys)
    P = [k // V % V for k in keys]
    Q = [k % V for k in keys]

    bits = [1 << v for v in range(V)]
    ALL = (1 << V) - 1
    EVEN = int("01" * n, 2)

    def swap(m):
        return ((m & EVEN) << 1) | ((m >> 1) & EVEN)

    def satisfiable(adj):
        unvis = ALL
        order = []
        push = order.append
        for s in range(V):
            if unvis >> s & 1:
                unvis ^= bits[s]
                st = [s]
                while st:
                    nb = adj[st[-1]] & unvis
                    if nb:
                        low = nb & -nb
                        unvis ^= low
                        st.append(low.bit_length() - 1)
                    else:
                        push(st.pop())
        radj = [swap(adj[v ^ 1]) for v in range(V)]
        unvis = ALL
        for s in reversed(order):
            if unvis >> s & 1:
                unvis ^= bits[s]
                comp = bits[s]
                st = [s]
                while st:
                    nb = radj[st.pop()] & unvis
                    while nb:
                        low = nb & -nb
                        nb ^= low
                        unvis ^= low
                        comp |= low
                        st.append(low.bit_length() - 1)
                if comp & swap(comp):
                    return False
        return True

    def extend(adj, lo, hi):
        adj = adj[:]
        for k in range(lo, hi):
            p = P[k]
            q = Q[k]
            adj[p] |= bits[q ^ 1]
            adj[q] |= bits[p ^ 1]
        return adj

    cur = [0] * V
    lo, hi = 0, M
    while hi - lo > 1:
        mid = (lo + hi) // 2
        nxt = extend(cur, lo, mid)
        if satisfiable(nxt):
            cur = nxt
            lo = mid
        else:
            hi = mid
    g = keys[lo] // VV - OFF
    print(g if g >= 0 else -1)


main()
