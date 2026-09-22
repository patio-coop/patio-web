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

const locationsByName = new Map([
  ["Alt", ["Buenos Aires", -34.6037, -58.3816]],
  ["Animus", ["Bariloche", -41.1335, -71.3103]],
  ["Boot Coop", ["Buenos Aires", -34.6037, -58.3816]],
  ["Cambá", ["Buenos Aires", -34.6037, -58.3816]],
  ["Código Libre", ["Buenos Aires", -34.6037, -58.3816]],
  ["El Maizal", ["Buenos Aires", -34.6037, -58.3816]],
  ["Eryx", ["Buenos Aires", -34.6037, -58.3816]],
  ["Fiqus", ["Buenos Aires", -34.6037, -58.3816]],
  ["Gcoop", ["Buenos Aires", -34.6037, -58.3816]],
  ["Indepi", ["Buenos Aires", -34.6037, -58.3816]],
  ["Pollux", ["Buenos Aires", -34.6037, -58.3816]],
  ["Redjar", ["Buenos Aires", -34.6037, -58.3816]],
  ["Sutty", ["Buenos Aires", -34.6037, -58.3816]],
  ["Tecso", ["Rosario", -32.9442, -60.6505]],
  ["Tinta Sur", ["Buenos Aires", -34.6037, -58.3816]],
  ["Nayra", ["Caseros", -34.6033, -58.5641]],
  ["NewDev", ["Santiago", -33.4489, -70.6693]],
  ["Albatros", ["Istanbul", 41.0082, 28.9784]],
  ["Camplight", ["Sofia", 42.6977, 23.3219]],
  ["Libre Code", ["Brasília", -15.7939, -47.8828]],
  ["StartinBlox", ["Paris", 48.8566, 2.3522]],
  ["Sofi", ["Tel Aviv", 32.0853, 34.7818]],
  ["TNG", ["Yugawara", 35.1478, 139.1086]],
  ["Autonomic", ["London", 51.5072, -0.1276]],
  ["Web Architects", ["Sheffield", 53.3811, -1.4701]],
  ["Fnordkollektiv", ["Berlin", 52.52, 13.405]],
  ["Sociality", ["Athens", 37.9838, 23.7275]],
  ["Slobodna Domena", ["Zagreb", 45.815, 15.9819]],
  ["Coopdevs", ["Barcelona", 41.3874, 2.1686]],
  ["Cooperos", ["Mexico City", 19.4326, -99.1332]],
  ["Tierra Común", ["Mexico City", 19.4326, -99.1332]],
  ["Rad Cop", ["Moscow", 55.7558, 37.6173]],
  ["Agaric", ["Boston", 42.3601, -71.0589]],
  ["ChiCommons", ["Chicago", 41.8781, -87.6298]],
  ["Colab", ["Oak Harbor", 41.5067, -83.1466]],
  ["Limeleaf", ["Portland", 45.5152, -122.6784]],
  ["Polycot Associates", ["Austin", 30.2672, -97.7431]],
  ["Position development", ["New York", 40.7128, -74.006]],
  ["Coodi", ["Montevideo", -34.9011, -56.1645]],
  ["Optimi", ["Wellington", -41.2866, 174.7756]],
]);

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
  const location = locationsByName.get(cooperative.name);
  if (!location) {
    throw new Error(`Missing location for ${cooperative.name}`);
  }
  fs.copyFileSync(sourceLogo, path.join(logoDirectory, logoName));

  return {
    name: cooperative.name === "Alt" ? "ALT.coop" : cooperative.name,
    enabled: !disabledCooperatives.has(cooperative.name),
    region: regionByCountry.get(cooperative.country),
    country: cooperative.country,
    city: location[0],
    latitude: location[1],
    longitude: location[2],
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
    city: "Buenos Aires",
    latitude: -34.6037,
    longitude: -58.3816,
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
