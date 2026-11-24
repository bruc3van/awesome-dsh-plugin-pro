# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-11-24**
- 快照日期 / Snapshot date: **2026-11-24 (UTC)**
- 待审核 / Pending: **13**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **54**
- Star 异常增长 / Star-growth alerts: **13** — 先看下方告警节 / see the alert section first
- 改名/身份待复核 / Renames pending review: **38**

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

对比上一份快照 **2026-11-22** / vs previous snapshot **2026-11-22**。规则：日增 ≥100★；单日净减 ≥100★（GitHub 批量清号回收的签名——被回收的星通常是刷的，余下星数也应视为虚高）；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 单日大幅掉星 = 此前刷星被官方回收；刷星常贴着 +100★/日阈值之下滴灌增长，掉星往往是我们能机器检出的唯一痕迹
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **13**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [Fei-Craft/DS-Bot](https://github.com/Fei-Craft/DS-Bot) | 待审 / pending | 8792 | +94 | 891 | 47d | 待审高星 | 核准即 Top 1 |
| ⚠️ [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | 待审 / pending | 73462 | — | 6480 | 304d | 待审高星 | 核准即 Top 1 |
| ⚠️ [lennney/stop-that-shit](https://github.com/lennney/stop-that-shit) | 待审 / pending | 4080 | — | 87 | 104d | 待审高星 | 核准即 Top 9 |
| ⚠️ [Minglink/dsh-jailbreak-workflow](https://github.com/Minglink/dsh-jailbreak-workflow) | 待审 / pending | 1233 | — | 403 | 22d | 待审高星 | 核准即榜 #24 |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 85097 | +1178 | 2393 | 60d | 日增百星 | 日增 +1178★；已不进榜单 |
| ⚠️ [kunkundi/crossdesk](https://github.com/kunkundi/crossdesk) | 已核准 / approved | 6705 | +721 | 690 | 1099d | 日增百星 | 日增 +721★；已不进榜单 |
| ⚠️ [nexu-io/openmotion](https://github.com/nexu-io/openmotion) | 已核准 / approved | 15724 | +471 | 1564 | 196d | 日增百星 | 日增 +471★；已不进榜单 |
| ⚠️ [alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design) | 已核准 / approved | 30679 | +286 | 3260 | 218d | 日增百星 | 日增 +286★；已不进榜单 |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 20970 | +261 | 713 | 102d | 日增百星 | 日增 +261★；已不进榜单 |
| ⚠️ [helloHub1212/dsh-windows-mcp](https://github.com/helloHub1212/dsh-windows-mcp) | 已核准 / approved | 2312 | +127 | 11 | 43d | 日增百星 | 日增 +127★；★/fork 210.2；已不进榜单 |
| ⚠️ [tw93/Mole](https://github.com/tw93/Mole) | 已核准 / approved | 75974 | +118 | 2727 | 426d | 日增百星 | 日增 +118★；已不进榜单 |
| ⚠️ [elysia395/dsh-wallpaper-engine](https://github.com/elysia395/dsh-wallpaper-engine) | 已核准 / approved | 7988 | +106 | 123 | 99d | 日增百星 | 日增 +106★ |
| ⚠️ [dsh-market/dsh-market](https://github.com/dsh-market/dsh-market) | 已核准 / approved | 13336 | +102 | 509 | 101d | 日增百星 | 日增 +102★；已不进榜单 |

## 改名与身份变化待复核 / Renames pending review

同 owner、同 GitHub 仓库 ID 的纯改名已由脚本自动同步全部引用（approved / curated / packages / 榜单简介 / 精选）并保留原审批日期；以下条目无法安全自动处理，需人工核实：

- owner 迁移（仓库转移到别的账号）→ 人工确认后更新各文件的 key
- 同名换主（slug 未变但仓库 ID 变化，原仓库删除后被人重建）→ 人工确认审批去留
- 检测到改名但没有存储引用可同步 → 人工确认是否需要补引用

Same-owner, same-repository-id renames were synced automatically across approved.json / curated.json / packages.json / leaderboard descriptions / featured picks, with the original approval date kept. The entries below could not be handled safely and need manual review.

- `dtxovo/dsh-plugin-session-spend` → `mixcclf/dsh-plugin-session-spend` — owner changed — transfer needs review
- `Fei2411/DS-Bot` → `Fei-Craft/DS-Bot` — owner changed — transfer needs review
- `lhy220402/traceless` → `idealismo10/traceless` — owner changed — transfer needs review
- `lighghteeloo/dsh-next-actions` → `miorin-chan/dsh-next-actions` — owner changed — transfer needs review
- `LighghtEeloo/dsh-vcs-panel` → `miorin-chan/dsh-vcs-panel` — owner changed — transfer needs review
- `nonenameless/dsh-a2a` → `Jasper-Alaric/dsh-a2a` — owner changed — transfer needs review
- `nonenameless/dsh-hybrid-memory` → `Jasper-Alaric/dsh-hybrid-memory` — owner changed — transfer needs review
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
- `ferrisching/dsh-reakit` — identity change: repository id 1452501971 → 1469538116 under the same slug — approval needs review
- `hzlm124/humanities-workbench` — identity change: repository id 1467925472 → 1468737611 under the same slug — approval needs review
- `qikairo7/dsh-web-search` — identity change: repository id 1457496008 → 1468118327 under the same slug — approval needs review


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [gcggcg/dsh-plugin-dingtalk-bridge](https://github.com/gcggcg/dsh-plugin-dingtalk-bridge) | 6 | 2026-11-17 | 2026-11-24 | 对接钉钉平台的 DSH 插件：一键授权后实时接收私信与群 @ 我的消息，按发送人记录来源，用 AI 生成建议回复；开启自动回复后，达到可信度阈值就直接回复，不确定时在 DSH 主界面弹框请你确认。 |
| 2 | [regrevia/lite-memory](https://github.com/regrevia/lite-memory) | 4 | 2026-10-25 | 2026-11-24 | Zero resident memory for the DeepSeek Harness: reads only on a hit, costs nothing when nothing matches. |
| 3 | [AyaseMinami/dsh-whale-widget-planbar](https://github.com/AyaseMinami/dsh-whale-widget-planbar) | 0 | 2026-11-24 | 2026-11-24 | dsh-whale-widget 的非官方本地补丁：订阅额度卡片（剩余百分比 + 进度条 + 重置倒计时），适用于 0.4.2 |
| 4 | [Bert0000000000/dsh-rsi](https://github.com/Bert0000000000/dsh-rsi) | 0 | 2026-11-23 | 2026-11-24 | dsh-rsi |
| 5 | [hefeng1910/dsh-model-tree-menu](https://github.com/hefeng1910/dsh-model-tree-menu) | 0 | 2026-11-24 | 2026-11-24 | DSH 模型选择多级菜单：中转站→模型，iOS18 磨砂玻璃质感。 |
| 6 | [heiyedehen/dsh-self-clock](https://github.com/heiyedehen/dsh-self-clock) | 0 | 2026-11-24 | 2026-11-24 | Heartbeat for DeepSeek Harness: the model sets its own timers, and you get one quiet notice in the same conversation when it is time. |
| 7 | [hua-ri/dsh-ops](https://github.com/hua-ri/dsh-ops) | 0 | 2026-11-22 | 2026-11-24 | DSH 一体化运维插件：SSH / K8s / Helm / ArgoCD / Argo Workflows |
| 8 | [huihui308/dsh-sound-picture-desk](https://github.com/huihui308/dsh-sound-picture-desk) | 0 | 2026-11-20 | 2026-11-24 | 声画工作台 · DeepSeek Harness（DSH）插件：一个主题或一本书，在面板里走完选题 → 写稿 → 定人物 → 配音 → 分镜 → 合成，产出 1080×1920 竖屏 mp4 与 SRT 字幕。旁白支持 MiMo 多音色，分镜接任意 OpenAI 兼容生图；每段都能改，改完只重做该段。 |
| 9 | [lukysoda/dsh-session-search-zh](https://github.com/lukysoda/dsh-session-search-zh) | 0 | 2026-11-24 | 2026-11-24 | 在 DeepSeek Harness 左侧栏按原文搜索全部会话的用户发言与模型回复，中文整段可命中｜Exact-text (Chinese-friendly) conversation search across every DSH session |
| 10 | [solgridai/dsh-plugin](https://github.com/solgridai/dsh-plugin) | 0 | 2026-11-24 | 2026-11-24 | Official DeepSeek Harness (dsh) plugin for Solgrid — discover and run paid third-party tools and skills with zero setup. |
| 11 | [This-is-XiaoDeng/dsh-web-search-tavily](https://github.com/This-is-XiaoDeng/dsh-web-search-tavily) | 0 | 2026-11-24 | 2026-11-24 | Tavily-backed web search provider for the DeepSeek Harness (DSH) web capability seam (ctx.web) — provider id tavily, zero dependencies, MIT |
| 12 | [YeYirp/dsh-wechat-kb](https://github.com/YeYirp/dsh-wechat-kb) | 0 | 2026-11-24 | 2026-11-24 | 微信 + 本地知识库的 DSH 插件：群里只认真 @，回答只来自知识库，查不到/出错只发固定拒答语。停用≈卸载，零依赖。 |
| 13 | [yib0601/dsh-session-insight](https://github.com/yib0601/dsh-session-insight) | 0 | 2026-11-18 | 2026-11-24 | DSH 插件：会话洞察 —— 逐轮/会话费用（官方单价 CNY/USD + 峰谷分时）、上下文明细与用量总览、订阅额度与重置倒计时、自建网关模型目录同步、跨会话项目记忆与笔记检索 |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中。同 owner 的纯改名已自动同步引用，此处多为删除/转私或同名换主——核实后从 [data/approved.json](../approved.json) 移除，或按上面的待复核节处理。

Approved but no longer present in the current snapshot. Same-owner renames were already synced automatically, so what remains is mostly deletion, privating, or a recycled slug — after checking, remove them from [data/approved.json](../approved.json) or handle them via the renames-pending-review section above.

- dsh-external/chat-width
- dsh-external/dsh-agent-teams
- dsh-external/dsh-at-file
- dsh-external/dsh-automation
- dsh-external/dsh-bash-encoding
- dsh-external/dsh-better-browser
- dsh-external/dsh-book2skill
- dsh-external/dsh-browser4
- dsh-external/dsh-computer-use
- dsh-external/dsh-custom-tool
- dsh-external/dsh-cyber-sec
- dsh-external/dsh-daily-fortune
- dsh-external/dsh-deepcel
- dsh-external/dsh-deeplink
- dsh-external/dsh-doctor
- dsh-external/dsh-easy-ctx-manager
- dsh-external/dsh-file-trace
- dsh-external/dsh-fun-ticker
- dsh-external/dsh-fun-typewriter
- dsh-external/dsh-fun-weather
- dsh-external/dsh-genui
- dsh-external/dsh-handoff
- dsh-external/dsh-input-history
- dsh-external/dsh-island
- dsh-external/dsh-minigames
- dsh-external/dsh-notification
- dsh-external/dsh-nowledge-mem
- dsh-external/dsh-open-in-vscode
- dsh-external/dsh-openmaic
- dsh-external/dsh-paste-input
- dsh-external/dsh-pet
- dsh-external/dsh-pet-corner
- dsh-external/dsh-pi-adapter
- dsh-external/dsh-plan-execute
- dsh-external/dsh-plannotator
- dsh-external/dsh-qq2006
- dsh-external/dsh-revive
- dsh-external/dsh-session-hub
- dsh-external/dsh-spotlight
- dsh-external/dsh-tps
- dsh-external/dsh-turn-rewind
- dsh-external/dsh-ui-progress
- dsh-external/dsh-ui-whale
- dsh-external/dsh-vision-toolkit
- dsh-external/dsh-visualize
- dsh-external/dsh-web-workbench
- dsh-external/dsh-webui-live-html
- dsh-external/oh-my-dsh
- elviass/dsh-cost-insights
- GUGUQ1/dsh-todo
- Na2Cr2O7/dsh-qq-automate
- regrevia/dsh-lite-memory
- yib0601/dsh-turn-cost
- zmaa0061-coder/feishu-publish
