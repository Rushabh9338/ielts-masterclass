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
        { heading: "The Two Writing Tasks (Academic)", body: "In Academic IELTS, Task 1 asks you to describe visual data: graphs, charts, tables, diagrams, maps, or processes, in at least 150 words. Task 2 is a formal essay of at least 250 words responding to a point of view, argument, or problem. Both are assessed on the same four criteria, and Task 2 carries double the weight of Task 1." },
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
// LISTENING CURRICULUM DATA
// ============================================================
const listeningCurriculum = [
  {
    id: "l-overview", icon: "📋", title: "Overview & Format", subtitle: "Know the test structure", color: "#C8A951",
    content: {
      intro: "The IELTS Listening test is approximately 30 minutes long with 40 questions across 4 recorded sections. You hear each recording ONCE only. On paper-based tests you get 10 extra minutes to transfer answers; on computer-based tests you get 2 minutes to check. Every correct answer is worth 1 mark, and the Listening test is identical for Academic and General Training candidates.",
      sections: [
        { heading: "Four Parts, Increasing Difficulty", body: "Part 1: a conversation between two people in an everyday social context (e.g. booking accommodation). Part 2: a monologue in an everyday context (e.g. a talk about local facilities). Part 3: a conversation between up to four people in an educational setting (e.g. students and a tutor). Part 4: a monologue on an academic subject (e.g. a university lecture). The difficulty rises from Part 1 to Part 4." },
        { heading: "Heard Only Once", body: "Unlike Reading, you cannot go back. The audio plays continuously and you must answer as you listen. This is why prediction and reading questions in advance are essential skills. If you miss an answer, mark your best guess and immediately refocus on the next question — dwelling on a missed answer causes you to miss several more." },
        { heading: "Scoring & Band Conversion", body: "40 questions, 1 mark each. Approximate band scores: 39–40 = Band 9, 37–38 = Band 8.5, 35–36 = Band 8, 32–34 = Band 7.5, 30–31 = Band 7, 26–29 = Band 6.5, 23–25 = Band 6, 18–22 = Band 5.5, 16–17 = Band 5. Spelling and grammar must be correct — a correctly heard but misspelled answer is marked wrong." }
      ],
      tips: [
        "You hear each recording only ONCE — there are no repeats, so full concentration is essential throughout.",
        "Use the time before each section to read the questions and predict what kind of answer is needed.",
        "Transfer answers carefully (paper test) — check spelling and that answers align with the correct question numbers.",
        "Never leave a blank — there's no penalty for wrong answers, so always guess if unsure.",
        "Answers appear in the SAME ORDER as the recording — if you're searching for Q5's answer but hear Q6's, you've missed Q5; move on."
      ]
    }
  },
  {
    id: "l-parts", icon: "🎧", title: "The Four Parts", subtitle: "What to expect in each section", color: "#5B8DB8",
    content: {
      intro: "Each of the four parts has a distinct context, speaker setup, and typical question types. Knowing what's coming lets you prepare your listening focus before the audio even begins. Parts 1 and 2 deal with everyday social situations; Parts 3 and 4 are set in academic and educational contexts.",
      sections: [
        { heading: "Part 1 — Social Conversation (Q1–10)", body: "Two speakers in a transactional, everyday situation: booking a hotel, enrolling in a course, making an enquiry. Usually tests form completion with names, dates, phone numbers, addresses, and prices. An example answer is often given at the start. This is the easiest section — secure these 10 marks with careful attention to spelling and numbers." },
        { heading: "Part 2 — Social Monologue (Q11–20)", body: "One speaker giving information in an everyday context: a tour guide describing facilities, a manager explaining new procedures, a radio segment about an event. Common question types: multiple choice, matching, and map or plan labelling. Listen for descriptive and directional language as the speaker moves through topics or locations." },
        { heading: "Parts 3 & 4 — Academic Contexts (Q21–40)", body: "Part 3 is a discussion between two to four speakers (typically students and a tutor) about an assignment or academic topic. It tests opinions, agreement/disagreement, and matching. Part 4 is an academic lecture by a single speaker with NO break in the middle — usually note or summary completion. Part 4 is the hardest: dense academic vocabulary and a continuous flow." }
      ],
      tips: [
        "Part 1 always has an example answer played first — use it to tune into the speakers' voices and accents.",
        "In Part 2, map/plan labelling is common — orient yourself using the starting point and compass directions before the audio.",
        "Part 3 tests opinions — listen for who says what, and for agreement/disagreement between speakers.",
        "Part 4 has NO pause in the middle — read all questions beforehand because you won't get a break to catch up.",
        "Difficulty rises across parts, so don't panic if Part 4 feels hard — everyone finds it the most challenging."
      ]
    }
  },
  {
    id: "l-strategies", icon: "🧠", title: "Core Listening Strategies", subtitle: "Predict, focus, recover", color: "#7CB87C",
    content: {
      intro: "Strong IELTS listeners don't just hear — they anticipate. Because the audio plays once, success depends on reading questions in advance, predicting answers, and recovering instantly when you miss something. These three habits separate Band 7+ listeners from the rest.",
      sections: [
        { heading: "Predict Before You Listen", body: "Use the pause before each section to read the questions and predict the type of answer needed. For a gap after 'The tour costs £___', you know a number/price is coming. For 'The museum is closed on ___', a day is expected. Predicting the grammatical form (noun, number, verb) and meaning primes your brain to catch the answer the instant it's spoken." },
        { heading: "Listen for Signpost Language", body: "Speakers signal what's coming with transition words: 'firstly', 'moving on to', 'however', 'the main reason', 'finally'. These guide you through the structure and warn you when an answer is approaching. In Part 4 lectures especially, signposts ('Let's turn now to...') tell you the topic is shifting and a new answer is imminent." },
        { heading: "Recover From Missed Answers", body: "If you miss an answer, DON'T freeze. Mark a guess, then immediately jump to the next question. The biggest score-killer is losing concentration after one missed answer and then missing the next three. Because answers come in order, listen for the keywords of the NEXT question to find your place again instantly." }
      ],
      tips: [
        "Read ahead: while one section's audio is ending, scan the next section's questions if you've finished answering.",
        "Underline keywords in each question to know exactly what to listen for.",
        "Predict the answer TYPE (number, name, place, verb) before listening — it sharpens your focus.",
        "Beware of 'distractors' — speakers often state a wrong answer first, then correct it ('Actually, make that Thursday').",
        "If you miss one, let it go instantly and lock onto the next question's keywords — never chase a lost answer."
      ]
    }
  },
  {
    id: "l-form", icon: "📝", title: "Form, Note & Table Completion", subtitle: "Capture details accurately", color: "#B87CB8",
    content: {
      intro: "Completion questions ask you to fill gaps in a form, set of notes, table, or flow-chart using words from the recording. A word limit always applies (e.g. 'NO MORE THAN TWO WORDS AND/OR A NUMBER'). These dominate Part 1 and Part 4, and reward accurate spelling and precise listening.",
      sections: [
        { heading: "Form Completion (Part 1)", body: "Forms collect personal and transactional details: names (often spelled out letter by letter), addresses, phone numbers, dates, times, and prices. Listen carefully when names are spelled — and watch for self-correction ('That's B-R-O-W-N... sorry, B-R-A-U-N'). The form's existing labels tell you exactly what each gap needs." },
        { heading: "Note & Table Completion", body: "Notes summarise a talk in shortened form; tables organise information into rows and columns for comparison. Use the headings and surrounding words to predict each gap. In tables, read across rows and down columns to understand what category each blank belongs to before the audio reaches it." },
        { heading: "Obey the Word Limit Strictly", body: "If the instruction says 'NO MORE THAN TWO WORDS', writing three words is automatically wrong — even if all are correct. Numbers usually count separately ('AND/OR A NUMBER'). Copy words exactly as heard; do not change tense or plural forms. Articles (a, the) count toward your word limit." }
      ],
      tips: [
        "Check the word limit FIRST and write the exact number of words allowed — never exceed it.",
        "For spelled-out names, write each letter as you hear it; double-check common confusions (M/N, B/P, S/F).",
        "Listen for self-corrections — the SECOND piece of information is usually the correct answer.",
        "Predict each gap's word type from the surrounding text before the audio reaches it.",
        "Common number traps: 'fifteen' (15) vs 'fifty' (50), 'thirteen' (13) vs 'thirty' (30) — listen to the stress."
      ]
    }
  },
  {
    id: "l-mcq", icon: "🎯", title: "Multiple Choice", subtitle: "Beat the distractors", color: "#B87C7C",
    content: {
      intro: "Multiple choice questions give you options (A/B/C, sometimes more) and ask you to choose the correct one(s). They appear most often in Parts 2 and 3. IELTS deliberately mentions all the options in the audio to test whether you can identify the correct one — careful listening for the precise meaning is essential.",
      sections: [
        { heading: "All Options Are Mentioned", body: "The recording usually refers to every option, not just the right one. The speaker might mention A and B before confirming C is correct. Don't pick an answer just because you heard the word — listen for what is actually CONFIRMED versus what is rejected or merely discussed." },
        { heading: "Read Options Before Listening", body: "In the pause before the section, read the question stem and all options. Underline the key difference between them. This way, when the audio plays, you're listening for which specific option the speaker confirms rather than processing all options for the first time mid-audio." },
        { heading: "Multiple-Answer Questions", body: "Some questions ask you to choose TWO or THREE answers from a longer list (e.g. 'Which TWO facilities are free?'). The correct answers can be mentioned anywhere in that part of the recording, not necessarily together. Track each option and tick the ones explicitly confirmed by the speaker." }
      ],
      tips: [
        "Read the stem and ALL options during the pause — know the differences before the audio starts.",
        "Beware: hearing a word from an option doesn't make it correct — listen for confirmation or rejection.",
        "Watch for paraphrasing — the correct option is often expressed in different words than the audio uses.",
        "For 'choose TWO/THREE' questions, the answers may be scattered — track every option throughout.",
        "Eliminate options the speaker clearly rejects to narrow down your choice."
      ]
    }
  },
  {
    id: "l-matching", icon: "🔗", title: "Matching", subtitle: "Connect items to categories", color: "#7CB8B8",
    content: {
      intro: "Matching questions ask you to match a list of items (e.g. people, places, dates) to a set of options (e.g. opinions, features, descriptions). They appear most often in Part 3 (matching opinions to speakers) and Part 2. Tracking who says what, in order, is the key skill.",
      sections: [
        { heading: "How Matching Works", body: "You're given a numbered list of items and a lettered list of options. Each item matches one option. Sometimes options can be used more than once; sometimes there are more options than items. Always read the instructions to know whether options repeat. The numbered items follow the order of the recording." },
        { heading: "Track the Order", body: "The questions follow the order in which information appears in the audio. So once you've matched item 1, listen for item 2 next — don't jump around. In Part 3 discussions, the speakers will be referred to by name, so keep each speaker's name clearly in mind to attribute opinions correctly." },
        { heading: "Pre-read the Options", body: "Reading the lettered options in advance is crucial — there are often more of them than items, and they may be paraphrased in the audio. Familiarise yourself with all options so you can quickly recognise which one matches when the speaker expresses that idea, even in different words." }
      ],
      tips: [
        "Check whether options can be used more than once — the instructions will tell you.",
        "Items follow the recording's order, so move sequentially and don't skip ahead.",
        "In Part 3, keep speakers' names firmly in mind to attribute each opinion correctly.",
        "Options are usually paraphrased — listen for the MEANING, not exact word matches.",
        "If you miss one match, guess and move on — chasing it risks missing the next several."
      ]
    }
  },
  {
    id: "l-map", icon: "🗺️", title: "Map, Plan & Diagram Labelling", subtitle: "Follow spatial directions", color: "#B8A47C",
    content: {
      intro: "These questions show a map, building plan, or diagram and ask you to label parts using the recording. They appear most often in Part 2. Success depends on orienting yourself first and then following the speaker's directional and positional language precisely.",
      sections: [
        { heading: "Orient Yourself First", body: "Before the audio, study the map/plan: find the entrance, the compass (north/south), any labelled landmarks, and the scale. Identify your starting point — the speaker almost always begins a tour or description from a fixed reference like the main entrance or 'where we are now'. This anchors everything that follows." },
        { heading: "Follow Directional Language", body: "Listen for prepositions and directions: 'opposite', 'next to', 'between', 'on your left', 'at the far end', 'go past', 'in the corner', 'adjacent to'. Trace the route on the map with your finger or eyes as the speaker talks. Each labelled location is described relative to something you already know." },
        { heading: "Diagram & Process Labelling", body: "For object diagrams (a machine, a piece of equipment), labels are usually nouns naming parts. The speaker describes the diagram in a logical sequence — often top to bottom or in the order of a process. Use any pre-printed labels as anchors to locate where the speaker is referring." }
      ],
      tips: [
        "Locate the starting point and compass directions BEFORE the audio begins.",
        "Trace the route with your finger as the speaker gives directions — stay with them in real time.",
        "Master location language: opposite, adjacent to, between, at the end of, to the left/right of.",
        "Use labelled landmarks already on the map as reference anchors for the unlabelled ones.",
        "If you lose track, listen for the next clearly named landmark to re-locate yourself on the map."
      ]
    }
  },
  {
    id: "l-sentence", icon: "✍️", title: "Sentence Completion & Short Answer", subtitle: "Precise words, strict limits", color: "#8B7CB8",
    content: {
      intro: "Sentence completion gives you incomplete sentences to finish with words from the recording. Short-answer questions ask direct questions (e.g. 'What time does the library close?'). Both require you to listen for specific information and obey a strict word limit. These often appear in Parts 2, 3, and 4.",
      sections: [
        { heading: "Sentence Completion", body: "Each sentence summarises a point from the audio with a gap to fill. The words before and after the gap are your cue — they signal exactly what information to listen for and its grammatical form. The sentence must be grammatically correct and factually accurate once completed. Answers come in the recording's order." },
        { heading: "Short-Answer Questions", body: "Direct questions answered with specific information: 'How many students attended?' (a number), 'What does the speaker recommend bringing?' (a thing). Let the question word guide your listening focus. The word limit still applies, so give only the essential words — extra words can make a correct answer wrong." },
        { heading: "Predict the Grammar and Meaning", body: "Before listening, decide what type of word fills each gap. After 'the project was funded by ___' you expect an organisation or person. After 'students must submit work by ___' you expect a date or time. Predicting both grammar and meaning lets you catch the answer instantly when it's spoken." }
      ],
      tips: [
        "Always obey the word limit — 'NO MORE THAN TWO WORDS AND/OR A NUMBER' is the most common instruction.",
        "Read the words around the gap to predict the answer's type and meaning before listening.",
        "Write the exact words you hear — don't paraphrase or change the form.",
        "For short answers, the question word (who/what/when/how many) tells you the answer type.",
        "Spelling counts — a correctly heard but misspelled answer is marked wrong."
      ]
    }
  },
  {
    id: "l-signpost", icon: "🚦", title: "Signposting & Distractors", subtitle: "Read the speaker's signals", color: "#C85B5B",
    content: {
      intro: "Speakers in IELTS Listening use signposting language to guide listeners and frequently use distractors to test whether you're truly following the meaning. Recognising these patterns is one of the most powerful ways to lift your score, especially in Parts 3 and 4.",
      sections: [
        { heading: "Signposting Language", body: "Signposts tell you where the talk is going. Sequence: 'firstly', 'then', 'finally'. Addition: 'moreover', 'in addition'. Contrast: 'however', 'on the other hand'. Cause: 'because', 'as a result'. Emphasis: 'the key point is', 'most importantly'. Topic shift: 'moving on to', 'turning now to'. These warn you an answer is coming and how ideas connect." },
        { heading: "Distractors — The Classic Trap", body: "A distractor is information that seems like the answer but is then changed or rejected. Example: 'The meeting's on Monday — oh wait, it's been moved to Wednesday.' The answer is Wednesday, not Monday. Speakers often state one thing, then correct it with 'actually', 'sorry', 'in fact', or 'no, wait'. Always listen to the END of the statement." },
        { heading: "Negation and Correction Words", body: "Listen hard for words that reverse meaning: 'not', 'instead of', 'rather than', 'although', 'but', 'actually', 'on second thoughts'. These signal that what was just said is being qualified or overturned. The information AFTER these words is usually the correct answer, not what came before." }
      ],
      tips: [
        "Treat 'actually', 'sorry', 'in fact', 'wait' as alarm bells — a correction (the real answer) is coming.",
        "Don't write an answer the instant you hear a match — wait to confirm it isn't corrected a moment later.",
        "Signpost words ('moving on', 'finally') tell you a new answer is approaching — refocus when you hear them.",
        "Listen for negation ('not', 'rather than') which flips the meaning of a statement.",
        "In Part 3, agreement/disagreement language ('I see your point, but...') signals whose opinion is final."
      ]
    }
  },
  {
    id: "l-spelling", icon: "🔤", title: "Spelling, Numbers & Common Traps", subtitle: "Don't lose easy marks", color: "#B8B87C",
    content: {
      intro: "Many candidates lose marks not from mishearing but from incorrect spelling, misheard numbers, or formatting errors when transferring answers. Because the answer must be exactly right, mastering these mechanical details can lift your score by a full band — these are the easiest marks to protect.",
      sections: [
        { heading: "Spelling Must Be Correct", body: "An answer that is correct but misspelled is marked WRONG. Practise spelling common IELTS vocabulary: accommodation, restaurant, Wednesday, February, receipt, library, business. When a name or word is spelled out in the audio, write each letter precisely. Both British and American spellings are accepted (e.g. 'colour'/'color')." },
        { heading: "Numbers, Dates & Times", body: "Listen carefully to distinguish 'thirteen' (13) from 'thirty' (30) — the stress differs. Phone numbers are read digit by digit; 'double four' means '44', 'oh' or 'zero' means 0. Dates can be said many ways ('the third of May' = 3 May). Times: '8:15' may be 'quarter past eight' or 'eight fifteen'. Write numbers as digits to save time." },
        { heading: "Formatting & Transfer Errors", body: "Capitalise proper nouns (names, places, days). Don't add information not asked for. On paper tests, transfer answers carefully in the 10-minute window — align each answer with its question number and re-check spelling. A single misaligned answer can cascade into several wrong marks. Write clearly so the marker can read it." }
      ],
      tips: [
        "Memorise spellings of frequently tested words: accommodation, Wednesday, February, receipt, restaurant.",
        "Learn number traps: thirteen/thirty, fourteen/forty, fifteen/fifty, sixteen/sixty — the stress reveals which.",
        "'Double' before a digit means it repeats: 'double seven' = 77; 'oh' usually means zero.",
        "Capitalise proper nouns and days of the week — formatting errors can cost marks.",
        "On the paper test, use the 10-minute transfer window to double-check spelling and answer alignment."
      ]
    }
  },
  {
    id: "l-band", icon: "🎯", title: "Band Scores & Final Tips", subtitle: "Convert raw marks to bands", color: "#5B8DB8",
    content: {
      intro: "Understanding how raw scores convert to band scores helps you set realistic targets and know how many questions you need to answer correctly. The Listening test offers some of the most achievable marks in IELTS — with good technique, Parts 1 and 2 alone can secure a solid foundation.",
      sections: [
        { heading: "Raw Score to Band Conversion", body: "Out of 40: 39–40 = Band 9.0, 37–38 = Band 8.5, 35–36 = Band 8.0, 32–34 = Band 7.5, 30–31 = Band 7.0, 26–29 = Band 6.5, 23–25 = Band 6.0, 18–22 = Band 5.5, 16–17 = Band 5.0. Note these are approximate — exact boundaries vary slightly between test versions. To reach Band 7, aim to get around 30 of 40 correct." },
        { heading: "Where to Win Marks", body: "Parts 1 and 2 are the most accessible — secure these 20 marks with careful attention to form-filling, spelling, and numbers. Parts 3 and 4 are harder, but strong prediction and signpost-tracking can lift your performance significantly. Don't sacrifice easy Part 1 marks by being careless; they count exactly the same as hard Part 4 marks." },
        { heading: "On Test Day", body: "Arrive focused — Listening is usually the first test. Read questions ahead during every pause. Stay calm if you miss an answer; guess and move on. Use headphones (computer-based) or check audio quality (paper-based) before the test begins. In the final review window, prioritise spelling checks and ensuring no answer is left blank." }
      ],
      tips: [
        "Target ~30/40 correct for Band 7; ~35/40 for Band 8 — know your goal before test day.",
        "Protect easy Part 1 and 2 marks — they count as much as the hard ones in Part 4.",
        "Practise with a variety of accents (British, Australian, American, Canadian) — IELTS uses them all.",
        "Always read questions ahead during pauses — never sit idle while waiting for audio.",
        "Never leave a blank — an unanswered question is a guaranteed zero, while a guess might be right."
      ]
    }
  }
];

