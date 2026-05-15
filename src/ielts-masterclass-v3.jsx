import { useState, useEffect, useRef } from "react";

// ============================================================
// CURRICULUM DATA
// ============================================================
const curriculum = [
  {
    id: "overview", icon: "📋", title: "Overview & Format", subtitle: "Know the battlefield", color: "#C8A951",
    content: {
      intro: "The IELTS Reading test is 60 minutes long with 40 questions across 3 passages (Academic) or 4 sections (General Training). Every correct answer = 1 mark. There is NO penalty for wrong answers.",
      sections: [
        { heading: "Academic vs General Training", body: "Academic passages are taken from books, journals, magazines, and newspapers — written for non-specialist audiences but complex in language. General Training passages are from advertisements, notices, workplace materials, and general-interest articles — more practical in nature." },
        { heading: "Passage Difficulty", body: "In Academic IELTS, passages get progressively harder. Passage 1 is the easiest, Passage 3 the hardest. In General Training, Sections 1 & 2 are shorter and easier; Section 3 is an extended text similar to Academic." },
        { heading: "Scoring", body: "40 questions, 1 mark each. Band scores: 39-40 = Band 9, 37-38 = Band 8.5, 35-36 = Band 8, 33-34 = Band 7.5, 30-32 = Band 7, 27-29 = Band 6.5, 23-26 = Band 6, 20-22 = Band 5.5." }
      ],
      tips: ["You write answers directly on the answer sheet (unlike Listening, there's no extra transfer time).", "Spend roughly 20 minutes per passage in Academic. Don't get stuck on one question.", "All answers are found in the passage — never use outside knowledge.", "Read questions BEFORE the passage to know what to look for."]
    }
  },
  {
    id: "strategies", icon: "🧠", title: "Core Reading Strategies", subtitle: "Read smarter, not harder", color: "#5B8DB8",
    content: {
      intro: "Strong IELTS readers don't read everything word-for-word. They use targeted techniques to locate answers fast. Master these three before tackling question types.",
      sections: [
        { heading: "1. Skimming — Get the Gist", body: "Read the title, headings, first sentence of each paragraph, and the last paragraph quickly. This gives you the topic, structure, and main idea in under 2 minutes. Skimming is NOT careful reading — it's radar scanning for the big picture." },
        { heading: "2. Scanning — Find the Target", body: "Scanning means moving your eyes rapidly through the text looking for specific information: a name, a number, a keyword. You're not reading — you're hunting. Use it to locate where an answer might be before reading carefully." },
        { heading: "3. Intensive Reading — Extract the Answer", body: "Once you've located the relevant section through scanning, switch to intensive reading. Read that paragraph carefully to understand meaning, paraphrase, and confirm your answer. This is the only stage where you read every word." }
      ],
      tips: ["Never read the whole passage before looking at questions — time is your enemy.", "Always underline or circle keywords in questions before searching.", "IELTS paraphrases: the passage rarely uses the exact words from the question. Look for synonyms.", "The order of questions usually follows the order of the passage (except Matching Headings).", "Mark difficult questions and come back — never spend more than 90 seconds on one question."]
    }
  },
  {
    id: "tfng", icon: "✅", title: "True / False / Not Given", subtitle: "The most misunderstood question type", color: "#7CB87C",
    content: {
      intro: "These questions test whether statements AGREE with, CONTRADICT, or are NOT addressed by the passage. This is the #1 question type students confuse. The distinction between FALSE and NOT GIVEN is critical.",
      sections: [
        { heading: "TRUE", body: "The statement agrees with the information in the passage. The meaning must match — exact words don't need to, but the idea must. Paraphrasing is common." },
        { heading: "FALSE", body: "The statement contradicts the information in the passage. The passage says the OPPOSITE. Be certain — if the passage says 'most' and the statement says 'all', that's FALSE." },
        { heading: "NOT GIVEN", body: "The passage does not address this at all. The topic may be mentioned, but not this specific claim. There is simply no information to confirm OR deny it. This is NOT the same as False." }
      ],
      tips: ["NOT GIVEN ≠ FALSE. Not Given means the passage is SILENT on the matter. False means the passage directly contradicts.", "Read the statement literally. Don't assume or infer beyond what's written.", "Watch for absolute words: 'always', 'never', 'all', 'only' — these often create False statements.", "If you find information that partially matches but doesn't fully confirm or deny — it's likely NOT GIVEN.", "Yes/No/Not Given is similar but tests the WRITER'S OPINIONS and CLAIMS, not factual information."]
    }
  },
  {
    id: "matching-headings", icon: "🗂️", title: "Matching Headings", subtitle: "Match the paragraph's main idea", color: "#B87CB8",
    content: {
      intro: "You are given a list of headings (more than the number of paragraphs) and must match each paragraph to its correct heading. This tests your understanding of the MAIN IDEA of each paragraph.",
      sections: [
        { heading: "The Golden Rule", body: "A heading must reflect the WHOLE paragraph — not just one sentence or a detail. If a heading is only supported by one sentence and not the overall message, it's wrong." },
        { heading: "Start with the Easiest", body: "Quickly skim all paragraphs and eliminate headings you're certain about first. Cross off used headings from your list. This narrows down options for harder paragraphs." },
        { heading: "Watch Out for Distractors", body: "Wrong headings often contain words that appear in the paragraph but relate to a detail, not the main idea. Don't be fooled by keyword matching alone — understand the paragraph's PURPOSE." }
      ],
      tips: ["Read only the first and last sentence of each paragraph first — they often signal the main idea.", "Look for the 'topic sentence' — usually the first sentence introduces the main point.", "Eliminate obvious wrong answers first to reduce your options.", "If two headings seem possible, re-read the paragraph and ask: 'What is the OVERALL point here?'", "There will always be extra headings — not all of them will be used."]
    }
  },
  {
    id: "matching-info", icon: "🔗", title: "Matching Information / Features", subtitle: "Locate specific details across paragraphs", color: "#B87C7C",
    content: {
      intro: "Matching Information: find which paragraph (A, B, C...) contains a specific piece of information. Matching Features: match statements to a list of options. Both require systematic scanning.",
      sections: [
        { heading: "Matching Information Strategy", body: "Underline keywords in each statement. Then scan paragraph by paragraph. For each paragraph, check if it matches any statement. This is more efficient than hunting for one statement at a time." },
        { heading: "Non-sequential Answers", body: "Unlike most question types, Matching Information answers do NOT follow the order of the passage. A statement might match paragraph A even though previous statements matched C and D. Stay flexible." },
        { heading: "Answers May Repeat", body: "The same paragraph can be the answer to multiple statements. Don't assume each paragraph can only be used once unless the instructions say 'use each letter only once'." }
      ],
      tips: ["Scan for proper nouns (names, places, dates) as anchor points — they're easy to spot.", "Read ALL options before matching — don't commit to the first one that seems right.", "For Matching Features with researchers: find the researcher's name first, then read around it.", "Don't get distracted by paragraphs that mention the keyword but in a different context.", "Answers are NOT in passage order — work through all paragraphs, not all questions."]
    }
  },
  {
    id: "sentence-completion", icon: "✍️", title: "Sentence / Summary Completion", subtitle: "Fill the gap with the exact right words", color: "#7CB8B8",
    content: {
      intro: "You must complete sentences or a summary using words from the passage. The instructions will say 'NO MORE THAN TWO WORDS' (or ONE, or THREE). This word limit is a hard rule — exceeding it = wrong answer.",
      sections: [
        { heading: "Sentence Completion", body: "Incomplete sentences that summarize information from the passage. The sentence before and after the gap is your key to finding the right section. The completed sentence must be grammatically correct AND factually accurate." },
        { heading: "Summary Completion", body: "A paragraph summarizing part of the passage, with multiple gaps. It usually covers one section of the passage, so locate that section first. Then fill each gap in order — the summary typically follows the passage's sequence." },
        { heading: "Note/Table/Flow-chart Completion", body: "Same principle but in a visual format. Tables test comparisons. Flow-charts test processes/sequences. Notes test key points. Understand the STRUCTURE of what you're completing before filling gaps." }
      ],
      tips: ["ALWAYS check the word limit — 'NO MORE THAN TWO WORDS AND/OR A NUMBER' is common. Articles (a, the) count as words.", "Copy words EXACTLY from the passage — do not change verb tenses, plurals, or spelling.", "The answer is always in the passage verbatim — unlike short-answer questions, do not paraphrase.", "Grammar is your guide: a gap after 'the' needs a noun; a gap after 'to' needs a verb (infinitive).", "Predict the type of word needed (noun? adjective? number?) before scanning — this speeds up your search."]
    }
  },
  {
    id: "multiple-choice", icon: "🎯", title: "Multiple Choice", subtitle: "Choose carefully — distractors are traps", color: "#B8A47C",
    content: {
      intro: "Choose the correct answer from 3 or 4 options (A/B/C/D). IELTS multiple choice is designed to trick you — wrong answers contain words from the passage used in misleading ways.",
      sections: [
        { heading: "Single Answer", body: "Choose ONE correct answer. The question stem tells you what to look for. Locate the relevant section, read carefully, then eliminate wrong options rather than just picking what sounds right." },
        { heading: "Elimination is Key", body: "Wrong answers are constructed to look plausible. They often contain words from the passage but change the meaning. An answer might say 'always' when the passage says 'sometimes', or mix two facts together incorrectly." },
        { heading: "Multiple Answers", body: "Some questions ask you to choose TWO or THREE correct answers from a longer list. Read each option independently. Don't stop at the first correct-seeming answer." }
      ],
      tips: ["Read the QUESTION STEM carefully — understand exactly what is being asked before reading options.", "Read all four options before choosing — the 'best' answer might not be the first one that seems correct.", "Eliminate obviously wrong options first to increase your odds.", "Watch for: answers that are too extreme, partially correct, or mix information from different parts.", "The correct answer is often a paraphrase of the passage — not a word-for-word copy."]
    }
  },
  {
    id: "short-answer", icon: "💬", title: "Short Answer Questions", subtitle: "Direct questions, precise answers", color: "#8B7CB8",
    content: {
      intro: "Questions starting with WHO, WHAT, WHEN, WHERE, HOW MANY, etc. — answered with specific information from the passage. A word limit applies here too. These test your ability to locate and extract very specific facts.",
      sections: [
        { heading: "Question Word = Answer Type", body: "WHO → a person/organization. WHAT → a thing/concept. WHEN → a time/date. WHERE → a place. HOW MANY → a number. HOW LONG → a duration. Let the question word guide what type of information you're hunting for." },
        { heading: "Scanning for Specific Information", body: "Identify 2–3 keywords in the question. Scan for those words (or synonyms) in the passage. Once found, read that section carefully. The answer is usually in the same sentence or the one immediately after." },
        { heading: "Word Limit Compliance", body: "If the limit is 'ONE WORD', write only one word. If 'TWO WORDS AND/OR A NUMBER', you can write a number separately from two words. Never go over — even if the extra word makes it clearer." }
      ],
      tips: ["Answers follow the order of the passage — use the question sequence to locate your place in the text.", "Use keywords from the question as anchors when scanning. Look for them or their synonyms.", "Don't overthink — the answer is literally in the passage. Don't rephrase or interpret.", "Numbers can be written as digits (3) or words (three) — both are usually accepted unless specified.", "If you're unsure, write your best guess — there's no penalty for wrong answers."]
    }
  },
  {
    id: "diagram", icon: "🗺️", title: "Diagram / Process Completion", subtitle: "Label visuals with passage words", color: "#B8B87C",
    content: {
      intro: "A diagram (machine, process, map, building plan) with blank labels. You fill in the labels using words from the passage. This appears mostly in Academic IELTS and tests your ability to connect visual or process information with text.",
      sections: [
        { heading: "Understand the Diagram First", body: "Spend 30 seconds understanding what the diagram shows. What type of object/process is it? Where are the numbered blanks? What labels already exist to give you context? This orients your search in the passage." },
        { heading: "Use Existing Labels as Anchors", body: "Labels that are already filled in will appear in the passage. Find them first to locate the relevant section of the passage — then the blanks will be nearby." },
        { heading: "Direction and Position", body: "For maps and diagrams, directional language in the passage (above, below, to the left, adjacent to, connected to) guides your matching. For processes, follow the flow/sequence logically." }
      ],
      tips: ["Word limit applies here too — obey it strictly.", "The passage will describe the diagram — find that section and stay there for all labels.", "Use spatial/positional words in the passage to match parts of the diagram.", "For process diagrams: identify the start and end of the process; labels will be in sequence.", "Answers are always NOUNS or NOUN PHRASES (the name of a part, component, or feature)."]
    }
  },
  {
    id: "time-management", icon: "⏱️", title: "Time Management", subtitle: "60 minutes, 40 questions, 3 passages", color: "#C85B5B",
    content: {
      intro: "Time is the biggest enemy in IELTS Reading. Most students don't finish — not because they can't answer, but because they waste time. Here's how to structure your 60 minutes like a professional.",
      sections: [
        { heading: "The 20-Minute Rule (Academic)", body: "Aim for 20 minutes per passage. Passage 1: 18 minutes (easiest, build confidence). Passage 2: 20 minutes (medium). Passage 3: 22 minutes (hardest, allow a little more). Keep a watch and move on ruthlessly." },
        { heading: "The Question-First Approach", body: "Before reading the passage, spend 2 minutes reading the questions. Underline keywords. This transforms your reading from passive to purposeful — you know exactly what you're hunting for before you enter the text." },
        { heading: "The Flag and Move Strategy", body: "If a question is taking more than 90 seconds, FLAG IT and move on. Answer all the easy questions first. Come back to hard ones with remaining time. A question you skip costs 1 mark; a question you spend 4 minutes on might cost you 3 unanswered ones." }
      ],
      tips: ["Never read the passage fully from start to finish before looking at questions.", "Spend max 2 minutes skimming the passage for structure, then go straight to questions.", "In the last 5 minutes: check all blanks are filled. Guess if needed — there's no penalty.", "Write answers as you go — do NOT plan to 'transfer' later. There's no transfer time.", "If Matching Headings appears, do it LAST for that passage — it requires the most reading."]
    }
  },
  {
    id: "vocab", icon: "📖", title: "Vocabulary & Paraphrase", subtitle: "The hidden skill behind all question types", color: "#5B8D5B",
    content: {
      intro: "IELTS Reading is fundamentally a paraphrase game. The question rephrases what the passage says using different words. If you don't recognize the synonyms, you can't find the answer — even if you read perfectly.",
      sections: [
        { heading: "How IELTS Paraphrases", body: "Common patterns: verbs → noun forms (analyse → analysis), adjectives → adverbs, active → passive voice, specific → general terms. Example: passage says 'the procedure was beneficial' → question says 'the method had a positive impact'." },
        { heading: "Building Academic Vocabulary", body: "Study the Academic Word List (AWL) — a list of 570 word families common in academic texts. Priority words: analyse, approach, assess, concept, constitute, context, data, define, derive, distribute, environment, factor, indicate, interpret, significant." },
        { heading: "Context Guessing", body: "You will encounter unknown words. Don't panic. Use context: look at the words before and after, identify if the word is positive/negative, check if it's a noun/verb/adjective. You often don't need the exact meaning — just enough to answer the question." }
      ],
      tips: ["When you encounter a new word in practice, learn its synonyms and paraphrases too.", "Read widely: The Economist, BBC, Scientific American. This builds passive vocabulary naturally.", "Make a 'paraphrase journal' — write the passage original and the paraphrase side by side.", "High-frequency IELTS synonyms: increase = rise/grow/surge, decrease = fall/drop/decline, important = significant/crucial/vital, show = indicate/demonstrate/reveal.", "Connective words signal answer location: 'however', 'although', 'despite' often appear near answers."]
    }
  }
];

