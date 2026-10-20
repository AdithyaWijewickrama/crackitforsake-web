import java.io.*;
import java.util.*;

public class Main {
    static final int MAXN = 200005;
    static int[] lc = new int[MAXN], rc = new int[MAXN], sz = new int[MAXN];
    static int[] val = new int[MAXN], sm = new int[MAXN], mn = new int[MAXN], mx = new int[MAXN];
    static boolean[] rv = new boolean[MAXN], iv = new boolean[MAXN];
    static int[] pri = new int[MAXN];
    static int sa, sb;
    static int qs, qmn;
    static Random rng = new Random(712367);

    static void applyInv(int t) {
        if (t == 0) return;
        val[t] = -val[t];
        sm[t] = -sm[t];
        int a = mn[t], b = mx[t];
        mn[t] = -b;
        mx[t] = -a;
        iv[t] = !iv[t];
    }

    static void applyRev(int t) {
        if (t == 0) return;
        int tmp = lc[t]; lc[t] = rc[t]; rc[t] = tmp;
        int a = mn[t], b = mx[t];
        mn[t] = sm[t] - b;
        mx[t] = sm[t] - a;
        rv[t] = !rv[t];
    }

    static void push(int t) {
        if (iv[t]) { applyInv(lc[t]); applyInv(rc[t]); iv[t] = false; }
        if (rv[t]) { applyRev(lc[t]); applyRev(rc[t]); rv[t] = false; }
    }

    static void pull(int t) {
        int l = lc[t], r = rc[t];
        sz[t] = sz[l] + sz[r] + 1;
        int s = sm[l] + val[t];
        sm[t] = s + sm[r];
        mn[t] = Math.min(mn[l], s + mn[r]);
        mx[t] = Math.max(mx[l], s + mx[r]);
    }

    static void split(int t, int k) {
        if (t == 0) { sa = sb = 0; return; }
        push(t);
        if (sz[lc[t]] >= k) {
            split(lc[t], k);
            lc[t] = sb;
            sb = t;
            pull(t);
        } else {
            split(rc[t], k - sz[lc[t]] - 1);
            rc[t] = sa;
            sa = t;
            pull(t);
        }
    }

    static int merge(int a, int b) {
        if (a == 0) return b;
        if (b == 0) return a;
        if (pri[a] > pri[b]) {
            push(a);
            rc[a] = merge(rc[a], b);
            pull(a);
            return a;
        } else {
            push(b);
            lc[b] = merge(a, lc[b]);
            pull(b);
            return b;
        }
    }

    // balanced build over [lo, hi], priorities decrease with depth (heap-valid)
    static int build(int lo, int hi, int depth) {
        if (lo > hi) return 0;
        int mid = (lo + hi) >>> 1;
        pri[mid] = (1 << 30) - depth * (1 << 20) + rng.nextInt(1 << 20);
        lc[mid] = build(lo, mid - 1, depth + 1);
        rc[mid] = build(mid + 1, hi, depth + 1);
        pull(mid);
        return mid;
    }

    // read-only range query on 0-based positions [l, r] inside subtree t
    static void query(int t, int l, int r) {
        if (t == 0 || l > r) return;
        if (l == 0 && r == sz[t] - 1) {
            qmn = Math.min(qmn, qs + mn[t]);
            qs += sm[t];
            return;
        }
        push(t);
        int ls = sz[lc[t]];
        if (l < ls) query(lc[t], l, Math.min(r, ls - 1));
        if (l <= ls && r >= ls) {
            qs += val[t];
            qmn = Math.min(qmn, qs);
        }
        if (r > ls) query(rc[t], Math.max(0, l - ls - 1), r - ls - 1);
    }

    static DataInputStream in = new DataInputStream(new BufferedInputStream(System.in, 1 << 16));
    static byte[] buf = new byte[1 << 16];
    static int bl = 0, bp = 0;

    static int rb() throws IOException {
        if (bp == bl) {
            bl = in.read(buf, 0, buf.length);
            bp = 0;
            if (bl <= 0) return -1;
        }
        return buf[bp++];
    }

    static int nonSpace() throws IOException {
        int c = rb();
        while (c == ' ' || c == '\n' || c == '\r' || c == '\t') c = rb();
        return c;
    }

    static long readLong() throws IOException {
        int c = nonSpace();
        long x = 0;
        while (c >= '0' && c <= '9') {
            x = x * 10 + (c - '0');
            c = rb();
        }
        return x;
    }

    public static void main(String[] args) throws IOException {
        int n = (int) readLong();
        int q = (int) readLong();
        for (int i = 1; i <= n; i++) {
            int c = nonSpace();
            val[i] = (c == '(') ? 1 : -1;
        }
        // pull needs children built first; build() calls pull after children,
        // but leaves need val set, which is done above.
        int root = build(1, n, 0);

        StringBuilder out = new StringBuilder();
        while (q-- > 0) {
            int c = nonSpace();
            int l = (int) readLong();
            int r = (int) readLong();
            int len = r - l + 1;
            if (c == 'Q') {
                if ((len & 1) == 1) {
                    out.append("-1\n");
                } else {
                    qs = 0;
                    qmn = 0;
                    query(root, l - 1, r - 1);
                    int A = -qmn;
                    int B = qs + A;
                    out.append((A + 1) / 2 + (B + 1) / 2).append('\n');
                }
                continue;
            }
            long k = 0;
            if (c == 'C') {
                k = readLong();
                if (k % len == 0) continue;
            }
            split(root, r);
            int ab = sa, b = sb;
            split(ab, l - 1);
            int a = sa, m = sb;
            if (c == 'R') {
                applyRev(m);
            } else if (c == 'F') {
                applyInv(m);
            } else {
                int kk = (int) (k % len);
                split(m, len - kk);
                int x = sa, y = sb;
                m = merge(y, x);
            }
            root = merge(merge(a, m), b);
        }
        System.out.print(out);
    }
}
