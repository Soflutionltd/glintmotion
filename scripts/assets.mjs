#!/usr/bin/env node
// Builds the README's buttons and "By the numbers" card from live GitHub data, with every
// word drawn as a Manrope outline so the images look the same in any browser.
//
//   GITHUB_TOKEN=… node scripts/assets.mjs
//
// Writes data/stats.json, assets/buttons/*.svg and assets/stats/numbers.svg.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import opentype from "opentype.js";

const root = resolve(import.meta.dirname, "..");
const UPSTREAM = "heygen-com/hyperframes";
const EFFECTS = "Soflutionltd/glintmotion-effects";
const SELF = "Soflutionltd/glintmotion";
const app = JSON.parse(readFileSync(join(root, "data/app.json"), "utf8"));

const fonts = Object.fromEntries(
  ["ExtraBold", "SemiBold", "Medium"].map((weight) => [
    weight,
    opentype.parse(readFileSync(join(root, `banner/fonts/Manrope-${weight}.ttf`)).buffer),
  ]),
);

async function request(url) {
  const headers = { accept: "application/vnd.github+json", "user-agent": "glintmotion-showcase" };
  if (process.env.GITHUB_TOKEN && url.startsWith("https://api.github.com/")) {
    headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(30_000) });
  if (!response.ok) throw new Error(`${url} answered HTTP ${response.status}`);
  return response;
}

const api = async (path) => (await request(`https://api.github.com/${path}`)).json();

async function countContributors(repo) {
  const response = await request(`https://api.github.com/repos/${repo}/contributors?per_page=1&anon=1`);
  const last = response.headers.get("link")?.match(/[?&]page=(\d+)>; rel="last"/);
  return last ? Number(last[1]) : (await response.json()).length;
}

async function collect() {
  const [upstream, upstreamReleases, contributors, upstreamRegistry, effectsRegistry, effectsDirs, shaders, release] =
    await Promise.all([
      api(`repos/${UPSTREAM}`),
      api(`repos/${UPSTREAM}/releases?per_page=100`),
      countContributors(UPSTREAM),
      (await request(`https://raw.githubusercontent.com/${UPSTREAM}/main/registry/registry.json`)).json(),
      (await request(`https://raw.githubusercontent.com/${EFFECTS}/main/registry.json`)).json(),
      api(`repos/${EFFECTS}/contents/effects`),
      api(`repos/${EFFECTS}/contents/transitions/gl`),
      api(`repos/${SELF}/releases/latest`),
    ]);

  const tags = upstreamReleases.map((item) => item.tag_name);
  const behind = tags.indexOf(`v${app.engine}`);
  if (behind < 0) throw new Error(`v${app.engine} is not among ${UPSTREAM}'s last ${tags.length} releases`);
  if (!release.assets.some((asset) => asset.name === app.asset)) {
    throw new Error(`release ${release.tag_name} has no ${app.asset}`);
  }

  const upstreamCatalog = upstreamRegistry.items.length;
  const effectsCatalog = effectsRegistry.items.length;
  return {
    updated: new Date().toISOString().slice(0, 10),
    hyperframes: {
      stars: upstream.stargazers_count,
      forks: upstream.forks_count,
      contributors,
      latest: tags[0],
      catalog: upstreamCatalog,
    },
    effects: {
      catalog: effectsCatalog,
      transitions: shaders.filter((entry) => entry.name.endsWith(".glsl")).length,
      effects: effectsDirs.filter((entry) => entry.type === "dir").length,
    },
    glintmotion: {
      version: release.tag_name.replace(/^v/, ""),
      downloads: release.assets.reduce((sum, asset) => sum + asset.download_count, 0),
      agentTools: app.agentTools,
      engine: app.engine,
      engineBehind: behind,
      catalog: upstreamCatalog + effectsCatalog,
      platform: app.platform,
    },
  };
}

function compact(value) {
  if (value < 1000) return String(value);
  return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
}

