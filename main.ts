// Tabs v3 — writes entry.txt byte-for-byte to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The entry lives in entry.txt next to this script; this program only
// validates the gate shape and copies it. No network, no dependencies,
// deterministic: same input always produces the same output bytes.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const entryPath = join(scriptDir, "entry.txt");

const raw = readFileSync(entryPath, "utf8");

// All gate checks in one place so the copy step below stays trivial:
// validateEntry() either returns the entry unchanged or throws, so what
// reaches the output file is exactly the text that passed validation.
function validateEntry(raw) {
  // Gate shape (kit): UTF-8 text, 1-5 chars, not only whitespace; and the
  // competition requires digits only, exactly one number, no words.
  if (raw.length < 1 || raw.length > 5) {
    throw new Error(`entry must be 1-5 characters, got ${raw.length}`);
  }
  if (!/^[0-9]+$/.test(raw)) {
    throw new Error("entry must be digits only");
  }
  if (!raw.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  return raw;
}

const entry = validateEntry(raw);

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
