// Acronyms and hard words, English + Sinhala, with an example for each.
// `match` is the regex (without \b) that finds the term in the explanations; `cs` = case-sensitive.
window.GLOSSARY_DATA = [
  // ---------------- Acronyms ----------------
  {
    term: "BFS", cat: "Acronym · Graph", match: "BFS|breadth-first search", cs: false,
    en: "Breadth-First Search. Visit the graph layer by layer: first everything 1 step away, then 2 steps, and so on, using a queue. When every move costs 1, the first time BFS reaches a node is the shortest distance to it.",
    si: "Breadth-First Search. Graph එක තට්ටුවෙන් තට්ටුව බලනවා: මුලින් පියවර 1ක් දුර තියෙන හැම node එකම, ඊට පස්සේ පියවර 2, ඊට පස්සේ 3... මේකට queue එකක් පාවිච්චි කරනවා. හැම පියවරකටම වියදම 1 නම්, BFS එක node එකකට මුලින්ම යන වෙලාවේ ලැබෙන දුර තමයි කෙටිම දුර.",
    exEn: "Q6: from Hub 1 at t=0, layer 1 reaches Hub 3 (t=1), layer 2 reaches Hub 2 (t=2), layer 3 reaches Hub 4 (t=3). So the answer is 3.",
    exSi: "Q6: t=0 දී Hub 1 ඉඳන් පටන් ගත්තම, 1 වෙනි තට්ටුවේ Hub 3 (t=1), 2 වෙනි තට්ටුවේ Hub 2 (t=2), 3 වෙනි තට්ටුවේ Hub 4 (t=3). ඒ නිසා උත්තරය 3."
  },
  {
    term: "DFS", cat: "Acronym · Graph", match: "DFS|depth-first search", cs: false,
    en: "Depth-First Search. Go as deep as possible along one branch, then come back and try the next branch. Used for tree walks, Euler tours and Tarjan's algorithm.",
    si: "Depth-First Search. එක අත්තක් දිගේ පුළුවන් තරම් ගැඹුරට ගිහින්, ආපහු ඇවිත් ඊළඟ අත්තට යනවා. Tree එකක් පීරන්න, Euler tour හදන්න, Tarjan algorithm එකට මේක ඕනේ.",
    exEn: "Tree 1–2, 1–3, 2–4: DFS order is 1 → 2 → 4 (back to 2, back to 1) → 3.",
    exSi: "Tree එක 1–2, 1–3, 2–4 නම්: DFS පිළිවෙල 1 → 2 → 4 (ආපහු 2 ට, ආපහු 1 ට) → 3."
  },
  {
    term: "BIT", cat: "Acronym · Data structure", match: "BIT|Fenwick tree|Fenwick", cs: true,
    en: "Binary Indexed Tree, also called a Fenwick tree. An array that can add a value at one position and give the sum of positions 1..i, both in O(log N). It jumps using the lowest set bit: i & -i.",
    si: "Binary Indexed Tree, නැත්නම් Fenwick tree. එක තැනකට අගයක් එකතු කරන්නත්, 1 සිට i දක්වා එකතුව (prefix sum) ගන්නත් දෙකටම O(log N) වෙලාවයි යන්නේ. පනින්නේ i & -i (අඩුම 1 bit එක) පාවිච්චි කරලා.",
    exEn: "Inserted Y ranks {2, 5, 6}: sum(5) = 2 values are ≤ 5, so 3 − 2 = 1 value is > 5. sum(7) only reads tree[7], tree[6], tree[4].",
    exSi: "දාපු Y ranks {2, 5, 6} නම්: sum(5) = 2, ඒ කියන්නේ 5 ට අඩු හෝ සමාන ඒවා 2යි. ඉතින් 5 ට වඩා ලොකු ඒවා 3 − 2 = 1යි. sum(7) කියවන්නේ tree[7], tree[6], tree[4] විතරයි."
  },
  {
    term: "CDQ", cat: "Acronym · Divide & conquer", match: "CDQ", cs: true,
    en: "CDQ divide and conquer (named after Chen Danqi). An offline trick for 3D counting (time, X, Y): split the events in half by time, solve each half, then count how the left half's points affect the right half's queries by sorting on X and using a BIT on Y. Total O(N log² N).",
    si: "CDQ divide and conquer (Chen Danqi ගේ නමින්). Dimensions 3ක (time, X, Y) ගණන් කිරීම් offline විසඳන ක්‍රමයක්. Events ටික time අනුව දෙකට කඩලා, කොටස් දෙකම වෙන වෙනම විසඳලා, වම් කොටසේ points දකුණු කොටසේ queries වලට බලපාන ප්‍රමාණය X අනුව sort කරලා Y වලට BIT එකක් දාලා ගණන් කරනවා. මුළු වෙලාව O(N log² N).",
    exEn: "Q1: every point in the left half has a smaller index than every query in the right half, so the condition v ≤ R is already true for that cross step.",
    exSi: "Q1: වම් කොටසේ හැම point එකකම index එක, දකුණු කොටසේ හැම query එකකම index එකට වඩා අඩුයි. ඒ නිසා v ≤ R කොන්දේසිය ඉබේම හරි."
  },
  {
    term: "LCA", cat: "Acronym · Tree", match: "LCA|lowest common ancestor", cs: false,
    en: "Lowest Common Ancestor. In a rooted tree, the deepest node that is above both u and v. With binary lifting (up[j][v] = 2^j-th parent) it is found in O(log N).",
    si: "Lowest Common Ancestor. Root එකක් තියෙන tree එකක u ටයි v ටයි දෙකටම උඩින් තියෙන, ගැඹුරුම (පහළම) පොදු node එක. Binary lifting (up[j][v] = 2^j වෙනි parent) පාවිච්චි කළොත් O(log N) වලින් හොයන්න පුළුවන්.",
    exEn: "Root 1, children 2 and 3, and 4, 5 under 2: LCA(4, 5) = 2 and LCA(4, 3) = 1. Distance(u, v) = depth[u] + depth[v] − 2·depth[LCA].",
    exSi: "Root එක 1, ඒකේ ළමයි 2 සහ 3, 2 ට යටින් 4 සහ 5: LCA(4, 5) = 2, LCA(4, 3) = 1. u, v අතර දුර = depth[u] + depth[v] − 2·depth[LCA]."
  },
  {
    term: "SAM", cat: "Acronym · String", match: "SAM|suffix automaton", cs: false,
    en: "Suffix Automaton. The smallest graph that contains every substring of S, with at most 2N − 1 states. Substrings that end at exactly the same set of positions (same endpos) share one state.",
    si: "Suffix Automaton. S එකේ හැම substring එකක්ම තියෙන කුඩාම graph එක. States 2N − 1 කට වඩා නෑ. හරියටම එකම තැන් වලින් ඉවර වෙන (endpos එකම) substrings එකම state එකට වැටෙනවා.",
    exEn: "S = \"aaaaab\": \"ab\", \"aab\", ..., \"aaaaab\" all end only at position 6, so they are one state whose longest string has length 6.",
    exSi: "S = \"aaaaab\": \"ab\", \"aab\", ..., \"aaaaab\" ඔක්කොම ඉවර වෙන්නේ 6 වෙනි තැනින් විතරයි. ඒ නිසා ඒ ඔක්කොම එක state එකක්. ඒකේ දිගම string එකේ දිග 6."
  },
  {
    term: "MEX / Grundy", cat: "Acronym · Game theory", match: "Grundy|mex|Sprague-Grundy", cs: false,
    en: "MEX = minimum excluded value: the smallest number 0, 1, 2, ... that is NOT in a set. A game position's Grundy number is the mex of the Grundy numbers you can move to. A position with no moves has Grundy 0 (the player to move loses). For several independent games, XOR the Grundy numbers: non-zero means the first player wins.",
    si: "MEX = minimum excluded value: set එකක නැති කුඩාම අංකය (0, 1, 2, ... අතරින්). Game එකක position එකක Grundy අගය කියන්නේ, ඒකෙන් යන්න පුළුවන් positions වල Grundy අගයන්ගේ mex එක. යන්න තැනක් නැති position එකක Grundy අගය 0 (ඒ වෙලාවේ ගහන්න ඕනේ කෙනා පරදිනවා). Games කිහිපයක් එකට තියෙනකොට Grundy අගයන් XOR කරන්න: 0 නැත්නම් පළමු කෙනා දිනනවා.",
    exEn: "mex({0, 1, 3}) = 2, mex({1, 2}) = 0, mex({}) = 0. Piles with Grundy 3 and 3: 3 XOR 3 = 0, so the second player wins.",
    exSi: "mex({0, 1, 3}) = 2, mex({1, 2}) = 0, mex({}) = 0. Grundy 3 සහ 3 තියෙන ගොඩවල් දෙකක්: 3 XOR 3 = 0, ඉතින් දෙවෙනි කෙනා දිනනවා."
  },
  {
    term: "2-SAT", cat: "Acronym · Logic / graph", match: "2-SAT|2SAT", cs: false,
    en: "2-Satisfiability. Each item has exactly two choices (true/false, or start at A/B). Every rule says \"not both of these\". Each rule becomes two arrows (if p then not q, if q then not p). It is solvable unless some choice and its opposite end up in the same SCC.",
    si: "2-Satisfiability. හැම දේකටම තේරීම් දෙකක් විතරයි (true/false, නැත්නම් A වෙලාවේ හෝ B වෙලාවේ පටන් ගන්නවා). හැම නීතියක්ම කියන්නේ \"මේ දෙකම එකට බෑ\" කියලා. ඒ හැම නීතියක්ම ඊතල දෙකක් වෙනවා (p නම් q නෑ, q නම් p නෑ). කිසිම තේරීමක් සහ ඒකේ විරුද්ධ තේරීම එකම SCC එකේ නැත්නම් විසඳුමක් තියෙනවා.",
    exEn: "Q12: job 1 at A1 clashes with job 2 at B2 → arrows A1 → A2 (job 2 must use A) and B2 → B1 (job 1 must use B).",
    exSi: "Q12: job 1 A1 වෙලාවෙයි job 2 B2 වෙලාවෙයි ගැටෙනවා නම් → A1 → A2 (job 2 ට A ගන්න වෙනවා) සහ B2 → B1 (job 1 ට B ගන්න වෙනවා) කියලා ඊතල දෙකක්."
  },
  {
    term: "SCC", cat: "Acronym · Graph", match: "SCC|strongly connected component|Kosaraju|Tarjan's SCC", cs: false,
    en: "Strongly Connected Component. A largest group of nodes in a directed graph where every node can reach every other node. Found in O(V + E) with Tarjan's or Kosaraju's algorithm.",
    si: "Strongly Connected Component. ඊතල තියෙන (directed) graph එකක, ඕනෑම node එකක ඉඳන් ඒ කණ්ඩායමේ ඕනෑම node එකකට යන්න පුළුවන් ලොකුම කණ්ඩායම. Tarjan හෝ Kosaraju algorithm එකෙන් O(V + E) වලින් හොයනවා.",
    exEn: "Arrows 1→2, 2→3, 3→1, 3→4: {1, 2, 3} is one SCC and {4} is another (you cannot get back from 4).",
    exSi: "ඊතල 1→2, 2→3, 3→1, 3→4 නම්: {1, 2, 3} එක SCC එකක්, {4} තව එකක් (4 ඉඳන් ආපහු එන්න බෑ)."
  },
  {
    term: "DSU", cat: "Acronym · Data structure", match: "DSU|union-find|disjoint set", cs: false,
    en: "Disjoint Set Union (union-find). Keeps items in separate groups. find(x) gives x's group leader, unite(x, y) joins two groups. The rollback version skips path compression and records every change on a stack, so unions can be undone (used with a segment tree over time).",
    si: "Disjoint Set Union (union-find). දේවල් වෙන වෙනම කණ්ඩායම් වලට බෙදලා තියාගන්නවා. find(x) එකෙන් x ගේ කණ්ඩායමේ නායකයා ලැබෙනවා, unite(x, y) එකෙන් කණ්ඩායම් දෙකක් එකතු කරනවා. Rollback තියෙන version එකේ path compression නෑ, හැම වෙනසක්ම stack එකක ලියාගන්නවා. ඒ නිසා unite කරපු ඒවා ආපහු undo කරන්න පුළුවන් (segment tree over time එක්ක පාවිච්චි වෙනවා).",
    exEn: "Q15: a relation that is active from step 0 to step 2 is put on the segment-tree nodes covering [0, 2]; we unite when we enter the node and roll back when we leave it.",
    exSi: "Q15: step 0 සිට step 2 දක්වා තියෙන relation එකක් [0, 2] cover කරන segment tree nodes වලට දානවා. Node එකට යනකොට unite කරනවා, ආපහු එනකොට rollback කරනවා."
  },
  {
    term: "NTT", cat: "Acronym · Number theory", match: "NTT|number theoretic transform", cs: false,
    en: "Number Theoretic Transform. The Fast Fourier Transform done with whole numbers modulo a prime such as 998244353 = 119·2²³ + 1. Multiplies two polynomials (or computes all correlation sums) in O(N log N) with no rounding errors.",
    si: "Number Theoretic Transform. Fast Fourier Transform එකම, හැබැයි දශම සංඛ්‍යා වෙනුවට 998244353 = 119·2²³ + 1 වගේ ප්‍රථමක සංඛ්‍යාවක mod එකෙන් පූර්ණ සංඛ්‍යා වලින් කරනවා. බහුපද දෙකක් O(N log N) වලින් ගුණ කරනවා, rounding වැරදි නැතුව.",
    exEn: "Q18: instead of an O(p²) double loop for every b, one NTT gives the answers for all b at once.",
    exSi: "Q18: හැම b එකකටම O(p²) loop දෙකක් දානවා වෙනුවට, එක NTT එකකින් හැම b එකකටම උත්තර එකපාර ලැබෙනවා."
  },
  {
    term: "Legendre symbol", cat: "Number theory", match: "Legendre symbol|Legendre", cs: false,
    en: "χ(v) for a prime p: +1 if v is a non-zero square mod p, −1 if it is not a square, 0 if v ≡ 0. The equation y² ≡ v (mod p) has exactly 1 + χ(v) solutions.",
    si: "ප්‍රථමක p එකක් සඳහා χ(v): v කියන්නේ mod p යටතේ 0 නොවන වර්ගයක් (square) නම් +1, වර්ගයක් නෙවෙයි නම් −1, v ≡ 0 නම් 0. y² ≡ v (mod p) සමීකරණයට හරියටම විසඳුම් 1 + χ(v) ක් තියෙනවා.",
    exEn: "p = 5: 1² = 1 and 2² = 4, so χ = [0, +1, −1, −1, +1] for v = 0..4. y² ≡ 4 has 2 solutions (y = 2, 3).",
    exSi: "p = 5: 1² = 1, 2² = 4. ඉතින් v = 0..4 සඳහා χ = [0, +1, −1, −1, +1]. y² ≡ 4 ට විසඳුම් 2යි (y = 2, 3)."
  },
  {
    term: "FWHT", cat: "Acronym · Transform", match: "FWHT|Walsh-Hadamard|Walsh–Hadamard", cs: false,
    en: "Fast Walsh–Hadamard Transform. Computes the XOR convolution C[k] = Σ A[i]·B[j] over all i XOR j = k for arrays of length 2^D in O(D·2^D), using butterfly steps (u, v) → (u + v, u − v).",
    si: "Fast Walsh–Hadamard Transform. දිග 2^D වෙන arrays දෙකක XOR convolution එක (i XOR j = k වෙන හැම A[i]·B[j] එකතුව) O(D·2^D) වලින් හොයනවා. පාවිච්චි කරන්නේ (u, v) → (u + v, u − v) කියන butterfly පියවර.",
    exEn: "D = 18 (N = 262,144): direct pairs would be N² ≈ 6.9×10¹⁰, FWHT needs only about 4.7×10⁶ steps.",
    exSi: "D = 18 (N = 262,144): කෙලින්ම pairs ගණන් කළොත් N² ≈ 6.9×10¹⁰ යි. FWHT එකට පියවර 4.7×10⁶ ක් විතරයි."
  },
  {
    term: "RREF", cat: "Acronym · Linear algebra", match: "RREF|row-echelon|XOR basis|linear basis", cs: false,
    en: "Reduced Row-Echelon Form of an XOR basis. Every basis number has a different top bit, and that top bit is cleared from all the other basis numbers. Then the k-th smallest XOR is read straight from the bits of k − 1.",
    si: "XOR basis එකක Reduced Row-Echelon Form. Basis එකේ හැම අංකයකටම වෙනස් ඉහළම bit එකක් තියෙනවා, ඒ bit එක අනිත් හැම basis අංකයකින්ම අයින් කරලා. එතකොට k වෙනි කුඩාම XOR අගය k − 1 ගේ bits වලින් කෙලින්ම කියවන්න පුළුවන්.",
    exEn: "Basis {6 (110), 3 (011), 1 (001)} becomes {4 (100), 2 (010), 1 (001)}. The 6th smallest XOR (k − 1 = 5 = 101) is 4 XOR 1 = 5.",
    exSi: "Basis {6 (110), 3 (011), 1 (001)} → {4 (100), 2 (010), 1 (001)}. 6 වෙනි කුඩාම XOR එක (k − 1 = 5 = 101) = 4 XOR 1 = 5."
  },
  {
    term: "BSGS", cat: "Acronym · Number theory", match: "BSGS|baby-step giant-step|baby step giant step", cs: false,
    en: "Baby-Step Giant-Step. Solves A^t ≡ Y (mod P) in about √P steps: write t = i·m − j with m = ⌈√P⌉, store the m \"baby steps\" Y·A^j in a hash table, then try the \"giant steps\" (A^m)^i until one matches.",
    si: "Baby-Step Giant-Step. A^t ≡ Y (mod P) විසඳන්නේ √P වගේ පියවර ගාණකින්: m = ⌈√P⌉ අරගෙන t = i·m − j විදිහට ලියනවා. Y·A^j කියන \"පොඩි පියවර\" m ගාණ hash table එකක දාලා, (A^m)^i කියන \"ලොකු පියවර\" එකක් ගැළපෙනකම් බලනවා.",
    exEn: "P ≈ 10⁹ → m = 31623: at most 31,623 stored values and 31,623 giant steps instead of 10⁹ tries.",
    exSi: "P ≈ 10⁹ → m = 31623: 10⁹ පාරක් බලනවා වෙනුවට අගයන් 31,623 ක් ගබඩා කරලා ලොකු පියවර 31,623 ක් විතරයි."
  },
  {
    term: "DP", cat: "Acronym · Technique", match: "DP|dynamic programming", cs: true,
    en: "Dynamic Programming. Break the problem into smaller sub-problems, solve each one once, store the answer in a table (dp[...]) and build bigger answers from smaller ones.",
    si: "Dynamic Programming. ප්‍රශ්නය පොඩි ප්‍රශ්න වලට කඩලා, ඒ හැම එකක්ම එක පාරක් විතරක් විසඳලා, උත්තරය table එකක (dp[...]) ලියාගෙන, පොඩි උත්තර වලින් ලොකු උත්තර හදනවා.",
    exEn: "Fibonacci: dp[i] = dp[i−1] + dp[i−2]. Q9: dp[j] = best profit if job j is the last job.",
    exSi: "Fibonacci: dp[i] = dp[i−1] + dp[i−2]. Q9: dp[j] = job j අන්තිම job එක වුණොත් ලැබෙන හොඳම ලාභය."
  },
  {
    term: "CHT", cat: "Acronym · DP optimisation", match: "CHT|convex hull trick", cs: false,
    en: "Convex Hull Trick. When a DP step is \"best of m·x + c over many lines\", keep only the lines that can ever win (the lower or upper envelope) and query x quickly. The Li Chao tree is one way to do it.",
    si: "Convex Hull Trick. DP එකේ පියවරක් \"ගොඩක් රේඛා අතරින් m·x + c හොඳම එක\" වගේ නම්, කවදාහරි දිනන්න පුළුවන් රේඛා විතරක් තියාගෙන (envelope එක) x එකකට ඉක්මනට උත්තර ගන්නවා. Li Chao tree එක ඒක කරන එක ක්‍රමයක්.",
    exEn: "Lines y = x and y = −x + 4: for x < 2 the second is higher, for x > 2 the first. The envelope switches at x = 2.",
    exSi: "y = x සහ y = −x + 4 රේඛා දෙක: x < 2 නම් දෙවෙනි එක උඩින්, x > 2 නම් පළමු එක. Envelope එක මාරු වෙන්නේ x = 2 දී."
  },
  {
    term: "Li Chao Tree", cat: "Data structure · DP", match: "Li Chao tree|Li Chao", cs: false,
    en: "A segment tree over x values that stores lines y = m·x + c. Each node keeps the line that wins at its middle point and sends the loser to the one half where it can still win. Insert and \"best value at x\" both take O(log N).",
    si: "x අගයන් උඩ හදපු segment tree එකක්, ඒකේ y = m·x + c රේඛා ගබඩා කරනවා. හැම node එකකම මැද තැනේදී දිනන රේඛාව තියාගෙන, පරදින රේඛාව තාම දිනන්න පුළුවන් එකම පැත්තට යවනවා. Insert කරන්නත්, x එකක හොඳම අගය ගන්නත් O(log N).",
    exEn: "Q9: the penalty (L_j − R_i)² expands so that job i becomes the line m = 2R_i, c = dp[i] − R_i², and job j asks for the best line at x = L_j.",
    exSi: "Q9: (L_j − R_i)² දඩය විහිදුවාම job i එක m = 2R_i, c = dp[i] − R_i² රේඛාවක් වෙනවා. Job j එක x = L_j දී හොඳම රේඛාව අහනවා."
  },
  {
    term: "O(N log N)", cat: "Notation · Speed", match: "Big-O|big O|time complexity", cs: false,
    en: "Big-O tells how the running time grows with the input size N. O(N) = one pass, O(N log N) = sorting-like, O(N²) = all pairs. With N = 10⁵, O(N log N) is about 1.7 million steps but O(N²) is 10 billion.",
    si: "Big-O එකෙන් කියන්නේ input එක (N) ලොකු වෙනකොට වෙලාව කොච්චර වැඩි වෙනවද කියලා. O(N) = එක පාරක් යනවා, O(N log N) = sort කරනවා වගේ, O(N²) = හැම pair එකක්ම. N = 10⁵ නම් O(N log N) පියවර මිලියන 1.7 ක් විතර, හැබැයි O(N²) බිලියන 10 යි.",
    exEn: "About 10⁸ simple steps run in roughly one second, so for N = 2×10⁵ you need O(N log N) or better.",
    exSi: "සරල පියවර 10⁸ ක් තත්පරයකට විතර යනවා. ඉතින් N = 2×10⁵ නම් O(N log N) හෝ ඊට වඩා හොඳ එකක් ඕනේ."
  },
  {
    term: "mod 10⁹+7", cat: "Notation", match: "1e9\\+7|modulo",cs: false,
    en: "Answers can be huge, so the task asks for the remainder after dividing by the prime 1,000,000,007. Take the mod after every addition and multiplication so numbers never overflow 64 bits.",
    si: "උත්තර ගොඩක් ලොකු වෙන්න පුළුවන් නිසා, 1,000,000,007 කියන ප්‍රථමක සංඛ්‍යාවෙන් බෙදුවාම ඉතිරි වෙන අගය (remainder) ඉල්ලනවා. හැම එකතු කිරීමකටම, ගුණ කිරීමකටම පස්සේ mod එක ගන්න, එතකොට 64 bit ඉක්මවන්නේ නෑ.",
    exEn: "(10⁹ × 10⁹) mod (10⁹+7): multiply as 64-bit (10¹⁸ fits), then take the mod right away.",
    exSi: "(10⁹ × 10⁹) mod (10⁹+7): 64-bit විදිහට ගුණ කරලා (10¹⁸ ඇතුළට යනවා) වහාම mod එක ගන්න."
  },

  // ---------------- Hard words ----------------
  {
    term: "Monotonic Stack", cat: "Data structure", match: "monotonic stack|monotone stack", cs: false,
    en: "A stack that is always kept in increasing (or decreasing) order. Before pushing a new item, pop everything that breaks the order. Each item is pushed once and popped at most once, so the whole loop is O(N). It finds the nearest bigger/smaller element on each side.",
    si: "හැමවෙලේම වැඩිවෙන (නැත්නම් අඩුවෙන) පිළිවෙලට තියාගන්න stack එකක්. අලුත් එකක් දාන්න කලින්, පිළිවෙල කඩන ඔක්කොම pop කරනවා. හැම එකක්ම එක පාරක් push වෙලා, උපරිම එක පාරක් pop වෙන නිසා මුළු loop එකම O(N). දෙපැත්තේම ළඟම ලොකු/පොඩි අගය හොයන්න පාවිච්චි කරනවා.",
    exEn: "Energies [10, 20, 15, 5, 25]: when 20 comes, 10 is popped. When 15 comes, 20 stays on top, so the nearest bigger on the left of 15 is 20.",
    exSi: "Energy [10, 20, 15, 5, 25]: 20 එනකොට 10 pop වෙනවා. 15 එනකොට 20 උඩම තියෙනවා, ඉතින් 15 ට වමේ ළඟම ලොකු අගය 20."
  },
  {
    term: "Segment Tree", cat: "Data structure", match: "segment tree", cs: false,
    en: "A tree where each node stores an answer (sum, min, max...) for a range of the array; the root covers everything and children cover halves. Any range query or update touches only O(log N) nodes. Lazy propagation lets a whole range be updated at once.",
    si: "Array එකේ කොටසකට (range) උත්තරයක් (sum, min, max...) ගබඩා කරන nodes තියෙන tree එකක්. Root එක මුළු array එකම, ළමයි දෙන්නා ඒකෙන් බාගයක් බාගයක්. ඕනෑම range query එකකට හෝ update එකකට nodes O(log N) ක් විතරයි. Lazy propagation තිබුණොත් මුළු range එකක්ම එකපාර update කරන්න පුළුවන්.",
    exEn: "Array of 8: sum of [3, 6] is read from just 2–3 nodes instead of adding 4 numbers one by one.",
    exSi: "අංක 8ක array එකක: [3, 6] එකතුව අංක 4ම එකින් එක එකතු කරනවා වෙනුවට nodes 2–3 කින් ගන්නවා."
  },
  {
    term: "Segment Tree Beats", cat: "Data structure", match: "Segment Tree Beats|chmin", cs: false,
    en: "A segment tree that supports \"A[i] = min(A[i], x)\" on a range. Each node keeps the max, the second max and how many times the max appears. If second max < x < max, only the max values change, so the node is fixed in O(1); otherwise go deeper. The total work is amortized O((N + Q) log N).",
    si: "Range එකක \"A[i] = min(A[i], x)\" කරන්න පුළුවන් segment tree එකක්. හැම node එකකම උපරිම අගය, දෙවෙනි උපරිම අගය, සහ උපරිම අගය කී පාරක් තියෙනවද කියලා තියාගන්නවා. දෙවෙනි උපරිමය < x < උපරිමය නම් වෙනස් වෙන්නේ උපරිම අගයන් විතරයි, ඒ නිසා O(1) වලින් හදනවා. නැත්නම් පහළට යනවා. මුළු වැඩේ amortized O((N + Q) log N).",
    exEn: "Node values {9, 9, 5}: chmin with 7 → max 9 becomes 7 twice, sum drops by 4, no need to visit the children.",
    exSi: "Node එකේ අගයන් {9, 9, 5}: 7 එක්ක chmin → 9 දෙකම 7 වෙනවා, sum එක 4 කින් අඩු වෙනවා, ළමයින්ට යන්න ඕනේ නෑ."
  },
  {
    term: "Implicit Treap", cat: "Data structure", match: "implicit treap|treap", cs: false,
    en: "A randomly balanced binary tree that stores a sequence by position (subtree sizes act as indexes). It can split out any piece [l, r] and merge pieces back in O(log N), and lazy flags make reverse, invert and rotate of a piece cheap.",
    si: "අහඹු (random) priority වලින් balance කරපු binary tree එකක්, sequence එකක් position අනුව ගබඩා කරනවා (subtree sizes තමයි index එක). ඕනෑම කොටසක් [l, r] O(log N) වලින් කපලා අරගන්නත් (split), ආපහු අලවන්නත් (merge) පුළුවන්. Lazy flags නිසා කොටසක් reverse, invert, rotate කරන එක ලාභයි.",
    exEn: "Q17: rotate [l, r] right by k = cut out [l, r], split it into the first len − k and the last k, merge them in swapped order.",
    exSi: "Q17: [l, r] දකුණට k පාරක් rotate කරනවා = [l, r] කපලා අරගෙන, මුල් len − k සහ අන්තිම k කියලා දෙකට කඩලා, මාරු කරලා ආපහු අලවනවා."
  },
  {
    term: "Voronoi & Delaunay", cat: "Geometry", match: "Voronoi|Delaunay", cs: false,
    en: "The Voronoi cell of a point is the area closer to it than to any other point. Two cells share a border of real length exactly when their points are joined by a Delaunay triangulation edge (a circle through both contains no other point).",
    si: "Point එකක Voronoi කලාපය කියන්නේ අනිත් හැම point එකකටම වඩා ඒකට ළඟින් තියෙන ප්‍රදේශය. කලාප දෙකකට දිගක් තියෙන පොදු මායිමක් තියෙන්නේ, ඒ points දෙක Delaunay triangulation දාරයකින් යා වෙලා තියෙනකොට විතරයි (දෙකම හරහා යන, වෙන point එකක් ඇතුළේ නැති රවුමක් තියෙනවා).",
    exEn: "Q5: points (±10, ±1) split the plane into 4 quarters. Diagonal pairs meet only at (0, 0), a border of length 0, so they are not adjacent.",
    exSi: "Q5: (±10, ±1) points 4 තලය කොටස් 4කට බෙදනවා. විකර්ණ pairs හම්බවෙන්නේ (0, 0) තැනින් විතරයි, ඒ මායිමේ දිග 0, ඒ නිසා ඒවා adjacent නෑ."
  },
  {
    term: "Articulation point", cat: "Graph", match: "articulation point|cut vertex|cut vertices|critical node", cs: false,
    en: "A node whose removal splits its connected piece of the graph into more pieces. Also called a cut vertex; in Q2 it is a \"Critical Node\".",
    si: "අයින් කළොත් graph එකේ ඒ කොටස තවත් කොටස් වලට කැඩෙන node එකක්. Cut vertex කියලත් කියනවා. Q2 එකේ ඒකට කියන්නේ \"Critical Node\" කියලා.",
    exEn: "Triangles 1–2–3 and 3–4–5 share node 3. Remove 3 and {1, 2} is cut off from {4, 5}, so 3 is an articulation point.",
    exSi: "1–2–3 සහ 3–4–5 ත්‍රිකෝණ දෙක 3 node එක share කරනවා. 3 අයින් කළොත් {1, 2} සහ {4, 5} වෙන් වෙනවා, ඉතින් 3 articulation point එකක්."
  },
  {
    term: "Biconnected component", cat: "Graph", match: "biconnected component|biconnected|block-cut tree|resilient cluster", cs: false,
    en: "A largest group of nodes that stays connected if any one node is removed (Q2's \"Resilient Cluster\"). Joining each block to its cut vertices gives the block-cut tree (Q2's \"Macro-Tree\").",
    si: "ඕනෑම එක node එකක් අයින් කළත් සම්බන්ධව තියෙන ලොකුම nodes කණ්ඩායම (Q2 එකේ \"Resilient Cluster\"). හැම block එකක්ම ඒකේ cut vertices වලට යා කළාම block-cut tree එක ලැබෙනවා (Q2 එකේ \"Macro-Tree\").",
    exEn: "Triangle 1–2–3: remove any one node and the other two are still joined, so {1, 2, 3} is one biconnected component.",
    exSi: "1–2–3 ත්‍රිකෝණය: ඕනෑම node එකක් අයින් කළත් අනිත් දෙක යා වෙලා. ඉතින් {1, 2, 3} එක biconnected component එකක්."
  },
  {
    term: "Centroid decomposition", cat: "Tree", match: "centroid decomposition|centroid", cs: false,
    en: "Pick the centroid (a node whose removal leaves pieces of at most half the size), count all paths that pass through it, remove it and repeat in each piece. Every node is in O(log N) levels, so path counting becomes O(N log N).",
    si: "Centroid එක තෝරනවා (අයින් කළාම ඉතුරු වෙන හැම කොටසක්ම බාගයකට වඩා පොඩි වෙන node එක). ඒක හරහා යන හැම path එකක්ම ගණන් කරලා, ඒක අයින් කරලා, ඉතුරු කොටස් වල ආයෙත් එහෙමම කරනවා. හැම node එකක්ම levels O(log N) ක විතරයි, ඉතින් paths ගණන් කිරීම O(N log N).",
    exEn: "A path of 7 nodes: the centroid is node 4; after removing it, both pieces have 3 nodes.",
    exSi: "Nodes 7ක පේළියක් (path): centroid එක node 4. ඒක අයින් කළාම කොටස් දෙකේම nodes 3 බැගින්."
  },
  {
    term: "Euler tour", cat: "Tree", match: "Euler tour", cs: false,
    en: "Write down each node when DFS enters it (tin) and when it leaves (tout). A subtree becomes one continuous range [tin, tout], and a tree path can be turned into a range too, so array tricks (BIT, Mo's) work on trees.",
    si: "DFS එක node එකකට ඇතුළු වෙනකොට (tin) සහ ඉවර වෙලා යනකොට (tout) ලියාගන්නවා. එතකොට subtree එකක් [tin, tout] කියන එක දිගට තියෙන කොටසක් වෙනවා. Tree path එකකුත් range එකක් කරන්න පුළුවන්, ඒ නිසා array වලට පාවිච්චි කරන ක්‍රම (BIT, Mo's) trees වලටත් පාවිච්චි කරන්න පුළුවන්.",
    exEn: "Tree 1–2, 1–3: order 1, 2, 2, 3, 3, 1 → tin(2) = 2, tout(2) = 3, so 2's subtree is positions 2..3.",
    exSi: "Tree එක 1–2, 1–3: පිළිවෙල 1, 2, 2, 3, 3, 1 → tin(2) = 2, tout(2) = 3, ඉතින් 2 ගේ subtree එක තැන් 2..3."
  },
  {
    term: "Mo's algorithm", cat: "Offline queries", match: "Mo's algorithm|Mo's|Mo’s", cs: false,
    en: "Answer many range queries offline by sorting them into blocks of size √N and moving two pointers left/right one step at a time, updating counts as items enter or leave. Total about O((N + Q)·√N).",
    si: "ගොඩක් range queries offline විසඳන ක්‍රමයක්: queries √N ප්‍රමාණයේ blocks වලට sort කරලා, pointers දෙකක් එක පියවරක් ගාණේ වමට/දකුණට ගෙනියනවා. දේවල් ඇතුළට එනකොටයි එළියට යනකොටයි counts update කරනවා. මුළු වෙලාව O((N + Q)·√N) විතර.",
    exEn: "Q3: each query is a tree path made into an Euler-tour range; toggling a node in/out updates cnt[signal] and how many signals have each count.",
    exSi: "Q3: හැම query එකක්ම Euler tour range එකක් කරපු tree path එකක්. Node එකක් ඇතුළට/එළියට toggle කරනකොට cnt[signal] සහ හැම count එකකටම signals කීයක් තියෙනවද කියන එක update වෙනවා."
  },
  {
    term: "Binary lifting", cat: "Tree", match: "binary lifting", cs: false,
    en: "Store, for every node, its 1st, 2nd, 4th, 8th... ancestor (up[j][v]). Any jump of k levels is then at most log N table lookups, which gives LCA in O(log N).",
    si: "හැම node එකකටම ඒකේ 1, 2, 4, 8... වෙනි මුතුන් (ancestor) ගබඩා කරනවා (up[j][v]). එතකොට levels k ක් උඩට පනින්න lookups log N කට වඩා ඕනේ නෑ. LCA එක O(log N) වලින් ලැබෙනවා.",
    exEn: "Jump 13 = 8 + 4 + 1 levels: use up[3], then up[2], then up[0].",
    exSi: "Levels 13 ක් පනින්න = 8 + 4 + 1: up[3], ඊට පස්සේ up[2], ඊට පස්සේ up[0]."
  },
  {
    term: "Coordinate compression", cat: "Technique", match: "coordinate compression|compress(?:ed|es)?", cs: false,
    en: "Replace big values (up to 10⁹) by their rank among the distinct values (1, 2, 3...). Order is kept, but now the values can be array indexes, for example in a BIT.",
    si: "ලොකු අගයන් (10⁹ දක්වා) වෙනුවට, වෙනස් අගයන් අතර ඒවායේ පිළිවෙල අංකය (1, 2, 3...) දානවා. පිළිවෙල වෙනස් වෙන්නේ නෑ, හැබැයි දැන් ඒ අගයන් array index විදිහට (උදා: BIT එකක) පාවිච්චි කරන්න පුළුවන්.",
    exEn: "Values {500, 7, 10⁹, 7} → distinct sorted {7, 500, 10⁹} → ranks {2, 1, 3, 1}.",
    exSi: "අගයන් {500, 7, 10⁹, 7} → වෙනස් ඒවා sort කළාම {7, 500, 10⁹} → ranks {2, 1, 3, 1}."
  },
  {
    term: "Prefix sum", cat: "Technique", match: "prefix sums?|prefix minimum", cs: false,
    en: "P[i] = A[1] + ... + A[i]. Then the sum of any range [l, r] is P[r] − P[l − 1], computed in O(1).",
    si: "P[i] = A[1] + ... + A[i]. එතකොට ඕනෑම [l, r] කොටසක එකතුව P[r] − P[l − 1], O(1) වලින්.",
    exEn: "A = [3, 1, 4, 1]: P = [0, 3, 4, 8, 9]; sum of [2, 4] = 9 − 3 = 6.",
    exSi: "A = [3, 1, 4, 1]: P = [0, 3, 4, 8, 9]; [2, 4] එකතුව = 9 − 3 = 6."
  },
  {
    term: "Dyck path", cat: "Combinatorics", match: "Dyck path|Dyck", cs: false,
    en: "A walk of +1 (up) and −1 (down) steps that starts at height 0, stays above 0 in the middle and ends back at 0. In Q10 a vowel is +1 and a consonant is −1.",
    si: "+1 (උඩට) සහ −1 (පහළට) පියවර වලින් හැදෙන ගමනක්: උස 0 න් පටන් අරන්, මැද හැමතැනම 0 ට උඩින් ඉඳලා, අන්තිමට ආපහු 0 ට එනවා. Q10 එකේ ස්වරයක් +1, ව්‍යංජනයක් −1.",
    exEn: "\"aabb\": heights 0 → 1 → 2 → 1 → 0. It never touches 0 in the middle, so it is harmonious.",
    exSi: "\"aabb\": උස 0 → 1 → 2 → 1 → 0. මැද කවදාවත් 0 ට එන්නේ නෑ, ඉතින් ඒක harmonious."
  },
  {
    term: "Parity & invariant", cat: "Math", match: "parity|invariant", cs: false,
    en: "Parity = even or odd. An invariant is something that never changes, whatever legal moves you make. If the start and the goal have different invariants, the goal is impossible.",
    si: "Parity = ඉරට්ටේද ඔත්තේද කියන එක. Invariant එකක් කියන්නේ මොන නීතිමය පියවර කළත් වෙනස් නොවෙන දෙයක්. පටන් ගන්න තැනයි ඉලක්කයයි අතර invariant එක වෙනස් නම් ඉලක්කයට යන්න බෑ.",
    exEn: "Q8: rotating 3 items equals 2 swaps, so the parity of the number of inversions never changes.",
    exSi: "Q8: දේවල් 3ක් කරකවන එක swaps 2කට සමානයි, ඒ නිසා inversions ගණනේ parity එක කවදාවත් වෙනස් වෙන්නේ නෑ."
  },
  {
    term: "Amortized", cat: "Speed", match: "amortized|amortised", cs: false,
    en: "Some single steps may be slow, but the total over all operations is guaranteed small. The average cost per operation is what counts.",
    si: "සමහර තනි පියවර හෙමින් යන්න පුළුවන්, හැබැයි ඔක්කොම operations වල මුළු වැඩේ පොඩියි කියලා සහතිකයි. වැදගත් වෙන්නේ එක operation එකකට සාමාන්‍ය වියදම.",
    exEn: "Monotonic stack: one push may pop many items, but N pushes cause at most N pops in total → O(N).",
    exSi: "Monotonic stack: එක push එකකදී ගොඩක් pop වෙන්න පුළුවන්, හැබැයි push N ක් වලින් මුළු pops N කට වඩා නෑ → O(N)."
  },
  {
    term: "Monge property", cat: "DP optimisation", match: "Monge|quadrangle inequality", cs: false,
    en: "A cost C(j, i) is Monge if C(a, c) + C(b, d) ≤ C(a, d) + C(b, c) for a ≤ b ≤ c ≤ d. Then the best split point never moves left as i grows, which allows divide-and-conquer DP in O(K·N log N).",
    si: "a ≤ b ≤ c ≤ d සඳහා C(a, c) + C(b, d) ≤ C(a, d) + C(b, c) නම් C(j, i) වියදම Monge. එතකොට i වැඩි වෙනකොට හොඳම කපන තැන කවදාවත් වමට යන්නේ නෑ. ඒ නිසා divide-and-conquer DP එක O(K·N log N) වලින් කරන්න පුළුවන්.",
    exEn: "Q34: opt[k][i] ≤ opt[k][i + 1], so solving the middle i first limits where every other i can look.",
    exSi: "Q34: opt[k][i] ≤ opt[k][i + 1]. ඉතින් මැද i එක මුලින් විසඳුවාම අනිත් i වලට බලන්න ඕනේ ප්‍රදේශය සීමා වෙනවා."
  },
  {
    term: "Aho–Corasick", cat: "String", match: "Aho-Corasick|Aho–Corasick|failure links?", cs: false,
    en: "A trie of all the patterns plus \"failure links\" (where to jump when the next letter does not fit). It finds every pattern in a text in one pass, and its states can be used in DP or matrix power.",
    si: "ඔක්කොම patterns වල trie එකක් සහ \"failure links\" (ඊළඟ අකුර ගැළපෙන්නේ නැත්නම් පනින්න ඕනේ තැන). Text එකක හැම pattern එකක්ම එක පාරකින් හොයනවා. ඒකේ states DP එකකට හෝ matrix power එකකට පාවිච්චි කරන්න පුළුවන්.",
    exEn: "Q30: states that end a bad signature are forbidden; counting safe genomes of length L = walking L steps between safe states.",
    exSi: "Q30: නරක signature එකකින් ඉවර වෙන states තහනම්. දිග L වෙන ආරක්ෂිත genomes ගණන් කරනවා = ආරක්ෂිත states අතර පියවර L ක් යනවා."
  },
  {
    term: "Matrix exponentiation", cat: "Technique", match: "matrix exponentiation|matrix power|fast power|binary exponentiation", cs: false,
    en: "To apply the same step L times, put the step in a matrix M and compute M^L by repeated squaring: only about log L multiplications.",
    si: "එකම පියවර L පාරක් කරන්න, ඒ පියවර matrix M එකකට දාලා M^L වර්ග කර කර (repeated squaring) හොයනවා: ගුණ කිරීම් log L ගාණක් විතරයි.",
    exEn: "M^13 = M^8 · M^4 · M^1 → 3 squarings + 2 extra multiplications instead of 12.",
    exSi: "M^13 = M^8 · M^4 · M^1 → ගුණ කිරීම් 12 වෙනුවට වර්ග කිරීම් 3 යි තව ගුණ කිරීම් 2 යි."
  },
  {
    term: "Min-cost flow", cat: "Graph · Flow", match: "min-cost flow|minimum cost flow|network simplex", cs: false,
    en: "Send a required amount of flow through a network with capacities so that the total cost (sum of flow × cost per edge) is as small as possible. Network simplex is one fast way to solve it.",
    si: "Capacities තියෙන network එකක් හරහා අවශ්‍ය ප්‍රමාණයක් flow එකක් යවනවා, මුළු වියදම (හැම edge එකකම flow × වියදම එකතුව) අඩුම වෙන විදිහට. Network simplex කියන්නේ ඒක ඉක්මනට විසඳන එක ක්‍රමයක්.",
    exEn: "Q5: each query point is one unit of flow; generators accept at most C_i units; moving between adjacent generators costs their distance.",
    exSi: "Q5: හැම query point එකක්ම flow ඒකක එකක්. Generator එකකට ඒකක C_i කට වඩා ගන්න බෑ. යාබද generators අතර යන්න වියදම ඒවා අතර දුර."
  },
  {
    term: "Offline", cat: "Technique", match: "offline", cs: false,
    en: "Read all the queries first, then answer them in whatever order is easiest (for example sorted by R), and print the answers in the original order at the end.",
    si: "මුලින්ම ඔක්කොම queries කියවලා, ලේසිම පිළිවෙලකට (උදා: R අනුව sort කරලා) උත්තර හොයලා, අන්තිමට මුල් පිළිවෙලට print කරනවා.",
    exEn: "Q7: sort the queries by R, sweep r from 1 to N adding arrows that end at r, answer each query when r reaches its R.",
    exSi: "Q7: queries R අනුව sort කරලා, r = 1 සිට N දක්වා යනකොට r ගෙන් ඉවර වෙන ඊතල එකතු කරලා, r එක query එකේ R ට ආවාම උත්තරය දෙනවා."
  },
  {
    term: "Interactive / flush", cat: "Judge", match: "flush|interactive|two-phase", cs: false,
    en: "In a two-phase task the judge reads your first answer before sending more input. Output is kept in a buffer, so you must flush it (endl, fflush(stdout) or flush=True) or the judge waits forever.",
    si: "Phase දෙකක් තියෙන ප්‍රශ්නයක judge එක ඔයාගේ පළමු උත්තරය කියවලා තමයි ඊළඟ input එක එවන්නේ. Output එක buffer එකක තියෙන නිසා ඒක flush කරන්නම ඕනේ (endl, fflush(stdout) හෝ flush=True). නැත්නම් judge එක දිගටම බලාගෙන ඉන්නවා.",
    exEn: "Q1: print H with endl, then read the judge's 1 before doing Phase 2.",
    exSi: "Q1: H එක endl එක්ක print කරලා, Phase 2 පටන් ගන්න කලින් judge එකෙන් එන 1 කියවනවා."
  }
];
