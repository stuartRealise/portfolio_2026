import { readFileSync, readdirSync } from "fs";
import path from "path";

const rootDir = process.cwd();
const caseStudiesDir = path.join(rootDir, "content", "case-studies");
const workFile = path.join(rootDir, "content", "work.json");

function readJson(filePath) {
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function fail(messages) {
  console.error("\nCase study validation failed:\n");
  messages.forEach((m) => console.error(`- ${m}`));
  process.exit(1);
}

const errors = [];

let work = [];
try {
  work = readJson(workFile);
} catch (err) {
  fail([`Could not read content/work.json: ${String(err.message || err)}`]);
}

if (!Array.isArray(work)) {
  fail(["content/work.json must be an array"]);
}

const workSlugs = new Set();
for (const [index, item] of work.entries()) {
  const prefix = `work.json item ${index + 1}`;
  if (!item || typeof item !== "object") {
    errors.push(`${prefix} is not an object`);
    continue;
  }
  if (!item.slug || typeof item.slug !== "string") {
    errors.push(`${prefix} is missing a string "slug"`);
    continue;
  }
  if (workSlugs.has(item.slug)) {
    errors.push(`Duplicate slug in work.json: "${item.slug}"`);
  }
  workSlugs.add(item.slug);
}

let files = [];
try {
  files = readdirSync(caseStudiesDir).filter((f) => f.endsWith(".json"));
} catch (err) {
  fail([`Could not read case-studies directory: ${String(err.message || err)}`]);
}

const fileSlugs = new Set(files.map((f) => f.replace(/\.json$/, "")));

for (const file of files) {
  const fileSlug = file.replace(/\.json$/, "");
  const fullPath = path.join(caseStudiesDir, file);
  let cs;

  try {
    cs = readJson(fullPath);
  } catch (err) {
    errors.push(`Invalid JSON in ${file}: ${String(err.message || err)}`);
    continue;
  }

  const requiredTopLevel = [
    "slug",
    "title",
    "client",
    "heroImage",
    "summary",
    "role",
    "duration",
    "year",
    "tags",
    "indexImage",
    "indexTeaser",
    "sections",
  ];

  for (const key of requiredTopLevel) {
    if (!(key in cs)) {
      errors.push(`${file}: missing required key "${key}"`);
    }
  }

  if (typeof cs.slug !== "string") {
    errors.push(`${file}: "slug" must be a string`);
  } else if (cs.slug !== fileSlug) {
    errors.push(
      `${file}: slug mismatch (file is "${fileSlug}" but JSON slug is "${cs.slug}")`
    );
  }

  if (!Array.isArray(cs.tags)) {
    errors.push(`${file}: "tags" must be an array`);
  }

  if (!cs.sections || typeof cs.sections !== "object") {
    errors.push(`${file}: missing or invalid "sections" object`);
    continue;
  }

  const requiredSections = [
    "oversight",
    "problem",
    "decision",
    "methods",
    "solution",
    "outcomes",
    "reflection",
  ];

  for (const sectionName of requiredSections) {
    if (!(sectionName in cs.sections)) {
      errors.push(`${file}: sections.${sectionName} is missing`);
    }
  }
}

for (const workSlug of workSlugs) {
  if (!fileSlugs.has(workSlug)) {
    errors.push(
      `work.json references "${workSlug}" but content/case-studies/${workSlug}.json does not exist`
    );
  }
}

for (const fileSlug of fileSlugs) {
  if (!workSlugs.has(fileSlug)) {
    errors.push(
      `Case study file "${fileSlug}.json" exists but no matching slug was found in work.json`
    );
  }
}

if (errors.length > 0) {
  fail(errors);
}

console.log("Case study validation passed.");
console.log(`- work.json entries: ${workSlugs.size}`);
console.log(`- case study files: ${fileSlugs.size}`);
