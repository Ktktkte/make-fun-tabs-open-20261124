// tabs-open-20261124 — writes the entrant's honest open-tab count (one digit)
// to /output/entry.txt for the make.fun "How Many Tabs Do You Have Open?" bounty.
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(join(scriptDir, "entry.txt"), "utf8").trim();

if (!/^[0-9]+$/.test(text) || text.length < 1 || text.length > 5) {
  console.error("entry.txt must hold one number of 1 to 5 digits, nothing else");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");

// Read back what was written so a silent write failure never passes quietly.
if (readFileSync(outPath, "utf8") !== text) {
  console.error("verification failed: output does not match entry.txt");
  process.exit(1);
}
