<p align="center">
  <a href="https://github.com/Soflutionltd/glintmotion/releases/latest">
    <img src="assets/banner.webp" alt="Glintmotion : le studio de motion design que ton agent IA pilote" width="100%">
  </a>
</p>

<p align="center">
  <a href="https://github.com/Soflutionltd/glintmotion/releases/latest"><img src="https://img.shields.io/github/v/release/Soflutionltd/glintmotion?style=flat-square&labelColor=0b0c0e&color=4fdb5e&label=version" alt="Dernière version"></a>
  <a href="https://github.com/Soflutionltd/glintmotion/releases"><img src="https://img.shields.io/github/downloads/Soflutionltd/glintmotion/total?style=flat-square&labelColor=0b0c0e&color=06e3fa&label=t%C3%A9l%C3%A9chargements" alt="Téléchargements"></a>
  <img src="https://img.shields.io/badge/macOS-13%2B%20%C2%B7%20Apple%20Silicon-f3f4f6?style=flat-square&labelColor=0b0c0e&logo=apple&logoColor=f3f4f6" alt="macOS 13 ou plus récent, Apple Silicon">
  <img src="https://img.shields.io/badge/notaris%C3%A9e-par%20Apple-f3f4f6?style=flat-square&labelColor=0b0c0e" alt="Notarisée par Apple">
  <a href="#connecter-ton-agent"><img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FSoflutionltd%2Fglintmotion%2Fmain%2Fdata%2Fstats.json&query=%24.glintmotion.agentTools&suffix=%20outils&label=MCP&style=flat-square&labelColor=0b0c0e&color=4fdb5e" alt="Outils d'agent MCP"></a>
  <a href="https://github.com/heygen-com/hyperframes"><img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FSoflutionltd%2Fglintmotion%2Fmain%2Fdata%2Fstats.json&query=%24.glintmotion.engine&prefix=v&label=moteur%20HyperFrames&style=flat-square&labelColor=0b0c0e&color=06e3fa" alt="Version du moteur HyperFrames"></a>
  <a href="https://github.com/Soflutionltd/glintmotion-effects"><img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2FSoflutionltd%2Fglintmotion%2Fmain%2Fdata%2Fstats.json&query=%24.glintmotion.catalog&label=catalogue&suffix=%20%C3%A9l%C3%A9ments&style=flat-square&labelColor=0b0c0e&color=4fdb5e" alt="Éléments du catalogue"></a>
</p>

<p align="center">
  <a href="https://github.com/Soflutionltd/glintmotion/releases/latest/download/Glintmotion-darwin-arm64.zip"><img src="assets/buttons/download.svg" height="56" alt="Télécharger Glintmotion pour macOS"></a>&nbsp;
  <a href="https://github.com/Soflutionltd/glintmotion-effects"><img src="assets/buttons/effects.svg" height="56" alt="Bibliothèque Glintmotion Effects"></a>&nbsp;
  <a href="https://github.com/Soflutionltd/glintmotion/releases/latest"><img src="assets/buttons/whats-new.svg" height="56" alt="Nouveautés de la dernière version"></a>
</p>

<p align="center"><a href="README.md">English</a> · <b>Français</b></p>

<br>

Tu décris une vidéo. Ton agent l'écrit en HTML, tu la regardes bouger dans le studio, tu la corriges image par image, et tu exportes une vidéo identique à l'aperçu, à l'image près.

