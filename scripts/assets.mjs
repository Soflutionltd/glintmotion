#!/usr/bin/env node
// Builds the README's buttons and "By the numbers" card from live GitHub data, with every
// word drawn as a Manrope outline so the images look the same in any browser.
//
//   GITHUB_TOKEN=… node scripts/assets.mjs
//
// Writes data/stats.json, assets/buttons/*.svg and assets/stats/*.svg. The speed charts read
// data/bench.json, written by the source repository's scripts/bench-vs-hyperframes.mjs.

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

const ENGINES = [
  { key: "glintmotion", label: "Glintmotion", fill: "url(#brand)", text: "#f3f4f6" },
  { key: "hyperframes-gpu", label: "HyperFrames --gpu", fill: "#5b626b", text: "#c4c8cd" },
  { key: "hyperframes", label: "HyperFrames", fill: "#3a3f46", text: "#c4c8cd" },
];

const seconds = (value) => `${value.toFixed(1)} s`;
const percentFaster = (glintmotion, other) => Math.round((1 - glintmotion / other) * 100);

/** Median render time saved against upstream's default settings, over every measured video. */
function averageSaving(bench) {
  const savings = bench.compositions.map((c) => 1 - c.medianSeconds.glintmotion / c.medianSeconds.hyperframes);
  return Math.round((savings.reduce((sum, value) => sum + value, 0) / savings.length) * 100);
}

function cardFrame({ width, height, label, body, eyebrow, note }) {
  const margin = 64;
  const head = text(eyebrow, { x: margin, y: 66, size: 19, weight: "ExtraBold", fill: "#8d939b", tracking: 0.14 });
  const right = text(note, { x: width - margin, y: 66, size: 19, weight: "Medium", fill: "#6b7178", anchor: "end" });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeXml(label)}">