const escapeXml = (text) => text.replace(/[<>&"]/g, (char) => `&#${char.charCodeAt(0)};`);

function measure(text, size, weight, tracking = 0) {
  return fonts[weight].getAdvanceWidth(text, size) + tracking * size * Math.max(text.length - 1, 0);
}

// opentype.js 2.0's own toPathData() writes "NaN" for some coordinates.
function pathData(path) {
  const number = (value) => {
    if (!Number.isFinite(value)) throw new Error(`glyph outline has a non-finite coordinate: ${value}`);
    return String(Math.round(value * 100) / 100);
  };
  return path.commands
    .map((command) => {
      switch (command.type) {
        case "M":
        case "L":
          return `${command.type}${number(command.x)} ${number(command.y)}`;
        case "Q":
          return `Q${number(command.x1)} ${number(command.y1)} ${number(command.x)} ${number(command.y)}`;
        case "C":
          return `C${number(command.x1)} ${number(command.y1)} ${number(command.x2)} ${number(command.y2)} ${number(command.x)} ${number(command.y)}`;
        case "Z":
          return "Z";
        default:
          throw new Error(`unknown path command ${command.type}`);
      }
    })
    .join("");
}

// Text as outlines. `anchor` is start or end; `fit` shrinks the size until the text fits.
function text(value, { x, y, size, weight = "SemiBold", fill = "#f3f4f6", anchor = "start", tracking = 0, fit }) {
  let fontSize = size;
  if (fit) while (measure(value, fontSize, weight, tracking) > fit && fontSize > 8) fontSize -= 1;
  const font = fonts[weight];
  const width = measure(value, fontSize, weight, tracking);
  let cursor = anchor === "end" ? x - width : x;
  let data = "";
  if (tracking === 0) {
    data = pathData(font.getPath(value, cursor, y, fontSize, { kerning: true }));
  } else {
    for (const char of value) {
      data += pathData(font.getPath(char, cursor, y, fontSize));
      cursor += font.getAdvanceWidth(char, fontSize) + tracking * fontSize;
    }
  }
  return { svg: `<path d="${data}" fill="${fill}"/>`, width, size: fontSize };
}

const BRAND = `<linearGradient id="brand" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#06E3FA"/><stop offset="1" stop-color="#4FDB5E"/></linearGradient>`;

const ICONS = {
  download: (fill) =>
    `<path d="M20 6v19m0 0-8-8m8 8 8-8M8 32h24" stroke="${fill}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  sparkle: () =>
    `<path d="M24 2C25.4 13 28 15.6 39 17C28 18.4 25.4 21 24 32C22.6 21 20 18.4 9 17C20 15.6 22.6 13 24 2Z" fill="url(#brand)"/><path d="M3 36L14 28.5" stroke="url(#brand)" stroke-width="3.6" stroke-linecap="round"/>`,
  notes: () =>
    `<rect x="7" y="4" width="26" height="32" rx="7" stroke="url(#brand)" stroke-width="3.6" fill="none"/><path d="M14 14h12M14 21h12M14 28h7" stroke="url(#brand)" stroke-width="3.6" stroke-linecap="round"/>`,
};

function button({ title, subtitle, icon, primary }) {
  const height = 112;
  const pad = 40;
  const iconSize = 40;
  const gap = 22;
  const titleColor = primary ? "#04140c" : "#f3f4f6";
  const subtitleColor = primary ? "rgba(4,20,12,0.68)" : "#9aa0a8";
  const left = pad + iconSize + gap;
  const titleText = text(title, { x: left, y: 52, size: 32, weight: "ExtraBold", fill: titleColor });
  const subtitleText = text(subtitle, { x: left, y: 84, size: 21, weight: "SemiBold", fill: subtitleColor });
  const width = Math.ceil(left + Math.max(titleText.width, subtitleText.width) + pad);
  const background = primary
    ? `<rect width="${width}" height="${height}" rx="28" fill="url(#brand)"/><rect x="1.5" y="1.5" width="${width - 3}" height="${height - 3}" rx="26.5" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="3"/>`
    : `<rect width="${width}" height="${height}" rx="28" fill="#121417"/><rect x="1.5" y="1.5" width="${width - 3}" height="${height - 3}" rx="26.5" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="3"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(`${title}, ${subtitle}`)}">
<defs>${BRAND}</defs>
${background}
<g transform="translate(${pad} ${(height - iconSize) / 2})">${ICONS[icon](titleColor)}</g>
${titleText.svg}
${subtitleText.svg}
</svg>
`;
}

function numbersCard(stats) {
  const width = 1600;
  const height = 400;
  const margin = 64;
  const gap = 24;
  const tileWidth = (width - margin * 2 - gap * 3) / 4;
  const inner = tileWidth - 64;
  const behind = stats.glintmotion.engineBehind;
  const tiles = [
    {
      value: String(stats.glintmotion.catalog),
      label: "catalog items",
      note: `${stats.hyperframes.catalog} HyperFrames + ${stats.effects.catalog} Glintmotion`,
      accent: true,
    },
    {
      value: String(stats.glintmotion.agentTools),
      label: "agent tools over MCP",
      note: "the agent drives the studio",
      accent: true,
    },
    {
      value: `v${stats.glintmotion.engine}`,
      label: "HyperFrames engine",
      note: behind === 0 ? "up to date with upstream" : `${behind} release${behind > 1 ? "s" : ""} behind upstream`,
    },
    {
      value: compact(stats.hyperframes.stars),
      label: "stars on HyperFrames",
      note: `${stats.hyperframes.contributors} contributors upstream`,
    },
  ];
  const parts = tiles.map((tile, index) => {
    const x = margin + index * (tileWidth + gap);
    const value = text(tile.value, {
      x: x + 32,
      y: 210,
      size: 84,
      weight: "ExtraBold",
      fill: tile.accent ? "url(#brand)" : "#f3f4f6",
      fit: inner,
    });
    const label = text(tile.label, { x: x + 32, y: 262, size: 24, weight: "SemiBold", fill: "#e8eaed", fit: inner });
    const note = text(tile.note, { x: x + 32, y: 298, size: 19, weight: "Medium", fill: "#8d939b", fit: inner });
    return `<rect x="${x}" y="104" width="${tileWidth}" height="240" rx="24" fill="rgba(255,255,255,0.035)" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
${value.svg}
${label.svg}
${note.svg}`;
  });
  const eyebrow = text("BY THE NUMBERS", { x: margin, y: 66, size: 19, weight: "ExtraBold", fill: "#8d939b", tracking: 0.14 });
  const updated = text(`Updated ${stats.updated} from the GitHub API`, {
    x: width - margin,
    y: 66,
    size: 19,
    weight: "Medium",
    fill: "#6b7178",
    anchor: "end",
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(
    tiles.map((tile) => `${tile.value} ${tile.label}`).join(", "),
  )}">
<defs>${BRAND}<linearGradient id="card" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#15171b"/><stop offset="0.55" stop-color="#0b0c0e"/><stop offset="1" stop-color="#0b120f"/></linearGradient></defs>
<rect width="${width}" height="${height}" rx="36" fill="url(#card)"/>
<rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="35" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
${eyebrow.svg}
${updated.svg}
${parts.join("\n")}
</svg>
`;
}

const stats = await collect();
mkdirSync(join(root, "assets/buttons"), { recursive: true });
mkdirSync(join(root, "assets/stats"), { recursive: true });
writeFileSync(join(root, "data/stats.json"), `${JSON.stringify(stats, null, 2)}\n`);
writeFileSync(
  join(root, "assets/buttons/download.svg"),
  button({
    title: "Download for macOS",
    subtitle: `v${stats.glintmotion.version} · ${stats.glintmotion.platform.replace("macOS · ", "")}`,
    icon: "download",
    primary: true,
  }),
);
writeFileSync(
  join(root, "assets/buttons/effects.svg"),
  button({ title: "Effects library", subtitle: `${stats.effects.catalog} effects and transitions`, icon: "sparkle" }),
);
writeFileSync(
  join(root, "assets/buttons/whats-new.svg"),
  button({ title: "What's new", subtitle: `Release notes v${stats.glintmotion.version}`, icon: "notes" }),
);
writeFileSync(join(root, "assets/stats/numbers.svg"), numbersCard(stats));
console.log(JSON.stringify(stats));
