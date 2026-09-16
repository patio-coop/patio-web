import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const sourceRoot = process.argv[2];
if (!sourceRoot) {
  throw new Error("Usage: node scripts/import-legacy-cooperatives.mjs <patio-homepage-root>");
}

const appRoot = path.resolve(import.meta.dirname, "..");
const dataPath = path.join(appRoot, "data/cooperatives.json");
const logoDirectory = path.join(appRoot, "public/assets/cooperatives");

function evaluate(file, expression, globals = {}) {
  const context = vm.createContext(globals);
  vm.runInContext(`${fs.readFileSync(file, "utf8")}\n;globalThis.__result = ${expression};`, context);
  return context.__result;
}

const countries = evaluate(
  path.join(sourceRoot, "prototype/assets/countries.js"),
  "data.countries",
  { data: {} },
);
const languages = evaluate(
  path.join(sourceRoot, "prototype/assets/languages.js"),
  "languages",
);

const serviceAliases = new Map([
  ["Advertising and Marketing", "Digital Marketing"],
  ["Apps", "Application Development"],
  ["Artificial Intelligence", "AI"],
  ["Branding and Identity", "Branding & Identity"],
  ["Cloud-based Infrastructure", "Cloud Infrastructure"],
  ["Content Management System (CMSs)", "Content Management Systems"],
  ["Crypto & Blockchain", "Blockchain"],
  ["Crypto and Blockchain", "Blockchain"],
  ["Databases", "Database Engineering"],
  ["Devops", "DevOps"],
  ["Digitalization", "Digital Transformation"],
  ["Enterprise Resource Planning (ERP)", "ERP"],
  ["ERPs", "ERP"],
  ["ICT Consulting", "Technology Consulting"],
  ["ICT Project Management", "Technology Project Management"],
  ["IT Security", "Cybersecurity"],
  ["IT security services", "Cybersecurity"],
  ["Networking, Wired and Wireless", "Network Infrastructure"],
  ["Networking, Wired and Wireless Services", "Network Infrastructure"],
  ["Server Installation and Configuration", "Server Infrastructure"],
  ["Staff Augmentation", "Team Augmentation"],
  ["UX / UI", "UI/UX Design"],
  ["Web design", "Web Design"],
  ["Web Portals, Apps and Services", "Web Applications"],
  ["Websites", "Web Development"],
]);

const regionByCountry = new Map([
  ...["Argentina", "Brazil", "Chile", "Mexico", "United States", "Uruguay"].map((country) => [country, "Americas"]),
  ...["Bulgaria", "Croatia", "France", "Germany", "Greece", "Russia", "Spain", "United Kingdom"].map((country) => [country, "Europe"]),
  ...["Israel", "Turkey"].map((country) => [country, "Middle East"]),
  ...["Japan", "New Zealand"].map((country) => [country, "Asia-Pacific"]),
]);

const descriptionFallbacks = new Map([
  [
    "TNG",
    "TNG is an AI services worker cooperative based in Yugawara, Japan. It provides software and system development, civic technology, digital transformation, and practical technology support.",
  ],
  [
    "Fnordkollektiv",
    "Fnordkollektiv is a collectively owned IT company based in Germany. It develops and operates sustainable, privacy-conscious software with a focus on customized open-source solutions.",
  ],
]);

const disabledCooperatives = new Set(["Fiqus"]);

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeUrl(value) {
  const url = new URL(value);
  url.protocol = "https:";
  url.hash = "";
  return url.toString();
}

function imageDimensions(buffer) {
  if (buffer.subarray(1, 4).toString() === "PNG") {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) break;
    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        width: buffer.readUInt16BE(offset + 7),
        height: buffer.readUInt16BE(offset + 5),
      };
    }
    offset += 2 + length;
  }
  throw new Error("Unsupported image format");
}

const sourceLogoDirectory = path.join(sourceRoot, "prototype/media/logos");
const sourceCooperatives = countries.flatMap((country) =>
  (country.coops ?? []).map((cooperative) => ({ country: country.name, ...cooperative })),
);

const records = sourceCooperatives.map((cooperative, index) => {
  const sourceLogo = path.join(sourceLogoDirectory, cooperative.logo);
  const extension = path.extname(cooperative.logo).toLowerCase();
  const logoName = `${slugify(cooperative.name)}${extension}`;
  const logoBuffer = fs.readFileSync(sourceLogo);
  fs.copyFileSync(sourceLogo, path.join(logoDirectory, logoName));

  return {
    name: cooperative.name === "Alt" ? "ALT.coop" : cooperative.name,
    enabled: !disabledCooperatives.has(cooperative.name),
    region: regionByCountry.get(cooperative.country),
    country: cooperative.country,
    services: [...new Set(cooperative.services.map((service) => serviceAliases.get(service.trim()) ?? service.trim()))],
    website: normalizeUrl(cooperative.url),
    description:
      languages[cooperative.description]?.en ||
      descriptionFallbacks.get(cooperative.name) ||
      "",
    headline: languages[cooperative.tagline]?.en ?? "",
    networkLayout: {
      column: (index % 4) + 1,
      row: Math.floor(index / 4) * 140 + 1,
      height: 140,
    },
    logo: {
      src: `/assets/cooperatives/${logoName}`,
      ...imageDimensions(logoBuffer),
    },
  };
});

const existing = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const farox = existing.find((cooperative) => cooperative.name === "Farox");
if (farox) {
  records.push({
    ...farox,
    enabled: true,
    region: "Americas",
    networkLayout: {
      column: (records.length % 4) + 1,
      row: Math.floor(records.length / 4) * 140 + 1,
      height: 140,
    },
  });
}

if (records.some((record) => !record.region)) {
  throw new Error("Every cooperative must have a normalized region");
}

fs.writeFileSync(dataPath, `${JSON.stringify(records, null, 2)}\n`);
console.log(`Imported ${sourceCooperatives.length} legacy cooperatives and preserved ${farox ? 1 : 0} local-only cooperative.`);
