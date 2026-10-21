# haxtreme-web

HaXtreme 5.0 interactive bilingual (English + සිංහල) defense guide and final solution files.

Open `index.html` (works straight from disk or on GitHub Pages).

## Files

| File | What it is |
|---|---|
| `index.html` | Page layout: question list, side-by-side workspace, glossary drawer, language switch (EN / සිං / both) |
| `styles.css` | Dark/light themes, syntax colours, split view, highlighted code lines |
| `app.js` | Syntax highlighter, click-a-step-to-jump-to-code, animations, glossary tooltips |
| `glossary.js` | Acronyms and hard words (EN + SI) with examples; `match` decides which words get underlined in the explanations |
| `data.js` | Original questions in EN + SI, step-to-line maps and animations |
| `content.js` | Generated from `HaXtreme_Defense_Guide.html` (the explanations and code) |
| `originals.js`, `img/` | Generated from `HaXtreme_5.0_All_40_Questions.pdf` (original text and diagrams) |
| `HaXtreme_Defense_Guide.html` | Source of the explanations; still works as a single-file page |
| `QUESTIONS_EXPLAINED.md` | Plain-language explanation of every question (English + Sinhala) |
| `solutions/` | The last version of each solution |

## Rebuilding the generated files

After editing `HaXtreme_Defense_Guide.html`:

```
python tools/build_content.py
```

To re-extract the PDF text and diagrams (needs `pip install pymupdf`):

```
python tools/build_originals.py ../HaXtreme_5.0_All_40_Questions.pdf
```

Steps without a hand-written line range in `data.js` (`stepLines`) are matched to code lines automatically by the names in their `<code>` snippets.

## Which version was kept

Where several versions existed, only the final one is here:

| Question | Kept | Left out |
|---|---|---|
| Q07 (The string / Equivalence States) | `Q07_the_string_modes.cpp` (MODE = 1) | `Q07_sam_grundy.cpp`, `_sumonly`, `_debug` |
| Q08 (Voronoi routing) | superseded by `Q14_diagrams_again.cpp` | `Q08_voronoi_routing.cpp`, `_costonly`, `_debug` |
| Q09 (Cooldown scheduling) | `Q09_cooldown_scheduling.py` (the one submitted) | `Q09_cooldown_scheduling.cpp` |

## Solutions added from "Update haxtreme web.txt"

These files are named by their HackerRank question number (`HR<number>_...`). The two Java files declare `public class Main`, so submit them as Main.java.

| Q | File |
|---|---|
| 11 | `HR11_phantom_currency_arbitrage.cpp` |
| 15 | `HR15_residual_ledger.cpp` |
| 16 | `HR16_parity_xor_cipher.java` |
| 17 | `HR17_paradox_bracket_engine.java` |
| 18 | `HR18_elliptic_curve_census.cpp` |
| 22 | `HR22_non_euclidean_parity_nim.cpp` |
| 23 | `HR23_redefined_metric_tree_diameter.cpp` |
| 25 | `HR25_lanterns_on_royal_roads.cpp` (labelled "23" in the txt, but it solves Lanterns on Royal Roads) |
| 26 | `HR26_convoys_through_the_storm.cpp` |
| 27 | `HR27_kings_poisoned_wine.cpp` |
| 28 | `HR28_chrono_knights_quantum_escape.cpp` |
| 30 | `HR30_viral_genome_mutation_predictor.cpp` |
| 31 | `HR31_tree_path_collision_frequency.cpp` |
| 33 | `HR33_2d_offline_range_point_query.cpp` |
| 34 | `HR34_divide_and_conquer_monge_partition.cpp` |
| 40 | `HR40_non_monotonic_range_balancer.cpp` |
