<p align="center">
  <a href="https://github.com/Soflutionltd/glintmotion/releases/latest">
    <img src="assets/banner.webp" alt="Glintmotion: the motion design studio your AI agent can drive" width="100%">
  </a>
</p>

<p align="center">
  <a href="https://github.com/Soflutionltd/glintmotion/releases/latest"><img src="https://img.shields.io/github/v/release/Soflutionltd/glintmotion?style=flat-square&labelColor=0b0c0e&color=4fdb5e&label=release" alt="Latest release"></a>
  <a href="https://github.com/Soflutionltd/glintmotion/releases"><img src="https://img.shields.io/github/downloads/Soflutionltd/glintmotion/total?style=flat-square&labelColor=0b0c0e&color=06e3fa&label=downloads" alt="Downloads"></a>
  <img src="https://img.shields.io/badge/macOS-13%2B%20%C2%B7%20Apple%20Silicon-f3f4f6?style=flat-square&labelColor=0b0c0e&logo=apple&logoColor=f3f4f6" alt="macOS 13 or later, Apple Silicon">
  <img src="https://img.shields.io/badge/notarized-by%20Apple-f3f4f6?style=flat-square&labelColor=0b0c0e" alt="Notarized by Apple">
  <a href="#connect-your-agent"><img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FSoflutionltd%2Fglintmotion%2Fmain%2Fdata%2Fstats.json&query=%24.glintmotion.agentTools&suffix=%20tools&label=MCP&style=flat-square&labelColor=0b0c0e&color=4fdb5e" alt="MCP agent tools"></a>
  <a href="https://github.com/Soflutionltd/glintmotion-source"><img src="https://img.shields.io/badge/source-on%20GitHub-f3f4f6?style=flat-square&labelColor=0b0c0e&logo=github&logoColor=f3f4f6" alt="Source on GitHub"></a>
  <a href="https://github.com/Soflutionltd/glintmotion-effects"><img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FSoflutionltd%2Fglintmotion%2Fmain%2Fdata%2Fstats.json&query=%24.glintmotion.catalog&label=catalog&suffix=%20items&style=flat-square&labelColor=0b0c0e&color=4fdb5e" alt="Catalog items"></a>
</p>

<p align="center">
  <a href="https://github.com/Soflutionltd/glintmotion/releases/latest/download/Glintmotion-darwin-arm64.zip"><img src="assets/buttons/download.svg" height="56" alt="Download Glintmotion for macOS"></a>&nbsp;
  <a href="https://github.com/Soflutionltd/glintmotion-effects"><img src="assets/buttons/effects.svg" height="56" alt="Glintmotion Effects library"></a>&nbsp;
  <a href="https://github.com/Soflutionltd/glintmotion/releases/latest"><img src="assets/buttons/whats-new.svg" height="56" alt="What's new in the latest release"></a>
</p>

<p align="center"><b>English</b> · <a href="README.fr.md">Français</a></p>

<br>

Describe a video. Your agent writes it as HTML, you watch it move in the studio, fix it frame by frame, and export a video that matches the preview to the frame.

Glintmotion is a native macOS studio with a render engine tuned for Apple Silicon. Cursor, Claude Code or any MCP client connects to the app and works inside it: it opens your projects, writes scenes, scrubs the timeline, looks at frames, checks the motion and renders. You see every change as it happens, and you can undo the agent's whole turn in one step.

## Highlights

<table>
  <tr>
    <td width="33%" valign="top">
      <h3>Your agent, in the studio</h3>
      41 MCP tools to open, edit, seek, inspect, check and render. The agent works in the studio you are looking at, not in a hidden folder.
    </td>
    <td width="33%" valign="top">
      <h3>One-step undo</h3>
      Each agent turn is one entry in the project's history. Undo it whole, or see exactly what changed since your last edit.
    </td>
    <td width="33%" valign="top">
      <h3>Checks before export</h3>
      Lint, layout overlaps, text contrast, broken media, and a frame-by-frame motion check that flags animations that start late, stall or stutter.
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <h3>Effects library</h3>
      123 GL transitions and effects built on GSAP's SplitText, MorphSVG, DrawSVG, Physics2D and CustomWiggle. The agent finds and installs them for you.
    </td>
    <td width="33%" valign="top">
      <h3>Series</h3>
      One template, many versions through its variables. Compare them all on a single sheet, then export the whole series in one go.
    </td>
    <td width="33%" valign="top">
      <h3>App footage</h3>
      Film the iOS Simulator straight into a scene, cut to the scene's length, in the language you pick.
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <h3>Ready to post</h3>
      Reel and Post copies of any render: framed to the format, encoded in HEVC, audio mixed to −14 LUFS.
    </td>
    <td width="33%" valign="top">
      <h3>Nothing to install</h3>
      The engine, Chrome and an LGPL build of FFmpeg ship inside the signed app. No Node, no Homebrew, no browser download on first render.
    </td>
    <td width="33%" valign="top">
      <h3>Updates itself</h3>
      Updates download in the background. The app restarts when you take a break and reopens your project exactly where you were.
    </td>
  </tr>
