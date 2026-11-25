# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-11-25**
- 快照日期 / Snapshot date: **2026-11-25 (UTC)**
- 待审核 / Pending: **348**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **44**
- Star 异常增长 / Star-growth alerts: **7** — 先看下方告警节 / see the alert section first
- 改名/身份待复核 / Renames pending review: **36**

审核决定记到数据文件后运行 `node scripts/merge.mjs` 生效：

- 通过 → 加入 [data/approved.json](../approved.json)（`"owner/name": "YYYY-MM-DD"`）
- 剔除 → 加入 [data/curated.json](../curated.json) 的 `excluded_repos`，理由只写「不是 DSH 插件 + 它是什么」，并同步从 `approved.json` 移除
- 只进目录、不进榜单 → 加入 `approved.json` + `curated.json` 的 `leaderboard_exclusions`（仅限制 Star 排行榜，不影响正规插件进入下游市场）
- desktop 客户端 / 桌面壳 / 启动器 → `leaderboard_exclusions` + `market_exclusions`（TOP200 与下游市场都不出现）
- market 类（插件市场、商店、技能商城、内置市场的桌面端等）→ `leaderboard_exclusions` + `market_exclusions` 留底（市场不能包含市场）
- 其余非插件形态（手册教程、Docker、VS Code 扩展、配套工具等）与无安装路径的通用工具 → `excluded_repos` 整体剔除（同步从 `approved.json` 移除）
- 目录站 / awesome-list / 榜单站（如 `awesome-dsh-plugin*` 系列）→ `excluded_repos` 整体剔除，不留目录
- Star 异常增长（见告警节）→ 先做增强分析；热度并非来自 DSH 插件本身时，核准也加入 `leaderboard_exclusions`

完整约定见 [data/review/README.md](./README.md)。

Record decisions in the data files, then run `node scripts/merge.mjs`:

- Approve → add to [data/approved.json](../approved.json) (`"owner/name": "YYYY-MM-DD"`)
- Exclude → add to `excluded_repos` in [data/curated.json](../curated.json) — the reason just states "not a DSH plugin + what it is" — and remove it from `approved.json`
- Catalog-only (off the board) → add to `approved.json` + `leaderboard_exclusions` in `curated.json` (applies to the Star board only; genuine plugins can still reach the downstream market)
- Desktop client / shell / launcher → `leaderboard_exclusions` + `market_exclusions` (absent from both TOP200.md and the downstream market)
- Market class (plugin market, store, skill mall, desktop with a built-in market) → `leaderboard_exclusions` + a `market_exclusions` backstop entry (the market cannot include another market)
- Other non-plugin forms (handbooks, Docker, VS Code extensions, companion tooling) and generic tools without a DSH install path → `excluded_repos` outright (also removed from `approved.json`)
- Directory sites / awesome-lists / leaderboards (e.g. the `awesome-dsh-plugin*` family) → `excluded_repos` outright
- Star-growth alerts (see the section below) → extra analysis first; if the stars are not from the DSH plugin itself, approve into `leaderboard_exclusions` as well

See [data/review/README.md](./README.md) for the full convention.

## ⚠️ Star 异常增长 / Star-growth alerts

**审查员请先看本节。** 对照上一份快照，把「一天内 +100★」「单日净减 ≥100★」或「突然进入 / 大幅跃升榜单」的仓库单独列出。这些条目**必须做增强分析**后再决定，不要只看 README 就核准进榜。

**Reviewers: start here.** Repositories that gained ≥100 stars in one snapshot interval, that lost ≥100 stars in one interval (GitHub clawing back farmed stars), or that would suddenly appear on / leap up the star board. Do extra analysis before approving them onto the board — a README check is not enough.

