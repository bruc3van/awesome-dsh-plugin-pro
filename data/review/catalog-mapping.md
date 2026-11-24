# 市场目录安装映射 / Catalog install mappings

由 `node scripts/catalog-mappings.mjs --min-stars 5 --apply --write-report` 生成于 2026-11-24。

范围：schema 3 市场目录中尚无安装映射、且 ≥ 该星级门槛的仓库（`data/catalog-mapping-skips.json` 已裁决过的除外）。自动补充只接受「命令逐字来自 README」或「manifest 证明是本仓库插件」的条目：npm 包的 registry `repository` 必须指向本仓库；README 没有可复制命令时，以根 `package.json` / `cordis.patch.yml` 的 dsh 声明作为证据（npm 包存在则用包名，否则用仓库地址）。其余进入下方待裁决清单，供每日 AI 审核补齐。

- 本次扫描 / scanned: **26**
- 自动补充 / auto-applied: **20**（manifest 证据 15）
- 待裁决 / needs review: **6**

## 自动补充 / Auto-applied（20）

| 仓库 / Repo | ★ | 安装目标 / Targets | 证据 / Evidence |
| --- | ---: | --- | --- |
| [Fanqi89/dsh-craft-anything](https://github.com/Fanqi89/dsh-craft-anything) | 441 | `github:Fanqi89/dsh-craft-anything` | README |
| [Nimbus318/dsh-niuma-broker](https://github.com/Nimbus318/dsh-niuma-broker) | 37 | `npm:dsh-niuma-broker`<br>`npm:dsh-niuma-broker` | README |
| [deemo0666/pallas-phone-control](https://github.com/deemo0666/pallas-phone-control) | 22 | `npm:pallas-phone-control` | manifest@package.json (npm repository match) |
| [CM-Silence/dsh-mo-image](https://github.com/CM-Silence/dsh-mo-image) | 20 | `npm:dsh-mo-image`<br>`github:CM-Silence/dsh-mo-image`<br>`npm:dsh-mo-image` | README |
| [Wasabi2575/dsh-workflow-canvas](https://github.com/Wasabi2575/dsh-workflow-canvas) | 19 | `npm:dsh-workflow-canvas` | manifest@package.json (npm repository match) |
| [ASER-ho/Loji-skill](https://github.com/ASER-ho/Loji-skill) | 13 | `github:ASER-ho/Loji-skill` | README |
| [liangdabiao/dsh-interactive-courseware](https://github.com/liangdabiao/dsh-interactive-courseware) | 8 | `github:liangdabiao/dsh-interactive-courseware` | manifest@package.json#dsh |
| [dtyg123/dsh-oh-my-token](https://github.com/dtyg123/dsh-oh-my-token) | 7 | `npm:dsh-oh-my-token` | README |
| [3418244301q-star/dsh-session-log-upload](https://github.com/3418244301q-star/dsh-session-log-upload) | 5 | `npm:dsh-session-log-upload` | manifest@package.json (npm repository match) |
| [bychance6600/dsh-perch](https://github.com/bychance6600/dsh-perch) | 5 | `npm:dsh-perch` | manifest@package.json (npm repository match) |
| [Destinhue/dsh-better-ears](https://github.com/Destinhue/dsh-better-ears) | 5 | `github:destinhue/dsh-better-ears` | manifest@package.json#dsh |
| [hzwym8912-code/dsh-everything-down](https://github.com/hzwym8912-code/dsh-everything-down) | 5 | `github:hzwym8912-code/dsh-everything-down` | manifest@package.json#dsh |
| [KUN-NNN/deepclear-ui](https://github.com/KUN-NNN/deepclear-ui) | 5 | `npm:deepclear-ui` | manifest@package.json (npm repository match) |
| [liaoyuqing/model-failover-manager](https://github.com/liaoyuqing/model-failover-manager) | 5 | `github:liaoyuqing/model-failover-manager` | manifest@package.json#dsh |
| [S0ra233/DSH-game-translate](https://github.com/S0ra233/DSH-game-translate) | 5 | `github:s0ra233/dsh-game-translate` | manifest@package.json#dsh |
| [sunx16963-design/dsh-web-search-thirdparty](https://github.com/sunx16963-design/dsh-web-search-thirdparty) | 5 | `github:sunx16963-design/dsh-web-search-thirdparty` | manifest@package.json#dsh |
| [vb2250158/dsh-waimai](https://github.com/vb2250158/dsh-waimai) | 5 | `github:vb2250158/dsh-waimai` | manifest@package.json#dsh |
| [wakeupnotfound/dsh-rsi](https://github.com/wakeupnotfound/dsh-rsi) | 5 | `github:wakeupnotfound/dsh-rsi` | manifest@package.json#dsh |
| [wjj865-code/dsh-orchestrator](https://github.com/wjj865-code/dsh-orchestrator) | 5 | `npm:@wjj865-code/dsh-orchestrator` | manifest@package.json (npm repository match) |
| [zeki520/dsh-boot-nexus](https://github.com/zeki520/dsh-boot-nexus) | 5 | `github:zeki520/dsh-boot-nexus` | manifest@package.json#dsh |

## 待裁决 / Needs review（6）

| 仓库 / Repo | ★ | 原因 / Why not automatic | README 提示 / Hint |
| --- | ---: | --- | --- |
| [lennney/stop-that-shit](https://github.com/lennney/stop-that-shit) | 4080 | no install command extracted; package.json declares no dsh bundle | dsh plugin --profile web add ./stop-that-shit-dsh-0.2.6.tgz |
| [hemu996/smart-ppt-designer](https://github.com/hemu996/smart-ppt-designer) | 31 | no install command extracted; package.json declares no dsh bundle |  |
| [daijiaoshou-ds/Accounting-Entry-Test](https://github.com/daijiaoshou-ds/Accounting-Entry-Test) | 18 | no install command extracted; no package.json |  |
| [bingshang04/history-axis](https://github.com/bingshang04/history-axis) | 5 | no install command extracted; package.json declares no dsh bundle | dsh plugin --profile desktop add link:"$PWD/ds-plugin" |
| [ccsert/dsh-subagent-hub](https://github.com/ccsert/dsh-subagent-hub) | 5 | no install command extracted; package.json declares no dsh bundle |  |
| [shuishuipingan/InkWeaver](https://github.com/shuishuipingan/InkWeaver) | 5 | no install command extracted; package.json declares no dsh bundle | dsh plugin --profile web add '&lt;path-to-inkweaver-dsh-tarball.tgz&gt;' |