// ============================================================
// PRACTICE EXERCISES
// ============================================================
const exercises = {
  overview: {
    title: "Quiz: IELTS Reading Basics",
    description: "Test your knowledge of the IELTS Reading format, rules, and scoring.",
    type: "quiz",
    questions: [
      { id: 1, question: "How many questions are in the IELTS Academic Reading test?", options: ["30", "35", "40", "45"], correct: 2, explanation: "There are 40 questions across 3 passages. Each correct answer = 1 mark." },
      { id: 2, question: "How long is the IELTS Reading test?", options: ["45 minutes", "60 minutes", "75 minutes", "90 minutes"], correct: 1, explanation: "The Reading test is exactly 60 minutes. Unlike Listening, there is no extra time to transfer answers." },
      { id: 3, question: "How many passages are there in the Academic Reading test?", options: ["2", "3", "4", "5"], correct: 1, explanation: "Academic Reading has 3 passages of increasing difficulty. General Training has 4 sections." },
      { id: 4, question: "What is the penalty for a wrong answer in IELTS Reading?", options: ["Minus 1 mark", "Minus 0.5 marks", "No penalty", "The question is voided"], correct: 2, explanation: "There is NO penalty for wrong answers. Always fill in every blank — even a guess is better than a blank." },
      { id: 5, question: "Which of the following is TRUE about IELTS Reading?", options: ["You can use outside knowledge to answer questions", "Extra transfer time is given at the end", "All answers must come directly from the passage", "Passage 1 is always the hardest"], correct: 2, explanation: "All answers MUST come from the passage. Outside knowledge is irrelevant and can mislead you." }
    ]
  },
  strategies: {
    title: "Quiz: Which Strategy to Use?",
    description: "Test your understanding of when to skim, scan, or read intensively.",
    type: "quiz",
    questions: [
      { id: 1, question: "You need to find what year a specific law was passed in a long passage. Which technique is most efficient?", options: ["Skimming", "Scanning", "Intensive reading", "Reading all topic sentences"], correct: 1, explanation: "Scanning is ideal for locating specific data like years, names, and numbers. Move your eyes rapidly to spot the figure." },
      { id: 2, question: "You want to understand the overall structure and main topic of a passage before answering questions. Which technique?", options: ["Skimming", "Scanning", "Intensive reading", "Reading only the conclusion"], correct: 0, explanation: "Skimming gives you the big picture quickly. Read title, headings, and first/last sentences of paragraphs." },
      { id: 3, question: "You've located the paragraph that contains your answer. Now you need to understand the exact meaning to confirm it. Which technique?", options: ["Skimming", "Scanning", "Intensive reading", "Skip to next question"], correct: 2, explanation: "Intensive reading is reserved for when you've found the right section. This is the only stage where you read every word carefully." },
      { id: 4, question: "You are about to start a passage. What should you do FIRST?", options: ["Read the passage from beginning to end", "Read the questions and underline keywords", "Guess all the answers from the title", "Write your name on the answer sheet"], correct: 1, explanation: "Always read questions FIRST so you know what to look for. This makes your reading purposeful, not passive." }
    ]
  },
  tfng: {
    title: "Practice: True / False / Not Given",
    description: "Read the passage and decide whether each statement is TRUE, FALSE, or NOT GIVEN.",
    type: "passage-tfng",
    passageTitle: "Urban Farming: Growing Food in the City",
    passage: "Urban farming — the practice of cultivating food within city boundaries — is rapidly gaining momentum worldwide. Proponents argue that urban farms reduce food miles, the distance food travels from farm to consumer, thereby lowering carbon emissions. In Singapore, vertical farms supply a small but growing percentage of the city's leafy vegetables, using hydroponic techniques that consume up to 95% less water than conventional farming. Critics, however, note that the energy required to power artificial lighting systems may offset the environmental benefits. Some urban farms operate on rooftops, converting previously unused space into productive agricultural land. The concept is not entirely new: during the Second World War, 'Victory Gardens' in the United States and United Kingdom produced approximately 40% of the vegetables consumed by civilians. Today, cities such as Detroit and Havana have developed large-scale urban agriculture programmes in response to food insecurity.",
    questions: [
      { id: 1, statement: "Urban farming uses significantly more water than conventional agriculture.", answer: "FALSE", explanation: "FALSE — The passage states hydroponic urban farms use up to 95% LESS water than conventional farming, not more." },
      { id: 2, statement: "Singapore's vertical farms supply the majority of the city's food requirements.", answer: "FALSE", explanation: "FALSE — The passage says they supply 'a small but growing percentage' of leafy vegetables, not the majority of all food." },
      { id: 3, statement: "Critics of urban farming are primarily concerned about water waste.", answer: "FALSE", explanation: "FALSE — Critics are concerned about the energy needed to power artificial lighting, not water waste." },
      { id: 4, statement: "Victory Gardens in the United Kingdom produced food during World War Two.", answer: "TRUE", explanation: "TRUE — The passage explicitly states that Victory Gardens in the UK (and USA) produced approximately 40% of civilians' vegetables during WWII." },
      { id: 5, statement: "Urban farming was first introduced in the 21st century.", answer: "FALSE", explanation: "FALSE — The passage clearly shows urban farming is 'not entirely new', citing WWII Victory Gardens as an earlier example." },
      { id: 6, statement: "The urban farming programmes in Detroit were funded by the national government.", answer: "NOT GIVEN", explanation: "NOT GIVEN — The passage mentions Detroit's programmes exist but says nothing about who funded or established them." }
    ]
  },
  "matching-headings": {
    title: "Practice: Matching Headings",
    description: "Choose the most suitable heading for each paragraph (A–E) from the list. There are more headings than paragraphs.",
    type: "passage-headings",
    passageTitle: "Animal Migration",
    headingOptions: [
      { key: "i", text: "Why animals undertake long seasonal journeys" },
      { key: "ii", text: "The natural tools animals use to find their way" },
      { key: "iii", text: "International conservation strategies for migratory species" },
      { key: "iv", text: "Environmental disruption to ancient migration patterns" },
      { key: "v", text: "The risks and hazards of migratory travel" },
      { key: "vi", text: "How technology helps scientists monitor migration" },
      { key: "vii", text: "The evolutionary origins of migration behaviour" }
    ],
    paragraphs: [
      { label: "A", text: "Animal migration is one of nature's most remarkable phenomena. Defined as the seasonal movement of animals from one habitat to another, migration is typically driven by the need to find food, avoid harsh weather, or reach breeding grounds. From the Arctic tern, which travels from pole to pole each year, to the wildebeest herds of the Serengeti, millions of species undertake these journeys as a fundamental part of their life cycles." },
      { label: "B", text: "How do animals know where to go? Scientists have identified several mechanisms. Many birds navigate using the Earth's magnetic field, effectively possessing a biological compass. Others use the position of the sun or stars. Salmon famously return to the exact river of their birth using a highly sensitive sense of smell. Monarch butterflies appear to use a combination of solar positioning and an internal time-keeping mechanism to navigate thousands of kilometres." },
      { label: "C", text: "Migration is a dangerous enterprise. Many animals perish along the way from exhaustion, starvation, or predation. Migratory birds face particular risks from storms and collisions with man-made structures such as communication towers and illuminated buildings. Some species, such as sea turtles, must cross thousands of miles of open ocean, during which time they are vulnerable to predators and fishing nets." },
      { label: "D", text: "Climate change is increasingly disrupting migration patterns that have remained stable for thousands of years. Rising temperatures are causing some species to alter their departure times, often resulting in a mismatch between their arrival at feeding grounds and the availability of food. Arctic sea ice loss is affecting polar species that depend on ice-covered routes, and some animals are beginning to shift their migration paths northward in response to warming." },
      { label: "E", text: "Recognising the vulnerability of migrating species, international organisations have established protected areas and migration corridors to safeguard key routes. The Convention on Migratory Species, signed by more than 130 countries, provides a legal framework for protecting species that cross international boundaries. Conservation groups work to identify bottleneck points — locations where large numbers of migrants converge — and prioritise these areas for protection." }
    ],
    answers: { A: "i", B: "ii", C: "v", D: "iv", E: "iii" },
    explanations: {
      A: "Paragraph A introduces what migration is and WHY animals do it (food, weather, breeding) — heading i matches perfectly. Heading vii about 'evolutionary origins' is a distractor; the paragraph doesn't discuss evolution.",
      B: "Paragraph B is entirely about HOW animals navigate (magnetic fields, stars, smell, solar position) — heading ii is the perfect match.",
      C: "Paragraph C focuses on the dangers faced during migration (predators, exhaustion, storms, nets) — heading v matches. Heading vi about 'technology' is not mentioned.",
      D: "Paragraph D is specifically about how climate change is disrupting migration patterns — heading iv is an exact match.",
      E: "Paragraph E discusses international conservation efforts (Convention on Migratory Species, protected corridors) — heading iii matches. The paragraph doesn't discuss technology, so heading vi is wrong."
    }
  },
  "matching-info": {
    title: "Practice: Matching Information",
    description: "Which paragraph (A, B, C, or D) contains the following information? You may use any letter more than once.",
    type: "passage-matching-info",
    passageTitle: "Ancient Writing Systems",
    paragraphOptions: ["A", "B", "C", "D"],
    paragraphs: [
      { label: "A", text: "Cuneiform, developed in ancient Mesopotamia around 3400 BCE, is widely considered the world's oldest writing system. Originally created to record commercial transactions — the movement of grain, livestock, and other goods — it was formed by pressing a reed stylus into wet clay tablets, creating distinctive wedge-shaped impressions. Over centuries, cuneiform evolved from simple pictographs into a complex system of syllabic and phonetic signs, adopted by numerous civilisations across the Near East." },
      { label: "B", text: "Egyptian hieroglyphics, in use from approximately 3200 BCE, represent one of the most complex writing systems ever devised. Unlike purely alphabetical systems, hieroglyphics combined logographic elements — symbols representing whole words or concepts — with phonetic signs representing sounds. This dual nature made the system highly flexible but also extremely challenging to learn. Hieroglyphics were used across a wide range of contexts, from grand temple inscriptions celebrating royal victories to administrative records governing the distribution of food and labour." },
      { label: "C", text: "Chinese writing has the longest continuous history of any writing system currently in active use, with origins dating back over three thousand years to oracle bone inscriptions used in divination rituals during the Shang Dynasty. Unlike other ancient scripts, Chinese writing survived and evolved rather than dying out, adapting through successive dynasties. The characters used today, though simplified and standardised, retain a clear visual relationship with their ancient predecessors." },
      { label: "D", text: "For centuries, many ancient writing systems remained undeciphered. The breakthrough in understanding Egyptian hieroglyphics came with the discovery of the Rosetta Stone in 1799 — a granite slab inscribed with the same decree in three scripts: hieroglyphics, Demotic, and Ancient Greek. Using the Greek text as a key, scholar Jean-François Champollion finally cracked the hieroglyphic code in 1822, opening the door to the study of ancient Egyptian civilisation." }
    ],
    questions: [
      { id: 1, statement: "A writing system originally created to track the exchange of commercial goods", answer: "A", explanation: "Paragraph A explicitly states cuneiform was 'originally created to record commercial transactions — the movement of grain, livestock, and other goods'." },
      { id: 2, statement: "A script that combines symbols representing whole words with symbols representing individual sounds", answer: "B", explanation: "Paragraph B describes hieroglyphics combining 'logographic elements — symbols representing whole words' with 'phonetic signs representing sounds'." },
      { id: 3, statement: "A physical object that enabled scholars to translate a previously undeciphered script", answer: "D", explanation: "Paragraph D describes the Rosetta Stone — a physical slab that, by containing the same text in three scripts, allowed Champollion to decode hieroglyphics." },
      { id: 4, statement: "The only ancient writing system with an unbroken tradition into the present day", answer: "C", explanation: "Paragraph C states Chinese writing 'has the longest continuous history of any writing system currently in active use' and is 'the only ancient writing system with an unbroken line to the present day'." },
      { id: 5, statement: "A writing method formed by pressing an instrument into a malleable material", answer: "A", explanation: "Paragraph A says cuneiform was formed 'by pressing a reed stylus into wet clay tablets'. The clay is the malleable material." }
    ]
  },
  "sentence-completion": {
    title: "Practice: Sentence Completion",
    description: "Complete each sentence using NO MORE THAN TWO WORDS from the passage.",
    type: "passage-sentence-completion",
    passageTitle: "The Rise of Solar Energy",
    passage: "Solar panels convert sunlight into electricity through a process known as the photovoltaic effect. The panels consist of silicon cells, which release electrons when struck by photons from sunlight, generating a flow of electrical current. The first practical photovoltaic cell was developed by Bell Labs in 1954, achieving an efficiency of around 6%. Today, commercial solar panels typically reach efficiencies of between 15% and 22%. The cost of solar panels has fallen by more than 90% over the past decade, driven by manufacturing advances and economies of scale. In 2022, solar power contributed approximately 4% of global electricity generation, and this figure is expected to rise substantially. China is now the world's largest producer of solar energy, generating more solar power than any other nation.",
    wordLimit: "NO MORE THAN TWO WORDS",
    questions: [
      { id: 1, stem: "Solar panels generate electricity through a process called the ___ effect.", answer: "photovoltaic", explanation: "The passage states: 'Solar panels convert sunlight into electricity through a process known as the photovoltaic effect.'" },
      { id: 2, stem: "In silicon cells, electrons are released when struck by ___ from sunlight.", answer: "photons", explanation: "The passage states: 'silicon cells, which release electrons when struck by photons from sunlight'." },
      { id: 3, stem: "The first practical photovoltaic cell was created by ___ in 1954.", answer: "Bell Labs", explanation: "The passage states: 'The first practical photovoltaic cell was developed by Bell Labs in 1954.' (Two words — within the limit.)" },
      { id: 4, stem: "Solar panel costs have decreased by over ___ in the last decade.", answer: "90%", explanation: "The passage states: 'The cost of solar panels has fallen by more than 90% over the past decade.'" },
      { id: 5, stem: "___ currently produces more solar energy than any other country in the world.", answer: "China", explanation: "The passage states: 'China is now the world's largest producer of solar energy, generating more solar power than any other nation.'" }
    ]
  },
  "multiple-choice": {
    title: "Practice: Multiple Choice",
    description: "Read the passage and choose the best answer (A, B, C, or D) for each question.",
    type: "passage-mcq",
    passageTitle: "Ocean Plastics",
    passage: "Every year, an estimated 8 million metric tonnes of plastic waste enter the world's oceans, threatening marine life and ecosystems. Once in the ocean, plastics do not biodegrade but instead break down into microplastics — tiny particles less than 5 millimetres in length — which are ingested by fish and other marine animals. Research has found microplastics in the stomachs of species ranging from tiny plankton to large whales. The Great Pacific Garbage Patch, often described as an 'island of trash' in popular media, is actually a diffuse accumulation of microplastics spread across a vast area rather than a solid mass. Efforts to address the crisis include developing biodegradable alternatives to single-use plastics, improving waste management infrastructure in high-pollution regions, and large-scale ocean cleanup operations. However, scientists warn that removal technology alone cannot solve the problem without upstream reduction in plastic production.",
    questions: [
      {
        id: 1,
        question: "According to the passage, microplastics are defined as:",
        options: ["A. Particles larger than 5 millimetres that float on the surface", "B. Plastics that biodegrade quickly in seawater", "C. Small pieces of plastic less than 5 millimetres in size", "D. Fragments found only in the stomachs of large whales"],
        answer: "C",
        explanation: "The passage defines microplastics as 'tiny particles less than 5 millimetres in length'. Option A is wrong (larger than 5mm), B is wrong (plastics don't biodegrade), D is wrong (found in species from plankton to whales)."
      },
      {
        id: 2,
        question: "What does the passage say about the Great Pacific Garbage Patch?",
        options: ["A. It is a solid island of discarded plastic objects", "B. It is larger than most scientific descriptions suggest", "C. It consists mainly of microplastics spread across a wide area", "D. It was recently discovered and is growing rapidly"],
        answer: "C",
        explanation: "The passage says the Patch is 'a diffuse accumulation of microplastics spread across a vast area rather than a solid mass'. Option A directly contradicts this."
      },
      {
        id: 3,
        question: "Which of the following is NOT mentioned as a solution to ocean plastic pollution?",
        options: ["A. Creating biodegradable replacements for single-use plastics", "B. Banning all plastic manufacturing globally", "C. Improving waste management in heavily polluting regions", "D. Conducting large-scale cleanup operations in the ocean"],
        answer: "B",
        explanation: "The passage mentions A, C, and D as solutions. Banning all plastic manufacturing globally is never mentioned — the passage only refers to 'upstream reduction in plastic production', not a complete ban."
      },
      {
        id: 4,
        question: "What do scientists suggest about ocean cleanup technology?",
        options: ["A. It is the most effective solution currently available", "B. It cannot solve the plastic crisis without also reducing production", "C. It has already significantly reduced plastic levels in the ocean", "D. It should focus only on removing large plastic objects"],
        answer: "B",
        explanation: "The passage states: 'scientists warn that removal technology alone cannot solve the problem without upstream reduction in plastic production.' This matches option B exactly."
      }
    ]
  },
  "short-answer": {
    title: "Practice: Short Answer Questions",
    description: "Answer each question using NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage.",
    type: "passage-short-answer",
    passageTitle: "Gutenberg and the Printing Press",
    passage: "Johannes Gutenberg, a German goldsmith and printer, is credited with inventing the movable type printing press in the 1440s in the city of Mainz. His most celebrated work, the Gutenberg Bible — also known as the 42-line Bible — was produced around 1455 and is considered one of the most important books ever printed. Before Gutenberg's invention, books in Europe were copied by hand, primarily by monks in scriptoria, making them extremely rare and expensive. The printing press made it possible to produce books in large quantities at much lower cost, transforming literacy and the spread of knowledge across Europe. Within 50 years of Gutenberg's invention, over 20 million books had been printed in Europe. The printing press played a pivotal role in the Protestant Reformation, as Martin Luther's ideas were able to spread rapidly through printed pamphlets. Gutenberg himself, however, died in relative poverty in 1468, having lost control of his printing business to his financial backer, Johann Fust.",
    wordLimit: "NO MORE THAN TWO WORDS AND/OR A NUMBER",
    questions: [
      { id: 1, question: "In which city did Gutenberg develop his printing press?", answer: "Mainz", explanation: "The passage states the printing press was invented 'in the city of Mainz'." },
      { id: 2, question: "How many lines of text appeared on each page of Gutenberg's Bible?", answer: "42", explanation: "The Gutenberg Bible is 'also known as the 42-line Bible'. The answer is the number 42." },
      { id: 3, question: "Who mainly copied books in Europe before the printing press was invented?", answer: "monks", explanation: "The passage states books 'were copied by hand, primarily by monks in scriptoria'." },
      { id: 4, question: "How many books were printed in Europe within 50 years of Gutenberg's invention?", answer: "20 million", explanation: "The passage states 'over 20 million books had been printed in Europe' within 50 years. 'Over 20 million' is also acceptable." },
      { id: 5, question: "Who took control of Gutenberg's printing business?", answer: "Johann Fust", explanation: "The passage states Gutenberg 'lost control of his printing business to his financial backer, Johann Fust'." }
    ]
  },
  diagram: {
    title: "Practice: Process / Summary Completion",
    description: "Complete the summary of the water purification process using NO MORE THAN ONE WORD from the passage for each gap.",
    type: "passage-sentence-completion",
    passageTitle: "The Water Purification Process",
    passage: "Water treatment plants purify water through a series of carefully controlled stages before it is safe to drink. In the first stage, known as screening, raw water from rivers or reservoirs passes through metal screens that remove large debris such as leaves, branches, and litter. The water then flows into sedimentation tanks, where coagulant chemicals are added. These chemicals cause tiny suspended particles to bind together into larger clumps called floc, which settle to the bottom of the tank. The water is then filtered through layers of sand and gravel, which trap remaining fine particles and impurities. In the final stage, the water is treated with chlorine to eliminate any remaining bacteria and other pathogens, making it safe for human consumption and distribution.",
    wordLimit: "NO MORE THAN ONE WORD",
    questions: [
      { id: 1, stem: "Stage 1 — ___: Large debris is removed as raw water passes through metal screens.", answer: "screening", explanation: "The passage calls the first stage 'screening' — raw water passes through screens to remove large debris." },
      { id: 2, stem: "Stage 2 — Sedimentation: ___ chemicals are added to make particles clump together and sink.", answer: "coagulant", explanation: "The passage says 'coagulant chemicals are added'. Coagulant = the correct one-word answer." },
      { id: 3, stem: "Stage 3 — Filtration: Water passes through layers of sand and ___ to trap fine impurities.", answer: "gravel", explanation: "The passage states water is 'filtered through layers of sand and gravel'." },
      { id: 4, stem: "Stage 4 — Disinfection: ___ is used to kill remaining bacteria and pathogens.", answer: "chlorine", explanation: "The passage states the water 'is treated with chlorine to eliminate any remaining bacteria and other pathogens'." }
    ]
  },
  "time-management": {
    title: "Quiz: Time Management Strategy",
    description: "Test your understanding of how to manage 60 minutes effectively in the IELTS Reading test.",
    type: "quiz",
    questions: [
      { id: 1, question: "You have 10 minutes left in the test and 5 questions still to answer. What should you do?", options: ["Focus only on the easiest remaining question", "Skip all remaining questions to review previous answers", "Attempt all 5 questions, guessing if necessary", "Only attempt questions from the current passage"], correct: 2, explanation: "There is NO penalty for wrong answers. Always attempt every question — a guess has a chance of being right, an empty box is always wrong." },
      { id: 2, question: "When should you first look at the questions for a passage?", options: ["After reading the entire passage once", "Before reading the passage", "After reading the passage twice", "Only when confused by the passage"], correct: 1, explanation: "Read questions BEFORE the passage. This transforms your reading from passive to purposeful — you know exactly what to look for." },
      { id: 3, question: "What is the recommended approach to Matching Headings within a passage?", options: ["Do it first to get a clear picture of the passage structure", "Do it last among the question types for that passage", "Skip it entirely and never return", "Do it immediately after skimming the passage"], correct: 1, explanation: "Matching Headings requires the most reading and understanding of each paragraph. Tackle it LAST for that passage after you've already read much of the text answering other questions." },
      { id: 4, question: "A question is taking you over 90 seconds. What is the best action?", options: ["Keep working until you find the answer", "Ask the examiner for help", "Mark it, move on, and return later if time allows", "Leave it blank and never return to it"], correct: 2, explanation: "Flag difficult questions and move on. Spending 3-4 minutes on one question can cost you 3-4 other questions. Come back with remaining time." }
    ]
  },
  vocab: {
    title: "Quiz: Vocabulary & Paraphrase",
    description: "Identify the correct paraphrase of the underlined text. This reflects how IELTS rephrases passage content in questions.",
    type: "quiz",
    questions: [
      { id: 1, question: "Passage: 'The procedure was highly beneficial.' Which question phrasing means the SAME thing?", options: ["The method had negative consequences.", "The technique had a positive impact.", "The process was extremely complex.", "The approach was widely criticized."], correct: 1, explanation: "'Beneficial' = 'positive impact'. This is a direct synonym paraphrase. 'Procedure' = 'technique' and 'beneficial' = 'positive impact'." },
      { id: 2, question: "Passage: 'Consumption of processed foods has increased significantly.' Which question says the SAME?", options: ["Eating processed food has harmed people's health.", "The production of processed food has grown.", "There has been a notable rise in processed food intake.", "Processed food has become more affordable."], correct: 2, explanation: "'Consumption' = 'intake', 'increased significantly' = 'notable rise'. Option B is about production (wrong), A and D add information not in the original." },
      { id: 3, question: "Passage: 'Despite significant opposition from several governments, the treaty was eventually ratified.' Which is the correct paraphrase?", options: ["All governments supported the treaty from the beginning.", "The treaty was approved even though some governments objected.", "The treaty was rejected because of government opposition.", "Several governments introduced a new treaty."], correct: 1, explanation: "'Opposition' = 'objected', 'ratified' = 'approved', 'despite' = 'even though'. Option C reverses the meaning — the treaty WAS ratified despite opposition." },
      { id: 4, question: "Passage: 'These measures were designed to mitigate the effects of drought.' What does 'mitigate' mean?", options: ["Worsen", "Ignore", "Measure", "Reduce"], correct: 3, explanation: "'Mitigate' means to reduce the severity of something. Context clue: measures 'designed to' do something — they wouldn't be designed to worsen or ignore the effects." },
      { id: 5, question: "Passage: 'The findings corroborate earlier research conducted in 2015.' Which option says the SAME?", options: ["The results conflict with the 2015 study.", "The discoveries were first made in 2015.", "The results support the conclusions of the 2015 study.", "The 2015 research has been proven incorrect."], correct: 2, explanation: "'Corroborate' = 'support'. The findings AGREE with the 2015 research. Options A and D say the opposite. Option B misrepresents when the discoveries were made." }
    ]
  }
};

// ============================================================
// FULL TEST DATA
// ============================================================
const testPassages = [
  {
    id: 1,
    title: "The Story of Coffee",
    type: "continuous",
    text: `The story of coffee begins not in a sophisticated European café, but in the highlands of Ethiopia. According to legend, a goatherd named Kaldi noticed in the 9th century that his goats became unusually energetic after eating berries from a certain tree, particularly after night-time grazing near the forest. Kaldi reported his findings to a local monastery, where monks made a drink from the berries and discovered it helped them stay alert during long evening prayers. Whether or not this legend is true, it is well established that the coffee plant, Coffea arabica, originated in Ethiopia.

From Ethiopia, knowledge of coffee spread to the Arabian Peninsula, where it was first cultivated in Yemen around the 15th century. Coffeehouses, known as qahveh khaneh, began appearing in cities across the Near East and quickly became vibrant centres of social activity. Far from being merely places to drink coffee, they were venues where people played chess, listened to music, and debated political matters. They became so significant that they were sometimes called "Schools of the Wise."

Coffee arrived in Europe in the 17th century, initially met with suspicion. Some called it "the bitter invention of Satan," and a group of Venetian clergy attempted to have it banned. However, after tasting it himself, Pope Clement VIII gave his papal approval, declaring coffee a truly Christian beverage. This endorsement helped cement its acceptance across the continent. By the mid-1600s, there were over 300 coffeehouses in London alone, each attracting a distinct clientele — merchants, writers, lawyers, and politicians.

Coffee cultivation spread beyond the Arab world when a Dutch merchant smuggled live plants out of Mocha in Yemen in 1616. The Dutch established plantations in their colonies, particularly in Java, Indonesia. In 1727, Brazil entered the coffee trade when Lieutenant Colonel Francisco de Melo Palheta introduced coffee plants through an act of diplomatic cunning — he reportedly charmed the wife of French Guiana's governor into giving him coffee seedlings hidden in a bouquet of flowers. Brazil would go on to become the world's largest coffee producer.

The 20th century brought further transformation. In 1901, a Japanese-American chemist named Satori Kato developed the first soluble instant coffee, and by the 1930s, instant varieties had become widely available. The espresso machine, invented in Italy, revolutionised coffee drinking and gave rise to modern café culture. Today, more than 2.25 billion cups of coffee are consumed worldwide every single day.`
  },
  {
    id: 2,
    title: "The Rise of Smart Cities",
    type: "paragraphs",
    paragraphs: [
      { label: "A", text: "A smart city uses digital technology and data to improve urban services and the quality of life for its residents. At its core, the concept involves embedding sensors, cameras, and other connected devices throughout a city's infrastructure — in roads, bridges, buildings, and public spaces — to collect vast amounts of data in real time. This data is then analysed to make services more efficient, responsive, and sustainable. While the idea may seem futuristic, many elements of smart city technology are already operating in cities around the world." },
      { label: "B", text: "One of the most impactful applications of smart technology is in transport. Several cities have implemented adaptive traffic management systems that respond to real-time congestion. In Singapore, for instance, electronic sensors monitor traffic flow across the entire island and adjust signal timings accordingly, significantly reducing average journey times. Smart parking systems guide drivers directly to available spaces, reducing the fuel wasted by drivers circling for parking. In some cities, public transport systems are entirely integrated, allowing passengers to plan multi-modal journeys on a single app." },
      { label: "C", text: "Beyond transport, smart technology is increasingly deployed to tackle environmental challenges. Smart energy grids can balance supply and demand, integrating renewable sources like solar and wind more efficiently than traditional grids. Barcelona uses smart irrigation systems in its parks, reducing water consumption by up to 25%. Several cities have installed smart street lighting that dims automatically when streets are empty, saving significant energy. Copenhagen, which aims to become the world's first carbon-neutral capital, uses smart systems to monitor and manage its carbon output in real time." },
      { label: "D", text: "The expansion of smart city infrastructure has, however, raised serious concerns about privacy. When a city is saturated with cameras and sensors, questions arise about who owns the data collected and how it is used. In 2019, Sidewalk Toronto — a high-profile smart city project backed by a Google affiliate — was cancelled after public outcry over data governance. Critics argued that the project failed to adequately address residents' rights to privacy, and that the company stood to profit enormously from citizens' personal information. The episode highlighted the tension between innovation and civil liberties." },
      { label: "E", text: "Several cities have emerged as global leaders in smart city development. Singapore is frequently cited as the most comprehensive example, having invested over $1 billion in its Smart Nation initiative. Amsterdam has prioritised open data, publishing city datasets freely for developers to build new applications. Songdo, a purpose-built city in South Korea, was designed from the ground up with smart technology embedded in every system — from waste disposal to energy management. As technologies evolve and costs fall, smart city infrastructure is expected to become the global norm rather than the exception." }
    ]
  },
  {
    id: 3,
    title: "The Science of Memory",
    type: "paragraphs",
    paragraphs: [
      { label: "A", text: "The process of forming a memory is called encoding. When we experience something, sensory information is processed in the brain's sensory registers before being passed to the hippocampus — a seahorse-shaped structure in the medial temporal lobe that plays a critical role in converting short-term impressions into long-term memories. The depth of encoding matters: information processed at a deeper level, such as by connecting it to existing knowledge or generating an emotional response, forms stronger memories than information that is merely observed passively." },
      { label: "B", text: "Not all memories are equal. Psychologists distinguish between several memory systems. Declarative memory encompasses facts and events, divided further into semantic memory (general knowledge, such as knowing that Paris is the capital of France) and episodic memory (personal experiences). Non-declarative memory, by contrast, includes procedural skills such as riding a bicycle or playing the piano — abilities that, once learned, are retained even in patients with severe amnesia. The capacity of short-term memory, often called working memory, is limited to approximately seven items, though this can be extended through a process called 'chunking'." },
      { label: "C", text: "One of the most significant discoveries in memory research concerns the role of sleep. During sleep, particularly during the slow-wave and REM phases, the brain replays and consolidates newly acquired information, strengthening the neural pathways that constitute long-term memories. Studies have shown that students who sleep after studying perform considerably better on tests than those who remain awake. Sleep deprivation, conversely, impairs both the ability to encode new memories and to recall existing ones." },
      { label: "D", text: "Forgetting, though frustrating, is not simply a failure of memory — it is, in many respects, an active and useful process. The psychologist Hermann Ebbinghaus, who conducted pioneering experiments on himself in the 19th century, discovered what he called the 'forgetting curve': the finding that humans forget roughly half of newly learned information within an hour, and two-thirds within a day, unless the information is reviewed. His research also showed that relearning forgotten material takes less effort than initial learning — a phenomenon called the 'savings effect'. More recent research suggests that strategic forgetting helps the brain prioritise important information over irrelevant details." },
      { label: "E", text: "Fortunately, memory can be improved through deliberate practice. The most powerful technique identified by researchers is spaced repetition — reviewing material at increasing intervals over time. This exploits what scientists call the 'spacing effect', first documented by Ebbinghaus himself. The method of loci, or 'memory palace', involves mentally placing information in familiar spatial locations; competitive memory athletes use this technique to memorise thousands of digits. Regular aerobic exercise has also been shown to promote the growth of new neurons in the hippocampus, an effect that enhances both learning capacity and recall." }
    ]
  }
];

