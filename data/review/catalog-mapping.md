# 市场目录安装映射 / Catalog install mappings

由 `node scripts/catalog-mappings.mjs --min-stars 0 --write-report` 生成于 2026-11-26。

范围：市场目录中尚无安装映射、快照前 90 天内有 push、且满足本轮 `--min-stars` 优先级的仓库（`data/catalog-mapping-skips.json` 已裁决过的除外；星级不再作为资格门槛）。自动补充只接受「命令逐字来自 README」或「manifest 证明是本仓库插件」的条目：npm 包的 registry `repository` 必须指向本仓库；README 没有可复制命令时，以根 `package.json` / `cordis.patch.yml` 的 dsh 声明作为证据（npm 包存在则用包名，否则用仓库地址）。其余进入下方待裁决清单，供每日 AI 审核补齐；未裁决条目会逐日结转，不会因为下一批扫描而丢失。

- 本次扫描 / scanned: **0**
- 自动补充 / auto-applied: **0**（manifest 证据 0）
- 本轮新增待裁决 / new review: **0**
- 结转待裁决 / carried forward: **29**
- 待裁决总计 / total review: **29**

## 自动补充 / Auto-applied（0）

| 仓库 / Repo | ★ | 安装目标 / Targets | 证据 / Evidence |
| --- | ---: | --- | --- |
| — | — | — | — |

## 待裁决 / Needs review（29）

| 仓库 / Repo | ★ | 原因 / Why not automatic | README 提示 / Hint |
| --- | ---: | --- | --- |
| [ximizhou/convenient_window_free](https://github.com/ximizhou/convenient_window_free) | 200 | npm dsh-convenient-window declares no repository (authorship unproven); package.json declares no dsh bundle | dsh plugin --profile desktop add dsh-convenient-window@0.2.0-beta.3 --ignore-scripts --registry=https://registry.npmjs.org/ |
| [anweat/dsh-plugin-dev-guide](https://github.com/anweat/dsh-plugin-dev-guide) | 5 | no install command extracted; no package.json |  |
| [21hbguo/dsh-feishu-bridge-plugin](https://github.com/21hbguo/dsh-feishu-bridge-plugin) | 4 | no install command extracted; package.json declares no dsh bundle |  |
| [AllDurham/foreman-dsh](https://github.com/AllDurham/foreman-dsh) | 4 | no install command extracted; no package.json |  |
| [ciceroyang/dsh-plugin-starter](https://github.com/ciceroyang/dsh-plugin-starter) | 4 | no install command extracted; package.json declares no dsh bundle |  |
| [coderPerseus/dsh-hub](https://github.com/coderPerseus/dsh-hub) | 4 | no install command extracted; package.json declares no dsh bundle |  |
| [jerryxff26-alt/delivery-board](https://github.com/jerryxff26-alt/delivery-board) | 4 | no install command extracted; package.json declares no dsh bundle |  |
| [jonah791/dsh-agent-compact](https://github.com/jonah791/dsh-agent-compact) | 4 | no install command extracted; package.json declares no dsh bundle |  |
| [kelai141/dsh-host-web-compat](https://github.com/kelai141/dsh-host-web-compat) | 4 | no install command extracted; package.json declares no dsh bundle |  |
| [kirbylynx/dsh-hub](https://github.com/kirbylynx/dsh-hub) | 4 | no install command extracted; package.json declares no dsh bundle |  |
| [Lukeknow0/dsh-side-chat](https://github.com/Lukeknow0/dsh-side-chat) | 4 | no install command extracted; package.json declares no dsh bundle | dsh plugin --profile web add /absolute/path/lukeknow0-dsh-side-chat-1.0.0-rc.1.tgz |
| [MagicalYuYu/agent-operating-system](https://github.com/MagicalYuYu/agent-operating-system) | 4 | no install command extracted; no package.json |  |
| [Mikuzjc/dsh-office-for-mso](https://github.com/Mikuzjc/dsh-office-for-mso) | 4 | no install command extracted; package.json declares no dsh bundle |  |
| [niushuanan/dsh-chat-migration](https://github.com/niushuanan/dsh-chat-migration) | 4 | no install command extracted; no package.json |  |
| [QinLuza/dsh-aisketch](https://github.com/QinLuza/dsh-aisketch) | 4 | no install command extracted; package.json declares no dsh bundle | dsh plugin --profile &lt;profile&gt; add link:&lt;repo&gt;/packages/sketch-bundle |
| [slinxiaosun-blip/dsh-ai-passport-plugin](https://github.com/slinxiaosun-blip/dsh-ai-passport-plugin) | 4 | no install command extracted; package.json declares no dsh bundle |  |
| [WhichWitchWin/character-archives](https://github.com/WhichWitchWin/character-archives) | 4 | no install command extracted; package.json declares no dsh bundle |  |
| [wuliLiuyue/wxpilot](https://github.com/wuliLiuyue/wxpilot) | 4 | no install command extracted; package.json declares no dsh bundle | dsh plugin --profile demo add ./packages/dsh |
| [yanwenzong1-pixel/xinlan-dsh-plugin](https://github.com/yanwenzong1-pixel/xinlan-dsh-plugin) | 4 | no install command extracted; no package.json | dsh plugin --profile web add ./dsh-quick-append |
| [AaronKal-ECU/offline-ai-agent](https://github.com/AaronKal-ECU/offline-ai-agent) | 3 | no install command extracted; no package.json |  |
| [acus9345/dsh-guard-pack](https://github.com/acus9345/dsh-guard-pack) | 3 | no install command extracted; package.json declares no dsh bundle | dsh plugin --profile web add "$p" |
| [alexdoandev/jev-laya-dsh](https://github.com/alexdoandev/jev-laya-dsh) | 3 | no install command extracted; no package.json |  |
| [AntheaLaffy/dsh-plugin-tomato-todo](https://github.com/AntheaLaffy/dsh-plugin-tomato-todo) | 3 | no install command extracted; package.json declares no dsh bundle |  |
| [bagpipe1289/dsh-paperflight](https://github.com/bagpipe1289/dsh-paperflight) | 3 | no install command extracted; package.json declares no dsh bundle |  |
| [baiyun200/dsh-dashboard](https://github.com/baiyun200/dsh-dashboard) | 3 | no install command extracted; package.json declares no dsh bundle |  |
| [ciceroyang/dsh-trajectory](https://github.com/ciceroyang/dsh-trajectory) | 3 | no install command extracted; package.json declares no dsh bundle |  |
| [davidalmeida90/finance-agent-kit](https://github.com/davidalmeida90/finance-agent-kit) | 3 | no install command extracted; no package.json |  |
| [DEVbyQIN/dsh-plugin-kit](https://github.com/DEVbyQIN/dsh-plugin-kit) | 3 | no install command extracted; package.json declares no dsh bundle |  |
| [divisioncassini05-lab/find-nyaa-anime-release](https://github.com/divisioncassini05-lab/find-nyaa-anime-release) | 3 | no install command extracted; no package.json |  |