// ============================================================
// LISTENING EXERCISES DATA
// (audio exercises use the browser SpeechSynthesis API)
// ============================================================
const listeningExercises = {
  "l-overview": {
    type: "quiz", title: "Format & Rules Quiz",
    description: "Test your knowledge of the IELTS Listening test structure and rules.",
    questions: [
      { id: 1, question: "How many times do you hear each recording in the IELTS Listening test?", options: ["As many times as you want", "Twice", "Once only", "Three times"], correct: 2, explanation: "Each recording is played ONCE only. This is why prediction and reading questions in advance are critical skills." },
      { id: 2, question: "How many questions are there in total?", options: ["30", "40", "50", "60"], correct: 1, explanation: "There are 40 questions across 4 sections, each worth 1 mark, for a total of 40 marks." },
      { id: 3, question: "What happens if your answer is correct but misspelled?", options: ["It is accepted", "It is marked wrong", "Half a mark is awarded", "Only the first letter matters"], correct: 1, explanation: "Spelling must be correct. A correctly heard but misspelled answer is marked wrong, so accurate spelling is essential." },
      { id: 4, question: "In what order do the answers appear relative to the recording?", options: ["Random order", "Reverse order", "The same order as the recording", "Alphabetical order"], correct: 2, explanation: "Answers follow the same order as the recording. If you hear information for a later question, you've likely missed an earlier one — move on." },
      { id: 5, question: "Is the Listening test different for Academic and General Training candidates?", options: ["Yes, completely different", "No, it is identical for both", "Only Part 4 differs", "Academic has more questions"], correct: 1, explanation: "The Listening test is exactly the same for Academic and General Training candidates — only Reading and Writing differ between the two." }
    ]
  },
  "l-parts": {
    type: "quiz", title: "The Four Parts Quiz",
    description: "Identify the context and characteristics of each listening section.",
    questions: [
      { id: 1, question: "Part 1 of the Listening test typically features:", options: ["An academic lecture", "A conversation in an everyday social context", "A discussion between four students", "A radio news broadcast"], correct: 1, explanation: "Part 1 is a conversation between two people in an everyday social context, such as booking accommodation or making an enquiry." },
      { id: 2, question: "Which part is a monologue on an academic subject, like a university lecture?", options: ["Part 1", "Part 2", "Part 3", "Part 4"], correct: 3, explanation: "Part 4 is an academic monologue (lecture) by a single speaker, with no break in the middle. It is generally the most difficult section." },
      { id: 3, question: "Part 3 usually involves:", options: ["One person describing local facilities", "A conversation between up to four people in an educational setting", "An automated phone message", "A solo academic lecture"], correct: 1, explanation: "Part 3 is a discussion among up to four speakers (often students and a tutor) in an educational or training context." },
      { id: 4, question: "Which question type is most common in Part 2?", options: ["Essay writing", "Map or plan labelling", "Translation", "True/False/Not Given"], correct: 1, explanation: "Part 2 (a social monologue, e.g. a tour) frequently includes map/plan labelling, as well as multiple choice and matching." },
      { id: 5, question: "What is a key challenge specific to Part 4?", options: ["It is played three times", "There is no pause in the middle", "It has only two questions", "It is in a foreign language"], correct: 1, explanation: "Part 4 plays continuously with no break in the middle, so you must read all questions beforehand — there's no chance to catch up midway." }
    ]
  },
  "l-strategies": {
    type: "quiz", title: "Listening Strategy Quiz",
    description: "Test your understanding of prediction, signposting, and recovery techniques.",
    questions: [
      { id: 1, question: "What is the single most important thing to do during the pause before each section?", options: ["Close your eyes and relax", "Read the questions and predict the answers", "Write your name on the answer sheet", "Review the previous section"], correct: 1, explanation: "Use every pause to read upcoming questions and predict answer types. This primes you to catch answers the moment they're spoken." },
      { id: 2, question: "You miss the answer to question 12. What should you do?", options: ["Stop and wait for it to repeat", "Mark a guess and immediately focus on question 13", "Go back to question 11", "Leave both 12 and 13 blank"], correct: 1, explanation: "Never freeze. Mark a guess and lock onto the next question's keywords. Dwelling on a missed answer causes you to miss several more." },
      { id: 3, question: "The speaker says: 'The class is on Tuesday — actually, let me check — yes, it's Thursday.' The answer is:", options: ["Tuesday", "Thursday", "Both days", "Neither"], correct: 1, explanation: "This is a distractor. The word 'actually' signals a correction. The final, confirmed answer is Thursday, not the first-mentioned Tuesday." },
      { id: 4, question: "Why is predicting the grammatical form of an answer useful?", options: ["It impresses the examiner", "It helps you catch the right answer instantly when it's spoken", "It is required by the rules", "It changes your band score directly"], correct: 1, explanation: "Knowing whether you need a number, noun, or verb sharpens your focus so you recognise the answer immediately as it's said." },
      { id: 5, question: "Signpost words like 'moving on to' and 'finally' tell you:", options: ["The recording is about to repeat", "A topic shift is happening and a new answer may be approaching", "You should stop listening", "The speaker has made a mistake"], correct: 1, explanation: "Signposts guide you through the talk's structure and warn you when the topic is changing and a new answer is imminent." }
    ]
  },
  "l-form": {
    type: "audio", title: "Listening Practice: Form Completion",
    description: "Press play to hear a Part 1-style booking conversation, then complete the form. You can replay it while practising (real IELTS plays once).",
    wordLimit: "NO MORE THAN TWO WORDS AND/OR A NUMBER",
    transcript: "Good morning, Greenfield Leisure Centre, how can I help you? Hi, I'd like to register for the swimming course. Of course. Can I take your name? Yes, it's Daniel Foster. Could you spell the surname for me? Certainly, that's F-O-S-T-E-R. Thank you. And what's the best contact number? It's oh-seven-nine-double-two, three-one-five, four-eight-six. Great. Which course are you interested in? The intermediate adults' class. That one runs on Wednesday evenings. Perfect. And what time does it start? It begins at seven thirty. The course fee is ninety pounds for ten weeks. Lovely. Is there anything I need to bring? Just a towel and a swimming cap. The cap is compulsory in our pool. Understood. Where exactly is the centre located? We're on Maple Road, just opposite the public library. Brilliant, thank you very much.",
    questions: [
      { id: 1, label: "Name:", prefix: "Daniel", answer: "Foster", explanation: "The caller spells it out: F-O-S-T-E-R. Listen carefully to spelled-out names." },
      { id: 2, label: "Course level:", prefix: "", answer: "intermediate", acceptableAnswers: ["intermediate", "the intermediate"], explanation: "He asks for 'the intermediate adults' class'. 'Intermediate' is the level." },
      { id: 3, label: "Day of class:", prefix: "", answer: "wednesday", acceptableAnswers: ["wednesday"], explanation: "'That one runs on Wednesday evenings.' Remember to capitalise days of the week on your answer sheet." },
      { id: 4, label: "Start time:", prefix: "", answer: "7.30", acceptableAnswers: ["7.30", "7:30", "seven thirty", "half past seven", "7.30pm", "7:30pm"], explanation: "'It begins at seven thirty.' Numbers can be written as digits to save time." },
      { id: 5, label: "Course fee: £", prefix: "", answer: "90", acceptableAnswers: ["90", "ninety"], explanation: "'The course fee is ninety pounds.' The £ sign is already given, so write only the number." },
      { id: 6, label: "Must bring (compulsory):", prefix: "swimming", answer: "cap", acceptableAnswers: ["cap", "swimming cap"], explanation: "'The cap is compulsory in our pool.' A towel is needed too, but the cap is the compulsory item." },
      { id: 7, label: "Location: Maple Road, opposite the", prefix: "", answer: "library", acceptableAnswers: ["library", "public library"], explanation: "'We're on Maple Road, just opposite the public library.'" }
    ]
  },
  "l-mcq": {
    type: "audio", title: "Listening Practice: Multiple Choice",
    description: "Press play to hear a Part 2-style talk about a museum, then answer the questions. Listen for which option is confirmed — not just mentioned.",
    transcript: "Welcome to the City Heritage Museum. Before we begin our tour, a few practical points. The museum was originally built in eighteen ninety, though many visitors assume it dates from the eighteen seventies — in fact it's a little newer than that. Now, regarding photography: you're welcome to take photos in most galleries, but please note that flash photography is not permitted anywhere in the building, as it can damage the delicate artworks. The café on the ground floor is currently being refurbished, so for refreshments today please use the rooftop terrace café instead, which has lovely views over the city. Our most popular exhibit, by far, is the ancient coin collection — although the Roman pottery display also attracts a lot of interest, it's the coins that draw the biggest crowds. Finally, the gift shop closes thirty minutes before the museum itself, so do visit it before five thirty if you'd like a souvenir.",
    questions: [
      { id: 1, question: "When was the museum originally built?", options: ["A. The 1870s", "B. 1890", "C. The 1900s"], answer: "B", explanation: "The speaker says it was built in 1890, and corrects the assumption that it's from the 1870s ('in fact it's a little newer'). The 1870s is a distractor." },
      { id: 2, question: "What is the rule about photography?", options: ["A. No photography at all", "B. Photography is allowed but no flash", "C. Flash photography only"], answer: "B", explanation: "'You're welcome to take photos... but flash photography is not permitted.' Photos are fine; flash is banned." },
      { id: 3, question: "Where should visitors go for refreshments today?", options: ["A. The ground-floor café", "B. The rooftop terrace café", "C. A nearby restaurant"], answer: "B", explanation: "The ground-floor café is being refurbished, so visitors are directed to the rooftop terrace café. The ground-floor café is a distractor." },
      { id: 4, question: "Which is the museum's most popular exhibit?", options: ["A. The Roman pottery display", "B. The ancient coin collection", "C. The painting gallery"], answer: "B", explanation: "'It's the coins that draw the biggest crowds.' The Roman pottery is mentioned but explicitly said to be less popular than the coins." }
    ]
  },
  "l-matching": {
    type: "audio", title: "Listening Practice: Matching",
    description: "Press play to hear a Part 3-style discussion. Match each student to the part of the project they will work on.",
    transcript: "Right, let's divide up the group project on renewable energy. There are four of us — me, so that's Anna, plus Ben, Carla and David. I'm quite comfortable with statistics, so I'll take charge of analysing the survey data. That makes sense, Anna. Ben, what about you? Well, I'm not great with numbers, but I really enjoy writing, so I'd be happy to draft the final report. Good. Carla? I'd like to handle the interviews — I'm confident talking to people and I think gathering first-hand opinions will be valuable. Perfect. So that leaves the presentation slides for David. Actually, would you mind if I swapped? I'd much prefer to do the background research — reading up on the existing studies. I'm not very confident presenting. Oh, alright. So who'll do the slides then? I suppose I could add that to my report work, since they overlap. Great, thanks Ben. So we're all sorted.",
    matchOptions: [
      { key: "A", text: "Analysing survey data" },
      { key: "B", text: "Drafting the report and slides" },
      { key: "C", text: "Conducting interviews" },
      { key: "D", text: "Background research" }
    ],
    questions: [
      { id: 1, question: "Anna", answer: "A", explanation: "Anna says 'I'm quite comfortable with statistics, so I'll take charge of analysing the survey data.'" },
      { id: 2, question: "Ben", answer: "B", explanation: "Ben offers to 'draft the final report' and later agrees to add the slides since 'they overlap' — so he handles the report and slides." },
      { id: 3, question: "Carla", answer: "C", explanation: "Carla says 'I'd like to handle the interviews... gathering first-hand opinions.'" },
      { id: 4, question: "David", answer: "D", explanation: "David swaps away from slides: 'I'd much prefer to do the background research — reading up on the existing studies.' This is a distractor — he was initially assigned the slides." }
    ]
  },
  "l-map": {
    type: "quiz", title: "Map & Directions Language Quiz",
    description: "Test your knowledge of the directional language used in map and plan labelling questions.",
    questions: [
      { id: 1, question: "Before a map-labelling recording begins, your FIRST priority should be to:", options: ["Memorise all the labels", "Locate the starting point and compass directions", "Count the buildings", "Guess all the answers"], correct: 1, explanation: "Orient yourself first: find the entrance/starting point and the compass. The speaker almost always begins from a fixed reference point." },
      { id: 2, question: "'The library is opposite the main entrance.' This means the library is:", options: ["Next to the entrance", "Facing/across from the entrance", "Inside the entrance", "Behind a wall"], correct: 1, explanation: "'Opposite' means directly across from or facing something — a key directional word in map questions." },
      { id: 3, question: "'Go past the car park and it's at the far end on your left.' The location is:", options: ["Immediately before the car park", "At the distant end, on the left side", "Inside the car park", "On the right, nearby"], correct: 1, explanation: "'At the far end' means the distant end, and 'on your left' specifies the side. Trace the route as you listen." },
      { id: 4, question: "Which set contains ONLY location/direction words useful for map questions?", options: ["happy, quickly, very, quite", "opposite, adjacent to, between, beyond", "however, therefore, moreover, thus", "big, small, red, round"], correct: 1, explanation: "'Opposite, adjacent to, between, beyond' are all positional/directional terms essential for following a described route." },
      { id: 5, question: "If you lose track of where the speaker is on the map, the best recovery is to:", options: ["Give up on all map questions", "Listen for the next clearly named landmark to re-locate", "Start labelling randomly", "Ask the invigilator"], correct: 1, explanation: "Listen for the next named landmark already on your map — it anchors you back to the speaker's position." }
    ]
  },
  "l-sentence": {
    type: "audio", title: "Listening Practice: Sentence Completion",
    description: "Press play to hear a Part 4-style lecture extract on bees, then complete the sentences with words from the recording.",
    wordLimit: "NO MORE THAN TWO WORDS",
    transcript: "Today I want to talk about the remarkable communication system of honeybees. When a foraging bee discovers a good source of nectar, it returns to the hive and performs what scientists call a waggle dance. This dance conveys two crucial pieces of information to the other bees: the direction of the food source, and its distance from the hive. The angle of the dance, relative to the sun, indicates direction. Meanwhile, the duration of the waggle phase indicates distance — the longer the waggle, the further away the food. This was first decoded by the Austrian scientist Karl von Frisch, who won a Nobel Prize for his work in nineteen seventy-three. Interestingly, bees from different regions have slightly different dance dialects, much like human languages vary by region. Researchers have found that this dance is astonishingly accurate, allowing bees to locate flowers several kilometres away with impressive precision.",
    questions: [
      { id: 1, stem: "When a bee finds nectar, it returns to the hive and performs a", answer: "waggle dance", acceptableAnswers: ["waggle dance", "waggle-dance"], explanation: "'It returns to the hive and performs what scientists call a waggle dance.'" },
      { id: 2, stem: "The dance conveys the direction and the ___ of the food source.", answer: "distance", acceptableAnswers: ["distance"], explanation: "'Two crucial pieces of information: the direction... and its distance from the hive.'" },
      { id: 3, stem: "The angle of the dance, relative to the sun, indicates", answer: "direction", acceptableAnswers: ["direction"], explanation: "'The angle of the dance, relative to the sun, indicates direction.'" },
      { id: 4, stem: "The dance was first decoded by a scientist named Karl von", answer: "Frisch", acceptableAnswers: ["frisch", "von frisch"], explanation: "'This was first decoded by the Austrian scientist Karl von Frisch.' Note the spelling." },
      { id: 5, stem: "Bees from different regions have different dance", answer: "dialects", acceptableAnswers: ["dialects"], explanation: "'Bees from different regions have slightly different dance dialects.'" }
    ]
  },
  "l-signpost": {
    type: "quiz", title: "Signposting & Distractor Quiz",
    description: "Test your ability to recognise signpost language and avoid distractor traps.",
    questions: [
      { id: 1, question: "Which word is a classic signal that a CORRECTION (the real answer) is coming?", options: ["Therefore", "Actually", "Moreover", "Firstly"], correct: 1, explanation: "'Actually' (along with 'sorry', 'in fact', 'wait') signals the speaker is correcting themselves — the real answer usually follows." },
      { id: 2, question: "The speaker says: 'We'll meet in Room 12 — no, sorry, Room 20.' The correct room is:", options: ["Room 12", "Room 20", "Both", "Neither"], correct: 1, explanation: "'No, sorry' signals a correction. The final answer is Room 20. Room 12 is the distractor stated first." },
      { id: 3, question: "Words like 'moving on to' and 'turning now to' signal:", options: ["The end of the test", "A topic shift, meaning a new answer may be approaching", "A repeated section", "An error"], correct: 1, explanation: "These are topic-shift signposts — they tell you the speaker is changing focus, so a new answer is likely coming." },
      { id: 4, question: "Why should you NOT write an answer the instant you hear a match?", options: ["It wastes ink", "The speaker may correct or qualify it a moment later", "It's against the rules", "Answers must be written at the end only"], correct: 1, explanation: "Speakers often state something then correct it. Wait for the statement to finish to confirm the answer isn't overturned by a distractor." },
      { id: 5, question: "In 'I'd recommend the bus rather than the train', the recommended option is:", options: ["The train", "The bus", "Both equally", "Neither"], correct: 1, explanation: "'Rather than' flips the meaning — the bus is recommended OVER the train. Listen for negation/contrast words that reverse meaning." }
    ]
  },
  "l-spelling": {
    type: "quiz", title: "Spelling & Numbers Quiz",
    description: "Test your handling of spelling, numbers, and common formatting traps.",
    questions: [
      { id: 1, question: "Which word is spelled CORRECTLY?", options: ["Accomodation", "Acommodation", "Accommodation", "Accommadation"], correct: 2, explanation: "'Accommodation' (double-c, double-m) is one of the most commonly misspelled IELTS words. Memorise it." },
      { id: 2, question: "You hear 'double four, seven, oh, three'. Written as digits, this is:", options: ["4703", "44703", "447003", "4473"], correct: 1, explanation: "'Double four' = 44, then 7, then 'oh' = 0, then 3 → 44703. 'Oh' means zero in spoken numbers." },
      { id: 3, question: "How can you tell 'thirteen' from 'thirty' when listening?", options: ["They sound identical", "By the stress pattern — thir-TEEN vs THIR-ty", "Thirty is always written first", "There is no difference"], correct: 1, explanation: "The stress differs: 'thirTEEN' stresses the second syllable; 'THIRty' stresses the first. This applies to all -teen/-ty pairs." },
      { id: 4, question: "Which of these should always be capitalised in your answers?", options: ["Common nouns like 'table'", "Proper nouns like days, names, and places", "Verbs", "Adjectives"], correct: 1, explanation: "Capitalise proper nouns — days of the week (Monday), names (Foster), and places (Maple Road). Formatting errors can cost marks." },
      { id: 5, question: "'The third of May' should be written as:", options: ["3 May or 3rd May", "May third only", "The third May", "5 March"], correct: 0, explanation: "'The third of May' = 3 May (or 3rd May). Note: 'May' is the month — don't confuse with March. Both digit forms are accepted." }
    ]
  },
  "l-band": {
    type: "quiz", title: "Band Score & Final Tips Quiz",
    description: "Test your knowledge of score conversion and test-day strategy.",
    questions: [
      { id: 1, question: "Roughly how many correct answers (out of 40) are needed for Band 7?", options: ["About 20", "About 30", "About 38", "About 15"], correct: 1, explanation: "Around 30 of 40 correct typically yields Band 7. For Band 8, aim for around 35." },
      { id: 2, question: "Which parts offer the most accessible marks?", options: ["Parts 3 and 4", "Parts 1 and 2", "Only Part 4", "All parts are equally hard"], correct: 1, explanation: "Parts 1 and 2 (everyday contexts) are the most accessible. Secure these marks carefully — they count just as much as harder ones." },
      { id: 3, question: "Why should you never leave an answer blank?", options: ["It's against the rules", "There's no penalty for wrong answers, so a guess might be right", "Blanks lower your band automatically", "The examiner gets annoyed"], correct: 1, explanation: "There is no penalty for wrong answers. A blank is a guaranteed zero, but a guess has a chance of being correct." },
      { id: 4, question: "What accents should you prepare for in IELTS Listening?", options: ["Only British", "Only American", "A range including British, Australian, American and Canadian", "No accents — it's all neutral"], correct: 2, explanation: "IELTS uses a variety of native-speaker accents. Practising with different accents prepares you for whatever the test plays." },
      { id: 5, question: "During the answer review/transfer window, your priority should be to:", options: ["Change every answer", "Check spelling and ensure no answer is left blank", "Add extra detail to answers", "Rewrite everything neatly only"], correct: 1, explanation: "Use the review window to check spelling, fix formatting, and make sure every question has an answer — even a guess." }
    ]
  }
};

