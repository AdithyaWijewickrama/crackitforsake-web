# HaXtreme 5.0: All Questions, Explained Simply (English + සිංහල)

Each question has:
- **Simple meaning**: what it really asks
- **Trick**: the main idea of the solution
- **Example**: the sample, worked by hand
- **සිංහලෙන්**: the same explanation in Sinhala (technical words kept in English)

| # | Question | Main idea | File |
|---|----------|-----------|------|
| P1 | Parity Network (even/odd minutes) | BFS with extra state | `Q01_parity_network.cpp` |
| P2 | Horizon Dominance (next greater + queries) | Stack + offline BIT | `Q02_horizon_dominance.cpp` |
| P3 | Cyclic 3-Element Shift | Parity of permutation | `Q03_cyclic_parity_shift.cpp` |
| P4 | Thermal Dissipation (jobs) | DP + Li Chao tree | `Q04_thermal_li_chao.cpp` |
| P5 | Harmonious Substrings | Prefix sum walk | `Q05_harmonious_substrings.cpp` |
| A | Agent Jurisdiction | Stack + CDQ | `Q01_agent_jurisdiction.cpp` |
| B | Resilient Clusters | Block-cut tree + centroid | `Q02_resilient_clusters.cpp` |
| C | Relay Tree | LCA + Mo on tree | `Q06_relay_tree_mo.cpp` |
| D | Equivalence States | Suffix automaton + Grundy | `Q07_sam_grundy.cpp` |

> A, B, C and D are numbered by guess. Rename the files to the real contest numbers.

---

## P1: Desynchronized Parity Network

### Simple meaning
- There are stations and roads. Each road takes 1 minute.
- **Even minute (0, 2, 4…)**: you can only go to a **bigger** station number.
- **Odd minute (1, 3, 5…)**: you can only go to a **smaller** station number.
- You may **wait** 1 minute, but **never twice in a row**.
- Start at station 1 at minute 0. What is the fastest time to reach station N? If you can't reach it, print -1.

### Trick
Knowing only "which station am I at" is not enough. You also need to know:
1. Is the time **even or odd** now?
2. Did I **just wait**?

So each "place" in the BFS is **(station, even/odd, waited?)**. Every action takes 1 minute, so a normal **BFS** gives the shortest time.

### Example
Roads: 1-3, 3-2, 2-4, 1-2. Goal: 4.
- t=0 (even): 1 → 3 (going up ✓)
- t=1 (odd): 3 → 2 (going down ✓)
- t=2 (even): 2 → 4 (going up ✓) → arrive at **t = 3**

Going straight 1 → 2 arrives at t=1 (odd). At an odd minute you can't go up to 4. ✗

### සිංහලෙන්
- Stations සහ roads තියෙනවා. එක road එකක් යන්න විනාඩි 1ක් යනවා.
- **ඉරට්ටේ විනාඩියක (0, 2, 4…)** යන්න පුළුවන් **ලොකු අංකයක් තියෙන** station එකකට විතරයි.
- **ඔත්තේ විනාඩියක (1, 3, 5…)** යන්න පුළුවන් **පොඩි අංකයක් තියෙන** station එකකට විතරයි.
- විනාඩි 1ක් **ඉන්න (wait)** පුළුවන්, හැබැයි **දෙපාරක් පිටිපස්සෙන් බෑ**.
- Station 1 ඉඳන් පටන් අරන් station N එකට යන්න අඩුම කාලය හොයන්න. යන්න බැරි නම් -1.

**උපක්‍රමය:** "මම ඉන්නේ කොහෙද" කියන එක විතරක් මදි. "වෙලාව ඉරට්ටේද/ඔත්තේද" සහ "දැන් wait කළාද" කියන දෙකත් state එකට දාන්න ඕනේ. ඒ state එක **(station, ඉරට්ටේ/ඔත්තේ, wait කළාද)**. හැම action එකකටම විනාඩි 1ක් යන නිසා සාමාන්‍ය **BFS** එකකින් අඩුම කාලය හම්බෙනවා.

---

## P2: Horizon Dominance Ray Projection

### Simple meaning
- For every index i, find **R(i)**: the **first index to the right** that has a **bigger value**.
- For each query [L, R], count the indices i where:
  - both i and R(i) are inside [L, R], and
  - the distance R(i) − i is **at most K**.

### Trick
1. Find R(i) for every i with a **monotonic stack**. This is the "next greater element" problem.
2. The "distance ≤ K" rule doesn't depend on the query, so **remove the bad i's first**.
3. Since i < R(i) always, the conditions shrink to just **i ≥ L and R(i) ≤ R**.
4. Sort the queries by R. Walk from left to right and add each i into a **Fenwick tree (BIT)** when we reach R(i). Each answer is a count from the BIT.

