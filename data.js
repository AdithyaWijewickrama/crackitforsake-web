// The glossary lives in glossary.js.

// ============================================================================
// 2. QUESTION ENHANCEMENTS: ORIGINAL STATEMENTS (EN+SI), LINE LINKS & ANIMATIONS
// ============================================================================
window.QUESTION_ENHANCEMENTS = {
  q1: {
    origEn: `Given a sequence of N agents (1-indexed). Each agent i has a unique Energy Level Eᵢ, and two operational metrics Xᵢ and Yᵢ.
• The Jurisdiction of agent i is the maximal contiguous sub-segment [Lᵢ, Rᵢ] containing i where Eᵢ is strictly the maximum energy.
• Phase 1: Output H = Σ (i × Lᵢ × Rᵢ) mod (10⁹+7) and flush.
• Phase 2: If the judge outputs 1, count strictly dominated pairs (u, v) where Lᵤ ≤ v ≤ Rᵤ, v ≠ u, Xᵤ < Xᵥ, and Yᵤ < Yᵥ. Output the total modulo 10⁹+7.`,
    origSi: `Agents N දෙනෙක් පේළියකට ඉන්නවා (1 සිට අංක කරලා). හැම agent i කෙනෙක්ටම වෙනස් energy අගයක් Eᵢ, සහ Xᵢ, Yᵢ කියලා අංක දෙකක් තියෙනවා.
• Agent i ගේ Jurisdiction එක කියන්නේ i ඇතුළත් වෙන, i ගේ Eᵢ තමයි ලොකුම energy එක වෙන, දිගම අඛණ්ඩ කොටස [Lᵢ, Rᵢ].
• Phase 1: H = Σ (i × Lᵢ × Rᵢ) mod (10⁹+7) print කරලා flush කරන්න.
• Phase 2: Judge එක 1 එව්වොත්, Lᵤ ≤ v ≤ Rᵤ, v ≠ u, Xᵤ < Xᵥ සහ Yᵤ < Yᵥ වෙන (u, v) pairs ගණන හොයන්න. ඒ ගණන mod 10⁹+7 print කරන්න.`,
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
    animTitleSi: "Animation: Monotonic stack එකෙන් [Lᵢ, Rᵢ] හොයන හැටි සහ 3D dominance",
    animFrames: [
      {
        en: "Initial Array: 5 agents with Energies E = [10, 20, 15, 5, 25] and (X,Y) = [(5,5), (2,2), (6,6), (8,8), (1,1)].",
        si: "මුල් දත්ත: Agents 5 දෙනාගේ energy E = [10, 20, 15, 5, 25], (X, Y) = [(5,5), (2,2), (6,6), (8,8), (1,1)].",
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
        si: "Agent 2 (E=20, X=2, Y=2): වමට i=1 (10 < 20) දක්වාත්, දකුණට i=3, 4 (15, 5 < 20) දක්වාත් යනවා. i=5 (25 > 20) ළඟ නවතිනවා. Jurisdiction = [1, 4]. ඒක ඇතුළේ 1 (5,5), 3 (6,6), 4 (8,8) තුන්දෙනාටම X > 2, Y > 2 → pairs 3 යි!",
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
        si: "Agent 5 (E=25, X=1, Y=1): ලොකුම energy එක මෙයාගේ! Jurisdiction = [1, 5]. X₅ = 1, Y₅ = 1 නිසා 1, 2, 3, 4 හතරදෙනාටම X > 1, Y > 1 → pairs 4 යි. මුළු එකතුව = 0 + 3 + 1 + 0 + 4 = 8!",
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
    origSi: `Nodes N ක් සහ edges M ක් තියෙන, දිශාවක් නැති graph එකක් දීලා තියෙනවා (ඔක්කොම යා වෙලා තියෙන්න ඕනේ නෑ).
• Resilient Cluster: ඕනෑම එක node එකක් අයින් කළත් කැඩෙන්නේ නැති ලොකුම nodes කණ්ඩායම (Biconnected Component / block).
• Critical Node: අයින් කළාම graph එකේ කොටස් ගණන වැඩි වෙන node එකක් (Articulation point / cut vertex).
• Macro-Tree: Resilient Clusters සහ ඒවාට අයිති Critical Nodes යා කරලා හදන forest එක.
• Phase 1: H = (Nc × Na) mod (10⁹+7) print කරලා flush කරන්න.
• Phase 2: K කියවන්න. Macro-Tree එකේ ඒවා අතර path එකේ හරියටම Critical Nodes K ක් තියෙන හැම cluster pair එකකටම (u < v) Σ (|Sᵤ| × |Sᵥ|) mod (10⁹+7) හොයන්න.`,
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
    animTitleSi: "Animation: Block-cut Macro-Tree එක සහ D = 2K දුර",
    animFrames: [
      {
        en: "Consider 3 triangles sharing cut vertices 3 and 5: C1={1,2,3}, C2={3,4,5}, C3={5,6,7}. Removing node 3 or 5 splits the graph → Na = 2 Critical Nodes, Nc = 3 Clusters. Hash = 3 × 2 = 6.",
        si: "3 සහ 5 cut vertices වලින් යා වෙච්ච ත්‍රිකෝණ 3ක් ගමු: C1 = {1,2,3}, C2 = {3,4,5}, C3 = {5,6,7}. 3 හෝ 5 අයින් කළොත් graph එක කැඩෙනවා → Na = Critical Nodes 2, Nc = Clusters 3. Hash = 3 × 2 = 6.",
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
        si: "Macro-Tree (block-cut tree): [Cluster] — (Cut) — [Cluster] — (Cut) — [Cluster] කියලා මාරුවෙන් මාරුවට එනවා. Critical Nodes K = 2 ක් පහු කරනවා කියන්නේ tree එකේ D = 2K = 4 edges ක දුරක්! (C1, C3) අතර දුර 4 → |C1| × |C3| = 3 × 3 = 9.",
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
    origSi: `Relays N ක් තියෙන, cycle නැති network එකක් (tree එකක්) දීලා තියෙනවා. Root එක Core Relay 1.
• tier(u) = u ඉඳන් Relay 1 ට යන path එකේ තියෙන relays ගණන (Relay 1 ගේ tier එක 1).
• convergence(u, v) = 1 ට යන paths දෙකේම තියෙන, tier එක වැඩිම relay එක (ඒ කියන්නේ LCA(u, v)).
• Phase 1: H = Σ_{i=1..N-1} (tier(LCA(i, i+1)) × i) mod (10⁹+7) print කරලා flush කරන්න.
• Phase 2: Signal IDs S₁..Sₙ සහ queries Q ක් (uⱼ, vⱼ, Kⱼ) කියවන්න. හැම query එකකටම uⱼ සහ vⱼ අතර path එකේ හරියටම Kⱼ පාරක් එන වෙනස් signal IDs ගණන Aⱼ හොයන්න. Σ Aⱼ mod (10⁹+7) print කරන්න.`,
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
    origSi: `කුඩා අකුරු N ක string එකක් S දීලා තියෙනවා.
• Equivalence State එකක් කියන්නේ S එකේ හරියටම එකම තැන් වලින් ඉවර වෙන substrings කණ්ඩායමක් (SAM state එකක්).
• capacity(u) = state u එකේ දිගම substring එකේ දිග. Fallback(u) = වෙනස් state එකකට අයිති දිගම suffix එක තියෙන state එක (suffix link).
• Phase 1: base state එක නැතුව හැම state u එකකටම H = Σ (capacity(u) × capacity(fallback(u))) mod (10⁹+7) print කරන්න.
• Phase 2: State u එකක ඉඳන් එක පියවරක් කියන්නේ අගට අකුරක් එකතු කරන එක, අලුත් substring එකත් S එකේ තියෙන්න ඕනේ. Strategic Index SI(u) = යන්න පුළුවන් states වල SI අගයන්ගේ mex එක. Scenarios Q එකේ හැම එකකම S[Lᵢ..Rᵢ] උඩ tokens K ක් තියනවා; scenario එකේ score එක = tokens වල SI අගයන්ගේ XOR එක. Scores Q එකේ එකතුව mod (10⁹+7) print කරන්න.`,
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
    origSi: `Capacities Cᵢ සහ මූලික වියදම් Wᵢ තියෙන generator points M ක් Pᵢ(xᵢ, yᵢ) දීලා තියෙනවා.
• Rᵢ කලාපය කියන්නේ අනිත් හැම generator එකකටම වඩා Pᵢ ට ළඟින් තියෙන හැම point එකක්ම (Voronoi cell).
• Rᵤ සහ Rᵥ ට දිගක් තියෙන පොදු මායිමක් තියෙනවා නම් u සහ v adjacent.
• Phase 1: Adjacent pairs u < v හැම එකකටම H = Σ (u × v) mod (10⁹+7) print කරන්න.
• Phase 2: Query points N ක් (Xⱼ, Yⱼ) කියවන්න. හැම එකක්ම පටන් ගන්නේ ඒක තියෙන කලාපයේ generator එකෙන්. හැම generator i එකකම points Cᵢ කට වඩා නැති වෙන්න, adjacent generators අතර points ගෙනියන්න. u → v යන්න වියදම: uv කොටස y = 0 රේඛාව කපනවා නම් දුර D(u,v) × 2.0, නැත්නම් × 1.0, ඊට අමතරව අන්තිමට ඉන්න generator එකේ W. අඩුම මුළු වියදම දශමස්ථාන 2කට print කරන්න, බැරි නම් -1.00.`,
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
    origSi: `Neo-Colombo නගරයේ transit hubs N ක් (1 සිට N) තියෙනවා, දෙපැත්තටම යන්න පුළුවන් tracks M කින් යා කරලා (එක track එකකට විනාඩි 1යි).
• ඉරට්ටේ විනාඩියක (t = 0, 2, 4...): u → v යන්න පුළුවන් v > u නම් විතරයි.
• ඔත්තේ විනාඩියක (t = 1, 3, 5...): u → v යන්න පුළුවන් v < u නම් විතරයි.
• ඉන්න station එකේ විනාඩි 1ක් ඉන්න (wait) පුළුවන්, හැබැයි පිට පිට විනාඩි 2ක් ඉන්න කොහෙත්ම බෑ.
t = 0 දී station 1 ඉඳන් පටන් ගන්නවා. Station N ට යන්න අඩුම විනාඩි ගණන හොයන්න, යන්න බැරි නම් -1.`,
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
    animTitleSi: "මුල් PDF රූපය + පියවරෙන් පියවර animation: Desynchronized Parity Network",
    animFrames: [
      {
        en: "t = 0 (Even): Start at Hub 1. Even minute requires v > u. Notice the trap: going 1 → 2 arrives at t = 1 (Odd), where 2 → 4 is FORBIDDEN! Instead, take 1 → 3 (3 > 1).",
        si: "t = 0 (ඉරට්ටේ): Hub 1 න් පටන් ගන්නවා. ඉරට්ටේ විනාඩියේ v > u වෙන්න ඕනේ. උගුල බලන්න: 1 → 2 ගියොත් t = 1 (ඔත්තේ) වෙනවා, එතකොට 2 → 4 යන්න බෑ! ඒ නිසා 1 → 3 (3 > 1) යනවා.",
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
        si: "t = 1 (ඔත්තේ): දැන් Hub 3 ඉන්නේ. ඔත්තේ විනාඩියේ පහළට (v < u) යන්න ඕනේ. 3 → 2 (2 < 3) ගියාම t = 2 (ඉරට්ටේ) දී Hub 2. ඊට පස්සේ t = 2 දී 2 → 4 (4 > 2) ගිහින් විනාඩි 3 කින් Hub 4 ට යනවා!",
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
    origSi: `වෙනස් පූර්ණ සංඛ්‍යා N ක array එකක් A සහ සීමාවක් K දීලා තියෙනවා.
• Right Dominator R(i) = A[j] > A[i] වෙන, i ට දකුණෙන් තියෙන කුඩාම index එක j (නැත්නම් INF).
• Queries Q ක් [L, R] ට උත්තර දෙන්න: මේ කොන්දේසි තුනම හරි යන i ගණන ගණන් කරන්න:
  1) L ≤ i ≤ R,   2) L ≤ R(i) ≤ R,   3) R(i) − i ≤ K.`,
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
    animTitleSi: "මුල් PDF රූපය + animation: Horizon Dominance ඊතල (K = 3)",
    animFrames: [
      {
        en: "A = [4, 2, 3, 6, 1, 5], K = 3. Valid rays i → R(i) with Δ ≤ 3: 1→4 (Δ=3), 2→3 (Δ=1), 3→4 (Δ=1), 5→6 (Δ=1). For Query [1, 4], rays ending ≤ 4 with start ≥ 1 are 1→4, 2→3, 3→4 → Count = 3!",
        si: "A = [4, 2, 3, 6, 1, 5], K = 3. Δ ≤ 3 වෙන ඊතල i → R(i): 1→4 (Δ=3), 2→3 (Δ=1), 3→4 (Δ=1), 5→6 (Δ=1). Query [1, 4] ට, 1 න් පස්සේ පටන් අරන් 4 ට කලින් ඉවර වෙන ඊතල 1→4, 2→3, 3→4 → ගණන = 3!",
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
    origSi: `පූර්ණ සංඛ්‍යා N ක array එකක් A දීලා තියෙනවා. එක පියවරක්:
1. (A[i] + A[j] + A[k]) mod 2 == 0 වෙන (එකතුව ඉරට්ටේ වෙන) වෙනස් indices 3ක් i, j, k තෝරන්න.
2. ඒ තුන කරකවන්න: A[i] → A[j], A[j] → A[k], A[k] → A[i].
මේ පියවර වලින් A එක කුඩා සිට ලොකු පිළිවෙලට (non-decreasing) sort කරන්න පුළුවන්ද කියලා හොයන්න.`,
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
    origSi: `කාල පරාස [Lᵢ, Rᵢ] සහ ත්‍යාග Pᵢ තියෙන jobs N ක් දීලා තියෙනවා. එකිනෙක overlap නොවෙන (Lⱼ > Rᵢ) ඕනෑම jobs ටිකක් තෝරලා ශුද්ධ ලාභය උපරිම කරන්න:
මුළු ලාභය = Σ Pᵢ − Σ (Lⱼ − Rᵢ)², මෙතන i, j කියන්නේ පිට පිට තෝරපු jobs.
පළමු job එකට කලින් සහ අන්තිම job එකට පස්සේ තියෙන හිස් කාලයට දඩයක් නෑ.`,
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
    animTitleSi: "මුල් PDF රූප + animation: Thermal penalty curves සහ Li Chao envelope",
    animFrames: [
      {
        en: "Jobs: [1,4] P=20, [5,8] P=30, [9,12] P=25. Gap between Job 1 and Job 2 is (5-4)² = 1. Gap between Job 2 and Job 3 is (9-8)² = 1. Net Profit = 20 + 30 + 25 - 1 - 1 = 73!",
        si: "Jobs: [1,4] P=20, [5,8] P=30, [9,12] P=25. Job 1 සහ 2 අතර පරතරයේ දඩය (5−4)² = 1. Job 2 සහ 3 අතර (9−8)² = 1. ශුද්ධ ලාභය = 20 + 30 + 25 − 1 − 1 = 73!",
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
    origSi: `කුඩා ඉංග්‍රීසි අකුරු N ක string එකක් S දීලා තියෙනවා. හිස් නොවෙන S[l..r] කොටසක් Harmonious වෙන්නේ:
1. S[l..r] එකේ ස්වර (vowels) ගණනයි ව්‍යංජන (consonants) ගණනයි සමාන නම්, සහ
2. ඒකේ හැම මුල් කොටසකම (proper prefix S[l..k], l ≤ k < r) ව්‍යංජන වලට වඩා ස්වර වැඩි නම්.
Harmonious substrings ගණන හොයන්න.`,
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
    animTitleSi: "මුල් PDF රූපය + animation: 'aababb' එකේ Dyck-path prefix sum ගමන",
    animFrames: [
      {
        en: "For S = 'aababb', P = [0, 1, 2, 1, 2, 1, 0]. Vowel = +1, Consonant = -1. Starts l=1 ('aababb'), l=2 ('ab'), and l=4 ('ab') each start with a vowel and return to P[l-1] → 3 Harmonious substrings!",
        si: "S = 'aababb' ට P = [0, 1, 2, 1, 2, 1, 0]. ස්වරයක් = +1, ව්‍යංජනයක් = −1. l=1 ('aababb'), l=2 ('ab'), l=4 ('ab') තුනම ස්වරයකින් පටන් අරන් ආපහු P[l−1] උසට එනවා → Harmonious substrings 3 යි!",
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
    origSi: `Hubs N ක් සහ එක දිශාවකට විතරක් යන්න පුළුවන් conduits M ක් තියෙන trading network එකක් (හැම පියවරකටම coin 1යි).
• ඉරට්ටේ පියවරක (0, 2, 4...) u ඉඳන්: v > u වෙන්න ඕනේ.
• ඔත්තේ පියවරක (1, 3, 5...) u ඉඳන්: v < u වෙන්න ඕනේ.
Hub 1 න් පිටත් වෙලා ආපහු Hub 1 ට එන්න ඕනේ අඩුම පියවර ගණන (> 0) හොයන්න, බැරි නම් -1.`,
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
    origSi: `Server එකක jobs N ක් run කරන්න ඕනේ. Job i එක A[i] හෝ B[i] වෙලාවේ පටන් ගන්න පුළුවන්, ඒක D[i] කාලයක් යනවා, ඒ කියන්නේ [S[i], S[i]+D[i]) කාලය අල්ලගන්නවා.
Cooldown X ≥ 0 ට, හැම jobs දෙකක් අතරම අඩුම තරමේ හිස් කාලය X ක් තියෙන්න ඕනේ:
S[i] + D[i] + X ≤ S[j]   හෝ   S[j] + D[j] + X ≤ S[i].
පුළුවන් උපරිම පූර්ණ සංඛ්‍යා X හොයන්න. X = 0 ටවත් හරියන schedule එකක් නැත්නම් -1.`,
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
    origSi: `Binary artifacts n ක් x[1..n] ∈ {0, 1} තියාගන්න, x[0] = 0 කියන reference එකත් එක්ක (ඒකට වියදමක් නෑ). Artifact i ට c[i][0] සහ c[i][1] කියලා වියදම් දෙකක් තියෙනවා.
Operations q ක් කරන්න:
• ADD id u v b: x[u] XOR x[v] = b කියන සම්බන්ධය active කරන්න.
• DEL id: id සම්බන්ධය අයින් කරන්න.
• COST i a b: artifact i ගේ වියදම් (a, b) කියලා ස්ථිරවම වෙනස් කරන්න.
• ASK k u1 v1 b1 ... uk vk bk (0 ≤ k ≤ 3): සම්බන්ධ k ක් තාවකාලිකව එකතු කරලා, අඩුම මුළු දඩය M සහ හොඳම assignments ගණන W mod 10⁹+7 print කරන්න (ගැළපෙන්නේ නැත්නම් -1 0).`,
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
    origSi: `පූර්ණ සංඛ්‍යා N ක array එකක් A දීලා තියෙනවා (හැම එකක්ම < 2¹⁸). Operations Q ක් කරන්න:
• X l r x: l ≤ i ≤ r හැම i එකකටම A[i] = A[i] XOR x.
• S i x: A[i] = x.
• K l r p k: [l, r] ඇතුළේ, ප්‍රමාණයේ parity එක p වෙන (0 = ඉරට්ටේ, 1 = ඔත්තේ) හැම indices subset එකක්ම ගන්න. ඒවායේ වෙනස් XOR අගයන් කුඩා සිට ලොකු පිළිවෙලට දාලා k වෙනි කුඩාම එක print කරන්න (k ගාණක් නැත්නම් -1).`,
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
    origSi: `'(' සහ ')' වලින් හැදුණු දිග N වෙන bracket string එකක් S දීලා තියෙනවා. Operations Q ක් කරන්න:
• R l r: S[l..r] reverse කරන්න.
• F l r: S[l..r] එකේ හැම bracket එකක්ම පෙරළන්න ('(' ↔ ')').
• C l r k: S[l..r] දකුණට k පාරක් කරකවන්න (rotate).
• Q l r: S[l..r] හරි bracket sequence එකක් කරන්න පෙරළන්න ඕනේ අඩුම brackets ගණන print කරන්න (දිග ඔත්තේ නම් -1).`,
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
    origSi: `ඔත්තේ ප්‍රථමක සංඛ්‍යාවක් p සහ පූර්ණ සංඛ්‍යාවක් a දීලා තියෙනවා. Queries Q එකේ හැම එකකින්ම b එකක් දෙනවා, ඒකෙන් මේ elliptic curve එක හැදෙනවා:
y² ≡ x³ + a·x + b (mod p).
0 ≤ x, y < p වෙන, සමීකරණය හරියන හැම (x, y) pair එකක්ම ගණන් කරලා, අනන්තයේ point එකට 1 ක් එකතු කරන්න.`,
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
    origSi: `Alice සහ Bob ගොඩවල් N ක් A[1..N] උඩ Nim සෙල්ලම් කරනවා. තමන්ගේ වාරයේදී කෙනෙක් A[i] > 0 වෙන ගොඩක් තෝරලා, C(A[i], k) ඔත්තේ වෙන (C(A[i], k) ≡ 1 mod 2) k එකක් (1 ≤ k ≤ A[i]) අඩු කරනවා. අන්තිම පියවර ගහන කෙනා දිනනවා. දිනන්නේ කවුද කියලා හොයන්න.`,
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
    origSi: `ධන බර w(e) තියෙන edges සහිත, vertices N ක tree එකක් දීලා තියෙනවා. ඕනෑම සරල path P එකක Harmonic Latency එක:
H(P) = (P එකේ අඩුම w(e)) × |P|, මෙතන |P| කියන්නේ P එකේ edges ගණන.
හැම සරල path එකක් අතරින් උපරිම Harmonic Latency එක හොයන්න.`,
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
