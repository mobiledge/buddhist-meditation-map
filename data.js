/* Shared content for both pages.
   TRADITIONS is the tree shown on index.html (brief: the line inside each node; wiki: its Wikipedia article;
   desc: the longer text used on the practices page). PRACTICES, grouped by APPROACHES, is the map on practices.html.
   The two are linked only through tradition ids: each practice (and some techniques) names the tree nodes
   it is associated with, and both pages compute their cross-references from that. */
window.BMM = (function () {
  "use strict";

  // ---------- Traditions and schools (a tree: each node names its parent) ----------
  var TRADITIONS = [
    { id: "buddhism", parent: null, wiki: "https://en.wikipedia.org/wiki/Buddhism",
      brief: "The teaching of the Buddha, founded in India about the 5th century BCE.",
      name: "Buddhism", kind: "Root", term: "Buddha-sāsana", lang: "Pali",
      gloss: "The Buddha's dispensation.",
      region: "Founded in northern India, about the 5th century BCE",
      desc: "The teaching of Siddhattha Gotama, the Buddha. Two branches survive today: Theravāda and Mahāyāna. Vajrayāna, often counted as a third, is the tantric form of Mahāyāna and is shown inside it here." },

    // ----- Theravāda -----
    { id: "theravada", parent: "buddhism", wiki: "https://en.wikipedia.org/wiki/Theravada",
      brief: "The oldest surviving branch, based on the Pali Canon.",
      name: "Theravāda", kind: "Branch", term: "Theravāda", lang: "Pali",
      gloss: "Teaching of the elders.",
      region: "Sri Lanka, Myanmar, Thailand, Cambodia, Laos",
      desc: "The only survivor of the early, pre-Mahāyāna schools. Its scriptures are the Pali Canon and its ideal is the arahant, who has ended suffering. Its subdivisions are monastic orders (nikāyas) that differ in ordination lineage and discipline, not in doctrine." },

    { id: "thera-lanka", parent: "theravada", wiki: "https://en.wikipedia.org/wiki/Buddhism_in_Sri_Lanka",
      brief: "Home of the lineage from which all modern Theravāda descends.",
      name: "Sri Lankan Theravāda", kind: "Regional tradition",
      region: "Sri Lanka",
      desc: "Home of the Mahāvihāra tradition, from which all modern Theravāda descends. The Pali Canon was first written down here in the 1st century BCE." },
    { id: "siam-nikaya", parent: "thera-lanka", wiki: "https://en.wikipedia.org/wiki/Siam_Nikaya",
      brief: "The largest order, founded in 1753 with ordination from Thailand.",
      name: "Siam Nikāya", kind: "Monastic order",
      region: "Founded 1753",
      desc: "The largest Sri Lankan order, founded when the ordination lineage was restored from Thailand (Siam)." },
    { id: "amarapura-ramanna", parent: "thera-lanka", wiki: "https://en.wikipedia.org/wiki/Amarapura%E2%80%93R%C4%81ma%C3%B1%C3%B1a_Nik%C4%81ya",
      brief: "Two orders of Burmese lineage, united in 2019.",
      name: "Amarapura–Rāmañña Nikāya", kind: "Monastic order",
      region: "Founded 1800 and 1864, united 2019",
      desc: "Two orders founded with ordination lineages from Burma, which merged into one in 2019." },

    { id: "thera-myanmar", parent: "theravada", wiki: "https://en.wikipedia.org/wiki/Buddhism_in_Myanmar",
      brief: "Known for Abhidhamma study and the revival of insight meditation.",
      name: "Burmese Theravāda", kind: "Regional tradition",
      region: "Myanmar",
      desc: "Known for its study of the Abhidhamma and for the modern revival of insight meditation." },
    { id: "thudhamma", parent: "thera-myanmar", wiki: "https://en.wikipedia.org/wiki/Thudhamma_Gaing",
      brief: "The largest Burmese order, home to most monks.",
      name: "Thudhamma Nikāya", kind: "Monastic order",
      region: "18th century",
      desc: "The largest Burmese order, to which the great majority of monks belong." },
    { id: "shwegyin", parent: "thera-myanmar", wiki: "https://en.wikipedia.org/wiki/Shwegyin_Nikaya",
      brief: "A 19th-century reform order with stricter discipline.",
      name: "Shwegyin Nikāya", kind: "Monastic order",
      region: "Founded mid-19th century",
      desc: "A reform order known for stricter observance of the monastic discipline." },
    { id: "vipassana-movement", parent: "thera-myanmar", wiki: "https://en.wikipedia.org/wiki/Vipassana_movement",
      brief: "A modern revival that opened insight meditation to lay people.",
      name: "Vipassanā movement", kind: "Movement",
      term: "vipassanā", lang: "Pali", gloss: "Clear seeing, insight.",
      region: "From the late 19th century, now worldwide",
      desc: "A revival that opened insight meditation to lay people. It is a set of teaching lineages inside the existing orders, not a separate order." },
    { id: "mahasi", parent: "vipassana-movement", wiki: "https://en.wikipedia.org/wiki/Mahasi_Sayadaw",
      brief: "Insight through continuous mental noting.",
      name: "Mahāsi lineage", kind: "Lineage",
      region: "Mahāsi Sayadaw, 1904–1982",
      desc: "Teaches insight through continuous mental noting, starting with the rise and fall of the abdomen." },
    { id: "ubakhin", parent: "vipassana-movement", wiki: "https://en.wikipedia.org/wiki/Sayagyi_U_Ba_Khin",
      brief: "Insight through body scanning, spread worldwide by S. N. Goenka.",
      name: "Ledi–U Ba Khin lineage", kind: "Lineage",
      region: "Ledi Sayadaw, U Ba Khin, S. N. Goenka",
      desc: "Teaches insight by sweeping attention through bodily sensations. S. N. Goenka spread it worldwide through ten-day courses." },
    { id: "paauk", parent: "vipassana-movement", wiki: "https://en.wikipedia.org/wiki/Bhaddanta_%C4%80ci%E1%B9%87%E1%B9%87a",
      brief: "Deep absorption first, then insight, following the Visuddhimagga.",
      name: "Pa-Auk lineage", kind: "Lineage",
      region: "Pa-Auk Sayadaw, b. 1934",
      desc: "Follows the Visuddhimagga closely: deep absorption (jhāna) is developed first, and insight practice follows." },

    { id: "thera-thai", parent: "theravada", wiki: "https://en.wikipedia.org/wiki/Buddhism_in_Thailand",
      brief: "Three countries that share the same two monastic orders.",
      name: "Thai, Lao and Cambodian Theravāda", kind: "Regional tradition",
      region: "Thailand, Laos, Cambodia",
      desc: "Three countries that share the same two monastic orders." },
    { id: "maha-nikaya", parent: "thera-thai", wiki: "https://en.wikipedia.org/wiki/Maha_Nikaya",
      brief: "The older and far larger order of the region.",
      name: "Mahā Nikāya", kind: "Monastic order",
      term: "Mahā Nikāya", lang: "Pali", gloss: "Great order.",
      desc: "The older and far larger order, to which most monks in the region belong." },
    { id: "dhammayut", parent: "thera-thai", wiki: "https://en.wikipedia.org/wiki/Dhammayuttika_Nikaya",
      brief: "A stricter reform order founded in 1833 by the future King Rama IV.",
      name: "Dhammayuttika Nikāya", kind: "Monastic order",
      region: "Founded 1833",
      desc: "A reform order founded by Prince Mongkut, later King Rama IV, to return to stricter discipline and the Pali texts." },
    { id: "thai-forest", parent: "thera-thai", wiki: "https://en.wikipedia.org/wiki/Thai_Forest_Tradition",
      brief: "Wilderness-dwelling meditation monks in the line of Ajahn Mun.",
      name: "Thai Forest Tradition", kind: "Lineage",
      term: "kammaṭṭhāna", lang: "Pali", gloss: "Place of work, meaning a meditation subject.",
      region: "Ajahn Sao and Ajahn Mun, early 20th century",
      desc: "A meditation lineage of monks living simply in the wilderness under strict discipline. Its teachers, among them Ajahn Chah, belong to both Thai orders." },

    // ----- Mahāyāna -----
    { id: "mahayana", parent: "buddhism", wiki: "https://en.wikipedia.org/wiki/Mahayana",
      brief: "The great vehicle: the bodhisattva path to awakening for all beings.",
      name: "Mahāyāna", kind: "Branch", term: "Mahāyāna", lang: "Sanskrit",
      gloss: "Great vehicle.",
      region: "East Asia, Vietnam, Tibet and the Himalaya, Mongolia",
      desc: "Arose in India around the 1st century BCE. Its ideal is the bodhisattva, who seeks awakening for the sake of all beings, and it teaches that all things are empty of fixed nature. Its two philosophical schools, Madhyamaka and Yogācāra, underlie every school below." },

    { id: "east-asian", parent: "mahayana", wiki: "https://en.wikipedia.org/wiki/East_Asian_Buddhism",
      brief: "Buddhism of China, Korea, Japan and Vietnam, based on the Chinese canon.",
      name: "East Asian Mahāyāna", kind: "Regional tradition",
      region: "China, Korea, Japan, Vietnam",
      desc: "Buddhism based on the Chinese canon. In China the schools are styles of teaching and practice that monks freely combine. In Japan they became separate institutions." },

    { id: "chan", parent: "east-asian", wiki: "https://en.wikipedia.org/wiki/Zen",
      brief: "The meditation school: awakening by seeing one's own nature.",
      name: "Chan / Zen", kind: "School",
      term: "Ch. Chán, Jp. Zen, Kr. Seon, Vi. Thiền", lang: "",
      gloss: "All four names render Sanskrit dhyāna (Pali jhāna), meditation.",
      region: "China, from the 6th century",
      desc: "The meditation school, traced to the Indian monk Bodhidharma. It teaches awakening by seeing one's own nature directly, and passes authority from teacher to student." },
    { id: "linji", parent: "chan", wiki: "https://en.wikipedia.org/wiki/Linji_school",
      brief: "The lineage known for kōan practice.",
      name: "Linji / Rinzai", kind: "Lineage",
      term: "Ch. Línjì, Jp. Rinzai", lang: "",
      region: "Linji Yixuan, d. 866; brought to Japan by Eisai, 1191",
      desc: "Known for kōan practice. In Japan the kōan curriculum was systematised by Hakuin in the 18th century." },
    { id: "caodong", parent: "chan", wiki: "https://en.wikipedia.org/wiki/Caodong_school",
      brief: "The lineage known for silent, objectless sitting.",
      name: "Caodong / Sōtō", kind: "Lineage",
      term: "Ch. Cáodòng, Jp. Sōtō", lang: "",
      region: "Dongshan Liangjie, 9th century; brought to Japan by Dōgen, 1227",
      desc: "Known for objectless sitting, called silent illumination in China and just sitting in Japan. Sōtō is the largest Zen school in Japan." },
    { id: "seon", parent: "chan", wiki: "https://en.wikipedia.org/wiki/Korean_Seon",
      brief: "Korean Zen of Linji descent, led today by the Jogye Order.",
      name: "Korean Seon", kind: "National tradition",
      region: "Korea, from the 9th century",
      desc: "Of Linji descent. Shaped by Jinul (1158–1210), it combines sudden awakening with gradual cultivation. Its main body today is the Jogye Order." },
    { id: "thien", parent: "chan", wiki: "https://en.wikipedia.org/wiki/Thi%E1%BB%81n",
      brief: "Vietnamese Zen, often combined with Pure Land recitation.",
      name: "Vietnamese Thiền", kind: "National tradition",
      region: "Vietnam",
      desc: "Mostly of Linji descent, and commonly practised together with Pure Land recitation. It includes the Trúc Lâm school (13th century) and Thích Nhất Hạnh's Plum Village." },

    { id: "pureland", parent: "east-asian", wiki: "https://en.wikipedia.org/wiki/Pure_Land_Buddhism",
      brief: "Devotion to Amitābha Buddha and rebirth in his Pure Land.",
      name: "Pure Land", kind: "School",
      term: "Ch. Jìngtǔ, Jp. Jōdo", lang: "",
      gloss: "Pure Land, the buddha-field of Amitābha, called Sukhāvatī in Sanskrit.",
      region: "China, from the 5th century",
      desc: "Devotion to Amitābha Buddha, with the aim of rebirth in his Pure Land. In China it is a practice shared across schools. In Japan it became independent schools." },
    { id: "jodo-shu", parent: "pureland", wiki: "https://en.wikipedia.org/wiki/J%C5%8Ddo-sh%C5%AB",
      brief: "Hōnen's school: reciting Amitābha's name as the one practice.",
      name: "Jōdo-shū", kind: "School",
      region: "Japan; Hōnen, 1175",
      desc: "Teaches reciting Amitābha's name as the one practice needed." },
    { id: "jodo-shinshu", parent: "pureland", wiki: "https://en.wikipedia.org/wiki/J%C5%8Ddo_Shinsh%C5%AB",
      brief: "Shinran's school of complete trust, the largest in Japan.",
      name: "Jōdo Shinshū", kind: "School",
      region: "Japan; Shinran, 13th century",
      desc: "Teaches complete trust in Amitābha's vow, with recitation as an expression of gratitude. It is the largest Buddhist school in Japan." },

    { id: "tiantai", parent: "east-asian", wiki: "https://en.wikipedia.org/wiki/Tiantai",
      brief: "The Lotus Sutra school that systematised calm and insight.",
      name: "Tiantai / Tendai", kind: "School",
      term: "Ch. Tiāntāi, Jp. Tendai", lang: "",
      region: "China; Zhiyi, 538–597. Japan; Saichō, 806",
      desc: "Based on the Lotus Sutra. Zhiyi wrote East Asia's standard manuals of calm and insight. In Japan, Tendai added esoteric practice, and the founders of Japanese Pure Land, Zen and Nichiren Buddhism all trained in it." },
    { id: "huayan", parent: "east-asian", wiki: "https://en.wikipedia.org/wiki/Huayan",
      brief: "The Avataṃsaka Sutra school: all things contain one another.",
      name: "Huayan / Kegon", kind: "School",
      term: "Ch. Huáyán, Jp. Kegon", lang: "",
      region: "China, 7th century",
      desc: "Based on the Avataṃsaka Sutra, it teaches that all things contain and reflect one another. Today it survives mainly as a philosophy that shaped Chan." },

    { id: "nichiren", parent: "east-asian", wiki: "https://en.wikipedia.org/wiki/Nichiren_Buddhism",
      brief: "Exclusive devotion to the Lotus Sutra, chanting its title.",
      name: "Nichiren Buddhism", kind: "School",
      region: "Japan; Nichiren, 1222–1282",
      desc: "Founded by a Tendai-trained monk who taught exclusive devotion to the Lotus Sutra, expressed by chanting its title." },
    { id: "nichiren-shu", parent: "nichiren", wiki: "https://en.wikipedia.org/wiki/Nichiren-sh%C5%AB",
      brief: "The older Nichiren lineages, based at Mount Minobu.",
      name: "Nichiren-shū", kind: "School",
      region: "Based at Mount Minobu",
      desc: "A confederation of the older Nichiren lineages. It reveres Nichiren as a great teacher and Śākyamuni as the Buddha." },
    { id: "nichiren-shoshu", parent: "nichiren", wiki: "https://en.wikipedia.org/wiki/Nichiren_Sh%C5%8Dsh%C5%AB",
      brief: "Regards Nichiren himself as the original Buddha.",
      name: "Nichiren Shōshū", kind: "School",
      region: "Based at Taiseki-ji",
      desc: "Traces its lineage through Nichiren's disciple Nikkō, and regards Nichiren himself as the original Buddha." },
    { id: "soka-gakkai", parent: "nichiren", wiki: "https://en.wikipedia.org/wiki/Soka_Gakkai",
      brief: "A large lay movement, independent since 1991.",
      name: "Sōka Gakkai", kind: "Lay movement",
      region: "Founded 1930",
      desc: "A large international lay organisation that began within Nichiren Shōshū and separated from it in 1991." },

    // ----- Vajrayāna (inside Mahāyāna) -----
    { id: "vajrayana", parent: "mahayana", wiki: "https://en.wikipedia.org/wiki/Vajrayana",
      brief: "Tantric Mahāyāna: mantra, visualization and deity yoga.",
      name: "Vajrayāna", kind: "Tantric Mahāyāna", term: "Vajrayāna", lang: "Sanskrit",
      gloss: "Diamond vehicle. Also called Mantrayāna, the mantra vehicle.",
      region: "India, from about the 7th century",
      desc: "Shares Mahāyāna's goal and philosophy and adds tantric methods: mantra, visualization, deity yoga and devotion to a teacher. These require initiation. It is often listed as a third branch of Buddhism, but its own teachers class it as a form of Mahāyāna." },

    { id: "tibetan", parent: "vajrayana", wiki: "https://en.wikipedia.org/wiki/Tibetan_Buddhism",
      brief: "Monastic discipline, Mahāyāna philosophy and tantra in one path.",
      name: "Tibetan Buddhism", kind: "Regional tradition",
      region: "Tibet, Bhutan, Mongolia, the Himalaya",
      desc: "Combines monastic discipline, Mahāyāna philosophy and tantra in one graded path. All its schools share this structure and differ in lineage and emphasis." },
    { id: "nyingma", parent: "tibetan", wiki: "https://en.wikipedia.org/wiki/Nyingma",
      brief: "The oldest school, whose highest teaching is Dzogchen.",
      name: "Nyingma", kind: "School",
      term: "rnying ma", lang: "Tibetan", gloss: "The ancient ones.",
      region: "8th century",
      desc: "The oldest school, tracing itself to Padmasambhava and the first spread of Buddhism in Tibet. Its highest teaching is Dzogchen." },
    { id: "kagyu", parent: "tibetan", wiki: "https://en.wikipedia.org/wiki/Kagyu",
      brief: "The retreat lineage of Milarepa, centred on Mahāmudrā.",
      name: "Kagyu", kind: "School",
      term: "bka' brgyud", lang: "Tibetan", gloss: "Oral lineage.",
      region: "11th century",
      desc: "Descends from Marpa, Milarepa and Gampopa, and stresses long retreat. Its central teachings are Mahāmudrā and the Six Yogas of Nāropa. It includes the Karma Kagyu, headed by the Karmapa, and the Drukpa Kagyu of Bhutan." },
    { id: "sakya", parent: "tibetan", wiki: "https://en.wikipedia.org/wiki/Sakya",
      brief: "A scholarly school known for the Lamdré teachings.",
      name: "Sakya", kind: "School",
      term: "sa skya", lang: "Tibetan", gloss: "Grey earth, the site of its first monastery.",
      region: "Founded 1073",
      desc: "Known for scholarship and for Lamdré, the path and its fruit, a system based on the Hevajra tantra." },
    { id: "gelug", parent: "tibetan", wiki: "https://en.wikipedia.org/wiki/Gelug",
      brief: "Tsongkhapa's scholastic school, home of the Dalai Lamas.",
      name: "Gelug", kind: "School",
      term: "dge lugs", lang: "Tibetan", gloss: "The way of virtue.",
      region: "Tsongkhapa, 1357–1419",
      desc: "Stresses monastic discipline, long scholastic study and the graded path (lamrim). It is the school of the Dalai Lamas." },
    { id: "jonang", parent: "tibetan", wiki: "https://en.wikipedia.org/wiki/Jonang",
      brief: "A smaller school known for the Kālacakra tantra.",
      name: "Jonang", kind: "School",
      region: "13th–14th century",
      desc: "A smaller school known for the Kālacakra tantra and for Dölpopa's teaching of other-emptiness (shentong)." },

    { id: "shingon", parent: "vajrayana", wiki: "https://en.wikipedia.org/wiki/Shingon_Buddhism",
      brief: "Japanese esoteric Buddhism founded by Kūkai.",
      name: "Shingon", kind: "School",
      term: "Shingon", lang: "Japanese", gloss: "True word, a translation of mantra.",
      region: "Japan; Kūkai, early 9th century",
      desc: "Japanese esoteric Buddhism, brought from Tang China. It centres on the Buddha Mahāvairocana and practises with mantra, hand gestures and maṇḍalas. Tendai holds a parallel esoteric lineage." },
    { id: "newar", parent: "vajrayana", wiki: "https://en.wikipedia.org/wiki/Newar_Buddhism",
      brief: "Sanskrit-based Vajrayāna of the Kathmandu Valley.",
      name: "Newar Buddhism", kind: "Regional tradition",
      region: "Kathmandu Valley, Nepal",
      desc: "The last surviving Vajrayāna tradition that uses Sanskrit. Its priests are married householders, not monks." }
  ];

  // ---------- Practices: three independent tag sets ----------
  var QUALITIES = [
    { id: "sati", name: "Mindfulness", term: "sati", lang: "Pali", desc: "Present, unforgetful awareness of what is happening." },
    { id: "samadhi", name: "Concentration", term: "samādhi", lang: "Pali", desc: "A steady, collected mind that stays where it is placed. It is the fruit of calm meditation." },
    { id: "panna", name: "Wisdom", term: "paññā", lang: "Pali", desc: "Seeing that experience is impermanent, unsatisfying and without a fixed self. Mahāyāna calls this seeing emptiness. It is the fruit of insight meditation." },
    { id: "karuna", name: "Compassion", term: "karuṇā", lang: "Pali", desc: "Kindness and care that extend to all beings." },
    { id: "saddha", name: "Devotion", term: "saddhā", lang: "Pali", desc: "Faith and confidence in the Buddha, the teaching or a teacher." }
  ];

  var METHODS = [
    { id: "focus", name: "Focused attention" },
    { id: "open", name: "Open awareness" },
    { id: "reflect", name: "Reflection" },
    { id: "recite", name: "Recitation" },
    { id: "visual", name: "Visualization" }
  ];

  // ---------- Approaches (families of practice) ----------
  var APPROACHES = [
    { id: "calm", name: "Calm meditation", term: "samatha bhāvanā", lang: "Pali",
      desc: "Steadying the mind on a single object until it becomes still and collected. Every tradition uses it as the foundation for the rest." },
    { id: "insight", name: "Insight meditation", term: "vipassanā bhāvanā", lang: "Pali",
      desc: "Investigating experience to see its nature directly. Each tradition has its own way of doing this." },
    { id: "union", name: "Calm and insight as one", term: "yuganaddha", lang: "Pali",
      desc: "Practices that do not treat calm and insight as separate stages. The Pali term means yoked together." },
    { id: "heart", name: "Cultivating the heart", term: "brahmavihāra, bodhicitta", lang: "",
      desc: "Deliberately growing kindness and compassion, from goodwill toward one person up to the wish to free all beings." },
    { id: "recollection", name: "Recitation and recollection", term: "anussati", lang: "Pali",
      desc: "Keeping a Buddha, a scripture or a sacred phrase in mind by repeating it aloud or silently." },
    { id: "tantra", name: "Tantric practice", term: "sādhana", lang: "Sanskrit",
      desc: "The Vajrayāna method of training with visualization, mantra and ritual under a teacher's guidance. It requires initiation." }
  ];

  // trads: ids from TRADITIONS. techs: named techniques inside the practice, some tied to one lineage.
  // rel: [practice id, relationship, reason].
  var PRACTICES = [
    // ----- Calm -----
    { id: "breath", approach: "calm", name: "Mindfulness of breathing", term: "ānāpānasati", lang: "Pali",
      gloss: "Mindfulness of in-and-out breathing.",
      desc: "Resting attention on the breath and returning to it each time the mind wanders. It is the most widely taught practice in Buddhism.",
      trads: ["buddhism"], quals: ["sati", "samadhi"], methods: ["focus"],
      techs: [
        { name: "Counting breaths", desc: "Counting each out-breath from one to ten. The usual first practice in Zen.", trad: "chan" },
        { name: "Following the breath", desc: "Feeling each breath from start to finish at the nostrils or the abdomen." },
        { name: "Repeating Buddho", desc: "Pairing the in-breath with \"Bud\" and the out-breath with \"dho\".", trad: "thai-forest" }
      ],
      rel: [["mindfulness", "Leads to", "A calm mind is the usual foundation for insight."],
            ["object", "Same method", "One object held in mind, here the breath."]] },
    { id: "object", approach: "calm", name: "Single-object concentration", term: "kasiṇa", lang: "Pali",
      gloss: "A kasiṇa is a plain disc of colour or an element used as an object. Deep concentration is called jhāna.",
      desc: "Holding the mind on one chosen object, such as a coloured disc or a mental image, until it stays there without effort.",
      trads: ["theravada", "tibetan"], quals: ["samadhi"], methods: ["focus"],
      techs: [
        { name: "Kasiṇa and absorption", desc: "Gazing at a disc until its mental image is steady enough to enter jhāna.", trad: "paauk" },
        { name: "Nine stages of calm abiding", desc: "A graded map from scattered attention to effortless stillness, often using an image of the Buddha.", trad: "tibetan" }
      ],
      rel: [["breath", "Same method", "The breath is the most common single object."],
            ["deity", "Leads to", "Tantric visualization needs this steadiness."]] },

    // ----- Insight -----
    { id: "mindfulness", approach: "insight", name: "Establishing mindfulness", term: "satipaṭṭhāna", lang: "Pali",
      gloss: "The four establishments of mindfulness: body, feelings, mind and mental objects.",
      desc: "Observing body, feelings and mind as they change from moment to moment, to see that they are impermanent and not self.",
      trads: ["theravada"], quals: ["sati", "panna"], methods: ["open"],
      techs: [
        { name: "Noting", desc: "Silently labelling each experience as it appears: rising, falling, thinking, hearing.", trad: "mahasi" },
        { name: "Body scanning", desc: "Sweeping attention through the body and watching sensations arise and pass.", trad: "ubakhin" },
        { name: "Walking meditation", desc: "Slow walking with attention on each step. Pali caṅkama." }
      ],
      rel: [["breath", "Builds on", "Courses usually begin with the breath."],
            ["analytical", "Same aim", "The Tibetan route to the same insight uses reasoning."]] },
    { id: "analytical", approach: "insight", name: "Analytical meditation", term: "chégom", lang: "Tibetan",
      gloss: "Examining meditation. It alternates with resting meditation (jokgom), in which the mind stays on the conclusion.",
      desc: "Thinking a teaching through step by step until it becomes a conviction, then resting the mind on that conclusion.",
      trads: ["tibetan"], quals: ["panna"], methods: ["reflect"],
      techs: [
        { name: "Stages of the path", desc: "A fixed sequence of topics, from the value of human life to emptiness. Tibetan lamrim.", trad: "gelug" },
        { name: "Reasoning on emptiness", desc: "Searching for a fixed self or essence and finding none." },
        { name: "Reflection on death", desc: "Recalling that death is certain and its time is not. Also a Theravāda practice, maraṇasati." }
      ],
      rel: [["mindfulness", "Same aim", "Theravāda reaches the same insight by observation."],
            ["bodhicitta", "Combines with", "The awakening mind is one of the topics reflected on."]] },
    { id: "koan", approach: "insight", name: "Kōan practice", term: "Jp. kōan, Ch. kànhuà, Kr. hwadu", lang: "",
      gloss: "A kōan is a public case, a recorded exchange between a master and a student. Kànhuà means observing the phrase.",
      desc: "Holding a question that reasoning cannot solve until ordinary thinking gives way to direct seeing.",
      trads: ["linji", "seon"], quals: ["panna", "samadhi"], methods: ["focus"],
      techs: [
        { name: "The critical phrase", desc: "Staying with one phrase from a case, such as \"What is this?\", and the doubt it raises.", trad: "seon" },
        { name: "Kōan curriculum", desc: "Working through a graded series of cases in private interviews with a teacher.", trad: "linji" }
      ],
      rel: [["sitting", "Same aim", "The two main roads of Zen."],
            ["breath", "Builds on", "Students usually begin by counting breaths."]] },

    // ----- Calm and insight as one -----
    { id: "zhiguan", approach: "union", name: "Calming and contemplating", term: "Ch. zhǐguān, Jp. shikan", lang: "",
      gloss: "Stopping and seeing, the Chinese translation of śamatha-vipaśyanā.",
      desc: "Zhiyi's system for practising calm and insight together, whether sitting, walking or in daily activity. It shaped all later East Asian meditation.",
      trads: ["tiantai"], quals: ["samadhi", "panna"], methods: ["focus", "reflect"],
      techs: [],
      rel: [["sitting", "Leads to", "Zen sitting grew out of this framework."],
            ["breath", "Builds on", "Zhiyi's manuals begin with the breath."]] },
    { id: "sitting", approach: "union", name: "Just sitting", term: "Jp. shikantaza, Ch. mòzhào", lang: "",
      gloss: "Shikantaza means nothing but sitting. Mòzhào means silent illumination.",
      desc: "Sitting upright in open awareness with no object and nothing to achieve. Sōtō Zen regards the sitting itself as awakening.",
      trads: ["caodong"], quals: ["samadhi", "panna"], methods: ["open"],
      techs: [],
      rel: [["koan", "Same aim", "The two main roads of Zen."],
            ["dzogchen", "Same method", "Both rest in open awareness, in different traditions."]] },
    { id: "dzogchen", approach: "union", name: "Great Perfection", term: "dzogchen", lang: "Tibetan",
      gloss: "Great perfection or great completeness.",
      desc: "Resting in the natural state of awareness after a teacher has pointed it out directly.",
      trads: ["nyingma"], quals: ["panna"], methods: ["open"],
      techs: [
        { name: "Cutting through", desc: "Resting in bare awareness, free of grasping. Tibetan trekchö." },
        { name: "Direct crossing", desc: "An advanced practice working with visions of light. Tibetan tögal." }
      ],
      rel: [["mahamudra", "Same method", "Two Tibetan systems with the same aim."],
            ["guru", "Builds on", "Devotion to the teacher is treated as the doorway."],
            ["ngondro", "Builds on", "The preliminaries are traditionally completed first."]] },
    { id: "mahamudra", approach: "union", name: "Great Seal", term: "mahāmudrā", lang: "Sanskrit",
      gloss: "Great seal: the nature of mind that marks every experience.",
      desc: "Calming the mind and then looking at the mind itself, until its empty and clear nature is recognised. Central to the Kagyu school and also taught in the Gelug and Sakya schools.",
      trads: ["kagyu"], quals: ["samadhi", "panna"], methods: ["open"],
      techs: [
        { name: "Pointing-out instruction", desc: "The teacher introduces the student directly to the nature of mind." },
        { name: "Four yogas", desc: "Four stages: one-pointedness, simplicity, one taste and non-meditation." }
      ],
      rel: [["dzogchen", "Same method", "Two Tibetan systems with the same aim."],
            ["guru", "Builds on", "Devotion to the teacher is treated as the doorway."]] },

    // ----- Cultivating the heart -----
    { id: "metta", approach: "heart", name: "Loving-kindness", term: "mettā bhāvanā", lang: "Pali",
      gloss: "Cultivation of goodwill, the first of the four divine abodes (brahmavihāra), which Mahāyāna calls the four immeasurables.",
      desc: "Silently wishing well to yourself, loved ones, strangers and difficult people, in widening circles. In Theravāda it is classed as a calm practice.",
      trads: ["buddhism"], quals: ["karuna", "samadhi"], methods: ["reflect"],
      techs: [
        { name: "Loving-kindness", desc: "The wish that beings be happy. Pali mettā." },
        { name: "Compassion", desc: "The wish that beings be free of suffering. Pali karuṇā." },
        { name: "Sympathetic joy", desc: "Gladness at the good fortune of others. Pali muditā." },
        { name: "Equanimity", desc: "An even mind toward all beings. Pali upekkhā." }
      ],
      rel: [["bodhicitta", "Leads to", "Mahāyāna widens the wish into a vow to free all beings."],
            ["breath", "Same aim", "Both are classed as calm practices."]] },
    { id: "bodhicitta", approach: "heart", name: "Awakening mind", term: "bodhicitta", lang: "Sanskrit",
      gloss: "The mind set on awakening for the sake of all beings.",
      desc: "Training the wish to awaken in order to free all beings, until it becomes the motive behind every practice. It defines the Mahāyāna path.",
      trads: ["mahayana"], quals: ["karuna"], methods: ["reflect", "visual"],
      techs: [
        { name: "Giving and taking", desc: "Breathing in the suffering of others and breathing out relief. Tibetan tonglen, part of mind training (lojong).", trad: "tibetan" },
        { name: "Exchanging self and other", desc: "Putting others' welfare where your own usually sits, as taught by Śāntideva." },
        { name: "Bodhisattva vow", desc: "Formally committing to the path, renewed daily in most Mahāyāna schools." }
      ],
      rel: [["metta", "Builds on", "Loving-kindness and compassion are its basis."],
            ["analytical", "Combines with", "It is cultivated by reflection in the Tibetan graded path."]] },

    // ----- Recitation and recollection -----
    { id: "nianfo", approach: "recollection", name: "Buddha-name recitation", term: "Ch. niànfó, Jp. nembutsu", lang: "",
      gloss: "Keeping the Buddha in mind. It grew from recollection of the Buddha, buddhānussati in Pali.",
      desc: "Reciting the name of Amitābha Buddha, trusting in his vow to receive those who call on him.",
      trads: ["pureland"], quals: ["saddha", "samadhi"], methods: ["recite"],
      techs: [
        { name: "Reciting the name", desc: "Repeating \"Namo Amituofo\" or \"Namu Amida Butsu\", aloud or silently." },
        { name: "Visualizing the Pure Land", desc: "The sixteen contemplations of Amitābha and his land, from the Contemplation Sutra." },
        { name: "Recitation as gratitude", desc: "Saying the name in thanks, not to earn merit.", trad: "jodo-shinshu" }
      ],
      rel: [["mantra", "Same method", "Both repeat a sacred phrase with devotion."],
            ["koan", "Combines with", "Chinese and Vietnamese Chan often pair recitation with the question \"Who is reciting?\""]] },
    { id: "chanting", approach: "recollection", name: "Scripture chanting", term: "sajjhāya", lang: "Pali",
      gloss: "Recitation, originally the way the teachings were memorised and passed on.",
      desc: "Reciting scripture aloud, alone or as a group. It is part of daily practice in every tradition.",
      trads: ["buddhism"], quals: ["saddha"], methods: ["recite"],
      techs: [
        { name: "Protective chants", desc: "Reciting Pali discourses for blessing and protection. Pali paritta.", trad: "theravada" },
        { name: "Chanting the title", desc: "Reciting \"Namu Myōhō Renge Kyō\", the title of the Lotus Sutra. Japanese daimoku.", trad: "nichiren" },
        { name: "Sutra services", desc: "Daily chanting of texts such as the Heart Sutra.", trad: "east-asian" }
      ],
      rel: [["nianfo", "Same method", "The voice carries the practice."]] },
    { id: "mantra", approach: "recollection", name: "Mantra recitation", term: "mantra", lang: "Sanskrit",
      gloss: "A sacred formula of syllables. The Pali form of the word is manta.",
      desc: "Repeating sacred syllables, aloud or silently, often counted on a string of 108 beads.",
      trads: ["vajrayana"], quals: ["saddha", "samadhi"], methods: ["recite"],
      techs: [
        { name: "Oṃ maṇi padme hūṃ", desc: "The six-syllable mantra of Avalokiteśvara, the bodhisattva of compassion.", trad: "tibetan" },
        { name: "Mantra of Light", desc: "A mantra of the Buddha Mahāvairocana. Japanese kōmyō shingon.", trad: "shingon" }
      ],
      rel: [["nianfo", "Same method", "Both repeat a sacred phrase with devotion."],
            ["deity", "Part of", "Each visualized figure has its own mantra."]] },

    // ----- Tantric practice -----
    { id: "ngondro", approach: "tantra", name: "Preliminary practices", term: "ngöndro", lang: "Tibetan",
      gloss: "What goes before.",
      desc: "Four foundational practices that prepare a student for tantra, each traditionally done 100,000 times.",
      trads: ["tibetan"], quals: ["saddha", "karuna"], methods: ["recite", "visual"],
      techs: [
        { name: "Refuge and prostrations", desc: "Taking refuge and arousing bodhicitta while bowing full length." },
        { name: "Vajrasattva", desc: "Reciting the hundred-syllable mantra to purify past harmful actions." },
        { name: "Maṇḍala offering", desc: "Offering a symbolic universe to build generosity and merit." },
        { name: "Guru yoga", desc: "Uniting your mind with the teacher's." }
      ],
      rel: [["deity", "Leads to", "The preliminaries prepare a student for deity practice."],
            ["guru", "Part of", "Guru yoga is the last of the four."]] },
    { id: "deity", approach: "tantra", name: "Deity yoga", term: "devatāyoga", lang: "Sanskrit",
      gloss: "Union with the deity. Tibetan teachers call the deity a yidam.",
      desc: "Visualizing yourself as an awakened figure, then dissolving the image to see that it, and you, are empty of fixed nature.",
      trads: ["vajrayana"], quals: ["samadhi", "panna"], methods: ["visual", "recite"],
      techs: [
        { name: "Generation stage", desc: "Building the visualization of the deity and its maṇḍala. Sanskrit utpattikrama." },
        { name: "Completion stage", desc: "Dissolving the image and working with the body's subtle energies. Sanskrit sampannakrama." },
        { name: "Meditation on the letter A", desc: "Contemplating the Sanskrit letter A as the unborn nature of all things. Japanese ajikan.", trad: "shingon" }
      ],
      rel: [["mantra", "Combines with", "Each visualized figure has its own mantra."],
            ["object", "Builds on", "Visualization needs steady concentration."],
            ["mahamudra", "Leads to", "Dissolving the image opens into resting in the nature of mind."]] },
    { id: "guru", approach: "tantra", name: "Guru yoga", term: "guruyoga", lang: "Sanskrit",
      gloss: "Union with the teacher. Tibetan lamé naljor.",
      desc: "Visualizing your teacher as a Buddha and merging your mind with theirs.",
      trads: ["tibetan"], quals: ["saddha", "panna"], methods: ["visual"],
      techs: [],
      rel: [["ngondro", "Part of", "It completes the preliminaries."],
            ["dzogchen", "Leads to", "Treated as the doorway to recognising the nature of mind."]] }
  ];

  // ---------- helpers ----------
  var byId = {};
  [TRADITIONS, QUALITIES, METHODS, APPROACHES, PRACTICES].forEach(function (list) {
    list.forEach(function (x) { byId[x.id] = x; });
  });
  TRADITIONS.forEach(function (t) { t.set = "trad"; t.children = []; });
  TRADITIONS.forEach(function (t) { if (t.parent) byId[t.parent].children.push(t.id); });
  QUALITIES.forEach(function (x) { x.set = "qual"; });
  METHODS.forEach(function (x) { x.set = "method"; });

  // ancestors, nearest first
  function ancestors(id) {
    var out = [], p = byId[id].parent;
    while (p) { out.push(p); p = byId[p].parent; }
    return out;
  }
  // true when `id` is `top` or sits below it in the tree
  function within(id, top) { return id === top || ancestors(id).indexOf(top) > -1; }

  // colour family of a tradition node
  TRADITIONS.forEach(function (t) {
    t.fam = within(t.id, "theravada") ? "thera" : within(t.id, "vajrayana") ? "vajra" : within(t.id, "mahayana") ? "maha" : "all";
    t.depth = ancestors(t.id).length;
  });

  // Practices for one tradition node:
  //  direct: tagged with the node or anything below it (techs = techniques that name it)
  //  shared: tagged with a wider tradition that contains the node
  function practicesFor(id) {
    var direct = [], shared = [];
    PRACTICES.forEach(function (p) {
      if (id === "buddhism") {
        if (p.trads.indexOf("buddhism") > -1) direct.push({ p: p, techs: [] });
        return;
      }
      var own = p.trads.some(function (t) { return within(t, id); });
      var techs = p.techs.filter(function (k) { return k.trad && within(k.trad, id); });
      if (own || techs.length) direct.push({ p: p, techs: own ? [] : techs });
      else if (p.trads.some(function (t) { return within(id, t); })) shared.push({ p: p, techs: [] });
    });
    return { direct: direct, shared: shared };
  }

  var ABBR = { Sanskrit: "Skt.", Japanese: "Jp.", Tibetan: "Tib." };
  function plain(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  // short form of a term for tiles and rows; empty when it only repeats the name
  function shortTerm(x) {
    if (!x.term || plain(x.term) === plain(x.name)) return "";
    return (ABBR[x.lang] ? ABBR[x.lang] + " " : "") + x.term;
  }

  return {
    TRADITIONS: TRADITIONS, QUALITIES: QUALITIES, METHODS: METHODS, APPROACHES: APPROACHES, PRACTICES: PRACTICES,
    byId: byId, ancestors: ancestors, within: within, practicesFor: practicesFor, shortTerm: shortTerm
  };
})();