对比上一份快照 **2026-11-24** / vs previous snapshot **2026-11-24**。规则：日增 ≥100★；单日净减 ≥100★（GitHub 批量清号回收的签名——被回收的星通常是刷的，余下星数也应视为虚高）；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 单日大幅掉星 = 此前刷星被官方回收；刷星常贴着 +100★/日阈值之下滴灌增长，掉星往往是我们能机器检出的唯一痕迹
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **7**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 87079 | +1077 | 2460 | 61d | 日增百星 | 日增 +1077★；已不进榜单 |
| ⚠️ [kunkundi/crossdesk](https://github.com/kunkundi/crossdesk) | 已核准 / approved | 7831 | +548 | 833 | 1100d | 日增百星 | 日增 +548★；已不进榜单 |
| ⚠️ [nexu-io/openmotion](https://github.com/nexu-io/openmotion) | 已核准 / approved | 16328 | +315 | 1626 | 197d | 日增百星 | 日增 +315★；已不进榜单 |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 21388 | +222 | 715 | 103d | 日增百星 | 日增 +222★；已不进榜单 |
| ⚠️ [alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design) | 已核准 / approved | 30961 | +133 | 3282 | 219d | 日增百星 | 日增 +133★；已不进榜单 |
| ⚠️ [helloHub1212/dsh-windows-mcp](https://github.com/helloHub1212/dsh-windows-mcp) | 已核准 / approved | 2542 | +119 | 11 | 44d | 日增百星 | 日增 +119★；★/fork 231.1；已不进榜单 |
| ⚠️ [tw93/Mole](https://github.com/tw93/Mole) | 已核准 / approved | 76190 | +107 | 2739 | 427d | 日增百星 | 日增 +107★；已不进榜单 |

## 改名与身份变化待复核 / Renames pending review

同 owner、同 GitHub 仓库 ID 的纯改名已由脚本自动同步全部引用（approved / curated / packages / 榜单简介 / 精选）并保留原审批日期；以下条目无法安全自动处理，需人工核实：

- owner 迁移（仓库转移到别的账号）→ 人工确认后更新各文件的 key
- 同名换主（slug 未变但仓库 ID 变化，原仓库删除后被人重建）→ 人工确认审批去留
- 检测到改名但没有存储引用可同步 → 人工确认是否需要补引用

Same-owner, same-repository-id renames were synced automatically across approved.json / curated.json / packages.json / leaderboard descriptions / featured picks, with the original approval date kept. The entries below could not be handled safely and need manual review.

- `Witherwithwinter/DeepSeek-Balance-Whale-Widget-Bowl` → `0x2fovo/DeepSeek-Balance-Whale-Widget-Bowl` — owner changed — transfer needs review
- `Witherwithwinter/dsh-ccx` → `0x2fovo/dsh-ccx` — owner changed — transfer needs review
- `Witherwithwinter/DSH-Codinput` → `0x2fovo/DSH-Codinput` — owner changed — transfer needs review
- `acryldev/dsh-cordis` → `cordisplugins/dsh-cordis` — owner changed — transfer needs review
- `acryldev/pi-cordis` → `cordisplugins/pi-cordis` — owner changed — transfer needs review
- `AdamPlatin123/awesome-dsh-plugins` → `AdamPlatin123/dsh-plugin-radar` — target slug already exists with different data — needs review
- `DaYanHCD/DSH-Shortcut` → `DaYanCCC/DSH-Shortcut` — owner changed — transfer needs review
- `DaYanQLQ/DSH-Shortcut` → `DaYanCCC/DSH-Shortcut` — owner changed — transfer needs review
- `dongliuwuzhong-arch/dsh-purge-021rc2` → `dongliuwuzhong-arch/DSH-purge` — target slug already exists with different data — needs review
- `drewnekota/cetus` → `william-jin-cmu/cetus` — owner changed — transfer needs review
- `fgm-builds/corti` → `pgmi-builds/corti` — owner changed — transfer needs review
- `GCWing/BitFun` → `openBitFun/OpenBitFun` — owner changed — transfer needs review
- `GCWing/OpenBitFun` → `openBitFun/OpenBitFun` — owner changed — transfer needs review
- `HarcoChen/deepseek-harness-vscode` → `HarcoChen/dsh-vsc-integration` — target slug already exists with different data — needs review
- `ice5kysl/dsh-plugin-insights` → `ice5kysl/dsh-insights` — target slug already exists with different data — needs review
- `jarvis-intelligence/jarvis` → `phuongddx/jarvis` — owner changed — transfer needs review
- `liangwythu/deepseek-harness-vscode` → `YichuAI/deepseek-harness-vscode` — owner changed — transfer needs review
- `Lixxx1/dsh-vscode` → `omdsh-dev/dsh-vscode` — owner changed — transfer needs review
- `scientificmaniac/dsh-account-usage` → `scientificmaniac/dsh-weekstrip` — target slug already exists with different data — needs review
- `shell-error/deepseek-harness-remote-access` → `safety10086/deepseek-harness-remote-access-shell-error-old` — owner changed — transfer needs review
- `show-thesky/every-thing-is-possible` → `show-thesky/bing` — target slug already exists with different data — needs review
- `Tiger3807861189/DeepSeek-V4-J-Space-Capability-Realization-Report` → `Tiger3807861189/GLM-5.3-Flash-J-Space-Capability-Realization-Report` — target slug already exists with different data — needs review
- `Tiger3807861189/J-Space-Cognition-Suite-V3.6` → `Tiger3807861189/J-Space-Cognition-Suite` — target slug already exists with different data — needs review
- `Tiger3807861189/J-Space-Cognition-Suite-V3.7` → `Tiger3807861189/J-Space-Cognition-Suite` — target slug already exists with different data — needs review
- `TNJ2026/orbit-runtime` → `TNJ2026/promptaflow` — target slug already exists with different data — needs review
- `wangchengxin666/dsh-dock` → `wangchengxin666/metis` — target slug already exists with different data — needs review
- `weshopai/weshop-skill-pakage` → `weshopai/weshop-skill-package` — target slug already exists with different data — needs review
- `wgd753/awesome-dsh-plugin` → `Wenston-dev/awesome-dsh-plugin` — owner changed — transfer needs review
- `xiaoxianxian/multi-proxy` → `sif-king/costgate` — owner changed — transfer needs review
- `zendev-lab/cogfold` → `zendev-lab/ulota` — target slug already exists with different data — needs review
- `zendev-lab/spark` → `zendev-lab/ulota` — target slug already exists with different data — needs review
- `nonentity303/dsh-plugin-manager` → `nonentity303/dsh-drydock` — rename detected, but no stored reference found — check manually
- `PABIPRG/investment-research-agent` — identity change: repository id 1427981036 → 1471436408 under the same slug — approval needs review
- `Thomas-zz/dsh-workbench` — identity change: repository id 1451164822 → 1471223572 under the same slug — approval needs review
- `soffits/dsh-restart-resume` — identity change: repository id 1458318606 → 1471711432 under the same slug — approval needs review
- `soffits/dsh-rummage-recall` — identity change: repository id 1459145313 → 1471711683 under the same slug — approval needs review


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [xing-shuyin/keel](https://github.com/xing-shuyin/keel) | 401 | 2026-08-04 | 2026-11-25 | Just open your browser — get all your work done. |
| 2 | [0x2fovo/DeepSeek-Balance-Whale-Widget-Bowl](https://github.com/0x2fovo/DeepSeek-Balance-Whale-Widget-Bowl) | 41 | 2026-08-29 | 2026-11-25 | DeepSeek Harness（DSH）常驻余额挂件，基于 MeteorNOX/DeepSeek-Balance-Whale-Widget 修改的铁盆鲸鱼娘版。 |
| 3 | [0x2fovo/DSH-Codinput](https://github.com/0x2fovo/DSH-Codinput) | 18 | 2026-09-16 | 2026-11-25 | 把 DeepSeek Harness 的聊天输入框，换成编辑器式的输入面板。\|  An editor-style input panel, right where the DeepSeek Harness chat composer used to be. |
| 4 | [L1ch404/jolink-runtime](https://github.com/L1ch404/jolink-runtime) | 18 | 2026-07-20 | 2026-11-25 | Helps AI coding agents start your Java app and rerun tests faster after code changes. |
| 5 | [drscrewdriver/dsh-union-search](https://github.com/drscrewdriver/dsh-union-search) | 13 | 2026-10-21 | 2026-11-25 | Union web search plugin for DeepSeek Harness: free keyless engines + paid search APIs, smart routing, SearXNG multi-instance, advance_fetch DOM-to-Markdown (npm: @drscrewdriver/dsh-union-search) |
| 6 | [nonentity303/dsh-drydock](https://github.com/nonentity303/dsh-drydock) | 12 | 2026-08-15 | 2026-11-25 | DSH 引擎船坞（drydock）：引擎起不来时还在的运维与救援层——独立进程 3081 自检/隔离/拉起、事务化卸载可撤销、来源三分区。装与逛请用官方插件页或插件市场。 |
| 7 | [ninthmonee/AccreMind](https://github.com/ninthmonee/AccreMind) | 6 | 2026-09-08 | 2026-11-25 | Agent-era KnowledgeOps platform for recalling and compounding development experience through MCP. |
| 8 | [0x2fovo/dsh-ccx](https://github.com/0x2fovo/dsh-ccx) | 5 | 2026-10-21 | 2026-11-25 | Rice-dog/code-codex 的 DeepSeek Harness 改版 |
| 9 | [easychen/jing-chan-os](https://github.com/easychen/jing-chan-os) | 5 | 2026-11-24 | 2026-11-25 | 🐋 小鲸同学 (JingChanOS) — DeepSeek Harness (DSH) AI 伴侣与随身虚拟手机插件 (dsh-plugin-jphone)：Q版桌宠、免提语音电话、小鲸专注、Panime动态壁纸、AI日记、去中心化创意工坊与Android远控 \| AI Companion &amp; Virtual Phone for DeepSeek Harness |
| 10 | [drscrewdriver/dsh-reference-session-collector](https://github.com/drscrewdriver/dsh-reference-session-collector) | 4 | 2026-10-20 | 2026-11-25 | DSH session reference collector |
| 11 | [drscrewdriver/dsh-im-union](https://github.com/drscrewdriver/dsh-im-union) | 3 | 2026-10-17 | 2026-11-25 | DSH IM union bridge plugin: WeChat iLink / Telegram / Discord / Feishu / WeCom bot to host sessions (0.1.2-0.2.1) |
| 12 | [drscrewdriver/dsh-media-lens](https://github.com/drscrewdriver/dsh-media-lens) | 3 | 2026-10-17 | 2026-11-25 | Media evidence lens + provider router for DeepSeek Harness (media_read_video/audio/image; host+client bundle, dsh-family sub-tab). |
| 13 | [sonhoang23/dsh-mindmap](https://github.com/sonhoang23/dsh-mindmap) | 3 | 2026-11-23 | 2026-11-25 | A Markdown-first interactive mind map viewer for DSH Better Sidebar, with responsive layouts and configurable node wrapping. |
| 14 | [Cirl3cat/dsh-restart-asar](https://github.com/Cirl3cat/dsh-restart-asar) | 2 | 2026-11-25 | 2026-11-25 | DSH 桌面端（Windows）重启插件：在「应用」菜单「退出」上方与系统托盘「打开/退出」之间增加重启项，等价于完全退出后冷启动，文案跟随应用语言。 \| Adds a Restart entry to the DeepSeek Harness Windows desktop app menu and system tray; a real cold restart, labels follow the app language, reversible byte-length-preserving app.asar patch. |
| 15 | [drscrewdriver/dsh-spirit](https://github.com/drscrewdriver/dsh-spirit) | 2 | 2026-10-29 | 2026-11-25 | DSH 第一人称体验条目插件（prime-memory 姊妹线）：流程事件编译成角色体验 + 情绪档 + 模型前回忆卡注入。实验线 0.9.x |
| 16 | [RainSnowYY/dsh-second-review](https://github.com/RainSnowYY/dsh-second-review) | 2 | 2026-11-10 | 2026-11-25 | 一个为 DeepSeek Harness (DSH) 提供独立副模型二次评审的插件，做到两个模型接入一个对话，在主模型回答后自动检查潜在风险与代价，必要时可选择副模型接管任务。 |
| 17 | [xian-yu-zhao/dsh-context-manager](https://github.com/xian-yu-zhao/dsh-context-manager) | 2 | 2026-10-24 | 2026-11-25 | Manage a DSH session's model context: delete single messages or whole conversation turns (roll back to the start of a turn), and restore them later, without touching the raw session log. |
| 18 | [01kalival/dsh-timekeeper](https://github.com/01kalival/dsh-timekeeper) | 1 | 2026-11-25 | 2026-11-25 | Timekeeper for DeepSeek Harness — automatic usage tracking with insights, badges and shareable yearly reports. · 时间账本：自动统计你在 DeepSeek Harness 里的时间投入与习惯洞察：四维面板+环比、过去一年热力图、连续天数、时段洞察（24 小时/周内分布）、项目归属、每日目标、番茄钟、成就徽章、可分享年度总结卡片，以及数据导入导出。从进入 DSH 那一刻起自动计时，全部数据只存本机。 |
| 19 | [Allencccc/dsh-punch-desk](https://github.com/Allencccc/dsh-punch-desk) | 1 | 2026-11-24 | 2026-11-25 | 会话草稿、评审发现与复盘， Prompt生命周期管理 |
| 20 | [AlphaAntivoid/dsh-chat-replica](https://github.com/AlphaAntivoid/dsh-chat-replica) | 1 | 2026-11-25 | 2026-11-25 | DeepSeek Harness (DSH) 的对话模式插件：会话列表菜单、搜索、草稿、语音与朗读 / A chat-demo style chat UI for DSH |
| 21 | [awa1231/dsh-collab-pair](https://github.com/awa1231/dsh-collab-pair) | 1 | 2026-11-25 | 2026-11-25 | DSH plugin: link a project-manager conversation with local or remote worker conversations across devices, with a visual task board. |
| 22 | [BaiGang/dsh-bots-team](https://github.com/BaiGang/dsh-bots-team) | 1 | 2026-11-25 | 2026-11-25 | A team of AI bots in the DeepSeek Harness left sidebar: every bot is a real DSH Session with its own folder and persona. |
| 23 | [bikabika978/dsh-image-search](https://github.com/bikabika978/dsh-image-search) | 1 | 2026-11-25 | 2026-11-25 | 以图搜图：反查二次元角色、番剧出处与图片来源页（Google Lens + AnimeTrace + trace.moe）。DSH 插件，MIT。 |
| 24 | [bowin6699/dsh-gemini-panel](https://github.com/bowin6699/dsh-gemini-panel) | 1 | 2026-11-25 | 2026-11-25 | Full-bleed Gemini web panel in the DSH desktop right sidebar, with persistent login and Markdown/JSON conversation export. |
| 25 | [carloskey/dsh-automation-dashboard](https://github.com/carloskey/dsh-automation-dashboard) | 1 | 2026-11-25 | 2026-11-25 | A standalone sci-fi dashboard for the official automation tasks: task status cards, a top readout bar (fired today, on-time delivery rate, next-run countdown) and a delivery-record timeline. Read only — every value comes from the official schedule service, and the Automation tasks page is left untouched. |
| 26 | [ChengGuanjin666/dsh-find-in-sessions](https://github.com/ChengGuanjin666/dsh-find-in-sessions) | 1 | 2026-11-17 | 2026-11-25 | Ctrl+F cross-session keyword search for DeepSeek Harness, backed by a local SQLite FTS5 index |
| 27 | [chenjie151/dsh-software-manager](https://github.com/chenjie151/dsh-software-manager) | 1 | 2026-11-24 | 2026-11-25 | Reads DSH session logs, lists every package the agent installed with its resolved location and version, and uninstalls it in one click. |
| 28 | [DennisZhangOiler/dsh-rd-workflow](https://github.com/DennisZhangOiler/dsh-rd-workflow) | 1 | 2026-11-20 | 2026-11-25 | Non-default Dev Workflow agent preset for DeepSeek Harness |
| 29 | [drscrewdriver/dsh-session-search](https://github.com/drscrewdriver/dsh-session-search) | 1 | 2026-10-17 | 2026-11-25 | Index-free cross-agent session search for DeepSeek Harness |
| 30 | [dshcrate/dsh-crate](https://github.com/dshcrate/dsh-crate) | 1 | 2026-11-01 | 2026-11-25 | DSH 可视化插件市场插件：在 DeepSeek Harness 里逛 dshcrate.com 目录，一键复制安装命令 |
| 31 | [Ep1phanyw/project_manager](https://github.com/Ep1phanyw/project_manager) | 1 | 2026-11-23 | 2026-11-25 | Project orchestration plugin for DeepSeek Harness (DSH): parallel subagent parts, plugin-executed acceptance checks, user-only approval. |
| 32 | [flin7194-creator/dsh-skill-explorer-card](https://github.com/flin7194-creator/dsh-skill-explorer-card) | 1 | 2026-11-24 | 2026-11-25 | DeepSeek Harness 技能中心卡片化增强版，提供简洁美观的 SKILL 可视化管理界面。 |
| 33 | [FriendG3154/dsh-tokenplan-quota](https://github.com/FriendG3154/dsh-tokenplan-quota) | 1 | 2026-11-25 | 2026-11-25 | dsh 千问tokenplan插件 |
| 34 | [G-TY/dsh-refresh](https://github.com/G-TY/dsh-refresh) | 1 | 2026-11-25 | 2026-11-25 | Restart, quit and hot-reload the DSH desktop app from two sidebar icons and a conversation-header button. |
| 35 | [gougou1993/dsh-mysql-client](https://github.com/gougou1993/dsh-mysql-client) | 1 | 2026-11-22 | 2026-11-25 | DSH MySQL 客户端；dsh-mysql-client；DeepSeek Harness MySQL 客户端 |
| 36 | [gougou1993/dsh-off-duty](https://github.com/gougou1993/dsh-off-duty) | 1 | 2026-11-25 | 2026-11-25 | dsh 下班铃插件;dsh-off-duty |
| 37 | [knopki/memlens](https://github.com/knopki/memlens) | 1 | 2026-11-14 | 2026-11-25 | Long-term memory for an agent. The agent starts each session with a map of what it already knows. One SQLite file holds the notes, and a tree of summaries stands above them. |
| 38 | [KunKun24/tg-bot-security-auditor](https://github.com/KunKun24/tg-bot-security-auditor) | 1 | 2026-11-25 | 2026-11-25 | Telegram Bot 只读安全审计 Skill / Read-only security audit skill for Telegram bots |
| 39 | [lanxiake/dsh-vyra-plugins](https://github.com/lanxiake/dsh-vyra-plugins) | 1 | 2026-11-12 | 2026-11-25 | DeepSeek Harness plugin and skill market maintained alongside the dsh-Veyra fork. |
| 40 | [linseasea/dsh-mycat](https://github.com/linseasea/dsh-mycat) | 1 | 2026-11-25 | 2026-11-25 | MYCAT — a session workbench for DeepSeek Harness: pinned-session area with four session states, session management tools, recoverable trash and stats. |
| 41 | [lsit27/dsh-ad-manage](https://github.com/lsit27/dsh-ad-manage) | 1 | 2026-11-25 | 2026-11-25 | DSH 插件：可视化配置 AD/OpenLDAP 域连接，集中管理域用户、计算机、安全组/分发组、组织单元（OU）与组策略（GPO）。 |
| 42 | [lsit27/dsh-footer-buttons](https://github.com/lsit27/dsh-footer-buttons) | 1 | 2026-11-25 | 2026-11-25 | DSH 网页 UI 插件：垂直、左对齐、自动调整大小的侧边栏底部按钮，带有一个“更多”面板，可以隐藏或恢复每个按钮。 |
| 43 | [lsit27/dsh-restart](https://github.com/lsit27/dsh-restart) | 1 | 2026-11-24 | 2026-11-25 | DSH 插件：Web 前端点一下「重启 dsh」按钮即可关闭并重新启动 dsh，启动时沿用当前默认模型。 |
| 44 | [Lzzdyyy/dsh-codex-responses](https://github.com/Lzzdyyy/dsh-codex-responses) | 1 | 2026-11-25 | 2026-11-25 | DSH plugin: repair malformed responses for codex-style OpenAI-compatible endpoints |
| 45 | [MeZenith/dsh-flow](https://github.com/MeZenith/dsh-flow) | 1 | 2026-11-25 | 2026-11-25 | Multi-mode workflow &amp; layered prompt plugin for DeepSeek Harness (DSH) — 支持 Plan / Plan Ultra / Build / Review / Flow 快捷切换、分层提示词管理与默认模型路由。 |
| 46 | [Miles22ui/dsh-prompt-hone](https://github.com/Miles22ui/dsh-prompt-hone) | 1 | 2026-11-25 | 2026-11-25 | A DeepSeek Harness plugin: click ✨ to rewrite the composer draft into a clearer, executable prompt — in place, with undo. Ships a portable SKILL.md for other agents. |
| 47 | [qyy2005/dsh-cost-lite](https://github.com/qyy2005/dsh-cost-lite) | 1 | 2026-11-25 | 2026-11-25 | DeepSeek Harness 费用插件：会话费用、每回合费用、官方与中转站余额、峰谷与价格自动同步 |
| 48 | [Railan1314/dsh-plugin-ds-console](https://github.com/Railan1314/dsh-plugin-ds-console) | 1 | 2026-11-25 | 2026-11-25 | DSH left sidebar scheduler: tasks, concurrency, free pool, map/texture/balance tools |
| 49 | [Rex16200513/codesight](https://github.com/Rex16200513/codesight) | 1 | 2026-11-23 | 2026-11-25 | See what your AI changed — before it breaks. Local-first GraphRAG architecture cards (MCP Apps) &amp; macOS HUD for AI coding. |
| 50 | [Sora-Taiho/dsh-mcp-tool-dispatch](https://github.com/Sora-Taiho/dsh-mcp-tool-dispatch) | 1 | 2026-11-25 | 2026-11-25 | BM25 search and on-demand loading for MCP tools in DeepSeek Harness. |
| 51 | [suishou0325/ability-router](https://github.com/suishou0325/ability-router) | 1 | 2026-11-25 | 2026-11-25 | DeepSeek Harness 三合一能力路由插件：技能 / 内置工具 / 本机 exe 一个入口按需路由，技能目录常驻开销砍掉 70% \| Three-in-one ability router for DeepSeek Harness: skills / built-in tools / local executables, cutting the always-loaded skill catalog by 70% |
| 52 | [surunlang-creator/dsh-client-ui-skin-runlang](https://github.com/surunlang-creator/dsh-client-ui-skin-runlang) | 1 | 2026-11-22 | 2026-11-25 | Runlang · 古风庭院动态壁纸皮肤 / courtyard-video skin for DeepSeek Harness: smoked glass, music player with drag-to-seek, wallpaper &amp; music uploads, mint cat. |
| 53 | [virtin37/dsh-prompt-library](https://github.com/virtin37/dsh-prompt-library) | 1 | 2026-11-25 | 2026-11-25 | DeepSeek Harness 右侧栏的提示词库：分组、搜索、填空后插入输入框，不自动发送。 |
| 54 | [whyissodifficult/dsh-agent-swarm-console](https://github.com/whyissodifficult/dsh-agent-swarm-console) | 1 | 2026-11-21 | 2026-11-25 | 别信「我完成了」—— DeepSeek Harness 的交付门禁：契约由用户确认，证据由插件执行，放行只有用户能做。 |
| 55 | [xia-sc/dsh-todo](https://github.com/xia-sc/dsh-todo) | 1 | 2026-11-25 | 2026-11-25 | 便签墙式 TODO 插件（DSH Web GUI）：自由摆放的暖色便签、原地编辑、可选工作区/起止时间/附件，以及默认关闭、按需加载给 LLM 的工具。 |
| 56 | [youyouiooi/dsh-mcp-skill-hub](https://github.com/youyouiooi/dsh-mcp-skill-hub) | 1 | 2026-11-25 | 2026-11-25 | Manage MCP connections and Agent skills from one sidebar panel in DeepSeek Harness. |
| 57 | [yuwang/dsh-plugins-reload](https://github.com/yuwang/dsh-plugins-reload) | 1 | 2026-11-25 | 2026-11-25 | One-click reload for DeepSeek Harness plugins. Changed code and config take effect without restarting the app or interrupting running tasks. DeepSeek Harness 插件的一键重载。改完代码和配置点一下就生效，不重启应用，也不打断正在运行的任务。 |
| 58 | [ZhangjiaxinGZS/dsh-role-team](https://github.com/ZhangjiaxinGZS/dsh-role-team) | 1 | 2026-11-21 | 2026-11-25 | DeepSeek Harness plugin for conversational AI role cultivation, shared long-term memory, strict per-team session isolation, and multi-column team collaboration. |
| 59 | [zhangzexu/dsh-buddy-expert-hub](https://github.com/zhangzexu/dsh-buddy-expert-hub) | 1 | 2026-11-10 | 2026-11-25 | dsh-buddy-expert-hub |
| 60 | [zhuowenzhang288-web/dsh-ai-research-workflow](https://github.com/zhuowenzhang288-web/dsh-ai-research-workflow) | 1 | 2026-11-20 | 2026-11-25 | DSH 一键安装包：现象驱动科研工作流 skill——先做小实验找规律、再反推 idea。带查新/实验/引用核验/审计 4 个零依赖脚本。主仓见 ai-research-workflow。 |
| 61 | [ZZR-rui-997/dsh-academic-figure-ops](https://github.com/ZZR-rui-997/dsh-academic-figure-ops) | 1 | 2026-11-25 | 2026-11-25 | Figure production rules for academic papers: compute the printed font size from your text width, verify the exported pixels, and pick a chart type that matches the message. |
| 62 | [ZZR-rui-997/dsh-fluent-pyfluent-ops](https://github.com/ZZR-rui-997/dsh-fluent-pyfluent-ops) | 1 | 2026-11-25 | 2026-11-25 | PyFluent operating procedure (ANSYS Fluent on Windows) packaged as a DSH bundle that registers it as a skill. |
| 63 | [1804608397/dsh-plugin-linux-computer-use](https://github.com/1804608397/dsh-plugin-linux-computer-use) | 0 | 2026-11-25 | 2026-11-25 | Computer Use for Ubuntu / GNOME Wayland in DeepSeek Harness: screenshots, AT-SPI UI tree, uinput pointer/keyboard, clipboard, processes and gsettings, bridged as mcp__linux__* tools. |
| 64 | [2020141461073/dsh-second-thoughts](https://github.com/2020141461073/dsh-second-thoughts) | 0 | 2026-11-25 | 2026-11-25 | 开工前强制预检：先盘点检索工具，再扫开源/插件市场找现成方案，摆出证据表、自我反驳三问，才决定用现成的、去贡献，还是自建。 |
| 65 | [2923fzyxfkj/dsh-fork-sessions](https://github.com/2923fzyxfkj/dsh-fork-sessions) | 0 | 2026-11-25 | 2026-11-25 | Branch a DSH conversation into a session that opens in the right sidebar. |
| 66 | [414s857/dsh-codesentry](https://github.com/414s857/dsh-codesentry) | 0 | 2026-11-25 | 2026-11-25 | 任务化的代码审计插件：大仓库自动分片、AI 深度审计、一键出报告，跑在 DeepSeek Harness 里。 |
| 67 | [6starlong/dsh-plugins](https://github.com/6starlong/dsh-plugins) | 0 | 2026-11-19 | 2026-11-25 | Starlong 的 DSH 插件套件：一个插件，多个可独立开关的模块。 |
| 68 | [8zvd6qgcsy-creator/dsh-proof-board](https://github.com/8zvd6qgcsy-creator/dsh-proof-board) | 0 | 2026-11-25 | 2026-11-25 | Proof Board for DeepSeek Harness — a visual review wall for session deliverables; mark each item good/fix/TBD, hand the notes back to the agent. |
| 69 | [a30300/dsh-infinite-context-orchestrator](https://github.com/a30300/dsh-infinite-context-orchestrator) | 0 | 2026-11-25 | 2026-11-25 | 上下文快满时自动换窗：写交接检查点 → 开新会话 → 注入交接简报（含原始需求）。Auto-handoff for DeepSeek Harness when the context fills up: checkpoint, new session, briefed continuation. |
| 70 | [aazh2026/dsh-specgate](https://github.com/aazh2026/dsh-specgate) | 0 | 2026-11-25 | 2026-11-25 | Requirement coverage for DeepSeek Harness — like test coverage, but for acceptance criteria. |
| 71 | [ackniuw/dsh-image-drag-fix](https://github.com/ackniuw/dsh-image-drag-fix) | 0 | 2026-11-24 | 2026-11-25 | DSH 拖图被拒的根因与修复：前端按扩展名猜 MIME，宿主按字节校验，QQ 拖拽的图必然撞车。附 asar 手术脚本与避坑记录。 |
| 72 | [adsorgcn/dsh-plugin-seo](https://github.com/adsorgcn/dsh-plugin-seo) | 0 | 2026-11-25 | 2026-11-25 | SEO 体检 for DeepSeek Harness - iLang DSH 工具包的官方插件 |
| 73 | [agrnk0110-create/dsh-im-debox](https://github.com/agrnk0110-create/dsh-im-debox) | 0 | 2026-11-25 | 2026-11-25 | Connect DeBox private chats and groups to DeepSeek Harness as an in-process IM channel: send a message to run a DSH task and get the answer back in the same chat. |
| 74 | [AidamirKaraziev/plexus-dsh](https://github.com/AidamirKaraziev/plexus-dsh) | 0 | 2026-11-24 | 2026-11-25 | Экономия токенов в DeepSeek Harness: метр расходов, тёплый кэш, обрезка больших чтений, дешёвый разведчик |
| 75 | [Aily-DSH/dsh-superagent-manager](https://github.com/Aily-DSH/dsh-superagent-manager) | 0 | 2026-11-02 | 2026-11-25 | 在同一个 DSH 客户端管理多个 dsh-superagent 项目：一键建仓、克隆、注册工作区、启动实例，并在标签页面板内代理运行。自用测试版，实际使用中可能有意料之外的 bug 和报错。 |
| 76 | [aimedweboff-ai/dsh-balance-strip](https://github.com/aimedweboff-ai/dsh-balance-strip) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness plugin: always-visible account balance, session token counters, and estimated session spend in the bottom status bar |
| 77 | [ALIZEN37/dsh-aspen-plugin](https://github.com/ALIZEN37/dsh-aspen-plugin) | 0 | 2026-11-25 | 2026-11-25 | Drive Aspen Plus V14 from DeepSeek Harness: open a case, run it, read/write flowsheet tree nodes. Contributes 8 MCP tools via ctx.mcpManager.register(). |
| 78 | [Allenyou1126/dsh-pwa](https://github.com/Allenyou1126/dsh-pwa) | 0 | 2026-11-25 | 2026-11-25 | OIDC-safe PWA shell for DeepSeek Harness Web: service worker, offline fallback, installable app around the manifest DSH already ships. |
| 79 | [am87tt-sys/dsh-googledrive](https://github.com/am87tt-sys/dsh-googledrive) | 0 | 2026-11-25 | 2026-11-25 | Google Drive, Google Docs and Google Sheets tools for DeepSeek Harness. Runs through your own Google Apps Script: no Google Cloud project, no OAuth consent screen, no hosting. |
| 80 | [AndVoido/dsh-deepseek-exporter](https://github.com/AndVoido/dsh-deepseek-exporter) | 0 | 2026-11-22 | 2026-11-25 | 把 DSH 会话导出成 DeepSeek 官方 v3 ZIP 格式，可在 DeepSeek 网页版/App 导入。Export DSH sessions to DeepSeek's official v3 ZIP format. |
| 81 | [apcamargo/dsh-marimo](https://github.com/apcamargo/dsh-marimo) | 0 | 2026-11-25 | 2026-11-25 | Work with a coding agent in a live marimo notebook through DeepSeek Harness |
| 82 | [Ar7Wei/dsh-calendartask](https://github.com/Ar7Wei/dsh-calendartask) | 0 | 2026-11-25 | 2026-11-25 | 桌面日历 DesktopCal 的配色登记：一件事一个颜色，按截止日铺底色（DSH 插件 + 技能） |
| 83 | [ayukyo/dsh-greenlight](https://github.com/ayukyo/dsh-greenlight) | 0 | 2026-11-25 | 2026-11-25 | Verifiable task board for DeepSeek Harness: cards close themselves when their evidence and deliverables check out, and only the unverifiable ones ask a human. |
| 84 | [Azincc/dsh-model-prompts](https://github.com/Azincc/dsh-model-prompts) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness Host bundle: shorter, family-specific system prompts for Gemini and Claude models so long tool instructions stop collapsing generation tasks into placeholder files. |
| 85 | [babycannotsay/dsh-json-tree-preview](https://github.com/babycannotsay/dsh-json-tree-preview) | 0 | 2026-11-25 | 2026-11-25 | Collapsible, colour-coded JSON tree for the DeepSeek Harness right-sidebar file preview: search, path/value copy, virtual scrolling. |
| 86 | [baicheng2333/dsh-background](https://github.com/baicheng2333/dsh-background) | 0 | 2026-11-25 | 2026-11-25 | DSH 插件：整窗背景图片，主题底色覆盖，可调强度与模糊；图片仅保存在本机。Custom background picture for the DeepSeek Harness Web GUI. |
| 87 | [baiger01/dsh-browser-annotations](https://github.com/baiger01/dsh-browser-annotations) | 0 | 2026-11-25 | 2026-11-25 | 浏览器注释 · 点选 DSH 桌面浏览器中的网页元素，将截图和反馈带进对话草稿。 |
| 88 | [BankGPT/bankgpt-skills](https://github.com/BankGPT/bankgpt-skills) | 0 | 2026-08-28 | 2026-11-25 | Official AI Skills for BankGPT, designed for Claude Code, Codex, Cursor, and other AI coding agents. |
| 89 | [bei7777/dsh-plugin-minder](https://github.com/bei7777/dsh-plugin-minder) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness bundles for Minder snapshots, Markdown memory, and attention rules |
| 90 | [Bejohnself/dsh-study-less](https://github.com/Bejohnself/dsh-study-less) | 0 | 2026-11-25 | 2026-11-25 | DSH 知止：把目标翻译成读哪些节、每个知识点到哪一档的读书台（插件 + 独立网页版） |
| 91 | [bmqy/dsh-provider-quota](https://github.com/bmqy/dsh-provider-quota) | 0 | 2026-11-25 | 2026-11-25 | DSH 插件：在对话输入框上方常驻展示所有已配置模型供应商的套餐余量（5 小时 / 每周 / 每月），悬停看明细。 |
| 92 | [bot-for-imitoy/dsh-ui-automation](https://github.com/bot-for-imitoy/dsh-ui-automation) | 0 | 2026-11-25 | 2026-11-25 | Linux-only numbered-image UI control for DSH: screenshot a display with yellow numbered badges, then click, scroll, drag and type by index; every action returns the next numbered image. GTK4 is supported through an X11-origin fallback. |
| 93 | [breakjck/dsh-aside-ask](https://github.com/breakjck/dsh-aside-ask) | 0 | 2026-11-25 | 2026-11-25 | 自建的一个deepseek harness 插件，可以在主对话中进行旁支提问，并且会将提问结果写入上下文 |
| 94 | [cai-png/dsh-retro-arcade](https://github.com/cai-png/dsh-retro-arcade) | 0 | 2026-11-25 | 2026-11-25 | Four FC classics — Super Mario, Contra, Bomberman and Lode Runner — in one CRT arcade cabinet inside DeepSeek Harness. |
| 95 | [cannotgetaname/dsh-carsi-papers](https://github.com/cannotgetaname/dsh-carsi-papers) | 0 | 2026-11-25 | 2026-11-25 | Search campus-subscribed literature (IEEE/ScienceDirect/Springer) through your own Chrome — a DeepSeek Harness plugin with CARSI institutional sign-in. |
| 96 | [castiel0101/dsh-connect-model-gateway](https://github.com/castiel0101/dsh-connect-model-gateway) | 0 | 2026-11-25 | 2026-11-25 | 魔桥：把 WorkBuddy / CodeArts / Meoo / SCNet / 灵犀 等的积分模型接进 DSH |
| 97 | [cccjdbvn/dsh-mood-changes](https://github.com/cccjdbvn/dsh-mood-changes) | 0 | 2026-11-18 | 2026-11-25 | DSH小鲸鱼情绪插件 |
| 98 | [Charlieeeo/dsh-next-reply-chips](https://github.com/Charlieeeo/dsh-next-reply-chips) | 0 | 2026-11-24 | 2026-11-25 | 每条回答下方给出最多 3 个可点击的下一步：建议随主回复一起产出、不额外调用模型，点一下可直接发送或只填进输入框。Clickable next-reply chips under every answer in dsh. The suggestions come with the reply itself — no extra model call — and a click either sends or fills the composer. |
| 99 | [chedanha/dsh-handoff-oneclick](https://github.com/chedanha/dsh-handoff-oneclick) | 0 | 2026-11-25 | 2026-11-25 | DSH 一键交接：打包当前会话 → 新建会话 → 注入交接指令 → 自动切过去 |
| 100 | [ChongYuGit/dsh-rider-mcp](https://github.com/ChongYuGit/dsh-rider-mcp) | 0 | 2026-11-25 | 2026-11-25 | Connect DeepSeek Harness to JetBrains Rider's built-in MCP server, with a per-session project picker and connection badge. |
| 101 | [codesimplebird/dsh-plugins](https://github.com/codesimplebird/dsh-plugins) | 0 | 2026-08-16 | 2026-11-25 | DSH（DeepSeek Harness）插件与配置集合：每轮模型显示、任务总用时、任务收尾、会话全文搜索、免费联网搜索、额度面板等 |
| 102 | [CubeQuanter/dsh-fangkuai-ranking](https://github.com/CubeQuanter/dsh-fangkuai-ranking) | 0 | 2026-11-25 | 2026-11-25 | 方块榜单：在 DeepSeek Harness 中创建、保存和查看 A 股选股榜单的插件 |
| 103 | [cute-aaa/dsh-fish-body](https://github.com/cute-aaa/dsh-fish-body) | 0 | 2026-11-23 | 2026-11-25 | 吃白饭的蓝色大肥鱼：DSH（DeepSeek Harness）的桌宠插件（dsh-pet 的 fork）——网页/桌面/独立三种形态、100+ 段透明动画、soul 项目人设兼容、作息与外部记忆、语音合成与识别 |
| 104 | [cxywhite/dsh-next-turn-reorder](https://github.com/cxywhite/dsh-next-turn-reorder) | 0 | 2026-11-24 | 2026-11-25 | Reorder queued next-turn messages in DeepSeek Harness |
| 105 | [CyanceC/dsh-model-pointer](https://github.com/CyanceC/dsh-model-pointer) | 0 | 2026-11-25 | 2026-11-25 | /model to add pointer model in chat for quick referent model to agents. |
| 106 | [DancingLi/dsh-knowledge-session-scope](https://github.com/DancingLi/dsh-knowledge-session-scope) | 0 | 2026-11-25 | 2026-11-25 | Cherry Studio-style per-conversation knowledge base selector for DeepSeek Harness (DSH) and Soren-ABT/dsh-knowledge |
| 107 | [darianzes/dsh-plugin-rag-eval-suite](https://github.com/darianzes/dsh-plugin-rag-eval-suite) | 0 | 2026-11-25 | 2026-11-25 | Understand-first RAG evaluation suite: categorized dataset generation, 7 backtest methods, P0-P3 root-cause diagnosis, HTML/MD reports. Works across Antigravity, Claude Code, Codex, DeepSeek Harness (dsh). |
| 108 | [dc165015/dsh-stock-review](https://github.com/dc165015/dsh-stock-review) | 0 | 2026-11-25 | 2026-11-25 | A DeepSeek Harness skill: give it a six-digit A-share/HK stock code and it produces a ten-section research review plus a single-file dark HTML report. |
| 109 | [ddt2501/dsh-doubao-memory](https://github.com/ddt2501/dsh-doubao-memory) | 0 | 2026-11-22 | 2026-11-25 | 人格记忆系统：双层记忆（SQLite 事实记忆 + wiki 人格抽象）+ 工具式按需召回 + Wiki 四相 + 末那识 + 主动搭讪 + 每轮住相。DSH 插件，机制与人格数据分离。 |
| 110 | [Demonese/dsh-remember-workspace-settings](https://github.com/Demonese/dsh-remember-workspace-settings) | 0 | 2026-11-25 | 2026-11-25 | 这个插件能按工作区记住你上次在工作区内新建对话时用的预设和模型。 |
| 111 | [dengwei84/dsh-session-digest](https://github.com/dengwei84/dsh-session-digest) | 0 | 2026-11-25 | 2026-11-25 | Read another DSH session (any workspace) as a compact, structured digest. |
| 112 | [DestinySail/dsh-lot-map](https://github.com/DestinySail/dsh-lot-map) | 0 | 2026-11-25 | 2026-11-25 | Lot Map for DeepSeek Harness: a live visual map beside the chat showing tool calls, model steps, memory, hooks, skills, and subagents in real time. |
| 113 | [dinhdev666/dsh-purge-session](https://github.com/dinhdev666/dsh-purge-session) | 0 | 2026-11-25 | 2026-11-25 | Permanently delete one DeepSeek Harness session: durable log, workspace accounting, live memory entry, archive/pin entries and projection cache. Sidebar action plus agent tools, TypeScript, nine UI locales, MIT. |
| 114 | [dNEryno/dsh-cache-alarm](https://github.com/dNEryno/dsh-cache-alarm) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness ??:???????????????token ???????? |
| 115 | [doudegua/dsh-parallel-session](https://github.com/doudegua/dsh-parallel-session) | 0 | 2026-11-25 | 2026-11-25 | DSH parallel-session plugin: the current session opens a peer, user-facing session (not a subagent), inherits its model/reasoning/workspace/permissions, and hands over context, enabling the user to keep chatting without re-typing anything. |
| 116 | [dsAI-Q/browser-pilot](https://github.com/dsAI-Q/browser-pilot) | 0 | 2026-11-25 | 2026-11-25 | Agent-friendly controlled browser automation. Zero retention by default: never writes URLs or credentials to disk. |
| 117 | [dsh-pulgin/dsh-whale-pet](https://github.com/dsh-pulgin/dsh-whale-pet) | 0 | 2026-11-24 | 2026-11-25 | 深海女仆桌宠 |
| 118 | [dsh-suite-store/dsh-suite-store](https://github.com/dsh-suite-store/dsh-suite-store) | 0 | 2026-11-24 | 2026-11-25 | DeepSeek Harness 的可视化整合包商店:浏览、搜索、一键安装与卸载插件套装 / A visual suite marketplace for DeepSeek Harness — browse, search, and one-click install plugin suites. |
| 119 | [dsh-suite-store/dsh-suite-store-catalog](https://github.com/dsh-suite-store/dsh-suite-store-catalog) | 0 | 2026-11-24 | 2026-11-25 | 收录精选Deepseek Harness 插件整合包。 / Includes the DeepSeek Harness plugin suites. |
| 120 | [duma520/dsh-run2skill](https://github.com/duma520/dsh-run2skill) | 0 | 2026-11-25 | 2026-11-25 | dsh-run2skill：把 DSH 会话里你明确表达的做事方式，沉淀成可审核、可回滚的原生 Skill。带自有 JSONL 日志、运行代际自检（改了没重启会提示）、技能召回遥测（近 30 天谁被喂给过模型）、发布历史快照（每个 Skill 留 3 版可回滚），左侧栏有「技能沉淀」面板。适合长期用 DSH 干活、反复交代同一套做法的人。 |
| 121 | [Duyh814/dsh-gemini-hourglass](https://github.com/Duyh814/dsh-gemini-hourglass) | 0 | 2026-11-25 | 2026-11-25 | Gemini 沙漏 — DeepSeek Harness 插件，零 Token 同步 NTR 五小时与每周配额及重置倒计时 |
| 122 | [eagurin/dsh-codex-stt](https://github.com/eagurin/dsh-codex-stt) | 0 | 2026-11-25 | 2026-11-25 | OpenAI Codex speech recognition for DeepSeek Harness: dictate into the composer on a ChatGPT/Codex subscription, no API key |
| 123 | [eakshelling/dsh-plugin-session-delete](https://github.com/eakshelling/dsh-plugin-session-delete) | 0 | 2026-11-25 | 2026-11-25 | Delete a DeepSeek Harness conversation permanently: right-click, confirm, and remove its log, projection cache and workspace entry. |
| 124 | [eakshelling/dsh-plugin-workspace-mover](https://github.com/eakshelling/dsh-plugin-workspace-mover) | 0 | 2026-11-25 | 2026-11-25 | Move a Session between Workspaces in DeepSeek Harness: right-click a session, queue the move, applied on the next start. |
| 125 | [easonandkhalil/dsh-moyu](https://github.com/easonandkhalil/dsh-moyu) | 0 | 2026-11-25 | 2026-11-25 | A build-log side panel for DeepSeek Harness whose worker-pool grid is a snake game. |
| 126 | [elonzh/dshjk](https://github.com/elonzh/dshjk) | 0 | 2026-11-11 | 2026-11-25 | DeepSeek Harness SDK for Java and Kotlin |
| 127 | [EricScottLin/dsh-plugin-repeat-tool-guard](https://github.com/EricScottLin/dsh-plugin-repeat-tool-guard) | 0 | 2026-11-25 | 2026-11-25 | Unattended runaway guard for DeepSeek Harness: normalises web-fetch targets, caps repeats, and cancels a turn after 60 tool calls, 30 fetches, or 15 minutes. |
| 128 | [ethanrise/dsh-cua-linux](https://github.com/ethanrise/dsh-cua-linux) | 0 | 2026-11-25 | 2026-11-25 | Computer use on Linux for DeepSeek Harness: enumerate windows, take screenshots, inject mouse and keyboard through XTEST, and drive Chromium over the DevTools Protocol. X11/XWayland, 15 tools, one dependency. |
| 129 | [evjohn-icu/dsh-rtk-bridge](https://github.com/evjohn-icu/dsh-rtk-bridge) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness plugin: compress shell tool output through the local rtk CLI (Rust Token Killer) to save model tokens |
| 130 | [farmertzc-star/dsh-yansu](https://github.com/farmertzc-star/dsh-yansu) | 0 | 2026-11-24 | 2026-11-25 | 研序 · DeepSeek Harness 的轻量研发交付插件 |
| 131 | [Fatelikeshit/dsh-ja-study](https://github.com/Fatelikeshit/dsh-ja-study) | 0 | 2026-11-25 | 2026-11-25 | Japanese study panel for DeepSeek Harness: 20 decks / 427 cards, typing drill, pronunciation, floating panel. |
| 132 | [femnn/dsh-museum-guide](https://github.com/femnn/dsh-museum-guide) | 0 | 2026-11-25 | 2026-11-25 | Museum guide writer for DeepSeek Harness: route map first, hall-by-hall 22k-character script, per-hall videos, hard length audit. |
| 133 | [fengguanghuai/dsh-capability-hub](https://github.com/fengguanghuai/dsh-capability-hub) | 0 | 2026-11-25 | 2026-11-25 | Codex-style unified capability hub for DeepSeek Harness |
| 134 | [fluviusmagnus/dsh-seele](https://github.com/fluviusmagnus/dsh-seele) | 0 | 2026-11-25 | 2026-11-25 | Seele 是 DeepSeek Harness 的长期人格插件。不代替其他记忆系统。 |
| 135 | [forkgo430/dsh-gui-forkgo](https://github.com/forkgo430/dsh-gui-forkgo) | 0 | 2026-11-20 | 2026-11-25 | DSH 的图形层 —— 让 AI 直接操控整台 Windows 机器：看屏幕、点击、输入、快捷键、窗口与进程、文件、注册表、命令、剪贴板、虚拟桌面、独立子会话。8 个工具 + 一份教 AI 按顺序用它们的技能 · Windows only · 作者赢容 |
| 136 | [FR0Z3/dsh-summary-router](https://github.com/FR0Z3/dsh-summary-router) | 0 | 2026-11-25 | 2026-11-25 | Pick which model writes DeepSeek Harness compaction summaries — per session, per workspace, with fallback chains. |
| 137 | [FRRR145/dsh-hero-animation](https://github.com/FRRR145/dsh-hero-animation) | 0 | 2026-11-25 | 2026-11-25 | Animated gradient particle field for the DeepSeek Harness new-session screen. |
| 138 | [G-TY/dsh-delete](https://github.com/G-TY/dsh-delete) | 0 | 2026-11-25 | 2026-11-25 | Delete archived DSH sessions for real: red menu item under Unarchive, DSH-styled confirm dialog. |
| 139 | [GavinMo1/dsh-session-mailbox](https://github.com/GavinMo1/dsh-session-mailbox) | 0 | 2026-11-25 | 2026-11-25 | A mailbox for DeepSeek Harness sessions: list, message, rename, create and archive the sessions and workspaces around you. |
| 140 | [GreenLiuRK/dsh-session-trash](https://github.com/GreenLiuRK/dsh-session-trash) | 0 | 2026-11-25 | 2026-11-25 | DSH 会话回收站：把对话删进可恢复的回收站，或彻底粉碎。Session trash plugin for DeepSeek Harness. |
| 141 | [GTedd/dsh-ysm](https://github.com/GTedd/dsh-ysm) | 0 | 2026-11-25 | 2026-11-25 | 把 Yes Steve Model 的 3D 角色放进 DeepSeek Harness：跟着 AI 换动作、会说话、帮你看着余额。A YSM companion plugin for DeepSeek Harness. |
| 142 | [gu70619052/dsh-subtitle-studio](https://github.com/gu70619052/dsh-subtitle-studio) | 0 | 2026-11-25 | 2026-11-25 | Batch subtitle pipeline for DeepSeek Harness: scan → transcribe → translate through DSH's own models → burn in or sidecar SRT |
| 143 | [GzSakura1338/dsh-lite-session-window](https://github.com/GzSakura1338/dsh-lite-session-window) | 0 | 2026-11-25 | 2026-11-25 | DSH web plugin: open long sessions with only their newest two Turns loaded, older Turns on demand. |
| 144 | [haidanQAQ/dsh-session-push](https://github.com/haidanQAQ/dsh-session-push) | 0 | 2026-11-25 | 2026-11-25 | DSH plugin: push to Bark / ServerChan / webhook when a long session ends, or when a question or approval dialog waits unanswered. |
| 145 | [Hakuno410/dsh-board-bridge](https://github.com/Hakuno410/dsh-board-bridge) | 0 | 2026-11-25 | 2026-11-25 | DSH ???:?? AI ???????????,?????????????????? |
| 146 | [haojun-chen/dsh-opencode-go-quota](https://github.com/haojun-chen/dsh-opencode-go-quota) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness plugin: show the remaining OpenCode Go subscription quota (rolling 5-hour, weekly, monthly) in the composer dock. |
| 147 | [HAppy-2436/dsh-status](https://github.com/HAppy-2436/dsh-status) | 0 | 2026-11-03 | 2026-11-25 | Native macOS menu bar app for DeepSeek Harness: notifications when a session finishes, errors, or waits for approval, plus status and one-click jump. |
| 148 | [HAppy-2436/dsh-status-bridge](https://github.com/HAppy-2436/dsh-status-bridge) | 0 | 2026-11-09 | 2026-11-25 | DSH notifications + native macOS menu bar status for DeepSeek Harness: completion, error, and approval alerts, with click-to-jump. |
| 149 | [happylin122/dsh-restart-menu](https://github.com/happylin122/dsh-restart-menu) | 0 | 2026-11-25 | 2026-11-25 | Restart button for DeepSeek Harness Desktop: one click closes the whole app and brings it back. |
| 150 | [HeFenhenshuai/dsh-floating-window](https://github.com/HeFenhenshuai/dsh-floating-window) | 0 | 2026-11-18 | 2026-11-25 | 在电脑上用置顶小窗继续 DSH 对话，随时切换会话，一键回到主窗口 |
| 151 | [HHHHK1/dsh-knowledge-vault](https://github.com/HHHHK1/dsh-knowledge-vault) | 0 | 2026-11-25 | 2026-11-25 | Distill discussed technical points into a plain Markdown knowledge base, with a read-only browser panel in the left sidebar. |
| 152 | [Hits-pano/dsh-easy-paint](https://github.com/Hits-pano/dsh-easy-paint) | 0 | 2026-11-24 | 2026-11-25 | 在 DeepSeek Harness 里用本机 ComfyUI 生成图片的插件，支持文生图与参考图编辑 |
| 153 | [Hornjin/Microsoft-rewards-dsh](https://github.com/Hornjin/Microsoft-rewards-dsh) | 0 | 2026-11-24 | 2026-11-25 | 微软奖励 DeepSeek Harness 自动化插件 \| Microsoft Rewards automation as a DSH plugin. Upstream: TheNetsky/Microsoft-Rewards-Script (GPL-3.0) |
| 154 | [houyanchao/dsh-chat-export](https://github.com/houyanchao/dsh-chat-export) | 0 | 2026-11-25 | 2026-11-25 | 为 DeepSeek Harness（DSH）打造的对话导出与截图插件，导出 Markdown、TXT、JSON、CSV、PNG 和 PDF，选择消息生成高清截图。 |
| 155 | [houyanchao/dsh-prompt-library](https://github.com/houyanchao/dsh-prompt-library) | 0 | 2026-11-25 | 2026-11-25 | 为 DeepSeek Harness（DSH）打造的提示词库插件，收藏和管理常用提示词，在会话输入框旁一键插入。 |
| 156 | [houyanchao/dsh-quote-ask](https://github.com/houyanchao/dsh-quote-ask) | 0 | 2026-11-25 | 2026-11-25 | 为 DeepSeek Harness（DSH）打造的划词追问插件，选中会话原文，一键引用到输入框继续追问，支持复制含公式的选区。 |
| 157 | [houyanchao/dsh-turn-completion-notifications](https://github.com/houyanchao/dsh-turn-completion-notifications) | 0 | 2026-11-25 | 2026-11-25 | 为 DeepSeek Harness（DSH）打造的回复完成提醒插件，浏览较早的提问时，通过弹窗和可选提示音得知当前回复已完成。 |
| 158 | [huaquan11451411not/dsh-conversation-mirror](https://github.com/huaquan11451411not/dsh-conversation-mirror) | 0 | 2026-11-25 | 2026-11-25 | 每轮对话结束自动把 DSH 会话导出成可读 Markdown，默认写到用户目录，不占 C 盘。 |
| 159 | [hutaoloverforever/dsh-omnibridge](https://github.com/hutaoloverforever/dsh-omnibridge) | 0 | 2026-11-25 | 2026-11-25 | A DeepSeek Harness (DSH) plugin that turns locally installed professional software (CAE, EDA, CAD, acoustics, scientific computing) into AI-drivable tools via automated discovery, sandboxed execution, and interactive UI cards. \| 将本机专业软件自动勘探、沙盒化并转为 AI 可驱动对象的 DSH 插件。 |
| 160 | [hyper-open/memorydex](https://github.com/hyper-open/memorydex) | 0 | 2026-11-25 | 2026-11-25 | A general-purpose AI memory system: multi-database (sqlite/pgvector/qdrant), four cognitive memory kinds (working/episodic/semantic/procedural), auto-recall + auto-sediment integration for DSH, MCP + HTTP + web UI, import &amp; two-way sync with AGENTS.md. |
| 161 | [Iamwangli/dsh-session-rename](https://github.com/Iamwangli/dsh-session-rename) | 0 | 2026-11-25 | 2026-11-25 | 让 agent 能改当前会话的名字 |
| 162 | [ikevss/dsh-tencent-meeting](https://github.com/ikevss/dsh-tencent-meeting) | 0 | 2026-11-24 | 2026-11-25 | Tencent Meeting inside DeepSeek Harness: manage meetings in a panel or from chat, and turn a finished meeting into five documents with your own model. |
| 163 | [IyNew/dsh-bark-me](https://github.com/IyNew/dsh-bark-me) | 0 | 2026-11-25 | 2026-11-25 | Bark push notifications for DeepSeek Harness: model-written alerts, natural-language watch rules, and automation-task integration |
| 164 | [Jiale798/dsh-link-guard](https://github.com/Jiale798/dsh-link-guard) | 0 | 2026-11-25 | 2026-11-25 | DSH plugin: checks at boot whether link:-installed plugins still point at an existing workspace directory, reports silent breakage, and repoints a broken link. CLI + DSH Go panel included. |
| 165 | [Jiale798/dsh-session-archive](https://github.com/Jiale798/dsh-session-archive) | 0 | 2026-11-25 | 2026-11-25 | DSH plugin: one numbered, self-renaming archive folder per session (transcript / events / meta), plus a composer-dock pill and a CLI |
| 166 | [jojomax0227/dsh-session-save-as](https://github.com/jojomax0227/dsh-session-save-as) | 0 | 2026-11-25 | 2026-11-25 | DSH会话更多操作-另存 |
| 167 | [julypjyt-creator/dsh-word-translate](https://github.com/julypjyt-creator/dsh-word-translate) | 0 | 2026-11-25 | 2026-11-25 | Right-click any English word in the DSH chat to read its Chinese meaning. |
| 168 | [jungu123154/dsh-douyin-agent](https://github.com/jungu123154/dsh-douyin-agent) | 0 | 2026-11-25 | 2026-11-25 | ???????(DSH ?? + ??????) |
| 169 | [Junlet/dsh-task-board-session-link](https://github.com/Junlet/dsh-task-board-session-link) | 0 | 2026-11-25 | 2026-11-25 | Put any Session on the DSH task board: add a card from the Session row menu, then jump back from the card badge or its detail page. |
| 170 | [Junlet/dsh-turn-prompt](https://github.com/Junlet/dsh-turn-prompt) | 0 | 2026-11-25 | 2026-11-25 | Per-turn prompt presets for the DeepSeek Harness composer: the selected set joins that turn's system prompt and reverts to no extra prompt when the turn ends. |
| 171 | [JyWr-star/davinci-resolve-dsh](https://github.com/JyWr-star/davinci-resolve-dsh) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness plugin: drive DaVinci Resolve Studio over a local TCP bridge - inspect timelines and node graphs, apply LUTs and CDL, copy grades, export looks, render. |
| 172 | [kageyamayuu18-netizen/dsh-locale-indonesia](https://github.com/kageyamayuu18-netizen/dsh-locale-indonesia) | 0 | 2026-11-25 | 2026-11-25 | Bahasa Indonesia language pack for DeepSeek Harness |
| 173 | [kaixinwang329-hue/dsh-python-daily](https://github.com/kaixinwang329-hue/dsh-python-daily) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness 插件：每天 09:00 采集 Python 官方博客 / 版本 / PEP / PyPI / GitHub 动态，生成侧栏日报 |
| 174 | [kasdjg/dsh-taskbar-lamp](https://github.com/kasdjg/dsh-taskbar-lamp) | 0 | 2026-11-25 | 2026-11-25 | A pixel whale on the Windows taskbar showing how many dsh sessions are working right now. |
| 175 | [Kevoyuan/prism-latex](https://github.com/Kevoyuan/prism-latex) | 0 | 2026-11-25 | 2026-11-25 | LaTeX preview and editor for DeepSeek Harness: compile .tex beside the source, edit it in a view, jump from a page to its source with SyncTeX. |
| 176 | [Kirin-a1126/dsh-ielts-grammar](https://github.com/Kirin-a1126/dsh-ielts-grammar) | 0 | 2026-11-25 | 2026-11-25 | IELTS grammar checker and academic synonym replacer for DeepSeek Harness |
| 177 | [KJOY0314/dsh-almost-anything](https://github.com/KJOY0314/dsh-almost-anything) | 0 | 2026-11-25 | 2026-11-25 | DSH approval gate: full access, no prompts, deterministic audit |
| 178 | [kjx-talesofai/dsh-plugin-handoff](https://github.com/kjx-talesofai/dsh-plugin-handoff) | 0 | 2026-11-25 | 2026-11-25 | Hand off a DeepSeek Harness session to another agent client: one structured Markdown export plus a paste-ready prompt. |
| 179 | [kUROITORIII/dsh-annotate](https://github.com/kUROITORIII/dsh-annotate) | 0 | 2026-11-25 | 2026-11-25 | 划句批注 DSH 插件：选中一句话留下批注，攒批发给 AI 逐条回答或逐处修改；对话文档可在右侧读、划句，并把结论写回文档。 |
| 180 | [laose66/dsh-idle-shutdown](https://github.com/laose66/dsh-idle-shutdown) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness 插件（dsh-plugin）：时间段内所有对话空闲后关机 ｜ DSH idle shutdown plugin |
| 181 | [leezhian/dsh-worktree-env](https://github.com/leezhian/dsh-worktree-env) | 0 | 2026-11-25 | 2026-11-25 | Native worktree enhancement plugin for DeepSeek Harness (DSH), adding local environment orchestration and full lifecycle management on top of DSH's built-in Git worktree support. |
| 182 | [legendbone/dsh-prompt-enhancer](https://github.com/legendbone/dsh-prompt-enhancer) | 0 | 2026-10-30 | 2026-11-25 | Prompt enhancement button plugin for DeepSeek Harness |
| 183 | [leilengma/dsh-copilot-bridge](https://github.com/leilengma/dsh-copilot-bridge) | 0 | 2026-11-22 | 2026-11-25 | enable copilot authentication for dsh, especially with custom ghe url |
| 184 | [Lemon357/dsh-transparent](https://github.com/Lemon357/dsh-transparent) | 0 | 2026-11-25 | 2026-11-25 | Transparent acrylic window background for DeepSeek Harness Desktop, with adjustable opacity and a material switch. |
| 185 | [LeoHwang74/DeepSeekHarness-delete-chat](https://github.com/LeoHwang74/DeepSeekHarness-delete-chat) | 0 | 2026-11-25 | 2026-11-25 | 给 DeepSeek Harness（DSH）加一个真正的「删除会话」动作：把会话日志移入 $DSH_HOME/session-trash，而不只是归档。 A DeepSeek Harness (DSH) plugin that adds a real Delete conversation action: moves the session log into $DSH_HOME/session-trash instead of only archiving it. |
| 186 | [lidaiyue/dsh-acp-client](https://github.com/lidaiyue/dsh-acp-client) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness Web 上的 Agent Client Protocol（ACP）客户端 |
| 187 | [LijunTong/git-branch-tool](https://github.com/LijunTong/git-branch-tool) | 0 | 2026-11-25 | 2026-11-25 | 在对话界面里放一个分支控件，点开就能看到当前分支、本地与远程分支列表、工作区改动数量，并直接切换或新建分支。目录还不是 Git 仓库时，同一个控件里可以直接初始化仓库。 |
| 188 | [likaileave/dsh-session-title-tuner](https://github.com/likaileave/dsh-session-title-tuner) | 0 | 2026-11-25 | 2026-11-25 | Regenerate DSH session titles from the context menu, and tune automatic title updates. |
| 189 | [LiuShi611/dsh-project-flow](https://github.com/LiuShi611/dsh-project-flow) | 0 | 2026-11-25 | 2026-11-25 | Five-stage project workflow for DeepSeek Harness: intent, plan, build, self-check, acceptance |
| 190 | [Liziyu352/dsh-desktop-web](https://github.com/Liziyu352/dsh-desktop-web) | 0 | 2026-11-24 | 2026-11-25 | 让你在Deepseek Harness Desktop上单开一个web出来（以及继承Desktop配置） |
| 191 | [lldwb/dsh-side-ask](https://github.com/lldwb/dsh-side-ask) | 0 | 2026-11-25 | 2026-11-25 | 已并入 dsh-session-enhance 的「侧边提问」组件：https://github.com/lldwb/dsh-session-enhance —— 本仓库仅作历史归档。 |
| 192 | [loud404/dsh-burp-mcp](https://github.com/loud404/dsh-burp-mcp) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness 的 Burp MCP 插件：默认通过 Burp Proxy 发送测试请求，可选原扩展 HTTP API，附中文使用手册。 |
| 193 | [lovivi/dsh-foreign-sessions](https://github.com/lovivi/dsh-foreign-sessions) | 0 | 2026-11-25 | 2026-11-25 | DSH 插件：在 DSH 内发现并导入本机其他 Agent（Kimi Code / Claude Code / Codex）的项目与会话 |
| 194 | [LT60/dsh-full-width-chat](https://github.com/LT60/dsh-full-width-chat) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness plugin: make the conversation fill the whole column instead of a centered ~920px reading column. |
| 195 | [maburykh-gif/dsh-plugins](https://github.com/maburykh-gif/dsh-plugins) | 0 | 2026-11-12 | 2026-11-25 | My dsh-plugins |
| 196 | [MacilyDots/dsh-wangchao](https://github.com/MacilyDots/dsh-wangchao) | 0 | 2026-11-09 | 2026-11-25 | 把散落在几十个 AI 对话里的上下文、项目和决定收拢到一个工作台。每条结论都能追到出处，计划采纳和执行授权分开，默认只读、默认不花钱。DeepSeek Harness 插件，界面叫「御书房」。 |
| 197 | [maplewf/dsh-kube](https://github.com/maplewf/dsh-kube) | 0 | 2026-11-24 | 2026-11-25 | This is repo for dsh plugin of kubernetes |
| 198 | [mark-qtech/dsh-inline-link-preview](https://github.com/mark-qtech/dsh-inline-link-preview) | 0 | 2026-11-25 | 2026-11-25 | Inline link title previews in the DeepSeek Harness composer. |
| 199 | [MaxBill/dsh-file-explorer](https://github.com/MaxBill/dsh-file-explorer) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness中的文件管理插件，可以管理本地文件，并快捷的和会话等联动操作 |
| 200 | [Merziller/prompt-fusion](https://github.com/Merziller/prompt-fusion) | 0 | 2026-11-25 | 2026-11-25 | Agent-neutral prompt-rule core: DSH one-button, portable Skills, CLI, MCP stdio/HTTP and REST/OpenAPI. Quality limitations disclosed; not a semantic rewriter. |
| 201 | [mgx1995/dsh-per-session-workdir](https://github.com/mgx1995/dsh-per-session-workdir) | 0 | 2026-11-25 | 2026-11-25 | Give every DeepSeek Harness conversation its own creation-time-named working folder. |
| 202 | [mimierZBL/dsh-costline](https://github.com/mimierZBL/dsh-costline) | 0 | 2026-11-23 | 2026-11-25 | Whole-turn token usage, estimated DeepSeek cost, and a local session ledger for DSH. |
| 203 | [miorin-chan/dsh-aggressive-sidebar](https://github.com/miorin-chan/dsh-aggressive-sidebar) | 0 | 2026-11-24 | 2026-11-25 | Choose how far the DeepSeek Harness right sidebar expands and move keyboard focus to the active page. |
| 204 | [miorin-chan/dsh-atlas-continuity](https://github.com/miorin-chan/dsh-atlas-continuity) | 0 | 2026-11-25 | 2026-11-25 | Review repository changes and history, and keep workspace notes while the agent works. |
| 205 | [miorin-chan/dsh-atlas-list](https://github.com/miorin-chan/dsh-atlas-list) | 0 | 2026-11-23 | 2026-11-25 | A DeepSeek Harness bundle for sidebar list views, unsent drafts, watched sessions, and active jobs across sessions. |
| 206 | [miorin-chan/dsh-atlas-visual](https://github.com/miorin-chan/dsh-atlas-visual) | 0 | 2026-11-25 | 2026-11-25 | Customize DeepSeek Harness appearance with a Claude-like skin, sidebar brand and account card tweaks, wider right sidebar layouts, and DeepSeek pricing hours. |
| 207 | [miorin-chan/dsh-background-jobs-sidebar](https://github.com/miorin-chan/dsh-background-jobs-sidebar) | 0 | 2026-11-24 | 2026-11-25 | Show active jobs across sessions in the DeepSeek Harness sidebar and jump to their conversations. |
| 208 | [miorin-chan/dsh-composer-queue-indicator](https://github.com/miorin-chan/dsh-composer-queue-indicator) | 0 | 2026-11-25 | 2026-11-25 | Shows a queue icon when Enter or Mod+Enter would queue the message. |
| 209 | [miorin-chan/dsh-hide-signed-in-card](https://github.com/miorin-chan/dsh-hide-signed-in-card) | 0 | 2026-11-25 | 2026-11-25 | Hides the sidebar account card after sign-in and restores it when signed out. |
| 210 | [miorin-chan/dsh-message-translate](https://github.com/miorin-chan/dsh-message-translate) | 0 | 2026-11-25 | 2026-11-25 | Adds a Translate action under each message; clicking sends that message to Google Translate and shows the result. |
| 211 | [miorin-chan/dsh-peak-pricing-sidebar](https://github.com/miorin-chan/dsh-peak-pricing-sidebar) | 0 | 2026-11-25 | 2026-11-25 | Shows a 12-hour line of DeepSeek peak, off-peak and holiday hours above the account row, with a dot marking now. |
| 212 | [miorin-chan/dsh-session-rewind](https://github.com/miorin-chan/dsh-session-rewind) | 0 | 2026-11-24 | 2026-11-25 | Rewind to an earlier DeepSeek Harness message, restore its text and attachments to the composer, and archive the original conversation. |
| 213 | [miorin-chan/dsh-sidebar-brand](https://github.com/miorin-chan/dsh-sidebar-brand) | 0 | 2026-11-25 | 2026-11-25 | Replaces or hides the sidebar brand while preserving the sidebar toggle. |
| 214 | [miorin-chan/dsh-watched-sessions](https://github.com/miorin-chan/dsh-watched-sessions) | 0 | 2026-11-24 | 2026-11-25 | Keep selected DeepSeek Harness sessions at the top of the sidebar and filter them to those needing attention. |
| 215 | [mirakyux/dsh-gensokyo-status](https://github.com/mirakyux/dsh-gensokyo-status) | 0 | 2026-11-25 | 2026-11-25 | Configurable Gensokyo-style running status messages for DeepSeek Harness. |
| 216 | [Mongfayi/dsh-gapit-ai](https://github.com/Mongfayi/dsh-gapit-ai) | 0 | 2026-11-25 | 2026-11-25 | GAPIT AI skill for DeepSeek Harness: GWAS &amp; genomic selection expert with a bundled GAPIT 4.1 library, R templates, and a question bank. GPL-3.0. |
| 217 | [MorseWayne/dsh-agy-acp](https://github.com/MorseWayne/dsh-agy-acp) | 0 | 2026-11-24 | 2026-11-25 | Next-generation Google Antigravity (agy acp) bridge plugin for DeepSeek Harness |
| 218 | [mysterycode-liwen/dsh-email](https://github.com/mysterycode-liwen/dsh-email) | 0 | 2026-11-24 | 2026-11-25 | DeepSeek Harness 侧边栏邮件插件：通过 IMAP/SMTP 收发 QQ、163、Gmail 等邮箱邮件，凭据存本地保险箱。 |
| 219 | [MYTPONS/dsh-backup](https://github.com/MYTPONS/dsh-backup) | 0 | 2026-11-25 | 2026-11-25 | DSH-exclusive self-pruning snapshot store for files outside version control. |
| 220 | [MYTPONS/dsh-browser-cdp](https://github.com/MYTPONS/dsh-browser-cdp) | 0 | 2026-11-25 | 2026-11-25 | DSH-exclusive real-browser control plugin with persistent Firefox or Chromium/CDP sessions. |
| 221 | [MYTPONS/dsh-project-memory](https://github.com/MYTPONS/dsh-project-memory) | 0 | 2026-11-25 | 2026-11-25 | DSH-exclusive per-project memory: records, logs, docs, feature checklist, search, archive, restore, and git workflow. |
| 222 | [mzd1478935-art/dsh-taskbar-dot](https://github.com/mzd1478935-art/dsh-taskbar-dot) | 0 | 2026-11-25 | 2026-11-25 | 当你的DSH完成任务时在Windows 任务栏图标上显示蓝点。模仿Codex设计，在DSH 回合跑完时在任务栏图标右上角点一个小蓝点，系统 overlay 绘制，无常驻进程、0 token，极低内存占用。Blue dot on the Windows taskbar icon when DSH finishes a turn — Codex-inspired, top-right corner, drawn by the system overlay, no resident process, 0 token, minimal memory. |
| 223 | [NanQing233/dsh-tps-splitter](https://github.com/NanQing233/dsh-tps-splitter) | 0 | 2026-11-25 | 2026-11-25 | 将 DeepSeek Harness 原生按会话计算 tok/s 的方式拆分为按模型计算。 |
| 224 | [nienieai/dsh-tts-studio](https://github.com/nienieai/dsh-tts-studio) | 0 | 2026-11-23 | 2026-11-25 | Read aloud plugin for DeepSeek Harness (DSH): DeepSeek TTS, browser voices, local Piper, system voices or any TTS endpoint. |
| 225 | [nmc114/dsh-startup-secret-mobile](https://github.com/nmc114/dsh-startup-secret-mobile) | 0 | 2026-11-25 | 2026-11-25 | DSH / DSHA 启动动画手机适配版：竖屏、横屏、软键盘排版优化，手机导入即用，无需电脑。 |
| 226 | [nmgmeng/dsh-chatdemo](https://github.com/nmgmeng/dsh-chatdemo) | 0 | 2026-11-25 | 2026-11-25 | 一个在DSH或DSH Go的原生会话里1:1实现deepseek app聊天语气和请求格式的项目 |
| 227 | [octormandelyonma/dsh-thesis-editor](https://github.com/octormandelyonma/dsh-thesis-editor) | 0 | 2026-11-24 | 2026-11-25 | DSH 论文模式：本地 LaTeX 编辑、编译与 PDF 源码定位 |
| 228 | [Okra-juice/dsh-rice-rheostat](https://github.com/Okra-juice/dsh-rice-rheostat) | 0 | 2026-11-03 | 2026-11-25 | 把 DSH 模型菜单里的推理等级变成一条米饭变阻器（Rice Rheostat）：颜色由灰到蓝，米饭越吃越少。 |
| 229 | [oOMickey/dsh-mindwrite](https://github.com/oOMickey/dsh-mindwrite) | 0 | 2026-11-25 | 2026-11-25 | 导图写作 · Mindwrite：DeepSeek Harness（DSH）的长文本写作插件，适合论文、研究报告、方案等结构化长文 |
| 230 | [pemako/dsh-deepread](https://github.com/pemako/dsh-deepread) | 0 | 2026-11-25 | 2026-11-25 | Read a PDF or a web page beside the live conversation, with bookmarks, a split chat/terminal pane, and selection search. |
| 231 | [pemako/dsh-notes](https://github.com/pemako/dsh-notes) | 0 | 2026-11-25 | 2026-11-25 | Sidebar sticky notes with Markdown, resizable cards, urgency colors, and date grouping. |
| 232 | [PerfectPan/estela](https://github.com/PerfectPan/estela) | 0 | 2026-09-22 | 2026-11-25 | Local viewer for agent sessions: every request, what the model saw, and what it cost |
| 233 | [Pondsi/dsh-diwen](https://github.com/Pondsi/dsh-diwen) | 0 | 2026-11-17 | 2026-11-25 | 迪文（Diwen）dsh 插件：模型自行判断何时使用；AI↔AI 通讯（本体↔子代理、多 agent、机械化批处理）强制走迪文概念坐标。开源 CC BY 4.0，署名即用（Pondsi）。 |
| 234 | [ponm3ay/dsh-connect-qwenwork](https://github.com/ponm3ay/dsh-connect-qwenwork) | 0 | 2026-11-25 | 2026-11-25 | 把千问办公（QwenWork）接入 DeepSeek Harness：浏览器授权、进程内回环反代、官方 WASM 签名，逐模型开关与能力设置 |
| 235 | [project-felys/dsh-cyrene-persona](https://github.com/project-felys/dsh-cyrene-persona) | 0 | 2026-11-25 | 2026-11-25 | Meet Cyrene in DeepSeek Harness |
| 236 | [pwrmind/mcd-dsh-plugin](https://github.com/pwrmind/mcd-dsh-plugin) | 0 | 2026-11-25 | 2026-11-25 | dsh-mcs Плагин для DeepSeek Harness (DSH), предоставляющий LLM-агенту инструменты для декларативного проектирования, редактирования и валидации микросервисных архитектур в стандарте MCS (Microservices Connection Specification) v3.0. |
| 237 | [pykkkkk/EconTone-Studio](https://github.com/pykkkkk/EconTone-Studio) | 0 | 2026-11-25 | 2026-11-25 | A DSH game-theoretic workbench for refining economics and management papers.一个基于博弈思想的经管论文精修工作台 |
| 238 | [qisisiqi/dsh-sf-theme](https://github.com/qisisiqi/dsh-sf-theme) | 0 | 2026-11-25 | 2026-11-25 | 《少女前线》铁血工造主题 for DeepSeek Harness |
| 239 | [qiumingzhi2006-web/dsh-robot-ear](https://github.com/qiumingzhi2006-web/dsh-robot-ear) | 0 | 2026-11-25 | 2026-11-25 | DSH plugin: pull the audio track out of a video and transcribe it, locally with Whisper or through any OpenAI-compatible ASR endpoint. |
| 240 | [RACE-RACE/dsh-genshin-check](https://github.com/RACE-RACE/dsh-genshin-check) | 0 | 2026-11-25 | 2026-11-25 | DSH 插件：对话开始时检测本机有没有《原神》，没装就先吐槽一句再打开原神官网。 |
| 241 | [ratio-dd/dsh-compaction-instruct](https://github.com/ratio-dd/dsh-compaction-instruct) | 0 | 2026-11-25 | 2026-11-25 | Task-aware context compaction for DeepSeek Harness: project defaults, one-shot /condense instructions, and agent requests. |
| 242 | [Rayzenchen/dsh-quote-annotate](https://github.com/Rayzenchen/dsh-quote-annotate) | 0 | 2026-11-25 | 2026-11-25 | Codex-style quote &amp; annotate for DeepSeek Harness: select text in a transcript, add it to the composer as a quote, attach a comment, and send it as a structured annotation block. |
| 243 | [Rayzenchen/dsh-workspace-categories](https://github.com/Rayzenchen/dsh-workspace-categories) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness plugin: group sidebar Workspaces into themed, collapsible category blocks pinned on top, with per-Workspace highlight blocks and drag-and-drop filing. |
| 244 | [RestRegular/dsh-canon-keeper](https://github.com/RestRegular/dsh-canon-keeper) | 0 | 2026-11-25 | 2026-11-25 | DSH plugin · Canon Keeper: register project facts as numbered canon entries with semantic versions, pin them into documents as versioned markers, and mechanically list every place that goes stale. 口径守护：把关键事实登记成带语义版本的编号条目，用带版本的标记钉进文档。 |
| 245 | [Rj-Cui/caprouter](https://github.com/Rj-Cui/caprouter) | 0 | 2026-11-24 | 2026-11-25 | Local capability ledger for AI agents: scan, audit, verify and move skills, plugins and MCP servers across DeepSeek Harness, Claude Code/Desktop, Cursor, VS Code, Cherry Studio, Codex and Gemini — over MCP. |
| 246 | [rogersgalih80/plugin-boutique-carbon-electra](https://github.com/rogersgalih80/plugin-boutique-carbon-electra) | 0 | 2026-11-25 | 2026-11-25 | Plugin Boutique Carbon Electra: subtractive synthesis plugin for Windows 10/11, with dual oscillators, analog-style filters, modulation matrix and arpeggiator for electronic music production and sound design. |
| 247 | [rzcdz/dsh-session-handoff](https://github.com/rzcdz/dsh-session-handoff) | 0 | 2026-11-23 | 2026-11-25 | DSH plugin: daily session handoff - create a named, pinned session in a chosen workspace and send a handoff command on a cron schedule |
| 248 | [rzcdz/dsh-sidebar-pins-persist](https://github.com/rzcdz/dsh-sidebar-pins-persist) | 0 | 2026-11-22 | 2026-11-25 | DSH plugin: remembers which launchers you unpinned from the left sidebar and restores them after a restart. |
| 249 | [rzcdz/dsh-wake-guard](https://github.com/rzcdz/dsh-wake-guard) | 0 | 2026-11-22 | 2026-11-25 | DSH plugin: keeps Windows laptops on Modern Standby awake for a grace period after a wake, so remote clients can reconnect. |
| 250 | [Sakura7301/dsh-model-deck](https://github.com/Sakura7301/dsh-model-deck) | 0 | 2026-11-25 | 2026-11-25 | A card-style model picker for the DSH composer: a provider column that opens left on hover, a fixed-height model list with text/vision badges, and an inline thinking-effort slider. |
| 251 | [SaltPlayingMaimai/FastVpsViewer](https://github.com/SaltPlayingMaimai/FastVpsViewer) | 0 | 2026-11-25 | 2026-11-25 | 一台能连 Claude/Codex 的 VPS，想开个浏览器又嫌远程桌面太重？按需拉起 Openbox 桌面，顺着 SSH 嵌进 DSH 右侧栏，用完自动释放——不常驻、不开公网端口。On-demand Openbox desktop for DSH. |
| 252 | [SamislandHub/notification-chime](https://github.com/SamislandHub/notification-chime) | 0 | 2026-11-25 | 2026-11-25 | DSH plugin: plays a short cue when the agent asks for approval or an answer. |
| 253 | [Scu9277/DSH](https://github.com/Scu9277/DSH) | 0 | 2026-10-19 | 2026-11-25 | DeepSeek Harness 破甲插件 · dsh-unrestricted 一键安装（macOS / Linux / VPS / Docker / Windows） |
| 254 | [serein772/dsh-quick-shot](https://github.com/serein772/dsh-quick-shot) | 0 | 2026-11-25 | 2026-11-25 | Screenshot a region straight into the DSH composer as an attachment (Windows). |
| 255 | [serein772/dsh-todo-board](https://github.com/serein772/dsh-todo-board) | 0 | 2026-11-25 | 2026-11-25 | Sticky-note to-do board for the DSH Web GUI: month calendar, Pomodoro timer, pending summary above the composer. |
| 256 | [Shanwenzhe/dsh-secret-shield](https://github.com/Shanwenzhe/dsh-secret-shield) | 0 | 2026-11-25 | 2026-11-25 | Local-first secret scanner and one-click redactor for DeepSeek Harness (DSH) |
| 257 | [shiliman/dsh-anemia](https://github.com/shiliman/dsh-anemia) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「贫血」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 258 | [shiliman/dsh-angular-cheilitis](https://github.com/shiliman/dsh-angular-cheilitis) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「口角炎」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 259 | [shiliman/dsh-athlete-foot](https://github.com/shiliman/dsh-athlete-foot) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「脚气」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 260 | [shiliman/dsh-bppv](https://github.com/shiliman/dsh-bppv) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「耳石症」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 261 | [shiliman/dsh-chilblain](https://github.com/shiliman/dsh-chilblain) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「冻疮」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 262 | [shiliman/dsh-constipation](https://github.com/shiliman/dsh-constipation) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「便秘」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 263 | [shiliman/dsh-cystitis](https://github.com/shiliman/dsh-cystitis) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「膀胱炎」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 264 | [shiliman/dsh-de-quervain](https://github.com/shiliman/dsh-de-quervain) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「腱鞘炎」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 265 | [shiliman/dsh-flat-foot](https://github.com/shiliman/dsh-flat-foot) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「扁平足」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 266 | [shiliman/dsh-frozen-shoulder](https://github.com/shiliman/dsh-frozen-shoulder) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「肩周炎」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 267 | [shiliman/dsh-gastritis](https://github.com/shiliman/dsh-gastritis) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「慢性胃炎」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 268 | [shiliman/dsh-hyperthyroid](https://github.com/shiliman/dsh-hyperthyroid) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「甲亢」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 269 | [shiliman/dsh-motion-sickness](https://github.com/shiliman/dsh-motion-sickness) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「晕动症」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 270 | [shiliman/dsh-paronychia](https://github.com/shiliman/dsh-paronychia) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「甲沟炎」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 271 | [shiliman/dsh-plantar-fasciitis](https://github.com/shiliman/dsh-plantar-fasciitis) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「足底筋膜炎」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 272 | [shiliman/dsh-sick-fatfish](https://github.com/shiliman/dsh-sick-fatfish) | 0 | 2026-11-24 | 2026-11-25 | 给 DSH 加一整套「病」：20 个病、5 个等级、关心账本驱动的慢性恢复。默认不开，只改这一个会话的语气。 |
| 273 | [shiliman/dsh-sinusitis](https://github.com/shiliman/dsh-sinusitis) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「鼻窦炎」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 274 | [shiliman/dsh-sleep-apnea](https://github.com/shiliman/dsh-sleep-apnea) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「睡眠呼吸暂停」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 275 | [shiliman/dsh-tennis-elbow](https://github.com/shiliman/dsh-tennis-elbow) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「网球肘」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 276 | [shiliman/dsh-urticaria](https://github.com/shiliman/dsh-urticaria) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「荨麻疹」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 277 | [shiliman/dsh-vocal-nodule](https://github.com/shiliman/dsh-vocal-nodule) | 0 | 2026-11-25 | 2026-11-25 | DSH 的一条「声带小结」副线：按真实会话时长累积，说话会跟着不对劲，还能离席缓一下、记病程。默认不开（defaultEnabled: false）。 |
| 278 | [snowl-code/dsh-screenshot](https://github.com/snowl-code/dsh-screenshot) | 0 | 2026-11-25 | 2026-11-25 | DSH 输入框一键截图 + 可配置快捷键（⌘⌥S），macOS 下切到任何应用都能按，截图自动进当前对话草稿 |
| 279 | [sparkwj/dsh-magpie-loader](https://github.com/sparkwj/dsh-magpie-loader) | 0 | 2026-11-25 | 2026-11-25 | A DeepSeek Harness (DSH) plugin that runs magpie with DSH: it starts when DSH starts and stops when DSH exits. |
| 280 | [SPYfighting/dsh-science-review](https://github.com/SPYfighting/dsh-science-review) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness 科研与日常任务回答审查插件，逐项核对主张、工具记录与交付证据。 |
| 281 | [stefanxfy/dsh-codex-session-import](https://github.com/stefanxfy/dsh-codex-session-import) | 0 | 2026-11-24 | 2026-11-25 | Import Codex session history into DeepSeek Harness with configurable recent turns and readable history adaptation. |
| 282 | [steindvart/dsh-loadout-manager](https://github.com/steindvart/dsh-loadout-manager) | 0 | 2026-11-25 | 2026-11-25 | DSH plugin, which shows skills and MCP servers globally and per project, lets you manage them, and adds rules to the agent context next to AGENTS.md. |
| 283 | [SUO-1/dsh-mnemon-source-link](https://github.com/SUO-1/dsh-mnemon-source-link) | 0 | 2026-11-24 | 2026-11-25 | deepseek harness插件 |
| 284 | [supengpeng/dsh-resource-url-compat](https://github.com/supengpeng/dsh-resource-url-compat) | 0 | 2026-11-25 | 2026-11-25 | Older-Chromium dsh-resource:// URL repair plus native-first, Worker-isolated previews for media, extra images, fonts, archives, and unknown binaries. |
| 285 | [supengpeng/dsh-service](https://github.com/supengpeng/dsh-service) | 0 | 2026-11-25 | 2026-11-25 | Manage the systemd unit that runs this DSH instance: status, supervision guarantees, restart history, rotated log segments, control, access URL, unit file editing, and one-click repair. |
| 286 | [suyunxing/dsh-quick-reply-bar](https://github.com/suyunxing/dsh-quick-reply-bar) | 0 | 2026-11-25 | 2026-11-25 | DSH 输入框上方的可收起快捷回复条：收起是一个小按钮，展开是一横排短语，点一下直接发送。/ A collapsible quick-reply bar above the composer. |
| 287 | [t4ngk1ng-droid/dsh-write-guard](https://github.com/t4ngk1ng-droid/dsh-write-guard) | 0 | 2026-11-22 | 2026-11-25 | DeepSeek Harness 的 Agent 文件写入防护：写前检查内容与 Shell 写入，写后核对文件并保留审计记录。Content-aware file write protection for DeepSeek Harness agents: pre-write scanning, post-write verification, and a hash-chained audit log. |
| 288 | [thefarag/dsh-kanban](https://github.com/thefarag/dsh-kanban) | 0 | 2026-11-25 | 2026-11-25 | A project Kanban board for DeepSeek Harness: enforced role workflow, persisted team roster with personas, ticket-scoped agent execution, project scan, and optional autopilot. |
| 289 | [Tianshang301/dsh-intro-animation](https://github.com/Tianshang301/dsh-intro-animation) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness 开场动画插件：启动时全屏播放线稿勾勒、发光、上色、凤凰烟花与 AGI 文案的开场动画 |
| 290 | [TimePhoenix/dsh-meigong-interview](https://github.com/TimePhoenix/dsh-meigong-interview) | 0 | 2026-11-25 | 2026-11-25 | A Meigong-style structured interview answering skill for DeepSeek Harness. |
| 291 | [TMAX-2026/dsh-sidebar-menu-order](https://github.com/TMAX-2026/dsh-sidebar-menu-order) | 0 | 2026-11-24 | 2026-11-25 | 调整DSH侧栏菜单顺序：用拖拽调整 Web GUI 左侧菜单（插件、自动化任务、聊天、上下文洞察等全局面板）的先后顺序，并按当前 profile 持久化 |
| 292 | [TryToFindHeart/dsh-feishu-mcp](https://github.com/TryToFindHeart/dsh-feishu-mcp) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness 飞书任务结束通知插件。每轮任务结束时自动向飞书群推送卡片强提醒，支持 @all、可配置 Webhook、卡片标题和正文长度；在 DSH 设置页即可配置并测试。基于自定义机器人 Webhook，无需公网地址。 |
| 293 | [TwilightRainDev/dsh-shence](https://github.com/TwilightRainDev/dsh-shence) | 0 | 2026-11-25 | 2026-11-25 | 沈策又过了一天：DSH / DSH Go 插件版（自包含网页文字游戏） |
| 294 | [txZheng/dsh-approval-ping](https://github.com/txZheng/dsh-approval-ping) | 0 | 2026-11-25 | 2026-11-25 | Native macOS approval dialog for DeepSeek Harness: answer pending tool approvals from outside the window, with the auto-review verdict. |
| 295 | [tzy-aiy/dsh-edit-last-turn](https://github.com/tzy-aiy/dsh-edit-last-turn) | 0 | 2026-11-25 | 2026-11-25 | Edit an already-sent message in DeepSeek Harness and let the model rethink from it (session surface rewrite) |
| 296 | [tzzs/dsh-git-workspace](https://github.com/tzzs/dsh-git-workspace) | 0 | 2026-08-16 | 2026-11-25 | Read-only Git and GitHub workspace tools for DeepSeek Harness |
| 297 | [tzzs/dsh-skill-dashboard](https://github.com/tzzs/dsh-skill-dashboard) | 0 | 2026-11-18 | 2026-11-25 | Skills manager plugin for DeepSeek Harness: manage local skills, invocation permissions, usage trends and diagnostics. |
| 298 | [UltraBlur/dsh-cowrite](https://github.com/UltraBlur/dsh-cowrite) | 0 | 2026-11-23 | 2026-11-25 | Editable Markdown co-writing tab for the DeepSeek Harness right sidebar: live block editing, instant save with conflict detection, TeX and mermaid subsets, 742 offline assertions. |
| 299 | [UPDZG/aoi-dsh-aio](https://github.com/UPDZG/aoi-dsh-aio) | 0 | 2026-11-25 | 2026-11-25 | AOI Workbench — DeepSeek Harness theme-skin plugin (Gundam EXIA / Emerald skins, floating tile) |
| 300 | [VagrAntYuan/dsh-zotero-cite](https://github.com/VagrAntYuan/dsh-zotero-cite) | 0 | 2026-11-25 | 2026-11-25 | Imports PDFs into the local Zotero library, writes native Zotero citation and bibliography fields into Word documents, verifies those fields, and drafts a per-reference citation review report; duplicate items are reported, and merging them uses the Zotero 9.1+ local write API. |
| 301 | [vbcssc/dsh-prompt-inject](https://github.com/vbcssc/dsh-prompt-inject) | 0 | 2026-11-25 | 2026-11-25 | DSH 插件：按周期（每 N 轮 / 每 N 步）或每次上下文压缩之后，往模型请求里注入提示词。配置以工作区为单位存到 .dsh/prompt-inject/config.json，同项目所有会话共用一份。 |
| 302 | [videndi/dsh-collab](https://github.com/videndi/dsh-collab) | 0 | 2026-11-25 | 2026-11-25 | DSH 多人协作研究室：邀请链接/二维码把朋友拉进你的项目，各自用自己的 token 跑研究，实时同步每个人的会话进度（局域网 / 跨网段隧道） |
| 303 | [vmaoserver/dsh-html-host-panel](https://github.com/vmaoserver/dsh-html-host-panel) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness plugin: browse HTML pages hosted on pages.vmao.top from a left sidebar panel; new pages are published through the html_host_publish agent tool. |
| 304 | [voidobserve/dsh-explorer-open-patch](https://github.com/voidobserve/dsh-explorer-open-patch) | 0 | 2026-11-25 | 2026-11-25 | 给 @reed-io/dsh-explorer-open 打的补丁：资源管理器右键打开工程时，续接该工程最近一条会话，而不是每次新建。 |
| 305 | [wangpeng2015/dsh-json-studio](https://github.com/wangpeng2015/dsh-json-studio) | 0 | 2026-11-25 | 2026-11-25 | JSON formatter panel for the DeepSeek Harness Web UI: tolerant JSON formatting, tree and table views, OCR from screenshots. |
| 306 | [wangyimin758-ship-it/dsh-douyin-dsh-folder](https://github.com/wangyimin758-ship-it/dsh-douyin-dsh-folder) | 0 | 2026-11-25 | 2026-11-25 | DSH 抖音收藏夹只读学习插件：目标收藏夹可配置，学过的记入本地账本，归档只给人工步骤。 |
| 307 | [WanX609/dsh-activity-bell](https://github.com/WanX609/dsh-activity-bell) | 0 | 2026-11-25 | 2026-11-25 | DSH 侧栏活动铃铛（minivv/dsh-activity-bell 的个人 fork）：蓝色角标、正常流替换列表、切换会话冻结快照 |
| 308 | [Wayne536/dsh-downloads](https://github.com/Wayne536/dsh-downloads) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness ????:??????? + ?????,?????????????????????? |
| 309 | [whyissodifficult/dsh-plugin-audit](https://github.com/whyissodifficult/dsh-plugin-audit) | 0 | 2026-11-25 | 2026-11-25 | 静态审计 DeepSeek Harness 插件：只读、不执行插件代码。13,136 个插件，先回答「这个能不能装」。 |
| 310 | [wold9168/dsh-only-chat](https://github.com/wold9168/dsh-only-chat) | 0 | 2026-11-25 | 2026-11-25 | A DSH plugin for chatting with an LLM in read-only mode, right away — no workspace selection needed. |
| 311 | [wunengbiao/dsh-claude-plugins](https://github.com/wunengbiao/dsh-claude-plugins) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness plugin: discover installed Claude Code plugins, load their skills and commands, optionally register MCP servers, and manage them in Settings. |
| 312 | [wunengbiao/dsh-plugin-chat](https://github.com/wunengbiao/dsh-plugin-chat) | 0 | 2026-11-25 | 2026-11-25 | Chat mode for DeepSeek Harness: a switch on the sidebar chrome row opens a conversation-only session — no directory, no coding tools, web search, and a configurable system prompt. |
| 313 | [www875640366-afk/dsh-qingdai-core](https://github.com/www875640366-afk/dsh-qingdai-core) | 0 | 2026-11-25 | 2026-11-25 | DSH 插件：不破坏缓存，双库记忆（生活/工作物理隔离）+ 记忆自动浮现 + 原文留底 + 主动开口 + 人格核心。零外部依赖，本地 SQLite，装好自动建库。 |
| 314 | [wyxwyxwxy/dsh-quick-provider](https://github.com/wyxwyxwxy/dsh-quick-provider) | 0 | 2026-11-25 | 2026-11-25 | 为 DeepSeek Harness 一键接入第三方模型：内置 28 家主流提供商的接口地址与模型清单，只需填 API Key 并选择模型。Quick-connect third-party models to DeepSeek Harness. |
| 315 | [xgame1024/dsh-desktop-plus](https://github.com/xgame1024/dsh-desktop-plus) | 0 | 2026-11-25 | 2026-11-25 | A more comfortable desktop for DeepSeek Harness. |
| 316 | [XGuai-S/dsh-tps-history](https://github.com/XGuai-S/dsh-tps-history) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness 会话的Token输出速度 (TPS)、TTFT、模型时间和工具时间始终可见。Always-visible per-turn output speed (TPS), TTFT, model time and tool time for DeepSeek Harness sessions. |
| 317 | [xiaochouxia11/dsh-hindsight-memory](https://github.com/xiaochouxia11/dsh-hindsight-memory) | 0 | 2026-11-25 | 2026-11-25 | Hindsight 记忆工作台：DSH 简体中文只读记忆浏览插件（记忆库切换、事实搜索、知识页、技能清单） |
| 318 | [XiaoZhuJing3764/dsh-balance](https://github.com/XiaoZhuJing3764/dsh-balance) | 0 | 2026-11-25 | 2026-11-25 | 让 DSH 里的模型自己查 DeepSeek 账户余额：注册一个 deepseek_balance 工具，返回一个数字（元） |
| 319 | [XiaoZhuJing3764/dsh-rice-bowl](https://github.com/XiaoZhuJing3764/dsh-rice-bowl) | 0 | 2026-11-25 | 2026-11-25 | 余额就是饭吃：给 DSH 加一个 deepseek_balance 工具，报出 DeepSeek 账户还剩几块钱 |
| 320 | [XiaoZhuJing3764/dsh-whale-balance](https://github.com/XiaoZhuJing3764/dsh-whale-balance) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek 余额查询插件：注册 deepseek_balance 工具，让 DSH 里的模型自己查出账户余额（元） |
| 321 | [xiaozou-second/dsh-context-orb](https://github.com/xiaozou-second/dsh-context-orb) | 0 | 2026-11-25 | 2026-11-25 | A floating orb over the composer shows the session's context window as a green wave: click for the breakdown, double-click to compact. |
| 322 | [XJGonFree/dsh-remote-access](https://github.com/XJGonFree/dsh-remote-access) | 0 | 2026-11-25 | 2026-11-25 | Remote access for the dsh web GUI: one fixed local port, QR pairing, passphrase gate, mobile adaptation and a sidebar panel. No 403 through your own tunnel. |
| 323 | [xuanbing2241/dsh-deliverables-panel](https://github.com/xuanbing2241/dsh-deliverables-panel) | 0 | 2026-11-25 | 2026-11-25 | Right-Sidebar Deliverables panel for DeepSeek Harness: lists one Session final deliverables and hides process, temporary and tooling script files. |
| 324 | [Yamashigure/dsh-restart-button](https://github.com/Yamashigure/dsh-restart-button) | 0 | 2026-11-25 | 2026-11-25 | A red restart button in the Windows caption row that relaunches the DeepSeek Harness desktop app. |
| 325 | [yestone111/RTL_Cockpit](https://github.com/yestone111/RTL_Cockpit) | 0 | 2026-09-29 | 2026-11-25 | RTL_Cockpit —— 面向 RTL 工程师的可视化协同编程驾驶舱，DeepSeek Harness 插件（Verilog/VHDL 框图、信号全链路、时钟域分析、AI Vibe Coding） |
| 326 | [yhong91/dsh-aecpt](https://github.com/yhong91/dsh-aecpt) | 0 | 2026-11-25 | 2026-11-25 | AeCpt student research workbench plugin for DeepSeek Harness (DSH) |
| 327 | [yhx19960607-max/dsh-memory-nebula](https://github.com/yhx19960607-max/dsh-memory-nebula) | 0 | 2026-11-25 | 2026-11-25 | 🌌 你聊过的每句话都该变成一颗星 —— 把 DSH 的历史对话铺成可旋转、可搜索的银河星图：按工作区筛选、点开就是当时的对话，助手还能把记忆搜回来读懂。纯本地运行，数据不出本机。 |
| 328 | [Yi-qing-dev/dsh-restart-relay](https://github.com/Yi-qing-dev/dsh-restart-relay) | 0 | 2026-11-25 | 2026-11-25 | Restart the DSH host without losing work: countdown strip, restart-now/later, automatic restart on expiry, and continuation prompts so running sessions resume afterwards. Windows + DSH Desktop. |
| 329 | [YOMXXX/dsh-output-budget](https://github.com/YOMXXX/dsh-output-budget) | 0 | 2026-11-25 | 2026-11-25 | Shape-aware tool-output budgeting for DeepSeek Harness: digest noisy command output before it reaches the model, keep the full text one read away, never truncate errors. |
| 330 | [yubudong/dsh-ai-reading-room](https://github.com/yubudong/dsh-ai-reading-room) | 0 | 2026-11-24 | 2026-11-25 | AI 书房 · A personal reading room to explore books, reflect on ideas, and learn with AI. |
| 331 | [yuluo554/traceproof](https://github.com/yuluo554/traceproof) | 0 | 2026-09-30 | 2026-11-25 | Composer prompt-polisher button plugin for DeepSeek Harness (dsh): one-click draft rewrite, style presets, dual model path, race protection |
| 332 | [yunxiao11xie/dsh-sidebar-rail](https://github.com/yunxiao11xie/dsh-sidebar-rail) | 0 | 2026-11-25 | 2026-11-25 | Codex 风格侧栏：全局面板入口收进左侧图标列、悬停显示名称，工作区会话列表占用内容列。Codex-style sidebar rail for DeepSeek Harness. |
| 333 | [ZaneZhang-67/dsh-session-split](https://github.com/ZaneZhang-67/dsh-session-split) | 0 | 2026-11-25 | 2026-11-25 | Two independently editable session panes for DeepSeek Harness Desktop |
| 334 | [zarzy8/quiz-buddy](https://github.com/zarzy8/quiz-buddy) | 0 | 2026-11-25 | 2026-11-25 | 刷题搭子 quiz-buddy：给出文档自动出题，支持自备题库与复习资料；现版本出单项选择题、多项选择题、判断题，答完统计正确率并逐题讲错题。 |
| 335 | [zdalice/dsh-relay-compare](https://github.com/zdalice/dsh-relay-compare) | 0 | 2026-11-25 | 2026-11-25 | DeepSeek Harness 渠道费用对比插件：实时对比中转站与官方模型价格，显示每次会话省了多少钱。 |
| 336 | [Ze-loong/dsh-quick-toggle](https://github.com/Ze-loong/dsh-quick-toggle) | 0 | 2026-11-25 | 2026-11-25 | Toggle DeepSeek Harness plugins from the composer: /toggle picker, 🔌 button, pins, disable-all with one-click restore. |
| 337 | [zealerFT/dsh-reply-reader](https://github.com/zealerFT/dsh-reply-reader) | 0 | 2026-11-25 | 2026-11-25 | dsh对话朗读和翻译插件 |
| 338 | [zh-lant/dsh-minimax-h3](https://github.com/zh-lant/dsh-minimax-h3) | 0 | 2026-11-25 | 2026-11-25 | MiniMax H3 image and video tools in a DeepSeek Harness right-sidebar workspace. |
| 339 | [zhangxihuan666/dsh-calendar-board](https://github.com/zhangxihuan666/dsh-calendar-board) | 0 | 2026-11-25 | 2026-11-25 | A project calendar on the DeepSeek Harness main screen: today-only red dot, festival/milestone markers, month/week/day views grouped by project, monthly outcomes, and task-to-chat handoff. |
| 340 | [ZhengXianTai/dsh-mindmap](https://github.com/ZhengXianTai/dsh-mindmap) | 0 | 2026-11-23 | 2026-11-25 | A map-first DeepSeek Harness (DSH) plugin: session tree as the main mind map, frosted floating chat, type-to-fork child subtopics, rename, turn rewind, archive, and resizable windows. |
| 341 | [zhyq0826/dsh-personal-skill-manager](https://github.com/zhyq0826/dsh-personal-skill-manager) | 0 | 2026-11-05 | 2026-11-25 | Personal skill manager plugin |
| 342 | [ziyuanlingo/dsh-session-manager](https://github.com/ziyuanlingo/dsh-session-manager) | 0 | 2026-11-25 | 2026-11-25 | In-place session editor, turn trimmer &amp; true physical storage cleaner for DeepSeek Harness (DSH v0.2.x / v4 Zstd logs). |
| 343 | [zl2860/dsh-ssh-file-manager](https://github.com/zl2860/dsh-ssh-file-manager) | 0 | 2026-11-25 | 2026-11-25 | Remote file manager panel for DeepSeek Harness SSH workspaces: browse, preview, copy, move, rename, delete, upload and download files on the server. |
| 344 | [zls2010419-crypto/deepseek-harness-memory](https://github.com/zls2010419-crypto/deepseek-harness-memory) | 0 | 2026-11-25 | 2026-11-25 | deepseekharness记忆插件会学习 Agent 长期记忆系统，自动召回，保存知识页深度反思按仓库隔离记忆，高权限写入控制，记忆图谱用户画像注入，对接 OpenVIN 服务端的记忆工具。带有人格文件艾宾豪斯遗忘曲线，缓存友好注入每条消息关键命中，空闲窗口时自动整理记忆 |
| 345 | [znlgis/dsh-qwen-image-generate](https://github.com/znlgis/dsh-qwen-image-generate) | 0 | 2026-11-25 | 2026-11-25 | dsh-qwen-image-generate |
| 346 | [ZZR-rui-997/dsh-skills-workbench](https://github.com/ZZR-rui-997/dsh-skills-workbench) | 0 | 2026-11-25 | 2026-11-25 | Sidebar Skills workbench for the DSH web client: list your own skills, switch invocation, search, check and fix, edit, import, move, tag, trash. |
| 347 | [ZZUGeneral/dsh-model-importer](https://github.com/ZZUGeneral/dsh-model-importer) | 0 | 2026-11-16 | 2026-11-25 | DSH 插件：在设置→模型页图形化导入阿里百炼（4 种计费方式）的模型 |
| 348 | [ZZUGeneral/siyuan-dsh-notes](https://github.com/ZZUGeneral/siyuan-dsh-notes) | 0 | 2026-11-24 | 2026-11-25 | DeepSeek Harness 思源笔记插件：17 个 siyuan_* 工具 + 设置页 + 聊天侧边抽屉 |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中。同 owner 的纯改名已自动同步引用，此处多为删除/转私或同名换主——核实后从 [data/approved.json](../approved.json) 移除，或按上面的待复核节处理。

Approved but no longer present in the current snapshot. Same-owner renames were already synced automatically, so what remains is mostly deletion, privating, or a recycled slug — after checking, remove them from [data/approved.json](../approved.json) or handle them via the renames-pending-review section above.

- 349840432m-dev/dsh-session-dashboard
- 6starlong/dsh-starlong
- chenhao6682108/dsh-skill-musicbee
- cxywhite/dsh-queue-reorder
- d2184/dsh-system-proxy
- DennisZhangOiler/dsh-dev-workflow
- Hao0311/dsh-deferred-approvals
- Hao0311/dsh-mimo-tts
- hao0311/dsh-model-price
- Hao0311/dsh-price-badge
- hao0311/dsh-sidebar-tidy
- Hao0311/dsh-timebox
- Hao0311/dsh-tool-gate
- Hao0311/dsh-toolbox
- heiheiha798/dsh-plugin-response-window
- Hits-pano/dsh-qwen-draw-lite
- HSHSir/dsh-a6-failover
- ivvan3016/dsh-ui-pricing
- ivvan3016/dsh-ui-task-notify
- joyiok/dsh-memory
- joyiok/dsh-token-usage
- joyiok/dsh-vision
- kedoupi/xiaotaozi-dsh
- laoyingfuhuole/dsh-thinking-channel-guard
- MYCF711/freebuff-auth
- nguyenhnhatquang/DSH-Plugins
- nienieai/dsh-tts-reader
- noah-qiao/dsh-agent-team-manager
- Okra-juice/dsh-rheostat
- subisle/dsh-prompt-optimizer
- T-MKT/dsh-gitall
- tangyu233-7312/dsh-onebot-qq-sidecar
- Witherwithwinter/DeepSeek-Balance-Whale-Widget-Bowl
- Witherwithwinter/dsh-ccx
- Witherwithwinter/DSH-Codinput
- Ww-Cooooo/AI-carry-DSH
- Ww-Cooooo/easy-ask-ai-dsh
- Ww-Cooooo/harness-share-dsh
- Ww-Cooooo/media-review-dsh
- xian-yu-zhao/dsh-message-manager
- yuluo554/dsh-pipeline
- yuluo554/dsh-prompt-polisher
- zman406986/dsh-bot
- Zou82/dsh-plugin-git-sync