Glintmotion est un studio macOS natif construit sur le moteur [HyperFrames](https://github.com/heygen-com/hyperframes). Cursor, Claude Code ou n'importe quel client MCP se connecte à l'app et travaille dedans : il ouvre tes projets, écrit les scènes, parcourt la timeline, regarde les images, vérifie le mouvement et lance le rendu. Tu vois chaque changement en direct, et tu peux annuler tout le tour de l'agent en une fois.

## Points forts

<table>
  <tr>
    <td width="33%" valign="top">
      <h3>Ton agent, dans le studio</h3>
      41 outils MCP pour ouvrir, modifier, se déplacer, inspecter, vérifier et rendre. L'agent travaille dans le studio que tu regardes, pas dans un dossier caché.
    </td>
    <td width="33%" valign="top">
      <h3>Annuler en une fois</h3>
      Chaque tour de l'agent est une seule entrée de l'historique du projet. Tu l'annules en entier, ou tu vois exactement ce qui a changé depuis ta dernière modification.
    </td>
    <td width="33%" valign="top">
      <h3>Vérifié avant l'export</h3>
      Lint, chevauchements, contraste du texte, médias cassés, et une vérification du mouvement image par image qui repère les animations qui démarrent en retard, calent ou saccadent.
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <h3>Bibliothèque d'effets</h3>
      123 transitions GL et des effets construits sur SplitText, MorphSVG, DrawSVG, Physics2D et CustomWiggle de GSAP. L'agent les trouve et les installe pour toi.
    </td>
    <td width="33%" valign="top">
      <h3>Séries</h3>
      Un modèle, plusieurs versions grâce à ses variables. Tu les compares toutes sur une seule planche, puis tu exportes la série d'un coup.
    </td>
    <td width="33%" valign="top">
      <h3>Images de ton app</h3>
      Filme le simulateur iOS directement dans une scène, coupé à la durée de la scène, dans la langue que tu choisis.
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <h3>Prêt à publier</h3>
      Des copies Reel et Post de n'importe quel rendu : cadrées au format, encodées en HEVC, son mixé à −14 LUFS.
    </td>
    <td width="33%" valign="top">
      <h3>Rien à installer</h3>
      Le moteur, Chrome et une version LGPL de FFmpeg sont dans l'app signée. Ni Node, ni Homebrew, ni navigateur à télécharger au premier rendu.
    </td>
    <td width="33%" valign="top">
      <h3>Se met à jour seule</h3>
      Les mises à jour se téléchargent en arrière-plan. L'app redémarre quand tu fais une pause et rouvre ton projet exactement où tu en étais.
    </td>
  </tr>
</table>

## Glintmotion face à HyperFrames

Glintmotion fait tourner le moteur HyperFrames et intègre chaque nouvelle version : une composition se rend de la même façon dans les deux, image pour image. La différence, c'est tout ce qu'il y a autour du moteur.

<p align="center">
  <img src="assets/stats/numbers.svg" width="100%" alt="Glintmotion en chiffres">
</p>

|                                        | **Glintmotion**                                                   | **HyperFrames** (open source)                                        |
| -------------------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| Moteur de rendu                        | HyperFrames, intégré à chaque version                             | HyperFrames                                                          |
| Où tu travailles                       | Studio macOS natif, signé et notarisé                             | CLI et Studio dans le navigateur (`npx hyperframes preview`)¹        |
| Connexion de l'agent                   | Serveur MCP local, 41 outils, en direct dans le studio            | Compétences d'agent et CLI ; un MCP hébergé par HeyGen²              |
| Annuler tout un tour de l'agent        | ✅                                                                | —                                                                    |
| Vérification du mouvement image par image | ✅                                                             | —                                                                    |
| Lint, mise en page et contraste        | ✅                                                                | ✅                                                                   |
| Catalogue                              | Catalogue HyperFrames **plus** la bibliothèque Glintmotion Effects | Catalogue HyperFrames                                                |
| Séries de modèles et comparaison       | ✅                                                                | Variables de composition                                             |
| Prises du simulateur iOS               | ✅                                                                | —                                                                    |
| Export Reel et Post                    | ✅                                                                | —                                                                    |
| Node, Chrome et FFmpeg                 | Inclus dans l'app                                                 | Node.js 22+ et FFmpeg à installer, Chrome téléchargé                 |
| Rendu dans le cloud                    | —                                                                 | ✅ AWS Lambda, cloud HeyGen                                           |
| Windows et Linux                       | —                                                                 | ✅                                                                   |
| Langue de l'interface                  | Français pour l'instant                                           | Anglais                                                              |
| Licence                                | App propriétaire                                                  | Apache 2.0                                                           |

<sub>¹ HeyGen propose aussi une app HyperFrames native pour Mac et Linux, en dehors du dépôt open source ; ce tableau compare Glintmotion au projet open source. ² `mcp.heygen.com`, avec un compte HeyGen. Les chiffres ci-dessus sont mis à jour chaque semaine depuis l'API GitHub par <a href="scripts/assets.mjs"><code>scripts/assets.mjs</code></a>.</sub>

## Bibliothèque d'effets

<p align="center">
  <a href="https://github.com/Soflutionltd/glintmotion-effects"><img src="assets/effects.webp" width="100%" alt="Cinq effets Glintmotion qui jouent côte à côte"></a>
</p>

[Glintmotion Effects](https://github.com/Soflutionltd/glintmotion-effects) est un catalogue public qui marche dans Glintmotion comme avec la CLI HyperFrames seule. Demande un effet à ton agent, ou installe-le toi-même :

```bash
npx hyperframes add split-headline --registry https://raw.githubusercontent.com/Soflutionltd/glintmotion-effects/main
```

Chaque contribution passe par un robot avant la relecture : pas d'accès au réseau, ni hasard ni horloge, une licence acceptée, et un vrai rendu de l'effet. La bibliothèque est gratuite pour un usage non commercial ([PolyForm Noncommercial](https://github.com/Soflutionltd/glintmotion-effects/blob/main/LICENSE.md)) ; les œuvres de tiers gardent leur propre licence.

## Connecter ton agent

1. Ouvre Glintmotion et clique sur **Connecter un agent**, en bas de la barre latérale.
2. Copie la configuration de ton agent. Pour Cursor, elle va dans `~/.cursor/mcp.json`, sous `mcpServers` :

   ```json
   {
     "glintmotion": {
       "url": "http://127.0.0.1:47821/mcp",
       "headers": { "Authorization": "Bearer <le jeton affiché dans l'app>" }
     }
   }
   ```

   Pour Claude Code, l'app te donne une seule commande `claude mcp add` à coller dans un terminal.
3. Demande une vidéo :

   > Fais une vidéo verticale de 12 secondes pour lancer mon app : un titre qui arrive mot par mot, trois cartes de fonctionnalités, et une pastille de cloche à la fin. Vérifie le mouvement, puis exporte un Reel.

Le serveur n'écoute que sur ton Mac (`127.0.0.1`) et refuse toute requête sans le jeton de l'app. Le même panneau installe la commande `glintmotion` et les compétences de l'agent.

## Installation

1. [Télécharge `Glintmotion-darwin-arm64.zip`](https://github.com/Soflutionltd/glintmotion/releases/latest/download/Glintmotion-darwin-arm64.zip).
2. Décompresse-le et glisse **Glintmotion.app** dans le dossier Applications.
3. Ouvre-la. L'app est signée et notarisée par Apple, et se tient à jour toute seule.

Il faut un Mac Apple Silicon sous macOS 13 ou plus récent. Chaque version donne son empreinte SHA-256 dans les [notes de version](https://github.com/Soflutionltd/glintmotion/releases).

## Questions fréquentes

<details>
<summary><b>Glintmotion est-il un fork de HyperFrames ?</b></summary>
<br>
Il embarque le moteur et la CLI HyperFrames, intégrés depuis le projet d'origine à chaque version, et ajoute autour l'app macOS, les outils de l'agent, la vérification du mouvement, les séries, les prises du simulateur et l'export. Tes compositions HyperFrames s'ouvrent telles quelles dans Glintmotion.
</details>

<details>
<summary><b>Quels agents fonctionnent avec ?</b></summary>
<br>
Cursor et Claude Code, pour lesquels l'app donne une configuration toute prête, et tout autre client qui gère MCP en HTTP avec un en-tête d'autorisation.
</details>

<details>
<summary><b>Je peux utiliser mes polices, mes vidéos et ma musique ?</b></summary>
<br>
Oui. Une composition est un dossier de fichiers HTML et de médias sur ton Mac. L'agent peut aussi composer une musique avec ElevenLabs, avec ta propre clé ElevenLabs.
</details>

<details>
<summary><b>Comment signaler un bug ou proposer une idée ?</b></summary>
<br>
Ouvre une <a href="https://github.com/Soflutionltd/glintmotion/issues">issue</a> avec ta version de macOS et la version de Glintmotion indiquée dans <b>À propos</b>.
</details>

<details>
<summary><b>Je peux ajouter un effet à la bibliothèque ?</b></summary>
<br>
Oui. Lis le <a href="https://github.com/Soflutionltd/glintmotion-effects/blob/main/CONTRIBUTING.md">guide de contribution</a>, puis ouvre une pull request sur Glintmotion Effects.
</details>

## Crédits

- [HyperFrames](https://github.com/heygen-com/hyperframes) de HeyGen (Apache 2.0) : le moteur de rendu et la CLI qui tournent dans Glintmotion. Glintmotion n'existerait pas sans lui.
- [GSAP](https://gsap.com) de GreenSock, chargé par les compositions depuis son CDN, sous la licence GSAP Standard « No Charge ».
- [GL Transitions](https://github.com/gl-transitions/gl-transitions) (MIT), d'où viennent les transitions shader de la bibliothèque d'effets.
- [Manrope](https://github.com/googlefonts/manrope) (SIL Open Font License), la police de cette page.

La bannière en haut est une composition Glintmotion : sa source est dans [`banner/`](banner/), rendue par le moteur de Glintmotion.

<br>

<p align="center">
  <img src="assets/logo.svg" width="56" alt="Logo Glintmotion"><br>
  <sub>© 2026 Soflution Ltd</sub>
</p>
