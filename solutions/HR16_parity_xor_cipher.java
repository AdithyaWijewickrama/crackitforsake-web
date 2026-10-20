import java.io.*;
import java.util.*;

public class Main {
    static final int B = 18;
    static int n;                 // leaves = N+1 (index 0 unused)
    static int[] t;               // flat segment tree: node p -> t[p*B .. p*B+B-1]
    static int[] E, fen;

    // ---------- fast input ----------
    static DataInputStream in = new DataInputStream(new BufferedInputStream(System.in, 1 << 16));
    static byte[] buf = new byte[1 << 16];
    static int bufLen = 0, bufPtr = 0;

    static int readByte() throws IOException {
        if (bufPtr == bufLen) {
            bufLen = in.read(buf, 0, buf.length);
            bufPtr = 0;
            if (bufLen <= 0) return -1;
        }
        return buf[bufPtr++];
    }

    static char readChar() throws IOException {
        int c = readByte();
        while (c <= ' ') c = readByte();
        return (char) c;
    }

    static long readLong() throws IOException {
        int c = readByte();
        while (c <= ' ') c = readByte();
        boolean neg = false;
        if (c == '-') { neg = true; c = readByte(); }
        long r = 0;
        while (c >= '0' && c <= '9') {
            r = r * 10 + (c - '0');
            c = readByte();
        }
        return neg ? -r : r;
    }

    // ---------- linear basis ----------
    static void ins(int[] b, int off, int x) {
        while (x != 0) {
            int h = 31 - Integer.numberOfLeadingZeros(x);
            if (b[off + h] == 0) { b[off + h] = x; return; }
            x ^= b[off + h];
        }
    }

    static void pull(int p) {
        int o = p * B, l = 2 * p * B, r = (2 * p + 1) * B;
        System.arraycopy(t, l, t, o, B);
        for (int i = 0; i < B; i++) {
            int v = t[r + i];
            if (v != 0) ins(t, o, v);
        }
    }

    // ---------- Fenwick (prefix XOR of E = A[i]) ----------
    static void fenUpd(int i, int x) {
        for (; i <= n - 1; i += i & -i) fen[i] ^= x;
    }

    static int fenQry(int i) {
        int r = 0;
        for (; i > 0; i -= i & -i) r ^= fen[i];
        return r;
    }

    static void pointXor(int pos, int x) {      // E[pos] ^= x
        if (pos > n - 1 || x == 0) return;
        E[pos] ^= x;
        fenUpd(pos, x);
        int p = pos + n;
        Arrays.fill(t, p * B, p * B + B, 0);
        ins(t, p * B, E[pos]);
        for (p >>= 1; p >= 1; p >>= 1) pull(p);
    }

    static void rangeXor(int l, int r, int x) {
        pointXor(l, x);
        pointXor(r + 1, x);
    }

    public static void main(String[] args) throws IOException {
        int N = (int) readLong();
        int Q = (int) readLong();
        n = N + 1;

        int[] A = new int[N + 2];
        for (int i = 1; i <= N; i++) A[i] = (int) readLong();

        E = new int[n];
        fen = new int[n + 1];
        t = new int[2 * n * B];

        for (int i = 1; i <= N; i++) {
            E[i] = A[i] ^ A[i - 1];
            ins(t, (i + n) * B, E[i]);
            fenUpd(i, E[i]);
        }
        for (int i = n - 1; i >= 1; i--) pull(i);

        StringBuilder sb = new StringBuilder();
        int[] R = new int[B];

        while (Q-- > 0) {
            char c = readChar();
            if (c == 'X') {
                int l = (int) readLong(), r = (int) readLong(), x = (int) readLong();
                rangeXor(l, r, x);
            } else if (c == 'S') {
                int i = (int) readLong(), x = (int) readLong();
                int d = fenQry(i) ^ x;
                if (d != 0) rangeXor(i, i, d);
            } else {
                int l = (int) readLong(), r = (int) readLong(), p = (int) readLong();
                long k = readLong();

                Arrays.fill(R, 0);
                if (l < r) {
                    int lo = l + 1 + n, hi = r + 1 + n;     // [lo, hi)
                    for (; lo < hi; lo >>= 1, hi >>= 1) {
                        if ((lo & 1) == 1) {
                            for (int i = 0; i < B; i++) {
                                int v = t[lo * B + i];
                                if (v != 0) ins(R, 0, v);
                            }
                            lo++;
                        }
                        if ((hi & 1) == 1) {
                            --hi;
                            for (int i = 0; i < B; i++) {
                                int v = t[hi * B + i];
                                if (v != 0) ins(R, 0, v);
                            }
                        }
                    }
                }

                // reduced row-echelon form
                for (int i = 0; i < B; i++) {
                    if (R[i] == 0) continue;
                    for (int j = i + 1; j < B; j++)
                        if (((R[j] >> i) & 1) == 1) R[j] ^= R[i];
                }

                int rank = 0;
                for (int i = 0; i < B; i++) if (R[i] != 0) rank++;

                if (k > (1L << rank)) {
                    sb.append("-1\n");
                    continue;
                }

                int a = 0;
                if (p == 1) {
                    a = fenQry(l);
                    for (int i = B - 1; i >= 0; i--)
                        if (R[i] != 0 && ((a >> i) & 1) == 1) a ^= R[i];
                }

                long m = k - 1;
                int ans = a, idx = 0;
                for (int i = 0; i < B; i++) {
                    if (R[i] != 0) {
                        if (((m >> idx) & 1L) == 1L) ans ^= R[i];
                        idx++;
                    }
                }
                sb.append(ans).append('\n');
            }
        }
        System.out.print(sb);
    }
}