<defs>${BRAND}<linearGradient id="card" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#15171b"/><stop offset="0.55" stop-color="#0b0c0e"/><stop offset="1" stop-color="#0b120f"/></linearGradient></defs>
<rect width="${width}" height="${height}" rx="36" fill="url(#card)"/>
<rect x="1" y="1" width="${width - 2}" height="${height - 2}" rx="35" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
${head.svg}
${right.svg}
${body}
</svg>
`;
}

const measuredOn = (bench) => `Measured ${bench.measured} · ${bench.machine.chip.replace("Apple ", "")} · same Chrome and FFmpeg`;

/** One row per video: the three engines' median render times, and how much less Glintmotion takes. */
function speedCard(bench) {
  const width = 1600;
  const margin = 64;
  const labelWidth = 330;
  const gainWidth = 230;
  const barLeft = margin + labelWidth;
  const barMax = width - margin - gainWidth - barLeft - 120;
  const barHeight = 24;
  const barGap = 8;
  const rowHeight = ENGINES.length * (barHeight + barGap) + 44;
  const top = 120;
  const longest = Math.max(...bench.compositions.flatMap((c) => ENGINES.map((e) => c.medianSeconds[e.key])));
  const rows = bench.compositions.map((composition, index) => {
    const y = top + index * rowHeight;
    const name = text(composition.name, { x: margin, y: y + 34, size: 28, weight: "ExtraBold", fit: labelWidth - 24 });
    const meta = text(`${composition.durationSeconds} s · ${composition.size}`, {
      x: margin,
      y: y + 66,
      size: 19,
      weight: "Medium",
      fill: "#8d939b",
    });
    const bars = ENGINES.map((engine, n) => {
      const value = composition.medianSeconds[engine.key];
      const barWidth = Math.max(6, (value / longest) * barMax);
      const barY = y + n * (barHeight + barGap);
      const label = text(seconds(value), {
        x: barLeft + barWidth + 14,
        y: barY + 19,
        size: 19,
        weight: engine.key === "glintmotion" ? "ExtraBold" : "SemiBold",
        fill: engine.text,
      });
      return `<rect x="${barLeft}" y="${barY}" width="${barWidth.toFixed(1)}" height="${barHeight}" rx="8" fill="${engine.fill}"/>${label.svg}`;
    });
    const gain = percentFaster(composition.medianSeconds.glintmotion, composition.medianSeconds.hyperframes);
    const gainText = text(`−${gain} %`, { x: width - margin, y: y + 46, size: 52, weight: "ExtraBold", fill: "url(#brand)", anchor: "end" });
    const gainNote = text(`×${composition.speedup.toFixed(2)} vs HyperFrames`, {
      x: width - margin,
      y: y + 76,
      size: 18,
      weight: "Medium",
      fill: "#8d939b",
      anchor: "end",
    });
    const rule =
      index < bench.compositions.length - 1
        ? `<rect x="${margin}" y="${y + rowHeight - 22}" width="${width - margin * 2}" height="2" fill="rgba(255,255,255,0.06)"/>`
        : "";
    return `${name.svg}${meta.svg}${bars.join("")}${gainText.svg}${gainNote.svg}${rule}`;
  });
  const legendY = top + bench.compositions.length * rowHeight + 10;
  let cursor = margin;
  const legend = ENGINES.map((engine) => {
    const label = text(engine.label, { x: cursor + 34, y: legendY + 19, size: 19, weight: "SemiBold", fill: "#c4c8cd" });
    const item = `<rect x="${cursor}" y="${legendY + 2}" width="22" height="22" rx="6" fill="${engine.fill}"/>${label.svg}`;
    cursor += 34 + label.width + 40;
    return item;
  });
  const height = legendY + 64;
  return cardFrame({
    width,
    height,
    eyebrow: "RENDER TIME · SHORTER IS FASTER",
    note: measuredOn(bench),
    label: bench.compositions
      .map((c) => `${c.name}: Glintmotion ${seconds(c.medianSeconds.glintmotion)}, HyperFrames ${seconds(c.medianSeconds.hyperframes)}`)
      .join("; "),
    body: `${rows.join("\n")}\n${legend.join("")}`,
  });
}

/** One video cut to several lengths: render time against length, one line per engine, real time dotted. */
function curveCard(bench) {
  const width = 1600;
  const height = 720;
  const left = 140;
  const right = width - 80;
  const top = 130;
  const bottom = height - 150;
  const points = [...bench.curve.points]
    .sort((a, b) => a.seconds - b.seconds)
    .map((point) => ({ durationSeconds: point.seconds, medianSeconds: point.medianSeconds }));
  const maxX = Math.ceil(Math.max(...points.map((p) => p.durationSeconds)) / 10) * 10;
  const maxY = Math.ceil(Math.max(...points.flatMap((p) => ENGINES.map((e) => p.medianSeconds[e.key])), maxX) / 20) * 20;
  const x = (value) => left + (value / maxX) * (right - left);
  const y = (value) => bottom - (value / maxY) * (bottom - top);
  const grid = [];
  for (let value = 0; value <= maxY; value += 20) {
    grid.push(`<rect x="${left}" y="${y(value) - 1}" width="${right - left}" height="2" fill="rgba(255,255,255,${value === 0 ? 0.14 : 0.05})"/>`);
    grid.push(text(`${value} s`, { x: left - 18, y: y(value) + 7, size: 18, weight: "Medium", fill: "#6b7178", anchor: "end" }).svg);
  }
  for (let value = 0; value <= maxX; value += 10) {
    grid.push(text(`${value} s`, { x: x(value) - 14, y: bottom + 36, size: 18, weight: "Medium", fill: "#6b7178" }).svg);
  }
  const realTime = `<path d="M${x(0)} ${y(0)} L${x(Math.min(maxX, maxY))} ${y(Math.min(maxX, maxY))}" stroke="rgba(255,255,255,0.22)" stroke-width="2" stroke-dasharray="4 8" fill="none"/>`;
  const realTimeLabel = text("real time", {
    x: x(Math.min(maxX, maxY)) - 12,
    y: y(Math.min(maxX, maxY)) + 30,
    size: 18,
    weight: "Medium",
    fill: "#8d939b",
    anchor: "end",
  }).svg;
  const lines = [...ENGINES].reverse().map((engine) => {
    const path = points.map((p, n) => `${n ? "L" : "M"}${x(p.durationSeconds).toFixed(1)} ${y(p.medianSeconds[engine.key]).toFixed(1)}`).join(" ");
    const stroke = engine.key === "glintmotion" ? "url(#line)" : engine.fill === "#3a3f46" ? "#6b727b" : "#9aa1a9";
    const dash = engine.key === "hyperframes-gpu" ? ` stroke-dasharray="14 10"` : "";
    const dots = points
      .map((p) => `<circle cx="${x(p.durationSeconds).toFixed(1)}" cy="${y(p.medianSeconds[engine.key]).toFixed(1)}" r="7" fill="#0b0c0e" stroke="${stroke}" stroke-width="4"/>`)
      .join("");
    return `<path d="${path}" stroke="${stroke}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"${dash}/>${dots}`;
  });
  const last = points.at(-1);
  const callout = text(`${seconds(last.medianSeconds.glintmotion)} for ${last.durationSeconds} s of video`, {
    x: x(last.durationSeconds) - 18,
    y: y(last.medianSeconds.glintmotion) + 68,
    size: 20,
    weight: "ExtraBold",
    fill: "#e8eaed",
    anchor: "end",
  }).svg;
  let cursor = left;
  const legend = ENGINES.map((engine) => {
    const stroke = engine.key === "glintmotion" ? "#2ee0a8" : engine.fill === "#3a3f46" ? "#6b727b" : "#9aa1a9";
    const dash = engine.key === "hyperframes-gpu" ? ` stroke-dasharray="10 7"` : "";
    const label = text(engine.label, { x: cursor + 48, y: height - 58, size: 19, weight: "SemiBold", fill: "#c4c8cd" });
    const item = `<path d="M${cursor} ${height - 64} h34" stroke="${stroke}" stroke-width="5" stroke-linecap="round"${dash}/>${label.svg}`;
    cursor += 48 + label.width + 40;
    return item;
  });
  const axis = text(`length of ${bench.curve.composition} rendered`, {
    x: right,
    y: bottom + 70,
    size: 18,
    weight: "Medium",
    fill: "#6b7178",
    anchor: "end",
  }).svg;
  const svg = cardFrame({
    width,
    height,
    eyebrow: "RENDER TIME BY VIDEO LENGTH",
    note: measuredOn(bench),
    label: `Render time of ${bench.curve.composition} cut to ${points.map((p) => `${p.durationSeconds} s`).join(", ")}, Glintmotion against HyperFrames`,
    body: `${grid.join("")}${realTime}${realTimeLabel}${lines.join("")}${callout}${legend.join("")}${axis}`,
  });
  return svg.replace(
    "</defs>",
    `<linearGradient id="line" gradientUnits="userSpaceOnUse" x1="${left}" y1="0" x2="${right}" y2="0"><stop stop-color="#06E3FA"/><stop offset="1" stop-color="#4FDB5E"/></linearGradient></defs>`,
  );
}

function numbersCard(stats, bench) {
  const width = 1600;
  const height = 400;
  const margin = 64;
  const gap = 24;
  const tileWidth = (width - margin * 2 - gap * 3) / 4;
  const inner = tileWidth - 64;
  const tiles = [
    {
      value: `−${averageSaving(bench)} %`,
      label: "render time vs HyperFrames",
      note: `average of ${bench.compositions.length} videos, same Mac`,
      accent: true,
    },
    {
      value: seconds(bench.partial.medianSeconds),
      label: `for ${bench.partial.to - bench.partial.from} s of a ${bench.compositions.find((c) => c.name === bench.partial.composition).durationSeconds} s video`,
      note: "render only a passage, sound included",
      accent: true,
    },
    {
      value: String(stats.glintmotion.agentTools),
      label: "agent tools over MCP",
      note: "the agent drives the studio",
    },
    {
      value: String(stats.glintmotion.catalog),
      label: "catalog items",
      note: "blocks, effects and transitions",
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
const bench = JSON.parse(readFileSync(join(root, "data/bench.json"), "utf8"));
writeFileSync(join(root, "assets/stats/numbers.svg"), numbersCard(stats, bench));
writeFileSync(join(root, "assets/stats/speed.svg"), speedCard(bench));
writeFileSync(join(root, "assets/stats/speed-curve.svg"), curveCard(bench));
console.log(JSON.stringify(stats));
