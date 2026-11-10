# Buddhist Meditation Map

An interactive, single-page guide to 18 Buddhist meditation techniques.

**Live site:** https://mobiledge.github.io/buddhist-meditation-map/

Each technique is a tile showing its English name, its Pali term (or the term in its own language where no Pali name exists), a short description, and tags.

## How it works

- **Tags** come in three kinds: tradition or school, the quality the practice cultivates, and the method it uses. Click any tag to highlight the matching techniques and grey out the rest. One tag of each kind can be combined.
- **Tiles** are sorted from calm (*samatha*) to insight (*vipassanā*). A marker on each tile shows whether the practice is calm-led, insight-led, or works on both together.
- **Details** open when you click a tile: what the name means and which practices it leads to, builds on, or shares a method with.

## Classification

| Kind | Tags |
|---|---|
| Tradition | All branches, Theravada, Mahayana (Zen, Pure Land, Nichiren), Vajrayana |
| Cultivates | Calm, Insight, Compassion, Devotion, Purification |
| Method | Focused attention, Open awareness, Reflection, Recitation, Visualization |

The calm-to-insight positions and some tradition tags are simplified judgment calls, not official doctrine. Many practices are shared more widely than a few tags can show.

## Running it

Open `index.html` in a browser. There is no build step and no dependencies apart from two web fonts loaded from Google Fonts, with system fonts as the fallback.

All content and code live in `index.html`. The technique data is the `TRADS`, `OBJS`, `TYPES` and `TECHS` arrays at the top of the script.
