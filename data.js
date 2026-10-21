// ============================================================================
// 1. BILINGUAL ENCYCLOPEDIA OF ACRONYMS & HARD WORDS (EN + SI + EXAMPLES)
// ============================================================================
window.GLOSSARY_DATA = [
  {
    term: "Monotonic Stack",
    cat: "Data Structure",
    en: "A stack whose elements stay strictly sorted (increasing or decreasing). Before pushing a new item, we pop all items that violate the order. Because each index is pushed once and popped at most once, the total time for N elements is O(N).",
    si: "අගයන් වැඩිවන හෝ අඩුවන පිළිවෙලට පමණක් තබා ගන්නා Stack එකකි. අලුත් අගයක් දැමීමට පෙර පිළිවෙල කඩ කරන අගයන් ඉවත් (pop) කරයි. සෑම අගයක්ම එක් වරක් පමණක් ඇතුළු වී එක් වරක් පමණක් ඉවත් වන නිසා මුළු කාලය O(N) වේ.",
    exEn: "Example (Q1 & Q7): For energies [10, 20, 15, 5, 25], when i=2 (E=20) arrives, 10 is popped because 10 < 20. Stack becomes [2]. When i=3 (E=15) arrives, 20 > 15 so 2 stays on top → nearest bigger on left is index 2!",
    exSi: "උදාහරණය (Q1 සහ Q7): [10, 20, 15, 5, 25] හි i=2 (E=20) එන විට 10 < 20 නිසා 10 ඉවත් වේ. i=3 (E=15) එන විට 20 > 15 නිසා වම් පස ළඟම විශාල අගය index 2 බව ක්ෂණිකව ලැබේ."
  },
  {
    term: "CDQ",
    cat: "Acronym / Algorithm",
    en: "CDQ Divide and Conquer (named after Chen Danqi): Solves 3-dimensional dominance counting (t, X, Y) in O(N log² N) by dividing on the 1st coordinate t, sorting on the 2nd coordinate X, and using a Fenwick Tree (BIT) on the 3rd coordinate Y.",
    si: "CDQ බෙදා විසඳීමේ ක්‍රමය: ත්‍රිමාණ ගණන් කිරීමේ ගැටලුවක් (t, X, Y) විසඳීමට පළමු අගයෙන් (t) දෙකට බෙදා, දෙවන අගයෙන් (X) sort කර, තුන්වන අගය (Y) BIT එකකට දමා O(N log² N) කාලයකින් විසඳන ක්‍රමයකි.",
    exEn: "Example (Q1): We need count of v with v <= R[u], X[v] > X[u], Y[v] > Y[u]. CDQ splits events into Left [lo, mid) and Right [mid, hi). Every point in Left automatically has t <= every query in Right!",
    exSi: "උදාහරණය (Q1): වම් භාගයේ ඇති සියලුම ලක්ෂ්‍යවල index එක දකුණු භාගයේ ඇති ප්‍රශ්නවලට වඩා කුඩා බැවින් පළමු කොන්දේසිය ඉබේම සම්පූර්ණ වේ."
  },
  {
    term: "BIT",
    cat: "Acronym / Data Structure",
    en: "Binary Indexed Tree (Fenwick Tree): Supports point addition bitAdd(i, v) and prefix sum bitSum(i) = A[1]+...+A[i] in O(log N) time and O(N) memory using bit trick i += i & -i.",
    si: "Binary Indexed Tree (Fenwick Tree): i & -i යන bit නීතිය භාවිතා කර එක් ස්ථානයකට අගයක් එකතු කිරීම සහ මුල සිට i දක්වා එකතුව (prefix sum) O(log N) වේගයෙන් ලබා දෙන ව්‍යුහයකි.",
    exEn: "Example: bitAdd(3, 1) updates indices 3 (011₂), 4 (100₂), 8 (1000₂). bitSum(7) adds tree[7] + tree[6] + tree[4] in just 3 steps!",
    exSi: "උදාහරණය: bitAdd(3, 1) මගින් 3, 4, 8 යන ස්ථාන update කරයි. bitSum(7) මගින් පියවර 3 කින් tree[7] + tree[6] + tree[4] එකතුව ලබා දෙයි."
  },
  {
    term: "LCA",
    cat: "Acronym / Tree",
    en: "Lowest Common Ancestor: The deepest node in a rooted tree that is an ancestor of both u and v. Found in O(log N) using Binary Lifting table up[j][v] = 2^j-th ancestor.",
    si: "පහළම පොදු මුතුන්මිත්තා: ගසක (Tree) u සහ v යන දෙකටම පොදු වූ ගැඹුරුම මුතුන්මිත්තා. Binary Lifting (2^j පියවර උඩට පැනීම) මගින් O(log N) කාලයකින් සොයයි.",
    exEn: "Example (Q3 & Q23): Distance in edges between u and v in a tree is depth[u] + depth[v] - 2 * depth[LCA(u, v)].",
    exSi: "උදාහරණය (Q3 සහ Q23): u සහ v අතර දුර = depth[u] + depth[v] - 2 * depth[LCA(u, v)]."
  },
  {
    term: "SAM",
    cat: "Acronym / String",
    en: "Suffix Automaton: A directed acyclic word graph with at most 2N-1 states that represents all substrings of S. Each state is an 'endpos equivalence class' (substrings ending at the exact same positions).",
    si: "Suffix Automaton: අකුරු N ක වචනයක සියලුම උප-වචන (substrings) නිරූපණය කරන states 2N-1 කට නොවැඩි ප්‍රස්තාරයකි. එකම ස්ථානවලින් අවසන් වන substrings එකම state එකකට වැටේ.",
    exEn: "Example (Q4): In S = 'aaaaab', substrings 'ab', 'aab', 'aaab', 'aaaab', 'aaaaab' all end only at position 6. So they share 1 state with capacity (max len) = 6.",
    exSi: "උදාහරණය (Q4): 'aaaaab' හි 'ab' සිට 'aaaaab' දක්වා සියල්ල අවසන් වන්නේ 6 වන ස්ථානයෙන් පමණි. එබැවින් ඒ සියල්ල එකම state එකකි."
  },
  {
    term: "MEX / Grundy",
    cat: "Acronym / Game Theory",
    en: "Minimum Excluded Value (Grundy Number / Strategic Index): For a game state, mex is the smallest non-negative integer (0, 1, 2, ...) not present among the Grundy numbers of reachable next states. Terminal states (no moves) have mex = 0.",
    si: "Minimum Excluded Value (Grundy අගය): ක්‍රීඩාවක යම් අවස්ථාවක සිට යා හැකි ඊළඟ අවස්ථාවල Grundy අගයන් අතර නොමැති කුඩාම ඍණ-නොවන පූර්ණ සංඛ්‍යාව (0, 1, 2...).",
    exEn: "Example (Q4 & Q22): If from state u you can move to states with Grundy values {0, 2, 3}, then Grundy(u) = mex({0, 2, 3}) = 1. For multiple independent tokens, the combined game value is the XOR of their Grundy values (Sprague-Grundy Theorem).",
    exSi: "උදාහරණය (Q4 සහ Q22): යා හැකි අවස්ථාවල අගයන් {0, 2, 3} නම් එහි mex අගය 1 වේ. ක්‍රීඩා කිහිපයක් එකවර ඇති විට ඒවායේ Grundy අගයන්ගේ XOR එක 0 නොවේ නම් පළමු ක්‍රීඩකයා දිනයි."
  },
  {
    term: "Voronoi & Delaunay",
    cat: "Geometry / Duality",
    en: "Voronoi Region of generator Pi is all points closer to Pi than any other generator. Two Voronoi cells share a boundary line of non-zero length if and only if they are connected by a Delaunay Triangulation edge (an empty circumcircle passes through both).",
    si: "Voronoi කලාපය යනු අනෙක් හැම ලක්ෂ්‍යයකටම වඩා Pi ට ළඟින් පිහිටි ප්‍රදේශයයි. Voronoi කලාප දෙකක් මායිම් රේඛාවක් බෙදා ගන්නේ ඒවා අතර Delaunay Triangulation දාරයක් (වෙනත් ලක්ෂ්‍ය ඇතුළත නොමැති වෘත්තයක්) පවතින විට පමණි.",
    exEn: "Example (Q5): 4 generators at (±10, ±1) have Voronoi cells equal to the 4 quadrants. Pairs (1,2), (1,3), (2,4), (3,4) share axis ray borders, while (1,4) only touches at (0,0) (cocircular) so it is NOT adjacent.",
    exSi: "උදාහරණය (Q5): (±10, ±1) ලක්ෂ්‍ය 4 හි කලාප 4 වන්නේ වෘත්ත පාද 4 යි. (1,4) සහ (2,3) හමුවන්නේ (0,0) ලක්ෂ්‍යයේ පමණක් නිසා ඒවා adjacent නොවේ."
  },
  {
    term: "2-SAT & SCC",
    cat: "Acronym / Graph",
    en: "2-Satisfiability models binary choices (start at Ai or Bi) with pairwise conflicts ¬(p ∧ q), converted into implication edges p → ¬q and q → ¬p. Solved in O(V + E) by finding Strongly Connected Components (SCC): satisfiable iff no variable and its negation are in the same SCC.",
    si: "2-SAT මගින් තේරීම් දෙකක් (Ai හෝ Bi) අතර ගැටුම් p → ¬q සහ q → ¬p ලෙස ඊතල බවට හරවයි. Strongly Connected Components (SCC) සෙවූ විට, එකම job එකේ තේරීම් දෙකම එකම SCC එකක නැත්නම් පමණක් එය වලංගු වේ.",
    exEn: "Example (Q12): If Job 1 at A1 (literal 0) overlaps with Job 2 at B2 (literal 3), we add edges 0 → 2 (if Job 1 picks A1, Job 2 MUST pick A2) and 3 → 1 (if Job 2 picks B2, Job 1 MUST pick B1).",
    exSi: "උදාහරණය (Q12): Job 1 හි A1 සහ Job 2 හි B2 එකිනෙක ගැටේ නම්, A1 තේරුවොත් A2 තේරිය යුතු බවටත්, B2 තේරුවොත් B1 තේරිය යුතු බවටත් ඊතල දෙකක් එක් කරයි."
  },
  {
    term: "Li Chao Tree",
    cat: "Data Structure / DP",
    en: "A segment tree over x-coordinates that stores straight lines y = m*x + c. Each node keeps the line that wins at the segment's midpoint, pushing the loser to the single half where it can still cross and win. Supports insert and max/min query in O(log N).",
    si: "සරල රේඛා (y = mx + c) ගබඩා කරන Segment Tree එකකි. සෑම node එකකම මැද ලක්ෂ්‍යයේදී (midpoint) ජයගන්නා රේඛාව තබාගෙන, පරදින රේඛාව එයට ජයගත හැකි එකම පැත්තට පමණක් යවයි. O(log N) වේගයෙන් උපරිම/අවම අගය සොයයි.",
    exEn: "Example (Q9 & Q26): Penalty (Lj - Ri)² expands to (-2Ri)*Lj + Ri² + Lj². Job i inserts line with slope m = 2Ri and intercept c = dp[i] - Ri². Job j queries x = Lj in O(log N)!",
    exSi: "උදාහරණය (Q9 සහ Q26): (Lj - Ri)² ප්‍රසාරණය කළ විට බෑවුම m = 2Ri වන සරල රේඛාවක් ලැබේ. එය Li Chao Tree එකෙන් O(log N) වලින් විසඳයි."
  },
  {
    term: "DSU with Rollback",
    cat: "Data Structure / Offline",
    en: "Disjoint Set Union using union-by-size WITHOUT path compression, recording every parent/cost change on a stack. Allows undoing unions in O(1) per change when combined with a Segment Tree over Time.",
    si: "Path compression නොමැතිව union-by-size පමණක් භාවිතා කරන DSU ව්‍යුහයකි. සිදු කරන සෑම වෙනසක්ම stack එකක ලියා ගන්නා නිසා, කාලය මත ගොඩනැගූ Segment Tree එකකින් ඉහළට එන විට වෙනස්කම් ආපසු හැරවිය (undo/rollback) හැක.",
    exEn: "Example (Q14 & Q15): Claim 7 is active from ASK 0 to ASK 2. We place Claim 7 on the segment tree nodes covering [0, 2], unite when entering the node, and rollback when leaving!",
    exSi: "උදාහරණය (Q14 සහ Q15): Claim එකක් වලංගු වන ASK කාල පරාසය Segment Tree එකට දමා, DFS මගින් පහළට යද්දී unite කර ඉහළට එද්දී rollback කරයි."
  },
  {
    term: "Implicit Treap",
    cat: "Data Structure",
    en: "A randomized binary search tree + heap keyed implicitly by array index (subtree size). Supports cutting (split) and pasting (merge) any subarray [l, r], plus lazy range reverse, invert, and cyclic rotation in O(log N).",
    si: "අනුක්‍රමික ස්ථානය (subtree size) අනුව ක්‍රියා කරන සමබර ගසකි (Binary Search Tree + Heap). ඕනෑම පරාසයක් [l, r] කපා වෙන් කිරීමට (split), නැවත ඇලවීමට (merge), reverse කිරීමට සහ rotate කිරීමට O(log N) කාලයක් පමණක් ගනී.",
    exEn: "Example (Q17): Cyclic right rotation of [l, r] by k is just: split out [l, r], split it into [first len-k] and [last k], and merge them in swapped order!",
    exSi: "උදාහරණය (Q17): [l, r] පරාසය k වාරයක් දකුණට rotate කිරීම යනු එම කොටස වෙන් කර, අග අකුරු k මුලට එන සේ දෙකට කඩා මාරු කර නැවත merge කිරීමයි."
  },
  {
    term: "NTT & Legendre Symbol",
    cat: "Number Theory / FFT",
    en: "Legendre symbol χ(v) mod p is +1 if v is a non-zero square mod p, -1 if non-square, 0 if v ≡ 0. The number of solutions to y² ≡ v (mod p) is 1 + χ(v). NTT computes the correlation sum over all b in O(p log p).",
    si: "Legendre සංකේතය χ(v) මගින් v යනු mod p යටතේ පූර්ණ වර්ගයක් නම් +1 ද, නැත්නම් -1 ද, 0 නම් 0 ද ලබා දෙයි. එවිට y² ≡ v සඳහා විසඳුම් ගණන 1 + χ(v) වේ. NTT මගින් සියලුම b සඳහා එකවර පිළිතුර සොයයි.",
    exEn: "Example (Q18): For p = 5, squares mod 5 are 1²=1 and 2²=4. So χ = [0, +1, -1, -1, +1].",
    exSi: "උදාහරණය (Q18): p = 5 සඳහා 1²=1 සහ 2²=4 නිසා 1 සහ 4 වර්ග සංඛ්‍යා වේ. එබැවින් χ = [0, +1, -1, -1, +1]."
  },
  {
    term: "FWHT",
    cat: "Acronym / Transform",
    en: "Fast Walsh-Hadamard Transform: Converts arrays A and B of length 2^D into the Walsh domain in O(D * 2^D) using butterfly steps (u, v) -> (u+v, u-v), multiplies them pointwise, and applies the inverse transform (dividing by 2^D) to get the XOR convolution C[k] = Σ_{i⊕j=k} A[i]B[j].",
    si: "Fast Walsh-Hadamard Transform: දිග 2^D වූ arrays දෙකක XOR convolution අගයන් (i ⊕ j = k වන A[i]*B[j] එකතුව) O(D * 2^D) වේගයෙන් butterfly පියවර (u+v, u-v) මගින් ගණනය කරයි.",
    exEn: "Example (Q32): For D=2, A=[1,2,3,4], B=[5,6,7,8], FWHT computes C[0..3] in 2*4 = 8 butterfly ops instead of 16 pairs.",
    exSi: "උදාහරණය (Q32): D=18 (N=262,144) විට N² = 6.8×10¹⁰ වෙනුවට D*2^D = 4.7×10⁶ පියවරකින් විසඳයි."
  }
];

