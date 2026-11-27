# 市场目录安装映射 / Catalog install mappings

由 `node scripts/catalog-mappings.mjs --min-stars 0 --write-report` 生成于 2026-11-27。

范围：市场目录中尚无安装映射、快照前 90 天内有 push、且满足本轮 `--min-stars` 优先级的仓库（`data/catalog-mapping-skips.json` 已裁决过的除外；星级不再作为资格门槛）。自动补充只接受「命令逐字来自 README」或「manifest 证明是本仓库插件」的条目：npm 包的 registry `repository` 必须指向本仓库；README 没有可复制命令时，以根 `package.json` / `cordis.patch.yml` 的 dsh 声明作为证据（npm 包存在则用包名，否则用仓库地址）。其余进入下方待裁决清单，供每日 AI 审核补齐；未裁决条目会逐日结转，不会因为下一批扫描而丢失。

- 本次扫描 / scanned: **0**
- 自动补充 / auto-applied: **0**（manifest 证据 0）
- 本轮新增待裁决 / new review: **0**
- 结转待裁决 / carried forward: **28**
- 待裁决总计 / total review: **28**

## 自动补充 / Auto-applied（0）

| 仓库 / Repo | ★ | 安装目标 / Targets | 证据 / Evidence |
| --- | ---: | --- | --- |
| — | — | — | — |

## 待裁决 / Needs review（28）

| 仓库 / Repo | ★ | 原因 / Why not automatic | README 提示 / Hint |
| --- | ---: | --- | --- |
| [nexu-io/opengame](https://github.com/nexu-io/opengame) | 2197 | no install command extracted; package.json declares no dsh bundle |  |
| [Yaemikoreal/BilibiliPlayer](https://github.com/Yaemikoreal/BilibiliPlayer) | 4 | no install command extracted; no package.json | dsh plugin --profile desktop add link:&lt;项目路径&gt;/dsh-plugin |
| [AntheaLaffy/tomato-todo](https://github.com/AntheaLaffy/tomato-todo) | 3 | no install command extracted; package.json declares no dsh bundle |  |
| [ShawnRen57/omni-learning-anything](https://github.com/ShawnRen57/omni-learning-anything) | 3 | no install command extracted; no package.json |  |
| [soyoungzsy/soya-workflows](https://github.com/soyoungzsy/soya-workflows) | 3 | no install command extracted; no package.json |  |
| [whiteguo233/dsh-cc-connect](https://github.com/whiteguo233/dsh-cc-connect) | 3 | no install command extracted; package.json declares no dsh bundle | dsh plugin --profile web add git+ssh://git@github.com:dsh-external/dsh-cc-connect.git |
| [YeStarOne/feiyuos-memory-graph](https://github.com/YeStarOne/feiyuos-memory-graph) | 3 | no install command extracted; package.json declares no dsh bundle |  |
| [01float01/dsh-remote](https://github.com/01float01/dsh-remote) | 2 | no install command extracted; package.json declares no dsh bundle |  |
| [AFAP/plugin-bastion-bridge-qizhi](https://github.com/AFAP/plugin-bastion-bridge-qizhi) | 2 | no install command extracted; no package.json |  |
| [ahn66/dsh-usage-lens](https://github.com/ahn66/dsh-usage-lens) | 2 | no install command extracted; no package.json |  |
| [aik8s/cubesandbox-agent-adapter](https://github.com/aik8s/cubesandbox-agent-adapter) | 2 | no install command extracted; no package.json |  |
| [Azek431/dsh-termux-bridge](https://github.com/Azek431/dsh-termux-bridge) | 2 | no install command extracted; no package.json |  |
| [BarneyZhaoooo/dsh-theme-native](https://github.com/BarneyZhaoooo/dsh-theme-native) | 2 | no install command extracted; no package.json |  |
| [Bluebagbag/dsh-wordbook](https://github.com/Bluebagbag/dsh-wordbook) | 2 | no install command extracted; package.json declares no dsh bundle |  |
| [brickhu/dsh-plugins](https://github.com/brickhu/dsh-plugins) | 2 | no install command extracted; no package.json |  |
| [cangwu-ai/dsh-easyremote](https://github.com/cangwu-ai/dsh-easyremote) | 2 | no install command extracted; package.json declares no dsh bundle |  |
| [casualjim/dsh-plugins](https://github.com/casualjim/dsh-plugins) | 2 | no install command extracted; package.json declares no dsh bundle | dsh plugin --profile web add &lt;path-or-package&gt; |
| [chicochol/dsh-holopet](https://github.com/chicochol/dsh-holopet) | 2 | no install command extracted; no package.json |  |
| [ciceroyang/dsh-doctor](https://github.com/ciceroyang/dsh-doctor) | 2 | no install command extracted; package.json declares no dsh bundle | dsh plugin add seems to work: will this package actually show up in the web UI? Nothing is installed or written. |
| [cloudbywu/dshchem](https://github.com/cloudbywu/dshchem) | 2 | no install command extracted; no package.json | dsh plugin --profile web add link:...dsh-chem-core （profile package.json 已含 bundle） |
| [cmukanisa/dsh-remote-ssh](https://github.com/cmukanisa/dsh-remote-ssh) | 2 | no install command extracted; package.json declares no dsh bundle |  |
| [daboge-beach/dsh-skin-studio](https://github.com/daboge-beach/dsh-skin-studio) | 2 | no install command extracted; package.json declares no dsh bundle |  |
| [dcsnkj/dsh-agent-sync](https://github.com/dcsnkj/dsh-agent-sync) | 2 | no install command extracted; package.json declares no dsh bundle |  |
| [deepsleepAquarium/dsh-whale-post](https://github.com/deepsleepAquarium/dsh-whale-post) | 2 | no install command extracted; package.json declares no dsh bundle | dsh plugin --profile &lt;profile&gt; add link:/abs/path/to/dsh-whale-post |
| [devockr/idsh](https://github.com/devockr/idsh) | 2 | no install command extracted; package.json declares no dsh bundle |  |
| [Esper967/dsh-music-insight](https://github.com/Esper967/dsh-music-insight) | 2 | no install command extracted; no package.json | dsh plugin --profile &lt;你的 profile 名&gt; add &lt;本仓库路径&gt;/dsh-plugin |
| [Francesco149/dsh-deep-research](https://github.com/Francesco149/dsh-deep-research) | 2 | no install command extracted; no package.json |  |
| [genesis-agents/dsh-plugins](https://github.com/genesis-agents/dsh-plugins) | 2 | no install command extracted; no package.json | dsh plugin add github:... would otherwise receive a package that cannot load. |

