/*
 * Q13 - CYBER VAULT: The Points Protocol
 *
 * STEP 1 - RECOVER THE KEY (the puzzle part)
 *   The PDF points to https://splendorous-quokka-a94563.netlify.app/
 *   After the "I am human" check and the 5000-point game, the site shows four
 *   PNG fragments, read in order 01..04:
 *       JVZT  PJCH  BSAV  TLNH   ->  JVZTPJCHBSAVTLNH
 *   The site says every letter was Caesar-shifted 7 places FORWARD, so we shift
 *   each one 7 places BACK ("seven steps forward; the way back"):
 *       J->C V->O Z->S T->M P->I J->C C->V H->A B->U S->L A->T V->O T->M L->E N->G H->A
 *       KEY = COSMICVAULTOMEGA  (16 letters = the "sixteen guardians")
 *   The judge never gives the key, so it is hard-coded in the program.
 *
 * STEP 2 - THE CIPHER (decoding the riddle)
 *   "Sixteen guardians form an endless circle"  -> key used cyclically
 *   "Every message begins with a turn"          -> the circle is rotated by r first,
 *                                                  so letter i uses guardian key[(r+i) % 16]
 *   "every character advances the journey"      -> i, the 0-based position
 *   "guardian lends its alphabetical weight"    -> its letter value, A = 0
 *   "initial turn and distance travelled"       -> + r + i
 *   "alphabet has 26 positions, beginning at 0" -> wrap mod 26
 *
 *       out[i] = 'A' + ( (S[i]-'A') + (key[(r+i)%16]-'A') + r + i ) mod 26
 *
 *   (First version used key[i%16]; it passed only 2 tests, which is what you
 *   get when r = 0. Rotating the circle by r is the fix.)
 *
 * WALKTHROUGH (made-up example, the PDF has no sample)
 *   r = 1, S = "AB"
 *   i=0: guardian key[1]=O: A(0) + O(14) + 1 + 0 = 15 -> P
 *   i=1: guardian key[2]=S: B(1) + S(18) + 1 + 1 = 21 -> V
 *   output: PV
 *
 * WHY IT IS SAFE
 *   i can reach 99999, so reduce i mod 26 before adding; every term is < 26,
 *   the sum is < 104 and fits easily in int. No overflow anywhere.
 *
 * COMPLEXITY
 *   O(total |S|) = O(1e5) time, O(|S|) memory per line. Fast I/O used.
 *
 * VIVA NOTES
 *   - Where does the key come from? The website fragments, Caesar -7.
 *   - Why mod 26 on i first? Keeps numbers small; (a+b) mod 26 is the same
 *     as ((a mod 26)+(b mod 26)) mod 26.
 *   - Input is plain stdin (HackerRank compares the output file), not interactive.
 */
#include <cstdio>
#include <iostream>
#include <string>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    const string KEY = "COSMICVAULTOMEGA";
    int T;
    if (!(cin >> T)) return 0;
    string out;
    while (T--) {
        int r;
        string s;
        cin >> r >> s;
        for (size_t i = 0; i < s.size(); i++) {
            int v = (s[i] - 'A') + (KEY[(r + i) % 16] - 'A') + r + (int)(i % 26);
            s[i] = (char)('A' + v % 26);
        }
        out += s;
        out += '\n';
    }
    fwrite(out.data(), 1, out.size(), stdout);
    return 0;
}
