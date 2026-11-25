# 市场目录安装映射 / Catalog install mappings

由 `node scripts/catalog-mappings.mjs --min-stars 5 --apply --write-report` 生成于 2026-11-25。

范围：schema 3 市场目录中尚无安装映射、且 ≥ 该星级门槛的仓库（`data/catalog-mapping-skips.json` 已裁决过的除外）。自动补充只接受「命令逐字来自 README」或「manifest 证明是本仓库插件」的条目：npm 包的 registry `repository` 必须指向本仓库；README 没有可复制命令时，以根 `package.json` / `cordis.patch.yml` 的 dsh 声明作为证据（npm 包存在则用包名，否则用仓库地址）。其余进入下方待裁决清单，供每日 AI 审核补齐。

- 本次扫描 / scanned: **4**
- 自动补充 / auto-applied: **0**（manifest 证据 0）
- 待裁决 / needs review: **4**

## 自动补充 / Auto-applied（0）

| 仓库 / Repo | ★ | 安装目标 / Targets | 证据 / Evidence |
| --- | ---: | --- | --- |
| — | — | — | — |

## 待裁决 / Needs review（4）

| 仓库 / Repo | ★ | 原因 / Why not automatic | README 提示 / Hint |
| --- | ---: | --- | --- |
| [lennney/stop-that-shit](https://github.com/lennney/stop-that-shit) | 4080 | no install command extracted; package.json declares no dsh bundle | dsh plugin --profile web add ./stop-that-shit-dsh-0.2.6.tgz |
| [daijiaoshou-ds/Accounting-Entry-Test](https://github.com/daijiaoshou-ds/Accounting-Entry-Test) | 18 | no install command extracted; no package.json |  |
| [bingshang04/history-axis](https://github.com/bingshang04/history-axis) | 5 | no install command extracted; package.json declares no dsh bundle | dsh plugin --profile desktop add link:"$PWD/ds-plugin" |
| [shuishuipingan/InkWeaver](https://github.com/shuishuipingan/InkWeaver) | 5 | no install command extracted; package.json declares no dsh bundle | dsh plugin --profile web add '&lt;path-to-inkweaver-dsh-tarball.tgz&gt;' |