### Example
A = 4 2 3 6 1 5, K = 3 → arrows 1→4, 2→3, 3→4, 5→6.
- [1,4]: 1→4, 2→3, 3→4 → **3**
- [2,5]: 2→3, 3→4 → **2**
- [1,6]: all 4 → **4**

### සිංහලෙන්
- හැම index i එකටම **R(i)** හොයන්න: i ට **දකුණු පැත්තේ, i ට වඩා ලොකු value එකක් තියෙන පළමු index එක**.
- හැම query [L, R] එකකටම ගණන් කරන්න: i සහ R(i) දෙකම [L, R] ඇතුළේ තියෙන, R(i) − i ≤ K වෙන i කීයක් තියෙනවද කියලා.

**උපක්‍රමය:**
1. **Monotonic stack** එකකින් හැම i එකකටම R(i) හොයනවා.
2. "දුර ≤ K" කියන කොන්දේසිය query එක මත රඳා පවතින්නේ නෑ. ඒ නිසා කලින්ම අයින් කරනවා.
3. i < R(i) නිසා කොන්දේසි **i ≥ L සහ R(i) ≤ R** කියන දෙකට අඩු වෙනවා.
4. Queries ටික R අනුව sort කරලා, වමේ ඉඳන් දකුණට යනකොට **BIT (Fenwick tree)** එකට දාලා ගණන් කරනවා.

---

## P3: Cyclic 3-Element Shift & Parity Barrier

### Simple meaning
- You can pick **3 positions** whose numbers add up to an **even** sum, and **rotate** them (a→b→c→a).
- Can you **sort** the array this way? Answer YES or NO.

### Trick
- An even sum only happens with **E+E+E** or **E+O+O** (E = even, O = odd). So every move needs **at least one even number**.
- A rotation of 3 is an "even permutation", so it can **never change the parity** of the arrangement.
- Rules:
  - Already sorted → **YES**
  - No even numbers → no move is possible → **NO**
  - 2 or more odd numbers → **YES** if some number repeats, or if the sorting permutation is even
  - Exactly 1 odd number → that odd number **can never move**. It must already be in the right place, and the evens must pass the same parity test.

### Example
- `3 1 2 4` → needs one 3-rotation (even) → **YES**
- `2 4 6 8` → already sorted → **YES**

> ⚠️ The sample says NO for `1 3 5`, which is already sorted. If Run Code shows NO as expected, set `ALL_ODD_ALWAYS_NO = true`.

### සිංහලෙන්
- **එකතුව ඉරට්ටේ (even)** වෙන position 3ක් තෝරලා ඒවා **කරකවන්න (rotate)** පුළුවන්.
- මේ විදියට array එක **sort** කරන්න පුළුවන්ද? YES / NO.

**උපක්‍රමය:**
- එකතුව ඉරට්ටේ වෙන්නේ **ඉරට්ටේ+ඉරට්ටේ+ඉරට්ටේ** නැත්නම් **ඉරට්ටේ+ඔත්තේ+ඔත්තේ** විතරයි. ඒ නිසා හැම move එකකටම **අඩුම තරමේ එක ඉරට්ටේ අංකයක්** ඕනේ.
- 3ක් කරකවන එකෙන් permutation එකේ **parity (ඉරට්ටේ/ඔත්තේ බව) වෙනස් වෙන්නේ නෑ**.
- නීති:
  - දැනටමත් sort වෙලා නම් → **YES**
  - ඉරට්ටේ අංක එකක්වත් නැත්නම් → **NO**
  - ඔත්තේ අංක 2ක් හෝ වැඩි නම් → අංකයක් දෙපාරක් තියෙනවා නම්, හෝ permutation එක ඉරට්ටේ නම් → **YES**
  - ඔත්තේ අංක 1ක් විතරක් නම් → ඒක **කවදාවත් හෙලවෙන්නේ නෑ**. ඒක දැනටමත් හරි තැන තියෙන්න ඕනේ.

---

## P4: Thermal Dissipation & Li Chao Tree

### Simple meaning
- There are jobs. Each job has a start L, an end R and a reward P.
- Pick jobs that **don't overlap**: the next one must start **after** the previous one ends.
- Between two jobs there is a penalty of **(gap)²** = (L_next − R_prev)².
- Find the **maximum profit**. Choosing nothing gives 0.

### Trick
- DP: `dp[j]` = best profit if the last chosen job is j.
- `dp[j] = P_j + max(0, dp[i] − (L_j − R_i)²)` over jobs i that end before j starts.
- Expand the square: `dp[i] − (L_j − R_i)² = (2R_i)·L_j + (dp[i] − R_i²) − L_j²`
  → each old job i is a **straight line**. We need the **highest line** at x = L_j.
