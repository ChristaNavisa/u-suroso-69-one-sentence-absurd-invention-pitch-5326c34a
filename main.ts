// One-Sentence Absurd Invention Pitch — entry program.
//
// Writes one sentence pitching a ridiculous invention that fixes a tiny
// everyday annoyance to /output/entry.txt. The invention: a Wi-Fi router
// that answers every complaint about slow internet by slowing itself down
// a little more, until the whole family learns gratitude.
//
// Deterministic: every run writes exactly the same bytes.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PITCH =
  "A Wi-Fi router that slows itself down a little more every time someone in the house complains the internet is slow, until the whole family learns gratitude.";

function resolveOutDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function writeEntry(outDir: string, text: string): void {
  const outFile = resolve(outDir, "entry.txt");
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, text, "utf8");
  if (readFileSync(outFile, "utf8") !== text) {
    throw new Error("entry.txt does not match the pitch");
  }
}

function main(): void {
  if (PITCH.length < 1 || PITCH.length > 220) {
    throw new Error("pitch must be 1-220 characters");
  }
  if (PITCH.trim().length === 0) {
    throw new Error("pitch must not be only whitespace");
  }
  writeEntry(resolveOutDir(), PITCH);
}

main();