// ============================================================================
// 2. QUESTION ENHANCEMENTS: ORIGINAL STATEMENTS (EN+SI), LINE LINKS & ANIMATIONS
// ============================================================================
window.QUESTION_ENHANCEMENTS = {
  q1: {
    origEn: `Given a sequence of N agents (1-indexed). Each agent i has a unique Energy Level Eᵢ, and two operational metrics Xᵢ and Yᵢ.
• The Jurisdiction of agent i is the maximal contiguous sub-segment [Lᵢ, Rᵢ] containing i where Eᵢ is strictly the maximum energy.
• Phase 1: Output H = Σ (i × Lᵢ × Rᵢ) mod (10⁹+7) and flush.
• Phase 2: If the judge outputs 1, count strictly dominated pairs (u, v) where Lᵤ ≤ v ≤ Rᵤ, v ≠ u, Xᵤ < Xᵥ, and Yᵤ < Yᵥ. Output the total modulo 10⁹+7.`,
    origSi: `පේළියකට සිටින N දෙනෙකුගෙන් යුත් නියෝජිතයින් (agents) පිරිසක් දී ඇත (1 සිට අංකනය කර ඇත). සෑම i නියෝජිතයෙකුටම අනන්‍ය වූ ශක්ති මට්ටමක් (Energy Level Eᵢ) සහ Xᵢ, Yᵢ නම් අගයන් දෙකක් ඇත.
• i ගේ බල ප්‍රදේශය (Jurisdiction [Lᵢ, Rᵢ]) යනු i ඇතුළත් වන සහ i ගේ Eᵢ අගය එම කොටසේ ඇති විශාලතම අගය වන දිගම අඛණ්ඩ පරාසයයි.
• Phase 1: සියලුම නියෝජිතයින් සඳහා H = Σ (i × Lᵢ × Rᵢ) mod (10⁹+7) ගණනය කර print කරන්න (flush කරන්න).
• Phase 2: Judge මගින් 1 ලබා දුන් පසු, Lᵤ ≤ v ≤ Rᵤ පරාසය තුළ පිහිටි සහ Xᵤ < Xᵥ හා Yᵤ < Yᵥ වන (u, v) යුගල ගණන mod (10⁹+7) ලෙස සොයන්න.`,
    constraints: "1 ≤ N ≤ 10⁵ | 1 ≤ Eᵢ, Xᵢ, Yᵢ ≤ 10⁹",
    sampleIn: "5\n10 5 5\n20 2 2\n15 6 6\n5 8 8\n25 1 1\n1",
    sampleOut: "134\n8",
    stepLines: [
      [104, 111], // Step 1: Read input
      [113, 119], // Step 2: Left borders monotonic stack
      [120, 125], // Step 3: Right borders monotonic stack
      [127, 130], // Step 4: Print hash H and flush
      [132, 133], // Step 5: Read judge response
      [135, 143], // Step 6: Coordinate compress Y
      [145, 152], // Step 7: Create point & prefix query events
      [153, 157], // Step 8: Sort events by time t
      [78, 102],  // Step 9: cdq(lo, hi) divide & conquer + BIT
      [159, 161]  // Step 10: Print final total mod 1e9+7
    ],
    animTitleEn: "Interactive Animator: Monotonic Stack Jurisdiction [Lᵢ, Rᵢ] & 3D Dominance",
    animTitleSi: "සජීවීකරණය: Monotonic Stack මගින් [Lᵢ, Rᵢ] සෙවීම සහ 3D Dominance ගණනය",
    animFrames: [
      {
        en: "Initial Array: 5 agents with Energies E = [10, 20, 15, 5, 25] and (X,Y) = [(5,5), (2,2), (6,6), (8,8), (1,1)].",
        si: "ආරම්භක දත්ත: නියෝජිතයින් 5 දෙනාගේ ශක්ති මට්ටම් E = [10, 20, 15, 5, 25] සහ (X,Y) අගයන්.",
        svg: `<svg viewBox="0 0 620 210">
          <g font-family="Inter,sans-serif" font-size="12" fill="currentColor">
            <rect x="40" y="110" width="75" height="60" rx="6" fill="#3b82f6" opacity="0.85"/><text x="77" y="138" text-anchor="middle" fill="#fff" font-weight="700">i=1: E=10</text><text x="77" y="156" text-anchor="middle" fill="#e0e7ff">(5,5)</text>
            <rect x="145" y="75" width="75" height="95" rx="6" fill="#3b82f6" opacity="0.85"/><text x="182" y="108" text-anchor="middle" fill="#fff" font-weight="700">i=2: E=20</text><text x="182" y="126" text-anchor="middle" fill="#e0e7ff">(2,2)</text>
            <rect x="250" y="92" width="75" height="78" rx="6" fill="#3b82f6" opacity="0.85"/><text x="287" y="122" text-anchor="middle" fill="#fff" font-weight="700">i=3: E=15</text><text x="287" y="140" text-anchor="middle" fill="#e0e7ff">(6,6)</text>
            <rect x="355" y="130" width="75" height="40" rx="6" fill="#3b82f6" opacity="0.85"/><text x="392" y="150" text-anchor="middle" fill="#fff" font-weight="700">i=4: E=5</text><text x="392" y="165" text-anchor="middle" fill="#e0e7ff">(8,8)</text>
            <rect x="460" y="50" width="75" height="120" rx="6" fill="#3b82f6" opacity="0.85"/><text x="497" y="85" text-anchor="middle" fill="#fff" font-weight="700">i=5: E=25</text><text x="497" y="105" text-anchor="middle" fill="#e0e7ff">(1,1)</text>
          </g>
        </svg>`
      },
      {
        en: "Agent 2 (E=20, X=2, Y=2): Expands left over i=1 (10<20) and right over i=3,4 (15,5<20), stopped by i=5 (25>20). Jurisdiction = [1, 4]. Inside [1,4], agents 1(5,5), 3(6,6), 4(8,8) all have X>2 and Y>2 → 3 dominated pairs!",
        si: "Agent 2 (E=20, X=2, Y=2): වමට i=1 දක්වාත් දකුණට i=4 දක්වාත් පැතිරෙයි (i=5 හි E=25 නිසා එතැනින් නවතී). බල ප්‍රදේශය = [1, 4]. එහි සිටින 1(5,5), 3(6,6), 4(8,8) තිදෙනාගේම X>2 සහ Y>2 නිසා යුගල 3ක් ලැබේ!",
        svg: `<svg viewBox="0 0 620 210">
          <rect x="30" y="32" width="410" height="150" rx="10" fill="rgba(61,214,140,0.13)" stroke="#3dd68c" stroke-width="2" stroke-dasharray="6,4"/>
          <text x="235" y="24" text-anchor="middle" fill="#3dd68c" font-family="Inter" font-size="13" font-weight="700">Jurisdiction of i=2 is [L₂=1, R₂=4] → Beats i=1, 3, 4 (+3 pairs)</text>
          <g font-family="Inter,sans-serif" font-size="12">
            <rect x="40" y="110" width="75" height="60" rx="6" fill="#10b981"/><text x="77" y="138" text-anchor="middle" fill="#fff" font-weight="700">i=1 ✓</text><text x="77" y="156" text-anchor="middle" fill="#fff">5>2, 5>2</text>
            <rect x="145" y="75" width="75" height="95" rx="6" fill="#f59e0b"/><text x="182" y="108" text-anchor="middle" fill="#fff" font-weight="700">u=2 (E=20)</text><text x="182" y="126" text-anchor="middle" fill="#fff">X=2, Y=2</text>
            <rect x="250" y="92" width="75" height="78" rx="6" fill="#10b981"/><text x="287" y="122" text-anchor="middle" fill="#fff" font-weight="700">i=3 ✓</text><text x="287" y="140" text-anchor="middle" fill="#fff">6>2, 6>2</text>
            <rect x="355" y="130" width="75" height="40" rx="6" fill="#10b981"/><text x="392" y="150" text-anchor="middle" fill="#fff" font-weight="700">i=4 ✓ (8,8)</text>
            <rect x="460" y="50" width="75" height="120" rx="6" fill="#475569"/><text x="497" y="85" text-anchor="middle" fill="#cbd5e1">i=5 (E=25)</text><text x="497" y="105" text-anchor="middle" fill="#cbd5e1">Blocks R₂</text>
          </g>
        </svg>`
      },
      {
        en: "Agent 5 (E=25, X=1, Y=1): Highest energy of all! Jurisdiction = [1, 5]. Since X₅=1, Y₅=1, agents 1, 2, 3, 4 all have X>1, Y>1 → +4 pairs. Total = 0 (u=1) + 3 (u=2) + 1 (u=3) + 0 (u=4) + 4 (u=5) = 8!",
        si: "Agent 5 (E=25, X=1, Y=1): වැඩිම ශක්තිය ඇති නිසා බල ප්‍රදේශය මුළු [1, 5] පරාසයම වේ. X₅=1, Y₅=1 නිසා 1, 2, 3, 4 සියල්ලන්ම අභිබවා යයි (+4). මුළු එකතුව = 0 + 3 + 1 + 0 + 4 = 8!",
        svg: `<svg viewBox="0 0 620 210">
          <rect x="28" y="32" width="520" height="150" rx="10" fill="rgba(99,140,255,0.14)" stroke="#638cff" stroke-width="2"/>
          <text x="288" y="24" text-anchor="middle" fill="#638cff" font-family="Inter" font-size="13" font-weight="700">Jurisdiction of i=5 is [1, 5] → Beats 1, 2, 3, 4 (+4 pairs) | Grand Total = 8</text>
          <g font-family="Inter,sans-serif" font-size="12">
            <rect x="40" y="110" width="75" height="60" rx="6" fill="#10b981"/><text x="77" y="142" text-anchor="middle" fill="#fff">i=1 ✓</text>
            <rect x="145" y="75" width="75" height="95" rx="6" fill="#10b981"/><text x="182" y="122" text-anchor="middle" fill="#fff">i=2 ✓</text>
            <rect x="250" y="92" width="75" height="78" rx="6" fill="#10b981"/><text x="287" y="130" text-anchor="middle" fill="#fff">i=3 ✓</text>
            <rect x="355" y="130" width="75" height="40" rx="6" fill="#10b981"/><text x="392" y="155" text-anchor="middle" fill="#fff">i=4 ✓</text>
            <rect x="460" y="50" width="75" height="120" rx="6" fill="#f59e0b"/><text x="497" y="95" text-anchor="middle" fill="#fff" font-weight="700">u=5 (E=25)</text><text x="497" y="115" text-anchor="middle" fill="#fff">(1,1)</text>
          </g>
        </svg>`
      }
    ]
  },

  q2: {
    origEn: `Given an undirected graph of N nodes and M edges (not necessarily connected).
• Resilient Cluster: Maximal set of nodes where removing any single node does not disconnect the set (Biconnected Component / Block).
• Critical Node: A node whose removal strictly increases the number of connected components (Articulation Point / Cut Vertex).
• Macro-Tree: Bipartite forest with edges between Resilient Clusters and the Critical Nodes belonging to them.
• Phase 1: Output HASH H = (Nc × Na) mod (10⁹+7) and flush.
• Phase 2: Read K. Find Σ (|Sᵤ| × |Sᵥ|) mod (10⁹+7) over all cluster pairs (u < v) whose simple path in the Macro-Tree contains exactly K Critical Nodes.`,
    origSi: `N ශීර්ෂ (nodes) සහ M දාර (edges) සහිත දිශා-රහිත ප්‍රස්තාරයක් (undirected graph) දී ඇත.
• Resilient Cluster (Biconnected Component): ඕනෑම එක් node එකක් ඉවත් කළද වෙන් නොවී පවතින උපරිම nodes කාණ්ඩයකි.
• Critical Node (Articulation Point): ඉවත් කළ විට ප්‍රස්තාරය තවත් කොටස් වලට කැඩී යන තීරණාත්මක node එකකි.
• Macro-Tree (Block-Cut Tree): Clusters සහ Critical Nodes යා කරමින් සාදන ගසකි.
• Phase 1: H = (Nc × Na) mod (10⁹+7) print කරන්න.
• Phase 2: K කියවා, Macro-Tree එකෙහි ගමන් මගේ හරියටම Critical Nodes K ගණනක් පවතින (u < v) cluster යුගලවල විශාලත්වයන්ගේ ගුණිතයේ එකතුව Σ (|Sᵤ| × |Sᵥ|) mod (10⁹+7) සොයන්න.`,
    constraints: "1 ≤ N, M ≤ 2×10⁵ | 1 ≤ K ≤ 10⁵",
    sampleIn: "6 6\n1 2\n2 3\n3 1\n4 5\n5 6\n6 4\n1",
    sampleOut: "0\n0",
    stepLines: [
      [63, 72],   // Step 1: Read graph & skip self-loops
      [75, 107],  // Step 2: Iterative Tarjan DFS
      [108, 123], // Step 3: Pop block when low[v] >= tin[p]
      [113, 126], // Step 4: Mark articulation points (cut vertices)
      [83, 87],   // Step 5: Handle isolated vertices
      [129, 134], // Step 6: Print Phase 1 hash & read K
      [136, 149], // Step 7: Build Block-Cut Forest
      [171, 198], // Step 8: Find Centroid c of current tree piece
      [200, 229], // Step 9: Count pairs at tree distance D = 2K
      [231, 237]  // Step 10: Remove centroid & recurse
    ],
    animTitleEn: "Interactive Animator: Block-Cut Macro-Tree & Distance D = 2K",
    animTitleSi: "සජීවීකරණය: Block-Cut Macro-Tree සහ D = 2K දුර ගණනය",
    animFrames: [
      {
        en: "Consider 3 triangles sharing cut vertices 3 and 5: C1={1,2,3}, C2={3,4,5}, C3={5,6,7}. Removing node 3 or 5 splits the graph → Na = 2 Critical Nodes, Nc = 3 Clusters. Hash = 3 × 2 = 6.",
        si: "ත්‍රිකෝණ 3ක් 3 සහ 5 යන සන්ධි ලක්ෂ්‍ය (Critical Nodes) මගින් යා වී ඇති අවස්ථාවක් සලකමු: C1={1,2,3}, C2={3,4,5}, C3={5,6,7}. මෙහි Nc = 3, Na = 2 → Hash = 6.",
        svg: `<svg viewBox="0 0 600 180">
          <g stroke="#638cff" stroke-width="2.5" fill="#1e293b" font-family="Inter" font-size="12">
            <polygon points="60,40 60,140 150,90" fill="rgba(59,130,246,0.18)"/>
            <polygon points="150,90 240,40 300,90" fill="rgba(16,185,129,0.18)"/>
            <polygon points="300,90 390,40 390,140" fill="rgba(245,158,11,0.18)"/>
            <circle cx="60" cy="40" r="14"/><text x="60" y="44" text-anchor="middle" fill="#fff" stroke="none">1</text>
            <circle cx="60" cy="140" r="14"/><text x="60" y="144" text-anchor="middle" fill="#fff" stroke="none">2</text>
            <circle cx="150" cy="90" r="16" fill="#ef4444" stroke="#fff"/><text x="150" y="94" text-anchor="middle" fill="#fff" stroke="none" font-weight="700">3*</text>
            <circle cx="240" cy="40" r="14"/><text x="240" y="44" text-anchor="middle" fill="#fff" stroke="none">4</text>
            <circle cx="300" cy="90" r="16" fill="#ef4444" stroke="#fff"/><text x="300" y="94" text-anchor="middle" fill="#fff" stroke="none" font-weight="700">5*</text>
            <circle cx="390" cy="40" r="14"/><text x="390" y="44" text-anchor="middle" fill="#fff" stroke="none">6</text>
            <circle cx="390" cy="140" r="14"/><text x="390" y="144" text-anchor="middle" fill="#fff" stroke="none">7</text>
          </g>
          <text x="495" y="75" fill="#ef4444" font-family="Inter" font-size="13" font-weight="700">Critical Nodes: 3, 5</text>
          <text x="495" y="100" fill="#3dd68c" font-family="Inter" font-size="13">Clusters: C1, C2, C3</text>
          <text x="495" y="125" fill="#94a3b8" font-family="Inter" font-size="12">Each |Sᵤ| = 3</text>
        </svg>`
      },
      {
        en: "Macro-Tree (Block-Cut Tree): Nodes alternate [Cluster] — (Cut) — [Cluster] — (Cut) — [Cluster]. Passing through K=2 Critical Nodes means tree distance D = 2K = 4 edges! Pair (C1, C3) has distance 4 → |C1|×|C3| = 3×3 = 9.",
        si: "Macro-Tree එකෙහි හැමවිටම [Cluster] — (Cut) — [Cluster] ලෙස මාරුවෙන් මාරුවට පිහිටයි. එනම් Critical Nodes K=2 ක් හරහා යාම යනු ගසේ දාර D = 2K = 4 ක දුරකි! (C1, C3) යුගලයට 3×3 = 9 ලැබේ.",
        svg: `<svg viewBox="0 0 600 180">
          <line x1="80" y1="90" x2="520" y2="90" stroke="#638cff" stroke-width="3"/>
          <g font-family="Inter" font-size="12" text-anchor="middle">
            <rect x="45" y="65" width="70" height="50" rx="8" fill="#3b82f6"/><text x="80" y="88" fill="#fff" font-weight="700">C1</text><text x="80" y="104" fill="#dbeafe">|S|=3</text>
            <circle cx="190" cy="90" r="20" fill="#ef4444"/><text x="190" y="95" fill="#fff" font-weight="700">Cut 3</text>
            <rect x="265" y="65" width="70" height="50" rx="8" fill="#10b981"/><text x="300" y="88" fill="#fff" font-weight="700">C2</text><text x="300" y="104" fill="#d1fae5">|S|=3</text>
            <circle cx="410" cy="90" r="20" fill="#ef4444"/><text x="410" y="95" fill="#fff" font-weight="700">Cut 5</text>
            <rect x="485" y="65" width="70" height="50" rx="8" fill="#f59e0b"/><text x="520" y="88" fill="#fff" font-weight="700">C3</text><text x="520" y="104" fill="#fef3c7">|S|=3</text>
            <text x="300" y="38" fill="#f5b041" font-size="13" font-weight="700">K=1 → pairs at dist 2: (C1,C2), (C2,C3) | K=2 → pair at dist 4: (C1,C3)</text>
          </g>
        </svg>`
      }
    ]
  },

  q3: {
    origEn: `Given an acyclic network (tree) of N relays rooted at Core Relay 1.
• tier(u) = number of relays on the simple path from u to Relay 1 (Relay 1 has tier 1).
• convergence(u, v) = relay with highest tier on both paths to 1 (i.e. LCA(u, v)).
• Phase 1: Output HASH H = Σ_{i=1..N-1} (tier(LCA(i, i+1)) × i) mod (10⁹+7) and flush.
• Phase 2: Read signal IDs S₁..Sₙ and Q queries (uⱼ, vⱼ, Kⱼ). For each query, find Aⱼ = number of distinct signal IDs appearing EXACTLY Kⱼ times on the simple path between uⱼ and vⱼ. Output Σ Aⱼ mod (10⁹+7).`,
    origSi: `Core Relay 1 මුල (root) කරගත් relays N කින් යුත් ගසක් (tree) දී ඇත.
• tier(u) = 1 සිට u දක්වා මාර්ගයේ ඇති relays ගණන (depth + 1).
• convergence(u, v) = u සහ v දෙකේම මාර්ගවල හමුවන පහළම පොදු relay එක (LCA(u, v)).
• Phase 1: H = Σ (tier(LCA(i, i+1)) × i) mod (10⁹+7) print කරන්න.
• Phase 2: එක් එක් (uⱼ, vⱼ, Kⱼ) ප්‍රශ්නය සඳහා uⱼ සිට vⱼ දක්වා මාර්ගයේ හරියටම Kⱼ වාරයක් පමණක් හමුවන වෙනස් Signal IDs ගණන (Aⱼ) සොයා ඒවායේ එකතුව print කරන්න.`,
    constraints: "2 ≤ N ≤ 10⁵ | 1 ≤ Q ≤ 10⁵ | 1 ≤ Sᵢ, Kⱼ ≤ 10⁵",
    sampleIn: "4\n1 2\n1 3\n1 4\n1\n999 1 1 1\n1\n2 3 1",
    sampleOut: "HASH 6\n1",
    stepLines: [
      [62, 69],   // Step 1: Read tree edges
      [71, 81],   // Step 2: BFS from root 1 for depth and parent
      [82, 84],   // Step 3: Binary lifting table up[j][v]
      [85, 93],   // Step 4: lca(a, b) function
      [95, 98],   // Step 5: Compute and print Phase 1 HASH H
      [100, 117], // Step 6: Adaptive token layout parser
      [119, 125], // Step 7: Coordinate compress signal IDs
      [127, 142], // Step 8: Euler tour flattening (tin, tout)
      [144, 153], // Step 9: Convert tree path (u, v) to Euler range + LCA
      [154, 159], // Step 10: Mo's odd-even block sort
      [51, 56],   // Step 11: toggle(v) updates cnt[s] and freqc[f]
      [166, 177]  // Step 12: Sweep Mo pointers & sum freqc[K]
    ]
  },

  q4: {
    origEn: `Given a string S of N lowercase letters.
• An Equivalence State is a set of substrings of S sharing the exact same set of ending indices (SAM state).
• capacity(u) = length of longest substring in state u. Fallback(u) = state of longest suffix in a strictly different state (suffix link).
• Phase 1: Output HASH H = Σ (capacity(u) × capacity(fallback(u))) mod (10⁹+7) for all non-base states u.
• Phase 2: A move from state u appends one character so the substring still exists in S. Strategic Index SI(u) = mex of reachable states' SIs. Each of Q scenarios places K tokens on S[Lᵢ..Rᵢ]; scenario score = XOR of token SIs. Output sum of Q scores mod (10⁹+7).`,
    origSi: `කුඩා ඉංග්‍රීසි අකුරු N කින් යුත් S නම් වචනයක් දී ඇත.
• Equivalence State යනු S හි හරියටම එකම ස්ථානවලින් අවසන් වන substrings කාණ්ඩයකි (Suffix Automaton state).
• capacity(u) = එහි දිගම substring එකේ දිග. Fallback(u) = වෙනත් state එකකට අයත් දිගම suffix එක පවතින state එක (suffix link).
• Phase 1: H = Σ (capacity(u) × capacity(fallback(u))) mod (10⁹+7) print කරන්න.
• Phase 2: State එකක අගට අකුරක් එක් කර S හි පවතින නව substring එකකට යාම වලංගු පියවරකි. SI(u) යනු යා හැකි states වල SI අතර නැති කුඩාම අගයයි (mex). එක් එක් scenario එකේ K tokens වල SI අගයන්ගේ XOR අගය ගෙන, scenarios Q හිම එකතුව සොයන්න.`,
    constraints: "1 ≤ N, Q ≤ 10⁵ | 1 ≤ K ≤ 10, ΣK ≤ 2×10⁵",
    sampleIn: "6\naaaaab\n1\n1\n1 5",
    sampleOut: "HASH 40\n1",
    stepLines: [
      [62, 70],   // Step 1: Read N and string S defensively
      [72, 95],   // Step 2: Build Suffix Automaton (SAM)
      [97, 104],  // Step 3: Phase 1 Hash sum(len[u] * len[link[u]])
      [106, 109], // Step 4: Read remaining tokens
      [111, 131], // Step 5: Counting sort by len & compute Grundy mex
      [133, 165], // Step 6: Parse scenario layouts
      [166, 178], // Step 7: Attach token queries to prefix states pre[R]
      [179, 195], // Step 8: DFS suffix-link tree + binary search plen
      [196, 199]  // Step 9: Sum scenario XOR scores mod 1e9+7
    ]
  },

  q5: {
    origEn: `Given M generator points Pᵢ(xᵢ, yᵢ) with capacities Cᵢ and base costs Wᵢ.
• Region Rᵢ contains all points strictly closer to Pᵢ than to any other generator (Voronoi cell).
• Generators u and v are adjacent if Rᵤ and Rᵥ share a non-zero length boundary.
• Phase 1: Output HASH H = Σ (u × v) mod (10⁹+7) over adjacent pairs u < v.
• Phase 2: Read N query points (Xⱼ, Yⱼ). Each starts at the generator whose region contains it. Route points between adjacent generators so each generator i holds ≤ Cᵢ points. Routing u → v costs Euclidean distance D(u,v) × 2.0 if segment uv crosses y = 0, else × 1.0, plus base cost W of final destination. Output minimum total cost to 2 decimal places, or -1.00.`,
    origSi: `තලයක Pᵢ(xᵢ, yᵢ) නම් generator ලක්ෂ්‍ය M ක් සහ ඒවායේ ධාරිතාවන් Cᵢ හා මූලික වියදම් Wᵢ දී ඇත.
• Rᵢ කලාපය (Voronoi cell) යනු අනෙක් සියලු generators වලට වඩා Pᵢ ට ළඟින් පිහිටි ප්‍රදේශයයි.
• කලාප දෙකක් දිගක් සහිත මායිම් රේඛාවක් බෙදා ගන්නේ නම් ඒවා adjacent වේ.
• Phase 1: Adjacent යුගල (u < v) සඳහා H = Σ (u × v) mod (10⁹+7) print කරන්න.
• Phase 2: ලක්ෂ්‍ය N ක් දෙනු ලැබේ. කිසිදු generator එකක ධාරිතාව Cᵢ නොඉක්මවන පරිදි adjacent generators හරහා ලක්ෂ්‍ය ගෙන යා හැක (y = 0 රේඛාව කපන්නේ නම් දුර දෙගුණ වේ). අවසාන generator එකේ Wᵢ ගාස්තුවද එකතු කළ විට ලැබෙන අවම මුළු වියදම දශමස්ථාන 2කට සොයන්න.`,
    constraints: "3 ≤ M ≤ 5,000 | 1 ≤ N ≤ 10,000 | -10⁴ ≤ x, y ≤ 10⁴",
    sampleIn: "4\n-10 1 0 100\n10 1 0 100\n-10 -1 10 1\n10 -1 10 1\n2\n-10 5\n10 5",
    sampleOut: "HASH 25\n10.00",
    stepLines: [
      [74, 107],  // Step 1: Exact integer orient() and symbolic perturbation incircle()
      [160, 168], // Step 2: Find initial convex hull Delaunay edge
      [169, 187], // Step 3: Gift-wrapping Delaunay triangulation
      [189, 198], // Step 4: Extract Voronoi adjacencies (drop cocircular diagonals)
      [200, 203], // Step 5: Output Phase 1 HASH H
      [205, 218], // Step 6: Assign each query point to nearest generator
      [220, 222], // Step 7: Check total capacity >= N
      [224, 241], // Step 8: Build min-cost flow network (y=0 crossing doubles cost)
      [243, 252], // Step 9: Initialize Network Simplex spanning tree
      [257, 322], // Step 10: Network Simplex pivot loop
      [324, 328]  // Step 11: Verify feasibility & print exact cost to 2 decimals
    ]
  },

  q6: {
    origEn: `In Neo-Colombo, there are N transit hubs (1 to N) connected by M bidirectional tracks (1 minute per track).
• Even minute t (0, 2, 4...): travel u → v allowed ONLY if v > u.
• Odd minute t (1, 3, 5...): travel u → v allowed ONLY if v < u.
• Waiting at the current station for 1 minute is allowed, but waiting 2 consecutive minutes is strictly forbidden.
Start at station 1 at t = 0. Find the minimum minutes to reach station N, or -1 if unreachable.`,
    origSi: `Neo-Colombo නගරයේ 1 සිට N දක්වා අංකනය කළ දුම්රිය ස්ථාන (hubs) N ක් සහ දෙපසටම ගමන් කළ හැකි මාර්ග M ක් ඇත (එක් ගමනකට විනාඩි 1ක් ගතවේ).
• ඉරට්ටේ විනාඩිවලදී (t = 0, 2, 4...): u සිට v වෙත යා හැක්කේ v > u (වැඩි අංකයකට) නම් පමණි.
• ඔත්තේ විනාඩිවලදී (t = 1, 3, 5...): u සිට v වෙත යා හැක්කේ v < u (අඩු අංකයකට) නම් පමණි.
• විනාඩි 1ක් එම ස්ථානයේම රැඳී සිටිය (wait) හැකි නමුත්, පිට පිට විනාඩි 2ක් රැඳී සිටීම තහනම්ය.
t = 0 දී 1 වන ස්ථානයෙන් පිටත් වී N වන ස්ථානයට යාමට ගතවන අවම කාලය සොයන්න.`,
    constraints: "2 ≤ N ≤ 200,000 | 1 ≤ M ≤ 300,000",
    sampleIn: "4 4\n1 3\n3 2\n2 4\n1 2",
    sampleOut: "3",
    stepLines: [
      [49, 57], // Step 1: Read undirected graph
      [59, 60], // Step 2: Pack state id = (u*2 + parity)*2 + waited
      [62, 64], // Step 3: Push start state (u=1, even, waited=0)
      [66, 70], // Step 4: Pop BFS state & check if u == N
      [72, 79], // Step 5: Traverse valid tracks (even: v>u, odd: v<u)
      [80, 84], // Step 6: Wait transition (if w == 0)
      [86, 87]  // Step 7: Unreachable (-1)
    ],
    animTitleEn: "Original PDF Diagram + Step-by-Step Animator: Desynchronized Parity Network",
    animTitleSi: "මුල් PDF රූප සටහන සහ සජීවීකරණය: Desynchronized Parity Network",
    animFrames: [
      {
        en: "t = 0 (Even): Start at Hub 1. Even minute requires v > u. Notice the trap: going 1 → 2 arrives at t = 1 (Odd), where 2 → 4 is FORBIDDEN! Instead, take 1 → 3 (3 > 1).",
        si: "t = 0 (ඉරට්ටේ): Hub 1 සිට ඇරඹේ. කෙලින්ම 1 → 2 ගියහොත් t = 1 (ඔත්තේ) වන නිසා එතැන් සිට 2 → 4 යාම තහනම් වේ! එබැවින් 1 → 3 (3 > 1) තෝරා ගනිමු.",
        svg: `<svg viewBox="0 0 600 220">
          <line x1="90" y1="110" x2="290" y2="40" stroke="#3dd68c" stroke-width="4"/>
          <line x1="290" y1="40" x2="270" y2="175" stroke="#475569" stroke-width="2.5"/>
          <line x1="270" y1="175" x2="500" y2="105" stroke="#475569" stroke-width="2.5"/>
          <line x1="90" y1="110" x2="270" y2="175" stroke="#ef4444" stroke-width="2" stroke-dasharray="5,5"/>
          <circle cx="90" cy="110" r="26" fill="#f59e0b"/><text x="90" y="115" text-anchor="middle" fill="#fff" font-weight="700">Hub 1</text>
          <circle cx="290" cy="40" r="26" fill="#3dd68c"/><text x="290" y="45" text-anchor="middle" fill="#000" font-weight="700">Hub 3</text>
          <circle cx="270" cy="175" r="26" fill="#1e293b" stroke="#64748b" stroke-width="2"/><text x="270" y="180" text-anchor="middle" fill="#fff">Hub 2</text>
          <circle cx="500" cy="105" r="26" fill="#1e293b" stroke="#64748b" stroke-width="2"/><text x="500" y="110" text-anchor="middle" fill="#fff">Hub 4</text>
          <text x="175" y="55" fill="#3dd68c" font-size="13" font-weight="700">t=0 (Even): 1 → 3 (3 > 1) ✓</text>
          <text x="155" y="160" fill="#ef4444" font-size="11.5">Trap 1→2: arrives t=1, 2→4 forbidden!</text>
        </svg>`
      },
      {
        en: "t = 1 (Odd): Now at Hub 3. Odd minute requires going DOWN (v < u). Move 3 → 2 (2 < 3), arriving at Hub 2 at t = 2 (Even). Then at t = 2 (Even), move 2 → 4 (4 > 2) to reach Hub 4 in 3 minutes!",
        si: "t = 1 (ඔත්තේ): දැන් Hub 3 හි සිටී. ඔත්තේ විනාඩියේදී අඩු අංකයකට (v < u) යා යුතු නිසා 3 → 2 (2 < 3) යයි. ඉන්පසු t = 2 (ඉරට්ටේ) දී 2 → 4 (4 > 2) මගින් විනාඩි 3 කින් Hub 4 වෙත ළඟා වේ!",
        svg: `<svg viewBox="0 0 600 220">
          <line x1="90" y1="110" x2="290" y2="40" stroke="#3b82f6" stroke-width="3"/>
          <line x1="290" y1="40" x2="270" y2="175" stroke="#f59e0b" stroke-width="4"/>
          <line x1="270" y1="175" x2="500" y2="105" stroke="#3dd68c" stroke-width="4"/>
          <circle cx="90" cy="110" r="26" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/><text x="90" y="115" text-anchor="middle" fill="#fff">Hub 1</text>
          <circle cx="290" cy="40" r="26" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><text x="290" y="45" text-anchor="middle" fill="#fff">Hub 3</text>
          <circle cx="270" cy="175" r="26" fill="#f59e0b"/><text x="270" y="180" text-anchor="middle" fill="#fff" font-weight="700">Hub 2</text>
          <circle cx="500" cy="105" r="26" fill="#3dd68c"/><text x="500" y="110" text-anchor="middle" fill="#000" font-weight="700">Hub 4 ★</text>
          <text x="345" y="105" fill="#f59e0b" font-size="13" font-weight="700">t=1 (Odd): 3 → 2 (2 < 3)</text>
          <text x="415" y="168" fill="#3dd68c" font-size="13" font-weight="700">t=2 (Even): 2 → 4 (4 > 2) → Ans = 3</text>
        </svg>`
      }
    ]
  },

  q7: {
    origEn: `Given an array A of N distinct integers and a threshold K.
• Right Dominator R(i) = smallest index j > i such that A[j] > A[i] (or INF if none).
• Answer Q queries [L, R]: count indices i satisfying:
  1) L ≤ i ≤ R,   2) L ≤ R(i) ≤ R,   3) R(i) - i ≤ K.`,
    origSi: `වෙනස් පූර්ණ සංඛ්‍යා N කින් යුත් A නම් array එකක් සහ K නම් සීමාවක් දී ඇත.
• Right Dominator R(i) යනු i ට දකුණු පසින් පිහිටි සහ A[j] > A[i] වන පළමු j ස්ථානයයි.
• එක් එක් [L, R] ප්‍රශ්නය සඳහා පහත කොන්දේසි 3ම සපුරන i ගණන සොයන්න:
  1) L ≤ i ≤ R,   2) L ≤ R(i) ≤ R,   3) R(i) - i ≤ K.`,
    constraints: "1 ≤ N, Q ≤ 200,000 | 1 ≤ K ≤ N | 1 ≤ Aᵢ ≤ 10⁹",
    sampleIn: "6 3\n4 2 3 6 1 5\n3\n1 4\n2 5\n1 6",
    sampleOut: "3\n2\n4",
    stepLines: [
      [55, 58], // Step 1: Read N, K, and array A
      [60, 66], // Step 2: Monotonic stack right-to-left for R(i)
      [68, 71], // Step 3: Filter valid arrows R(i)-i <= K into buckets ends[R(i)]
      [73, 77], // Step 4: Read queries and sort offline by R
      [79, 87], // Step 5: Sweep r = 1..N inserting starts into BIT
      [88, 89], // Step 6: Query BIT for arrows with i >= L
      [91, 94]  // Step 7: Output answers in original order
    ],
    animTitleEn: "Original PDF Diagram + Animator: Horizon Dominance Ray Projection (K = 3)",
    animTitleSi: "මුල් PDF රූප සටහන සහ සජීවීකරණය: Horizon Dominance Ray Projection (K = 3)",
    animFrames: [
      {
        en: "A = [4, 2, 3, 6, 1, 5], K = 3. Valid rays i → R(i) with Δ ≤ 3: 1→4 (Δ=3), 2→3 (Δ=1), 3→4 (Δ=1), 5→6 (Δ=1). For Query [1, 4], rays ending ≤ 4 with start ≥ 1 are 1→4, 2→3, 3→4 → Count = 3!",
        si: "A = [4, 2, 3, 6, 1, 5], K = 3. වලංගු ඊතල: 1→4 (Δ=3), 2→3 (Δ=1), 3→4 (Δ=1), 5→6 (Δ=1). [1, 4] පරාසය තුළ සම්පූර්ණයෙන්ම පවතින ඊතල 3කි (1→4, 2→3, 3→4).",
        svg: `<svg viewBox="0 0 620 220">
          <rect x="45" y="15" width="365" height="175" rx="8" fill="rgba(61,214,140,0.1)" stroke="#3dd68c" stroke-width="2"/>
          <text x="225" y="34" text-anchor="middle" fill="#3dd68c" font-size="13" font-weight="700">Query [L=1, R=4] — Count = 3</text>
          <g fill="#3b82f6" font-family="Inter" font-size="12" text-anchor="middle">
            <rect x="65" y="90" width="55" height="90" rx="4"/><text x="92" y="82" fill="currentColor">A[1]=4</text>
            <rect x="150" y="130" width="55" height="50" rx="4"/><text x="177" y="122" fill="currentColor">A[2]=2</text>
            <rect x="235" y="110" width="55" height="70" rx="4"/><text x="262" y="102" fill="currentColor">A[3]=3</text>
            <rect x="320" y="50" width="55" height="130" rx="4"/><text x="347" y="42" fill="currentColor">A[4]=6</text>
            <rect x="425" y="155" width="55" height="25" rx="4" opacity="0.5"/><text x="452" y="148" fill="currentColor">A[5]=1</text>
            <rect x="510" y="70" width="55" height="110" rx="4" opacity="0.5"/><text x="537" y="62" fill="currentColor">A[6]=5</text>
          </g>
          <g stroke="#ef4444" stroke-width="2.5" stroke-dasharray="5,3">
            <line x1="92" y1="95" x2="347" y2="95"/>
            <line x1="177" y1="135" x2="262" y2="135"/>
            <line x1="262" y1="115" x2="347" y2="115"/>
            <line x1="452" y1="160" x2="537" y2="160" opacity="0.5"/>
          </g>
        </svg>`
      }
    ]
  },

  q8: {
    origEn: `Given an array A of N integers. Operation:
1. Choose 3 distinct indices i, j, k such that (A[i] + A[j] + A[k]) mod 2 == 0.
2. Cyclically shift them: A[i] → A[j], A[j] → A[k], A[k] → A[i].
Determine if A can be sorted in non-decreasing order.`,
    origSi: `පූර්ණ සංඛ්‍යා N කින් යුත් A නම් array එකක් දී ඇත. එක් පියවරකදී:
1. (A[i] + A[j] + A[k]) එකතුව ඉරට්ටේ (even) වන වෙනස් ස්ථාන 3ක් (i, j, k) තෝරන්න.
2. එම අගයන් තුන චක්‍රීයව මාරු කරන්න (A[i] → A[j], A[j] → A[k], A[k] → A[i]).
මෙමගින් array එක කුඩා අගයේ සිට විශාල අගයට sort කළ හැකිදැයි සොයන්න (YES / NO).`,
    constraints: "1 ≤ T ≤ 100 | 3 ≤ N ≤ 100,000 | 1 ≤ Aᵢ ≤ 10⁹",
    sampleIn: "3\n4\n3 1 2 4\n3\n1 3 5\n4\n2 4 6 8",
    sampleOut: "YES\nNO\nYES",
    stepLines: [
      [112, 125], // Step 1: Read T testcases
      [87, 89],   // Step 2: Count evens and odds
      [91, 91],   // Step 3: Zero evens check
      [92, 92],   // Step 4: Already sorted check
      [94, 94],   // Step 5: odds >= 2 & evens >= 1 -> parityOk(A)
      [96, 110],  // Step 6: odds <= 1 -> lone odd is frozen, check evens
      [60, 80]    // Step 7: parityOk(v) cycle decomposition & duplicate check
    ]
  },

  q9: {
    origEn: `Given N computational jobs [Lᵢ, Rᵢ] with reward Pᵢ. Schedule any subset of non-overlapping jobs (Lⱼ > Rᵢ) to maximize net profit:
Total Profit = Σ Pᵢ - Σ (Lⱼ - Rᵢ)² for consecutive scheduled jobs i, j.
Idle time before the first job and after the last job incurs zero penalty.`,
    origSi: `කාල පරාස [Lᵢ, Rᵢ] සහ ප්‍රතිලාභ Pᵢ සහිත jobs N ක් දී ඇත. එකිනෙක overlap නොවන (Lⱼ > Rᵢ) ඕනෑම jobs පෙළක් තෝරාගත හැක.
අනුයාත jobs දෙකක් අතර හිස් කාලය සඳහා (Lⱼ - Rᵢ)² ක දඩයක් (penalty) අඩු වේ. උපරිම ශුද්ධ ලාභය සොයන්න.`,
    constraints: "1 ≤ N ≤ 100,000 | 1 ≤ Lᵢ < Rᵢ ≤ 1,000,000 | 1 ≤ Pᵢ ≤ 10¹²",
    sampleIn: "3\n1 4 20\n5 8 30\n9 12 25",
    sampleOut: "73",
    stepLines: [
      [83, 86],   // Step 1: Read jobs L, R, P
      [88, 93],   // Step 2: Compress query x-coordinates (distinct L values)
      [95, 98],   // Step 3: Sort job indices by L and by R
      [103, 110], // Step 4: Sweep byL and insert finished jobs (R[i] < L[j])
      [108, 109], // Step 5: Construct line m = 2*R[i], c = dp[i] - R[i]²
      [60, 69],   // Step 6: Li Chao tree insertLine()
      [71, 77],   // Step 7: Li Chao tree query()
      [111, 118]  // Step 8: Compute dp[j] and track best profit
    ],
    animTitleEn: "Original PDF Diagrams + Animator: Thermal Penalty Curves & Li Chao Envelope",
    animTitleSi: "මුල් PDF රූප සටහන සහ සජීවීකරණය: Thermal Penalty සහ Li Chao රේඛා",
    animFrames: [
      {
        en: "Jobs: [1,4] P=20, [5,8] P=30, [9,12] P=25. Gap between Job 1 and Job 2 is (5-4)² = 1. Gap between Job 2 and Job 3 is (9-8)² = 1. Net Profit = 20 + 30 + 25 - 1 - 1 = 73!",
        si: "Jobs: [1,4] P=20, [5,8] P=30, [9,12] P=25. පළමු පරතරය (5-4)² = 1. දෙවන පරතරය (9-8)² = 1. මුළු ලාභය = 20 + 30 + 25 - 1 - 1 = 73!",
        svg: `<svg viewBox="0 0 620 200">
          <g font-family="Inter" font-size="12" text-anchor="middle">
            <rect x="50" y="75" width="120" height="70" rx="6" fill="#3b82f6"/><text x="110" y="105" fill="#fff" font-weight="700">Job 1 [1,4]</text><text x="110" y="125" fill="#dbeafe">P = 20</text>
            <rect x="230" y="75" width="120" height="70" rx="6" fill="#10b981"/><text x="290" y="105" fill="#fff" font-weight="700">Job 2 [5,8]</text><text x="290" y="125" fill="#d1fae5">P = 30</text>
            <rect x="410" y="75" width="120" height="70" rx="6" fill="#8b5cf6"/><text x="470" y="105" fill="#fff" font-weight="700">Job 3 [9,12]</text><text x="470" y="125" fill="#ede9fe">P = 25</text>
            <path d="M170,75 Q200,20 230,75" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="5,3"/>
            <text x="200" y="35" fill="#ef4444" font-weight="700">Penalty (5-4)²=1</text>
            <path d="M350,75 Q380,20 410,75" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-dasharray="5,3"/>
            <text x="380" y="35" fill="#ef4444" font-weight="700">Penalty (9-8)²=1</text>
          </g>
        </svg>`
      }
    ]
  },

  q10: {
    origEn: `Given a string S of N lowercase Latin letters. A non-empty substring S[l..r] is Harmonious if:
1. Total vowels == total consonants in S[l..r].
2. Every proper prefix S[l..k] (l ≤ k < r) has strictly more vowels than consonants.
Count the total number of Harmonious substrings.`,
    origSi: `කුඩා ඉංග්‍රීසි අකුරු N කින් යුත් S වචනයක S[l..r] කොටසක් Harmonious වන්නේ:
1. එහි මුළු ස්වර (vowels: a,e,i,o,u) ගණන සහ ව්‍යංජන (consonants) ගණන සමාන නම්, සහ
2. එහි අවසානයට පෙර ඇති සෑම මුල් කොටසකම (proper prefix S[l..k]) ව්‍යංජනවලට වඩා ස්වර වැඩියෙන් තිබේ නම්ය.
මුළු Harmonious කොටස් ගණන සොයන්න.`,
    constraints: "1 ≤ N ≤ 500,000",
    sampleIn: "2\nab",
    sampleOut: "1",
    stepLines: [
      [57, 60], // Step 1: Read N and string S
      [62, 67], // Step 2: Build prefix sum walk P (+1 vowel, -1 consonant)
      [70, 71], // Step 3: Suffix minimum array sufMin[i]
      [73, 75], // Step 4: Count valid starts l where S[l] is vowel and sufMin[l] <= P[l-1]
      [77, 78]  // Step 5: Print answer
    ],
    animTitleEn: "Original PDF Diagram + Animator: Dyck-Path Prefix Sum Trajectory ('aababb')",
    animTitleSi: "මුල් PDF රූප සටහන සහ සජීවීකරණය: Dyck-Path ගමන් මග ('aababb')",
    animFrames: [
      {
        en: "For S = 'aababb', P = [0, 1, 2, 1, 2, 1, 0]. Vowel = +1, Consonant = -1. Starts l=1 ('aababb'), l=2 ('ab'), and l=4 ('ab') each start with a vowel and return to P[l-1] → 3 Harmonious substrings!",
        si: "S = 'aababb' සඳහා P = [0, 1, 2, 1, 2, 1, 0]. l=1 ('aababb'), l=2 ('ab'), සහ l=4 ('ab') යන ස්ථාන 3න් ඇරඹෙන කොටස් P[l-1] මට්ටමට නැවත පැමිණෙන නිසා පිළිතුර 3කි!",
        svg: `<svg viewBox="0 0 620 200">
          <line x1="50" y1="150" x2="570" y2="150" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,4"/>
          <polyline points="60,150 140,95 220,40 300,95 380,40 460,95 540,150" fill="none" stroke="#3b82f6" stroke-width="3.5"/>
          <g fill="#638cff" font-family="Inter" font-size="12" text-anchor="middle">
            <circle cx="60" cy="150" r="6"/><text x="60" y="175" fill="currentColor">t=0 (P=0)</text>
            <circle cx="140" cy="95" r="6"/><text x="140" y="80" fill="#3dd68c">+1 'a'</text>
            <circle cx="220" cy="40" r="6"/><text x="220" y="25" fill="#3dd68c">+1 'a'</text>
            <circle cx="300" cy="95" r="6"/><text x="300" y="118" fill="#f59e0b">-1 'b'</text>
            <circle cx="380" cy="40" r="6"/><text x="380" y="25" fill="#3dd68c">+1 'a'</text>
            <circle cx="460" cy="95" r="6"/><text x="460" y="118" fill="#f59e0b">-1 'b'</text>
            <circle cx="540" cy="150" r="7" fill="#3dd68c"/><text x="540" y="175" fill="#3dd68c" font-weight="700">t=6 (P=0) ✓</text>
          </g>
        </svg>`
      }
    ]
  },

  q11: {
    origEn: `Trading network with N hubs and M directed conduits (1 coin per step).
• Even step (0, 2, 4...) from u: requires v > u.
• Odd step (1, 3, 5...) from u: requires v < u.
Find minimum steps > 0 to leave hub 1 and return to hub 1, or -1 if impossible.`,
    origSi: `Hubs N ක් සහ එක් දිශාවකට පමණක් යා හැකි මාර්ග (directed conduits) M ක් ඇත.
• ඉරට්ටේ පියවරවලදී (0, 2, 4...): v > u විය යුතුය.
• ඔත්තේ පියවරවලදී (1, 3, 5...): v < u විය යුතුය.
Hub 1 සිට පිටත් වී නැවත Hub 1 වෙත පැමිණීමට ගතවන අවම පියවර ගණන (> 0) සොයන්න.`,
    constraints: "2 ≤ N ≤ 200,000 | 1 ≤ M ≤ 300,000",
    sampleIn: "4 5\n1 3\n3 2\n2 4\n4 1\n1 2",
    sampleOut: "4",
    stepLines: [
      [5, 12],  // Step 1: Read directed graph
      [14, 15], // Step 2: Encode state = node*2 + parity
      [16, 18], // Step 3: Start at (hub 1, p=0)
      [20, 35], // Step 4: BFS transitions & cycle closure check v == 1
      [37, 38]  // Step 5: Unreachable (-1)
    ]
  },

  q12: {
    origEn: `A server must execute N jobs. Job i can start at A[i] or B[i] and runs for D[i] time units, occupying [S[i], S[i]+D[i]).
For a cooldown X ≥ 0, every pair of jobs must have at least X idle time units between them:
S[i] + D[i] + X ≤ S[j]   OR   S[j] + D[j] + X ≤ S[i].
Find the maximum possible integer X, or -1 if no valid schedule exists even for X = 0.`,
    origSi: `Server එකක jobs N ක් ක්‍රියාත්මක කළ යුතුය. Job i ආරම්භ කළ හැක්කේ A[i] හෝ B[i] යන වේලාවන් දෙකෙන් එකකදී පමණක් වන අතර එය D[i] කාලයක් ක්‍රියාත්මක වේ.
ඕනෑම jobs දෙකක් අතර අවම වශයෙන් X හිස් කාලයක් (cooldown) පැවතිය යුතුය. හැකි උපරිම X අගය සොයන්න (X = 0 දී පවා overlap වේ නම් -1).`,
    constraints: "2 ≤ N ≤ 700 | 0 ≤ A[i], B[i] ≤ 10⁹ | 1 ≤ D[i] ≤ 10⁹",
    sampleIn: "3\n0 10 4\n5 15 4\n10 20 4",
    sampleOut: "1",
    stepLines: [
      [4, 17],  // Step 1: Read input & build 2N literal intervals
      [18, 27], // Step 2: Compute pairwise gaps max(sj-ei, si-ej)
      [28, 31], // Step 3: Pack keys & sort all pairs by gap once
      [33, 39], // Step 4: Bitmask helpers & negation bit-swapper
      [75, 83], // Step 5: extend() adds implication edges for forbidden pairs
      [40, 73], // Step 6: Bitmask Kosaraju SCC satisfiability check
      [84, 93], // Step 7: Incremental binary search over sorted gaps
      [94, 96]  // Step 8: Output maximum cooldown X or -1
    ]
  },

  q15: {
    origEn: `Maintain n binary artifacts x[1..n] ∈ {0, 1} with reference x[0] = 0 (no cost). Artifact i has costs c[i][0] and c[i][1].
Process q operations:
• ADD id u v b: activate relation x[u] XOR x[v] = b.
• DEL id: deactivate relation id.
• COST i a b: persistently replace artifact i's costs with (a, b).
• ASK k u1 v1 b1 ... uk vk bk (0 ≤ k ≤ 3): temporarily add k relations, output minimum total penalty M and number of optimal assignments W mod 10⁹+7 (or -1 0 if inconsistent).`,
    origSi: `x[0] = 0 ලෙස ස්ථිරව පවතින අතර artifacts 1..n සඳහා 0 හෝ 1 ලබා දිය යුතුය. Artifact i සඳහා වියදම් c[i][0] සහ c[i][1] වේ.
• ADD id u v b: x[u] XOR x[v] = b නීතිය සක්‍රිය කරන්න.
• DEL id: id නීතිය ඉවත් කරන්න.
• COST i a b: i හි වියදම් (a, b) ලෙස ස්ථිරවම යාවත්කාලීන කරන්න.
• ASK k ... (k ≤ 3): තාවකාලිකව එම නීති k ද එක් කර, අවම මුළු වියදම M සහ එම අවම වියදම ලබා දෙන ආකාර ගණන W mod 10⁹+7 ලෙස print කරන්න (පරස්පර නම් -1 0).`,
    constraints: "1 ≤ n, q ≤ 200,000 | 0 ≤ c[i][0], c[i][1] ≤ 10¹² | 0 ≤ k ≤ 3",
    sampleIn: "3 8\n2 8\n5 1\n4 4\nASK 0\nADD 1 1 2 0\nASK 0\nASK 1 1 2 1\nCOST 1 10 0\nASK 0\nADD 2 0 1 0\nASK 0",
    sampleOut: "7 2\n11 2\n-1 0\n5 2\n19 2",
    stepLines: [
      [88, 100],  // Step 1: Read initial costs & set B[0] = INF
      [106, 130], // Step 2: Parse ADD/DEL/COST/ASK into active time intervals
      [58, 64],   // Step 3: Insert edge & cost intervals into Segment Tree over time
      [70, 85],   // Step 4: DFS segment tree with unite() and addCost()
      [74, 79],   // Step 5: Handle leaf ASK & temporary k relations
      [43, 51],   // Step 6: Rollback DSU & cost stack on exit
      [136, 141]  // Step 7: Print M and 2^E mod 1e9+7
    ]
  },

  q16: {
    origEn: `Given an array A of N integers (< 2¹⁸). Process Q operations:
• X l r x: For all l ≤ i ≤ r, set A[i] = A[i] XOR x.
• S i x: Set A[i] = x.
• K l r p k: Consider all subsets of indices in [l, r] whose size has parity p (0 = even, 1 = odd). Take their distinct XOR values in increasing order and output the k-th smallest (or -1 if fewer than k exist).`,
    origSi: `2¹⁸ ට අඩු සංඛ්‍යා N කින් යුත් A නම් array එකක් දී ඇත:
• X l r x: [l, r] පරාසයේ සියලු A[i] අගයන් x සමඟ XOR කරන්න.
• S i x: A[i] = x ලෙස වෙනස් කරන්න.
• K l r p k: [l, r] පරාසයේ දිගෙහි ඉරට්ටේ/ඔත්තේ බව p (0=ඉරට්ටේ, 1=ඔත්තේ) වන උපකුලකවල (subsets) වෙනස් XOR අගයන් කුඩා අගයේ සිට පෙළගස්වා k-වන අගය print කරන්න.`,
    constraints: "1 ≤ N, Q ≤ 80,000 | 0 ≤ A[i], x < 2¹⁸ | 1 ≤ k ≤ 10¹⁸",
    sampleIn: "4 11\n1 2 3 2\nK 1 4 0 2\nK 1 4 1 4\nX 1 4 4\nK 1 4 0 4\nK 1 4 1 1\nS 1 7\nK 1 4 1 2\nK 1 4 0 3\nK 2 2 0 1\nK 2 2 1 1\nK 2 2 1 2",
    sampleOut: "1\n3\n3\n4\n7\n-1\n0\n6\n-1",
    stepLines: [
      [99, 105],  // Step 1: Build difference array E[i] = A[i] ^ A[i-1], SegTree & Fenwick
      [72, 85],   // Step 2: Range XOR updates only E[l] and E[r+1]
      [114, 118], // Step 3: Point assignment S i x via Fenwick query
      [119, 141], // Step 4: Merge linear basis of E[l+1..r] from Segment Tree
      [143, 156], // Step 5: Reduce basis to RREF & check k <= 2^rank
      [158, 163], // Step 6: For odd parity (p=1), reduce A[l] by basis
      [165, 173]  // Step 7: Reconstruct k-th smallest XOR using bits of k-1
    ]
  },

  q17: {
    origEn: `Given a bracket string S of length N ('(' and ')'). Process Q operations:
• R l r: Reverse S[l..r].
• F l r: Invert every bracket in S[l..r] ('(' ↔ ')').
• C l r k: Cyclically rotate S[l..r] right by k positions.
• Q l r: Output the minimum single-bracket inversions needed to make S[l..r] a valid bracket sequence (or -1 if length is odd).`,
    origSi: `'(' සහ ')' වලින් සමන්විත දිග N වූ S වචනයක් සඳහා:
• R l r: S[l..r] කොටස අග සිට මුලට හරවන්න (Reverse).
• F l r: S[l..r] හි සෑම වරහනක්ම අනෙක් පැත්ත හරවන්න ('(' ↔ ')').
• C l r k: S[l..r] කොටස ස්ථාන k කින් දකුණට චක්‍රීයව කරකවන්න (Rotate).
• Q l r: S[l..r] නිවැරදි වරහන් පෙළක් කිරීමට අවම වශයෙන් වරහන් කීයක් හැරවිය යුතුදැයි සොයන්න (දිග ඔත්තේ නම් -1).`,
    constraints: "1 ≤ N, Q ≤ 200,000 | 0 ≤ k ≤ 10¹⁸",
    sampleIn: "8 12\n))(())((\nQ 1 8\nF 2 5\nQ 1 8\nR 1 8\nQ 1 8\nC 2 7 3\nQ 2 7\nQ 1 3\nF 1 8\nQ 1 8\nC 1 8 16\nQ 1 8",
    sampleOut: "2\n2\n0\n2\n-1\n2\n2",
    stepLines: [
      [138, 146], // Step 1: Read string (+1 / -1) & build balanced Treap
      [14, 45],   // Step 2: Node pull() and lazy push() for invert & reverse
      [154, 165], // Step 3: Q l r computes A = -qmn, B = qs + A, ans = ⌈A/2⌉ + ⌈B/2⌉
      [172, 185], // Step 4: Split [l, r] and apply R, F, or C rotation
      [186, 187]  // Step 5: Merge Treap pieces back together
    ]
  },

  q18: {
    origEn: `Given an odd prime p and integer a. Each of Q queries gives b and defines the elliptic curve:
y² ≡ x³ + a·x + b (mod p).
Count all ordered pairs (x, y) with 0 ≤ x, y < p satisfying the equation, plus 1 for the point at infinity.`,
    origSi: `ඔත්තේ ප්‍රථමක සංඛ්‍යාවක් වන p සහ a දී ඇත. එක් එක් ප්‍රශ්නයෙන් b දෙනු ලැබේ:
y² ≡ x³ + a·x + b (mod p)
සමීකරණය තෘප්ත කරන 0 ≤ x, y < p යුගල (x, y) ගණනට අනන්තයේ ලක්ෂ්‍යය සඳහා 1ක් එක් කර ලැබෙන මුළු ලක්ෂ්‍ය ගණන සොයන්න.`,
    constraints: "3 ≤ p ≤ 200,003 | 0 ≤ a, b < p | 1 ≤ Q ≤ 200,000",
    sampleIn: "5 1 3\n0\n1\n2",
    sampleOut: "4\n9\n4",
    stepLines: [
      [43, 46], // Step 1: Precompute Legendre symbol table chi[]
      [48, 50], // Step 2: Frequency table cnt[(x³ + ax) mod p]
      [52, 58], // Step 3: Prepare reversed cnt array A and periodic Legendre array B
      [60, 62], // Step 4: Convolve A and B in O(p log p) using NTT
      [64, 71]  // Step 5: Answer each query in O(1) as p + 1 + S(b)
    ]
  },

  q22: {
    origEn: `Alice and Bob play Nim on N piles A[1..N]. On a turn, a player chooses A[i] > 0 and subtracts k (1 ≤ k ≤ A[i]) such that C(A[i], k) is ODD (C(A[i], k) ≡ 1 mod 2). Last player to move wins. Determine the winner.`,
    origSi: `Alice සහ Bob ධන පූර්ණ සංඛ්‍යා N ක් මත ක්‍රීඩාවක් කරයි. එක් වාරයකදී A[i] > 0 තෝරා, C(A[i], k) ඔත්තේ අගයක් වන පරිදි k (1 ≤ k ≤ A[i]) අඩු කළ හැක. අවසානයට පියවරක් තබන කෙනා දිනයි.`,
    constraints: "1 ≤ T ≤ 20 | 1 ≤ N ≤ 300,000 | 1 ≤ A[i] ≤ 10¹⁸",
    sampleIn: "3\n3\n3 5 6\n2\n7 7\n4\n1 2 4 8",
    sampleOut: "ALICE (Note: PDF sample misprints BOB for test 1)\nBOB\nBOB",
    stepLines: [
      [11, 16], // Step 1: Read T and N
      [17, 22], // Step 2: XOR popcounts using __builtin_popcountll(a)
      [23, 24]  // Step 3: Output ALICE if XOR != 0 else BOB
    ]
  },

  q23: {
    origEn: `Given a tree of N vertices with positive edge weights w(e). For any simple path P, its Harmonic Latency is:
H(P) = (min_{e ∈ P} w(e)) × |P|, where |P| is the number of edges on P.
Find the maximum Harmonic Latency over all simple paths.`,
    origSi: `ධන දාර බර (edge weights) සහිත ශීර්ෂ N ක ගසක් (tree) දී ඇත. ඕනෑම P මාර්ගයක Harmonic Latency අගය:
H(P) = (P මාර්ගයේ කුඩාම දාර බර) × (P හි දාර ගණන) වේ.
ගසෙහි ලබාගත හැකි උපරිම H(P) අගය සොයන්න.`,
    constraints: "2 ≤ N ≤ 200,000 | 1 ≤ w ≤ 10⁹",
    sampleIn: "5\n1 2 10\n2 3 5\n3 4 8\n4 5 2",
    sampleOut: "15",
    stepLines: [
      [37, 68], // Step 1: Read tree & build BFS + Binary Lifting LCA table
      [70, 72], // Step 2: Initialize DSU with diameter endpoints (i, i)
      [74, 74], // Step 3: Sort edges descending by weight
      [77, 90], // Step 4: Merge components & update diameter from the 4 endpoints
      [92, 96]  // Step 5: Update max answer with w * new_diameter
    ]
  }
};