const testQuestions = [
  // PASSAGE 1 — T/F/NG (Q1–7)
  { id: 1, type: "tfng", passageId: 1, statement: "Kaldi was a farmer who first discovered the stimulating properties of coffee.", correctAnswer: "FALSE", explanation: "FALSE — The passage identifies Kaldi as a 'goatherd', not a farmer. This is a deliberate paraphrase trap." },
  { id: 2, type: "tfng", passageId: 1, statement: "Kaldi reported his discovery directly to local government officials.", correctAnswer: "FALSE", explanation: "FALSE — The passage says Kaldi reported his findings 'to a local monastery', not to government officials." },
  { id: 3, type: "tfng", passageId: 1, statement: "Coffeehouses in the Near East served primarily as places to drink coffee.", correctAnswer: "FALSE", explanation: "FALSE — The passage says coffeehouses were 'venues where people played chess, listened to music, and debated political matters', explicitly contradicting the idea they were primarily for drinking coffee." },
  { id: 4, type: "tfng", passageId: 1, statement: "Pope Clement VIII initially opposed the consumption of coffee before approving it.", correctAnswer: "NOT GIVEN", explanation: "NOT GIVEN — The passage only says he 'tasted it himself' and gave approval. Whether he initially opposed it is not mentioned anywhere in the passage." },
  { id: 5, type: "tfng", passageId: 1, statement: "The Dutch established coffee plantations in Indonesia.", correctAnswer: "TRUE", explanation: "TRUE — The passage states: 'The Dutch established plantations in their colonies, particularly in Java, Indonesia.'" },
  { id: 6, type: "tfng", passageId: 1, statement: "Brazil obtained its first coffee plants through an official diplomatic agreement.", correctAnswer: "FALSE", explanation: "FALSE — The passage describes it as 'an act of diplomatic cunning' involving deception — Palheta charmed the governor's wife into secretly providing seedlings. This directly contradicts 'official diplomatic agreement'." },
  { id: 7, type: "tfng", passageId: 1, statement: "The espresso machine was invented in France.", correctAnswer: "FALSE", explanation: "FALSE — The passage explicitly states the espresso machine was 'invented in Italy', not France." },

  // PASSAGE 1 — Sentence Completion (Q8–13)
  { id: 8, type: "sentence-completion", passageId: 1, wordLimit: "TWO WORDS AND/OR A NUMBER", stem: "The coffee plant, Coffea arabica, is native to", tail: ".", correctAnswer: "Ethiopia", acceptableAnswers: ["ethiopia"], explanation: "The passage states: 'it is well established that the coffee plant, Coffea arabica, originated in Ethiopia.'" },
  { id: 9, type: "sentence-completion", passageId: 1, wordLimit: "TWO WORDS AND/OR A NUMBER", stem: "Kaldi first noticed his goats' unusual behaviour after", tail: "grazing near the forest.", correctAnswer: "night-time", acceptableAnswers: ["night-time", "nighttime", "night time"], explanation: "The passage says goats 'became unusually energetic... particularly after night-time grazing near the forest'." },
  { id: 10, type: "sentence-completion", passageId: 1, wordLimit: "TWO WORDS AND/OR A NUMBER", stem: "Coffee's widespread acceptance across Europe was greatly helped by", tail: ".", correctAnswer: "papal approval", acceptableAnswers: ["papal approval"], explanation: "The passage says Pope Clement VIII 'gave his papal approval' and 'This endorsement helped cement its acceptance across the continent'." },
  { id: 11, type: "sentence-completion", passageId: 1, wordLimit: "TWO WORDS AND/OR A NUMBER", stem: "By the mid-1600s, London alone had over", tail: "coffeehouses.", correctAnswer: "300", acceptableAnswers: ["300"], explanation: "The passage states: 'there were over 300 coffeehouses in London alone'." },
  { id: 12, type: "sentence-completion", passageId: 1, wordLimit: "TWO WORDS AND/OR A NUMBER", stem: "Coffee cultivation began in Brazil in the year", tail: ".", correctAnswer: "1727", acceptableAnswers: ["1727"], explanation: "The passage states: 'In 1727, Brazil entered the coffee trade'." },
  { id: 13, type: "sentence-completion", passageId: 1, wordLimit: "TWO WORDS AND/OR A NUMBER", stem: "The first soluble", tail: "coffee was developed by Satori Kato in 1901.", correctAnswer: "instant", acceptableAnswers: ["instant"], explanation: "The passage states: 'Satori Kato developed the first soluble instant coffee' in 1901." },

  // PASSAGE 2 — Matching Headings (Q14–18)
  { id: 14, type: "matching-headings", passageId: 2, paragraph: "A", correctAnswer: "i", explanation: "Paragraph A defines what a smart city is and how it works — matching heading i: 'What makes a city smart?'" },
  { id: 15, type: "matching-headings", passageId: 2, paragraph: "B", correctAnswer: "iii", explanation: "Paragraph B focuses entirely on transport applications (traffic management, parking, public transport) — matching heading iii: 'Using technology to move people efficiently'." },
  { id: 16, type: "matching-headings", passageId: 2, paragraph: "C", correctAnswer: "vi", explanation: "Paragraph C discusses environmental applications (energy grids, irrigation, street lighting, carbon neutrality) — matching heading vi: 'Reducing environmental impact through technology'." },
  { id: 17, type: "matching-headings", passageId: 2, paragraph: "D", correctAnswer: "ii", explanation: "Paragraph D discusses privacy concerns and data ownership — matching heading ii: 'Tackling threats to personal data'." },
  { id: 18, type: "matching-headings", passageId: 2, paragraph: "E", correctAnswer: "v", explanation: "Paragraph E gives specific leading examples (Singapore, Amsterdam, Songdo) — matching heading v: 'Leading examples from around the world'." },

  // PASSAGE 2 — MCQ (Q19–22)
  {
    id: 19, type: "mcq", passageId: 2,
    question: "According to paragraph B, what is the primary benefit of smart parking systems?",
    options: ["A. They reduce the number of traffic accidents in city centres.", "B. They save fuel wasted by drivers searching for parking spaces.", "C. They provide real-time data to urban planners.", "D. They fully integrate with the public transport network."],
    correctAnswer: "B",
    explanation: "The passage states smart parking systems reduce 'the fuel wasted by drivers circling for parking'. Option D is mentioned separately as a feature of public transport integration, not parking systems."
  },
  {
    id: 20, type: "mcq", passageId: 2,
    question: "The Sidewalk Toronto project was cancelled primarily because of:",
    options: ["A. Technical difficulties encountered during construction.", "B. Withdrawal of funding from the government.", "C. Public concerns about data privacy and ownership.", "D. Competition from a rival technology company."],
    correctAnswer: "C",
    explanation: "The passage says it was cancelled 'after public outcry over data governance', with critics arguing it 'failed to adequately address residents' rights to privacy'."
  },
  {
    id: 21, type: "mcq", passageId: 2,
    question: "What does the passage state about Copenhagen's environmental ambitions?",
    options: ["A. It has already achieved full carbon neutrality.", "B. It aims to become the world's first carbon-neutral capital.", "C. It uses smart technology primarily to manage its traffic systems.", "D. It was designed as a purpose-built smart city from scratch."],
    correctAnswer: "B",
    explanation: "The passage says Copenhagen 'aims to become the world's first carbon-neutral capital'. It has not yet achieved this (option A), and option D describes Songdo, not Copenhagen."
  },
  {
    id: 22, type: "mcq", passageId: 2,
    question: "According to the passage, what approach has Amsterdam taken to smart city development?",
    options: ["A. It has built a new smart district with embedded technology in every building.", "B. It makes its city data freely available for developers to use.", "C. It has prioritised investment in smart energy grids above all else.", "D. It has partnered exclusively with major international technology companies."],
    correctAnswer: "B",
    explanation: "The passage states Amsterdam 'has prioritised open data, publishing city datasets freely for developers to build new applications'."
  },

  // PASSAGE 2 — Short Answer (Q23–26)
  { id: 23, type: "short-answer", passageId: 2, wordLimit: "THREE WORDS AND/OR A NUMBER", question: "What two types of connected devices are embedded throughout smart city infrastructure?", correctAnswer: "sensors and cameras", acceptableAnswers: ["sensors and cameras", "cameras and sensors"], explanation: "The passage states infrastructure includes 'sensors, cameras, and other connected devices'. The two types specifically named are sensors and cameras." },
  { id: 24, type: "short-answer", passageId: 2, wordLimit: "THREE WORDS AND/OR A NUMBER", question: "What does Copenhagen aim to become in terms of its environmental status?", correctAnswer: "carbon-neutral capital", acceptableAnswers: ["carbon-neutral capital", "the world's first carbon-neutral capital"], explanation: "The passage states Copenhagen 'aims to become the world's first carbon-neutral capital'." },
  { id: 25, type: "short-answer", passageId: 2, wordLimit: "THREE WORDS AND/OR A NUMBER", question: "How much has Singapore invested in its Smart Nation initiative?", correctAnswer: "over $1 billion", acceptableAnswers: ["over $1 billion", "$1 billion", "over 1 billion", "1 billion"], explanation: "The passage states Singapore has 'invested over $1 billion in its Smart Nation initiative'." },
  { id: 26, type: "short-answer", passageId: 2, wordLimit: "THREE WORDS AND/OR A NUMBER", question: "Which purpose-built city in South Korea was designed with smart technology in every system?", correctAnswer: "Songdo", acceptableAnswers: ["songdo"], explanation: "The passage names 'Songdo, a purpose-built city in South Korea' as designed 'from the ground up with smart technology embedded in every system'." },

  // PASSAGE 3 — Matching Information (Q27–31)
  { id: 27, type: "matching-info", passageId: 3, paragraphOptions: ["A","B","C","D","E"], statement: "The scientist who first conducted systematic research on the phenomenon of forgetting", correctAnswer: "D", explanation: "Paragraph D describes Hermann Ebbinghaus and his pioneering forgetting curve experiments — the psychologist who first studied forgetting scientifically." },
  { id: 28, type: "matching-info", passageId: 3, paragraphOptions: ["A","B","C","D","E"], statement: "A memory technique used by competitive memory athletes to recall large amounts of information", correctAnswer: "E", explanation: "Paragraph E describes the method of loci (memory palace) and states 'competitive memory athletes use this technique to memorise thousands of digits'." },
  { id: 29, type: "matching-info", passageId: 3, paragraphOptions: ["A","B","C","D","E"], statement: "A type of memory that remains intact even in people who suffer severe memory disorders", correctAnswer: "B", explanation: "Paragraph B states non-declarative/procedural skills 'are retained even in patients with severe amnesia', meaning this type of memory survives severe disorders." },
  { id: 30, type: "matching-info", passageId: 3, paragraphOptions: ["A","B","C","D","E"], statement: "Evidence that rest after learning leads to better test performance", correctAnswer: "C", explanation: "Paragraph C states 'students who sleep after studying perform considerably better on tests than those who remain awake' — direct evidence that rest improves performance." },
  { id: 31, type: "matching-info", passageId: 3, paragraphOptions: ["A","B","C","D","E"], statement: "The brain structure responsible for converting experiences into long-term memories", correctAnswer: "A", explanation: "Paragraph A names the hippocampus as playing 'a critical role in converting short-term impressions into long-term memories'." },

  // PASSAGE 3 — T/F/NG (Q32–37)
  { id: 32, type: "tfng", passageId: 3, statement: "The hippocampus is located in the brain's frontal lobe.", correctAnswer: "FALSE", explanation: "FALSE — The passage states the hippocampus is in 'the medial temporal lobe', not the frontal lobe." },
  { id: 33, type: "tfng", passageId: 3, statement: "Emotional memories are stored in a different part of the brain from factual memories.", correctAnswer: "NOT GIVEN", explanation: "NOT GIVEN — The passage mentions emotional responses strengthen encoding but says nothing about where emotional vs factual memories are stored." },
  { id: 34, type: "tfng", passageId: 3, statement: "Non-declarative memory includes skills such as playing musical instruments.", correctAnswer: "TRUE", explanation: "TRUE — The passage states non-declarative memory 'includes procedural skills such as riding a bicycle or playing the piano'." },
  { id: 35, type: "tfng", passageId: 3, statement: "Chunking allows working memory to hold an unlimited number of items.", correctAnswer: "FALSE", explanation: "FALSE — The passage says chunking can 'extend' short-term memory capacity, but explicitly states capacity is 'limited to approximately seven items'. Chunking extends it but does not make it unlimited." },
  { id: 36, type: "tfng", passageId: 3, statement: "Ebbinghaus published his research findings in a leading scientific journal.", correctAnswer: "NOT GIVEN", explanation: "NOT GIVEN — The passage says he 'conducted pioneering experiments on himself' but says nothing about where or whether he published his findings." },
  { id: 37, type: "tfng", passageId: 3, statement: "Aerobic exercise can stimulate the growth of new brain cells in the hippocampus.", correctAnswer: "TRUE", explanation: "TRUE — The passage states 'Regular aerobic exercise has also been shown to promote the growth of new neurons in the hippocampus'." },

  // PASSAGE 3 — MCQ (Q38–40)
  {
    id: 38, type: "mcq", passageId: 3,
    question: "According to paragraph A, what happens when information is processed at a deeper level?",
    options: ["A. It takes considerably more time to encode than passively observed information.", "B. It forms stronger and more durable memories.", "C. It is only effective for visual or emotional information.", "D. It is the technique used by competitive memory athletes."],
    correctAnswer: "B",
    explanation: "The passage states 'information processed at a deeper level...forms stronger memories than information that is merely observed passively'. Option D describes the memory palace, which is in paragraph E."
  },
  {
    id: 39, type: "mcq", passageId: 3,
    question: "According to paragraph D, what is the 'savings effect'?",
    options: ["A. The finding that sleeping after studying improves test scores.", "B. The discovery that relearning forgotten material requires less effort than initial learning.", "C. The technique of reviewing material at increasing intervals over time.", "D. The brain's ability to prioritise important information over irrelevant details."],
    correctAnswer: "B",
    explanation: "The passage defines the savings effect as: 'relearning forgotten material takes less effort than initial learning'. Options A and C describe different concepts (sleep consolidation and spaced repetition)."
  },
  {
    id: 40, type: "mcq", passageId: 3,
    question: "Which statement best reflects the author's overall view of forgetting?",
    options: ["A. It is primarily a sign of cognitive decline and should be treated medically.", "B. It is an entirely random and uncontrollable neurological process.", "C. It serves a useful purpose in helping the brain manage information effectively.", "D. It only affects short-term memory and does not impact long-term recall."],
    correctAnswer: "C",
    explanation: "The passage states forgetting 'is not simply a failure of memory — it is, in many respects, an active and useful process' and that 'strategic forgetting helps the brain prioritise important information'. This matches option C."
  }
];

const HEADING_OPTIONS = [
  { key: "i", text: "What makes a city 'smart'?" },
  { key: "ii", text: "Tackling threats to personal data" },
  { key: "iii", text: "Using technology to move people efficiently" },
  { key: "iv", text: "The economic benefits of smart infrastructure" },
  { key: "v", text: "Leading examples from around the world" },
  { key: "vi", text: "Reducing environmental impact through technology" },
  { key: "vii", text: "The history of urban planning" }
];

const BAND_SCORES = [
  { min: 39, band: "9.0" }, { min: 37, band: "8.5" }, { min: 35, band: "8.0" },
  { min: 33, band: "7.5" }, { min: 30, band: "7.0" }, { min: 27, band: "6.5" },
  { min: 23, band: "6.0" }, { min: 20, band: "5.5" }, { min: 16, band: "5.0" },
  { min: 13, band: "4.5" }, { min: 10, band: "4.0" }, { min: 0, band: "<4.0" }
];

function getBand(score) {
  for (const b of BAND_SCORES) { if (score >= b.min) return b.band; }
  return "<4.0";
}

function checkTestAnswer(q, userAns) {
  if (!userAns || userAns.trim() === "" || userAns === "--") return false;
  const user = userAns.toLowerCase().trim();
  if (q.acceptableAnswers) return q.acceptableAnswers.some(a => a.toLowerCase() === user);
  return user === q.correctAnswer.toLowerCase().trim();
}