- A **Li Chao tree** stores the lines and finds the highest one fast: O(log N).

### Example
Jobs [1,4]=20, [5,8]=30, [9,12]=25.
- dp1 = 20
- dp2 = 30 + 20 − 1² = 49
- dp3 = 25 + 49 − 1² = **73**

### සිංහලෙන්
- Jobs ටිකක් තියෙනවා. හැම job එකකටම පටන් ගන්න වෙලාව L, ඉවර වෙන වෙලාව R, ලාභය P.
- **එකිනෙකට හැප්පෙන්නේ නැති (overlap නොවන)** jobs තෝරන්න.
- Jobs දෙකක් අතර තියෙන හිස් කාලයට **(හිස් කාලය)²** දඩයක් (penalty) තියෙනවා.
- **උපරිම ලාභය** හොයන්න.

**උපක්‍රමය:**
- `dp[j]` = අන්තිමට කරන job එක j නම් ලැබෙන හොඳම ලාභය.
- Square එක expand කළාම, හැම පරණ job එකක්ම **සරල රේඛාවක් (line)** බවට පත් වෙනවා. x = L_j තැනදී **උසම line එක** ඕනේ.
- **Li Chao tree** එකෙන් ඒක ඉක්මනට (O(log N)) හොයාගන්න පුළුවන්.

---

## P5: Harmonious Substrings

### Simple meaning
- Count the substrings where:
  1. **vowels = consonants** in total, and
  2. in **every shorter beginning part** (prefix), **vowels > consonants**.

### Trick
- Vowel = **+1**, consonant = **−1**. Draw it as a "mountain path".
- A harmonious substring **goes up, stays above the start level, and comes back down to the start level for the first time**.
- So each starting point gives **at most 1** answer.
- It counts if the starting letter is a **vowel** and the path later comes **down to the start level** (check with the minimum value from that point to the end).
- One pass, O(N).

### Example
- `ab` → `ab` is harmonious → **1**
- `aababb` → `aababb`, `ab` (positions 2–3), `ab` (positions 4–5) → **3**

### සිංහලෙන්
- මේ කොන්දේසි දෙකම තියෙන substrings ගණන් කරන්න:
  1. **Vowels ගණන = consonants ගණන**
  2. **හැම පොඩි මුල් කොටසකම (prefix) vowels > consonants**

**උපක්‍රමය:**
- Vowel එකකට **+1**, consonant එකකට **−1** කියලා **කන්දක් වගේ path එකක්** අඳිනවා.
- Harmonious substring එකක් කියන්නේ **උඩට ගිහින්, පටන් ගත්ත මට්ටමට උඩින්ම තියලා, ආයෙත් පටන් ගත්ත මට්ටමට පළමු පාරට බහින** එකක්.
- ඒ නිසා හැම පටන් ගන්න තැනකටම තියෙන්නේ **උපරිම උත්තර 1යි**.
- Loop එකක් විතරයි: O(N).

---

## A: Agent Jurisdiction (two-phase)

### Simple meaning
- **Phase 1:** For each agent, find the **widest range [L, R]** around it where it has the **biggest energy**. Print the hash Σ(i × L × R).
- **Phase 2:** Count the pairs (u, v) where v is inside u's range **and** v has **both X and Y bigger** than u.

### Trick
- Phase 1: a **monotonic stack** finds the nearest bigger value on the left and on the right. O(N).
- Phase 2: count = (points up to R) − (points up to L−1). Each part is a 3D count (index, X, Y), done with **CDQ divide & conquer + BIT**. O(N log² N).

### Example
Ranges [1,1] [1,4] [3,4] [4,4] [1,5] → hash **134**. Pairs = 3 + 1 + 4 = **8**.

### සිංහලෙන්
- **Phase 1:** හැම agent කෙනෙක්ටම, එයාගේ energy එක **ලොකුම** වෙන **පළලම පරාසය [L, R]** හොයන්න. Hash එක print කරන්න.
- **Phase 2:** v, u ගේ පරාසය ඇතුළේ තියෙන, සහ v ගේ **X සහ Y දෙකම u ට වඩා ලොකු** වෙන (u, v) pairs ගණන් කරන්න.

**උපක්‍රමය:** Phase 1 = **monotonic stack**. Phase 2 = පරාසය prefix දෙකකට කඩලා **CDQ + BIT** වලින් ගණන් කරනවා.

---

## B: Resilient Clusters (two-phase)

### Simple meaning
- "Resilient Cluster" = a **biconnected component**: a group where removing any 1 node doesn't break it apart.
- "Critical Node" = an **articulation point**: removing it breaks the graph into more pieces.
- **Phase 1:** hash = (number of clusters) × (number of critical nodes).
- **Phase 2:** Build the **block-cut tree**. Add up |Su| × |Sv| for cluster pairs with **exactly K critical nodes** between them.

