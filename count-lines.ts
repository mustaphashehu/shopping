// count-lines.ts (CommonJS-compatible)
const fs = require("fs");
const path = require("path");

const excludedDirs = ["node_modules", ".next", "public"];
const includedExtensions = [".ts", ".tsx", ".js", ".jsx"];
let totalLines = 0;

function countLines(filePath: string): number {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n").filter((line: string) => line.trim() !== "");
  return lines.length;
}

function walkDirectory(dir: string) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      if (!excludedDirs.includes(item.name)) {
        walkDirectory(fullPath);
      }
    } else {
      const ext = path.extname(item.name);
      if (includedExtensions.includes(ext)) {
        const count = countLines(fullPath);
        totalLines += count;
        console.log(`${fullPath} — ${count} lines`);
      }
    }
  }
}

walkDirectory(".");

console.log(`\n✅ Total non-empty lines of code: ${totalLines}`);
