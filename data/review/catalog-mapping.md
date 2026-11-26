# 市场目录安装映射 / Catalog install mappings

由 `node scripts/catalog-mappings.mjs --min-stars 5 --apply --write-report` 生成于 2026-11-25。

范围：schema 3 市场目录中尚无安装映射、且 ≥ 该星级门槛的仓库（`data/catalog-mapping-skips.json` 已裁决过的除外）。自动补充只接受「命令逐字来自 README」或「manifest 证明是本仓库插件」的条目：npm 包的 registry `repository` 必须指向本仓库；README 没有可复制命令时，以根 `package.json` / `cordis.patch.yml` 的 dsh 声明作为证据（npm 包存在则用包名，否则用仓库地址）。其余进入下方待裁决清单，供每日 AI 审核补齐。

- 本次扫描 / scanned: **18**
- 自动补充 / auto-applied: **14**（manifest 证据 11）
- 待裁决 / needs review: **4**

## 自动补充 / Auto-applied（14）

| 仓库 / Repo | ★ | 安装目标 / Targets | 证据 / Evidence |
| --- | ---: | --- | --- |
| [yb-zhai/agent-memory](https://github.com/yb-zhai/agent-memory) | 54 | `github:yb-zhai/agent-memory` | README |
| [renjiegod/dsh-godbot](https://github.com/renjiegod/dsh-godbot) | 21 | `github:renjiegod/dsh-godbot` | manifest@package.json#dsh |
| [zman406986/Agent-Memory-CREMATOR](https://github.com/zman406986/Agent-Memory-CREMATOR) | 13 | `npm:cremator-dsh` | manifest@package.json (npm repository match) |
| [2019wakeup/dsh-reader](https://github.com/2019wakeup/dsh-reader) | 11 | `npm:@2019wakeup/dsh-reader@latest` | README |
| [gcggcg/dsh-plugin-dingtalk-bridge](https://github.com/gcggcg/dsh-plugin-dingtalk-bridge) | 6 | `npm:dsh-plugin-dingtalk-bridge` | manifest@package.json (npm repository match) |
| [gcggcg/dsh-plugin-wechat-dingtalk](https://github.com/gcggcg/dsh-plugin-wechat-dingtalk) | 6 | `npm:dsh-plugin-wechat-dingtalk-bridge` | manifest@package.json (npm repository match) |
| [aiohow/dsh-prompt-wall](https://github.com/aiohow/dsh-prompt-wall) | 5 | `npm:dsh-prompt-wall` | manifest@package.json (npm repository match) |
| [alexbu512/milancat-bot](https://github.com/alexbu512/milancat-bot) | 5 | `github:alexbu512/milancat-bot` | manifest@package.json#dsh |
| [drscrewdriver/dsh-patch-edit-plus](https://github.com/drscrewdriver/dsh-patch-edit-plus) | 5 | `npm:dsh-patch-edit-plus` | manifest@package.json (npm repository match) |
| [hentai-joshu/dsh-narration-policy](https://github.com/hentai-joshu/dsh-narration-policy) | 5 | `github:hentai-joshu/dsh-narration-policy` | manifest@package.json#dsh |
| [monkeyin92/ds-pstack](https://github.com/monkeyin92/ds-pstack) | 5 | `github:monkeyin92/ds-pstack` | manifest@package.json#dsh |
| [OrphBladean/dsh-nahida-theme](https://github.com/OrphBladean/dsh-nahida-theme) | 5 | `npm:dsh-nahida-theme`<br>`github:OrphBladean/dsh-nahida-theme` | README |
| [pugyy/dxkjailbreak](https://github.com/pugyy/dxkjailbreak) | 5 | `github:pugyy/dxkjailbreak` | manifest@package.json#dsh |
| [ZelyStaric/dsh-council](https://github.com/ZelyStaric/dsh-council) | 5 | `github:zelystaric/dsh-council` | manifest@package.json#dsh |

## 待裁决 / Needs review（4）

| 仓库 / Repo | ★ | 原因 / Why not automatic | README 提示 / Hint |
| --- | ---: | --- | --- |
| [ximizhou/convenient_window_free](https://github.com/ximizhou/convenient_window_free) | 200 | npm dsh-convenient-window declares no repository (authorship unproven); package.json declares no dsh bundle | dsh plugin --profile desktop add dsh-convenient-window@0.2.0-beta.3 --ignore-scripts --registry=https://registry.npmjs.org/ |
| [weiwenhao/dudu](https://github.com/weiwenhao/dudu) | 13 | no install command extracted; package.json declares no dsh bundle |  |
| [linhuanwen/dsh-plugin-agent-browser](https://github.com/linhuanwen/dsh-plugin-agent-browser) | 7 | no install command extracted; no package.json |  |
| [anweat/dsh-plugin-dev-guide](https://github.com/anweat/dsh-plugin-dev-guide) | 5 | no install command extracted; no package.json |  |

