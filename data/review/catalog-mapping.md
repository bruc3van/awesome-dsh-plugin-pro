# 市场目录安装映射 / Catalog install mappings

由 `node scripts/catalog-mappings.mjs --min-stars 0 --write-report` 生成于 2026-11-26。

范围：市场目录中尚无安装映射、快照前 90 天内有 push、且满足本轮 `--min-stars` 优先级的仓库（`data/catalog-mapping-skips.json` 已裁决过的除外；星级不再作为资格门槛）。自动补充只接受「命令逐字来自 README」或「manifest 证明是本仓库插件」的条目：npm 包的 registry `repository` 必须指向本仓库；README 没有可复制命令时，以根 `package.json` / `cordis.patch.yml` 的 dsh 声明作为证据（npm 包存在则用包名，否则用仓库地址）。其余进入下方待裁决清单，供每日 AI 审核补齐；未裁决条目会逐日结转，不会因为下一批扫描而丢失。

- 本次扫描 / scanned: **0**
- 自动补充 / auto-applied: **0**（manifest 证据 0）
- 本轮新增待裁决 / new review: **0**
- 结转待裁决 / carried forward: **0**
- 待裁决总计 / total review: **0**

## 自动补充 / Auto-applied（0）

| 仓库 / Repo | ★ | 安装目标 / Targets | 证据 / Evidence |
| --- | ---: | --- | --- |
| — | — | — | — |

## 待裁决 / Needs review（0）

| 仓库 / Repo | ★ | 原因 / Why not automatic | README 提示 / Hint |
| --- | ---: | --- | --- |
| — | — | — | — |