### Trick
- **Tarjan's algorithm** (tin and low values) finds both clusters and critical nodes.
- In the tree, clusters and critical nodes alternate, so (number of critical nodes on the path) = distance ÷ 2. We need pairs at **distance 2K**.
- **Centroid decomposition** counts the pairs at an exact distance.

### Example
Two separate triangles → 2 clusters, 0 critical nodes → hash **0**, answer **0**.

### සිංහලෙන්
- "Resilient Cluster" = **biconnected component**: ඕනම node 1ක් අයින් කළත් කැඩෙන්නේ නැති කණ්ඩායමක්.
- "Critical Node" = **articulation point**: ඒක අයින් කළොත් graph එක කෑලි කිහිපයකට කැඩෙනවා.
- **Phase 1:** hash = clusters ගණන × critical nodes ගණන.
- **Phase 2:** අතර **හරියටම K critical nodes** තියෙන cluster pairs වල |Su| × |Sv| එකතුව.

**උපක්‍රමය:** **Tarjan** algorithm එකෙන් clusters සහ critical nodes හොයනවා. Block-cut tree එකේ දුර = 2K වෙන pairs **centroid decomposition** එකෙන් ගණන් කරනවා.

---

## C: Relay Tree (two-phase)

### Simple meaning
- It's a tree with root 1. "Tier" = depth + 1. "Convergence relay" of two nodes = their **LCA** (lowest common ancestor).
- **Phase 1:** hash = Σ tier(LCA(i, i+1)) × i.
- **Phase 2:** For each query (u, v, K), count the **distinct signals that appear exactly K times** on the path u→v. Print the total.

### Trick
- LCA with **binary lifting**.
- Path queries with **Mo's algorithm on a tree**: an Euler tour turns each path into a range.
- Keep `cnt[signal]` and `freq[count]`. The answer is `freq[K]`.

### Example
Star tree → hash = 1+2+3 = **6**. Path 2-1-3 has signals 1, 999, 1 → only 999 appears once → **1**.

### සිංහලෙන්
- Root එක 1 වෙන tree එකක්. Node දෙකක "convergence relay" = ඒ දෙකේ **LCA** එක (පොදු මුතුන්මිත්තා).
- **Phase 1:** hash = Σ tier(LCA(i, i+1)) × i.
- **Phase 2:** u→v path එකේ **හරියටම K පාරක් එන වෙනස් signals** කීයක් තියෙනවද කියලා ගණන් කරන්න.

**උපක්‍රමය:** LCA = **binary lifting**. Path queries = **Mo's algorithm on tree**. `freq[K]` තමයි උත්තරය.

---

## D: Equivalence States (two-phase)

### Simple meaning
- "Equivalence State" = a state of the **suffix automaton (SAM)**.
- Capacity = `len`, and Fallback = the `suffix link`.
- **Phase 1:** hash = Σ len(u) × len(link(u)).
- **Phase 2:** It's a game. A move = **add one letter** so the result is still a substring. The SI is the **Grundy number** (mex). Each scenario's score = the XOR of its tokens' SIs.

### Trick
- Build the SAM. Every move goes to a longer state, so process states from **longest to shortest** and compute the mex.
- To find the state of S[L..R], start from the prefix state of R and climb the **suffix links** (binary lifting) until the length still just fits R−L+1.

### Example
`aaaaab`, token on "aaaaa" → the only move is +b → "aaaaab" (no moves, SI 0) → SI = mex{0} = **1**. Hash = **40**.

### සිංහලෙන්
- "Equivalence State" = **suffix automaton (SAM)** එකේ state එකක්.
- **Phase 1:** hash = Σ len(u) × len(link(u)).
- **Phase 2:** මේක ක්‍රීඩාවක් (game). Move එකක් = substring එකක් විදියටම තියෙන්න **අකුරක් එකතු කරන එක**. SI = **Grundy number (mex)**. Score = tokens වල SI ගේ XOR එක.

**උපක්‍රමය:** SAM එක හදලා, **දිගම state එකේ ඉඳන් කෙටිම state එකට** mex ගණනය කරනවා. S[L..R] තියෙන state එක **suffix links** දිගේ උඩට නැගලා හොයනවා.

---

## Common two-phase tips / පොදු උපදෙස්
- If the expected output shows `HASH 134` instead of `134`, change `cout << H` to `cout << "HASH " << H`.
- Expected output එකේ `HASH` කියන වචනය තියෙනවා නම්, code එකේ hash print කරන line එකට `"HASH "` එකතු කරන්න.
- Always click **Run Code** with the sample before you **Submit**. Submit කරන්න කලින් හැමවිටම sample එකෙන් **Run Code** කරලා බලන්න.
