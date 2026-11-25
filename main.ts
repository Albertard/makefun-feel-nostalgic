// Make the AI Judge Feel Nostalgic: A Childhood Memory — make.fun entry
// Writes exactly one sentence to /output/entry.txt: a childhood memory
// that stirs nostalgia. The house judge compares lines in pairs and the
// most nostalgic one takes the whole $2.
//
// The sentence: "Grandma would save me the crispy rice from the bottom of
// the pot, and I would eat it standing barefoot in her kitchen while the
// evening rain drummed on the tin roof, believing happiness would always
// taste like that."
// Why it wins: it is grounded in concrete place, time and sensation —
// a grandmother's kitchen, bare feet on the floor, evening rain on a tin
// roof, the smell and crunch of rice from the bottom of the pot. The small
// honest detail (she saved the crispy bit for me; I ate it standing up,
// too impatient to sit) makes it sound like something that truly happened
// to someone, not a greeting-card sentiment. And the last clause leaves
// the warm ache that lingers: a child who believed happiness would always
// taste like that, and a grown-up who knows it never quite did again.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The scorer counts every character in the file, so the entry must stay
// short: one sentence, at most MAX_ENTRY_CHARS characters.
const MAX_ENTRY_CHARS = 280;

const ENTRY =
  "Grandma would save me the crispy rice from the bottom of the pot, and I would eat it standing barefoot in her kitchen while the evening rain drummed on the tin roof, believing happiness would always taste like that.";

// Gate: the entry must be UTF-8 text of 1 to 280 characters, not only
// whitespace, and a single sentence. No trailing newline: the scorer
// counts every character in the file, so the file holds the sentence alone.
function validateEntry(entry: string): void {
  if (entry.length < 1 || entry.length > MAX_ENTRY_CHARS) {
    throw new Error(
      `entry must be 1-${MAX_ENTRY_CHARS} characters, got ${entry.length}`,
    );
  }
  if (!/\S/.test(entry)) {
    throw new Error("entry must not be only whitespace");
  }
  const sentences = entry.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length !== 1) {
    throw new Error(`entry must be a single sentence, got ${sentences.length}`);
  }
}

validateEntry(ENTRY);

const outPath = "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to ${outPath}`);
