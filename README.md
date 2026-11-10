# Buddhist Meditation Map

Two linked, interactive pages about Buddhism: one for its traditions, one for its meditation practices.

**Live site:** https://mobiledge.github.io/buddhist-meditation-map/

## The two pages

| Page | File | What it shows |
|---|---|---|
| [Buddhist Traditions & Schools](https://mobiledge.github.io/buddhist-meditation-map/) | `index.html` | A tree of 41 entries: the branches of Buddhism with their regional traditions, schools, monastic orders and teaching lineages. |
| [Buddhist Meditation Practices](https://mobiledge.github.io/buddhist-meditation-map/practices.html) | `practices.html` | 17 practices grouped into 6 approaches, each with its techniques, filterable by tradition, quality cultivated and method. |

The pages are separate because they are different classification systems: one sorts institutions by descent, the other sorts practices by what they do.

## How they connect

- Selecting an entry in the tree lists the meditation practices associated with it. Each one opens that practice on the practices page.
- Selecting a practice lists its traditions, and each one opens that entry in the tree.
- Filtering practices by a tradition also shows the practices shared with the wider tradition it belongs to.

Links between the pages use the URL hash: `index.html#gelug` selects a tree entry, `practices.html#p-koan` selects a practice, and `practices.html#t-chan` filters by a tradition.

## Classification

**Traditions.** Buddhism has two living branches, Theravāda and Mahāyāna. Vajrayāna is shown inside Mahāyāna, because it shares Mahāyāna's goal and philosophy and its own teachers class it that way, though it is often listed as a third branch. Every entry is labelled with its kind (branch, regional tradition, school, monastic order, lineage, movement), since the levels are not alike across branches.

**Practices.** Each practice belongs to one approach and carries three independent sets of tags.

| Set | Values |
|---|---|
| Approach | Calm meditation, Insight meditation, Calm and insight as one, Cultivating the heart, Recitation and recollection, Tantric practice |
| Tradition | Any entry in the traditions tree |
| Cultivates | Mindfulness (*sati*), Concentration (*samādhi*), Wisdom (*paññā*), Compassion (*karuṇā*), Devotion (*saddhā*) |
| Method | Focused attention, Open awareness, Reflection, Recitation, Visualization |

Both the tree and the practice grouping are simplifications, not official doctrine. Tradition tags show where a practice is most characteristic, and many practices are shared more widely.

## Files

- `data.js` holds all content: the traditions tree, the approaches, the practices and their techniques. Both pages compute their cross-references from it, so a change made here appears on both.
- `site.css` holds the shared styles.
- `index.html` and `practices.html` each hold their own layout and script.

There is no build step. Open `index.html` in a browser. The only outside dependency is two web fonts from Google Fonts, with system fonts as the fallback.