// ============================================================
// PRACTICE EXERCISE COMPONENT
// ============================================================
function PracticeExercise({ exercise, color }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  const setAns = (id, val) => {
    setAnswers(prev => ({ ...prev, [id]: val }));
    if (checked) setChecked(false);
  };

  const score = checked ? exercise.questions.filter(q => {
    const ua = (answers[q.id] || "").toLowerCase().trim();
    const ca = (q.answer || q.correct?.toString() || "").toLowerCase().trim();
    if (exercise.type === "quiz") return parseInt(answers[q.id]) === q.correct;
    if (exercise.type === "passage-tfng") return ua === ca;
    if (exercise.type === "passage-headings") {
      const para = q;
      return (answers[para.label] || "").toLowerCase() === para.answer?.toLowerCase();
    }
    if (exercise.type === "passage-matching-info") return ua === ca;
    if (exercise.type === "passage-sentence-completion") return ua === ca;
    if (exercise.type === "passage-mcq") return ua === ca;
    if (exercise.type === "passage-short-answer") {
      if (q.acceptableAnswers) return q.acceptableAnswers.some(a => a.toLowerCase() === ua);
      return ua === ca;
    }
    return false;
  }).length : 0;

  const isCorrect = (q) => {
    if (!checked) return null;
    const ua = (answers[q.id] || "").toLowerCase().trim();
    const ca = (q.answer || "").toLowerCase().trim();
    if (exercise.type === "quiz") return parseInt(answers[q.id]) === q.correct;
    if (exercise.type === "passage-tfng") return ua === ca;
    if (exercise.type === "passage-matching-info") return ua === ca;
    if (exercise.type === "passage-sentence-completion") return ua === ca;
    if (exercise.type === "passage-mcq") return ua === ca;
    if (exercise.type === "passage-short-answer") {
      if (q.acceptableAnswers) return q.acceptableAnswers.some(a => a.toLowerCase() === ua);
      return ua === ca;
    }
    return false;
  };

  const headingAnswerCorrect = (label) => {
    if (!checked || !exercise.answers) return null;
    return (answers[label] || "").toLowerCase() === exercise.answers[label]?.toLowerCase();
  };

  const inputStyle = (correct) => ({
    background: checked ? (correct ? "#1A3A1E" : "#3A1A1E") : "#0F1117",
    border: `1px solid ${checked ? (correct ? "#5BAF73" : "#CF6679") : "#3A3D4E"}`,
    borderRadius: 6, padding: "8px 12px", color: "#E8E0D0",
    fontFamily: "Georgia, serif", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box"
  });

  const tfngBtn = (q, opt) => {
    const selected = answers[q.id] === opt;
    const baseColor = opt === "TRUE" ? "#5BAF73" : opt === "FALSE" ? "#CF6679" : "#5B8DB8";
    const correct = checked ? (q.answer === opt) : false;
    const wrong = checked && selected && !correct;
    return (
      <button key={opt} onClick={() => !checked && setAns(q.id, opt)} style={{
        background: selected ? `${baseColor}22` : "#0F1117",
        border: `2px solid ${selected ? baseColor : (checked && correct ? baseColor : "#2A2D3E")}`,
        borderRadius: 6, padding: "6px 14px", cursor: checked ? "default" : "pointer",
        color: selected ? baseColor : "#8A8070", fontFamily: "sans-serif", fontSize: 12,
        fontWeight: selected ? "bold" : "normal", transition: "all 0.15s",
        opacity: checked && !selected && !correct ? 0.4 : 1
      }}>{opt}</button>
    );
  };

  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ marginBottom: 20, padding: "12px 16px", background: `${color}15`, borderLeft: `3px solid ${color}`, borderRadius: "0 8px 8px 0" }}>
        <div style={{ fontSize: 13, fontFamily: "sans-serif", color: color, fontWeight: "bold", marginBottom: 4 }}>{exercise.title}</div>
        <div style={{ fontSize: 13, color: "#B0A898" }}>{exercise.description}</div>
      </div>

      {/* Passage (if applicable) */}
      {exercise.passage && (
        <div style={{ background: "#13161F", border: "1px solid #2A2D3E", borderRadius: 10, padding: 20, marginBottom: 20 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: color, fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 10 }}>
            📄 READING PASSAGE — {exercise.passageTitle}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#C8C0B0", margin: 0 }}>{exercise.passage}</p>
        </div>
      )}

      {/* Matching Headings passage */}
      {exercise.type === "passage-headings" && (
        <div>
          <div style={{ background: "#13161F", border: "1px solid #2A2D3E", borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: color, fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 10 }}>
              📄 READING PASSAGE — {exercise.passageTitle}
            </div>
            {exercise.paragraphs.map(p => (
              <div key={p.label} style={{ marginBottom: 14 }}>
                <span style={{ fontWeight: "bold", color: color, fontFamily: "sans-serif", fontSize: 13 }}>Paragraph {p.label} </span>
                <span style={{ fontSize: 14, lineHeight: 1.85, color: "#C8C0B0" }}>{p.text}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 10, padding: 16, marginBottom: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: 1, color: "#8A8070", fontFamily: "sans-serif", marginBottom: 10 }}>LIST OF HEADINGS</div>
            {exercise.headingOptions.map(h => (
              <div key={h.key} style={{ fontSize: 13, color: "#B0A898", padding: "3px 0", fontFamily: "Georgia, serif" }}>
                <span style={{ color: color, fontWeight: "bold" }}>{h.key}.</span> {h.text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            {exercise.paragraphs.map(p => {
              const correct = headingAnswerCorrect(p.label);
              return (
                <div key={p.label} style={{ background: "#13161F", border: `1px solid ${checked ? (correct ? "#5BAF73" : "#CF6679") : "#2A2D3E"}`, borderRadius: 8, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontWeight: "bold", color: color, fontFamily: "sans-serif", width: 80, flexShrink: 0, fontSize: 13 }}>Para {p.label}</span>
                  <select value={answers[p.label] || ""} onChange={e => !checked && setAns(p.label, e.target.value)} style={{ background: "#0F1117", border: "1px solid #3A3D4E", borderRadius: 6, padding: "6px 10px", color: "#E8E0D0", fontFamily: "Georgia, serif", fontSize: 13, cursor: checked ? "default" : "pointer" }}>
                    <option value="">— Select heading —</option>
                    {exercise.headingOptions.map(h => <option key={h.key} value={h.key}>{h.key}. {h.text}</option>)}
                  </select>
                  {checked && <span style={{ color: correct ? "#5BAF73" : "#CF6679", fontFamily: "sans-serif", fontSize: 14 }}>{correct ? "✓" : `✗ → ${exercise.answers[p.label]}`}</span>}
                </div>
              );
            })}
          </div>
          {checked && (
            <div style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 10, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, letterSpacing: 1, color: color, fontFamily: "sans-serif", marginBottom: 10 }}>EXPLANATIONS</div>
              {exercise.paragraphs.map(p => (
                <div key={p.label} style={{ fontSize: 13, color: "#B0A898", marginBottom: 8, lineHeight: 1.65 }}>
                  <span style={{ color: color, fontWeight: "bold" }}>Para {p.label}: </span>{exercise.explanations[p.label]}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Matching Info passage */}
      {exercise.type === "passage-matching-info" && (
        <div>
          <div style={{ background: "#13161F", border: "1px solid #2A2D3E", borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: color, fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 10 }}>
              📄 READING PASSAGE — {exercise.passageTitle}
            </div>
            {exercise.paragraphs.map(p => (
              <div key={p.label} style={{ marginBottom: 14 }}>
                <span style={{ fontWeight: "bold", color: color, fontFamily: "sans-serif", fontSize: 13 }}>Paragraph {p.label} </span>
                <span style={{ fontSize: 14, lineHeight: 1.85, color: "#C8C0B0" }}>{p.text}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            {exercise.questions.map(q => {
              const correct = isCorrect(q);
              return (
                <div key={q.id} style={{ background: "#13161F", border: `1px solid ${checked ? (correct ? "#5BAF73" : "#CF6679") : "#2A2D3E"}`, borderRadius: 8, padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: checked && !correct ? 8 : 0 }}>
                    <span style={{ color: color, fontWeight: "bold", fontFamily: "sans-serif", fontSize: 13, flexShrink: 0 }}>Q{q.id}</span>
                    <span style={{ fontSize: 14, color: "#C8C0B0", flex: 1 }}>{q.statement}</span>
                    <select value={answers[q.id] || ""} onChange={e => !checked && setAns(q.id, e.target.value)} style={{ background: "#0F1117", border: "1px solid #3A3D4E", borderRadius: 6, padding: "6px 10px", color: "#E8E0D0", fontFamily: "sans-serif", fontSize: 13, cursor: checked ? "default" : "pointer" }}>
                      <option value="">—</option>
                      {exercise.paragraphOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {checked && <span style={{ color: correct ? "#5BAF73" : "#CF6679", fontFamily: "sans-serif" }}>{correct ? "✓" : `✗ → ${q.answer}`}</span>}
                  </div>
                  {checked && <div style={{ fontSize: 12, color: "#8A8070", lineHeight: 1.6, marginTop: 6, paddingLeft: 30 }}>{q.explanation}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quiz questions */}
      {exercise.type === "quiz" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
          {exercise.questions.map(q => {
            const selected = answers[q.id];
            return (
              <div key={q.id} style={{ background: "#13161F", border: "1px solid #2A2D3E", borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 14, color: "#E8E0D0", marginBottom: 10, lineHeight: 1.5 }}>
                  <span style={{ color: color, fontWeight: "bold", marginRight: 8, fontFamily: "sans-serif" }}>Q{q.id}.</span>{q.question}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {q.options.map((opt, idx) => {
                    const isSelected = parseInt(selected) === idx;
                    const isRight = idx === q.correct;
                    const bg = checked ? (isRight ? "#1A3A1E" : (isSelected && !isRight ? "#3A1A1E" : "#0F1117")) : (isSelected ? "#1E2040" : "#0F1117");
                    const borderColor = checked ? (isRight ? "#5BAF73" : (isSelected && !isRight ? "#CF6679" : "#2A2D3E")) : (isSelected ? color : "#2A2D3E");
                    return (
                      <button key={idx} onClick={() => !checked && setAns(q.id, idx)} style={{ background: bg, border: `1px solid ${borderColor}`, borderRadius: 7, padding: "9px 14px", cursor: checked ? "default" : "pointer", color: "#C8C0B0", fontFamily: "Georgia, serif", fontSize: 13, textAlign: "left", transition: "all 0.15s" }}>
                        <span style={{ color: color, fontWeight: "bold", marginRight: 8 }}>{"ABCD"[idx]}.</span>{opt}
                        {checked && isRight && <span style={{ color: "#5BAF73", marginLeft: 8, fontSize: 12 }}>✓ Correct</span>}
                        {checked && isSelected && !isRight && <span style={{ color: "#CF6679", marginLeft: 8, fontSize: 12 }}>✗</span>}
                      </button>
                    );
                  })}
                </div>
                {checked && <div style={{ fontSize: 12, color: "#8A8070", marginTop: 10, lineHeight: 1.6, borderTop: "1px solid #2A2D3E", paddingTop: 8 }}>💡 {q.explanation}</div>}
              </div>
            );
          })}
        </div>
      )}

      {/* T/F/NG questions */}
      {exercise.type === "passage-tfng" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {exercise.questions.map(q => {
            const correct = isCorrect(q);
            return (
              <div key={q.id} style={{ background: "#13161F", border: `1px solid ${checked ? (correct ? "#5BAF73" : "#CF6679") : "#2A2D3E"}`, borderRadius: 8, padding: "14px 16px" }}>
                <div style={{ fontSize: 14, color: "#C8C0B0", marginBottom: 10, lineHeight: 1.6 }}>
                  <span style={{ color: color, fontWeight: "bold", marginRight: 8, fontFamily: "sans-serif" }}>Q{q.id}.</span>{q.statement}
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: checked ? 8 : 0 }}>
                  {["TRUE", "FALSE", "NOT GIVEN"].map(opt => tfngBtn(q, opt))}
                </div>
                {checked && <div style={{ fontSize: 12, color: "#8A8070", lineHeight: 1.6, borderTop: "1px solid #2A2D3E", paddingTop: 8 }}>💡 {q.explanation}</div>}
              </div>
            );
          })}
        </div>
      )}

      {/* Sentence completion questions */}
      {exercise.type === "passage-sentence-completion" && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#8A8070", fontFamily: "sans-serif", marginBottom: 12, background: "#0F1117", border: "1px solid #2A2D3E", borderRadius: 6, padding: "8px 12px" }}>
            Word limit: {exercise.wordLimit}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {exercise.questions.map(q => {
              const ua = (answers[q.id] || "").toLowerCase().trim();
              const correct = checked ? ua === q.answer.toLowerCase() : null;
              return (
                <div key={q.id} style={{ background: "#13161F", border: `1px solid ${checked ? (correct ? "#5BAF73" : "#CF6679") : "#2A2D3E"}`, borderRadius: 8, padding: "14px 16px" }}>
                  <div style={{ fontSize: 14, color: "#C8C0B0", marginBottom: 10, lineHeight: 1.6, fontStyle: "italic" }}>
                    <span style={{ color: color, fontWeight: "bold", fontStyle: "normal", marginRight: 8, fontFamily: "sans-serif" }}>Q{q.id}.</span>{q.stem} <span style={{ background: "#2A2D3E", padding: "1px 6px", borderRadius: 3, color: "#E8E0D0", fontStyle: "normal" }}>___</span>
                  </div>
                  <input value={answers[q.id] || ""} onChange={e => !checked && setAns(q.id, e.target.value)} placeholder="Your answer..." style={inputStyle(correct)} />
                  {checked && (
                    <div style={{ fontSize: 12, color: "#8A8070", lineHeight: 1.6, borderTop: "1px solid #2A2D3E", paddingTop: 8, marginTop: 8 }}>
                      {correct ? <span style={{ color: "#5BAF73" }}>✓ Correct: {q.answer}</span> : <span style={{ color: "#CF6679" }}>✗ Correct answer: <strong style={{ color: "#E8E0D0" }}>{q.answer}</strong></span>}
                      <br />{q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MCQ questions */}
      {exercise.type === "passage-mcq" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
          {exercise.questions.map(q => {
            return (
              <div key={q.id} style={{ background: "#13161F", border: "1px solid #2A2D3E", borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 14, color: "#E8E0D0", marginBottom: 10, lineHeight: 1.5 }}>
                  <span style={{ color: color, fontWeight: "bold", marginRight: 8, fontFamily: "sans-serif" }}>Q{q.id}.</span>{q.question}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {q.options.map((opt) => {
                    const letter = opt[0];
                    const isSelected = answers[q.id] === letter;
                    const isRight = letter === q.answer;
                    const bg = checked ? (isRight ? "#1A3A1E" : (isSelected && !isRight ? "#3A1A1E" : "#0F1117")) : (isSelected ? "#1E2040" : "#0F1117");
                    const borderColor = checked ? (isRight ? "#5BAF73" : (isSelected && !isRight ? "#CF6679" : "#2A2D3E")) : (isSelected ? color : "#2A2D3E");
                    return (
                      <button key={letter} onClick={() => !checked && setAns(q.id, letter)} style={{ background: bg, border: `1px solid ${borderColor}`, borderRadius: 7, padding: "9px 14px", cursor: checked ? "default" : "pointer", color: "#C8C0B0", fontFamily: "Georgia, serif", fontSize: 13, textAlign: "left", transition: "all 0.15s" }}>
                        {opt}
                        {checked && isRight && <span style={{ color: "#5BAF73", marginLeft: 8, fontSize: 12 }}>✓</span>}
                        {checked && isSelected && !isRight && <span style={{ color: "#CF6679", marginLeft: 8, fontSize: 12 }}>✗</span>}
                      </button>
                    );
                  })}
                </div>
                {checked && <div style={{ fontSize: 12, color: "#8A8070", marginTop: 10, lineHeight: 1.6, borderTop: "1px solid #2A2D3E", paddingTop: 8 }}>💡 {q.explanation}</div>}
              </div>
            );
          })}
        </div>
      )}

      {/* Short answer questions */}
      {exercise.type === "passage-short-answer" && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: "#8A8070", fontFamily: "sans-serif", marginBottom: 12, background: "#0F1117", border: "1px solid #2A2D3E", borderRadius: 6, padding: "8px 12px" }}>
            Word limit: {exercise.wordLimit}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {exercise.questions.map(q => {
              const ua = (answers[q.id] || "").toLowerCase().trim();
              const correct = checked ? (q.acceptableAnswers ? q.acceptableAnswers.some(a => a.toLowerCase() === ua) : ua === q.answer.toLowerCase()) : null;
              return (
                <div key={q.id} style={{ background: "#13161F", border: `1px solid ${checked ? (correct ? "#5BAF73" : "#CF6679") : "#2A2D3E"}`, borderRadius: 8, padding: "14px 16px" }}>
                  <div style={{ fontSize: 14, color: "#C8C0B0", marginBottom: 10, lineHeight: 1.6 }}>
                    <span style={{ color: color, fontWeight: "bold", marginRight: 8, fontFamily: "sans-serif" }}>Q{q.id}.</span>{q.question}
                  </div>
                  <input value={answers[q.id] || ""} onChange={e => !checked && setAns(q.id, e.target.value)} placeholder="Your answer..." style={inputStyle(correct)} />
                  {checked && (
                    <div style={{ fontSize: 12, color: "#8A8070", lineHeight: 1.6, borderTop: "1px solid #2A2D3E", paddingTop: 8, marginTop: 8 }}>
                      {correct ? <span style={{ color: "#5BAF73" }}>✓ Correct!</span> : <span style={{ color: "#CF6679" }}>✗ Correct answer: <strong style={{ color: "#E8E0D0" }}>{q.answer}</strong></span>}
                      <br />{q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Check answers button and score */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 8 }}>
        <button onClick={() => setChecked(true)} style={{ background: color, border: "none", borderRadius: 8, padding: "11px 24px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold" }}>
          {checked ? "Answers Shown ✓" : "Check Answers"}
        </button>
        {checked && (
          <div style={{ fontSize: 14, color: "#E8E0D0", fontFamily: "sans-serif" }}>
            Score: <strong style={{ color: color }}>{score}</strong> / {exercise.questions?.length || exercise.paragraphs?.length || 0}
          </div>
        )}
        {checked && <button onClick={() => { setAnswers({}); setChecked(false); }} style={{ background: "transparent", border: "1px solid #3A3D4E", borderRadius: 8, padding: "10px 16px", cursor: "pointer", color: "#8A8070", fontFamily: "sans-serif", fontSize: 12 }}>Reset</button>}
      </div>
    </div>
  );
}

// ============================================================
// FULL TEST MODE
// ============================================================
function TestMode({ onExit }) {
  const [testState, setTestState] = useState("start"); // start | inprogress | submitted
  const [currentPassage, setCurrentPassage] = useState(1);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600);
  const timerRef = useRef(null);

  useEffect(() => {
    if (testState === "inprogress") {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { clearInterval(timerRef.current); setTestState("submitted"); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [testState]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const setAns = (id, val) => setAnswers(prev => ({ ...prev, [id]: val }));

  const score = testQuestions.filter(q => checkTestAnswer(q, answers[q.id])).length;
  const band = getBand(score);

  const passageQs = (pid) => testQuestions.filter(q => q.passageId === pid);

  // Render one question
  const renderQ = (q) => {
    const val = answers[q.id] || "";
    const isSubmitted = testState === "submitted";
    const correct = isSubmitted ? checkTestAnswer(q, val) : null;
    const borderColor = isSubmitted ? (correct ? "#5BAF73" : "#CF6679") : (val && val !== "--" ? "#C8A951" : "#2A2D3E");

    const baseCard = { background: "#13161F", border: `1px solid ${borderColor}`, borderRadius: 8, padding: "12px 16px", marginBottom: 10 };
    const qNum = <span style={{ color: "#C8A951", fontWeight: "bold", fontFamily: "sans-serif", marginRight: 8 }}>Q{q.id}.</span>;

    if (q.type === "tfng") {
      return (
        <div key={q.id} style={baseCard}>
          <div style={{ fontSize: 13, color: "#C8C0B0", marginBottom: 8, lineHeight: 1.6 }}>{qNum}{q.statement}</div>
          <div style={{ display: "flex", gap: 6 }}>
            {["TRUE", "FALSE", "NOT GIVEN"].map(opt => {
              const sel = val === opt;
              const clr = opt === "TRUE" ? "#5BAF73" : opt === "FALSE" ? "#CF6679" : "#5B8DB8";
              const showCorrect = isSubmitted && q.correctAnswer === opt;
              return (
                <button key={opt} onClick={() => !isSubmitted && setAns(q.id, opt)} style={{ background: sel ? `${clr}22` : (showCorrect && isSubmitted ? "#1A2A1A" : "#0F1117"), border: `1px solid ${sel ? clr : (showCorrect ? "#5BAF73" : "#3A3D4E")}`, borderRadius: 5, padding: "5px 10px", cursor: isSubmitted ? "default" : "pointer", color: sel ? clr : "#6A6458", fontFamily: "sans-serif", fontSize: 11, fontWeight: sel ? "bold" : "normal" }}>
                  {opt}
                </button>
              );
            })}
          </div>
          {isSubmitted && <div style={{ fontSize: 11, color: "#6A6458", marginTop: 6, lineHeight: 1.5 }}>
            {correct ? "✓ " : `✗ Answer: ${q.correctAnswer} — `}{q.explanation.split(" — ")[1] || q.explanation}
          </div>}
        </div>
      );
    }

    if (q.type === "sentence-completion") {
      return (
        <div key={q.id} style={baseCard}>
          <div style={{ fontSize: 11, color: "#5A5448", fontFamily: "sans-serif", marginBottom: 4 }}>NO MORE THAN {q.wordLimit}</div>
          <div style={{ fontSize: 13, color: "#C8C0B0", marginBottom: 8, lineHeight: 1.6, fontStyle: "italic" }}>
            {qNum}{q.stem} <span style={{ background: "#2A2D3E", padding: "1px 6px", borderRadius: 3, color: "#E8E0D0", fontStyle: "normal" }}>___</span>{q.tail}
          </div>
          <input value={val} onChange={e => !isSubmitted && setAns(q.id, e.target.value)} placeholder="Your answer..." style={{ background: "#0F1117", border: `1px solid ${isSubmitted ? (correct ? "#5BAF73" : "#CF6679") : "#3A3D4E"}`, borderRadius: 5, padding: "7px 10px", color: "#E8E0D0", fontFamily: "Georgia, serif", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box" }} />
          {isSubmitted && <div style={{ fontSize: 11, color: correct ? "#5BAF73" : "#CF6679", marginTop: 4 }}>
            {correct ? "✓ Correct" : `✗ Answer: ${q.correctAnswer}`}
          </div>}
        </div>
      );
    }

    if (q.type === "matching-headings") {
      return (
        <div key={q.id} style={baseCard}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {qNum}
            <span style={{ fontSize: 13, color: "#C8C0B0" }}>Paragraph <strong style={{ color: "#C8A951" }}>{q.paragraph}</strong></span>
            <select value={val} onChange={e => !isSubmitted && setAns(q.id, e.target.value)} style={{ flex: 1, background: "#0F1117", border: "1px solid #3A3D4E", borderRadius: 5, padding: "6px 8px", color: "#E8E0D0", fontFamily: "Georgia, serif", fontSize: 12, cursor: isSubmitted ? "default" : "pointer" }}>
              <option value="">— Select —</option>
              {HEADING_OPTIONS.map(h => <option key={h.key} value={h.key}>{h.key}. {h.text}</option>)}
            </select>
            {isSubmitted && <span style={{ color: correct ? "#5BAF73" : "#CF6679", fontFamily: "sans-serif", fontSize: 13, flexShrink: 0 }}>{correct ? "✓" : `✗${q.correctAnswer}`}</span>}
          </div>
        </div>
      );
    }

    if (q.type === "mcq") {
      return (
        <div key={q.id} style={baseCard}>
          <div style={{ fontSize: 13, color: "#E8E0D0", marginBottom: 8, lineHeight: 1.5 }}>{qNum}{q.question}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {q.options.map(opt => {
              const letter = opt[0];
              const sel = val === letter;
              const isRight = letter === q.correctAnswer;
              const bg = isSubmitted ? (isRight ? "#1A3A1E" : (sel ? "#3A1A1E" : "#0F1117")) : (sel ? "#1E2040" : "#0F1117");
              const bc = isSubmitted ? (isRight ? "#5BAF73" : (sel ? "#CF6679" : "#2A2D3E")) : (sel ? "#C8A951" : "#2A2D3E");
              return (
                <button key={letter} onClick={() => !isSubmitted && setAns(q.id, letter)} style={{ background: bg, border: `1px solid ${bc}`, borderRadius: 6, padding: "7px 12px", cursor: isSubmitted ? "default" : "pointer", color: "#C8C0B0", fontFamily: "Georgia, serif", fontSize: 12, textAlign: "left" }}>
                  {opt}{isSubmitted && isRight && " ✓"}{isSubmitted && sel && !isRight && " ✗"}
                </button>
              );
            })}
          </div>
          {isSubmitted && !correct && <div style={{ fontSize: 11, color: "#6A6458", marginTop: 6 }}>✗ Correct: {q.correctAnswer}</div>}
        </div>
      );
    }

    if (q.type === "short-answer") {
      return (
        <div key={q.id} style={baseCard}>
          <div style={{ fontSize: 11, color: "#5A5448", fontFamily: "sans-serif", marginBottom: 4 }}>NO MORE THAN {q.wordLimit}</div>
          <div style={{ fontSize: 13, color: "#C8C0B0", marginBottom: 8, lineHeight: 1.6 }}>{qNum}{q.question}</div>
          <input value={val} onChange={e => !isSubmitted && setAns(q.id, e.target.value)} placeholder="Your answer..." style={{ background: "#0F1117", border: `1px solid ${isSubmitted ? (correct ? "#5BAF73" : "#CF6679") : "#3A3D4E"}`, borderRadius: 5, padding: "7px 10px", color: "#E8E0D0", fontFamily: "Georgia, serif", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box" }} />
          {isSubmitted && <div style={{ fontSize: 11, color: correct ? "#5BAF73" : "#CF6679", marginTop: 4 }}>
            {correct ? "✓ Correct" : `✗ Answer: ${q.correctAnswer}`}
          </div>}
        </div>
      );
    }

    if (q.type === "matching-info") {
      return (
        <div key={q.id} style={baseCard}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ flexShrink: 0 }}>{qNum}</span>
            <span style={{ fontSize: 13, color: "#C8C0B0", flex: 1, lineHeight: 1.5 }}>{q.statement}</span>
            <select value={val} onChange={e => !isSubmitted && setAns(q.id, e.target.value)} style={{ background: "#0F1117", border: "1px solid #3A3D4E", borderRadius: 5, padding: "6px 8px", color: "#E8E0D0", fontFamily: "sans-serif", fontSize: 13, cursor: isSubmitted ? "default" : "pointer", flexShrink: 0 }}>
              <option value="">—</option>
              {q.paragraphOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {isSubmitted && <span style={{ color: correct ? "#5BAF73" : "#CF6679", flexShrink: 0, fontFamily: "sans-serif" }}>{correct ? "✓" : `✗→${q.correctAnswer}`}</span>}
          </div>
        </div>
      );
    }

    return null;
  };

  // ---- START SCREEN ----
  if (testState === "start") {
    return (
      <div style={{ minHeight: "100vh", background: "#0F1117", fontFamily: "Georgia, serif", color: "#E8E0D0", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#13161F", borderBottom: "1px solid #2A2D3E", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onExit} style={{ background: "transparent", border: "1px solid #3A3D4E", borderRadius: 6, padding: "7px 14px", cursor: "pointer", color: "#8A8070", fontFamily: "sans-serif", fontSize: 12 }}>← Back to Study</button>
          <span style={{ fontSize: 11, letterSpacing: 3, color: "#C8A951", textTransform: "uppercase", fontFamily: "sans-serif" }}>IELTS MASTERCLASS — FULL PRACTICE TEST</span>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}>
          <div style={{ maxWidth: 640, width: "100%" }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>📝</div>
              <h1 style={{ fontSize: 32, margin: "0 0 12px", color: "#F0E8D0" }}>IELTS Academic Reading</h1>
              <p style={{ fontSize: 16, color: "#B0A898", margin: 0 }}>Full Practice Test — 60 Minutes · 40 Questions · 3 Passages</p>
            </div>
            <div style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <div style={{ fontSize: 12, letterSpacing: 2, color: "#C8A951", fontFamily: "sans-serif", marginBottom: 16 }}>TEST OVERVIEW</div>
              {[
                { label: "Passage 1", desc: "The Story of Coffee", types: "True/False/Not Given (Q1–7) + Sentence Completion (Q8–13)" },
                { label: "Passage 2", desc: "The Rise of Smart Cities", types: "Matching Headings (Q14–18) + Multiple Choice (Q19–22) + Short Answer (Q23–26)" },
                { label: "Passage 3", desc: "The Science of Memory", types: "Matching Information (Q27–31) + True/False/Not Given (Q32–37) + Multiple Choice (Q38–40)" }
              ].map((p, i) => (
                <div key={i} style={{ borderBottom: i < 2 ? "1px solid #2A2D3E" : "none", paddingBottom: i < 2 ? 14 : 0, marginBottom: i < 2 ? 14 : 0 }}>
                  <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#C8A951", marginBottom: 3 }}>{p.label}: {p.desc}</div>
                  <div style={{ fontSize: 13, color: "#8A8070" }}>{p.types}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "#1A1A10", border: "1px solid #C8A95140", borderRadius: 12, padding: 16, marginBottom: 28 }}>
              <div style={{ fontSize: 12, color: "#C8A951", fontFamily: "sans-serif", marginBottom: 8 }}>⚠️ INSTRUCTIONS</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: "#B0A898", fontSize: 13, lineHeight: 1.9 }}>
                <li>The timer starts as soon as you click Begin. You have exactly 60 minutes.</li>
                <li>You can navigate freely between all three passages during the test.</li>
                <li>Answers are checked only when you submit. No feedback is given during the test.</li>
                <li>There is NO penalty for wrong answers — attempt every question.</li>
                <li>Answers must come from the passage — do not use outside knowledge.</li>
              </ul>
            </div>
            <button onClick={() => setTestState("inprogress")} style={{ width: "100%", background: "linear-gradient(135deg, #C8A951, #8B6914)", border: "none", borderRadius: 10, padding: "16px 0", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 16, fontWeight: "bold", letterSpacing: 1 }}>
              ▶ BEGIN 60-MINUTE TEST
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- RESULTS SCREEN ----
  if (testState === "submitted") {
    const p1qs = passageQs(1); const p2qs = passageQs(2); const p3qs = passageQs(3);
    const p1score = p1qs.filter(q => checkTestAnswer(q, answers[q.id])).length;
    const p2score = p2qs.filter(q => checkTestAnswer(q, answers[q.id])).length;
    const p3score = p3qs.filter(q => checkTestAnswer(q, answers[q.id])).length;
    const bandColor = parseFloat(band) >= 7 ? "#5BAF73" : parseFloat(band) >= 5.5 ? "#C8A951" : "#CF6679";
    return (
      <div style={{ minHeight: "100vh", background: "#0F1117", fontFamily: "Georgia, serif", color: "#E8E0D0" }}>
        <div style={{ background: "#13161F", borderBottom: "1px solid #2A2D3E", padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onExit} style={{ background: "transparent", border: "1px solid #3A3D4E", borderRadius: 6, padding: "7px 14px", cursor: "pointer", color: "#8A8070", fontFamily: "sans-serif", fontSize: 12 }}>← Study Mode</button>
          <span style={{ fontSize: 11, letterSpacing: 3, color: "#C8A951", textTransform: "uppercase", fontFamily: "sans-serif" }}>TEST RESULTS</span>
        </div>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
          {/* Score summary */}
          <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 160, background: "#1A1D2E", border: `1px solid ${bandColor}40`, borderRadius: 12, padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#6A6458", fontFamily: "sans-serif", letterSpacing: 2, marginBottom: 8 }}>TOTAL SCORE</div>
              <div style={{ fontSize: 56, fontWeight: "bold", color: bandColor, lineHeight: 1 }}>{score}</div>
              <div style={{ fontSize: 16, color: "#6A6458" }}>/ 40</div>
            </div>
            <div style={{ flex: 1, minWidth: 160, background: "#1A1D2E", border: `1px solid ${bandColor}40`, borderRadius: 12, padding: 24, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "#6A6458", fontFamily: "sans-serif", letterSpacing: 2, marginBottom: 8 }}>ESTIMATED BAND</div>
              <div style={{ fontSize: 56, fontWeight: "bold", color: bandColor, lineHeight: 1 }}>{band}</div>
              <div style={{ fontSize: 13, color: "#6A6458" }}>IELTS Band Score</div>
            </div>
            {[{ label: "Passage 1", score: p1score, total: p1qs.length }, { label: "Passage 2", score: p2score, total: p2qs.length }, { label: "Passage 3", score: p3score, total: p3qs.length }].map((p, i) => (
              <div key={i} style={{ flex: 1, minWidth: 120, background: "#13161F", border: "1px solid #2A2D3E", borderRadius: 12, padding: 20, textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "#6A6458", fontFamily: "sans-serif", letterSpacing: 1, marginBottom: 6 }}>{p.label}</div>
                <div style={{ fontSize: 32, fontWeight: "bold", color: "#C8A951" }}>{p.score}</div>
                <div style={{ fontSize: 13, color: "#5A5448" }}>/ {p.total}</div>
              </div>
            ))}
          </div>

          {/* Band score table */}
          <div style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 10, padding: 16, marginBottom: 28 }}>
            <div style={{ fontSize: 11, letterSpacing: 2, color: "#C8A951", fontFamily: "sans-serif", marginBottom: 12 }}>BAND SCORE REFERENCE</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {[{r:"39-40",b:"9.0"},{r:"37-38",b:"8.5"},{r:"35-36",b:"8.0"},{r:"33-34",b:"7.5"},{r:"30-32",b:"7.0"},{r:"27-29",b:"6.5"},{r:"23-26",b:"6.0"},{r:"20-22",b:"5.5"},{r:"16-19",b:"5.0"},{r:"13-15",b:"4.5"},{r:"10-12",b:"4.0"}].map(({ r, b }) => {
                const isCurrent = b === band;
                return (
                  <div key={r} style={{ background: isCurrent ? "#C8A95122" : "#0F1117", border: `1px solid ${isCurrent ? "#C8A951" : "#2A2D3E"}`, borderRadius: 6, padding: "4px 10px", fontSize: 12, fontFamily: "sans-serif", color: isCurrent ? "#C8A951" : "#6A6458" }}>
                    {r} → <strong>{b}</strong>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Per-question breakdown — all 3 passages */}
          {[testPassages[0], testPassages[1], testPassages[2]].map(p => (
            <div key={p.id} style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 14, fontWeight: "bold", color: "#F0E8D0", marginBottom: 12, fontFamily: "sans-serif", background: "#1A1D2E", padding: "10px 16px", borderRadius: 8 }}>
                📄 Passage {p.id}: {p.title} — {passageQs(p.id).filter(q => checkTestAnswer(q, answers[q.id])).length}/{passageQs(p.id).length} correct
              </div>
              {passageQs(p.id).map(q => renderQ(q))}
            </div>
          ))}
          <button onClick={onExit} style={{ width: "100%", background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 10, padding: 14, cursor: "pointer", color: "#C8A951", fontFamily: "sans-serif", fontSize: 14, marginTop: 8 }}>
            Return to Study Mode
          </button>
        </div>
      </div>
    );
  }

  // ---- IN PROGRESS ----
  const timerColor = timeLeft < 300 ? "#CF6679" : timeLeft < 600 ? "#C8A951" : "#5BAF73";
  const passage = testPassages[currentPassage - 1];
  const qs = passageQs(currentPassage);

  // Group questions by type block for display
  const qBlocks = [];
  let i = 0;
  while (i < qs.length) {
    const type = qs[i].type;
    const block = [qs[i]];
    while (i + 1 < qs.length && qs[i + 1].type === type) { i++; block.push(qs[i]); }
    qBlocks.push({ type, questions: block });
    i++;
  }

  const typeLabels = {
    tfng: "TRUE / FALSE / NOT GIVEN",
    "sentence-completion": "SENTENCE COMPLETION",
    "matching-headings": "MATCHING HEADINGS",
    mcq: "MULTIPLE CHOICE",
    "short-answer": "SHORT ANSWER QUESTIONS",
    "matching-info": "MATCHING INFORMATION"
  };

  const typeInstructions = {
    tfng: "Do the following statements agree with the information in the passage? Write TRUE, FALSE, or NOT GIVEN.",
    "sentence-completion": "Complete the sentences below. Use the word limit specified for each question.",
    "matching-headings": "Choose the correct heading for each paragraph from the list of headings below.",
    mcq: "Choose the correct letter, A, B, C or D.",
    "short-answer": "Answer the questions using the specified number of words from the passage.",
    "matching-info": "Which paragraph contains the following information? Write the correct letter (A–E)."
  };

  const answered = Object.keys(answers).filter(k => answers[k] && answers[k] !== "--").length;

  return (
    <div style={{ minHeight: "100vh", background: "#0F1117", fontFamily: "Georgia, serif", color: "#E8E0D0", display: "flex", flexDirection: "column" }}>
      {/* Test Header */}
      <div style={{ background: "#13161F", borderBottom: "1px solid #2A2D3E", padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div style={{ fontSize: 14, fontFamily: "sans-serif", color: timerColor, fontWeight: "bold", minWidth: 60, fontVariantNumeric: "tabular-nums" }}>
          ⏱ {formatTime(timeLeft)}
        </div>
        <div style={{ display: "flex", gap: 6, flex: 1, justifyContent: "center" }}>
          {[1, 2, 3].map(n => (
            <button key={n} onClick={() => setCurrentPassage(n)} style={{ background: currentPassage === n ? "#C8A951" : "#1A1D2E", border: `1px solid ${currentPassage === n ? "#C8A951" : "#2A2D3E"}`, borderRadius: 6, padding: "7px 16px", cursor: "pointer", color: currentPassage === n ? "#000" : "#B0A898", fontFamily: "sans-serif", fontSize: 12, fontWeight: currentPassage === n ? "bold" : "normal" }}>
              Passage {n}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "#5A5448", fontFamily: "sans-serif" }}>{answered}/40 answered</div>
        <button onClick={() => { clearInterval(timerRef.current); setTestState("submitted"); }} style={{ background: "#CF6679", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer", color: "#fff", fontFamily: "sans-serif", fontSize: 12, fontWeight: "bold" }}>Submit Test</button>
      </div>

      {/* Passage + Questions */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Passage Pane */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", borderRight: "1px solid #2A2D3E" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#C8A951", fontFamily: "sans-serif", marginBottom: 8, textTransform: "uppercase" }}>Passage {currentPassage}</div>
          <h2 style={{ fontSize: 20, margin: "0 0 16px", color: "#F0E8D0" }}>{passage.title}</h2>
          {passage.type === "continuous" ? (
            <div style={{ fontSize: 14, lineHeight: 1.9, color: "#C8C0B0" }}>
              {passage.text.split("\n\n").map((para, i) => <p key={i} style={{ margin: "0 0 16px" }}>{para}</p>)}
            </div>
          ) : (
            <div>
              {passage.paragraphs.map(p => (
                <div key={p.label} style={{ marginBottom: 16 }}>
                  <span style={{ fontWeight: "bold", color: "#C8A951", fontFamily: "sans-serif", fontSize: 13, marginRight: 6 }}>{p.label}</span>
                  <span style={{ fontSize: 14, lineHeight: 1.9, color: "#C8C0B0" }}>{p.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Questions Pane */}
        <div style={{ width: 420, overflowY: "auto", padding: "20px 20px", flexShrink: 0 }}>
          {/* Matching headings options (passage 2 only) */}
          {currentPassage === 2 && (
            <div style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 8, padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#C8A951", fontFamily: "sans-serif", marginBottom: 8 }}>LIST OF HEADINGS</div>
              {HEADING_OPTIONS.map(h => (
                <div key={h.key} style={{ fontSize: 12, color: "#B0A898", padding: "2px 0" }}>
                  <span style={{ color: "#C8A951", fontWeight: "bold" }}>{h.key}.</span> {h.text}
                </div>
              ))}
            </div>
          )}
          {qBlocks.map((block, bi) => (
            <div key={bi} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#5A5448", fontFamily: "sans-serif", marginBottom: 4 }}>
                Questions {block.questions[0].id}–{block.questions[block.questions.length - 1].id}
              </div>
              <div style={{ fontSize: 11, color: "#C8A951", fontFamily: "sans-serif", marginBottom: 4, fontWeight: "bold" }}>
                {typeLabels[block.type]}
              </div>
              <div style={{ fontSize: 11, color: "#6A6458", marginBottom: 10, lineHeight: 1.5, fontStyle: "italic" }}>
                {typeInstructions[block.type]}
              </div>
              {block.questions.map(q => renderQ(q))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// STUDY MODE
// ============================================================
function StudyMode({ onStartTest, onBack }) {
  const [activeId, setActiveId] = useState("overview");
  const [activeTab, setActiveTab] = useState("learn");
  const [expandedTip, setExpandedTip] = useState(null);

  const active = curriculum.find(c => c.id === activeId);
  const exercise = exercises[activeId];

  const selectTopic = (id) => { setActiveId(id); setActiveTab("learn"); setExpandedTip(null); };

  return (
    <div style={{ minHeight: "100vh", background: "#0F1117", fontFamily: "Georgia, serif", color: "#E8E0D0", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1A1D2E 0%, #0F1117 100%)", borderBottom: "1px solid #2A2D3E", padding: "20px 28px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg, #C8A951, #8B6914)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>📚</div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#C8A951", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 2 }}>IELTS MASTERCLASS</div>
          <div style={{ fontSize: 20, fontWeight: "bold", color: "#F0E8D0", lineHeight: 1 }}>Reading Module — Complete Guide</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
          {onBack && <button onClick={onBack} style={{ background: "transparent", border: "1px solid #2A2D3E", borderRadius: 8, padding: "9px 16px", cursor: "pointer", color: "#8A8070", fontFamily: "sans-serif", fontSize: 12 }}>← All Modules</button>}
          <button onClick={onStartTest} style={{ background: "linear-gradient(135deg, #C8A951, #8B6914)", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 0.5 }}>
            📝 Take Full Test (60 min)
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: 232, background: "#13161F", borderRight: "1px solid #2A2D3E", overflowY: "auto", flexShrink: 0, padding: "10px 0" }}>
          {curriculum.map((item) => (
            <button key={item.id} onClick={() => selectTopic(item.id)} style={{ width: "100%", background: activeId === item.id ? `linear-gradient(90deg, ${item.color}22, transparent)` : "transparent", border: "none", borderLeft: activeId === item.id ? `3px solid ${item.color}` : "3px solid transparent", padding: "11px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, textAlign: "left", transition: "all 0.2s" }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 12, color: activeId === item.id ? item.color : "#C8C0B0", fontWeight: activeId === item.id ? "bold" : "normal", fontFamily: "sans-serif", lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ fontSize: 10, color: "#4A4438", fontFamily: "sans-serif", marginTop: 1 }}>{item.subtitle}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            {/* Topic Header */}
            <div style={{ marginBottom: 22 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${active.color}18`, border: `1px solid ${active.color}40`, borderRadius: 6, padding: "5px 12px", marginBottom: 10 }}>
                <span style={{ fontSize: 16 }}>{active.icon}</span>
                <span style={{ fontSize: 10, letterSpacing: 2, color: active.color, textTransform: "uppercase", fontFamily: "sans-serif" }}>{active.subtitle}</span>
              </div>
              <h1 style={{ fontSize: 28, margin: "0 0 10px", color: "#F0E8D0", lineHeight: 1.2 }}>{active.title}</h1>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, marginBottom: 22, borderBottom: "1px solid #2A2D3E", paddingBottom: 0 }}>
              {["learn", "practice"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: "none", border: "none", borderBottom: activeTab === tab ? `2px solid ${active.color}` : "2px solid transparent", padding: "8px 16px", cursor: "pointer", color: activeTab === tab ? active.color : "#6A6458", fontFamily: "sans-serif", fontSize: 13, fontWeight: activeTab === tab ? "bold" : "normal", textTransform: "capitalize", marginBottom: -1, letterSpacing: 0.5, transition: "all 0.15s" }}>
                  {tab === "learn" ? "📖 Learn" : "✏️ Practice"}
                </button>
              ))}
            </div>

            {/* LEARN TAB */}
            {activeTab === "learn" && (
              <div>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "#B0A898", margin: "0 0 22px", fontStyle: "italic", borderLeft: `3px solid ${active.color}`, paddingLeft: 14 }}>
                  {active.content.intro}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
                  {active.content.sections.map((section, i) => (
                    <div key={i} style={{ background: "#1A1D2E", borderRadius: 10, padding: 18, border: "1px solid #2A2D3E" }}>
                      <div style={{ fontSize: 12, fontWeight: "bold", color: active.color, marginBottom: 7, fontFamily: "sans-serif", letterSpacing: 0.5 }}>{section.heading}</div>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#C8C0B0" }}>{section.body}</p>
                    </div>
                  ))}
                </div>
                <div style={{ background: "linear-gradient(135deg, #1E1A10, #1A1D2E)", borderRadius: 12, padding: 22, border: `1px solid ${active.color}40` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: active.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>💡</div>
                    <span style={{ fontSize: 13, fontWeight: "bold", color: active.color, fontFamily: "sans-serif", letterSpacing: 1 }}>INSTRUCTOR TIPS & TRICKS</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {active.content.tips.map((tip, i) => (
                      <div key={i} onClick={() => setExpandedTip(expandedTip === `${activeId}-${i}` ? null : `${activeId}-${i}`)} style={{ background: expandedTip === `${activeId}-${i}` ? `${active.color}15` : "#0F1117", borderRadius: 8, padding: "10px 14px", cursor: "pointer", border: `1px solid ${expandedTip === `${activeId}-${i}` ? active.color + "60" : "#2A2D3E"}`, transition: "all 0.2s", display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: active.color, color: "#000", fontSize: 10, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, fontFamily: "sans-serif" }}>{i + 1}</div>
                        <span style={{ fontSize: 13, lineHeight: 1.65, color: "#C8C0B0" }}>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Nav */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 12 }}>
                  {curriculum.findIndex(c => c.id === activeId) > 0 && (
                    <button onClick={() => selectTopic(curriculum[curriculum.findIndex(c => c.id === activeId) - 1].id)} style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: "#C8C0B0", fontFamily: "sans-serif", fontSize: 12 }}>← Previous</button>
                  )}
                  <div style={{ flex: 1 }} />
                  <button onClick={() => setActiveTab("practice")} style={{ background: `${active.color}22`, border: `1px solid ${active.color}60`, borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: active.color, fontFamily: "sans-serif", fontSize: 12, fontWeight: "bold" }}>✏️ Try Practice Exercise</button>
                  {curriculum.findIndex(c => c.id === activeId) < curriculum.length - 1 && (
                    <button onClick={() => selectTopic(curriculum[curriculum.findIndex(c => c.id === activeId) + 1].id)} style={{ background: active.color, border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 12, fontWeight: "bold" }}>Next →</button>
                  )}
                </div>

                {/* Progress */}
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 10, color: "#4A4438", fontFamily: "sans-serif", letterSpacing: 1 }}>PROGRESS</span>
                    <span style={{ fontSize: 10, color: active.color, fontFamily: "sans-serif" }}>{curriculum.findIndex(c => c.id === activeId) + 1} / {curriculum.length}</span>
                  </div>
                  <div style={{ height: 3, background: "#2A2D3E", borderRadius: 3 }}>
                    <div style={{ height: "100%", borderRadius: 3, background: active.color, width: `${((curriculum.findIndex(c => c.id === activeId) + 1) / curriculum.length) * 100}%`, transition: "width 0.4s ease" }} />
                  </div>
                </div>
              </div>
            )}

            {/* PRACTICE TAB */}
            {activeTab === "practice" && exercise && (
              <PracticeExercise exercise={exercise} color={active.color} />
            )}
            {activeTab === "practice" && !exercise && (
              <div style={{ padding: 40, textAlign: "center", color: "#5A5448", fontSize: 14 }}>No practice exercise available for this topic yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// WRITING CURRICULUM DATA
// ============================================================
const writingCurriculum = [
  {
    id: "w-overview", icon: "📋", title: "Overview & Format", subtitle: "The foundation of IELTS Writing", color: "#C8A951",
    content: {
      intro: "IELTS Writing is 60 minutes with two tasks. Task 1 requires at least 150 words in 20 minutes; Task 2 requires at least 250 words in 40 minutes. Task 2 carries double the marks. Both tasks are assessed on four criteria, each worth 25%.",
      sections: [
        { heading: "The Four Assessment Criteria", body: "Every task is marked on: (1) Task Achievement/Response — did you fully address the task? (2) Coherence & Cohesion — is your writing logically organised and well-connected? (3) Lexical Resource — how wide and precise is your vocabulary? (4) Grammatical Range & Accuracy — do you use varied grammar correctly? Each criterion contributes exactly 25% to the Writing band score." },
        { heading: "Academic vs General Training", body: "In Academic IELTS, Task 1 asks you to describe visual data: graphs, charts, diagrams, maps, or processes. In General Training, Task 1 is a letter. Task 2 is an essay in BOTH versions. GT essays allow a slightly less formal style, but the assessment criteria and standards remain the same." },
        { heading: "Time Management is Critical", body: "Spend 20 minutes on Task 1 and 40 minutes on Task 2. Never exceed 22 minutes on Task 1 — the marks do not justify the time lost on Task 2. If you run out of time, prioritise Task 2. A complete Task 2 with a brief Task 1 will always outscore the reverse, given Task 2's double weighting." }
      ],
      tips: [
        "Write AT LEAST 150 words for Task 1 and 250 for Task 2 — writing fewer is automatically penalised under Task Achievement.",
        "Task 2 carries double the marks — invest 40 minutes and the majority of your planning effort in it.",
        "Plan before you write: 2–3 minutes for Task 1, 5 minutes for Task 2. Planning prevents mid-essay tangents.",
        "Never copy the question wording into your introduction — always paraphrase using different vocabulary and structure.",
        "Quality over quantity: a focused 260-word Task 2 with strong arguments consistently outscores a rambling 400-word response."
      ]
    }
  },
  {
    id: "w-task1-ac", icon: "📊", title: "Task 1: Academic — Graphs & Charts", subtitle: "Describe, summarise, compare", color: "#5B8DB8",
    content: {
      intro: "Academic Task 1 requires you to describe and summarise visual data (graphs, charts, tables, diagrams, or maps) in at least 150 words. You are NOT asked for your opinion. Your job is to accurately report key features and make relevant comparisons. Do not explain WHY trends occurred.",
      sections: [
        { heading: "Types of Visual Data", body: "Line graphs show trends over time. Bar charts compare categories or groups. Pie charts show proportions. Tables present multiple data sets. Process diagrams show stages in sequence. Maps show geographic change. Each type requires slightly different language but all follow the same 4-part structure: introduction, overview, and two detail paragraphs." },
        { heading: "The 4-Part Structure", body: "Introduction: Paraphrase the task description — never copy. Change vocabulary and sentence structure. Overview: State the 2–3 most significant trends WITHOUT specific figures. This is the most important paragraph and is required for Band 7+. Detail paragraphs: Support your overview with specific data, comparisons, and figures. Group related data for a more analytical response." },
        { heading: "The Overview — Your Most Critical Paragraph", body: "The overview captures the big picture without numbers. For a line graph: what are the general trends? For a pie chart: which is largest/smallest? For a process: how many stages and what does it produce? Without a clear overview, Band 7+ is unachievable. The overview shows you understand the data as a whole, not just its individual details." }
      ],
      tips: [
        "Always include specific figures (numbers, percentages, years) in your detail paragraphs — vague descriptions lose marks.",
        "Group data by similarity of trend rather than listing each item separately — this produces a more analytical response.",
        "Build a vocabulary bank of trend language: rose sharply, fell gradually, peaked at, levelled off, fluctuated, remained stable, surged, plummeted.",
        "For comparisons, use: while, whereas, compared to/with, in contrast, by contrast, similarly, both, neither.",
        "NEVER state an opinion or reason WHY trends occurred — just report what the data shows."
      ]
    }
  },
  {
    id: "w-task1-gt", icon: "✉️", title: "Task 1: General Training — Letters", subtitle: "Write with appropriate register", color: "#7CB87C",
    content: {
      intro: "GT Task 1 asks you to write a letter of at least 150 words addressing three bullet points. The letter may be formal, semi-formal, or informal. Your register must be consistent from the first word to the last. Addressing all three bullet points adequately is essential for a strong Task Achievement score.",
      sections: [
        { heading: "Three Letter Types", body: "Formal: written to an unknown authority (company, council, editor). Use 'Dear Sir/Madam', 'Yours faithfully', formal vocabulary, no contractions. Semi-formal: to a known professional contact (landlord, colleague). Use 'Dear Mr/Ms [Name]', 'Yours sincerely', polite but warmer tone. Informal: to a close friend or family member. Use 'Dear [First name]', 'Best wishes/Take care', contractions, conversational language." },
        { heading: "Covering All Three Bullet Points", body: "IELTS gives you three bullet points — each must be addressed with clear development. A common mistake is writing extensively about two points and barely mentioning the third. Read all three before planning and allocate roughly equal space. Each bullet point must receive at least a full, developed sentence — a passing mention is not sufficient." },
        { heading: "Register Consistency", body: "Mixing registers within one letter is penalised under Coherence & Cohesion. A formal letter should not include 'I was really annoyed' — write 'I was deeply dissatisfied'. An informal letter should not open with 'I am writing to inform you' — write 'I'm writing because'. Every vocabulary choice must match your established register, from salutation to sign-off." }
      ],
      tips: [
        "Identify the letter type from the task prompt FIRST — before writing a single word. It determines every vocabulary choice.",
        "Your opening sentence must state your purpose clearly: 'I am writing to complain about...' / 'I wanted to let you know...'",
        "Formal letters never use contractions (I'm, don't, it's) — always write the full forms.",
        "Salutation/closing pairs: 'Dear Sir/Madam' → 'Yours faithfully'; 'Dear Mr/Ms [Name]' → 'Yours sincerely'; informal → 'Best wishes/Take care'.",
        "End with a forward-looking line before your sign-off: 'I look forward to hearing from you at your earliest convenience.'"
      ]
    }
  },
  {
    id: "w-task2-types", icon: "📝", title: "Task 2: Essay Types", subtitle: "Know your question before you write", color: "#B87CB8",
    content: {
      intro: "IELTS Task 2 essays come in distinct types. Misidentifying the question type leads to an essay that misses the task — the most common cause of low Task Response scores. Always spend 30 seconds identifying the essay type before planning.",
      sections: [
        { heading: "Opinion (Agree/Disagree)", body: "Key phrases: 'To what extent do you agree or disagree?', 'Do you agree or disagree?'. You must state a clear personal position and defend it throughout. Don't sit on the fence without structure — partial agreement requires arguing both sides clearly. Your opinion must appear in the introduction AND conclusion." },
        { heading: "Discussion (Both Views + Opinion)", body: "Key phrases: 'Discuss both views and give your own opinion'. You must represent BOTH perspectives fairly, then state your own position (usually in a final paragraph). This is NOT an opinion essay — arguing only one side in a Discussion essay caps your Task Response at Band 5–6." },
        { heading: "Problem-Solution & Other Types", body: "Causes & Solutions: 'What are the causes? What solutions can be proposed?' — cover both parts equally. Advantages-Disadvantages: 'Do the advantages outweigh the disadvantages?' — discuss both sides and reach a definitive position on which outweighs. Two-part questions: two separate questions in one prompt — answer BOTH with equal depth." }
      ],
      tips: [
        "Circle the KEY INSTRUCTION WORD: 'discuss', 'agree/disagree', 'causes', 'solutions', 'outweigh'. It defines your essay's entire structure.",
        "Opinion essays need a CLEAR personal stance — 'there are merits to both sides' without a position = Band 5 Task Response.",
        "Discussion essays need BOTH views — arguing only one side = capped at Band 6 maximum.",
        "Two-part questions: each question deserves equal depth — don't let one dominate.",
        "Re-read the full prompt including the background context before the question — it clarifies what's relevant."
      ]
    }
  },
  {
    id: "w-task2-structure", icon: "🏗️", title: "Task 2: Structure & Planning", subtitle: "Build a clear, logical essay", color: "#B87C7C",
    content: {
      intro: "IELTS essays don't need to be creative — they need to be clear and logically structured. A well-planned 4-paragraph essay with strong arguments consistently outperforms disorganised, long-winded writing. Always plan for 5 minutes before writing.",
      sections: [
        { heading: "The 4-Paragraph Essay Structure", body: "Introduction (2–3 sentences): Background + thesis. Body Paragraph 1 (90–110 words): First main argument or perspective, fully developed with example. Body Paragraph 2 (90–110 words): Second argument or opposing perspective, developed with example. Conclusion (3–4 sentences): Restate thesis with different words + final recommendation or prediction. Aim for 280–330 words total." },
        { heading: "The PEEL Paragraph Method", body: "Point (topic sentence — state your argument), Explain (develop and justify WHY), Evidence/Example (specific, believable example — a country, study, or real-world case), Link (optional — connect to the question or set up the next point). One clear argument per paragraph. Never crowd two arguments into one body paragraph — it creates incoherence." },
        { heading: "Writing a Strong Introduction", body: "Formula: (1) Paraphrase the background context from the prompt in your own words. (2) State your thesis — what you will argue. For opinion: 'This essay argues that...'. For discussion: 'This essay will examine both perspectives before concluding that...'. Keep it to 2–3 sentences. Never begin with 'In today's modern world' or 'Nowadays in modern society' — these are Band 5 clichés." }
      ],
      tips: [
        "Plan your body paragraph TOPICS before writing the introduction — this ensures your thesis reflects what you actually argue.",
        "Each body paragraph must contain ONE main idea — crowding two arguments into one paragraph destroys logical structure.",
        "Your conclusion must NEVER introduce new ideas or evidence — only summarise and make a final statement.",
        "Word targets: Introduction 55w / Body 1: 100w / Body 2: 100w / Conclusion 45w = approx. 300 words.",
        "PEEL ensures every paragraph has both an argument AND evidence — without evidence, paragraphs feel vague and underdeveloped."
      ]
    }
  },
  {
    id: "w-arguments", icon: "💡", title: "Building Strong Arguments", subtitle: "Claim, reason, example — in that order", color: "#7CB8B8",
    content: {
      intro: "The difference between Band 6 and Band 7 Task Response is almost always argument quality. Band 6 makes assertions; Band 7+ proves them. The CRE framework — Claim → Reason → Example — applied to every body paragraph is the single most reliable path to Band 7.",
      sections: [
        { heading: "The CRE Framework in Practice", body: "Claim: 'Regular physical activity significantly improves mental health.' Reason: 'Exercise releases endorphins and reduces cortisol levels, directly alleviating anxiety and depression symptoms.' Example: 'Research across 12 countries found that adults exercising three times weekly reported 40% lower rates of clinical depression.' Each part is essential — a claim without a reason is an assertion; a reason without evidence is speculation." },
        { heading: "Specific vs Vague Examples", body: "WEAK: 'For example, many countries have benefited from this approach.' STRONG: 'Finland, consistently ranked among the world's happiest nations, has invested heavily in outdoor recreational infrastructure — a factor researchers link directly to population wellbeing outcomes.' IELTS examiners do not fact-check. Plausible, specific, and relevant is all that's required." },
        { heading: "Concession Language — Show Sophistication", body: "Acknowledging the opposing view before refuting it demonstrates critical thinking and raises Task Achievement and Coherence scores. Use: 'While it is true that...', 'Admittedly...', 'Although some argue...', 'It cannot be denied that...'. Always follow a concession with a rebuttal: 'however', 'nevertheless', 'that said', 'even so'." }
      ],
      tips: [
        "Apply the 'because/which means' test: if you can't finish either phrase after your claim, the argument isn't developed enough.",
        "Avoid vague examples: 'many people', 'some studies', 'in certain countries' — these are Band 5–6 signals.",
        "One strong, specific example per paragraph outweighs two vague ones — quality beats quantity every time.",
        "Concessions show intellectual maturity and earn marks: 'While technology displaces some roles, it simultaneously creates industries that did not exist a decade ago.'",
        "First-person is acceptable in opinion essays: 'I argue', 'In my view', 'I firmly believe'. Avoid 'I think' — it sounds too casual for academic writing."
      ]
    }
  },
  {
    id: "w-cohesion", icon: "🔗", title: "Coherence & Cohesion", subtitle: "Guide the reader through your logic", color: "#B8A47C",
    content: {
      intro: "Coherence is logical organisation — ideas appear in a clear, sensible sequence. Cohesion is the linguistic tools that connect ideas: linking words, reference words, and transitions. Together they make writing feel smooth and professional rather than mechanical or choppy.",
      sections: [
        { heading: "Linking Words by Function", body: "Addition: furthermore, moreover, in addition, additionally. Contrast: however, nevertheless, on the other hand, whereas, while, yet. Cause & Effect: therefore, consequently, as a result, thus, hence. Example: for instance, for example, to illustrate, such as, namely. Concession: although, despite, even though, admittedly. Conclusion: in conclusion, overall, to summarise, ultimately, it is clear that." },
        { heading: "The Danger of Over-Using Linkers", body: "A Band 5–6 hallmark: 'Firstly... Secondly... Thirdly... Finally...' — mechanical and predictable. Examiners want NATURAL cohesion. Not every sentence needs an explicit connector. Use a variety of methods: sometimes a reference word ('This approach...'), sometimes a linker ('Nevertheless...'), sometimes just implicit logic between ideas." },
        { heading: "Reference Chains — Reduce Repetition", body: "Instead of repeating 'social media' in every sentence, use reference words: 'Social media has transformed communication. This platform has enabled... Such technology has...'. Using 'this', 'these', 'such', 'it', 'they', 'the former/latter', 'the aforementioned' reduces repetition and improves both cohesion and lexical resource scores simultaneously." }
      ],
      tips: [
        "Never start more than 2 consecutive sentences with the same word — it signals low cohesion.",
        "The first sentence of each body paragraph should signal a NEW main idea, not just attach a connector word.",
        "Vary your linkers — using 'however' five times creates a repetition penalty under Lexical Resource.",
        "Conclusions: avoid the formulaic 'In conclusion, in this essay I have discussed...' — try 'Overall, it is clear that...' or 'Ultimately, the evidence suggests...'",
        "Read your writing aloud after drafting — if it sounds choppy or disconnected, add or adjust transitions."
      ]
    }
  },
  {
    id: "w-lexical", icon: "📚", title: "Lexical Resource", subtitle: "Precision, range, and natural collocation", color: "#8B7CB8",
    content: {
      intro: "Lexical Resource measures not just how many words you know, but how precisely, naturally, and variedly you use them. Using a range of vocabulary accurately — including less common words with appropriate style — is what achieves Band 7 and above.",
      sections: [
        { heading: "Collocations Over Individual Words", body: "Native speakers know which words go together. 'Make a decision' (not 'do a decision'). 'Heavy traffic' (not 'strong traffic'). 'Raise awareness' (not 'grow awareness'). 'Pose a challenge' (not 'make a challenge'). 'Have a significant impact' (not 'do a significant impact'). Learning collocations separates Band 6 from Band 7+ Lexical Resource." },
        { heading: "Paraphrasing the Question", body: "Your introduction must restate the prompt WITHOUT copying it. Change: (1) Content words to synonyms — 'children' → 'young people', 'problems' → 'challenges'. (2) Word forms — noun → verb → adjective. (3) Sentence structure — active to passive, clause order changed. Copying the task verbatim earns zero marks for those sentences — examiners call it 'lifting'." },
        { heading: "Hedging Language in Academic Writing", body: "Academic writing avoids absolute claims. Hedge to show nuance: 'tend to', 'appear to', 'may', 'might', 'could', 'it is arguable that', 'evidence suggests'. Compare: 'Technology is destroying society.' (overconfident, simplistic) vs 'Technology appears to be reshaping social interactions in complex ways, with both documented benefits and concerning drawbacks.' (nuanced, academic)." }
      ],
      tips: [
        "Learn word FAMILIES: innovate / innovation / innovative / innovatively. Using varied word forms shows both lexical and grammatical range.",
        "Replace simple words: 'good' → beneficial, advantageous; 'bad' → detrimental, harmful; 'big' → substantial, considerable, extensive.",
        "Check collocations before using them — a wrong collocation is worse than a simpler correct word.",
        "For Task 1 graphs, build a verb bank: surge, plummet, stabilise, peak at, decline gradually, fluctuate, recover, overtake.",
        "Avoid thesaurus-hopping: 'commence' doesn't replace 'start' in every context. Appropriateness matters as much as range."
      ]
    }
  },
  {
    id: "w-grammar", icon: "⚙️", title: "Grammatical Range & Accuracy", subtitle: "Variety without errors", color: "#C85B5B",
    content: {
      intro: "IELTS rewards both grammatical RANGE (using varied structures) and ACCURACY (using them correctly). A simple but error-free response scores higher than a complex but error-filled one. Your goal is controlled range — attempt complex structures, but accurately.",
      sections: [
        { heading: "Sentence Types to Demonstrate Range", body: "Simple: 'Governments must invest in renewable energy.' Compound: 'The population is ageing, and healthcare costs are rising.' Complex (most important): 'Although technology has created new sectors, it has simultaneously displaced low-skilled workers.' Relative clauses: 'Countries that invest heavily in education tend to have stronger economies.' Passive: 'Significant progress has been made in reducing carbon emissions globally.'" },
        { heading: "Common Grammar Errors to Avoid", body: "Subject-verb agreement: 'The number of cars IS increasing' (not 'are'). Articles: 'the environment' (specific), 'an increase' (first mention). Tense consistency: pick a primary tense and maintain it. Sentence fragments: every sentence needs a subject and finite verb. Run-on sentences: 'Technology is advancing people are losing jobs' needs a connector or punctuation. Missing -s on third-person singular verbs." },
        { heading: "The Passive Voice in Academic Writing", body: "The passive removes the agent and creates objective, formal tone. Active: 'The government introduced new policies.' Passive: 'New policies were introduced in 2020.' For process diagrams: 'The mixture is heated to 80°C', 'The water is filtered through three layers'. For Task 2: passive voice is useful for distancing from personal attribution and raising academic register." }
      ],
      tips: [
        "Include at least one complex sentence with a subordinate clause ('although', 'while', 'because', 'since', 'which', 'that') in every body paragraph.",
        "If uncertain about a complex structure, use a simpler structure accurately — errors cost more than simplicity.",
        "Vary sentence BEGINNINGS: not every sentence should start with 'The' or 'This'. Try 'Although...', 'Despite...', 'In recent years...'",
        "Articles (a/an/the) generate the most errors — 'the' for specific/shared knowledge; 'a/an' for first mention of countable nouns.",
        "Reserve the last 2 minutes for proofreading: look specifically for missing -s on third-person verbs, wrong articles, and tense inconsistencies."
      ]
    }
  },
  {
    id: "w-band", icon: "🎯", title: "Band Score Criteria", subtitle: "What examiners actually look for", color: "#B8B87C",
    content: {
      intro: "Each Writing task is scored on four criteria, each worth 25%. Understanding exactly what separates Band 5, 6, 7, and 8 gives you a concrete target. Most test-takers plateau at Band 6 not because they lack ability, but because they don't know what Band 7 specifically requires.",
      sections: [
        { heading: "Task Achievement/Response", body: "Band 5: Task addressed but incompletely; ideas present but underdeveloped. Band 6: Main points covered; some over-generalisation; limited range of support. Band 7: All parts addressed; clear position maintained; main ideas extended and supported with evidence. Band 8: All parts fully addressed; well-developed position; relevant, extended, supported ideas throughout. The leap from 6 to 7: DEVELOPMENT with specific evidence." },
        { heading: "Coherence & Cohesion", body: "Band 5: Some organisation but inconsistent; limited cohesive devices; may be repetitive. Band 6: Coherent arrangement; uses cohesive devices but sometimes faulty or mechanical. Band 7: Logically organised; uses range of cohesive devices flexibly; clear paragraph progression. Band 8: Seamless cohesion; paragraphs are purposeful; reference and substitution used skilfully with no awkwardness." },
        { heading: "Lexical Resource & Grammar", body: "Lexical Band 6: Adequate range; errors in word choice or collocation. Band 7: Sufficient range; less common items attempted; style awareness; rare errors. Band 8: Wide range; skilful uncommon lexis; very rare errors. Grammar Band 6: Mix of simple and complex structures; errors in complex sentences. Band 7: Variety of complex structures; frequent error-free sentences; good control. Band 8: Wide range; majority error-free." }
      ],
      tips: [
        "The Band 6 trap: addressing all parts but not developing any of them fully with specific evidence.",
        "For Band 7 Lexical Resource: use at least 3–4 less common, accurate collocations per task without errors.",
        "For Band 7 Grammar: aim for 60–70% of sentences to be error-free; include at least one relative clause and one complex sentence per body paragraph.",
        "Self-check after writing: 'Have I answered EVERY part of this question?' Missing a task element is the most common Band 6–7 differentiator.",
        "Know the Band 7 descriptor for each criterion by heart — if you can describe what Band 7 looks like, you can target it deliberately."
      ]
    }
  }
];

// ============================================================
// WRITING EXERCISES DATA
// ============================================================
const writingExercises = {
  "w-overview": {
    type: "quiz", title: "Format & Rules Quiz",
    description: "Test your knowledge of IELTS Writing format, timing, and assessment criteria.",
    questions: [
      { id: 1, question: "How long is the IELTS Writing test in total?", options: ["30 minutes", "45 minutes", "60 minutes", "90 minutes"], correct: 2, explanation: "IELTS Writing is 60 minutes: 20 minutes recommended for Task 1, 40 minutes for Task 2." },
      { id: 2, question: "Which task carries more marks?", options: ["Task 1, because it comes first", "Both tasks are worth equal marks", "Task 2, because it requires greater length and complexity", "Neither — marks depend on performance only"], correct: 2, explanation: "Task 2 is worth double the marks of Task 1. Prioritise it if short on time." },
      { id: 3, question: "What happens if you write fewer than 150 words in Task 1?", options: ["Nothing — the examiner won't notice", "A minor deduction only", "You are penalised under Task Achievement as the response is incomplete", "The test is automatically failed"], correct: 2, explanation: "Writing below the minimum word count is penalised under Task Achievement. Examiners may note the response is 'too short to assess' accurately." },
      { id: 4, question: "Which is NOT one of the four IELTS Writing assessment criteria?", options: ["Coherence & Cohesion", "Lexical Resource", "Task Achievement", "Argument Complexity"], correct: 3, explanation: "The four criteria are: Task Achievement/Response, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy." },
      { id: 5, question: "In Academic Task 1, which should you NEVER include?", options: ["Specific figures from the data", "An overview of main trends", "Your opinion on why trends occurred", "Comparisons between data sets"], correct: 2, explanation: "Academic Task 1 asks you to DESCRIBE and SUMMARISE data — not explain causes or give opinions." }
    ]
  },
  "w-task1-ac": {
    type: "quiz", title: "Academic Task 1 Strategies",
    description: "Identify the correct approach to graph and chart description tasks.",
    questions: [
      { id: 1, question: "Which paragraph is MOST important for achieving Band 7+ in Academic Task 1?", options: ["The introduction", "The overview", "The first detail paragraph", "The second detail paragraph"], correct: 1, explanation: "The overview is critical — it shows you can identify the most significant features. Without a clear overview, Band 7 is not achievable." },
      { id: 2, question: "Your Task 1 introduction should:", options: ["Copy the graph title exactly", "State your opinion about the trend", "Paraphrase the description using different vocabulary and structure", "Open immediately with specific 2015 figures"], correct: 2, explanation: "The introduction must paraphrase the task description — change vocabulary, word forms, and sentence structure. Copying earns zero marks for those sentences." },
      { id: 3, question: "Which is an appropriate OVERVIEW for a pie chart: coal 45%, gas 30%, renewables 15%, nuclear 10%?", options: ["Overall, coal was 45%, gas 30%, renewables 15%, and nuclear 10%.", "Overall, coal was the dominant energy source, while nuclear made the smallest contribution.", "In conclusion, renewables represent the most promising energy category.", "The chart illustrates that four types of energy were used."], correct: 1, explanation: "A good overview captures significant features WITHOUT figures — those go in detail paragraphs. Option B identifies the dominant trend at a big-picture level." },
      { id: 4, question: "When describing a process diagram, which tense and voice is most appropriate?", options: ["First person active: 'First, I mix the ingredients'", "Present simple passive: 'The ingredients are mixed'", "Future tense: 'The ingredients will be mixed'", "Present perfect: 'The ingredients have been mixed'"], correct: 1, explanation: "Process diagrams use present simple passive: 'the material is heated', 'the water is filtered'. This is standard academic register for describing processes." },
      { id: 5, question: "You are describing data for five countries. The best organisational strategy is:", options: ["One paragraph per country (five paragraphs)", "Group countries with similar trends or highest/lowest values", "List countries alphabetically", "Describe only the country with the highest value"], correct: 1, explanation: "Grouping by trend creates a more analytical, coherent response than listing each country separately." }
    ]
  },
  "w-task1-gt": {
    type: "quiz", title: "Letter Writing — Register & Format",
    description: "Identify appropriate register and language for different IELTS letter types.",
    questions: [
      { id: 1, question: "You are writing to a company's customer service about a faulty product. What is the correct salutation?", options: ["'Dear John'", "'Dear Sir/Madam'", "'Dear Customer Services'", "'Hi there'"], correct: 1, explanation: "A complaint to an unknown company representative is a formal letter. Use 'Dear Sir/Madam' and close with 'Yours faithfully'." },
      { id: 2, question: "Which salutation/closing pair is CORRECTLY matched?", options: ["'Dear Mr Johnson' → 'Yours faithfully'", "'Dear Sir/Madam' → 'Yours sincerely'", "'Dear Sarah' → 'Yours sincerely'", "'Dear Ms Williams' → 'Yours sincerely'"], correct: 3, explanation: "'Dear Sir/Madam' (unknown) → 'Yours faithfully'. 'Dear [Title Surname]' → 'Yours sincerely'. Option D is a correctly matched semi-formal pair." },
      { id: 3, question: "The task asks you to write about three bullet points. You address two fully but barely mention the third. What is the likely impact?", options: ["No impact — quality of the first two compensates", "Minor impact only", "Significant impact — all three must be adequately covered for a good Task Achievement score", "You will automatically fail"], correct: 2, explanation: "All three bullet points must be clearly and adequately developed. Neglecting one causes significant Task Achievement penalisation." },
      { id: 4, question: "Which sentence is appropriate for an INFORMAL letter to a close friend?", options: ["'I am writing to inform you of my upcoming relocation.'", "'I wanted to let you know that I'm moving soon!'", "'Please be advised that I shall be relocating in the near future.'", "'This letter serves to notify you of my change of residence.'"], correct: 1, explanation: "Informal letters use natural, conversational language with contractions. Options A, C, and D are far too formal for an informal letter." },
      { id: 5, question: "In a formal letter, which should you AVOID?", options: ["Passive voice constructions", "Formal multi-syllabic vocabulary", "Contractions such as I'm, don't, it's", "Specific details supporting your complaint"], correct: 2, explanation: "Contractions are informal and must not appear in formal letters. Write 'I am', 'do not', 'it is'." }
    ]
  },
  "w-task2-types": {
    type: "quiz", title: "Classify the Essay Question",
    description: "Identify the essay type for each Task 2 question — getting this right shapes your entire response.",
    questions: [
      { id: 1, question: "'Some people think university should be free. Others believe students should pay fees. Discuss both views and give your own opinion.' This is:", options: ["Opinion (Agree/Disagree)", "Discussion (Both Views)", "Problem-Solution", "Advantages-Disadvantages"], correct: 1, explanation: "'Discuss both views and give your own opinion' signals a Discussion essay. You MUST represent both perspectives, then state your own position." },
      { id: 2, question: "'In many cities, traffic congestion is serious. What are the main causes? What measures can address it?' This is:", options: ["Discussion essay", "Opinion essay", "Causes and Solutions essay", "Advantages-Disadvantages essay"], correct: 2, explanation: "Two questions: 'What are the causes?' AND 'What solutions?' = Causes & Solutions essay. Cover both equally in separate paragraphs." },
      { id: 3, question: "'To what extent do you agree or disagree that social media has had a negative impact on society?' This requires:", options: ["Presenting both views without a personal stance", "Stating and defending your personal position throughout", "Discussing advantages and disadvantages equally", "Identifying causes and proposing solutions"], correct: 1, explanation: "'To what extent do you agree or disagree?' = Opinion essay. You must state a clear personal position and defend it from introduction to conclusion." },
      { id: 4, question: "'Working from home is increasingly common. Do the advantages outweigh the disadvantages?' This requires:", options: ["Agreeing or disagreeing with the trend", "Presenting only advantages", "Discussing both sides and concluding which outweighs the other", "Analysing causes of the work-from-home trend"], correct: 2, explanation: "An 'outweigh' question: discuss BOTH sides then make a clear judgement on which is stronger. You must take a definitive position." },
      { id: 5, question: "'What are the benefits of learning a second language? How important is it for schools to make it compulsory?' This is:", options: ["A problem-solution essay", "A two-part question essay", "A discussion essay", "An opinion essay"], correct: 1, explanation: "Two separate questions = two-part essay. Both questions must be answered with roughly equal depth — neglecting one = severe Task Achievement penalty." }
    ]
  },
  "w-task2-structure": {
    type: "quiz", title: "Essay Structure & Paragraph Building",
    description: "Test your knowledge of introductions, the PEEL method, and conclusions.",
    questions: [
      { id: 1, question: "Which introduction is stronger for: 'To what extent do you agree that governments should ban fast food advertising?'", options: ["'Nowadays, in today's modern world, fast food is everywhere and very popular.'", "'Whether authorities should prohibit the promotion of unhealthy food products is increasingly debated. This essay fully agrees that such restrictions are necessary to protect public health.'", "'Fast food advertising is banned in some countries. I will discuss both sides.'", "'I am going to write about why fast food advertising should or should not be banned.'"], correct: 1, explanation: "Option B paraphrases the question, states a clear thesis, and signals the essay's direction — all in 2 sentences. Option A is a cliché opener. Option C misidentifies this as a discussion essay." },
      { id: 2, question: "Which is the best TOPIC SENTENCE for a paragraph arguing 'governments should fund public transport'?", options: ["'Public transport is used by many people worldwide.'", "'There are many reasons why this is a good idea.'", "'Expanding public transport networks can significantly reduce urban air pollution.'", "'In this paragraph, I will explain why public transport matters.'"], correct: 2, explanation: "A strong topic sentence makes a SPECIFIC, arguable claim. Option C does this clearly. The others are vague, meta-commentary, or lack focus." },
      { id: 3, question: "You've written: 'Technology is important. It helps people. Many people use it.' The primary weakness is:", options: ["Use of first-person perspective", "Lack of structural variety; repetitive and underdeveloped", "Sentences are too complex", "Grammatical errors throughout"], correct: 1, explanation: "Three short simple sentences demonstrate low grammatical range and underdeveloped ideas. IELTS rewards complex sentences with developed arguments." },
      { id: 4, question: "What should NEVER appear in an IELTS conclusion?", options: ["Restatement of the thesis in different words", "A final prediction or recommendation", "A new argument or evidence not mentioned in the body", "A concise summary of main points"], correct: 2, explanation: "Conclusions only summarise — they never introduce new ideas, arguments, or evidence. New material in the conclusion signals poor essay structure." },
      { id: 5, question: "Using PEEL, which is the STRONGEST Example for 'Internet access promotes economic development'?", options: ["'For example, the internet is used by many businesses.'", "'For instance, in rural Sub-Saharan Africa, mobile internet allows farmers to check market prices in real time, enabling higher sale rates and reduced middleman dependence.'", "'Many studies show the internet benefits economies worldwide.'", "'The internet is good for economies, as we can see in many places.'"], correct: 1, explanation: "Option B is specific (Sub-Saharan Africa, farmers), explains the mechanism (real-time price data), and states the outcome (higher rates, fewer middlemen). This is Band 7+ quality. The others are vague." }
    ]
  },
  "w-arguments": {
    type: "quiz", title: "Argument Quality & Development",
    description: "Distinguish strong, well-developed arguments from weak, vague ones.",
    questions: [
      { id: 1, question: "Which argument is STRONGEST?", options: ["'Exercise is good for health. Many people exercise. This is beneficial.'", "'Regular physical activity reduces chronic disease risk. Countries with high exercise rates, such as the Netherlands, report lower healthcare costs and reduced obesity rates.'", "'There are many benefits of exercise that scientists have confirmed in recent years.'", "'Exercise makes people healthier. Fit people are better than unfit people.'"], correct: 1, explanation: "Option B follows CRE: Claim (reduces disease risk), Reason (lower costs, obesity rates), Example (Netherlands, specific outcomes). Specific, evidenced, and tied to a broader implication." },
      { id: 2, question: "What is concession language and why does IELTS value it?", options: ["Language used to apologise for controversial views", "Language that acknowledges the opposing view before refuting it, demonstrating balanced critical thinking", "Language used when uncertain about a fact", "Language reserved only for discussion essays"], correct: 1, explanation: "Concession language ('While it is true that..., nevertheless...') shows the examiner you can engage critically with multiple perspectives, raising Task Achievement and Coherence scores." },
      { id: 3, question: "Which is the WEAKEST example in an IELTS essay?", options: ["'For instance, Japan's ageing population has led to labour shortages, prompting immigration reform.'", "'For example, in recent years, studies show that many countries have faced various challenges.'", "'WHO research indicates air pollution causes approximately 7 million premature deaths annually.'", "'Singapore's smart city investment reduced energy consumption by 20% between 2010 and 2020.'"], correct: 1, explanation: "Option B is extremely vague — 'recent years', 'many countries', 'various challenges' give no specific information. This is a classic Band 5–6 example." },
      { id: 4, question: "For the Point 'Higher education should be free' and Reason 'financial barriers prevent talented low-income students from reaching their potential', the BEST Example is:", options: ["'For instance, many students cannot afford university fees.'", "'Studies show education is important for many countries.'", "'In Germany, eliminating tuition fees significantly increased first-generation enrolment, particularly among working-class families.'", "'Education helps people find better jobs.'"], correct: 2, explanation: "Option C is specific (Germany), identifies a concrete outcome (increased first-generation enrolment), and names the target group (working-class families). It directly supports the reason stated." },
      { id: 5, question: "A student writes: 'I partially agree with this statement.' This approach requires:", options: ["Nothing specific — partial agreement is always acceptable", "Clear evidence for BOTH sides AND a definitive final position on which is more convincing", "Only evidence for the side they agree with", "A neutral conclusion that avoids committing to either side"], correct: 1, explanation: "Partial agreement is legitimate but demands you argue evidence for BOTH sides clearly, then in the conclusion state definitively which side you ultimately find more compelling." }
    ]
  },
  "w-cohesion": {
    type: "quiz", title: "Coherence, Cohesion & Linking Language",
    description: "Select the most appropriate linking device and cohesion strategy for each context.",
    questions: [
      { id: 1, question: "'Air travel has become more affordable in recent decades. _____, carbon emissions from aviation have increased dramatically.'", options: ["Furthermore", "As a result", "However", "For instance"], correct: 2, explanation: "'However' signals contrast — cheaper travel sounds positive, but emissions increased. 'Furthermore' adds more of the same. 'As a result' implies causation. 'For instance' introduces an example." },
      { id: 2, question: "Which uses cohesive devices MOST naturally and effectively?", options: ["'Firstly, technology is good. Secondly, it helps people. Thirdly, it is important. Finally, we should use it.'", "'Technology offers numerous advantages. In particular, digital tools have transformed healthcare, enabling faster diagnoses and remote monitoring. Such innovations have proved especially valuable in underserved communities.'", "'Technology is good and it is helpful and it is important and we should all use it more.'", "'Firstly technology is good. However it is also bad. Nevertheless it is important.'"], correct: 1, explanation: "Option B uses varied, natural cohesion: 'In particular' (specification), 'Such innovations' (reference substitution). It avoids mechanical 'firstly/secondly/thirdly' and uses connectors that serve the meaning." },
      { id: 3, question: "'The government announced new environmental policies last week. _____ legislation was widely praised by conservation groups.' Best connector:", options: ["However, the", "Therefore, this", "These", "Although these"], correct: 2, explanation: "'These' replaces 'The new environmental policies' — cohesion through substitution rather than repetition. More natural than repeating the full noun phrase or adding an unnecessary connector." },
      { id: 4, question: "Which conclusion opening is STRONGEST for an essay arguing governments should fund arts education?", options: ["'In conclusion, I have discussed arts education.'", "'To summarise, the above points show that arts education is important.'", "'In conclusion, the evidence presented demonstrates that sustained government investment in arts education yields measurable social and cognitive benefits that justify its prioritisation in national budgets.'", "'So, arts education is good and governments should fund it.'"], correct: 2, explanation: "Option C restates the thesis with new vocabulary, is specific, maintains formal register, and closes the argument without new ideas. Options A and B are too vague; D is too informal." },
      { id: 5, question: "A student uses 'however' at the start of six sentences in their essay. The examiner's likely assessment:", options: ["Excellent — demonstrates contrast awareness throughout", "Good — minor variation would improve it slightly", "Problematic — mechanical repetition penalised under Coherence & Cohesion AND Lexical Resource", "Neutral — connectors are always positive regardless of frequency"], correct: 2, explanation: "Overusing any single linker is penalised under both Coherence & Cohesion (mechanical use) and Lexical Resource (repetition). Vary contrast linkers: nevertheless, on the other hand, that said, despite this, yet." }
    ]
  },
  "w-lexical": {
    type: "quiz", title: "Vocabulary Range & Precision",
    description: "Identify stronger, more precise vocabulary choices for IELTS Academic Writing.",
    questions: [
      { id: 1, question: "Which sentence shows the BEST vocabulary for IELTS Academic Writing?", options: ["'A lot of people think the government should do something about the bad air.'", "'Many individuals hold the view that authorities ought to implement measures to address deteriorating air quality.'", "'Everybody thinks the government needs to fix the air problem right now.'", "'People want the government to help with the air quality.'"], correct: 1, explanation: "Option B uses academic vocabulary throughout: 'individuals', 'hold the view', 'authorities', 'implement measures', 'deteriorating air quality'. It avoids informal phrases found in the other options." },
      { id: 2, question: "Which phrase is an example of a CORRECT collocation?", options: ["'make a research'", "'do a mistake'", "'raise awareness'", "'have a strong impact'"], correct: 2, explanation: "'Raise awareness' is the correct collocation. Errors: 'conduct research', 'make a mistake', 'have a significant/major impact' (not 'strong' — 'strong' doesn't collocate with 'impact')." },
      { id: 3, question: "The prompt says 'many young people are learning new skills'. The best paraphrased introduction is:", options: ["'Many young people are learning new skills, which is the topic of this essay.'", "'An increasing number of adolescents are acquiring new competencies in today's rapidly evolving world.'", "'Young people learning new skills is important and this essay will discuss it.'", "'People are studying and this is about their skills.'"], correct: 1, explanation: "Option B changes: 'many' → 'an increasing number of', 'young people' → 'adolescents', 'learning' → 'acquiring', 'skills' → 'competencies'. Effective paraphrasing demonstrated." },
      { id: 4, question: "Which word most accurately completes: 'The number of people using renewable energy has _____ significantly over the past decade.'", options: ["gone", "risen", "got bigger", "become more"], correct: 1, explanation: "'Risen' is precise, formal, and collocates perfectly with 'number'. 'Gone' is vague. 'Got bigger' is informal. 'Become more' is incomplete." },
      { id: 5, question: "To demonstrate Band 7 Lexical Resource, a student should:", options: ["Use the most complex vocabulary possible in every sentence", "Use a range including some less common items, mostly accurately, without excessive repetition", "Stick to simple safe vocabulary to minimise all errors", "Memorise the Academic Word List entirely"], correct: 1, explanation: "Band 7 requires 'sufficient range to allow flexibility and precision; less common items attempted with style awareness; occasional errors that don't impede communication'." }
    ]
  },
  "w-grammar": {
    type: "quiz", title: "Grammar Range & Accuracy",
    description: "Identify grammatical structures and errors relevant to IELTS Writing.",
    questions: [
      { id: 1, question: "Which sentence is grammatically CORRECT?", options: ["'The number of students have increased dramatically.'", "'The number of students has increased dramatically.'", "'The numbers of students is increasing dramatically.'", "'A number of students has increased significantly.'"], correct: 1, explanation: "'The number of' takes a SINGULAR verb ('has'). 'A number of' takes a PLURAL verb ('have'). Example: 'The number of applicants IS rising' but 'A number of applicants ARE waiting'." },
      { id: 2, question: "Which sentence demonstrates the BEST grammatical range for IELTS?", options: ["'Technology is good. It helps people. People use it every day.'", "'Technology is important and people use it and it helps them.'", "'Although technology has transformed global communication, critics argue that its rapid proliferation has eroded face-to-face interaction, which many psychologists consider essential for emotional wellbeing.'", "'Technology is very important in today's world because there are many ways that it helps people.'"], correct: 2, explanation: "Option C uses multiple complex structures simultaneously: 'Although' (subordinate clause), 'which' (relative clause), precise vocabulary. This demonstrates the range expected at Band 7+." },
      { id: 3, question: "The BEST passive version of 'The government introduced the new policy in 2020' is:", options: ["'The new policy introduced by the government in 2020.'", "'The new policy was introduced by the government in 2020.'", "'The new policy has introduced in 2020.'", "'In 2020 the new policy introduced.'"], correct: 1, explanation: "Correct passive: subject + was/were + past participle. 'The new policy was introduced in 2020.' Option A is missing 'was'. Options C and D have structural errors." },
      { id: 4, question: "Which sentence uses articles (a/an/the) CORRECTLY?", options: ["'The education is important for an society.'", "'Education is important for a society that wants to progress.'", "'An education is important for the society.'", "'Education is important for the society in general.'"], correct: 1, explanation: "'Education' as a general concept takes no article. 'A society' uses indefinite article for non-specific reference. 'The society' implies a specific known entity — wrong here." },
      { id: 5, question: "Which conditional correctly expresses a realistic future situation?", options: ["'If renewable energy becomes more affordable, governments will reduce carbon taxes.'", "'If renewable energy became more affordable, governments would reduce carbon taxes.'", "'If renewable energy will become more affordable, governments reduce carbon taxes.'", "'If renewable energy becomes more affordable, governments would reduce carbon taxes.'"], correct: 0, explanation: "First conditional (real/possible future): 'If + present simple, will + base verb'. Second conditional (hypothetical): 'If + past simple, would + base verb'. This is a realistic future scenario, so first conditional applies." }
    ]
  },
  "w-band": {
    type: "quiz", title: "Band Score Self-Assessment",
    description: "Understand the specific descriptors that differentiate each band level.",
    questions: [
      { id: 1, question: "A Task 2 essay addresses the question but develops only one of two required perspectives. This most likely scores:", options: ["Band 8 — one well-developed perspective shows strong ability", "Band 7 — most of the task is covered", "Band 5–6 — the task is only partially addressed", "Band 4 — the question is misunderstood"], correct: 2, explanation: "Task Achievement Band 5–6: 'addresses only part of the task'. Both perspectives in a Discussion essay must be present — neglecting one caps Task Achievement at Band 6." },
      { id: 2, question: "An essay uses 'furthermore', 'moreover', 'in addition', and 'additionally' to start each paragraph. The likely Coherence & Cohesion score:", options: ["Band 8 — excellent variety of linkers", "Band 7 — good range demonstrated", "Band 5–6 — mechanical use from a limited range of functions", "Band 4 — cohesive devices are absent"], correct: 2, explanation: "Using only additive connectors is 'mechanical use from a limited range'. Band 7+ requires connectors serving MULTIPLE functions: contrast, cause-effect, concession, example — not just addition." },
      { id: 3, question: "To achieve Band 7 in Lexical Resource, a student should:", options: ["Use the most complex vocabulary possible regardless of accuracy", "Use only simple safe vocabulary to avoid errors", "Use a sufficient range including less common items, mostly accurately, with rare minor errors", "Memorise and use every word from the Academic Word List"], correct: 2, explanation: "Band 7 Lexical descriptor: 'sufficient range to allow flexibility and precision; less common items attempted with some style awareness; occasional errors that don't impede communication'." },
      { id: 4, question: "Which best describes Band 7 Grammatical Range & Accuracy?", options: ["Mostly simple sentences with very few errors", "Variety of complex structures; frequent error-free sentences; good control with occasional minor errors", "Fully error-free throughout with wide variety of rare structures", "Complex structures attempted but errors frequently obscure meaning"], correct: 1, explanation: "Band 7 Grammar: 'uses a variety of complex structures; produces frequent error-free sentences; good control of grammar and punctuation but may make a few errors'." },
      { id: 5, question: "The most common reason test-takers remain stuck at Band 6 for Task Achievement:", options: ["Grammar is too simple", "They address all parts but fail to develop arguments with specific evidence", "They write too many words", "They use too many linking words"], correct: 1, explanation: "The Band 6–7 gap is almost always about DEVELOPMENT. Band 6 states ideas; Band 7 extends and supports them with specific reasoning and evidence. Dig deeper, not broader." }
    ]
  }
};

// ============================================================
// WRITING PRACTICE EXERCISE COMPONENT (Quiz type only)
// ============================================================
function WritingPracticeExercise({ exercise, color }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const setAns = (id, val) => { setAnswers(p => ({ ...p, [id]: val })); if (checked) setChecked(false); };
  const score = checked ? exercise.questions.filter(q => parseInt(answers[q.id]) === q.correct).length : 0;
  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ marginBottom: 20, padding: "12px 16px", background: `${color}15`, borderLeft: `3px solid ${color}`, borderRadius: "0 8px 8px 0" }}>
        <div style={{ fontSize: 13, fontFamily: "sans-serif", color, fontWeight: "bold", marginBottom: 4 }}>{exercise.title}</div>
        <div style={{ fontSize: 13, color: "#B0A898" }}>{exercise.description}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
        {exercise.questions.map(q => {
          const sel = answers[q.id];
          return (
            <div key={q.id} style={{ background: "#13161F", border: "1px solid #2A2D3E", borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 14, color: "#E8E0D0", marginBottom: 10, lineHeight: 1.6 }}>
                <span style={{ color, fontWeight: "bold", marginRight: 8, fontFamily: "sans-serif" }}>Q{q.id}.</span>{q.question}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {q.options.map((opt, idx) => {
                  const isSel = parseInt(sel) === idx;
                  const isRight = idx === q.correct;
                  const bg = checked ? (isRight ? "#1A3A1E" : (isSel && !isRight ? "#3A1A1E" : "#0F1117")) : (isSel ? "#1E2040" : "#0F1117");
                  const bc = checked ? (isRight ? "#5BAF73" : (isSel && !isRight ? "#CF6679" : "#2A2D3E")) : (isSel ? color : "#2A2D3E");
                  return (
                    <button key={idx} onClick={() => !checked && setAns(q.id, idx)} style={{ background: bg, border: `1px solid ${bc}`, borderRadius: 7, padding: "9px 14px", cursor: checked ? "default" : "pointer", color: "#C8C0B0", fontFamily: "Georgia, serif", fontSize: 13, textAlign: "left", transition: "all 0.15s" }}>
                      <span style={{ color, fontWeight: "bold", marginRight: 8 }}>{"ABCD"[idx]}.</span>{opt}
                      {checked && isRight && <span style={{ color: "#5BAF73", marginLeft: 8, fontSize: 12 }}>✓ Correct</span>}
                      {checked && isSel && !isRight && <span style={{ color: "#CF6679", marginLeft: 8, fontSize: 12 }}>✗</span>}
                    </button>
                  );
                })}
              </div>
              {checked && <div style={{ fontSize: 12, color: "#8A8070", marginTop: 10, lineHeight: 1.6, borderTop: "1px solid #2A2D3E", paddingTop: 8 }}>💡 {q.explanation}</div>}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => setChecked(true)} disabled={checked} style={{ background: checked ? "#1A1D2E" : color, border: "none", borderRadius: 8, padding: "11px 22px", cursor: checked ? "default" : "pointer", color: checked ? "#5A5448" : "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold" }}>Check Answers</button>
        {checked && <>
          <div style={{ fontFamily: "sans-serif", fontSize: 14, color: score === exercise.questions.length ? "#5BAF73" : score >= exercise.questions.length * 0.6 ? "#C8A951" : "#CF6679" }}>Score: {score}/{exercise.questions.length}</div>
          <button onClick={() => { setAnswers({}); setChecked(false); }} style={{ background: "transparent", border: "1px solid #2A2D3E", borderRadius: 8, padding: "9px 16px", cursor: "pointer", color: "#8A8070", fontFamily: "sans-serif", fontSize: 12 }}>Reset</button>
        </>}
      </div>
    </div>
  );
}

// ============================================================
// WRITING STUDY MODE
// ============================================================
function WritingStudyMode({ onStartTest, onBack }) {
  const [activeId, setActiveId] = useState("w-overview");
  const [activeTab, setActiveTab] = useState("learn");
  const [expandedTip, setExpandedTip] = useState(null);
  const active = writingCurriculum.find(c => c.id === activeId);
  const exercise = writingExercises[activeId];
  const selectTopic = (id) => { setActiveId(id); setActiveTab("learn"); setExpandedTip(null); };
  const idx = writingCurriculum.findIndex(c => c.id === activeId);
  return (
    <div style={{ minHeight: "100vh", background: "#0F1117", fontFamily: "Georgia, serif", color: "#E8E0D0", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg, #1A1D2E 0%, #0F1117 100%)", borderBottom: "1px solid #2A2D3E", padding: "20px 28px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg, #7CB87C, #4A7A4A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>✍️</div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#7CB87C", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 2 }}>IELTS MASTERCLASS</div>
          <div style={{ fontSize: 20, fontWeight: "bold", color: "#F0E8D0", lineHeight: 1 }}>Writing Module — Complete Guide</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={onBack} style={{ background: "transparent", border: "1px solid #2A2D3E", borderRadius: 8, padding: "9px 16px", cursor: "pointer", color: "#8A8070", fontFamily: "sans-serif", fontSize: 12 }}>← All Modules</button>
          <button onClick={onStartTest} style={{ background: "linear-gradient(135deg, #7CB87C, #4A7A4A)", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 0.5 }}>✍️ AI Writing Test (60 min)</button>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ width: 232, background: "#13161F", borderRight: "1px solid #2A2D3E", overflowY: "auto", flexShrink: 0, padding: "10px 0" }}>
          {writingCurriculum.map(item => (
            <button key={item.id} onClick={() => selectTopic(item.id)} style={{ width: "100%", background: activeId === item.id ? `linear-gradient(90deg, ${item.color}22, transparent)` : "transparent", border: "none", borderLeft: activeId === item.id ? `3px solid ${item.color}` : "3px solid transparent", padding: "11px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, textAlign: "left", transition: "all 0.2s" }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 12, color: activeId === item.id ? item.color : "#C8C0B0", fontWeight: activeId === item.id ? "bold" : "normal", fontFamily: "sans-serif", lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ fontSize: 10, color: "#4A4438", fontFamily: "sans-serif", marginTop: 1 }}>{item.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "28px" }}>
          <div style={{ maxWidth: 780, margin: "0 auto" }}>
            <div style={{ marginBottom: 22 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `${active.color}18`, border: `1px solid ${active.color}40`, borderRadius: 6, padding: "5px 12px", marginBottom: 10 }}>
                <span style={{ fontSize: 16 }}>{active.icon}</span>
                <span style={{ fontSize: 10, letterSpacing: 2, color: active.color, textTransform: "uppercase", fontFamily: "sans-serif" }}>{active.subtitle}</span>
              </div>
              <h1 style={{ fontSize: 28, margin: "0 0 10px", color: "#F0E8D0", lineHeight: 1.2 }}>{active.title}</h1>
            </div>
            <div style={{ display: "flex", gap: 4, marginBottom: 22, borderBottom: "1px solid #2A2D3E" }}>
              {["learn", "practice"].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: "none", border: "none", borderBottom: activeTab === tab ? `2px solid ${active.color}` : "2px solid transparent", padding: "8px 16px", cursor: "pointer", color: activeTab === tab ? active.color : "#6A6458", fontFamily: "sans-serif", fontSize: 13, fontWeight: activeTab === tab ? "bold" : "normal", textTransform: "capitalize", marginBottom: -1, letterSpacing: 0.5, transition: "all 0.15s" }}>
                  {tab === "learn" ? "📖 Learn" : "✏️ Practice"}
                </button>
              ))}
            </div>
            {activeTab === "learn" && (
              <div>
                <p style={{ fontSize: 15, lineHeight: 1.75, color: "#B0A898", margin: "0 0 22px", fontStyle: "italic", borderLeft: `3px solid ${active.color}`, paddingLeft: 14 }}>{active.content.intro}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
                  {active.content.sections.map((s, i) => (
                    <div key={i} style={{ background: "#1A1D2E", borderRadius: 10, padding: 18, border: "1px solid #2A2D3E" }}>
                      <div style={{ fontSize: 12, fontWeight: "bold", color: active.color, marginBottom: 7, fontFamily: "sans-serif", letterSpacing: 0.5 }}>{s.heading}</div>
                      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: "#C8C0B0" }}>{s.body}</p>
                    </div>
                  ))}
                </div>
                <div style={{ background: "linear-gradient(135deg, #1E1A10, #1A1D2E)", borderRadius: 12, padding: 22, border: `1px solid ${active.color}40` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: active.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>💡</div>
                    <span style={{ fontSize: 13, fontWeight: "bold", color: active.color, fontFamily: "sans-serif", letterSpacing: 1 }}>INSTRUCTOR TIPS & TRICKS</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {active.content.tips.map((tip, i) => (
                      <div key={i} onClick={() => setExpandedTip(expandedTip === `${activeId}-${i}` ? null : `${activeId}-${i}`)} style={{ background: expandedTip === `${activeId}-${i}` ? `${active.color}15` : "#0F1117", borderRadius: 8, padding: "10px 14px", cursor: "pointer", border: `1px solid ${expandedTip === `${activeId}-${i}` ? active.color + "60" : "#2A2D3E"}`, transition: "all 0.2s", display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: active.color, color: "#000", fontSize: 10, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, fontFamily: "sans-serif" }}>{i + 1}</div>
                        <span style={{ fontSize: 13, lineHeight: 1.65, color: "#C8C0B0" }}>{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, gap: 12 }}>
                  {idx > 0 && <button onClick={() => selectTopic(writingCurriculum[idx - 1].id)} style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: "#C8C0B0", fontFamily: "sans-serif", fontSize: 12 }}>← Previous</button>}
                  <div style={{ flex: 1 }} />
                  <button onClick={() => setActiveTab("practice")} style={{ background: `${active.color}22`, border: `1px solid ${active.color}60`, borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: active.color, fontFamily: "sans-serif", fontSize: 12, fontWeight: "bold" }}>✏️ Try Practice Exercise</button>
                  {idx < writingCurriculum.length - 1 && <button onClick={() => selectTopic(writingCurriculum[idx + 1].id)} style={{ background: active.color, border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 12, fontWeight: "bold" }}>Next →</button>}
                </div>
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 10, color: "#4A4438", fontFamily: "sans-serif", letterSpacing: 1 }}>PROGRESS</span>
                    <span style={{ fontSize: 10, color: active.color, fontFamily: "sans-serif" }}>{idx + 1} / {writingCurriculum.length}</span>
                  </div>
                  <div style={{ height: 3, background: "#2A2D3E", borderRadius: 3 }}>
                    <div style={{ height: "100%", borderRadius: 3, background: active.color, width: `${((idx + 1) / writingCurriculum.length) * 100}%`, transition: "width 0.4s ease" }} />
                  </div>
                </div>
              </div>
            )}
            {activeTab === "practice" && exercise && <WritingPracticeExercise exercise={exercise} color={active.color} />}
            {activeTab === "practice" && !exercise && <div style={{ padding: 40, textAlign: "center", color: "#5A5448", fontSize: 14 }}>No practice exercise available for this topic yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// WRITING TEST MODE — AI EVALUATED
// ============================================================
const TASK1_DATA = {
  instruction: "The bar chart below shows the percentage of adults who regularly used the internet in six European countries in three years: 2010, 2015, and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
  rows: [
    { country: "United Kingdom", y2010: 85, y2015: 92, y2020: 96 },
    { country: "Germany",        y2010: 72, y2015: 84, y2020: 91 },
    { country: "France",         y2010: 70, y2015: 82, y2020: 89 },
    { country: "Spain",          y2010: 58, y2015: 72, y2020: 85 },
    { country: "Italy",          y2010: 49, y2015: 61, y2020: 73 },
    { country: "Portugal",       y2010: 44, y2015: 58, y2020: 71 }
  ]
};
const TASK2_PROMPT = "In many countries, the gap between the richest and poorest members of society has continued to widen. Some people believe this is inevitable in a modern economy, while others argue that governments have a duty to reduce inequality. Discuss both views and give your own opinion. Write at least 250 words.";

function WritingTestMode({ onExit }) {
  const [phase, setPhase] = useState("start");
  const [activeTask, setActiveTask] = useState(1);
  const [t1, setT1] = useState("");
  const [t2, setT2] = useState("");
  const [timeLeft, setTimeLeft] = useState(3600);
  const [results, setResults] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const timerRef = useRef(null);

  const wc = (txt) => txt.trim() === "" ? 0 : txt.trim().split(/\s+/).length;
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const tColor = timeLeft < 300 ? "#CF6679" : timeLeft < 600 ? "#C8A951" : "#5BAF73";

  useEffect(() => {
    if (phase === "writing") {
      timerRef.current = setInterval(() => setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); doEval(); return 0; }
        return prev - 1;
      }), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [phase]);

  const doEval = async () => {
    clearInterval(timerRef.current);
    setPhase("evaluating");
    setErrMsg(null);
    try {
      const t1Prompt = `${TASK1_DATA.instruction}\n\nData:\n${TASK1_DATA.rows.map(r => `${r.country}: ${r.y2010}% (2010), ${r.y2015}% (2015), ${r.y2020}% (2020)`).join("\n")}`;
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          messages: [{
            role: "user",
            content: `You are a strict IELTS Writing examiner. Evaluate both tasks using official IELTS band descriptors. Give realistic scores (most learners: 5.0–7.5). Scores in 0.5 increments. Return ONLY valid JSON, no preamble or markdown.

TASK 1 PROMPT: ${t1Prompt}
TASK 1 RESPONSE (${wc(t1)} words): ${t1 || "[No response written]"}

TASK 2 PROMPT: ${TASK2_PROMPT}
TASK 2 RESPONSE (${wc(t2)} words): ${t2 || "[No response written]"}

Return this exact JSON structure:
{"task1":{"taskScore":6.5,"ccScore":6.5,"lrScore":6.5,"grScore":6.5,"taskFeedback":"2-3 specific sentences on task achievement","ccFeedback":"2-3 specific sentences on coherence and cohesion","lrFeedback":"2-3 specific sentences on vocabulary","grFeedback":"2-3 specific sentences on grammar","strengths":["specific strength 1","specific strength 2"],"improvements":["specific improvement 1","specific improvement 2"]},"task2":{"taskScore":6.5,"ccScore":6.5,"lrScore":6.5,"grScore":6.5,"taskFeedback":"...","ccFeedback":"...","lrFeedback":"...","grFeedback":"...","strengths":["...","..."],"improvements":["...","..."]}}`
          }]
        })
      });
      const data = await resp.json();
      const raw = data.content[0].text.replace(/```json|```/g, "").trim();
      setResults(JSON.parse(raw));
      setPhase("results");
    } catch (e) {
      setErrMsg("Evaluation failed. Please check your connection and try again.");
      setPhase("writing");
    }
  };

  const avgBand = (task) => Math.round(((task.taskScore + task.ccScore + task.lrScore + task.grScore) / 4) * 2) / 2;
  const bColor = (b) => b >= 7.5 ? "#5BAF73" : b >= 6.5 ? "#C8A951" : b >= 5.5 ? "#B8A47C" : "#CF6679";

  if (phase === "start") return (
    <div style={{ minHeight: "100vh", background: "#0F1117", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, fontFamily: "Georgia, serif", color: "#E8E0D0" }}>
      <div style={{ maxWidth: 680, width: "100%" }}>
        <button onClick={onExit} style={{ background: "transparent", border: "1px solid #2A2D3E", borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: "#8A8070", fontFamily: "sans-serif", fontSize: 12, marginBottom: 32 }}>← Back to Writing Module</button>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✍️</div>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#7CB87C", fontFamily: "sans-serif", marginBottom: 8 }}>IELTS WRITING</div>
          <h1 style={{ fontSize: 32, margin: "0 0 10px", color: "#F0E8D0" }}>AI-Evaluated Writing Test</h1>
          <p style={{ color: "#8A8070", fontSize: 14, lineHeight: 1.65, margin: 0 }}>Complete both tasks and receive instant, detailed AI feedback on all four IELTS assessment criteria.</p>
        </div>
        <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
          {[{ num: 1, type: "Academic Graph Description", words: "150+", time: "20 min", color: "#5B8DB8" }, { num: 2, type: "Discussion Essay", words: "250+", time: "40 min", color: "#B87CB8" }].map(t => (
            <div key={t.num} style={{ flex: 1, background: "#1A1D2E", border: `1px solid ${t.color}40`, borderRadius: 12, padding: 18 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: t.color, fontFamily: "sans-serif", marginBottom: 4 }}>TASK {t.num}</div>
              <div style={{ fontSize: 15, fontWeight: "bold", color: "#F0E8D0", marginBottom: 8 }}>{t.type}</div>
              <div style={{ display: "flex", gap: 10 }}>
                <span style={{ fontSize: 11, color: "#8A8070", fontFamily: "sans-serif" }}>📝 {t.words} words</span>
                <span style={{ fontSize: 11, color: "#8A8070", fontFamily: "sans-serif" }}>⏱️ {t.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 10, padding: 16, marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 1, color: "#7CB87C", fontFamily: "sans-serif", marginBottom: 8 }}>AI EVALUATES ALL 4 CRITERIA</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {["Task Achievement/Response", "Coherence & Cohesion", "Lexical Resource", "Grammatical Range & Accuracy"].map(c => (
              <div key={c} style={{ fontSize: 13, color: "#B0A898", display: "flex", alignItems: "center", gap: 6 }}><span style={{ color: "#7CB87C" }}>✓</span> {c}</div>
            ))}
          </div>
        </div>
        <button onClick={() => setPhase("writing")} style={{ width: "100%", background: "linear-gradient(135deg, #7CB87C, #4A7A4A)", border: "none", borderRadius: 10, padding: 16, cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 16, fontWeight: "bold" }}>
          Begin Test — 60 Minutes →
        </button>
      </div>
    </div>
  );

  if (phase === "evaluating") return (
    <div style={{ minHeight: "100vh", background: "#0F1117", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", color: "#E8E0D0" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 20 }}>📋</div>
        <div style={{ fontSize: 11, letterSpacing: 3, color: "#7CB87C", fontFamily: "sans-serif", marginBottom: 8 }}>IELTS AI EXAMINER</div>
        <h2 style={{ fontSize: 26, margin: "0 0 10px", color: "#F0E8D0" }}>Reviewing Your Writing...</h2>
        <p style={{ color: "#8A8070", fontSize: 14 }}>Evaluating all four criteria. This takes 15–30 seconds.</p>
        {errMsg && <div style={{ color: "#CF6679", marginTop: 16, fontSize: 14 }}>{errMsg}</div>}
      </div>
    </div>
  );

  if (phase === "writing") return (
    <div style={{ minHeight: "100vh", background: "#0F1117", fontFamily: "Georgia, serif", color: "#E8E0D0", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#13161F", borderBottom: "1px solid #2A2D3E", padding: "10px 20px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 6, flex: 1 }}>
          {[1, 2].map(n => {
            const cnt = n === 1 ? wc(t1) : wc(t2);
            const min = n === 1 ? 150 : 250;
            const col = n === 1 ? "#5B8DB8" : "#B87CB8";
            return (
              <button key={n} onClick={() => setActiveTask(n)} style={{ background: activeTask === n ? `${col}20` : "transparent", border: `1px solid ${activeTask === n ? col : "#2A2D3E"}`, borderRadius: 6, padding: "6px 16px", cursor: "pointer", color: activeTask === n ? col : "#6A6458", fontFamily: "sans-serif", fontSize: 12, fontWeight: activeTask === n ? "bold" : "normal", display: "flex", alignItems: "center", gap: 6 }}>
                Task {n} <span style={{ fontFamily: "monospace" }}>({cnt}w)</span>
                {cnt >= min && <span style={{ color: "#5BAF73" }}>✓</span>}
              </button>
            );
          })}
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 18, color: tColor, fontWeight: "bold", minWidth: 90, textAlign: "center" }}>⏱️ {fmt(timeLeft)}</div>
        <button onClick={doEval} style={{ background: "linear-gradient(135deg, #7CB87C, #4A7A4A)", border: "none", borderRadius: 8, padding: "8px 18px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold" }}>Submit for Evaluation</button>
      </div>
      {errMsg && <div style={{ background: "#3A1A1E", borderBottom: "1px solid #CF6679", padding: "8px 20px", fontSize: 13, color: "#CF6679", fontFamily: "sans-serif" }}>{errMsg}</div>}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div style={{ width: "44%", borderRight: "1px solid #2A2D3E", overflowY: "auto", padding: 22 }}>
          {activeTask === 1 ? (
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#5B8DB8", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 10 }}>Academic Writing — Task 1</div>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "#C8C0B0", marginBottom: 14 }}>{TASK1_DATA.instruction}</p>
              <div style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 10, padding: 14, marginBottom: 10 }}>
                <div style={{ fontSize: 10, letterSpacing: 1, color: "#5B8DB8", fontFamily: "sans-serif", marginBottom: 10 }}>INTERNET USAGE DATA (%)</div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>{["Country","2010","2015","2020"].map(h => <th key={h} style={{ textAlign: h==="Country"?"left":"center", fontSize: 11, color: "#8A8070", fontFamily: "sans-serif", padding: "3px 6px", borderBottom: "1px solid #2A2D3E" }}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {TASK1_DATA.rows.map(r => (
                      <tr key={r.country}>
                        <td style={{ fontSize: 13, color: "#C8C0B0", padding: "5px 6px", borderBottom: "1px solid #1A1D2E" }}>{r.country}</td>
                        {[r.y2010, r.y2015, r.y2020].map((v, i) => <td key={i} style={{ textAlign: "center", fontSize: 13, color: "#C8C0B0", padding: "5px 6px", borderBottom: "1px solid #1A1D2E" }}>{v}%</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ background: "#0F1117", border: "1px solid #5B8DB840", borderRadius: 8, padding: "8px 12px" }}>
                <span style={{ fontSize: 12, color: "#5B8DB8", fontFamily: "sans-serif" }}>⚠️ Minimum: 150 words · Recommended: 20 minutes</span>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#B87CB8", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 10 }}>Academic Writing — Task 2</div>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "#C8C0B0", marginBottom: 14 }}>{TASK2_PROMPT}</p>
              <div style={{ background: "#0F1117", border: "1px solid #B87CB840", borderRadius: 8, padding: "8px 12px" }}>
                <span style={{ fontSize: 12, color: "#B87CB8", fontFamily: "sans-serif" }}>⚠️ Minimum: 250 words · Recommended: 40 minutes</span>
              </div>
            </div>
          )}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 12, color: "#6A6458", fontFamily: "sans-serif" }}>Your response</span>
            <span style={{ fontSize: 13, fontFamily: "monospace", color: (activeTask === 1 ? wc(t1) : wc(t2)) >= (activeTask === 1 ? 150 : 250) ? "#5BAF73" : "#8A8070" }}>
              {activeTask === 1 ? wc(t1) : wc(t2)} / {activeTask === 1 ? 150 : 250} words
            </span>
          </div>
          <textarea
            value={activeTask === 1 ? t1 : t2}
            onChange={e => activeTask === 1 ? setT1(e.target.value) : setT2(e.target.value)}
            placeholder={`Write your Task ${activeTask} response here...\n\nMinimum ${activeTask === 1 ? 150 : 250} words.`}
            style={{ flex: 1, background: "#0F1117", border: "1px solid #2A2D3E", borderRadius: 10, padding: 18, color: "#E8E0D0", fontFamily: "Georgia, serif", fontSize: 15, lineHeight: 1.85, resize: "none", outline: "none" }}
          />
        </div>
      </div>
    </div>
  );

  if (phase === "results" && results) {
    const b1 = avgBand(results.task1);
    const b2 = avgBand(results.task2);
    const overall = Math.round(((b1 + b2 * 2) / 3) * 2) / 2;
    return (
      <div style={{ minHeight: "100vh", background: "#0F1117", fontFamily: "Georgia, serif", color: "#E8E0D0" }}>
        <div style={{ background: "#13161F", borderBottom: "1px solid #2A2D3E", padding: "14px 28px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onExit} style={{ background: "transparent", border: "1px solid #2A2D3E", borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: "#8A8070", fontFamily: "sans-serif", fontSize: 12 }}>← Writing Module</button>
          <span style={{ fontSize: 16, fontWeight: "bold", color: "#F0E8D0" }}>AI Examiner Feedback</span>
        </div>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px" }}>
          <div style={{ background: "linear-gradient(135deg, #1A1D2E, #13161F)", border: `2px solid ${bColor(overall)}40`, borderRadius: 16, padding: 28, textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: bColor(overall), fontFamily: "sans-serif", marginBottom: 6 }}>OVERALL ESTIMATED BAND</div>
            <div style={{ fontSize: 68, fontWeight: "bold", color: bColor(overall), lineHeight: 1 }}>{overall.toFixed(1)}</div>
            <div style={{ fontSize: 13, color: "#8A8070", marginTop: 6, fontFamily: "sans-serif" }}>Task 1: Band {b1.toFixed(1)} · Task 2: Band {b2.toFixed(1)} (weighted double)</div>
          </div>
          {[
            { task: results.task1, num: 1, band: b1, color: "#5B8DB8", title: "Task 1 — Academic Graph Description" },
            { task: results.task2, num: 2, band: b2, color: "#B87CB8", title: "Task 2 — Discussion Essay" }
          ].map(({ task, num, band, color, title }) => (
            <div key={num} style={{ background: "#13161F", border: `1px solid ${color}40`, borderRadius: 14, padding: 22, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: 2, color, fontFamily: "sans-serif", marginBottom: 2 }}>TASK {num}</div>
                  <div style={{ fontSize: 17, fontWeight: "bold", color: "#F0E8D0" }}>{title}</div>
                </div>
                <div style={{ marginLeft: "auto", textAlign: "center" }}>
                  <div style={{ fontSize: 34, fontWeight: "bold", color: bColor(band) }}>{band.toFixed(1)}</div>
                  <div style={{ fontSize: 10, color: "#6A6458", fontFamily: "sans-serif" }}>BAND</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                {[
                  { label: "Task Achievement", score: task.taskScore, feedback: task.taskFeedback },
                  { label: "Coherence & Cohesion", score: task.ccScore, feedback: task.ccFeedback },
                  { label: "Lexical Resource", score: task.lrScore, feedback: task.lrFeedback },
                  { label: "Grammatical Range", score: task.grScore, feedback: task.grFeedback }
                ].map(c => (
                  <div key={c.label} style={{ background: "#1A1D2E", borderRadius: 10, padding: 14, border: "1px solid #2A2D3E" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: 11, color: "#8A8070", fontFamily: "sans-serif" }}>{c.label}</span>
                      <span style={{ fontSize: 18, fontWeight: "bold", color: bColor(c.score) }}>{c.score.toFixed(1)}</span>
                    </div>
                    <div style={{ height: 4, background: "#0F1117", borderRadius: 2, marginBottom: 8 }}>
                      <div style={{ height: "100%", borderRadius: 2, background: bColor(c.score), width: `${(c.score / 9) * 100}%` }} />
                    </div>
                    <p style={{ fontSize: 12, color: "#8A8070", lineHeight: 1.55, margin: 0 }}>{c.feedback}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: "#0F1117", border: "1px solid #5BAF7330", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 11, letterSpacing: 1, color: "#5BAF73", fontFamily: "sans-serif", marginBottom: 8 }}>✓ STRENGTHS</div>
                  {task.strengths.map((s, i) => (
                    <div key={i} style={{ fontSize: 12, color: "#B0A898", lineHeight: 1.6, padding: "4px 0", borderBottom: i < task.strengths.length - 1 ? "1px solid #1A1D2E" : "none" }}>{s}</div>
                  ))}
                </div>
                <div style={{ background: "#0F1117", border: "1px solid #CF667930", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 11, letterSpacing: 1, color: "#CF6679", fontFamily: "sans-serif", marginBottom: 8 }}>↗ AREAS TO IMPROVE</div>
                  {task.improvements.map((s, i) => (
                    <div key={i} style={{ fontSize: 12, color: "#B0A898", lineHeight: 1.6, padding: "4px 0", borderBottom: i < task.improvements.length - 1 ? "1px solid #1A1D2E" : "none" }}>{s}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }}>
            <button onClick={() => { setPhase("start"); setT1(""); setT2(""); setResults(null); setTimeLeft(3600); }} style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 10, padding: "12px 28px", cursor: "pointer", color: "#C8C0B0", fontFamily: "sans-serif", fontSize: 13 }}>Retake Test</button>
            <button onClick={onExit} style={{ background: "linear-gradient(135deg, #7CB87C, #4A7A4A)", border: "none", borderRadius: 10, padding: "12px 28px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold" }}>Back to Writing Module</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ============================================================
// HOME SCREEN
// ============================================================
function HomeScreen({ onSelect }) {
  const modules = [
    { id: "reading", icon: "📖", title: "Reading", color: "#5B8DB8", badge: "11 topics · 60-min timed test", detail: "True/False/Not Given, Matching Headings, Sentence Completion, MCQs, Short Answer & more. Full Academic Reading Test with 40 questions." },
    { id: "writing", icon: "✍️", title: "Writing", color: "#7CB87C", badge: "10 topics · AI-evaluated test", detail: "Task 1 Academic, Task 1 GT Letters, Task 2 Essay Types, Coherence, Grammar, Vocabulary. AI-powered band scoring with detailed feedback." }
  ];
  return (
    <div style={{ minHeight: "100vh", background: "#0F1117", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, fontFamily: "Georgia, serif" }}>
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "#C8A951", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 14 }}>IELTS MASTERCLASS</div>
        <h1 style={{ fontSize: 42, color: "#F0E8D0", margin: 0 }}>Choose Your Module</h1>
        <p style={{ color: "#6A6458", marginTop: 10, fontSize: 16, fontFamily: "sans-serif" }}>Select a module to begin your IELTS preparation</p>
      </div>
      <div style={{ display: "flex", gap: 24, maxWidth: 820, width: "100%" }}>
        {modules.map(m => (
          <div key={m.id} onClick={() => onSelect(m.id)} style={{ background: "linear-gradient(135deg, #1A1D2E, #13161F)", border: `1px solid ${m.color}40`, borderRadius: 16, padding: 36, cursor: "pointer", flex: 1, transition: "transform 0.15s, border-color 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = m.color + "90"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = m.color + "40"; }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>{m.icon}</div>
            <div style={{ fontSize: 10, letterSpacing: 2, color: m.color, fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 6 }}>MODULE</div>
            <h2 style={{ fontSize: 30, color: "#F0E8D0", margin: "0 0 6px", fontFamily: "Georgia, serif" }}>{m.title}</h2>
            <div style={{ fontSize: 12, color: m.color, fontFamily: "sans-serif", marginBottom: 14 }}>{m.badge}</div>
            <p style={{ fontSize: 13, color: "#8A8070", lineHeight: 1.65, margin: "0 0 24px" }}>{m.detail}</p>
            <button style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}BB)`, border: "none", borderRadius: 8, padding: "12px 24px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold", width: "100%" }}>
              Enter Module →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// APP ROOT
// ============================================================
export default function App() {
  const [module, setModule] = useState(null);
  const [mode, setMode] = useState("study");
  const goHome = () => { setModule(null); setMode("study"); };
  if (!module) return <HomeScreen onSelect={(m) => { setModule(m); setMode("study"); }} />;
  if (module === "reading") {
    if (mode === "test") return <TestMode onExit={() => setMode("study")} />;
    return <StudyMode onStartTest={() => setMode("test")} onBack={goHome} />;
  }
  if (module === "writing") {
    if (mode === "test") return <WritingTestMode onExit={() => setMode("study")} />;
    return <WritingStudyMode onStartTest={() => setMode("test")} onBack={goHome} />;
  }
  return <HomeScreen onSelect={(m) => { setModule(m); setMode("study"); }} />;
}