</table>

## Speed

<p align="center">
  <img src="assets/stats/numbers.svg" width="100%" alt="Glintmotion by the numbers">
</p>

<!-- speed:start -->
<p align="center">
  <img src="assets/stats/speed.svg" width="100%" alt="Render time of four videos, Glintmotion against HyperFrames">
</p>

<p align="center">
  <img src="assets/stats/speed-curve.svg" width="100%" alt="Render time by video length">
</p>

| Video | Length | Glintmotion | HyperFrames | HyperFrames `--gpu` | Time saved |
| --- | ---: | ---: | ---: | ---: | ---: |
| logo-reel (1080×1920) | 40 s | **34.0 s** | 49.5 s | 48.9 s | **−31 %** (−30 % vs `--gpu`) |
| appstore-preview (886×1920) | 28.6 s | **18.5 s** | 23.1 s | 23.8 s | **−20 %** (−22 % vs `--gpu`) |
| social-reel (1080×1920) | 25 s | **19.3 s** | 29.1 s | 27.4 s | **−34 %** (−30 % vs `--gpu`) |
| social-reel-short (1080×1920) | 12.5 s | **11.2 s** | 16.0 s | 16.1 s | **−30 %** (−31 % vs `--gpu`) |
| 4 s of logo-reel (`--from 10 --to 14`) | 4 s | **9.8 s** | not possible: whole video | not possible: whole video | **−71 %** vs the whole video |

Quality: against HyperFrames' CPU encode (CRF 16), Glintmotion averages 46.1 dB PSNR, and HyperFrames `--gpu` 46.4 dB. Above 40 dB, the difference cannot be seen.

