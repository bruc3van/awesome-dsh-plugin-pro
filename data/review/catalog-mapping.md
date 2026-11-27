# 市场目录安装映射 / Catalog install mappings

由 `node scripts/catalog-mappings.mjs --min-stars 0 --write-report` 生成于 2026-11-27。

范围：市场目录中尚无安装映射、快照前 90 天内有 push、且满足本轮 `--min-stars` 优先级的仓库（`data/catalog-mapping-skips.json` 已裁决过的除外；星级不再作为资格门槛）。自动补充只接受「命令逐字来自 README」或「manifest 证明是本仓库插件」的条目：npm 包的 registry `repository` 必须指向本仓库；README 没有可复制命令时，以根 `package.json` / `cordis.patch.yml` 的 dsh 声明作为证据（npm 包存在则用包名，否则用仓库地址）。其余进入下方待裁决清单，供每日 AI 审核补齐；未裁决条目会逐日结转，不会因为下一批扫描而丢失。

- 本次扫描 / scanned: **0**
- 自动补充 / auto-applied: **0**（manifest 证据 0）
- 本轮新增待裁决 / new review: **0**
- 结转待裁决 / carried forward: **18**
- 待裁决总计 / total review: **18**

## 自动补充 / Auto-applied（0）

| 仓库 / Repo | ★ | 安装目标 / Targets | 证据 / Evidence |
| --- | ---: | --- | --- |
| — | — | — | — |

## 待裁决 / Needs review（18）

| 仓库 / Repo | ★ | 原因 / Why not automatic | README 提示 / Hint |
| --- | ---: | --- | --- |
| [tyr1105/dsh-buddy](https://github.com/tyr1105/dsh-buddy) | 4 | no install command extracted; package.json declares no dsh bundle |  |
| [ygc06/fishpet-release](https://github.com/ygc06/fishpet-release) | 4 | no install command extracted; no package.json |  |
| [ffdnm/ClashTUNWithDSH](https://github.com/ffdnm/ClashTUNWithDSH) | 3 | no install command extracted; no package.json |  |
| [fotor-ai/fotor-agent-plugins](https://github.com/fotor-ai/fotor-agent-plugins) | 3 | no install command extracted; package.json declares no dsh bundle | dsh plugin --profile web add "git+https://github.com/fotor-ai/dsh-fotor-plugin.git" --ignore-scripts |
| [Fz2hOpenSource/firmware-forge](https://github.com/Fz2hOpenSource/firmware-forge) | 3 | no install command extracted; no package.json |  |
| [gulagala001/dsh-trisoul](https://github.com/gulagala001/dsh-trisoul) | 3 | no install command extracted; package.json declares no dsh bundle |  |
| [kelai141/dsh-shell-termux](https://github.com/kelai141/dsh-shell-termux) | 3 | no install command extracted; package.json declares no dsh bundle |  |
| [kestiny18/dsh-plugins](https://github.com/kestiny18/dsh-plugins) | 3 | no install command extracted; package.json declares no dsh bundle |  |
| [leolee9086/SAC_search](https://github.com/leolee9086/SAC_search) | 3 | no install command extracted; no package.json |  |
| [lishize20040802-rgb/useful-dsh-plugins](https://github.com/lishize20040802-rgb/useful-dsh-plugins) | 3 | no install command extracted; package.json declares no dsh bundle | dsh plugin --profile web add ./dsh-plugin-voice-input-0.3.0.tgz |
| [lovaxi/Rubato_Plugins](https://github.com/lovaxi/Rubato_Plugins) | 3 | no install command extracted; no package.json |  |
| [malinovme/dsh-unica](https://github.com/malinovme/dsh-unica) | 3 | no install command extracted; no package.json |  |
| [MkaliezZ/dsh-agentfuse-plugin](https://github.com/MkaliezZ/dsh-agentfuse-plugin) | 3 | no install command extracted; package.json declares no dsh bundle |  |
| [Murphy2000-cyk/dsh-skill-plugin-tuning](https://github.com/Murphy2000-cyk/dsh-skill-plugin-tuning) | 3 | no install command extracted; no package.json |  |
| [NIyueeE/dsh-container](https://github.com/NIyueeE/dsh-container) | 3 | no install command extracted; no package.json |  |
| [nyantused-cpun/folio](https://github.com/nyantused-cpun/folio) | 3 | no install command extracted; no package.json | dsh plugin --profile web add @nyantused/folio-dsh-tools |
| [ooooooomygosh/paper-research-coach](https://github.com/ooooooomygosh/paper-research-coach) | 3 | no install command extracted; no package.json |  |
| [QiuXu-Tech/memex](https://github.com/QiuXu-Tech/memex) | 3 | no install command extracted; package.json declares no dsh bundle |  |