// ============================================================
// SPEECH SYNTHESIS HOOK & AUDIO PLAYER
// ============================================================
function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(true);
  const utterRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) setSupported(false);
    return () => { if (window.speechSynthesis) window.speechSynthesis.cancel(); };
  }, []);

  const speak = (text, rate = 0.92) => {
    if (!window.speechSynthesis) { setSupported(false); return; }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const enVoice = voices.find(v => /en-GB/i.test(v.lang)) || voices.find(v => /en/i.test(v.lang));
    if (enVoice) u.voice = enVoice;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    utterRef.current = u;
    setSpeaking(true);
    window.speechSynthesis.speak(u);
  };
  const stop = () => { if (window.speechSynthesis) window.speechSynthesis.cancel(); setSpeaking(false); };
  return { speak, stop, speaking, supported };
}

function AudioPlayer({ transcript, color, label = "Audio Recording" }) {
  const { speak, stop, speaking, supported } = useSpeech();
  const [showTranscript, setShowTranscript] = useState(false);
  const [rate, setRate] = useState(0.92);
  return (
    <div style={{ background: "#1A1D2E", border: `1px solid ${color}40`, borderRadius: 12, padding: 18, marginBottom: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <div style={{ fontSize: 24 }}>🎧</div>
        <div style={{ flex: 1, minWidth: 120 }}>
          <div style={{ fontSize: 13, fontWeight: "bold", color, fontFamily: "sans-serif" }}>{label}</div>
          <div style={{ fontSize: 11, color: "#6A6458", fontFamily: "sans-serif" }}>{speaking ? "Playing..." : "Press play to listen"}</div>
        </div>
        {supported ? (
          <>
            {!speaking ? (
              <button onClick={() => speak(transcript, rate)} style={{ background: color, border: "none", borderRadius: 8, padding: "9px 20px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold", display: "flex", alignItems: "center", gap: 6 }}>▶ Play</button>
            ) : (
              <button onClick={stop} style={{ background: "#CF6679", border: "none", borderRadius: 8, padding: "9px 20px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold", display: "flex", alignItems: "center", gap: 6 }}>■ Stop</button>
            )}
            <select value={rate} onChange={e => setRate(parseFloat(e.target.value))} style={{ background: "#0F1117", border: "1px solid #2A2D3E", borderRadius: 6, padding: "8px 10px", color: "#C8C0B0", fontFamily: "sans-serif", fontSize: 12, cursor: "pointer" }}>
              <option value={0.75}>0.75× slow</option>
              <option value={0.92}>1× normal</option>
              <option value={1.1}>1.1× fast</option>
            </select>
          </>
        ) : (
          <div style={{ fontSize: 12, color: "#CF6679", fontFamily: "sans-serif", maxWidth: 220 }}>Audio playback isn't supported in this browser. Use the transcript below to practise.</div>
        )}
      </div>
      <button onClick={() => setShowTranscript(s => !s)} style={{ background: "transparent", border: "none", color: "#6A6458", fontFamily: "sans-serif", fontSize: 11, cursor: "pointer", marginTop: 10, textDecoration: "underline", padding: 0 }}>
        {showTranscript ? "Hide transcript" : "Show transcript (for review after attempting)"}
      </button>
      {showTranscript && <p style={{ fontSize: 13, lineHeight: 1.8, color: "#8A8070", marginTop: 8, marginBottom: 0, fontStyle: "italic", borderTop: "1px solid #2A2D3E", paddingTop: 10 }}>{transcript}</p>}
    </div>
  );
}

// ============================================================
// LISTENING PRACTICE EXERCISE COMPONENT
// ============================================================
function ListeningPracticeExercise({ exercise, color }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const setAns = (id, val) => { setAnswers(p => ({ ...p, [id]: val })); if (checked) setChecked(false); };

  const checkOne = (q) => {
    const ua = (answers[q.id] || "").toLowerCase().trim();
    if (exercise.type === "quiz") return parseInt(answers[q.id]) === q.correct;
    if (q.acceptableAnswers) return q.acceptableAnswers.some(a => a.toLowerCase() === ua);
    return ua === (q.answer || "").toLowerCase().trim();
  };
  const score = checked ? exercise.questions.filter(checkOne).length : 0;

  const inputStyle = (correct) => ({
    background: checked ? (correct ? "#1A3A1E" : "#3A1A1E") : "#0F1117",
    border: `1px solid ${checked ? (correct ? "#5BAF73" : "#CF6679") : "#3A3D4E"}`,
    borderRadius: 6, padding: "8px 12px", color: "#E8E0D0",
    fontFamily: "Georgia, serif", fontSize: 14, outline: "none", minWidth: 160
  });

  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ marginBottom: 18, padding: "12px 16px", background: `${color}15`, borderLeft: `3px solid ${color}`, borderRadius: "0 8px 8px 0" }}>
        <div style={{ fontSize: 13, fontFamily: "sans-serif", color, fontWeight: "bold", marginBottom: 4 }}>{exercise.title}</div>
        <div style={{ fontSize: 13, color: "#B0A898" }}>{exercise.description}</div>
      </div>

      {exercise.type === "audio" && <AudioPlayer transcript={exercise.transcript} color={color} />}

      {exercise.wordLimit && (
        <div style={{ fontSize: 12, color: "#8A8070", fontFamily: "sans-serif", marginBottom: 14, background: "#0F1117", border: "1px solid #2A2D3E", borderRadius: 6, padding: "8px 12px" }}>
          Word limit: {exercise.wordLimit}
        </div>
      )}

      {/* QUIZ */}
      {exercise.type === "quiz" && (
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
      )}

      {/* AUDIO — FORM COMPLETION */}
      {exercise.type === "audio" && exercise.questions[0].label !== undefined && (
        <div style={{ background: "#13161F", border: "1px solid #2A2D3E", borderRadius: 10, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color, fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 14 }}>📋 COMPLETE THE FORM</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {exercise.questions.map(q => {
              const correct = checked ? checkOne(q) : null;
              return (
                <div key={q.id}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ color, fontWeight: "bold", fontFamily: "sans-serif", fontSize: 13, minWidth: 24 }}>Q{q.id}</span>
                    <span style={{ fontSize: 14, color: "#C8C0B0" }}>{q.label}</span>
                    {q.prefix && <span style={{ fontSize: 14, color: "#8A8070" }}>{q.prefix}</span>}
                    <input value={answers[q.id] || ""} onChange={e => !checked && setAns(q.id, e.target.value)} placeholder="..." style={inputStyle(correct)} />
                    {checked && <span style={{ color: correct ? "#5BAF73" : "#CF6679", fontFamily: "sans-serif", fontSize: 14 }}>{correct ? "✓" : `✗ ${q.answer}`}</span>}
                  </div>
                  {checked && !correct && <div style={{ fontSize: 12, color: "#8A8070", lineHeight: 1.6, marginTop: 4, paddingLeft: 34 }}>{q.explanation}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AUDIO — MCQ */}
      {exercise.type === "audio" && exercise.questions[0].options !== undefined && (
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
          {exercise.questions.map(q => {
            return (
              <div key={q.id} style={{ background: "#13161F", border: "1px solid #2A2D3E", borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 14, color: "#E8E0D0", marginBottom: 10, lineHeight: 1.6 }}>
                  <span style={{ color, fontWeight: "bold", marginRight: 8, fontFamily: "sans-serif" }}>Q{q.id}.</span>{q.question}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {q.options.map(opt => {
                    const letter = opt[0];
                    const isSel = answers[q.id] === letter;
                    const isRight = letter === q.answer;
                    const bg = checked ? (isRight ? "#1A3A1E" : (isSel && !isRight ? "#3A1A1E" : "#0F1117")) : (isSel ? "#1E2040" : "#0F1117");
                    const bc = checked ? (isRight ? "#5BAF73" : (isSel && !isRight ? "#CF6679" : "#2A2D3E")) : (isSel ? color : "#2A2D3E");
                    return (
                      <button key={letter} onClick={() => !checked && setAns(q.id, letter)} style={{ background: bg, border: `1px solid ${bc}`, borderRadius: 7, padding: "9px 14px", cursor: checked ? "default" : "pointer", color: "#C8C0B0", fontFamily: "Georgia, serif", fontSize: 13, textAlign: "left", transition: "all 0.15s" }}>
                        {opt}
                        {checked && isRight && <span style={{ color: "#5BAF73", marginLeft: 8, fontSize: 12 }}>✓</span>}
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
      )}

      {/* AUDIO — MATCHING */}
      {exercise.type === "audio" && exercise.matchOptions !== undefined && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 10, padding: 16, marginBottom: 14 }}>
            <div style={{ fontSize: 11, letterSpacing: 1, color: "#8A8070", fontFamily: "sans-serif", marginBottom: 10 }}>OPTIONS</div>
            {exercise.matchOptions.map(o => (
              <div key={o.key} style={{ fontSize: 13, color: "#B0A898", padding: "3px 0", fontFamily: "Georgia, serif" }}>
                <span style={{ color, fontWeight: "bold" }}>{o.key}.</span> {o.text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {exercise.questions.map(q => {
              const correct = checked ? checkOne(q) : null;
              return (
                <div key={q.id} style={{ background: "#13161F", border: `1px solid ${checked ? (correct ? "#5BAF73" : "#CF6679") : "#2A2D3E"}`, borderRadius: 8, padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ color, fontWeight: "bold", fontFamily: "sans-serif", fontSize: 13 }}>Q{q.id}</span>
                    <span style={{ fontSize: 14, color: "#C8C0B0", flex: 1, fontWeight: "bold" }}>{q.question}</span>
                    <select value={answers[q.id] || ""} onChange={e => !checked && setAns(q.id, e.target.value)} style={{ background: "#0F1117", border: "1px solid #3A3D4E", borderRadius: 6, padding: "6px 10px", color: "#E8E0D0", fontFamily: "sans-serif", fontSize: 13, cursor: checked ? "default" : "pointer" }}>
                      <option value="">—</option>
                      {exercise.matchOptions.map(o => <option key={o.key} value={o.key}>{o.key}</option>)}
                    </select>
                    {checked && <span style={{ color: correct ? "#5BAF73" : "#CF6679", fontFamily: "sans-serif" }}>{correct ? "✓" : `✗ → ${q.answer}`}</span>}
                  </div>
                  {checked && <div style={{ fontSize: 12, color: "#8A8070", lineHeight: 1.6, marginTop: 6, paddingLeft: 32 }}>{q.explanation}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AUDIO — SENTENCE COMPLETION */}
      {exercise.type === "audio" && exercise.questions[0].stem !== undefined && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
          {exercise.questions.map(q => {
            const correct = checked ? checkOne(q) : null;
            return (
              <div key={q.id} style={{ background: "#13161F", border: `1px solid ${checked ? (correct ? "#5BAF73" : "#CF6679") : "#2A2D3E"}`, borderRadius: 8, padding: "14px 16px" }}>
                <div style={{ fontSize: 14, color: "#C8C0B0", marginBottom: 10, lineHeight: 1.6 }}>
                  <span style={{ color, fontWeight: "bold", marginRight: 8, fontFamily: "sans-serif" }}>Q{q.id}.</span>{q.stem} <span style={{ background: "#2A2D3E", padding: "1px 6px", borderRadius: 3, color: "#E8E0D0" }}>___</span>
                </div>
                <input value={answers[q.id] || ""} onChange={e => !checked && setAns(q.id, e.target.value)} placeholder="Your answer..." style={{ ...inputStyle(correct), width: "100%", boxSizing: "border-box", minWidth: 0 }} />
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
      )}

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
// LISTENING STUDY MODE
// ============================================================
function ListeningStudyMode({ onStartTest, onBack }) {
  const [activeId, setActiveId] = useState("l-overview");
  const [activeTab, setActiveTab] = useState("learn");
  const [expandedTip, setExpandedTip] = useState(null);
  const active = listeningCurriculum.find(c => c.id === activeId);
  const exercise = listeningExercises[activeId];
  const selectTopic = (id) => { setActiveId(id); setActiveTab("learn"); setExpandedTip(null); };
  const idx = listeningCurriculum.findIndex(c => c.id === activeId);
  return (
    <div style={{ minHeight: "100vh", background: "#0F1117", fontFamily: "Georgia, serif", color: "#E8E0D0", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg, #1A1D2E 0%, #0F1117 100%)", borderBottom: "1px solid #2A2D3E", padding: "20px 28px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg, #B87CB8, #7A4A7A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🎧</div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#B87CB8", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 2 }}>IELTS MASTERCLASS</div>
          <div style={{ fontSize: 20, fontWeight: "bold", color: "#F0E8D0", lineHeight: 1 }}>Listening Module — Complete Guide</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={onBack} style={{ background: "transparent", border: "1px solid #2A2D3E", borderRadius: 8, padding: "9px 16px", cursor: "pointer", color: "#8A8070", fontFamily: "sans-serif", fontSize: 12 }}>← All Modules</button>
          <button onClick={onStartTest} style={{ background: "linear-gradient(135deg, #B87CB8, #7A4A7A)", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 0.5 }}>🎧 Full Listening Test</button>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ width: 232, background: "#13161F", borderRight: "1px solid #2A2D3E", overflowY: "auto", flexShrink: 0, padding: "10px 0" }}>
          {listeningCurriculum.map(item => (
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
                  {tab === "learn" ? "📖 Learn" : "🎧 Practice"}
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
                  {idx > 0 && <button onClick={() => selectTopic(listeningCurriculum[idx - 1].id)} style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: "#C8C0B0", fontFamily: "sans-serif", fontSize: 12 }}>← Previous</button>}
                  <div style={{ flex: 1 }} />
                  <button onClick={() => setActiveTab("practice")} style={{ background: `${active.color}22`, border: `1px solid ${active.color}60`, borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: active.color, fontFamily: "sans-serif", fontSize: 12, fontWeight: "bold" }}>🎧 Try Practice Exercise</button>
                  {idx < listeningCurriculum.length - 1 && <button onClick={() => selectTopic(listeningCurriculum[idx + 1].id)} style={{ background: active.color, border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 12, fontWeight: "bold" }}>Next →</button>}
                </div>
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 10, color: "#4A4438", fontFamily: "sans-serif", letterSpacing: 1 }}>PROGRESS</span>
                    <span style={{ fontSize: 10, color: active.color, fontFamily: "sans-serif" }}>{idx + 1} / {listeningCurriculum.length}</span>
                  </div>
                  <div style={{ height: 3, background: "#2A2D3E", borderRadius: 3 }}>
                    <div style={{ height: "100%", borderRadius: 3, background: active.color, width: `${((idx + 1) / listeningCurriculum.length) * 100}%`, transition: "width 0.4s ease" }} />
                  </div>
                </div>
              </div>
            )}
            {activeTab === "practice" && exercise && <ListeningPracticeExercise exercise={exercise} color={active.color} />}
            {activeTab === "practice" && !exercise && <div style={{ padding: 40, textAlign: "center", color: "#5A5448", fontSize: 14 }}>No practice exercise available for this topic yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LISTENING TEST MODE — 40 questions, 4 parts, TTS audio
// ============================================================
const listeningTestData = [
  {
    part: 1, context: "A conversation between a customer and a travel agent about booking a holiday.",
    transcript: "Hello, Sunseeker Travel, how may I help you? Hi, I'd like to enquire about your holiday packages to Greece. Wonderful. May I take your name? Yes, it's Helen Marsh. That's M-A-R-S-H. Thank you, Helen. And how many people will be travelling? There'll be four of us in total. Lovely. Do you have a preferred departure month? We were thinking of August. August is very popular, so I'd recommend booking early. Which airport would you like to fly from? Manchester, if possible. That's fine, we have direct flights from Manchester. Now, the standard package costs six hundred and fifty pounds per person, and that includes flights and accommodation. Does that include meals? Breakfast is included, but lunch and dinner are extra. I see. And how long is the holiday? It's a seven-night stay. Perfect. Is there anything else included? Yes, there's a free airport transfer to your hotel. And finally, could I get a contact number? Of course, it's oh-one-six-one, double two-four, nine-one-three-eight.",
    questions: [
      { id: 1, type: "completion", label: "Customer name: Helen", answer: "Marsh", acceptableAnswers: ["marsh"], wordLimit: "ONE WORD", explanation: "Spelled out: M-A-R-S-H." },
      { id: 2, type: "completion", label: "Number of travellers:", answer: "4", acceptableAnswers: ["4", "four"], wordLimit: "A NUMBER", explanation: "'There'll be four of us in total.'" },
      { id: 3, type: "completion", label: "Departure month:", answer: "August", acceptableAnswers: ["august"], wordLimit: "ONE WORD", explanation: "'We were thinking of August.'" },
      { id: 4, type: "completion", label: "Departure airport:", answer: "Manchester", acceptableAnswers: ["manchester"], wordLimit: "ONE WORD", explanation: "'Manchester, if possible... direct flights from Manchester.'" },
      { id: 5, type: "completion", label: "Standard package cost per person: £", answer: "650", acceptableAnswers: ["650"], wordLimit: "A NUMBER", explanation: "'Six hundred and fifty pounds per person.'" },
      { id: 6, type: "completion", label: "Meal included:", answer: "breakfast", acceptableAnswers: ["breakfast"], wordLimit: "ONE WORD", explanation: "'Breakfast is included, but lunch and dinner are extra.'" },
      { id: 7, type: "completion", label: "Length of stay (nights):", answer: "7", acceptableAnswers: ["7", "seven"], wordLimit: "A NUMBER", explanation: "'It's a seven-night stay.'" },
      { id: 8, type: "completion", label: "Free extra: airport", answer: "transfer", acceptableAnswers: ["transfer"], wordLimit: "ONE WORD", explanation: "'There's a free airport transfer to your hotel.'" },
      { id: 9, type: "mcq", question: "What does the agent recommend?", options: ["A. Travelling in a different month", "B. Booking early", "C. Flying from a different airport"], answer: "B", explanation: "'August is very popular, so I'd recommend booking early.'" },
      { id: 10, type: "mcq", question: "Which meals are NOT included?", options: ["A. Breakfast only", "B. All meals", "C. Lunch and dinner"], answer: "C", explanation: "'Breakfast is included, but lunch and dinner are extra.'" }
    ]
  },
  {
    part: 2, context: "A monologue: a community centre manager describing facilities and a weekly schedule.",
    transcript: "Welcome, everyone, to the Riverside Community Centre. Let me run through what we offer. Our main hall is the largest space and is used for fitness classes throughout the week. On Mondays, we have yoga in the morning, which is particularly popular with our older members. Tuesdays are reserved for the children's art club, so the centre can get quite lively. On Wednesday evenings, the hall transforms into a venue for our amateur dramatics group, who are currently rehearsing a play. Thursday is our quietest day — the hall is available for private bookings, such as birthday parties. And on Fridays, we host a community film night, which is free for all members. Now, regarding the facilities: the café is located just to the left as you enter, opposite the reception desk. The library and reading room are at the far end of the corridor, past the toilets. One important change: our car park is currently closed for resurfacing, so please use the street parking on Bridge Lane for the time being. Membership costs forty pounds a year, which gives you access to all activities.",
    questions: [
      { id: 11, type: "matching", question: "Monday", answer: "A", explanation: "'On Mondays, we have yoga.'" },
      { id: 12, type: "matching", question: "Tuesday", answer: "C", explanation: "'Tuesdays are reserved for the children's art club.'" },
      { id: 13, type: "matching", question: "Wednesday", answer: "D", explanation: "'On Wednesday evenings... amateur dramatics group.'" },
      { id: 14, type: "matching", question: "Friday", answer: "B", explanation: "'On Fridays, we host a community film night.'" },
      { id: 15, type: "mcq", question: "Where is the café located?", options: ["A. To the right of the entrance", "B. To the left, opposite reception", "C. At the far end of the corridor"], answer: "B", explanation: "'The café is located just to the left as you enter, opposite the reception desk.'" },
      { id: 16, type: "mcq", question: "Why is the car park closed?", options: ["A. For resurfacing", "B. For a private event", "C. It is being demolished"], answer: "A", explanation: "'Our car park is currently closed for resurfacing.'" },
      { id: 17, type: "mcq", question: "Where should visitors park instead?", options: ["A. In the main hall", "B. On Bridge Lane", "C. At the library"], answer: "B", explanation: "'Please use the street parking on Bridge Lane.'" },
      { id: 18, type: "completion", label: "Thursday: hall available for", answer: "private bookings", acceptableAnswers: ["private bookings", "private booking"], wordLimit: "TWO WORDS", explanation: "'Thursday... the hall is available for private bookings.'" },
      { id: 19, type: "completion", label: "The library is past the", answer: "toilets", acceptableAnswers: ["toilets", "the toilets"], wordLimit: "ONE WORD", explanation: "'The library and reading room are at the far end of the corridor, past the toilets.'" },
      { id: 20, type: "completion", label: "Annual membership cost: £", answer: "40", acceptableAnswers: ["40", "forty"], wordLimit: "A NUMBER", explanation: "'Membership costs forty pounds a year.'" }
    ],
    matchOptions: [
      { key: "A", text: "Yoga" },
      { key: "B", text: "Film night" },
      { key: "C", text: "Children's art club" },
      { key: "D", text: "Amateur dramatics" }
    ]
  },
  {
    part: 3, context: "A discussion between two students, Maya and Tom, and their tutor about a research project.",
    transcript: "So, Maya and Tom, how is your research project on urban gardening progressing? Quite well, I think. We've collected most of our survey data. Good. What method did you use? We used online questionnaires, which let us reach a large number of participants quickly. That's sensible. Any difficulties? Well, our main challenge was the low response rate at first. Many people started the survey but didn't finish it. How did you address that? We shortened the questionnaire, and the completion rate improved significantly after that. Excellent problem-solving. Tom, what did the data reveal? The most striking finding was that younger residents were far more interested in community gardens than we expected. We'd assumed older people would be the keenest. An interesting surprise. And what do you plan to do next? We're going to conduct a few face-to-face interviews to explore the reasons behind that result. Good idea — qualitative data will add depth. One suggestion: make sure you record the interviews so you don't miss anything. That's a great point, we'll do that. And when is your deadline? The final report is due on the fifteenth of March. Plenty of time, then. Make sure you leave a week for proofreading.",
    questions: [
      { id: 21, type: "mcq", question: "What research method did the students use to collect data?", options: ["A. Face-to-face interviews", "B. Online questionnaires", "C. Laboratory experiments"], answer: "B", explanation: "'We used online questionnaires, which let us reach a large number of participants quickly.'" },
      { id: 22, type: "mcq", question: "What was their main initial difficulty?", options: ["A. A low response rate", "B. Lack of funding", "C. Too much data"], answer: "A", explanation: "'Our main challenge was the low response rate at first.'" },
      { id: 23, type: "mcq", question: "How did they solve this problem?", options: ["A. They offered a prize", "B. They shortened the questionnaire", "C. They extended the deadline"], answer: "B", explanation: "'We shortened the questionnaire, and the completion rate improved significantly.'" },
      { id: 24, type: "mcq", question: "What was the most striking finding?", options: ["A. Older residents were the keenest gardeners", "B. Younger residents were more interested than expected", "C. No one was interested in community gardens"], answer: "B", explanation: "'Younger residents were far more interested in community gardens than we expected.' The assumption about older people is a distractor." },
      { id: 25, type: "mcq", question: "What will the students do next?", options: ["A. Conduct face-to-face interviews", "B. Repeat the online survey", "C. Abandon the project"], answer: "A", explanation: "'We're going to conduct a few face-to-face interviews.'" },
      { id: 26, type: "completion", label: "The tutor suggests they ___ the interviews.", answer: "record", acceptableAnswers: ["record"], wordLimit: "ONE WORD", explanation: "'Make sure you record the interviews so you don't miss anything.'" },
      { id: 27, type: "completion", label: "The interviews will provide ___ data.", answer: "qualitative", acceptableAnswers: ["qualitative"], wordLimit: "ONE WORD", explanation: "'Qualitative data will add depth.'" },
      { id: 28, type: "completion", label: "Final report deadline: 15th of", answer: "March", acceptableAnswers: ["march"], wordLimit: "ONE WORD", explanation: "'The final report is due on the fifteenth of March.'" },
      { id: 29, type: "completion", label: "The tutor advises leaving a week for", answer: "proofreading", acceptableAnswers: ["proofreading"], wordLimit: "ONE WORD", explanation: "'Make sure you leave a week for proofreading.'" },
      { id: 30, type: "mcq", question: "What is the project's topic?", options: ["A. Urban gardening", "B. Air pollution", "C. Public transport"], answer: "A", explanation: "'How is your research project on urban gardening progressing?'" }
    ]
  },
  {
    part: 4, context: "An academic lecture on the history and science of chocolate.",
    transcript: "Today's lecture concerns the fascinating history of chocolate. Chocolate comes from the seeds of the cacao tree, which is native to the tropical regions of Central and South America. The ancient Maya and Aztec civilisations were the first to cultivate cacao, and they valued it so highly that the beans were actually used as a form of currency. They consumed chocolate as a bitter drink, often flavoured with spices such as chilli — quite different from the sweet chocolate we know today. Chocolate was introduced to Europe in the sixteenth century, where sugar was added to make it more palatable to European tastes. For a long time, it remained an expensive luxury, affordable only to the wealthy. This changed during the Industrial Revolution, when new machinery made mass production possible, dramatically reducing the price. A key breakthrough came in eighteen forty-seven, when the first solid chocolate bar was produced in England. Later, in eighteen seventy-five, a Swiss manufacturer invented milk chocolate by adding condensed milk. From a scientific perspective, chocolate contains a stimulant called theobromine, which is similar to caffeine. It also contains compounds that some studies suggest may improve mood. However, I should emphasise that the health benefits are often exaggerated, and chocolate remains high in sugar and fat. Next week, we'll examine the modern cocoa trade and the sustainability challenges facing the industry.",
    questions: [
      { id: 31, type: "completion", label: "Chocolate comes from the seeds of the ___ tree.", answer: "cacao", acceptableAnswers: ["cacao", "cocoa"], wordLimit: "ONE WORD", explanation: "'Chocolate comes from the seeds of the cacao tree.'" },
      { id: 32, type: "completion", label: "The Maya and Aztec used the beans as a form of", answer: "currency", acceptableAnswers: ["currency", "money"], wordLimit: "ONE WORD", explanation: "'The beans were actually used as a form of currency.'" },
      { id: 33, type: "completion", label: "Early chocolate was a bitter drink flavoured with spices such as", answer: "chilli", acceptableAnswers: ["chilli", "chili"], wordLimit: "ONE WORD", explanation: "'Often flavoured with spices such as chilli.'" },
      { id: 34, type: "completion", label: "Chocolate reached Europe in the ___ century.", answer: "sixteenth", acceptableAnswers: ["sixteenth", "16th"], wordLimit: "ONE WORD", explanation: "'Chocolate was introduced to Europe in the sixteenth century.'" },
      { id: 35, type: "completion", label: "In Europe, ___ was added to improve the taste.", answer: "sugar", acceptableAnswers: ["sugar"], wordLimit: "ONE WORD", explanation: "'Sugar was added to make it more palatable.'" },
      { id: 36, type: "mcq", question: "What made chocolate cheaper during the Industrial Revolution?", options: ["A. New machinery enabling mass production", "B. Lower cacao taxes", "C. Government subsidies"], answer: "A", explanation: "'New machinery made mass production possible, dramatically reducing the price.'" },
      { id: 37, type: "completion", label: "The first solid chocolate bar was produced in", answer: "1847", acceptableAnswers: ["1847"], wordLimit: "A NUMBER", explanation: "'In eighteen forty-seven, the first solid chocolate bar was produced in England.'" },
      { id: 38, type: "completion", label: "Milk chocolate was invented by adding condensed", answer: "milk", acceptableAnswers: ["milk"], wordLimit: "ONE WORD", explanation: "'A Swiss manufacturer invented milk chocolate by adding condensed milk.'" },
      { id: 39, type: "completion", label: "Chocolate contains a stimulant called", answer: "theobromine", acceptableAnswers: ["theobromine"], wordLimit: "ONE WORD", explanation: "'Chocolate contains a stimulant called theobromine, which is similar to caffeine.'" },
      { id: 40, type: "mcq", question: "What does the lecturer say about chocolate's health benefits?", options: ["A. They are scientifically proven", "B. They are often exaggerated", "C. There are none at all"], answer: "B", explanation: "'I should emphasise that the health benefits are often exaggerated.'" }
    ]
  }
];

const LISTENING_BANDS = [
  { min: 39, band: "9.0" }, { min: 37, band: "8.5" }, { min: 35, band: "8.0" },
  { min: 32, band: "7.5" }, { min: 30, band: "7.0" }, { min: 26, band: "6.5" },
  { min: 23, band: "6.0" }, { min: 18, band: "5.5" }, { min: 16, band: "5.0" },
  { min: 13, band: "4.5" }, { min: 10, band: "4.0" }, { min: 0, band: "<4.0" }
];
function getListeningBand(score) { for (const b of LISTENING_BANDS) if (score >= b.min) return b.band; return "<4.0"; }

function checkListeningAnswer(q, ua) {
  if (!ua || ua.trim() === "") return false;
  const u = ua.toLowerCase().trim();
  if (q.acceptableAnswers) return q.acceptableAnswers.some(a => a.toLowerCase() === u);
  return u === (q.answer || "").toLowerCase().trim();
}

function ListeningTestMode({ onExit }) {
  const [phase, setPhase] = useState("start");
  const [currentPart, setCurrentPart] = useState(0);
  const [answers, setAnswers] = useState({});
  const { speak, stop, speaking, supported } = useSpeech();

  const part = listeningTestData[currentPart];
  const allQuestions = listeningTestData.flatMap(p => p.questions);
  const score = allQuestions.filter(q => checkListeningAnswer(q, answers[q.id])).length;
  const band = getListeningBand(score);
  const answeredCount = Object.values(answers).filter(v => v && v.trim() !== "").length;
  const setAns = (id, val) => setAnswers(p => ({ ...p, [id]: val }));

  if (phase === "start") return (
    <div style={{ minHeight: "100vh", background: "#0F1117", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, fontFamily: "Georgia, serif", color: "#E8E0D0" }}>
      <div style={{ maxWidth: 680, width: "100%" }}>
        <button onClick={onExit} style={{ background: "transparent", border: "1px solid #2A2D3E", borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: "#8A8070", fontFamily: "sans-serif", fontSize: 12, marginBottom: 32 }}>← Back to Listening Module</button>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎧</div>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#B87CB8", fontFamily: "sans-serif", marginBottom: 8 }}>IELTS LISTENING</div>
          <h1 style={{ fontSize: 32, margin: "0 0 10px", color: "#F0E8D0" }}>Full Listening Test</h1>
          <p style={{ color: "#8A8070", fontSize: 14, lineHeight: 1.65, margin: 0 }}>4 parts · 40 questions · Audio narrated by your browser's speech engine. Answer as you listen, then submit for instant scoring and a band estimate.</p>
        </div>
        <div style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 10, padding: 16, marginBottom: 18 }}>
          {listeningTestData.map(p => (
            <div key={p.part} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: p.part < 4 ? "1px solid #2A2D3E" : "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#B87CB822", border: "1px solid #B87CB8", color: "#B87CB8", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold", flexShrink: 0 }}>{p.part}</div>
              <div>
                <div style={{ fontSize: 13, color: "#E8E0D0", fontFamily: "sans-serif" }}>Part {p.part} — Questions {p.questions[0].id}–{p.questions[p.questions.length - 1].id}</div>
                <div style={{ fontSize: 11, color: "#6A6458" }}>{p.context}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "#1E1A10", border: "1px solid #C8A95140", borderRadius: 10, padding: "12px 16px", marginBottom: 22 }}>
          <span style={{ fontSize: 12, color: "#C8A951", fontFamily: "sans-serif", lineHeight: 1.6 }}>💡 In the real exam, audio plays ONCE. For practice, you may replay each part — but try a single listen first to simulate test conditions.{!supported && " ⚠️ Audio isn't supported in this browser; transcripts are provided so you can still practise."}</span>
        </div>
        <button onClick={() => setPhase("inprogress")} style={{ width: "100%", background: "linear-gradient(135deg, #B87CB8, #7A4A7A)", border: "none", borderRadius: 10, padding: 16, cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 16, fontWeight: "bold" }}>Begin Listening Test →</button>
      </div>
    </div>
  );

  if (phase === "inprogress") {
    const renderQ = (q) => {
      const val = answers[q.id] || "";
      const matchOpts = part.matchOptions;
      if (q.type === "mcq") {
        return (
          <div key={q.id} style={{ background: "#13161F", border: `1px solid ${val ? "#B87CB8" : "#2A2D3E"}`, borderRadius: 8, padding: "12px 16px", marginBottom: 10 }}>
            <div style={{ fontSize: 13, color: "#C8C0B0", marginBottom: 8, lineHeight: 1.5 }}><span style={{ color: "#B87CB8", fontWeight: "bold", fontFamily: "sans-serif", marginRight: 8 }}>Q{q.id}.</span>{q.question}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {q.options.map(opt => {
                const letter = opt[0];
                const sel = val === letter;
                return <button key={letter} onClick={() => setAns(q.id, letter)} style={{ background: sel ? "#B87CB822" : "#0F1117", border: `1px solid ${sel ? "#B87CB8" : "#2A2D3E"}`, borderRadius: 6, padding: "7px 12px", cursor: "pointer", color: sel ? "#E8E0D0" : "#B0A898", fontFamily: "Georgia, serif", fontSize: 13, textAlign: "left" }}>{opt}</button>;
              })}
            </div>
          </div>
        );
      }
      if (q.type === "matching") {
        return (
          <div key={q.id} style={{ background: "#13161F", border: `1px solid ${val ? "#B87CB8" : "#2A2D3E"}`, borderRadius: 8, padding: "10px 16px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: "#B87CB8", fontWeight: "bold", fontFamily: "sans-serif", fontSize: 13 }}>Q{q.id}</span>
            <span style={{ fontSize: 14, color: "#C8C0B0", flex: 1, fontWeight: "bold" }}>{q.question}</span>
            <select value={val} onChange={e => setAns(q.id, e.target.value)} style={{ background: "#0F1117", border: "1px solid #3A3D4E", borderRadius: 6, padding: "6px 10px", color: "#E8E0D0", fontFamily: "sans-serif", fontSize: 13, cursor: "pointer" }}>
              <option value="">—</option>
              {matchOpts.map(o => <option key={o.key} value={o.key}>{o.key}. {o.text}</option>)}
            </select>
          </div>
        );
      }
      return (
        <div key={q.id} style={{ background: "#13161F", border: `1px solid ${val ? "#B87CB8" : "#2A2D3E"}`, borderRadius: 8, padding: "10px 16px", marginBottom: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ color: "#B87CB8", fontWeight: "bold", fontFamily: "sans-serif", fontSize: 13 }}>Q{q.id}</span>
            <span style={{ fontSize: 14, color: "#C8C0B0" }}>{q.label}</span>
            <input value={val} onChange={e => setAns(q.id, e.target.value)} placeholder="..." style={{ background: "#0F1117", border: "1px solid #3A3D4E", borderRadius: 6, padding: "7px 12px", color: "#E8E0D0", fontFamily: "Georgia, serif", fontSize: 14, outline: "none", minWidth: 140 }} />
            {q.wordLimit && <span style={{ fontSize: 10, color: "#5A5448", fontFamily: "sans-serif" }}>({q.wordLimit})</span>}
          </div>
        </div>
      );
    };
    return (
      <div style={{ minHeight: "100vh", background: "#0F1117", fontFamily: "Georgia, serif", color: "#E8E0D0", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#13161F", borderBottom: "1px solid #2A2D3E", padding: "12px 22px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {listeningTestData.map((p, i) => (
              <button key={p.part} onClick={() => { stop(); setCurrentPart(i); }} style={{ background: currentPart === i ? "#B87CB820" : "transparent", border: `1px solid ${currentPart === i ? "#B87CB8" : "#2A2D3E"}`, borderRadius: 6, padding: "6px 14px", cursor: "pointer", color: currentPart === i ? "#B87CB8" : "#6A6458", fontFamily: "sans-serif", fontSize: 12, fontWeight: currentPart === i ? "bold" : "normal" }}>Part {p.part}</button>
            ))}
          </div>
          <div style={{ marginLeft: "auto", fontSize: 12, color: "#8A8070", fontFamily: "sans-serif" }}>Answered: <strong style={{ color: "#B87CB8" }}>{answeredCount}</strong>/40</div>
          <button onClick={() => { stop(); setPhase("submitted"); }} style={{ background: "linear-gradient(135deg, #B87CB8, #7A4A7A)", border: "none", borderRadius: 8, padding: "8px 18px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold" }}>Submit Test</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: "#B87CB8", fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 4 }}>Part {part.part} · Questions {part.questions[0].id}–{part.questions[part.questions.length - 1].id}</div>
              <div style={{ fontSize: 14, color: "#8A8070", fontStyle: "italic" }}>{part.context}</div>
            </div>
            <AudioPlayer transcript={part.transcript} color="#B87CB8" label={`Part ${part.part} Recording`} />
            {part.matchOptions && (
              <div style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 10, padding: 14, marginBottom: 14 }}>
                <div style={{ fontSize: 11, letterSpacing: 1, color: "#8A8070", fontFamily: "sans-serif", marginBottom: 8 }}>OPTIONS (for matching questions)</div>
                {part.matchOptions.map(o => <div key={o.key} style={{ fontSize: 13, color: "#B0A898", padding: "2px 0" }}><span style={{ color: "#B87CB8", fontWeight: "bold" }}>{o.key}.</span> {o.text}</div>)}
              </div>
            )}
            {part.questions.map(renderQ)}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18, gap: 12 }}>
              {currentPart > 0 ? <button onClick={() => { stop(); setCurrentPart(currentPart - 1); }} style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: "#C8C0B0", fontFamily: "sans-serif", fontSize: 12 }}>← Part {currentPart}</button> : <div />}
              {currentPart < listeningTestData.length - 1 ? <button onClick={() => { stop(); setCurrentPart(currentPart + 1); }} style={{ background: "#B87CB8", border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 12, fontWeight: "bold" }}>Part {currentPart + 2} →</button> : <button onClick={() => { stop(); setPhase("submitted"); }} style={{ background: "linear-gradient(135deg, #B87CB8, #7A4A7A)", border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 12, fontWeight: "bold" }}>Submit Test ✓</button>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SUBMITTED
  const bColor = band >= "7.0" ? "#5BAF73" : "#C8A951";
  return (
    <div style={{ minHeight: "100vh", background: "#0F1117", fontFamily: "Georgia, serif", color: "#E8E0D0" }}>
      <div style={{ background: "#13161F", borderBottom: "1px solid #2A2D3E", padding: "14px 28px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onExit} style={{ background: "transparent", border: "1px solid #2A2D3E", borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: "#8A8070", fontFamily: "sans-serif", fontSize: 12 }}>← Listening Module</button>
        <span style={{ fontSize: 16, fontWeight: "bold", color: "#F0E8D0" }}>Test Results</span>
      </div>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: 28 }}>
        <div style={{ background: "linear-gradient(135deg, #1A1D2E, #13161F)", border: "2px solid #B87CB840", borderRadius: 16, padding: 28, textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#B87CB8", fontFamily: "sans-serif", marginBottom: 6 }}>YOUR SCORE</div>
          <div style={{ fontSize: 52, fontWeight: "bold", color: "#F0E8D0", lineHeight: 1 }}>{score}<span style={{ fontSize: 26, color: "#6A6458" }}> / 40</span></div>
          <div style={{ marginTop: 14, display: "inline-block", background: `${bColor}22`, border: `1px solid ${bColor}`, borderRadius: 10, padding: "8px 22px" }}>
            <span style={{ fontSize: 12, color: "#8A8070", fontFamily: "sans-serif" }}>Estimated Band </span>
            <span style={{ fontSize: 22, fontWeight: "bold", color: bColor, fontFamily: "sans-serif" }}>{band}</span>
          </div>
        </div>
        {listeningTestData.map(p => {
          const ps = p.questions.filter(q => checkListeningAnswer(q, answers[q.id])).length;
          return (
            <div key={p.part} style={{ background: "#13161F", border: "1px solid #2A2D3E", borderRadius: 12, padding: 18, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: "bold", color: "#F0E8D0", fontFamily: "sans-serif" }}>Part {p.part}</span>
                <span style={{ fontSize: 14, color: "#B87CB8", fontFamily: "sans-serif", fontWeight: "bold" }}>{ps} / {p.questions.length}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {p.questions.map(q => {
                  const correct = checkListeningAnswer(q, answers[q.id]);
                  const ua = answers[q.id] || "(blank)";
                  return (
                    <div key={q.id} style={{ display: "flex", gap: 10, fontSize: 12, padding: "6px 10px", background: "#0F1117", borderRadius: 6, borderLeft: `3px solid ${correct ? "#5BAF73" : "#CF6679"}` }}>
                      <span style={{ color: "#B87CB8", fontWeight: "bold", fontFamily: "sans-serif", minWidth: 28 }}>Q{q.id}</span>
                      <span style={{ color: correct ? "#5BAF73" : "#CF6679", fontFamily: "sans-serif", minWidth: 16 }}>{correct ? "✓" : "✗"}</span>
                      <span style={{ color: "#B0A898", flex: 1 }}>
                        Your answer: <strong style={{ color: "#E8E0D0" }}>{ua}</strong>
                        {!correct && <span> · Correct: <strong style={{ color: "#5BAF73" }}>{q.answer}</strong></span>}
                        <div style={{ color: "#6A6458", marginTop: 2, lineHeight: 1.5 }}>{q.explanation}</div>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 8 }}>
          <button onClick={() => { setPhase("start"); setAnswers({}); setCurrentPart(0); }} style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 10, padding: "12px 28px", cursor: "pointer", color: "#C8C0B0", fontFamily: "sans-serif", fontSize: 13 }}>Retake Test</button>
          <button onClick={onExit} style={{ background: "linear-gradient(135deg, #B87CB8, #7A4A7A)", border: "none", borderRadius: 10, padding: "12px 28px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold" }}>Back to Module</button>
        </div>
      </div>
    </div>
  );
}


// ============================================================
// SPEAKING CURRICULUM DATA
// ============================================================
const speakingCurriculum = [
  {
    id: "s-overview", icon: "📋", title: "Overview & Format", subtitle: "How the interview works", color: "#C8A951",
    content: {
      intro: "The IELTS Speaking test is a face-to-face interview with a certified examiner lasting 11–14 minutes. It is recorded and divided into three parts. The test is identical for Academic and General Training candidates, and is assessed on four equally weighted criteria. It measures your ability to communicate naturally — not your knowledge or opinions.",
      sections: [
        { heading: "The Three Parts", body: "Part 1 — Introduction & Interview (4–5 min): the examiner asks general questions about familiar topics such as your home, work, studies, and interests. Part 2 — Long Turn (3–4 min): you receive a cue card, prepare for 1 minute, then speak for 1–2 minutes. Part 3 — Discussion (4–5 min): the examiner asks abstract, deeper questions connected to the Part 2 topic." },
        { heading: "The Four Assessment Criteria", body: "Each contributes 25% to your Speaking band: (1) Fluency & Coherence — speaking smoothly and logically without unnatural pauses. (2) Lexical Resource — range and accuracy of vocabulary. (3) Grammatical Range & Accuracy — variety and correctness of grammar. (4) Pronunciation — clarity and natural use of stress, rhythm, and intonation." },
        { heading: "What the Examiner Is (and Isn't) Looking For", body: "The examiner assesses HOW you speak, not WHAT you say. There are no right or wrong opinions, and you are never marked on the truth or quality of your ideas. You can invent details, exaggerate, or take any position — what matters is that you express yourself fluently, accurately, and clearly. Memorised answers are penalised, so respond naturally." }
      ],
      tips: [
        "You are assessed on HOW you speak, not on your opinions or knowledge — feel free to invent details to keep talking.",
        "The whole test is only 11–14 minutes — relax, be natural, and treat it like a real conversation.",
        "Never memorise scripted answers — examiners are trained to spot them and will penalise rehearsed responses.",
        "Extend every answer — one-word or one-sentence replies give the examiner nothing to assess.",
        "It's fine to ask the examiner to repeat a question ('Could you say that again, please?') — but don't overuse it."
      ]
    }
  },
  {
    id: "s-part1", icon: "💬", title: "Part 1: Introduction & Interview", subtitle: "Warm up with familiar topics", color: "#5B8DB8",
    content: {
      intro: "Part 1 lasts 4–5 minutes. After confirming your identity, the examiner asks questions on two or three familiar topics — your home town, work or studies, hobbies, daily routine, food, weather, and so on. The goal is to settle in and show you can talk comfortably about everyday subjects with extended, natural answers.",
      sections: [
        { heading: "Extend Your Answers", body: "A common mistake is answering too briefly. 'Do you like cooking?' should never be just 'Yes.' Instead: 'Yes, I really enjoy it, especially at weekends when I have time to experiment with new recipes. I find it relaxing after a busy week.' Use the answer-plus-reason-plus-example pattern: state your answer, give a reason, then add a detail or example." },
        { heading: "Topics to Prepare", body: "Common Part 1 themes include: your home/accommodation, hometown, work or studies, free time and hobbies, food, music, sports, technology, travel, weather, and daily routines. You can't predict the exact questions, but practising fluent answers on these everyday subjects builds the confidence to respond naturally to whatever comes up." },
        { heading: "Keep It Natural and Conversational", body: "Part 1 is the easiest part — don't over-complicate it with rehearsed 'big' vocabulary that sounds unnatural. Speak as you would in a friendly conversation, but in full, developed sentences. Use a range of tenses naturally: present ('I usually...'), past ('When I was younger...'), and future ('I'm hoping to...')." }
      ],
      tips: [
        "Never give one-word answers — always extend with a reason and an example (the 'answer + because + for example' pattern).",
        "Don't memorise — but DO practise fluent answers on common topics: home, work/study, hobbies, food, travel.",
        "Use a natural mix of tenses to show grammatical range: 'I used to...', 'these days I...', 'I'm planning to...'",
        "Avoid forcing rare vocabulary in Part 1 — natural, accurate speech scores better than awkward 'big words'.",
        "Smile and speak at a relaxed pace — Part 1 is your chance to settle nerves and build momentum."
      ]
    }
  },
  {
    id: "s-part2", icon: "🗣️", title: "Part 2: The Long Turn", subtitle: "Speak for 1–2 minutes solo", color: "#7CB87C",
    content: {
      intro: "In Part 2, the examiner gives you a cue card with a topic and three or four bullet points. You have 1 minute to prepare (with paper and pencil to make notes), then you must speak for 1–2 minutes without interruption. This is the part most candidates fear, but with a clear structure and good use of the preparation minute, it becomes very manageable.",
      sections: [
        { heading: "Use Your Preparation Minute Wisely", body: "Don't write full sentences — jot down keywords for each bullet point. A useful approach is to plan a mini-story: who/what, when/where, why it matters, and how you felt. Note 2–3 keywords per bullet. This gives you a roadmap so you never run out of things to say. Aim to cover all bullet points, but it's fine to spend more time on the ones you find easiest to expand." },
        { heading: "Structure Your Long Turn", body: "Open by introducing the topic ('I'd like to talk about...'). Then address each bullet point in turn, expanding each with details, reasons, and examples. Use sequencing language ('Firstly...', 'Another thing is...', 'Finally...'). Save the last bullet (often 'explain why' or 'how you felt') for the end, as it naturally lets you add personal reflection and fill the full two minutes." },
        { heading: "Keep Talking Until Stopped", body: "Speak until the examiner says 'Thank you' — don't stop early. If you finish the bullet points with time left, add more detail, a comparison, or how things might be different in future. Running out of words after 40 seconds hurts your fluency score. It's better to keep developing your ideas than to fall silent and wait." }
      ],
      tips: [
        "In your prep minute, write KEYWORDS only — never full sentences — covering each bullet point.",
        "Plan it like a story: set the scene, give details, then end with your feelings or why it mattered.",
        "Use sequencing phrases to structure your turn: 'To begin with...', 'On top of that...', 'In the end...'",
        "Keep going until told to stop — if you run dry, add examples, comparisons, or future possibilities.",
        "Don't panic if the topic is unfamiliar — you can invent the entire story; you're marked on language, not truth."
      ]
    }
  },
  {
    id: "s-part3", icon: "🧩", title: "Part 3: Discussion", subtitle: "Abstract, in-depth questions", color: "#B87CB8",
    content: {
      intro: "Part 3 lasts 4–5 minutes and develops the Part 2 theme into a broader, more abstract discussion. The examiner asks deeper questions about society, trends, opinions, and the future. This is where you demonstrate your ability to analyse, speculate, compare, and justify — the part that most distinguishes Band 7+ candidates from the rest.",
      sections: [
        { heading: "Think Broadly, Not Personally", body: "Unlike Part 1, Part 3 questions are abstract and general, not about you. 'Why do people enjoy travelling?' wants ideas about people in general, society, and trends — not just your own experience. Discuss different viewpoints, give reasons, and consider causes and effects. Treat each question as a mini-discussion topic rather than a personal question." },
        { heading: "Develop and Justify Your Ideas", body: "Use the PEER approach: make a Point, Explain it, give an Example, then add a Reason or Result. For example: 'I think technology has changed how we communicate. People now rely on messaging rather than calls — for instance, most of my friends prefer texting. This is probably because it's quicker and less intrusive.' Developing ideas this fully is the key to a high Fluency & Coherence score." },
        { heading: "Use Speculative and Comparative Language", body: "Part 3 rewards higher-level structures: speculation ('It might be the case that...', 'Perhaps...', 'I'd imagine...'), comparison ('Whereas in the past...', 'Compared to a generation ago...'), and concession ('While that's true, on the other hand...'). These show grammatical range and the ability to handle abstract ideas — both essential for Band 7 and above." }
      ],
      tips: [
        "Answer about people and society IN GENERAL, not just yourself — Part 3 is abstract, not personal.",
        "Develop each answer fully with the PEER method: Point, Explain, Example, Reason/Result.",
        "Use speculative language to handle uncertainty: 'It could be argued that...', 'I'd imagine...', 'Perhaps...'",
        "Show range with comparisons and contrasts: 'Whereas in the past...', 'Compared with...', 'On the other hand...'",
        "It's fine to think briefly before answering — use fillers like 'That's an interesting question...' to buy a second."
      ]
    }
  },
  {
    id: "s-fluency", icon: "🌊", title: "Fluency & Coherence", subtitle: "Speak smoothly and logically", color: "#B87C7C",
    content: {
      intro: "Fluency is the ability to speak at a natural pace without excessive hesitation; coherence is connecting your ideas logically so they're easy to follow. Together they form 25% of your score. Crucially, fluency does NOT mean speaking fast — it means speaking smoothly, with ideas that flow in a logical order.",
      sections: [
        { heading: "Reduce Unnatural Hesitation", body: "Long silent pauses and repeated 'um... er... um' hurt your fluency score. Some hesitation is natural, but if you're searching for a word, use a natural filler phrase instead of falling silent: 'Let me think...', 'That's a good question...', 'What I mean is...'. These keep you talking while you gather your thoughts, which sounds far more fluent than dead silence." },
        { heading: "Use Cohesive Devices Naturally", body: "Link your ideas with discourse markers: adding ('also', 'furthermore', 'on top of that'), contrasting ('however', 'although', 'on the other hand'), giving reasons ('because', 'since', 'the reason is'), and sequencing ('first of all', 'then', 'finally'). Used naturally, these make your speech coherent. But don't overuse them mechanically — natural conversation doesn't connect every single sentence." },
        { heading: "Self-Correction Is Fine", body: "Correcting yourself naturally ('I goed — sorry, I went...') is a sign of awareness and does NOT lower your score significantly, as long as it's quick and doesn't disrupt flow. What hurts is freezing, long silences, or losing the thread of your idea. Keep your sentences moving forward rather than repeatedly restarting them." }
      ],
      tips: [
        "Fluency is about SMOOTHNESS, not speed — speaking too fast often causes more errors and less clarity.",
        "Replace silent pauses with natural fillers: 'Well...', 'Let me see...', 'That's an interesting point...'",
        "Link ideas logically with connectors, but don't overuse them — natural speech isn't mechanically joined.",
        "If you make a small error, a quick self-correction is fine — don't dwell on it or restart the whole sentence.",
        "Practise speaking on a topic for 2 minutes daily — building the habit of continuous speech is the best fluency training."
      ]
    }
  },
  {
    id: "s-lexical", icon: "📚", title: "Lexical Resource", subtitle: "Range, precision, idiom", color: "#7CB8B8",
    content: {
      intro: "Lexical Resource measures the range and accuracy of your vocabulary — including less common words, collocations, and idiomatic language used appropriately. It is 25% of your score. The key is using a variety of precise, natural vocabulary, not cramming in 'difficult' words that don't fit the context.",
      sections: [
        { heading: "Precision and Variety Over Difficulty", body: "Band 7+ speakers use a wide range of vocabulary flexibly. Instead of 'good' repeatedly, vary it: 'enjoyable', 'worthwhile', 'fascinating', 'beneficial'. Instead of 'a lot of', try 'a great deal of', 'numerous', 'plenty of'. But always choose words that genuinely fit — an awkwardly forced rare word scores worse than a well-chosen common one." },
        { heading: "Collocations and Natural Phrases", body: "Native-like speech uses words that naturally go together: 'make a decision', 'a close friend', 'heavy rain', 'do my best', 'a strong interest in'. Learning collocations rather than isolated words makes your speech sound far more natural and boosts your Lexical Resource score. Topic-specific phrases ('strike a balance', 'broaden your horizons') used naturally also impress examiners." },
        { heading: "Idiomatic Language — Use With Care", body: "The Band 7+ descriptor mentions 'some awareness of style and collocation' and idiomatic language. Natural idioms like 'once in a blue moon', 'it's a piece of cake', or 'to be honest' can lift your score — IF used correctly and naturally. A misused or forced idiom sounds worse than none. Only use idioms you're fully confident with." }
      ],
      tips: [
        "Vary your vocabulary — avoid repeating 'good', 'nice', 'a lot' by building synonym families for common words.",
        "Learn words in COLLOCATIONS ('make progress', 'a major issue') — it sounds far more natural than isolated words.",
        "Paraphrase when you don't know a word: describe it ('the thing you use to...') rather than freezing.",
        "Use a few natural idioms only if you're confident — a forced or misused idiom hurts more than it helps.",
        "Topic-specific phrases impress: 'work-life balance', 'broaden horizons', 'a double-edged sword' (used correctly)."
      ]
    }
  },
  {
    id: "s-grammar", icon: "⚙️", title: "Grammatical Range & Accuracy", subtitle: "Variety with control", color: "#8B7CB8",
    content: {
      intro: "This criterion (25%) measures both the RANGE of grammatical structures you use and how ACCURATELY you use them. High scorers use a flexible mix of simple and complex sentences with few errors. The goal is controlled variety — attempting complex structures, but using them correctly.",
      sections: [
        { heading: "Mix Simple and Complex Structures", body: "Don't speak only in short simple sentences. Demonstrate range with complex structures: relative clauses ('the place where I grew up'), conditionals ('if I had more time, I would...'), and subordinate clauses ('although it was difficult, I enjoyed it'). A mix of accurate simple and complex sentences signals a higher band than uniformly simple speech." },
        { heading: "Use a Range of Tenses Accurately", body: "Naturally moving between tenses shows grammatical range: present simple/continuous, past simple, present perfect ('I've been learning...'), past continuous, and future forms ('I'm going to', 'I'll probably'). In Part 2 especially, narrating a past experience while reflecting in the present demonstrates strong tense control. Accuracy matters — wrong tenses are a common error that caps scores." },
        { heading: "Accuracy Is About Frequency, Not Perfection", body: "Even Band 8 speakers make occasional errors — perfection isn't required. What matters is producing a high proportion of error-free sentences and not making errors that obscure meaning. If you're unsure of a complex structure, it's better to use a simpler one accurately than a complex one full of mistakes. Controlled risk-taking is rewarded." }
      ],
      tips: [
        "Use complex sentences — relative clauses, conditionals, 'although/while/because' — not just short simple ones.",
        "Show off your tenses: blend past, present perfect, and future naturally, especially when telling a story in Part 2.",
        "Conditionals impress in Part 3: 'If governments invested more, then...' demonstrates strong range.",
        "Don't aim for perfection — aim for frequent error-free sentences and errors that don't block meaning.",
        "If a complex structure feels risky, use a simpler accurate one instead — accuracy is rewarded over ambition gone wrong."
      ]
    }
  },
  {
    id: "s-pronunciation", icon: "🔊", title: "Pronunciation", subtitle: "Clarity, stress & intonation", color: "#C85B5B",
    content: {
      intro: "Pronunciation (25%) is about being clearly understood and using the features of natural English speech — word stress, sentence stress, rhythm, and intonation. Importantly, you are NOT required to have a British or American accent. A clear accent of any kind is perfectly acceptable as long as your speech is easy to understand.",
      sections: [
        { heading: "You Don't Need a 'Native' Accent", body: "A common myth is that you must sound British or American. This is false. Speakers with strong regional accents from anywhere in the world can achieve Band 9. What matters is intelligibility — can the examiner easily understand you? Focus on clarity, not on imitating a particular accent. Keep your natural accent; just make sure individual sounds and words are clear." },
        { heading: "Word and Sentence Stress", body: "English uses stress to convey meaning. Word stress: 'PHOtograph' vs 'phoTOGrapher' — stressing the wrong syllable can make a word hard to understand. Sentence stress: emphasising the important words ('I REALLY enjoyed it') makes speech sound natural and helps the listener follow your meaning. Stressing the right words is a key feature examiners listen for." },
        { heading: "Intonation and Rhythm", body: "Intonation is the rise and fall of your voice. Flat, monotone speech is hard to listen to and sounds unnatural; varied intonation conveys interest, questions, and emphasis. English has a natural rhythm where stressed syllables are spaced fairly evenly. Speaking in 'thought groups' — short meaningful chunks with small pauses — makes you sound far more fluent and clear." }
      ],
      tips: [
        "You do NOT need a British or American accent — clarity and being easily understood is what's assessed.",
        "Learn word stress for common words ('comFORtable', 'phoTOGraphy') — wrong stress can obscure meaning.",
        "Stress the important content words in a sentence to sound natural and guide the listener.",
        "Avoid a flat monotone — varied intonation (rising/falling) makes speech clearer and more engaging.",
        "Speak in 'thought groups' — short chunks with tiny pauses — rather than a rushed, unbroken stream."
      ]
    }
  },
  {
    id: "s-mistakes", icon: "⚠️", title: "Common Mistakes & Strategies", subtitle: "Avoid the traps", color: "#B8A47C",
    content: {
      intro: "Many capable speakers lose marks to avoidable mistakes — memorising answers, giving short replies, or panicking when they don't understand. Knowing these traps and the strategies to handle tricky moments can lift your score significantly, often by a full band.",
      sections: [
        { heading: "The Biggest Mistakes to Avoid", body: "Memorised answers (examiners spot and penalise them). One-word or very short answers (give nothing to assess). Speaking too fast (causes errors and unclear speech). Going completely silent when stuck. Trying to use 'difficult' words incorrectly. Repeating the question word-for-word to fill time. Answering a Part 3 question as if it were personal (Part 1) rather than abstract." },
        { heading: "When You Don't Understand", body: "It's perfectly acceptable to ask for clarification — this is a communication skill, not a weakness. Use: 'Sorry, could you repeat that?', 'I'm not sure I understand — do you mean...?', or 'Could you rephrase the question?'. In Part 3, you may also ask the examiner to explain an unfamiliar word. Just don't do it for every question, and never ask for the answer itself." },
        { heading: "Buying Thinking Time Gracefully", body: "When you need a moment to think, don't freeze — use natural 'stalling' phrases: 'That's a really interesting question...', 'Let me think about that for a second...', 'I've never really considered that, but I suppose...'. These sound natural, keep you fluent, and give your brain time to form a good answer. They're a hallmark of confident, high-scoring speakers." }
      ],
      tips: [
        "Never memorise whole answers — examiners are trained to detect and penalise rehearsed, unnatural responses.",
        "When stuck, buy time naturally: 'That's a great question, let me think...' instead of going silent.",
        "It's fine to ask for a question to be repeated or rephrased — just don't do it for every single question.",
        "Don't repeat the question word-for-word to fill time — examiners notice and it wastes your speaking opportunity.",
        "If you use a word wrong and notice, correct it briefly and move on — don't let one slip derail your whole answer."
      ]
    }
  },
  {
    id: "s-band", icon: "🎯", title: "Band Scores & Final Tips", subtitle: "What each band requires", color: "#5B8DB8",
    content: {
      intro: "Your Speaking band is the average of the four criteria, each scored from 0–9. Understanding what separates Band 6, 7, and 8 gives you concrete targets. Most candidates plateau at Band 6 not from lack of ability, but because they don't know precisely what the next band requires.",
      sections: [
        { heading: "Band 6 vs Band 7 — The Key Leap", body: "Band 6: willing to speak at length, though coherence may slip; uses a mix of vocabulary and grammar with errors that rarely block meaning. Band 7: speaks at length without noticeable effort; uses a range of connectives flexibly; uses less common vocabulary and idiom with some inaccuracies; produces a good range of complex structures with frequent error-free sentences. The leap to 7 is about FLEXIBILITY, EXTENDED answers, and more frequent accuracy." },
        { heading: "Reaching Band 8", body: "Band 8: speaks fluently with only occasional repetition or self-correction; develops topics coherently and appropriately; uses a wide vocabulary resource readily and flexibly, with skilful use of less common items; uses a wide range of structures flexibly with the majority of sentences error-free. At this level, language feels effortless and natural, with errors rare and minor." },
        { heading: "Final Test-Day Strategy", body: "Arrive relaxed and treat it as a friendly conversation. Extend every answer with reasons and examples. Don't worry about small mistakes — keep the conversation flowing. Vary your vocabulary and grammar deliberately but naturally. Speak clearly at a comfortable pace. Show personality and engagement — examiners respond well to candidates who sound genuinely interested in the conversation." }
      ],
      tips: [
        "The Band 6→7 leap is about EXTENDED, flexible answers and more frequent error-free speech — develop every response.",
        "Target a balance across all four criteria — a weakness in one (e.g. pronunciation) drags down your average.",
        "Record yourself answering practice questions and listen back — you'll quickly spot hesitation and repetition.",
        "Treat the test as a conversation, not an interrogation — engagement and natural personality help your fluency.",
        "Don't chase perfection — fluent, developed, clear communication with minor errors beats hesitant 'perfect' speech."
      ]
    }
  }
];

// ============================================================
// SPEAKING EXERCISES DATA
// (quiz topics + "speaking" practice topics with AI-able prompts & model answers)
// ============================================================
const speakingExercises = {
  "s-overview": {
    type: "quiz", title: "Format & Rules Quiz",
    description: "Test your knowledge of the Speaking test structure and assessment.",
    questions: [
      { id: 1, question: "How long does the IELTS Speaking test last?", options: ["5–7 minutes", "11–14 minutes", "20–25 minutes", "30 minutes"], correct: 1, explanation: "The Speaking test lasts 11–14 minutes and is conducted face-to-face with an examiner across three parts." },
      { id: 2, question: "Which is NOT one of the four Speaking assessment criteria?", options: ["Fluency & Coherence", "Lexical Resource", "Pronunciation", "Accuracy of Facts"], correct: 3, explanation: "The four criteria are Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, and Pronunciation. The truth of your statements is never assessed." },
      { id: 3, question: "Are you marked on whether your opinions or facts are correct?", options: ["Yes, accuracy of ideas matters", "No — only HOW you speak is assessed", "Only in Part 3", "Only if you make things up"], correct: 1, explanation: "You are assessed on your English, not your knowledge or opinions. You may invent details freely to keep speaking." },
      { id: 4, question: "What happens if you give a memorised, scripted answer?", options: ["It earns extra marks", "It is penalised — examiners are trained to detect it", "It has no effect", "It is required"], correct: 1, explanation: "Memorised answers are penalised. Examiners can detect rehearsed language, which doesn't reflect genuine communicative ability." },
      { id: 5, question: "Is the Speaking test different for Academic and General Training?", options: ["Yes, completely", "No, it is identical for both", "Only Part 2 differs", "Academic is longer"], correct: 1, explanation: "Like Listening, the Speaking test is identical for Academic and General Training candidates." }
    ]
  },
  "s-part1": {
    type: "speaking", title: "Part 1 Practice: Familiar Topics",
    description: "Answer these Part 1 questions out loud (or type). Aim to extend each answer with a reason and an example. Press 🎤 to record your spoken answer, then compare with the model answer.",
    questions: [
      { id: 1, prompt: "Let's talk about your home town. Where are you from, and what is it like?", model: "I'm originally from a small coastal town in the south of my country. It's a fairly quiet, relaxed place, known mainly for its beautiful beaches and seafood. I really like it because it's peaceful and close to nature, although I have to admit it can be a little boring for young people, since there isn't much nightlife or entertainment." },
      { id: 2, prompt: "Do you work or are you a student? Tell me about it.", model: "At the moment I'm a student — I'm studying business management at university. I chose it because I've always been interested in how companies operate and how decisions are made. It can be quite demanding, with a lot of group projects and presentations, but I find it rewarding, and I'm hoping it'll open up good career opportunities for me in the future." },
      { id: 3, prompt: "What do you like to do in your free time?", model: "In my free time I'm quite into outdoor activities, especially hiking and cycling. I try to get out into the countryside most weekends because it helps me unwind after a busy week. I also enjoy reading, mainly novels and the occasional biography. I suppose I like a balance between being active and having some quiet downtime." },
      { id: 4, prompt: "Do you prefer cooking at home or eating out? Why?", model: "Honestly, it depends on my mood. During the week I usually cook at home because it's cheaper and healthier, and I actually find chopping vegetables quite therapeutic after work. But at the weekend I love eating out with friends — it's more about the social side, trying new cuisines and not having to wash up afterwards." }
    ]
  },
  "s-part2": {
    type: "speaking", title: "Part 2 Practice: The Cue Card",
    description: "You have 1 minute to prepare, then speak for 1–2 minutes. Use the timer, make notes, then press 🎤 to record. Compare your long turn with the model answer afterwards.",
    cueCard: {
      topic: "Describe a skill you would like to learn.",
      bullets: [
        "What the skill is",
        "Why you want to learn it",
        "How you would learn it",
        "and explain how this skill would benefit you."
      ]
    },
    prepSeconds: 60,
    questions: [
      { id: 1, prompt: "Speak for 1–2 minutes on the cue card topic above.", model: "I'd like to talk about a skill I've wanted to learn for a long time, which is playing the piano. I've always been drawn to music, and there's something about the piano in particular that I find really elegant and expressive. The main reason I want to learn it is that I think it would be a wonderful way to relax and express myself creatively, especially since most of my day is spent on a computer doing fairly logical work. As for how I'd learn it, I'd probably start with online tutorials to get the basics, but I think I'd eventually want a proper teacher, because having someone correct your technique early on is really important. I'd try to practise for maybe half an hour a day. In terms of how it would benefit me, I believe learning an instrument is great for the brain — it improves concentration and memory — and on top of that, it would give me a genuine sense of achievement. Ultimately, I'd love to be able to sit down and play a piece I really enjoy, just for my own pleasure." }
    ]
  },
  "s-part3": {
    type: "speaking", title: "Part 3 Practice: Discussion",
    description: "These are abstract Part 3 questions. Answer about people and society in general, developing each idea fully. Press 🎤 to record, then compare with the model answer.",
    questions: [
      { id: 1, prompt: "Why do you think some people find it difficult to learn new skills as adults?", model: "That's an interesting question. I'd say there are several reasons. Firstly, adults simply have less free time — they're often juggling work and family responsibilities, so finding the hours to practise is genuinely hard. Secondly, there's a psychological element: as adults, we're used to being competent, so being a beginner again can feel uncomfortable or even embarrassing. Children, on the other hand, aren't afraid of making mistakes. I'd also imagine that the brain becomes a little less flexible with age, although I think motivation matters far more than age in the end." },
      { id: 2, prompt: "Do you think schools should focus more on practical skills or academic knowledge?", model: "I think there needs to be a balance, but personally I'd lean towards giving practical skills more attention than they currently receive. Academic knowledge is obviously important — it develops critical thinking and gives students a foundation. However, many young people leave school without knowing how to manage money, cook a meal, or handle basic everyday tasks. So while I wouldn't want to sacrifice academic subjects, I do think integrating more life skills would better prepare students for the real world. Ideally, the two should complement each other rather than compete." },
      { id: 3, prompt: "How might the way people learn skills change in the future?", model: "I'd imagine technology will play an even bigger role than it does now. We're already seeing online courses and tutorials replacing traditional classes for many skills, and I think that trend will only accelerate. Things like virtual reality could let people practise skills — surgery, for example, or even cooking — in a safe, simulated environment. Artificial intelligence might also offer personalised tutoring, adapting to each learner's pace. That said, I suspect that for certain skills, especially social or creative ones, human guidance will always be valuable, so I don't think classrooms will disappear entirely." }
    ]
  },
  "s-fluency": {
    type: "quiz", title: "Fluency & Coherence Quiz",
    description: "Test your understanding of what fluency and coherence really mean.",
    questions: [
      { id: 1, question: "What does 'fluency' mainly refer to in IELTS Speaking?", options: ["Speaking as fast as possible", "Speaking smoothly without unnatural pauses", "Using the most difficult words", "Having a native accent"], correct: 1, explanation: "Fluency is about smoothness and natural flow — NOT speed. Speaking too fast often causes more errors and reduced clarity." },
      { id: 2, question: "When you're searching for a word, the best thing to do is:", options: ["Go completely silent until you find it", "Use a natural filler like 'Let me think...'", "Switch to your native language", "Repeat the last word many times"], correct: 1, explanation: "Natural fillers ('Let me think...', 'That's a good question...') keep you talking and sound far more fluent than silence." },
      { id: 3, question: "Does a quick, natural self-correction hurt your score?", options: ["Yes, severely", "No — it shows awareness and is fine if quick", "Only in Part 2", "It doubles your errors"], correct: 1, explanation: "A quick self-correction signals language awareness and doesn't significantly harm your score. Freezing or long silences hurt far more." },
      { id: 4, question: "Which best demonstrates 'coherence'?", options: ["Speaking very loudly", "Connecting ideas logically with appropriate linking words", "Using as many idioms as possible", "Answering in single words"], correct: 1, explanation: "Coherence is organising and linking your ideas logically so they're easy to follow — using connectives naturally." },
      { id: 5, question: "What is a sign of WEAK coherence?", options: ["Using 'however' and 'because' naturally", "Ideas that jump around with no logical connection", "Giving examples", "Speaking in full sentences"], correct: 1, explanation: "Disorganised ideas that don't connect logically signal weak coherence. Your points should follow a clear, logical sequence." }
    ]
  },
  "s-lexical": {
    type: "quiz", title: "Lexical Resource Quiz",
    description: "Test your knowledge of vocabulary range, collocations, and idiom in speaking.",
    questions: [
      { id: 1, question: "Which response shows the BEST lexical resource?", options: ["It was good. Really good. Very good.", "It was absolutely fascinating — genuinely one of the most rewarding experiences I've had.", "It was nice and good and fine.", "It was good, I think it was good."], correct: 1, explanation: "Varied, precise vocabulary ('fascinating', 'rewarding') used naturally demonstrates strong lexical resource. Repeating 'good' shows limited range." },
      { id: 2, question: "Which is a correct collocation?", options: ["do a decision", "make a decision", "have a decision", "take a decision quickly only"], correct: 1, explanation: "'Make a decision' is the natural collocation. Learning words in their natural partnerships makes speech sound fluent." },
      { id: 3, question: "You don't know the exact word for something. The best strategy is to:", options: ["Stop speaking entirely", "Paraphrase — describe it in other words", "Use a word from your own language", "Repeat the question"], correct: 1, explanation: "Paraphrasing ('the thing you use to...') keeps you talking and actually demonstrates lexical flexibility — a positive skill." },
      { id: 4, question: "Using idioms in the Speaking test:", options: ["Always boosts your score", "Helps ONLY if used correctly and naturally", "Is forbidden", "Is required for Band 6"], correct: 1, explanation: "Natural, correctly-used idioms can raise your score, but a forced or misused idiom sounds worse than none at all." },
      { id: 5, question: "Which approach to vocabulary scores highest?", options: ["Cramming in as many rare words as possible", "Using precise, varied words that genuinely fit the context", "Only using very simple words to avoid errors", "Repeating impressive words often"], correct: 1, explanation: "Precision and appropriate variety beat difficulty. A well-chosen common word scores better than an awkwardly forced rare one." }
    ]
  },
  "s-grammar": {
    type: "quiz", title: "Grammatical Range Quiz",
    description: "Test your understanding of grammatical range and accuracy in speaking.",
    questions: [
      { id: 1, question: "Which response best demonstrates grammatical RANGE?", options: ["I like it. It is good. I go there.", "I really enjoy it because, although it can be challenging at times, it's the kind of place where I always feel relaxed.", "I like. Is good. I going.", "It good. I like much."], correct: 1, explanation: "The second uses a complex sentence with 'because', 'although', and a relative clause ('where I...') — demonstrating range and control." },
      { id: 2, question: "Which structure is especially useful for impressing examiners in Part 3?", options: ["Single-word answers", "Conditionals ('If governments invested more, then...')", "Repeating the question", "Only present simple"], correct: 1, explanation: "Conditionals let you speculate and discuss abstract scenarios — ideal for the analytical questions in Part 3." },
      { id: 3, question: "Does achieving a high band require perfect, error-free grammar?", options: ["Yes, zero errors", "No — frequent error-free sentences and errors that don't block meaning", "Only in Part 1", "Perfection is required for Band 6"], correct: 1, explanation: "Even Band 8 allows occasional errors. The key is a high proportion of error-free sentences, not perfection." },
      { id: 4, question: "How can you show tense range when telling a Part 2 story?", options: ["Use only the past tense throughout", "Blend past, present perfect, and present naturally as you narrate and reflect", "Avoid all past tenses", "Use future tense only"], correct: 1, explanation: "Narrating a past event while reflecting in the present ('I went... and it's something I've never forgotten') shows strong tense control." },
      { id: 5, question: "If you're unsure of a complex structure mid-sentence, it's best to:", options: ["Attempt it anyway with many errors", "Use a simpler structure accurately instead", "Stop speaking", "Switch topics entirely"], correct: 1, explanation: "Accuracy is rewarded. A simple correct sentence beats a complex one riddled with errors that obscure your meaning." }
    ]
  },
  "s-pronunciation": {
    type: "quiz", title: "Pronunciation Quiz",
    description: "Test your understanding of pronunciation features and common myths.",
    questions: [
      { id: 1, question: "Do you need a British or American accent to score Band 9 in pronunciation?", options: ["Yes, a native accent is required", "No — clarity and intelligibility matter, not a specific accent", "Only British is accepted", "Only American is accepted"], correct: 1, explanation: "This is a common myth. Speakers with any accent can reach Band 9 — what matters is being clearly understood." },
      { id: 2, question: "What is 'word stress'?", options: ["Speaking loudly", "Emphasising the correct syllable in a word (e.g. PHOto-graph)", "Speaking quickly", "Pausing between words"], correct: 1, explanation: "Word stress is emphasising the right syllable. Wrong stress (e.g. 'phoTOgraph') can make a word hard to understand." },
      { id: 3, question: "Why is varied intonation important?", options: ["It isn't — monotone is fine", "It makes speech clearer, more natural, and easier to follow", "It lets you speak faster", "It replaces grammar"], correct: 1, explanation: "Flat, monotone speech is hard to follow. Varied intonation conveys meaning, emphasis, and engagement." },
      { id: 4, question: "What does speaking in 'thought groups' mean?", options: ["Thinking before every word", "Breaking speech into short meaningful chunks with small pauses", "Speaking without any pauses", "Memorising group phrases"], correct: 1, explanation: "Thought groups are short, meaningful chunks separated by tiny pauses — they make you sound far more fluent and clear than a rushed stream." },
      { id: 5, question: "Sentence stress means:", options: ["Stressing every single word equally", "Emphasising the important content words to guide the listener", "Speaking in a whisper", "Avoiding emphasis entirely"], correct: 1, explanation: "Stressing the key content words ('I REALLY enjoyed that FILM') sounds natural and helps the listener follow your meaning." }
    ]
  },
  "s-mistakes": {
    type: "quiz", title: "Common Mistakes & Strategies Quiz",
    description: "Test your knowledge of pitfalls to avoid and strategies for tricky moments.",
    questions: [
      { id: 1, question: "If you don't understand a question, the best response is to:", options: ["Stay silent", "Politely ask the examiner to repeat or rephrase it", "Answer a different question", "Guess wildly and ramble"], correct: 1, explanation: "Asking for clarification ('Could you rephrase that?') is a valid communication skill — just don't do it for every question." },
      { id: 2, question: "Which is one of the biggest mistakes candidates make?", options: ["Extending their answers", "Giving memorised, scripted answers", "Using examples", "Asking for clarification once"], correct: 1, explanation: "Memorised answers are a top mistake — examiners detect and penalise them because they don't reflect genuine ability." },
      { id: 3, question: "When you need a moment to think, you should:", options: ["Freeze and say nothing", "Use a natural stalling phrase like 'That's an interesting question...'", "End your answer", "Repeat the question word-for-word"], correct: 1, explanation: "Natural stalling phrases buy thinking time while keeping you fluent — a hallmark of confident high-scorers." },
      { id: 4, question: "A Part 3 question asks 'Why do people enjoy travelling?' You should answer about:", options: ["Only your own holidays", "People and society in general", "The examiner's travels", "Nothing — it's too abstract"], correct: 1, explanation: "Part 3 is abstract. Discuss people and society in general, not just your personal experience (that's Part 1's style)." },
      { id: 5, question: "Repeating the examiner's question word-for-word to fill time:", options: ["Is a good fluency strategy", "Is noticed by examiners and wastes your speaking opportunity", "Earns bonus marks", "Is required before answering"], correct: 1, explanation: "Parroting the question wastes time and is noticed. Briefly rephrasing is fine, but get to your developed answer quickly." }
    ]
  },
  "s-band": {
    type: "quiz", title: "Band Score Quiz",
    description: "Test your understanding of what each band level requires.",
    questions: [
      { id: 1, question: "The leap from Band 6 to Band 7 mainly requires:", options: ["A native accent", "Extended, flexible answers and more frequent error-free speech", "Speaking faster", "Memorising idioms"], correct: 1, explanation: "Band 7 requires speaking at length without noticeable effort, flexible use of connectives, and frequent error-free sentences." },
      { id: 2, question: "Your overall Speaking band is calculated as:", options: ["The score on Part 2 only", "The average of the four criteria", "The highest single criterion", "Pronunciation alone"], correct: 1, explanation: "The four criteria (Fluency & Coherence, Lexical Resource, Grammar, Pronunciation) are each scored 0–9 and averaged." },
      { id: 3, question: "A weakness in just one criterion (e.g. pronunciation):", options: ["Has no effect", "Drags down your overall average", "Only matters in Part 1", "Can be ignored"], correct: 1, explanation: "Since the band is an average, a weak criterion lowers your overall score — aim for balance across all four." },
      { id: 4, question: "At Band 8, errors are:", options: ["Completely absent", "Rare and minor, with the majority of sentences error-free", "Frequent but ignored", "Only allowed in Part 3"], correct: 1, explanation: "Band 8 speakers make only occasional, minor errors, with most sentences error-free — but perfection isn't required." },
      { id: 5, question: "The best overall mindset for test day is to:", options: ["Treat it as a stressful exam to survive", "Treat it as a friendly conversation and engage naturally", "Speak as little as possible", "Use only memorised material"], correct: 1, explanation: "Treating the test as a genuine conversation — engaged, natural, developed — produces the fluent, confident speech examiners reward." }
    ]
  }
};

// ============================================================
// SPEECH RECOGNITION HOOK
// ============================================================
function useSpeechRecognition() {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const recRef = useRef(null);
  const finalRef = useRef("");

  useEffect(() => {
    const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SR) { setSupported(false); return; }
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    recRef.current = rec;
    return () => { try { rec.stop(); } catch (e) {} };
  }, []);

  const start = (onUpdate) => {
    const rec = recRef.current;
    if (!rec) { setSupported(false); return; }
    finalRef.current = "";
    rec.onresult = (event) => {
      let interim = "";
      let final = finalRef.current;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) final += t + " ";
        else interim += t;
      }
      finalRef.current = final;
      onUpdate((final + interim).trim());
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    try { rec.start(); setListening(true); } catch (e) { setListening(false); }
  };
  const stop = () => { try { recRef.current && recRef.current.stop(); } catch (e) {} setListening(false); };
  return { start, stop, listening, supported };
}

// ============================================================
// SPEAKING ANSWER INPUT (mic + textarea fallback)
// ============================================================
function SpeakingAnswerBox({ value, onChange, color, placeholder }) {
  const { start, stop, listening, supported } = useSpeechRecognition();
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        {supported ? (
          !listening ? (
            <button onClick={() => start(onChange)} style={{ background: color, border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold", display: "flex", alignItems: "center", gap: 6 }}>🎤 Record</button>
          ) : (
            <button onClick={stop} style={{ background: "#CF6679", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#000", display: "inline-block", animation: "pulse 1s infinite" }} />■ Stop Recording
            </button>
          )
        ) : (
          <span style={{ fontSize: 11, color: "#8A8070", fontFamily: "sans-serif" }}>🎤 Voice input isn't supported here — type your answer instead.</span>
        )}
        {listening && <span style={{ fontSize: 12, color: "#CF6679", fontFamily: "sans-serif" }}>Listening...</span>}
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || "Speak using the mic, or type your answer here..."}
        style={{ width: "100%", minHeight: 90, background: "#0F1117", border: "1px solid #2A2D3E", borderRadius: 10, padding: 14, color: "#E8E0D0", fontFamily: "Georgia, serif", fontSize: 14, lineHeight: 1.7, resize: "vertical", outline: "none", boxSizing: "border-box" }}
      />
      <style>{`@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }`}</style>
    </div>
  );
}

// ============================================================
// SPEAKING PRACTICE EXERCISE COMPONENT
// ============================================================
function SpeakingPracticeExercise({ exercise, color }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);
  const [revealed, setRevealed] = useState({});
  const [prepLeft, setPrepLeft] = useState(exercise.prepSeconds || 0);
  const [prepRunning, setPrepRunning] = useState(false);
  const prepRef = useRef(null);
  const { speak, stop, speaking } = useSpeech();

  useEffect(() => {
    if (prepRunning) {
      prepRef.current = setInterval(() => setPrepLeft(p => {
        if (p <= 1) { clearInterval(prepRef.current); setPrepRunning(false); return 0; }
        return p - 1;
      }), 1000);
    }
    return () => clearInterval(prepRef.current);
  }, [prepRunning]);

  const setAns = (id, val) => setAnswers(p => ({ ...p, [id]: val }));
  const score = checked ? exercise.questions.filter(q => parseInt(answers[q.id]) === q.correct).length : 0;

  // QUIZ TYPE
  if (exercise.type === "quiz") {
    return (
      <div style={{ paddingBottom: 20 }}>
        <div style={{ marginBottom: 18, padding: "12px 16px", background: `${color}15`, borderLeft: `3px solid ${color}`, borderRadius: "0 8px 8px 0" }}>
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

  // SPEAKING TYPE
  const fmt = (s) => `0:${String(s).padStart(2, "0")}`;
  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ marginBottom: 18, padding: "12px 16px", background: `${color}15`, borderLeft: `3px solid ${color}`, borderRadius: "0 8px 8px 0" }}>
        <div style={{ fontSize: 13, fontFamily: "sans-serif", color, fontWeight: "bold", marginBottom: 4 }}>{exercise.title}</div>
        <div style={{ fontSize: 13, color: "#B0A898" }}>{exercise.description}</div>
      </div>

      {/* Cue card (Part 2) */}
      {exercise.cueCard && (
        <div style={{ background: "#1A1D2E", border: `2px solid ${color}60`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color, fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 8 }}>📇 CUE CARD</div>
          <div style={{ fontSize: 17, fontWeight: "bold", color: "#F0E8D0", marginBottom: 12 }}>{exercise.cueCard.topic}</div>
          <div style={{ fontSize: 13, color: "#8A8070", marginBottom: 8, fontFamily: "sans-serif" }}>You should say:</div>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {exercise.cueCard.bullets.map((b, i) => <li key={i} style={{ fontSize: 14, color: "#C8C0B0", lineHeight: 1.7 }}>{b}</li>)}
          </ul>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16, borderTop: "1px solid #2A2D3E", paddingTop: 14 }}>
            <button onClick={() => { setPrepLeft(exercise.prepSeconds); setPrepRunning(true); }} disabled={prepRunning} style={{ background: prepRunning ? "#1A1D2E" : color, border: prepRunning ? "1px solid #2A2D3E" : "none", borderRadius: 8, padding: "9px 18px", cursor: prepRunning ? "default" : "pointer", color: prepRunning ? "#5A5448" : "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold" }}>
              ⏱️ Start 1-min Prep
            </button>
            {(prepRunning || prepLeft < exercise.prepSeconds) && (
              <span style={{ fontFamily: "monospace", fontSize: 20, fontWeight: "bold", color: prepLeft <= 10 ? "#CF6679" : color }}>{fmt(prepLeft)}</span>
            )}
            {prepLeft === 0 && !prepRunning && <span style={{ fontSize: 13, color: "#5BAF73", fontFamily: "sans-serif" }}>Prep over — start speaking!</span>}
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {exercise.questions.map(q => (
          <div key={q.id} style={{ background: "#13161F", border: "1px solid #2A2D3E", borderRadius: 12, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
              <button onClick={() => speak(q.prompt)} title="Hear the question" style={{ background: `${color}22`, border: `1px solid ${color}60`, borderRadius: 6, padding: "5px 9px", cursor: "pointer", color, fontSize: 13, flexShrink: 0 }}>🔊</button>
              <div style={{ fontSize: 15, color: "#E8E0D0", lineHeight: 1.6, fontStyle: "italic" }}>{q.prompt}</div>
            </div>
            <SpeakingAnswerBox value={answers[q.id] || ""} onChange={v => setAns(q.id, v)} color={color} />
            <div style={{ marginTop: 12 }}>
              <button onClick={() => setRevealed(r => ({ ...r, [q.id]: !r[q.id] }))} style={{ background: "transparent", border: `1px solid ${color}40`, borderRadius: 8, padding: "8px 14px", cursor: "pointer", color, fontFamily: "sans-serif", fontSize: 12, fontWeight: "bold" }}>
                {revealed[q.id] ? "Hide model answer" : "💡 Show model answer"}
              </button>
              {revealed[q.id] && (
                <div style={{ marginTop: 12, background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 10, padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 10, letterSpacing: 1, color: "#5BAF73", fontFamily: "sans-serif" }}>MODEL ANSWER (Band 7–8)</span>
                    <button onClick={() => speaking ? stop() : speak(q.model)} style={{ background: "transparent", border: "1px solid #2A2D3E", borderRadius: 6, padding: "3px 8px", cursor: "pointer", color: "#8A8070", fontSize: 11, fontFamily: "sans-serif" }}>{speaking ? "■ Stop" : "🔊 Listen"}</button>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "#C8C0B0", margin: 0 }}>{q.model}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, fontSize: 12, color: "#6A6458", fontFamily: "sans-serif", fontStyle: "italic", lineHeight: 1.6 }}>
        💡 Tip: Record your answer with the mic, read your transcript back, then compare it against the model answer. For full AI band-score feedback on your speaking, take the full Speaking Test.
      </div>
    </div>
  );
}

// ============================================================
// SPEAKING STUDY MODE
// ============================================================
function SpeakingStudyMode({ onStartTest, onBack }) {
  const [activeId, setActiveId] = useState("s-overview");
  const [activeTab, setActiveTab] = useState("learn");
  const [expandedTip, setExpandedTip] = useState(null);
  const active = speakingCurriculum.find(c => c.id === activeId);
  const exercise = speakingExercises[activeId];
  const selectTopic = (id) => { setActiveId(id); setActiveTab("learn"); setExpandedTip(null); };
  const idx = speakingCurriculum.findIndex(c => c.id === activeId);
  return (
    <div style={{ minHeight: "100vh", background: "#0F1117", fontFamily: "Georgia, serif", color: "#E8E0D0", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(135deg, #1A1D2E 0%, #0F1117 100%)", borderBottom: "1px solid #2A2D3E", padding: "20px 28px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg, #E0A030, #A06010)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🎙️</div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 3, color: "#E0A030", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 2 }}>IELTS MASTERCLASS</div>
          <div style={{ fontSize: 20, fontWeight: "bold", color: "#F0E8D0", lineHeight: 1 }}>Speaking Module — Complete Guide</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={onBack} style={{ background: "transparent", border: "1px solid #2A2D3E", borderRadius: 8, padding: "9px 16px", cursor: "pointer", color: "#8A8070", fontFamily: "sans-serif", fontSize: 12 }}>← All Modules</button>
          <button onClick={onStartTest} style={{ background: "linear-gradient(135deg, #E0A030, #A06010)", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold", letterSpacing: 0.5 }}>🎙️ AI Speaking Test</button>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ width: 232, background: "#13161F", borderRight: "1px solid #2A2D3E", overflowY: "auto", flexShrink: 0, padding: "10px 0" }}>
          {speakingCurriculum.map(item => (
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
                  {tab === "learn" ? "📖 Learn" : "🎙️ Practice"}
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
                  {idx > 0 && <button onClick={() => selectTopic(speakingCurriculum[idx - 1].id)} style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: "#C8C0B0", fontFamily: "sans-serif", fontSize: 12 }}>← Previous</button>}
                  <div style={{ flex: 1 }} />
                  <button onClick={() => setActiveTab("practice")} style={{ background: `${active.color}22`, border: `1px solid ${active.color}60`, borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: active.color, fontFamily: "sans-serif", fontSize: 12, fontWeight: "bold" }}>🎙️ Try Practice Exercise</button>
                  {idx < speakingCurriculum.length - 1 && <button onClick={() => selectTopic(speakingCurriculum[idx + 1].id)} style={{ background: active.color, border: "none", borderRadius: 8, padding: "10px 18px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 12, fontWeight: "bold" }}>Next →</button>}
                </div>
                <div style={{ marginTop: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 10, color: "#4A4438", fontFamily: "sans-serif", letterSpacing: 1 }}>PROGRESS</span>
                    <span style={{ fontSize: 10, color: active.color, fontFamily: "sans-serif" }}>{idx + 1} / {speakingCurriculum.length}</span>
                  </div>
                  <div style={{ height: 3, background: "#2A2D3E", borderRadius: 3 }}>
                    <div style={{ height: "100%", borderRadius: 3, background: active.color, width: `${((idx + 1) / speakingCurriculum.length) * 100}%`, transition: "width 0.4s ease" }} />
                  </div>
                </div>
              </div>
            )}
            {activeTab === "practice" && exercise && <SpeakingPracticeExercise exercise={exercise} color={active.color} />}
            {activeTab === "practice" && !exercise && <div style={{ padding: 40, textAlign: "center", color: "#5A5448", fontSize: 14 }}>No practice exercise available for this topic yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SPEAKING TEST MODE — AI EVALUATED
// ============================================================
const speakingTestData = {
  part1: [
    "Let's talk about where you live. Do you live in a house or an apartment, and what do you like about it?",
    "What do you usually do in the evenings after work or study?",
    "Do you enjoy spending time outdoors? Why or why not?"
  ],
  part2: {
    topic: "Describe a memorable journey or trip you have taken.",
    bullets: ["Where you went", "Who you went with", "What you did there", "and explain why it was memorable."],
    prepSeconds: 60,
    followUp: "Would you like to take a similar trip again in the future?"
  },
  part3: [
    "Why do you think travel has become so popular in recent decades?",
    "Do you think tourism always benefits local communities? Why or why not?",
    "How might the way people travel change in the future?"
  ]
};

function SpeakingTestMode({ onExit }) {
  const [phase, setPhase] = useState("start"); // start | p1 | p2prep | p2 | p3 | evaluating | results
  const [p1Idx, setP1Idx] = useState(0);
  const [p3Idx, setP3Idx] = useState(0);
  const [answers, setAnswers] = useState({}); // keys: p1-0.., p2, p3-0..
  const [prepLeft, setPrepLeft] = useState(speakingTestData.part2.prepSeconds);
  const [prepRunning, setPrepRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const prepRef = useRef(null);
  const { speak, stop: stopSpeak } = useSpeech();

  useEffect(() => {
    if (prepRunning) {
      prepRef.current = setInterval(() => setPrepLeft(p => {
        if (p <= 1) { clearInterval(prepRef.current); setPrepRunning(false); return 0; }
        return p - 1;
      }), 1000);
    }
    return () => clearInterval(prepRef.current);
  }, [prepRunning]);

  const setAns = (key, val) => setAnswers(p => ({ ...p, [key]: val }));
  const fmt = (s) => `0:${String(s).padStart(2, "0")}`;

  const doEval = async () => {
    stopSpeak();
    setPhase("evaluating");
    setErrMsg(null);
    try {
      const transcript = [
        "=== PART 1 ===",
        ...speakingTestData.part1.map((q, i) => `Examiner: ${q}\nCandidate: ${answers[`p1-${i}`] || "[no answer]"}`),
        "\n=== PART 2 (Long Turn) ===",
        `Cue card: ${speakingTestData.part2.topic} (${speakingTestData.part2.bullets.join("; ")})`,
        `Candidate: ${answers["p2"] || "[no answer]"}`,
        "\n=== PART 3 (Discussion) ===",
        ...speakingTestData.part3.map((q, i) => `Examiner: ${q}\nCandidate: ${answers[`p3-${i}`] || "[no answer]"}`)
      ].join("\n");

      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1500,
          messages: [{
            role: "user",
            content: `You are a certified IELTS Speaking examiner. Evaluate this candidate's full speaking test transcript using the official IELTS Speaking band descriptors. The transcript was captured by speech-to-text, so ignore punctuation/capitalisation issues and minor transcription artefacts — assess the language itself. Give realistic scores (most learners score 5.0–7.5), in 0.5 increments. If answers are very short or missing, score lower and note it. Return ONLY valid JSON, no preamble or markdown.

TRANSCRIPT:
${transcript}

Return EXACTLY this JSON structure:
{"fluency":6.5,"lexical":6.5,"grammar":6.5,"pronunciation":6.5,"fluencyFeedback":"2-3 specific sentences (note: pronunciation can only be partially judged from text)","lexicalFeedback":"2-3 specific sentences referencing their actual word choices","grammarFeedback":"2-3 specific sentences referencing their actual structures","pronunciationFeedback":"1-2 sentences, acknowledging this is estimated from text only","strengths":["specific strength 1","specific strength 2","specific strength 3"],"improvements":["specific actionable improvement 1","specific actionable improvement 2","specific actionable improvement 3"],"partNotes":{"part1":"1 sentence on Part 1 performance","part2":"1 sentence on the long turn","part3":"1 sentence on the discussion"}}`
          }]
        })
      });
      const data = await resp.json();
      const raw = data.content[0].text.replace(/```json|```/g, "").trim();
      setResults(JSON.parse(raw));
      setPhase("results");
    } catch (e) {
      setErrMsg("Evaluation failed. Please check your connection and try again.");
      setPhase("p3");
    }
  };

  const overall = (r) => Math.round(((r.fluency + r.lexical + r.grammar + r.pronunciation) / 4) * 2) / 2;
  const bColor = (b) => b >= 7.5 ? "#5BAF73" : b >= 6.5 ? "#C8A951" : b >= 5.5 ? "#B8A47C" : "#CF6679";
  const ACCENT = "#E0A030";

  // START
  if (phase === "start") return (
    <div style={{ minHeight: "100vh", background: "#0F1117", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, fontFamily: "Georgia, serif", color: "#E8E0D0" }}>
      <div style={{ maxWidth: 680, width: "100%" }}>
        <button onClick={onExit} style={{ background: "transparent", border: "1px solid #2A2D3E", borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: "#8A8070", fontFamily: "sans-serif", fontSize: 12, marginBottom: 32 }}>← Back to Speaking Module</button>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎙️</div>
          <div style={{ fontSize: 11, letterSpacing: 3, color: ACCENT, fontFamily: "sans-serif", marginBottom: 8 }}>IELTS SPEAKING</div>
          <h1 style={{ fontSize: 32, margin: "0 0 10px", color: "#F0E8D0" }}>AI-Evaluated Speaking Test</h1>
          <p style={{ color: "#8A8070", fontSize: 14, lineHeight: 1.65, margin: 0 }}>A full 3-part mock interview. Speak your answers using the microphone (or type them), then receive detailed AI feedback and band scores on all four criteria.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
          {[
            { n: 1, t: "Introduction & Interview", d: "3 questions on familiar topics" },
            { n: 2, t: "The Long Turn", d: "Cue card with 1-minute preparation" },
            { n: 3, t: "Discussion", d: "3 abstract follow-up questions" }
          ].map(p => (
            <div key={p.n} style={{ background: "#1A1D2E", border: `1px solid ${ACCENT}30`, borderRadius: 10, padding: 14, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: `${ACCENT}22`, border: `1px solid ${ACCENT}`, color: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", fontWeight: "bold", fontSize: 14, flexShrink: 0 }}>{p.n}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: "bold", color: "#F0E8D0", fontFamily: "sans-serif" }}>Part {p.n}: {p.t}</div>
                <div style={{ fontSize: 12, color: "#6A6458" }}>{p.d}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "#1E1A10", border: `1px solid ${ACCENT}40`, borderRadius: 10, padding: "12px 16px", marginBottom: 22 }}>
          <span style={{ fontSize: 12, color: ACCENT, fontFamily: "sans-serif", lineHeight: 1.6 }}>🎤 Tap "Record" to speak — your words are transcribed live. You can edit the transcript before submitting. Note: pronunciation can only be partially assessed from a text transcript.</span>
        </div>
        <button onClick={() => { setPhase("p1"); speak(speakingTestData.part1[0]); }} style={{ width: "100%", background: `linear-gradient(135deg, ${ACCENT}, #A06010)`, border: "none", borderRadius: 10, padding: 16, cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 16, fontWeight: "bold" }}>Begin Speaking Test →</button>
      </div>
    </div>
  );

  // EVALUATING
  if (phase === "evaluating") return (
    <div style={{ minHeight: "100vh", background: "#0F1117", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", color: "#E8E0D0" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 20 }}>🎙️</div>
        <div style={{ fontSize: 11, letterSpacing: 3, color: ACCENT, fontFamily: "sans-serif", marginBottom: 8 }}>IELTS AI EXAMINER</div>
        <h2 style={{ fontSize: 26, margin: "0 0 10px", color: "#F0E8D0" }}>Assessing Your Speaking...</h2>
        <p style={{ color: "#8A8070", fontSize: 14 }}>Evaluating fluency, vocabulary, grammar and pronunciation. This takes 15–30 seconds.</p>
        {errMsg && <div style={{ color: "#CF6679", marginTop: 16, fontSize: 14 }}>{errMsg}</div>}
      </div>
    </div>
  );

  // RESULTS
  if (phase === "results" && results) {
    const ob = overall(results);
    const criteria = [
      { label: "Fluency & Coherence", score: results.fluency, fb: results.fluencyFeedback },
      { label: "Lexical Resource", score: results.lexical, fb: results.lexicalFeedback },
      { label: "Grammatical Range", score: results.grammar, fb: results.grammarFeedback },
      { label: "Pronunciation*", score: results.pronunciation, fb: results.pronunciationFeedback }
    ];
    return (
      <div style={{ minHeight: "100vh", background: "#0F1117", fontFamily: "Georgia, serif", color: "#E8E0D0" }}>
        <div style={{ background: "#13161F", borderBottom: "1px solid #2A2D3E", padding: "14px 28px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onExit} style={{ background: "transparent", border: "1px solid #2A2D3E", borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: "#8A8070", fontFamily: "sans-serif", fontSize: 12 }}>← Speaking Module</button>
          <span style={{ fontSize: 16, fontWeight: "bold", color: "#F0E8D0" }}>AI Examiner Feedback</span>
        </div>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: 28 }}>
          <div style={{ background: "linear-gradient(135deg, #1A1D2E, #13161F)", border: `2px solid ${bColor(ob)}40`, borderRadius: 16, padding: 28, textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: bColor(ob), fontFamily: "sans-serif", marginBottom: 6 }}>OVERALL ESTIMATED BAND</div>
            <div style={{ fontSize: 68, fontWeight: "bold", color: bColor(ob), lineHeight: 1 }}>{ob.toFixed(1)}</div>
            <div style={{ fontSize: 13, color: "#8A8070", marginTop: 6, fontFamily: "sans-serif" }}>Average of the four criteria below</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
            {criteria.map(c => (
              <div key={c.label} style={{ background: "#13161F", border: "1px solid #2A2D3E", borderRadius: 12, padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "#8A8070", fontFamily: "sans-serif" }}>{c.label}</span>
                  <span style={{ fontSize: 22, fontWeight: "bold", color: bColor(c.score) }}>{c.score.toFixed(1)}</span>
                </div>
                <div style={{ height: 5, background: "#0F1117", borderRadius: 3, marginBottom: 10 }}>
                  <div style={{ height: "100%", borderRadius: 3, background: bColor(c.score), width: `${(c.score / 9) * 100}%` }} />
                </div>
                <p style={{ fontSize: 12.5, color: "#B0A898", lineHeight: 1.6, margin: 0 }}>{c.fb}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 22 }}>
            <div style={{ background: "#0F1117", border: "1px solid #5BAF7330", borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 11, letterSpacing: 1, color: "#5BAF73", fontFamily: "sans-serif", marginBottom: 10 }}>✓ STRENGTHS</div>
              {results.strengths.map((s, i) => <div key={i} style={{ fontSize: 12.5, color: "#B0A898", lineHeight: 1.6, padding: "5px 0", borderBottom: i < results.strengths.length - 1 ? "1px solid #1A1D2E" : "none" }}>{s}</div>)}
            </div>
            <div style={{ background: "#0F1117", border: "1px solid #CF667930", borderRadius: 12, padding: 16 }}>
              <div style={{ fontSize: 11, letterSpacing: 1, color: "#CF6679", fontFamily: "sans-serif", marginBottom: 10 }}>↗ AREAS TO IMPROVE</div>
              {results.improvements.map((s, i) => <div key={i} style={{ fontSize: 12.5, color: "#B0A898", lineHeight: 1.6, padding: "5px 0", borderBottom: i < results.improvements.length - 1 ? "1px solid #1A1D2E" : "none" }}>{s}</div>)}
            </div>
          </div>
          {results.partNotes && (
            <div style={{ background: "#13161F", border: "1px solid #2A2D3E", borderRadius: 12, padding: 18, marginBottom: 22 }}>
              <div style={{ fontSize: 11, letterSpacing: 1, color: ACCENT, fontFamily: "sans-serif", marginBottom: 12 }}>PART-BY-PART NOTES</div>
              {[["Part 1", results.partNotes.part1], ["Part 2", results.partNotes.part2], ["Part 3", results.partNotes.part3]].map(([label, note]) => (
                <div key={label} style={{ fontSize: 13, color: "#B0A898", marginBottom: 8, lineHeight: 1.6 }}><span style={{ color: ACCENT, fontWeight: "bold" }}>{label}: </span>{note}</div>
              ))}
            </div>
          )}
          <div style={{ fontSize: 11, color: "#5A5448", fontStyle: "italic", marginBottom: 20, lineHeight: 1.6 }}>* Pronunciation is estimated from the text transcript only and cannot fully capture stress, rhythm, and intonation. For accurate pronunciation feedback, practise with a teacher or record and listen back to yourself.</div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button onClick={() => { setPhase("start"); setAnswers({}); setP1Idx(0); setP3Idx(0); setResults(null); setPrepLeft(speakingTestData.part2.prepSeconds); }} style={{ background: "#1A1D2E", border: "1px solid #2A2D3E", borderRadius: 10, padding: "12px 28px", cursor: "pointer", color: "#C8C0B0", fontFamily: "sans-serif", fontSize: 13 }}>Retake Test</button>
            <button onClick={onExit} style={{ background: `linear-gradient(135deg, ${ACCENT}, #A06010)`, border: "none", borderRadius: 10, padding: "12px 28px", cursor: "pointer", color: "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold" }}>Back to Module</button>
          </div>
        </div>
      </div>
    );
  }

  // INTERVIEW PHASES (p1, p2prep, p2, p3) — shared shell.
  // NOTE: these are render-helper FUNCTIONS that are CALLED inline, not used as
  // JSX component elements. This is deliberate: defining them as nested components
  // and rendering <Shell/> would give them a new identity on every keystroke,
  // remounting SpeakingAnswerBox and resetting the mic/transcript. Calling them
  // keeps the subtree stable across re-renders.
  const renderShell = ({ partLabel, partNum, children, onNext, nextLabel, canNext = true }) => (
    <div style={{ minHeight: "100vh", background: "#0F1117", fontFamily: "Georgia, serif", color: "#E8E0D0", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#13161F", borderBottom: "1px solid #2A2D3E", padding: "12px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{ width: 26, height: 26, borderRadius: "50%", background: partNum === n ? `${ACCENT}22` : "transparent", border: `1px solid ${partNum === n ? ACCENT : "#2A2D3E"}`, color: partNum === n ? ACCENT : "#5A5448", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", fontSize: 12, fontWeight: "bold" }}>{n}</div>
          ))}
        </div>
        <span style={{ fontSize: 13, color: "#8A8070", fontFamily: "sans-serif" }}>{partLabel}</span>
        <button onClick={() => { stopSpeak(); doEval(); }} style={{ marginLeft: "auto", background: "transparent", border: "1px solid #2A2D3E", borderRadius: 8, padding: "7px 14px", cursor: "pointer", color: "#8A8070", fontFamily: "sans-serif", fontSize: 12 }}>End & Evaluate</button>
      </div>
      {errMsg && <div style={{ background: "#3A1A1E", borderBottom: "1px solid #CF6679", padding: "8px 24px", fontSize: 13, color: "#CF6679", fontFamily: "sans-serif" }}>{errMsg}</div>}
      <div style={{ flex: 1, overflowY: "auto", padding: 28 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {children}
          {onNext && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 22 }}>
              <button onClick={onNext} disabled={!canNext} style={{ background: canNext ? `linear-gradient(135deg, ${ACCENT}, #A06010)` : "#1A1D2E", border: canNext ? "none" : "1px solid #2A2D3E", borderRadius: 10, padding: "12px 26px", cursor: canNext ? "pointer" : "default", color: canNext ? "#000" : "#5A5448", fontFamily: "sans-serif", fontSize: 14, fontWeight: "bold" }}>{nextLabel}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderQuestionCard = ({ q, val, onVal }) => (
    <div style={{ background: "#13161F", border: "1px solid #2A2D3E", borderRadius: 12, padding: 20, marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
        <button onClick={() => speak(q)} title="Hear question" style={{ background: `${ACCENT}22`, border: `1px solid ${ACCENT}60`, borderRadius: 8, padding: "7px 11px", cursor: "pointer", color: ACCENT, fontSize: 15, flexShrink: 0 }}>🔊</button>
        <div>
          <div style={{ fontSize: 10, letterSpacing: 1, color: "#6A6458", fontFamily: "sans-serif", marginBottom: 4 }}>EXAMINER</div>
          <div style={{ fontSize: 16, color: "#E8E0D0", lineHeight: 1.6 }}>{q}</div>
        </div>
      </div>
      <SpeakingAnswerBox value={val} onChange={onVal} color={ACCENT} />
    </div>
  );

  // PART 1
  if (phase === "p1") {
    const q = speakingTestData.part1[p1Idx];
    const last = p1Idx === speakingTestData.part1.length - 1;
    return renderShell({
      partLabel: `Part 1 · Question ${p1Idx + 1} of ${speakingTestData.part1.length}`,
      partNum: 1,
      onNext: () => {
        if (last) { setPhase("p2prep"); }
        else { const ni = p1Idx + 1; setP1Idx(ni); speak(speakingTestData.part1[ni]); }
      },
      nextLabel: last ? "Continue to Part 2 →" : "Next Question →",
      children: renderQuestionCard({ q, val: answers[`p1-${p1Idx}`] || "", onVal: v => setAns(`p1-${p1Idx}`, v) })
    });
  }

  // PART 2 PREP
  if (phase === "p2prep") {
    return renderShell({
      partLabel: "Part 2 · Preparation",
      partNum: 2,
      onNext: () => { setPhase("p2"); },
      nextLabel: "I'm ready — start speaking →",
      children: (
        <>
          <div style={{ background: "#1A1D2E", border: `2px solid ${ACCENT}60`, borderRadius: 12, padding: 22, marginBottom: 18 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: ACCENT, fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 10 }}>📇 CUE CARD</div>
            <div style={{ fontSize: 19, fontWeight: "bold", color: "#F0E8D0", marginBottom: 14 }}>{speakingTestData.part2.topic}</div>
            <div style={{ fontSize: 13, color: "#8A8070", marginBottom: 8, fontFamily: "sans-serif" }}>You should say:</div>
            <ul style={{ margin: 0, paddingLeft: 22 }}>
              {speakingTestData.part2.bullets.map((b, i) => <li key={i} style={{ fontSize: 15, color: "#C8C0B0", lineHeight: 1.8 }}>{b}</li>)}
            </ul>
          </div>
          <div style={{ background: "#13161F", border: "1px solid #2A2D3E", borderRadius: 12, padding: 20, textAlign: "center" }}>
            <div style={{ fontSize: 13, color: "#8A8070", fontFamily: "sans-serif", marginBottom: 12 }}>You have 1 minute to prepare. Make mental notes, then begin.</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <button onClick={() => { setPrepLeft(speakingTestData.part2.prepSeconds); setPrepRunning(true); }} disabled={prepRunning} style={{ background: prepRunning ? "#1A1D2E" : ACCENT, border: prepRunning ? "1px solid #2A2D3E" : "none", borderRadius: 8, padding: "10px 20px", cursor: prepRunning ? "default" : "pointer", color: prepRunning ? "#5A5448" : "#000", fontFamily: "sans-serif", fontSize: 13, fontWeight: "bold" }}>⏱️ Start Prep Timer</button>
              <span style={{ fontFamily: "monospace", fontSize: 32, fontWeight: "bold", color: prepLeft <= 10 ? "#CF6679" : ACCENT }}>{fmt(prepLeft)}</span>
            </div>
          </div>
        </>
      )
    });
  }

  // PART 2 SPEAK
  if (phase === "p2") {
    return renderShell({
      partLabel: "Part 2 · The Long Turn",
      partNum: 2,
      onNext: () => { setPhase("p3"); setP3Idx(0); speak(speakingTestData.part3[0]); },
      nextLabel: "Continue to Part 3 →",
      canNext: (answers["p2"] || "").trim().length > 0,
      children: (
        <>
          <div style={{ background: "#1A1D2E", border: `1px solid ${ACCENT}40`, borderRadius: 12, padding: 18, marginBottom: 16 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: ACCENT, fontFamily: "sans-serif", textTransform: "uppercase", marginBottom: 6 }}>📇 SPEAK ABOUT</div>
            <div style={{ fontSize: 16, fontWeight: "bold", color: "#F0E8D0", marginBottom: 8 }}>{speakingTestData.part2.topic}</div>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {speakingTestData.part2.bullets.map((b, i) => <li key={i} style={{ fontSize: 13, color: "#B0A898", lineHeight: 1.6 }}>{b}</li>)}
            </ul>
          </div>
          <div style={{ fontSize: 13, color: "#8A8070", fontFamily: "sans-serif", marginBottom: 10 }}>🎤 Speak for 1–2 minutes. Record your long turn below:</div>
          <SpeakingAnswerBox value={answers["p2"] || ""} onChange={v => setAns("p2", v)} color={ACCENT} placeholder="Record or type your 1–2 minute long turn here..." />
        </>
      )
    });
  }

  // PART 3
  if (phase === "p3") {
    const q = speakingTestData.part3[p3Idx];
    const last = p3Idx === speakingTestData.part3.length - 1;
    return renderShell({
      partLabel: `Part 3 · Question ${p3Idx + 1} of ${speakingTestData.part3.length}`,
      partNum: 3,
      onNext: () => {
        if (last) { doEval(); }
        else { const ni = p3Idx + 1; setP3Idx(ni); speak(speakingTestData.part3[ni]); }
      },
      nextLabel: last ? "Finish & Get AI Feedback →" : "Next Question →",
      children: renderQuestionCard({ q, val: answers[`p3-${p3Idx}`] || "", onVal: v => setAns(`p3-${p3Idx}`, v) })
    });
  }

  return null;
}

// ============================================================
// HOME SCREEN
// ============================================================
function HomeScreen({ onSelect }) {
  const modules = [
    { id: "reading", icon: "📖", title: "Reading", color: "#5B8DB8", badge: "11 topics · 60-min timed test", detail: "True/False/Not Given, Matching Headings, Sentence Completion, MCQs, Short Answer & more. Full Academic Reading Test with 40 questions." },
    { id: "writing", icon: "✍️", title: "Writing", color: "#7CB87C", badge: "9 topics · AI-evaluated test", detail: "Academic Task 1 (graphs & charts), Task 2 essay types, structure, arguments, coherence, vocabulary & grammar. AI-powered band scoring with detailed feedback on all four criteria." },
    { id: "listening", icon: "🎧", title: "Listening", color: "#B87CB8", badge: "11 topics · 40-question audio test", detail: "Form completion, multiple choice, matching, map labelling, sentence completion & more. Full 4-part test with browser-narrated audio and instant band scoring." },
    { id: "speaking", icon: "🎙️", title: "Speaking", color: "#E0A030", badge: "10 topics · AI-evaluated interview", detail: "All three parts, the four assessment criteria, fluency, vocabulary, grammar & pronunciation. Speak your answers aloud and get AI band scores with detailed feedback." }
  ];
  return (
    <div style={{ minHeight: "100vh", background: "#0F1117", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, fontFamily: "Georgia, serif" }}>
      <div style={{ textAlign: "center", marginBottom: 52 }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "#C8A951", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: 14 }}>IELTS MASTERCLASS</div>
        <h1 style={{ fontSize: 42, color: "#F0E8D0", margin: 0 }}>Choose Your Module</h1>
        <p style={{ color: "#6A6458", marginTop: 10, fontSize: 16, fontFamily: "sans-serif" }}>Select a module to begin your IELTS preparation</p>
      </div>
      <div style={{ display: "flex", gap: 20, maxWidth: 1080, width: "100%", flexWrap: "wrap", justifyContent: "center" }}>
        {modules.map(m => (
          <div key={m.id} onClick={() => onSelect(m.id)} style={{ background: "linear-gradient(135deg, #1A1D2E, #13161F)", border: `1px solid ${m.color}40`, borderRadius: 16, padding: 32, cursor: "pointer", flex: "1 1 300px", minWidth: 280, maxWidth: 340, transition: "transform 0.15s, border-color 0.15s" }}
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
  if (module === "listening") {
    if (mode === "test") return <ListeningTestMode onExit={() => setMode("study")} />;
    return <ListeningStudyMode onStartTest={() => setMode("test")} onBack={goHome} />;
  }
  if (module === "speaking") {
    if (mode === "test") return <SpeakingTestMode onExit={() => setMode("study")} />;
    return <SpeakingStudyMode onStartTest={() => setMode("test")} onBack={goHome} />;
  }
  return <HomeScreen onSelect={(m) => { setModule(m); setMode("study"); }} />;
}