<sub>Measured on 2026-10-19 on an Apple M2 Max, 12 cores, 96 GB, macOS 27.0.1. Glintmotion with engine 0.8.174, HyperFrames 0.8.174 from npm. Same Chrome and same FFmpeg for every engine, default settings, plus HyperFrames a second time with `--gpu`. Three runs per engine, interleaved, median kept; five for the curve, which renders logo-reel cut to 10 s, 20 s, 30 s, 40 s. Script: [`bench-vs-hyperframes.mjs`](https://github.com/Soflutionltd/glintmotion-source/blob/main/scripts/bench-vs-hyperframes.mjs), raw timings: [`data/bench.json`](data/bench.json).</sub>
<!-- speed:end -->

## Glintmotion vs HyperFrames

How Glintmotion compares with HyperFrames, the open-source HTML-to-video renderer from HeyGen.

|                                   | **Glintmotion**                                                 | **HyperFrames** (open source)                                   |
| --------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| Render of logo-reel (40 s)        | **34.0 s**                                                     | 49.5 s (48.9 s with `--gpu`)                                  |
| GPU encoding                      | On by default                                                   | `--gpu` option                                                  |
| Render one passage only           | `--from` / `--to`, sound included                               | —                                                               |
| Where you work                    | Native macOS studio, signed and notarized                       | CLI and a browser Studio (`npx hyperframes preview`)¹           |
| Agent connection                  | Local MCP server with 41 tools, live in the studio              | Agent skills and the CLI; a hosted MCP from HeyGen²             |
| Undo an agent's whole turn        | ✅                                                              | —                                                               |
| Frame-by-frame motion check       | ✅                                                              | —                                                               |
| Lint, layout and contrast checks  | ✅                                                              | ✅                                                              |
| Catalog                           | Blocks and components **plus** the Glintmotion Effects library   | Blocks and components                                           |
| Template series and comparison    | ✅                                                              | Composition variables                                           |
| iOS Simulator takes               | ✅                                                              | —                                                               |
| Reel and Post delivery            | ✅                                                              | —                                                               |
| Node, Chrome and FFmpeg           | Bundled in the app                                              | Node.js 22+ and FFmpeg installed by you, Chrome downloaded      |
| Cloud rendering                   | —                                                               | ✅ AWS Lambda, HeyGen cloud                                      |
| Windows and Linux                 | —                                                               | ✅                                                              |
| Interface language                | French for now                                                  | English                                                         |
| Licence                           | [PolyForm Noncommercial](https://github.com/Soflutionltd/glintmotion-source/blob/main/LICENSE.md), source on GitHub | Apache 2.0                                       |
| Contributions                     | Welcome, see the [guide](https://github.com/Soflutionltd/glintmotion-source/blob/main/CONTRIBUTING.md) | Welcome                                       |

<sub>¹ HeyGen also ships a native HyperFrames app for Mac and Linux outside the open-source repository; this table compares Glintmotion with the open-source project. ² `mcp.heygen.com`, with a HeyGen account. The numbers above are refreshed every week from the GitHub API by <a href="scripts/assets.mjs"><code>scripts/assets.mjs</code></a>.</sub>

## Effects library

<p align="center">
  <a href="https://github.com/Soflutionltd/glintmotion-effects"><img src="assets/effects.webp" width="100%" alt="Five Glintmotion effects playing side by side"></a>
</p>

[Glintmotion Effects](https://github.com/Soflutionltd/glintmotion-effects) is a public catalog of effects and transitions. Ask your agent for one, or install it yourself with the `glintmotion` command (installed from **Connecter un agent**):

```bash
glintmotion add split-headline --registry https://raw.githubusercontent.com/Soflutionltd/glintmotion-effects/main
```

Every contribution is checked by a robot before review: no network access, no randomness or clock, an accepted licence, and a real render of the effect. The library is free for non-commercial use ([PolyForm Noncommercial](https://github.com/Soflutionltd/glintmotion-effects/blob/main/LICENSE.md)); third-party work keeps its own licence.

## Connect your agent

1. Open Glintmotion and click **Connecter un agent** (Connect an agent) at the bottom of the sidebar.
2. Copy the snippet for your agent. For Cursor, it goes in `~/.cursor/mcp.json` under `mcpServers`:

   ```json
   {
     "glintmotion": {
       "url": "http://127.0.0.1:47821/mcp",
       "headers": { "Authorization": "Bearer <the token shown in the app>" }
     }
   }
   ```

   For Claude Code, the app gives you a single `claude mcp add` command to paste in a terminal.
3. Ask for a video:

   > Make a 12-second vertical launch video for my app: a title that splits in by words, three feature cards, and a bell badge at the end. Check the motion, then export a Reel.

The server only listens on your Mac (`127.0.0.1`) and refuses requests without the app's token. The same panel installs the `glintmotion` command and the agent skills.

## Install

1. [Download `Glintmotion-darwin-arm64.zip`](https://github.com/Soflutionltd/glintmotion/releases/latest/download/Glintmotion-darwin-arm64.zip).
2. Unzip it and move **Glintmotion.app** to your Applications folder.
3. Open it. The app is signed and notarized by Apple, and it keeps itself up to date.

Requires a Mac with Apple Silicon and macOS 13 or later. Each release lists its SHA-256 checksum in the [release notes](https://github.com/Soflutionltd/glintmotion/releases).

## FAQ

<details>
<summary><b>Is the source public?</b></summary>
<br>
Yes, in <a href="https://github.com/Soflutionltd/glintmotion-source">glintmotion-source</a>: read it, build the app yourself, change it, and send pull requests. It is under <a href="https://github.com/Soflutionltd/glintmotion-source/blob/main/LICENSE.md">PolyForm Noncommercial</a>: personal and non-commercial use is free, commercial use needs a licence from Soflution Ltd (contact@soflution.com).
</details>

<details>
<summary><b>Can I contribute to the app?</b></summary>
<br>
Yes: bug fixes, speed, agent tools, the studio and translations of the interface are all welcome. Read the <a href="https://github.com/Soflutionltd/glintmotion-source/blob/main/CONTRIBUTING.md">contribution guide</a>, then open a pull request on glintmotion-source.
</details>

<details>
<summary><b>Which agents work with it?</b></summary>
<br>
Cursor and Claude Code, for which the app gives a ready-made configuration, and any other client that supports MCP over HTTP with an authorization header.
</details>

<details>
<summary><b>Can I use my own fonts, videos and music?</b></summary>
<br>
Yes. A composition is a folder of HTML and media files on your Mac. The agent can also compose a music bed with ElevenLabs, using your own ElevenLabs key.
</details>

<details>
<summary><b>How do I report a bug or ask for a feature?</b></summary>
<br>
Open an <a href="https://github.com/Soflutionltd/glintmotion/issues">issue</a> with your macOS version and the Glintmotion version from <b>À propos</b> (About).
</details>

<details>
<summary><b>Can I add an effect to the library?</b></summary>
<br>
Yes. Read the <a href="https://github.com/Soflutionltd/glintmotion-effects/blob/main/CONTRIBUTING.md">contribution guide</a>, then open a pull request on Glintmotion Effects.
</details>

## Credits

- [GSAP](https://gsap.com) by GreenSock, loaded by compositions from its CDN under the GSAP Standard "No Charge" licence.
- [GL Transitions](https://github.com/gl-transitions/gl-transitions) (MIT), the source of the shader transitions in the effects library.
- [Manrope](https://github.com/googlefonts/manrope) (SIL Open Font License), the typeface of this page.

The licences of the third-party code inside the app are listed in [LICENSE.md](https://github.com/Soflutionltd/glintmotion-source/blob/main/LICENSE.md).

The banner at the top is a Glintmotion composition: its source is in [`banner/`](banner/), rendered by the Glintmotion engine.

<br>

<p align="center">
  <img src="assets/logo.svg" width="56" alt="Glintmotion logo"><br>
  <sub>© 2026 Soflution Ltd</sub>
</p>
