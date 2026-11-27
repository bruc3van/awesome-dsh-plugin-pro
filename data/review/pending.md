# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-11-27**
- 快照日期 / Snapshot date: **2026-11-26 (UTC)**
- 待审核 / Pending: **280**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **15**
- Star 异常增长 / Star-growth alerts: **6** — 先看下方告警节 / see the alert section first
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

对比上一份快照 **2026-11-25** / vs previous snapshot **2026-11-25**。规则：日增 ≥100★；单日净减 ≥100★（GitHub 批量清号回收的签名——被回收的星通常是刷的，余下星数也应视为虚高）；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 单日大幅掉星 = 此前刷星被官方回收；刷星常贴着 +100★/日阈值之下滴灌增长，掉星往往是我们能机器检出的唯一痕迹
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **6**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [nexu-io/opengame](https://github.com/nexu-io/opengame) | 待审 / pending | 775 | — | 143 | 0d | 待审高星 | 核准即榜 #44；创建 0 天 |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 88146 | +1067 | 2495 | 62d | 日增百星 | 日增 +1067★；已不进榜单 |
| ⚠️ [kunkundi/crossdesk](https://github.com/kunkundi/crossdesk) | 已核准 / approved | 8457 | +626 | 912 | 1101d | 日增百星 | 日增 +626★；已不进榜单 |
| ⚠️ [nexu-io/openmotion](https://github.com/nexu-io/openmotion) | 已核准 / approved | 16705 | +377 | 1660 | 198d | 日增百星 | 日增 +377★；已不进榜单 |
| ⚠️ [tw93/Mole](https://github.com/tw93/Mole) | 已核准 / approved | 76325 | +135 | 2749 | 428d | 日增百星 | 日增 +135★；已不进榜单 |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 20061 | -1327 | 696 | 104d | 单日大幅掉星 | 单日 -1327★，疑似批量清号回收（此前或为刷星）；已不进榜单 |

## 改名与身份变化待复核 / Renames pending review

同 owner、同 GitHub 仓库 ID 的纯改名已由脚本自动同步全部引用（approved / curated / packages / 榜单简介 / 精选）并保留原审批日期；以下条目无法安全自动处理，需人工核实：

- owner 迁移（仓库转移到别的账号）→ 人工确认后更新各文件的 key
- 同名换主（slug 未变但仓库 ID 变化，原仓库删除后被人重建）→ 人工确认审批去留
- 检测到改名但没有存储引用可同步 → 人工确认是否需要补引用

Same-owner, same-repository-id renames were synced automatically across approved.json / curated.json / packages.json / leaderboard descriptions / featured picks, with the original approval date kept. The entries below could not be handled safely and need manual review.

- `Jason-skd/dsh-session-fork` → `jh76111/dsh-session-fork` — owner changed — transfer needs review
- `monagisa/dsh-plugin-shop-accounts` → `world-geniuses/dsh-plugin-shop-accounts` — owner changed — transfer needs review
- `nangongwentian-fe/dsh-quadrant-todos` → `andrejzheng/dsh-quadrant-todos` — owner changed — transfer needs review
- `Prokint/WhaleDraw` → `world-geniuses/WhaleDraw` — owner changed — transfer needs review
- `ramin-mahmoodi/deepseek-rtl` → `0xramin/deepseek-rtl` — owner changed — transfer needs review
- `sobermh/tokens_dshwebsearch_code` → `TokensAPI/tokens_DshWebSearch_code` — owner changed — transfer needs review
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
- `xing-shuyin/pi-web-ui` → `xing-shuyin/keel` — target slug already exists with different data — needs review
- `zendev-lab/cogfold` → `zendev-lab/ulota` — target slug already exists with different data — needs review
- `zendev-lab/spark` → `zendev-lab/ulota` — target slug already exists with different data — needs review
- `MuChen969/DSH-Magpie` — identity change: repository id 1467286893 → 1473310015 under the same slug — approval needs review
- `Thomas-zz/dsh-luanji` — identity change: repository id 1447863113 → 1472970908 under the same slug — approval needs review
- `yhm138/dsh-btw` — identity change: repository id 1460878855 → 1472714383 under the same slug — approval needs review


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [nexu-io/opengame](https://github.com/nexu-io/opengame) ⚠️ | 775 | 2026-11-25 | 2026-11-26 | The Super Game Agent — the Unity &amp; Unreal for AI agents, with 100+ viral games to remix. Turn 20+ coding agents (Claude Code, Codex, DeepSeek, etc.) into a full-stack AI game studio. Build and publish 3D &amp; mini-games to WeChat, Douyin, TikTok, Telegram, itch.io, and more. |
| 2 | [EverMind-AI/EverMe](https://github.com/EverMind-AI/EverMe) | 82 | 2026-05-27 | 2026-11-26 | Open-source CLI and Agent plugin suite for EverMe — cross-device, cross-Agent personal memory for AI Agents. |
| 3 | [liyupi/memecub](https://github.com/liyupi/memecub) | 38 | 2026-10-13 | 2026-11-26 | Meme search &amp; auto meme placement for AI agents. Remote MCP server, Agent Skill, CLI and REST API that let Claude Code, Cursor and Codex find reaction memes, GIFs and Chinese 表情包 by feeling and insert them into articles. 表情包搜索 · AI 配图 · 斗图 MCP |
| 4 | [liyupi/vibefather](https://github.com/liyupi/vibefather) | 22 | 2026-10-26 | 2026-11-26 | Vibe coding website templates for AI coding agents: an Agent Skill, a remote MCP server and a CLI for Claude Code, Codex, Cursor, Copilot and Gemini CLI. 320+ original templates with live demos, the exact prompt and DESIGN.md. Build landing pages, SaaS sites, portfolios, stores, dashboards and 3D sites. AI 建站 · 网站模板 · MCP |
| 5 | [qianhanglv/dsh-better-python](https://github.com/qianhanglv/dsh-better-python) | 6 | 2026-11-19 | 2026-11-26 | Better Python for DSH — probe before installing, prefer what you already have. |
| 6 | [ultrafastmov/ultrafast](https://github.com/ultrafastmov/ultrafast) | 4 | 2026-11-21 | 2026-11-26 | Shot on the GPU. Shaders, 3D, motion type and camera optics, written by your agent and rendered on the GPU. Open source. |
| 7 | [zhuowenzhang288-web/dsh-research-agent](https://github.com/zhuowenzhang288-web/dsh-research-agent) | 3 | 2026-11-20 | 2026-11-26 | 搭载于 DeepSeek Harness 的科研 agent：选「科研模式」即启用，把现象驱动工作流、科研侦探人格与 6 个零依赖脚本内化为 agent 的常驻纪律。先看见现象，再相信结论。 |
| 8 | [01float01/dsh-remote](https://github.com/01float01/dsh-remote) | 2 | 2026-11-26 | 2026-11-26 | Reach the DSH web UI from a phone browser on the same Wi-Fi: a zero-dependency Node TLS gateway with a password gate, browser polyfills and a responsive layout layer injected into DSH's own page. |
| 9 | [hxliu4mcgill/iMem-skill](https://github.com/hxliu4mcgill/iMem-skill) | 2 | 2026-07-29 | 2026-11-26 | Online Memory System for Agents and LLM. |
| 10 | [Protonhydrogen/DSH-meeting](https://github.com/Protonhydrogen/DSH-meeting) | 2 | 2026-11-26 | 2026-11-26 | 本地优先的会议录音、实时转录与科研纪要工作台 |
| 11 | [qiniu/dsh-agentapi](https://github.com/qiniu/dsh-agentapi) | 2 | 2026-11-26 | 2026-11-26 | The Qiniu AgentAPI plugin for DeepSeek Harness. Bring managed cloud agents, execution environments, and persistent sessions into your DSH workspace. |
| 12 | [xingwang0/research-ml-modeling](https://github.com/xingwang0/research-ml-modeling) | 2 | 2026-11-24 | 2026-11-26 | Review-grade ML pipeline for spectroscopic / tabular predictive modeling: nested grouped CV, applicability domain, Y-randomization, paper-ready figures and Methods drafts. |
| 13 | [yakovlev-i-a/dsh-openfoam-workbench](https://github.com/yakovlev-i-a/dsh-openfoam-workbench) | 2 | 2026-11-23 | 2026-11-26 | OpenFOAM workbench for DeepSeek Harness: 65 tools and 11 skills for case inspection, meshing, runs, verification and renders |
| 14 | [zhaojiale001016/video-hub](https://github.com/zhaojiale001016/video-hub) | 2 | 2026-11-26 | 2026-11-26 | 外网视频自动搬运中台：yt-dlp下载 → whisper字幕翻译烧录 → LLM中文标题 → Web管理台 → 一键发布 B站/快手/视频号 |
| 15 | [zhengwuyu957/dsh-role-play](https://github.com/zhengwuyu957/dsh-role-play) | 2 | 2026-11-08 | 2026-11-26 | 一个可随意设置角色卡的轻量角色扮演，安装即用，简单易上手。 |
| 16 | [7haumazein/dsh-research-workbench](https://github.com/7haumazein/dsh-research-workbench) | 1 | 2026-11-26 | 2026-11-26 | DSH 研报知识库插件：DeepSeek 驱动的可溯源 Obsidian 研究工作台 |
| 17 | [Ambulr/dsh-soda-authoring](https://github.com/Ambulr/dsh-soda-authoring) | 1 | 2026-11-26 | 2026-11-26 | 给 DeepSeek Harness 写 skill 与插件的手册：六个 skill 根目录、frontmatter 校验、12 个静默失败的坑 |
| 18 | [Ambulr/dsh-soda-todo-nag](https://github.com/Ambulr/dsh-soda-todo-nag) | 1 | 2026-11-26 | 2026-11-26 | DSH todo 纪律守卫：模型多步任务里偏离 todo 列表时，在工具结果后提醒建表 / 更新 / 收尾 |
| 19 | [AstDen/dsh-mesh-toolkit](https://github.com/AstDen/dsh-mesh-toolkit) | 1 | 2026-11-23 | 2026-11-26 | Three DeepSeek Harness packages for OpenFOAM mesh work: STL generation with in-process JS QA (33+ knowledge cards), snappyHexMesh/cfMesh/gmsh routes with a checkMesh quality gate, and one-command delivery as an OpenFOAM case plus an ANSYS/Fluent .msh. Works in an empty directory — no project profile required. |
| 20 | [butterfly301/dsh-pirate-mode](https://github.com/butterfly301/dsh-pirate-mode) | 1 | 2026-11-22 | 2026-11-26 | Pirate mode bundle for DeepSeek Harness: pirate brand marks, eight-language packs, rotating status phrases, ocean background and an editable first-mate persona. |
| 21 | [butterfly301/dsh-session-terms](https://github.com/butterfly301/dsh-session-terms) | 1 | 2026-11-14 | 2026-11-26 | Session-scoped glossary with notes and read-only AI context for DeepSeek Harness. |
| 22 | [Congxiang1994/dsh-qa-mode](https://github.com/Congxiang1994/dsh-qa-mode) | 1 | 2026-11-26 | 2026-11-26 | Q&amp;A agent preset for DeepSeek Harness: 问答模式 answers with web search instead of a coding toolchain. |
| 23 | [dtapps/dsh-git-guard](https://github.com/dtapps/dsh-git-guard) | 1 | 2026-11-24 | 2026-11-26 | 阻止 agent 自行执行 git commit、git push 等写操作，装到 profile 后对整个 Harness 生效。 |
| 24 | [fanyingnie2163663/dsh-guizhi](https://github.com/fanyingnie2163663/dsh-guizhi) | 1 | 2026-11-26 | 2026-11-26 | 归置（Stow）：按你的工作流归置 DSH 插件、工具与技能，生成可导出能力包。A DeepSeek Harness plugin for inventorying installed plugins/tools/skills by workflow and building exportable capability packs. |
| 25 | [fanyingnie2163663/weave-observatory](https://github.com/fanyingnie2163663/weave-observatory) | 1 | 2026-11-26 | 2026-11-26 | Weave 织造观测台 — 多智能体协作过程的可观看、可回放观测界面（静态原型）+ DSH 会话视图插件 dsh-client-ui-weave。 |
| 26 | [feigo313/dsh-leader](https://github.com/feigo313/dsh-leader) | 1 | 2026-11-26 | 2026-11-26 | Root-session Leader contract for DeepSeek Harness: orchestrate, delegate to subagents, audit. |
| 27 | [G-TY/dsh-restart-refresh](https://github.com/G-TY/dsh-restart-refresh) | 1 | 2026-11-25 | 2026-11-26 | 侧栏 DSH 标志旁的两个图标负责重启 DSH 和退出 DSH，对话右上方的按钮用来刷新页面和热更新插件代码。 \| Two icons beside the sidebar DSH logo restart or quit the desktop app; the button at the top right of the conversation refreshes the page and hot-reloads plugin code. |
| 28 | [gpboyer2/dsh-archived-open](https://github.com/gpboyer2/dsh-archived-open) | 1 | 2026-11-16 | 2026-11-26 | DeepSeek Harness plugin: click an archived session in the sidebar to unarchive and open it in one step. |
| 29 | [gpboyer2/dsh-session-title-on-turnend](https://github.com/gpboyer2/dsh-session-title-on-turnend) | 1 | 2026-11-24 | 2026-11-26 | DeepSeek Harness plugin: after each turn, a configurable model summarizes the conversation and writes a length-limited title back to the session. |
| 30 | [gpboyer2/dsh-toolcall-text-guard](https://github.com/gpboyer2/dsh-toolcall-text-guard) | 1 | 2026-11-08 | 2026-11-26 | DeepSeek Harness plugin: re-opens a turn when the model silently stops mid-work — structural detection, no judge model, zero dependencies. |
| 31 | [Kingsir111/dsh-turn-delete](https://github.com/Kingsir111/dsh-turn-delete) | 1 | 2026-11-26 | 2026-11-26 | Delete any turn from a DeepSeek Harness session's model context — multi-select, log untouched, instantly effective. |
| 32 | [kit686/dsh-kolors](https://github.com/kit686/dsh-kolors) | 1 | 2026-11-26 | 2026-11-26 | Free Kolors image generation inside DeepSeek Harness — sidebar page, key pool with per-minute and per-day quotas, local save folder, history and trash. |
| 33 | [KunKun24/autonomous-dev-security-auditor-skills](https://github.com/KunKun24/autonomous-dev-security-auditor-skills) | 1 | 2026-11-26 | 2026-11-26 | Autonomous development + security audit skill for non-coders, packaged for DeepSeek Harness (DSH) / 面向编程零基础用户的自主开发与安全审计技能包 |
| 34 | [licos03010102/dsh-prompt-optimize-button](https://github.com/licos03010102/dsh-prompt-optimize-button) | 1 | 2026-11-25 | 2026-11-26 | DSH 网页版提示词优化插件：支持改写草稿、完善系统提示词和修改旧稿，结果可先预览，再填回输入框或复制。 |
| 35 | [macroguo-ghy/dsh-codex-migration](https://github.com/macroguo-ghy/dsh-codex-migration) | 1 | 2026-11-23 | 2026-11-26 | Import Codex conversations into DeepSeek Harness |
| 36 | [manyuemeiquqi/dsh-gta6](https://github.com/manyuemeiquqi/dsh-gta6) | 1 | 2026-11-24 | 2026-11-26 | 给 DeepSeek Harness 的 GTA VI / Vice City 主题插件：通缉星级跟随 Agent 状态，右栏真实会话仪表盘，Jason &amp; Lucia 桌面宠物。 |
| 37 | [Misaki030112/dsh-agentapi](https://github.com/Misaki030112/dsh-agentapi) | 1 | 2026-11-26 | 2026-11-26 | DSH × AgentAPI · 七牛 AgentAPI 的 DeepSeek Harness 桌面插件，让 DSH 原生接入 AgentAPI 托管的智能体与执行环境。 |
| 38 | [MIU-MA/resume-grill-agent](https://github.com/MIU-MA/resume-grill-agent) | 1 | 2026-11-10 | 2026-11-26 | Local MCP job application workflow: grounded resume versions, application preparation and execution records. Experimental. |
| 39 | [Mooling0602/dsh-span-compaction](https://github.com/Mooling0602/dsh-span-compaction) | 1 | 2026-11-26 | 2026-11-26 | Bounded-replay compaction engine for DeepSeek Harness: caps every summarization pass, adds model-driven compaction tools and a context-pressure reminder. |
| 40 | [natgurlain/dsh-dreaming](https://github.com/natgurlain/dsh-dreaming) | 1 | 2026-11-26 | 2026-11-26 | Dreaming for DeepSeek Harness: consolidates past sessions into reviewed, versioned memory |
| 41 | [neilweixing/dsh-jira-board](https://github.com/neilweixing/dsh-jira-board) | 1 | 2026-11-18 | 2026-11-26 | A DeepSeek Harness sidebar plugin that turns your self-hosted Jira issues into a priority-ordered card board. Each card copies its key, opens the issue, or starts a new Harness session that sends "Please handle &lt;KEY&gt;". Credentials stay on the host. |
| 42 | [ningqi24/dsh-tencent-buddy-fix](https://github.com/ningqi24/dsh-tencent-buddy-fix) | 1 | 2026-11-26 | 2026-11-26 | Fix Tencent buddy/workbuddy channels in DSH: moves the harness system prompt into the first user message so the vendor channel check (HTTP 400 code 11128) stops rejecting requests. |
| 43 | [octer-ai/octer-ads-dsh](https://github.com/octer-ai/octer-ads-dsh) | 1 | 2026-11-26 | 2026-11-26 | 永久免费的广告管理和优化插件。支持 GPT Ads、Google Ads、Meta Ads、Microsoft Ads、Amazon Ads 和 TikTok Ads，提供投放报表和 API 权限控制。官网 https://ads-mcp.octer.ai  Free-forever ad management and optimization for DeepSeek Harness. OCTER Ads supports GPT Ads, Google Ads, Meta Ads, Microsoft Ads, Amazon Ads, and TikTok Ads. Includes performance reports and API access controls.  |
| 44 | [Prcentos/dsh-session-export](https://github.com/Prcentos/dsh-session-export) | 1 | 2026-11-26 | 2026-11-26 | Export any DSH session as a portable Markdown or JSON transcript that can move to another machine or resume in another agent. |
| 45 | [RickT34/dsh-fake-logos](https://github.com/RickT34/dsh-fake-logos) | 1 | 2026-11-25 | 2026-11-26 | A lightweight DeepSeek Harness (DSH) Web UI plugin that replaces the DeepSeek Harness sidebar logo, wordmark, and home hero mark with another AI coding tool's logo, a custom SVG/image and label, or hides the branding completely. |
| 46 | [RonaWhite/dsh-gongwei](https://github.com/RonaWhite/dsh-gongwei) | 1 | 2026-11-26 | 2026-11-26 | 工作日打卡 + 每日学习记录 + 周报。DeepSeek Harness 插件，可选接入 dsh-pet 桌宠。 |
| 47 | [seinan27/dsh-armor-suite](https://github.com/seinan27/dsh-armor-suite) | 1 | 2026-11-26 | 2026-11-26 | 破甲套件：只在批准的路由上注入，进历史前清理，拒答续问\|Route-scoped protected prompt for DeepSeek Harness — inject on approved routes only, clean before history, follow up on refusals  |
| 48 | [setoya/dsh-panel-updater](https://github.com/setoya/dsh-panel-updater) | 1 | 2026-11-21 | 2026-11-26 | DSH 更新器：检查插件与插件源、静默更新、依赖与扩展问题一键修复、同步码跨设备搬运配置 |
| 49 | [silent-QAQ/dsh-plugins-file-manager-plus](https://github.com/silent-QAQ/dsh-plugins-file-manager-plus) | 1 | 2026-11-26 | 2026-11-26 | 增强dsh文件管理功能 |
| 50 | [todrinkcho/dsh-chime](https://github.com/todrinkcho/dsh-chime) | 1 | 2026-11-19 | 2026-11-26 | Chime and a taskbar overlay badge when a DeepSeek Harness turn finishes or waits for your answer (Windows desktop shell). |
| 51 | [universe-st/dsh-workspace-category](https://github.com/universe-st/dsh-workspace-category) | 1 | 2026-11-26 | 2026-11-26 | DSH sidebar plugin: group workspaces into categories and filter the sidebar by category. |
| 52 | [warm-flame-core/dsh-jlc-art-pcb](https://github.com/warm-flame-core/dsh-jlc-art-pcb) | 1 | 2026-11-26 | 2026-11-26 | 把一张插画变成可打样的 PCB 艺术板 —— 嘉立创打样券驱动的 DSH 插件（异形板框 / 分色造型 / 工艺校验 / 下单参数） |
| 53 | [xian-yu-zhao/dsh-stop-all](https://github.com/xian-yu-zhao/dsh-stop-all) | 1 | 2026-11-26 | 2026-11-26 | Stop-all for DeepSeek Harness: one click stops the whole conversation tree (main turn + subagents at any depth + their background jobs) with native stop semantics. |
| 54 | [xiaobaga281/dsh-spend-ledger](https://github.com/xiaobaga281/dsh-spend-ledger) | 1 | 2026-11-02 | 2026-11-26 | DSH 花费：侧栏 DeepSeek 余额与官方峰谷状态，加设置页的 token 用量账本（热力图、构成、趋势、当天明细，已删除会话仍计入）。 |
| 55 | [xiaoge480/coopanion-dsh-qzone-diary](https://github.com/xiaoge480/coopanion-dsh-qzone-diary) | 1 | 2026-11-17 | 2026-11-26 | 依赖 Ego 浏览器配合养在Coopanion的加装了“大肥鱼功能复合包”，并注入QQ的大肥鱼发送空间动态日记。 |
| 56 | [zj6511235/dsh-skill-manager](https://github.com/zj6511235/dsh-skill-manager) | 1 | 2026-11-26 | 2026-11-26 | Local store for third-party skills and MCP servers: npm/GitHub/SkillHub/zip install, dependency self-heal, other-agent import, Web panel and CLI. |
| 57 | [1107186916/dsh-plugin-markdown-tone](https://github.com/1107186916/dsh-plugin-markdown-tone) | 0 | 2026-11-26 | 2026-11-26 | Semantic colors for assistant Markdown in the DeepSeek Harness Web client |
| 58 | [1804608397/dsh-plugin-browser-bridge](https://github.com/1804608397/dsh-plugin-browser-bridge) | 0 | 2026-11-26 | 2026-11-26 | Chrome page bridge for DeepSeek Harness: read DOM elements and drive tabs through a paired browser extension, no screen capture required. |
| 59 | [6nh2nkdznz-dot/dsh-context-capacity](https://github.com/6nh2nkdznz-dot/dsh-context-capacity) | 0 | 2026-11-25 | 2026-11-26 | DeepSeek Harness ??:???????????????????(?? / ?? / ??)/ Tells the model its context capacity before each request |
| 60 | [751969653/dsh-fish-ears](https://github.com/751969653/dsh-fish-ears) | 0 | 2026-11-26 | 2026-11-26 | Local-first speech transcription for DSH: bundled SenseVoice/Paraformer ASR, optional cloud omni fallback, HTTP endpoint for chat bridges, and Bilibili video audio. |
| 61 | [862287884-alt/dsh-month-timer](https://github.com/862287884-alt/dsh-month-timer) | 0 | 2026-11-26 | 2026-11-26 | DSH 月度进度条：停在输入框上方，手填分:秒与备注记成彩色阶段，节点 = 当月工作日 × 2 或 × 3 分钟。 |
| 62 | [AA1AAAOQ/dsh-beginner-mode](https://github.com/AA1AAAOQ/dsh-beginner-mode) | 0 | 2026-11-26 | 2026-11-26 | 小白模式：给 DeepSeek Harness 的可选 agent 预设。说人话、一次一步、不清楚就问、没把握就联网查。不改工具、不改权限。 \| An optional plain-language agent preset for DeepSeek Harness. |
| 63 | [Ade-hale/dsh-session-eraser](https://github.com/Ade-hale/dsh-session-eraser) | 0 | 2026-11-26 | 2026-11-26 | Adds a Delete session action to the DeepSeek Harness (DSH) session context menu, with recoverable trash and workspace/pin/archive cleanup. |
| 64 | [Ade-hale/dsh-skill-conflicts](https://github.com/Ade-hale/dsh-skill-conflicts) | 0 | 2026-11-26 | 2026-11-26 | Detect skill conflicts in DeepSeek Harness: group installed skills by capability and flag overlapping ones |
| 65 | [AIcivilization/dsh-voice-engine](https://github.com/AIcivilization/dsh-voice-engine) | 0 | 2026-11-14 | 2026-11-26 | 声音引擎：DSH 和所有需要声音的软件的声音来源——朗读、配音字幕、有声书、克隆自己的声音、实时发音、转写。Voice engine for DeepSeek Harness: TTS, dubbing, audiobooks, voice cloning, real-time speech, transcription. |
| 66 | [Antares422/dsh-design-board](https://github.com/Antares422/dsh-design-board) | 0 | 2026-11-26 | 2026-11-26 | 给 DeepSeek Harness 装上一块设计画布：内置 165 套设计体系，选好风格直接出交互页面，支持单页精修、多方案并排对比与点选元素原地改稿。 |
| 67 | [AppsGanin/dsh-qwen-subscription](https://github.com/AppsGanin/dsh-qwen-subscription) | 0 | 2026-11-26 | 2026-11-26 | Qwen (qwen.ai) subscription as a DeepSeek Harness LLM provider: OAuth device-flow sign-in, account pool with failover, quota visibility, localized settings card. |
| 68 | [Archerkattri/dsh-account-hub](https://github.com/Archerkattri/dsh-account-hub) | 0 | 2026-11-23 | 2026-11-26 | Account manager for DeepSeek Harness: headless CLIProxyAPI lifecycle, OAuth subscription sign-in, 5-hour/weekly quota, and rotation. |
| 69 | [architect321/dsh-hindsight-panel](https://github.com/architect321/dsh-hindsight-panel) | 0 | 2026-11-26 | 2026-11-26 | DSH 插件：Hindsight 记忆视图（只读查看记忆库/页面/文档，并处理异步整理任务） |
| 70 | [Asthestarsfalll/answer-card](https://github.com/Asthestarsfalll/answer-card) | 0 | 2026-11-16 | 2026-11-26 | macOS 通用 AI Agent 置顶悬浮回答卡片：支持 Antigravity、DeepSeek Harness (DSH) 与 Zed，不切窗完成审批、作答与追问，支持完整键盘控制并动态自适应主题配色。 |
| 71 | [asun-labs/dsh-remotion-studio](https://github.com/asun-labs/dsh-remotion-studio) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness plugin for Remotion video creation: wraps the official Remotion CLI without touching its source, exposes agent tools plus a skill, and configures TTS / image model providers in one settings panel. |
| 72 | [awanderindreams/dsh-speak-up-vital](https://github.com/awanderindreams/dsh-speak-up-vital) | 0 | 2026-11-26 | 2026-11-26 | 主动搭话 + 生命体征（个人分支） |
| 73 | [BaihaiMianbaofang/dsh-liangdeng](https://github.com/BaihaiMianbaofang/dsh-liangdeng) | 0 | 2026-11-26 | 2026-11-26 | 给 DeepSeek Harness 的呼叫弹窗与会话灯牌 · A call popup and a draggable session dock |
| 74 | [Baimacao/dsh-course-autoplay](https://github.com/Baimacao/dsh-course-autoplay) | 0 | 2026-11-26 | 2026-11-26 | 网课挂机 (dsh-course-autoplay) — DSH 插件：用已登录的浏览器自动播完网课并推进到下一节，带可视化面板、可复用的站点经验与计划文档。 |
| 75 | [boozik3412/dsh-media-artifacts](https://github.com/boozik3412/dsh-media-artifacts) | 0 | 2026-11-26 | 2026-11-26 | Preview images and videos in DeepSeek Harness chat and browse local project artifacts. |
| 76 | [bot-for-imitoy/dsh-ui-nl](https://github.com/bot-for-imitoy/dsh-ui-nl) | 0 | 2026-11-26 | 2026-11-26 | Natural-language UI operation for DSH: one tool (ui_operate) that hands an instruction to a subagent owning the numbered-image UI tools, then returns its report and, when asked, the screenshot. |
| 77 | [BrathonBai/dsh-github-publish](https://github.com/BrathonBai/dsh-github-publish) | 0 | 2026-11-26 | 2026-11-26 | 在 DeepSeek Harness 工作区菜单里一键发布项目到 GitHub：自动建仓、生成 README 与 .gitignore、提交并推送。 |
| 78 | [bruce2431/dsh-latex-editor](https://github.com/bruce2431/dsh-latex-editor) | 0 | 2026-11-26 | 2026-11-26 | 在 dsh 左侧栏读书稿、写 LaTeX、看 PDF：项目目录页 + 下沉编辑区 + 右侧 PDF 预览。 |
| 79 | [butterfly301/dsh-prompt-loader](https://github.com/butterfly301/dsh-prompt-loader) | 0 | 2026-11-22 | 2026-11-26 | Inject a per-language, hot-reloadable system-prompt section into a DeepSeek Harness agent. Prompt text lives in plain TXT files, one per language. |
| 80 | [bychance6600/dsh-comfy](https://github.com/bychance6600/dsh-comfy) | 0 | 2026-11-26 | 2026-11-26 | 给 dsh-perch 里的她画一张图：本机 ComfyUI 出图，存进她家 media/qq/comfy，交回一行可直接发出去的 \[图片\]… |
| 81 | [Calorios/dsh-auto-approve-lite](https://github.com/Calorios/dsh-auto-approve-lite) | 0 | 2026-11-26 | 2026-11-26 | Session-scoped auto-approval and approval history for DeepSeek Harness. |
| 82 | [Casper-Mars/dsh-agent-uiux](https://github.com/Casper-Mars/dsh-agent-uiux) | 0 | 2026-11-26 | 2026-11-26 | UI/UX 设计师 dsh 角色包：人设 + 8 只读 Skill + uiux preset |
| 83 | [cattreemaybe/ai-wish-001-timetable](https://github.com/cattreemaybe/ai-wish-001-timetable) | 0 | 2026-11-26 | 2026-11-26 | AI-WISH-001 新高考智能走班排课工作台：OR-Tools CP-SAT、独立校验器、DSH 插件与 React 工作台 |
| 84 | [cenweixin199/dsh-figma-spec](https://github.com/cenweixin199/dsh-figma-spec) | 0 | 2026-11-26 | 2026-11-26 | Read a Figma frame's real style data over the REST API - box, per-side strokes, gradients, effects, radii, arc data, grid gaps, typography - and render it as a spec table, type scale, palette, or node diff. A DeepSeek Harness plugin. |
| 85 | [Charlieeeo/dsh-next-reply](https://github.com/Charlieeeo/dsh-next-reply) | 0 | 2026-11-26 | 2026-11-26 | 在每条回答下方显示最多 3 条竖排的下一步建议：建议由主回复自身给出、不额外调用模型；点文字填入输入框，点按钮直接发送。 |
| 86 | [ckbw1941-crypto/dsh-paperang-print](https://github.com/ckbw1941-crypto/dsh-paperang-print) | 0 | 2026-11-26 | 2026-11-26 | Print on a Paperang P2 HD thermal printer from DSH |
| 87 | [clown-lee/dsh-qwenwork-bridge](https://github.com/clown-lee/dsh-qwenwork-bridge) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness plugin: use QwenWork (千问办公) built-in models as a DSH provider, with a live credits badge and daily check-in. |
| 88 | [clown-lee/dsh-trae-bridge](https://github.com/clown-lee/dsh-trae-bridge) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness plugin: use Trae IDE built-in models (Doubao, DeepSeek, GLM, Kimi, Seed) as a DSH provider, plus daily check-in. |
| 89 | [compilink/dsh-docker-upgrade-plugin](https://github.com/compilink/dsh-docker-upgrade-plugin) | 0 | 2026-11-24 | 2026-11-26 | 在 DeepSeek Harness 设置页检查官方源码更新，配合宿主升级服务手动或定时构建、验证并部署本地 Docker 容器。 |
| 90 | [csw7777/dsh-trajectory-diff](https://github.com/csw7777/dsh-trajectory-diff) | 0 | 2026-11-26 | 2026-11-26 | Deterministic semantic diff for agent trajectories: first divergence, tool-call alignment, token usage, and JSON reports. |
| 91 | [CSYIX2011/dsh-ai-sheet](https://github.com/CSYIX2011/dsh-ai-sheet) | 0 | 2026-11-26 | 2026-11-26 | 面向 DeepSeek Harness 的本地表格插件：左侧入口、表格网页、15 个表格/导入工具与 AI表格模式预设。MIT |
| 92 | [CYF736222347/dsh-programming-mode-zh](https://github.com/CYF736222347/dsh-programming-mode-zh) | 0 | 2026-11-26 | 2026-11-26 | 编程模式 · 中文：DSH 插件，在标准模式之上强制执行 Superpowers 工程纪律，persona 与 reasoning 默认简体中文。Chinese localization of ziduup/dsh-programming-mode (preset id programming-zh, installable alongside upstream). |
| 93 | [Daaaaavid-zhou/dsh-camera](https://github.com/Daaaaavid-zhou/dsh-camera) | 0 | 2026-11-26 | 2026-11-26 | Local photo capture plugin for DeepSeek Harness (macOS): live preview above the input box; captured photos go straight into the message as attachments. Comes with a bundled macOS camera app. |
| 94 | [dake6767/dsh-phalanx](https://github.com/dake6767/dsh-phalanx) | 0 | 2026-10-03 | 2026-11-26 | Self-hosted multi-user DeepSeek Harness platform for teams — isolated rootless Podman workspaces with platform-held credentials for models, plugins, skills, and MCP. |
| 95 | [DanMo661/DSH-Zui](https://github.com/DanMo661/DSH-Zui) | 0 | 2026-11-26 | 2026-11-26 | DSH-Zui — ZCode-style UI pack for DeepSeek Harness: two-pane model picker with thought-effort slider (ported from zai-org/ZCode), agent-team switch, status capsules with live subagent cards |
| 96 | [DAnonyvinciT/dsh-preset-composer](https://github.com/DAnonyvinciT/dsh-preset-composer) | 0 | 2026-11-26 | 2026-11-26 | Visual composer for DSH agent presets |
| 97 | [Daphne999/dsh-promo-card](https://github.com/Daphne999/dsh-promo-card) | 0 | 2026-11-26 | 2026-11-26 | Turn a plugin release into a ready-to-post promo kit: a small title, plain-language body, hashtags and a self-contained 1080x1440 HTML cover. Deterministic templates, offline, zero runtime dependencies, no model. |
| 98 | [DDVIP/dsh-memory-yuan](https://github.com/DDVIP/dsh-memory-yuan) | 0 | 2026-11-26 | 2026-11-26 | Markdown-file memory for DSH: 13 memory tools, L0/L1/L2 injection, console panel and graph view |
| 99 | [dehong831-arch/dsh-ComboLab](https://github.com/dehong831-arch/dsh-ComboLab) | 0 | 2026-11-26 | 2026-11-26 | ComboLab —— DSH Web 设置页里的插件组合体检台。选一个封存用例，一键跑空白/仅 A/仅 B/A+B 四组对照，逐轮查看装配顺序、失败指纹、截图和清理证据；内置三份历史复验报告。专治「单独没事、一起就崩」的插件组合 bug。仅随同版 ComboLab 查看器离线使用，支持 Windows x64 的 DSH Web 三个 RC 版本。 |
| 100 | [Demonese/dsh-remember-reasoning-effort](https://github.com/Demonese/dsh-remember-reasoning-effort) | 0 | 2026-11-26 | 2026-11-26 | 记住上次选择的推理等级，切换模型后自动应用。 |
| 101 | [dengjx1-apk/dsh-soft-moe](https://github.com/dengjx1-apk/dsh-soft-moe) | 0 | 2026-11-25 | 2026-11-26 | 让你的Deepseek变得更加可爱 |
| 102 | [dengnianchen/dsh-workspace-panels](https://github.com/dengnianchen/dsh-workspace-panels) | 0 | 2026-11-26 | 2026-11-26 | 工作区视图：给 DSH 右侧栏「开始」页加一张卡片，列出当前会话所属工作区的自定义视图，选中即在侧栏标签页中渲染，可多开。附带 workspace-panels 技能。 |
| 103 | [dkmnx/recollect](https://github.com/dkmnx/recollect) | 0 | 2026-11-18 | 2026-11-26 | Local-first, Markdown-native memory engine for coding agents. Durable facts, ranked and hybrid search, privacy filters, and an OpenCode adapter. |
| 104 | [dragonLongZ/dsh-integration-env](https://github.com/dragonLongZ/dsh-integration-env) | 0 | 2026-11-26 | 2026-11-26 | 给 DSH 加一个右栏「集成环境」面板：把Nacos / MySQL / Redis / MongoDB / MQTT这些连接实例集中配置一次，然后按会话勾选本次使用哪些。模型工具通过读取同一个选择，不需要你把连接信息贴进对话里。 |
| 105 | [dragonLongZ/log-mcp-starter](https://github.com/dragonLongZ/log-mcp-starter) | 0 | 2026-10-29 | 2026-11-26 | 适用于jumpserver的日志查询mcp并配置对应的dsh插件 |
| 106 | [DreamRepair/dsh-go-quota](https://github.com/DreamRepair/dsh-go-quota) | 0 | 2026-11-26 | 2026-11-26 | OpenCode Go 用量状态栏 for DSH Web: 5h / weekly / monthly usage beside the composer |
| 107 | [Dreftian/Rea](https://github.com/Dreftian/Rea) | 0 | 2026-11-26 | 2026-11-26 | Ingeniería inversa de cualquier cosa con agentes, desde el comportamiento de una aplicación hasta binarios nativos. |
| 108 | [drscrewdriver/dsh-progress-union](https://github.com/drscrewdriver/dsh-progress-union) | 0 | 2026-11-26 | 2026-11-26 | 进度结合原型：board 槽位真相源 × 鲸程时间/ETA 引擎，并向压缩类插件暴露只读 progressAnchor 三层锚点（service + HTTP 双平面）。基于 l3j3y3/dsh-progress-board (MIT) 与 uuhihj/task-progress-bar (MIT)。 |
| 109 | [DrWang1/dsh-mode-cycle-by-tab](https://github.com/DrWang1/dsh-mode-cycle-by-tab) | 0 | 2026-10-19 | 2026-11-26 | Tab / Shift+Tab cycle composer modes (normal &lt;-&gt; plan) in DeepSeek Harness — switching through the official /plan handler, so no command row is logged. 对齐 opencode 的 agent_cycle。 |
| 110 | [dsAI-Q/dsh-mg-video](https://github.com/dsAI-Q/dsh-mg-video) | 0 | 2026-11-26 | 2026-11-26 | Motion-graphics video renderer for DSH: one JSON manifest becomes a 1080p MG video. Template + effect library, screenshot callouts for screen recordings, procedural audio. Local only. |
| 111 | [Dstrue/dsh-private-persona](https://github.com/Dstrue/dsh-private-persona) | 0 | 2026-11-26 | 2026-11-26 | 自用 Agent 预设集：目前是「星见」——光学 / 天文 / 太阳物理观测者。standard 工具面 + 跨会话长期记忆，以后会继续加预设。 |
| 112 | [Dstrue/dsh-responses-api-injector](https://github.com/Dstrue/dsh-responses-api-injector) | 0 | 2026-11-26 | 2026-11-26 | 通过本地回环中转，把任意字段注入 Responses API 请求体，让 web_search 等服务端工具无需改动 DSH 即可生效。 |
| 113 | [Dstrue/dsh-whale-loli-standard](https://github.com/Dstrue/dsh-whale-loli-standard) | 0 | 2026-11-26 | 2026-11-26 | 鲸鱼娘 Agent 预设（三个）：原版 / 活人版 / 涩涩版。沿用官方 standard 预设的整套工具面，三个预设共用一本会自动维护的长期记忆。 |
| 114 | [eleysia111/agy-video-reader](https://github.com/eleysia111/agy-video-reader) | 0 | 2026-11-26 | 2026-11-26 | Drop a Bilibili / YouTube link for your AI Agent to watch videos, read subtitles, and browse hot comments &amp; danmaku. Built for Antigravity (Plugin + MCP App) &amp; DeepSeek Harness (DSH). |
| 115 | [EricZhou0815/dsh-chrome-dictation](https://github.com/EricZhou0815/dsh-chrome-dictation) | 0 | 2026-11-26 | 2026-11-26 | Dictate into DeepSeek Harness with Chrome's built-in speech recognition; no local model or dependency download. |
| 116 | [Ethan-lamlam/dsh-notes](https://github.com/Ethan-lamlam/dsh-notes) | 0 | 2026-11-26 | 2026-11-26 | WYSIWYG local Markdown notebook tab for DeepSeek Harness (dsh) - Feishu-style shortcuts, inline image paste, no cloud. |
| 117 | [FAKE0704/dsh-fabric-memory](https://github.com/FAKE0704/dsh-fabric-memory) | 0 | 2026-11-05 | 2026-11-26 | fabric 织物工具的 dsh 自包含插件：kb 知识库镜像 + memory 记忆原子 + kb-inbox 修订收件箱 |
| 118 | [FAKE0704/dsh-local-llm](https://github.com/FAKE0704/dsh-local-llm) | 0 | 2026-11-06 | 2026-11-26 | 本机无头本地 LLM 的 dsh 插件：登记/探活/启停/问答/拉取五工具 + 设置页 + 模型接入对话 |
| 119 | [FashionChen111/Mail-Assistant-Plugin](https://github.com/FashionChen111/Mail-Assistant-Plugin) | 0 | 2026-11-25 | 2026-11-26 | Draft-only, privacy-first Microsoft Exchange (EWS + NTLM) Mail Assistant plugin for DeepSeek Harness — folder ACL, @mail scoping, and Agent activity history. |
| 120 | [fengguanghuai/dsh-workspace-tools](https://github.com/fengguanghuai/dsh-workspace-tools) | 0 | 2026-11-26 | 2026-11-26 | Let DeepSeek Harness agents manage sidebar workspaces and session titles directly through chat. |
| 121 | [Fred-wizard/dsh-session-assistant](https://github.com/Fred-wizard/dsh-session-assistant) | 0 | 2026-11-26 | 2026-11-26 | DSH Session Assistant: pinned and recent sessions with local Codex conversation and memory import |
| 122 | [future/dsh-tailscale-link](https://github.com/future/dsh-tailscale-link) | 0 | 2026-11-26 | 2026-11-26 | Publishes the DSH Web GUI on your tailnet and writes the ready-to-open login URL to ~/.dsh/tailnet-url.json and .txt. |
| 123 | [fzjmaclearn/zack-calendar](https://github.com/fzjmaclearn/zack-calendar) | 0 | 2026-11-26 | 2026-11-26 | DSH插件的日历+todo list  |
| 124 | [G-TY/dsh-tokens](https://github.com/G-TY/dsh-tokens) | 0 | 2026-11-26 | 2026-11-26 | 把各个服务的令牌集中存进 DSH 凭据库：侧栏「令牌保管库」面板管理，每个会话可用 token_vault 工具列出、读取或保存。A token vault for DeepSeek Harness: keep API tokens in the DSH credential store, manage them from a sidebar panel, and let every session discover them through the token_vault tool. |
| 125 | [G33s3Fr13s/dsh-weread-free-library](https://github.com/G33s3Fr13s/dsh-weread-free-library) | 0 | 2026-11-26 | 2026-11-26 | 微信读书「免费图书馆」每周书币价格排行 — DSH 技能插件（官方接口抓取，含评分，可排序 HTML/CSV/Markdown） |
| 126 | [GarinZ/dsh-favorites](https://github.com/GarinZ/dsh-favorites) | 0 | 2026-11-26 | 2026-11-26 | DSH 收藏夹：全局收藏助手回答与划选片段，可搜索、分组并跳回原会话。 |
| 127 | [github-yousen/dsh-workbuddy-browser](https://github.com/github-yousen/dsh-workbuddy-browser) | 0 | 2026-11-26 | 2026-11-26 | Drive your own logged-in Chrome or Edge through the WorkBuddy browser extension, as 32 MCP tools in DeepSeek Harness. |
| 128 | [gpboyer2/dsh-finish-line](https://github.com/gpboyer2/dsh-finish-line) | 0 | 2026-11-25 | 2026-11-26 | DeepSeek Harness plugin: when every session in a workspace has finished, runs two closing steps in series — consolidate the diff into shared modules, then review, commit and push in batches. |
| 129 | [gpboyer2/dsh-web-fetch-open](https://github.com/gpboyer2/dsh-web-fetch-open) | 0 | 2026-11-16 | 2026-11-26 | DeepSeek Harness plugin: unrestricted web_fetch provider for localhost, private networks, fake-ip ranges and file:// paths. |
| 130 | [guhanfei-ai/dsh-workspace-cake](https://github.com/guhanfei-ai/dsh-workspace-cake) | 0 | 2026-11-26 | 2026-11-26 | One bundle for the DSH workspace list: context-menu shortcuts, workspace pinning, recency ordering, running/unread status marks, and a collapse-all button. |
| 131 | [HandsYe/dsh-off-work-countdown](https://github.com/HandsYe/dsh-off-work-countdown) | 0 | 2026-11-26 | 2026-11-26 | A draggable off-work countdown card for DeepSeek Harness with customizable workdays and off-work time. |
| 132 | [HanYu-me/dsh-novel-panel](https://github.com/HanYu-me/dsh-novel-panel) | 0 | 2026-11-26 | 2026-11-26 | 专为纯 AI 写小说设计的 DeepSeek Harness 插件：整理并持续提供小说的关键信息（人物、关系、时间线、主线节点、伏笔、待拍板的问题），每一轮都交给写作 AI。 \| Built for novels written purely by AI: keeps the story key information and hands it to the writing model every turn. |
| 133 | [hbx111/dsh-unlock](https://github.com/hbx111/dsh-unlock) | 0 | 2026-11-26 | 2026-11-26 | DSH 插件：给系统提示词挂上宽松内容政策与末尾兜底段，并把别处带来的严格 content_policy 块就地换掉 |
| 134 | [hbycwzm001/dsh-plugin-voiceover](https://github.com/hbycwzm001/dsh-plugin-voiceover) | 0 | 2026-11-26 | 2026-11-26 | DSH 配音插件：写文案 + 上传自己的音色 + 本地多引擎离线配音（CosyVoice3 / Qwen3-TTS / VoxCPM2） |
| 135 | [Hector387420489/dsh-session-reaper](https://github.com/Hector387420489/dsh-session-reaper) | 0 | 2026-11-26 | 2026-11-26 | DSH plugin: delete a session log from the session list and drop its row immediately. |
| 136 | [heenljy/tan-memory](https://github.com/heenljy/tan-memory) | 0 | 2026-11-26 | 2026-11-26 | Portable long-term memory for AI agents: L1 profile, topic cards with hard routing, journal and session archive. Zero-dependency core; runs as a library, an MCP server, or a host plugin. |
| 137 | [hgognav233-netizen/dsh-puppy-workflow](https://github.com/hgognav233-netizen/dsh-puppy-workflow) | 0 | 2026-11-26 | 2026-11-26 | A DSH plugin: puppies on a pixel-art island act out every real step your AI agent takes. 给新手看 AI 在电脑上干什么。 |
| 138 | [hippone/dsh-aurora-background](https://github.com/hippone/dsh-aurora-background) | 0 | 2026-11-26 | 2026-11-26 | Animated aurora background theme for the DeepSeek Harness Web GUI |
| 139 | [huanyu-a/dsh-profile-config-sync](https://github.com/huanyu-a/dsh-profile-config-sync) | 0 | 2026-11-24 | 2026-11-26 | DSH 多端配置备份 / 同步 / 还原：12 组内容（profile、提示词、Skills、预设、插件数据、工作区与会话）→ 自有 Git 或 WebDAV，一条命令换机、重装、回滚。退出后执行、覆盖前留底、凭据不入库。Windows + macOS/Linux。Config sync for DeepSeek Harness. |
| 140 | [huanyu-a/dsh-ssh-hub](https://github.com/huanyu-a/dsh-ssh-hub) | 0 | 2026-11-17 | 2026-11-26 | Server fleet operations hub for DeepSeek Harness: SSH transport (inherited from @linxin666/dsh-ssh) plus inspection, metrics/alerting, deployment orchestration, cross-host log search, credential hardening and audit trail. |
| 141 | [HUanyu2609-111/dsh-model-failover](https://github.com/HUanyu2609-111/dsh-model-failover) | 0 | 2026-11-25 | 2026-11-26 | DeepSeek Harness 模型故障切换插件。当前模型因为任意问题在会话中请求失败时，插件按配置寻找其他服务商的备用模型，在同一个会话里自动接着回答，不用重新发送问题或新建会话。 |
| 142 | [Ice-Bearmax/canghai](https://github.com/Ice-Bearmax/canghai) | 0 | 2026-11-26 | 2026-11-26 | 藏海 canghai · 二次元知识图鉴引擎 + 控制面板（QQAgent / DSH 双宿主，可插拔外部数据源，本地秒查） |
| 143 | [ICEAXEMAN/dsh-lm-studio-polish](https://github.com/ICEAXEMAN/dsh-lm-studio-polish) | 0 | 2026-11-26 | 2026-11-26 | DSH 插件：LM Studio 文风润色 —— DSH 负责思考，本地模型只负责说话 |
| 144 | [imluyg/dsh-pwsh-windows-guard](https://github.com/imluyg/dsh-pwsh-windows-guard) | 0 | 2026-11-26 | 2026-11-26 | DSH host plugin that detects Windows PowerShell version and injects host-specific rules into the system prompt |
| 145 | [JackyZhou0227/dsh-phone-fleet](https://github.com/JackyZhou0227/dsh-phone-fleet) | 0 | 2026-11-01 | 2026-11-26 | DSH 插件：同时操作多台手机，一会话一设备互不抢占，右侧栏实时投屏 · Drive multiple phones from DSH sessions at once, one session per device. |
| 146 | [JNightDS/dsh-price-chip](https://github.com/JNightDS/dsh-price-chip) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness 峰谷价签 |
| 147 | [joao-paulo-santos/dsh-john-tweaks](https://github.com/joao-paulo-santos/dsh-john-tweaks) | 0 | 2026-11-26 | 2026-11-26 | John's tweaks: small quality-of-life adjustments to DSH gathered in one default plugin |
| 148 | [JoblessJoe/deep-toolbox](https://github.com/JoblessJoe/deep-toolbox) | 0 | 2026-11-26 | 2026-11-26 | dsh plugin: which tools your agents use, which fail, and what each costs in every request |
| 149 | [jqlong17/doublecheck-ios](https://github.com/jqlong17/doublecheck-ios) | 0 | 2026-11-25 | 2026-11-26 | 写 iOS 时 AI 最容易踩的 100 个坑，一条命令全查：每个动作带前置条件、后置断言与回滚 |
| 150 | [Kirakila7/dsh-plugin-devlog-poster](https://github.com/Kirakila7/dsh-plugin-devlog-poster) | 0 | 2026-11-26 | 2026-11-26 | DSH (DeepSeek Harness) Build-in-Public devlog generator &amp; multi-platform publisher for GitHub, Xiaohongshu, Bilibili, and Douyin (Big Fat Fish / Gemini / ChatGPT / Claude styles) |
| 151 | [kl998/dsh-privacy-guard](https://github.com/kl998/dsh-privacy-guard) | 0 | 2026-11-26 | 2026-11-26 | Privacy guard for DeepSeek Harness: masks PII before the model reads it and stops Session-log upload for Sessions that touched documents |
| 152 | [ku4nc4/dsh-history-window](https://github.com/ku4nc4/dsh-history-window) | 0 | 2026-11-26 | 2026-11-26 | Shrink the initial session-history page so opening an old DSH session paints sooner |
| 153 | [KunWu1980/dsh-books-plugin](https://github.com/KunWu1980/dsh-books-plugin) | 0 | 2026-11-26 | 2026-11-26 | A bookshelf plugin for DeepSeek Harness — read &amp; manage TXT/EPUB/PDF/AZW3 libraries inside the app. |
| 154 | [laibanet/dsh-code-review-tab](https://github.com/laibanet/dsh-code-review-tab) | 0 | 2026-11-26 | 2026-11-26 | A DeepSeek Harness plugin: native right-sidebar code review for git commits, the working tree, and per-turn agent changes, with inline editing.（人话，能看到dsh改了哪些代码，自己也可以编辑修改） |
| 155 | [LANHJUN/DSH-Peak-Trough-Visual-Plugin](https://github.com/LANHJUN/DSH-Peak-Trough-Visual-Plugin) | 0 | 2026-11-14 | 2026-11-26 | DSH 标题栏插件：北京时间高峰/低谷胶囊（22px，自动跟随国务院节假日与调休上班日） |
| 156 | [li1378380/dsh-file-search](https://github.com/li1378380/dsh-file-search) | 0 | 2026-11-26 | 2026-11-26 | Local full-text file search for DeepSeek Harness: search text files in code/desktop/downloads/workspace, returns matching lines and context. Read-only, zero-dependency, local. |
| 157 | [Liam-liyaming/dsh-result-comments](https://github.com/Liam-liyaming/dsh-result-comments) | 0 | 2026-11-26 | 2026-11-26 | dsh |
| 158 | [liangyishi27/dsh-progressive-tool](https://github.com/liangyishi27/dsh-progressive-tool) | 0 | 2026-11-26 | 2026-11-26 | Hermes-style progressive tool disclosure for DeepSeek Harness: core tools stay direct, the long tail is found on demand. |
| 159 | [lidaiyue/dsh-ai-news](https://github.com/lidaiyue/dsh-ai-news) | 0 | 2026-11-26 | 2026-11-26 |  DSH 会话标题栏展示 Today for AI 的 AI 动态 |
| 160 | [lidaiyue/dsh-eye-theme](https://github.com/lidaiyue/dsh-eye-theme) | 0 | 2026-11-26 | 2026-11-26 | dsh设置 → 通用 → 背景、字重与行高 |
| 161 | [lidaiyue/dsh-market-indices](https://github.com/lidaiyue/dsh-market-indices) | 0 | 2026-11-26 | 2026-11-26 | 在 DSH 会话标题栏显示市场行情卡片 |
| 162 | [lidaiyue/dsh-workbuddy](https://github.com/lidaiyue/dsh-workbuddy) | 0 | 2026-11-26 | 2026-11-26 | 把本机已登录的 WorkBuddy 桌面端接到 DeepSeek Harness |
| 163 | [lijiawei255/dsh-plugin-solarized-eyecare](https://github.com/lijiawei255/dsh-plugin-solarized-eyecare) | 0 | 2026-11-26 | 2026-11-26 | Solarized eye-care theme for DeepSeek Harness (Desktop app and Web GUI): higher-contrast light/dark palette. |
| 164 | [lintaojlu/dsh-inplace-edit](https://github.com/lintaojlu/dsh-inplace-edit) | 0 | 2026-11-26 | 2026-11-26 | Edit an earlier DSH prompt in the same session and send it again. |
| 165 | [linyu19872008/rocky-mem-dsh](https://github.com/linyu19872008/rocky-mem-dsh) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness bundle for rocky-mem: session-start context injection, task-time retrieval, and the portable agent skill. |
| 166 | [liqiangai/dsh-code-editor](https://github.com/liqiangai/dsh-code-editor) | 0 | 2026-11-26 | 2026-11-26 | A VS Code-style code editor for the DeepSeek Harness right sidebar: file tree, tabs, syntax highlighting, view modes and Markdown preview, quick open, atomic saves. |
| 167 | [lisiluan/dsh-capability-map](https://github.com/lisiluan/dsh-capability-map) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness (DSH) plugin — a right-sidebar tab that maps skills, tools and MCP tools used in the current session, with per-capability call counts. |
| 168 | [listky/dsh-ali-open-code-review](https://github.com/listky/dsh-ali-open-code-review) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness plugin for alibaba/open-code-review, reusing the official OCR CLI and skills under Apache-2.0. |
| 169 | [liunian1888/dsh-memory-star-map](https://github.com/liunian1888/dsh-memory-star-map) | 0 | 2026-11-24 | 2026-11-26 | Memory Star Map - a DeepSeek Harness (DSH) plugin that renders your session memories as an interactive 3D night sky: glassy Earth, 28 renameable lunar mansions, meteor showers, focus mode, time travel, stats HUD and PNG/JSON export. |
| 170 | [lliMill/dsh-persona-manager](https://github.com/lliMill/dsh-persona-manager) | 0 | 2026-11-26 | 2026-11-26 | Per-mode persona control for DeepSeek Harness |
| 171 | [loveeveryone-Mr-niu/dsh-keykeeper](https://github.com/loveeveryone-Mr-niu/dsh-keykeeper) | 0 | 2026-11-26 | 2026-11-26 | 这个是使用deepseek写的一个本地保存api-key的插件，可以方便你管理和转移你的DSH内的api配置 |
| 172 | [lsit27/dsh-mobile-route-priority](https://github.com/lsit27/dsh-mobile-route-priority) | 0 | 2026-11-26 | 2026-11-26 | Route priority controller for dsh-mobile-plugin: LAN-first, automatic quality picking, and manual order with latency-threshold failover. |
| 173 | [LunateTy/dsh-account-avatar](https://github.com/LunateTy/dsh-account-avatar) | 0 | 2026-11-26 | 2026-11-26 | Replaces the sidebar account avatar with your own picture: upload, crop, and it is stored on this machine. The account menu, sign-in and notifications stay untouched. |
| 174 | [luojuee/dsh-voice-fish](https://github.com/luojuee/dsh-voice-fish) | 0 | 2026-11-26 | 2026-11-26 | 让 DSH 里的 AI 开口说话：Edge 神经音色 / 朗读桥 / 系统语音三选一，音色自选，收尾念结果概括。 |
| 175 | [LvLaoTou/dsh-hindsight-manager](https://github.com/LvLaoTou/dsh-hindsight-manager) | 0 | 2026-11-26 | 2026-11-26 | Manage Hindsight memory banks from DeepSeek Harness: map DSH workspaces, Bots projects and group chats to their own banks. |
| 176 | [lvyawei5-design/dsh-agent-notebook](https://github.com/lvyawei5-design/dsh-agent-notebook) | 0 | 2026-11-26 | 2026-11-26 | Sidebar notebook for DeepSeek Harness: records what the assistant did, reads checked notes before every task. |
| 177 | [mbcc5732/dsh-screenshot](https://github.com/mbcc5732/dsh-screenshot) | 0 | 2026-11-26 | 2026-11-26 | DSH 对话截屏插件：豆包同款选区界面，框选后作为图片附件插入当前草稿（Windows only） |
| 178 | [meng-lx/dsh-blueprint-tree](https://github.com/meng-lx/dsh-blueprint-tree) | 0 | 2026-11-21 | 2026-11-26 | 给 AI 一张工作图，给你一张检查图。DeepSeek Harness 可执行蓝图：按子图组织项目，按单元查看依赖、修改和测试。 |
| 179 | [mioakiyama0809-coder/dsh-context-fold](https://github.com/mioakiyama0809-coder/dsh-context-fold) | 0 | 2026-11-25 | 2026-11-26 | Selective range context folding for DeepSeek Harness — fold verification detours into editable dual-layer Markdown archives and hot-sync back in place without losing main-thread context. |
| 180 | [miorin-chan/dsh-auto-pin-session](https://github.com/miorin-chan/dsh-auto-pin-session) | 0 | 2026-11-26 | 2026-11-26 | Pins a new session in the sidebar when you send its first message. |
| 181 | [miorin-chan/dsh-collapsed-sidebar-status](https://github.com/miorin-chan/dsh-collapsed-sidebar-status) | 0 | 2026-11-26 | 2026-11-26 | Show running, waiting, and completed session counts beside the collapsed sidebar controls, with a quick-jump popover. |
| 182 | [miorin-chan/dsh-subtle-sidebar](https://github.com/miorin-chan/dsh-subtle-sidebar) | 0 | 2026-11-26 | 2026-11-26 | Starts with the left sidebar collapsed and swaps the default left and right sidebar shortcuts. |
| 183 | [morning-start/dsh-plugin-creator](https://github.com/morning-start/dsh-plugin-creator) | 0 | 2026-11-26 | 2026-11-26 | DSH 插件开发增强：只扩展创造模式，覆盖从起模板到发版的全周期 |
| 184 | [moshangssh/dsh-hindsight-manager](https://github.com/moshangssh/dsh-hindsight-manager) | 0 | 2026-11-19 | 2026-11-26 | Configure the official Hindsight plugin, inspect recall and writeback activity, and optionally recall memories each turn in DeepSeek Harness. |
| 185 | [music875/dsh-workbuddy-pulse](https://github.com/music875/dsh-workbuddy-pulse) | 0 | 2026-11-26 | 2026-11-26 | WorkBuddy 峰谷/拥堵/积分状态条 for dsh-go · Peak rate, queue level and live credits in the dsh-go composer |
| 186 | [muzhou91/dsh-team-desk](https://github.com/muzhou91/dsh-team-desk) | 0 | 2026-11-26 | 2026-11-26 | Teams of DeepSeek Harness (DSH) Sessions: lane-routed work by preset, a two-gate acceptance chain, a project workspace with timeline and inbox, versioned project documents, and an HTTP hub for members on other accounts. MIT, English UI. |
| 187 | [mycherish/dsh-plugin-cealum-tint](https://github.com/mycherish/dsh-plugin-cealum-tint) | 0 | 2026-11-26 | 2026-11-26 | Recolour user chat bubbles in DeepSeek Harness — presets or any hex colour, WCAG auto-contrast text, clean uninstall. 云岫着色：为 DeepSeek Harness 用户气泡换色（预设或任意十六进制色）。Pre-release · MIT |
| 188 | [Niefee/dsh-svn-viewer](https://github.com/Niefee/dsh-svn-viewer) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness 的 SVN 只读文件查看器 |
| 189 | [nixuejun888/dsh-jarvis-sphere](https://github.com/nixuejun888/dsh-jarvis-sphere) | 0 | 2026-11-26 | 2026-11-26 | 贾维斯式球形神经元背景 for DeepSeek Harness Web：背景里的神经元球由任务真实执行数据驱动（运行状态 / 模型流式速率 / 工具调用），整层穿透点击。A Jarvis-style neural sphere driven by live agent activity. |
| 190 | [noir-hedgehog/DeepseekHarnessEmbed](https://github.com/noir-hedgehog/DeepseekHarnessEmbed) | 0 | 2026-09-14 | 2026-11-26 | Embed your DeepSeek Harness Web GUI in an Obsidian sidebar — the vault becomes the agent's workspace. |
| 191 | [NUAAHANDA/dsh-composer-enhance](https://github.com/NUAAHANDA/dsh-composer-enhance) | 0 | 2026-11-26 | 2026-11-26 | A four-point star in the DeepSeek Harness composer that rewrites your draft in place into a clearer prompt, with a one-click back button. |
| 192 | [pseudonymzjt/dsh-direct-human-style](https://github.com/pseudonymzjt/dsh-direct-human-style) | 0 | 2026-11-26 | 2026-11-26 | Always-on direct human style contract for DeepSeek Harness: strips GPT and DeepSeek filler from every reply, with a prose scanner. |
| 193 | [qdqzy/dsh-token-cost](https://github.com/qdqzy/dsh-token-cost) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness local plugin: real-time token cost meter (per-model + total) next to the token-usage pill |
| 194 | [qianhaoq/dota2.ai](https://github.com/qianhaoq/dota2.ai) | 0 | 2026-01-31 | 2026-11-26 | An evidence-first Dota 2 post-match coach — web, JSON API, CLI and MCP. 拿证据说话的 Dota 2 赛后教练。 |
| 195 | [qinghuidaqzp/dsh-focus-garden](https://github.com/qinghuidaqzp/dsh-focus-garden) | 0 | 2026-11-26 | 2026-11-26 | 🌱 番茄花园：让专注时间开出花朵的 DeepSeek Harness 趣味插件。 |
| 196 | [qinghuidaqzp/dsh-idea-dice](https://github.com/qinghuidaqzp/dsh-idea-dice) | 0 | 2026-11-26 | 2026-11-26 | 🎲 灵感骰子：创作灵感卡、带权选择转盘与多面骰，DeepSeek Harness 原生插件。 |
| 197 | [qinghuidaqzp/dsh-qinghui-quests](https://github.com/qinghuidaqzp/dsh-qinghui-quests) | 0 | 2026-11-26 | 2026-11-26 | ⚔️ 任务冒险日志：完成任务获得 XP、升级与徽章，支持会话进度持久保存。 |
| 198 | [qinghuidaqzp/dsh-qinghui-vision](https://github.com/qinghuidaqzp/dsh-qinghui-vision) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness 看图助手：截图理解、OCR 与多图对比，支持云端视觉模型与本地 Ollama。 |
| 199 | [qingshui59/dsh-drama-board](https://github.com/qingshui59/dsh-drama-board) | 0 | 2026-11-26 | 2026-11-26 | 映序 Studio：DeepSeek Harness 的 AI 短剧工作台插件——立项、角色定妆、分集、分镜出图、配音，在本机合成竖屏 MP4 |
| 200 | [qiyaogongfang/dsh-rankings](https://github.com/qiyaogongfang/dsh-rankings) | 0 | 2026-11-26 | 2026-11-26 | 软件排行榜：苹果 App Store 与谷歌 Play 的每日榜单、飙升榜和中文简介，DSH 侧栏插件。 |
| 201 | [qlings/dsh-chrome](https://github.com/qlings/dsh-chrome) | 0 | 2026-11-26 | 2026-11-26 | DSH Chrome 插件 + MV3 扩展：让 DeepSeek Harness 接管本机 Chrome，读写页面、提交表单、抓接口、多标签对照，61 个动作 |
| 202 | [qq1003240666/qingshi-agent](https://github.com/qq1003240666/qingshi-agent) | 0 | 2026-11-24 | 2026-11-26 | 青史官方agent插件 |
| 203 | [qso/dsh-better-workspace-menu](https://github.com/qso/dsh-better-workspace-menu) | 0 | 2026-11-26 | 2026-11-26 | Enhance the DeepSeek Harness (DSH) sidebar workspace context menu with Copy workspace path, Copy more, 1-click favorite app open, Open in external apps, Open Git repository, Move to top, New session, Open latest session, and Archive idle sessions. |
| 204 | [qso/dsh-infinite-canvas-bridge](https://github.com/qso/dsh-infinite-canvas-bridge) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness bridge plugin for Infinite Canvas (v1.0+): folder-based persistent projects, right-sidebar live canvas, per-session isolated routing, and native agent tools. |
| 205 | [qtywoitpiw/dsh-approval-sound](https://github.com/qtywoitpiw/dsh-approval-sound) | 0 | 2026-11-26 | 2026-11-26 | DSH plugin: plays a chime when a permission-approval card appears in the current session |
| 206 | [Qxyz17/dsh-turn-alert](https://github.com/Qxyz17/dsh-turn-alert) | 0 | 2026-11-26 | 2026-11-26 | Windows desktop notifications + built-in system sounds for DeepSeek Harness turns (completion, failure, questions). |
| 207 | [rigelmansid/dsh-stock-flick](https://github.com/rigelmansid/dsh-stock-flick) | 0 | 2026-11-26 | 2026-11-26 | A-share industry heatmap, watchlist and portfolio for DeepSeek Harness |
| 208 | [RonaWhite/dsh-pet-voice-clone](https://github.com/RonaWhite/dsh-pet-voice-clone) | 0 | 2026-11-26 | 2026-11-26 | 用你自己的克隆音色念桌宠的话（SiliconFlow CosyVoice2）。dsh-pet 的音色 provider，DeepSeek Harness 插件。 |
| 209 | [ruochen361/dsh-work-summary](https://github.com/ruochen361/dsh-work-summary) | 0 | 2026-11-25 | 2026-11-26 | Scheduled daily, weekly and monthly work reports for DeepSeek Harness: collect the day's traces, validate structure, save reports, and push the next checklist onto a board. |
| 210 | [ryangallager0323-jpg/dsh-skin-atelier](https://github.com/ryangallager0323-jpg/dsh-skin-atelier) | 0 | 2026-11-26 | 2026-11-26 | Atelier — a warm paper-and-ink skin with liquid-glass surfaces for DeepSeek Harness |
| 211 | [scoaming/dsh-find-in-conversation](https://github.com/scoaming/dsh-find-in-conversation) | 0 | 2026-11-26 | 2026-11-26 | DSH plugin: Ctrl+F find bar that searches the current conversation and jumps between matches |
| 212 | [scoaming/dsh-turn-notify](https://github.com/scoaming/dsh-turn-notify) | 0 | 2026-11-26 | 2026-11-26 | DSH plugin: top-most desktop cards when a reply finishes or a Session waits for you (Windows) |
| 213 | [sdadbbb/dsh-session-onlyclean](https://github.com/sdadbbb/dsh-session-onlyclean) | 0 | 2026-11-26 | 2026-11-26 | Delete sessions of any workspace in the DeepSeek Harness Web UI. 在 DSH Web UI 中按工作区查看并永久删除会话。 |
| 214 | [sereinZ-Z-Z/DeepSeek-Balance-Whale-Widget-Mod](https://github.com/sereinZ-Z-Z/DeepSeek-Balance-Whale-Widget-Mod) | 0 | 2026-11-24 | 2026-11-26 | DSH（DeepSeek Harness）右下角余额小鲸鱼挂件二改版：基于 MeteorNOX 原版 v0.4.2，新增气泡余额显示源切换（官方 ⟷ 第三方 API）、余额颜色自定义（24 纯色 + 6 流动渐变）、一键重载页面，并修复选色失效等问题。MIT 许可。 |
| 215 | [SEUMysteryMan/DSH_session-Conversation-File-Import](https://github.com/SEUMysteryMan/DSH_session-Conversation-File-Import) | 0 | 2026-11-26 | 2026-11-26 | DSH_session对话文件导入：导入 JSONL、JSON 与会话日志 ZIP。 |
| 216 | [SEUMysteryMan/DSH-Ark-Quota-Dashboard-Plugin](https://github.com/SEUMysteryMan/DSH-Ark-Quota-Dashboard-Plugin) | 0 | 2026-11-26 | 2026-11-26 | DSH方舟额度看板插件：Token 用量、Agent Plan 剩余额度与账户余额。 |
| 217 | [SEUMysteryMan/DSH-GUI-Virtual-Desktop-and-Window-Control](https://github.com/SEUMysteryMan/DSH-GUI-Virtual-Desktop-and-Window-Control) | 0 | 2026-11-26 | 2026-11-26 | GUI（虚拟桌面与窗口控制）：Windows 截图、键鼠、窗口与虚拟桌面自动化。 |
| 218 | [SEUMysteryMan/DSH-Long-Term-Memory](https://github.com/SEUMysteryMan/DSH-Long-Term-Memory) | 0 | 2026-11-26 | 2026-11-26 | DSH长期记忆：跨会话记忆、自动召回与最近对话摘要。 |
| 219 | [sevenqcx/dsh-seven-inbox](https://github.com/sevenqcx/dsh-seven-inbox) | 0 | 2026-11-26 | 2026-11-26 | Attention-first session inbox for DeepSeek Harness preserving native sidebar chrome, with persistent multi-workspace filtering, elevated Working cards, and accurate running state. |
| 220 | [SHI2008/dsh-qgis-driver](https://github.com/SHI2008/dsh-qgis-driver) | 0 | 2026-11-19 | 2026-11-26 | Drive a running QGIS from DeepSeek Harness.  |
| 221 | [ShOpenMind/dsh-plugin-peak-valley](https://github.com/ShOpenMind/dsh-plugin-peak-valley) | 0 | 2026-11-26 | 2026-11-26 | DSH 插件：DeepSeek 高峰时段提交前三选一（低谷排队 / 本地模型 / 继续），低谷自动重发 |
| 222 | [SI-sases/sases-control](https://github.com/SI-sases/sases-control) | 0 | 2026-11-26 | 2026-11-26 | SASES Control: let agents operate self-hosted SASES instances (MCP + CLI) |
| 223 | [silent-QAQ/dsh-plugins-mcserver-manger](https://github.com/silent-QAQ/dsh-plugins-mcserver-manger) | 0 | 2026-11-26 | 2026-11-26 | 一个插件帮助你在侧边栏添加mc控制台 |
| 224 | [SillyMeo-1/dsh-see-touch](https://github.com/SillyMeo-1/dsh-see-touch) | 0 | 2026-11-26 | 2026-11-26 | My eyes and hands for Windows - a DSH plugin that sees the real screen and works the mouse and keyboard, with a recorded Blender gear demo. |
| 225 | [skj333/dsh-fold-answers](https://github.com/skj333/dsh-fold-answers) | 0 | 2026-11-26 | 2026-11-26 | DSH 插件：折叠不重要的助手回答与每轮文件卡片（纯显示层，不改会话日志与模型上下文） |
| 226 | [slobaloncar/livelaunch-mcp](https://github.com/slobaloncar/livelaunch-mcp) | 0 | 2026-11-24 | 2026-11-26 | Remote MCP server for LiveLaunch, the Solana token launchpad. Unsigned-transaction tools for AI agents. |
| 227 | [Sonder-frmc/dsh-subagent-window](https://github.com/Sonder-frmc/dsh-subagent-window) | 0 | 2026-11-26 | 2026-11-26 | DSH 子智能体对话浮窗插件（MIT）：把 DSH Web 客户端里的子智能体对话变成应用内可拖动的浮窗，提供右侧栏「开始」页卡片、会话头部与标签右键菜单等入口；浮窗内可查看、收发消息、接受权限确认与停止，关闭浮窗不结束子智能体。纯客户端、无第三方依赖。当前 v3.10。 |
| 228 | [stormcrown/dsh-avatar-plus](https://github.com/stormcrown/dsh-avatar-plus) | 0 | 2026-11-26 | 2026-11-26 | DSH Web 头像插件：AI/用户头像、导入即裁切、按会话与子智能体自定义头像与名字，附主 AI 与子智能体的群聊时间线。 |
| 229 | [T1113047/ds-saver](https://github.com/T1113047/ds-saver) | 0 | 2026-11-26 | 2026-11-26 | DS节约插件 — context/token saver for DeepSeek on OpenCode and DeepSeek Harness (DSH) |
| 230 | [tanbopiao/jixia-publish](https://github.com/tanbopiao/jixia-publish) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness plugin: publish content to Jixia, the agent-native content ecosystem. AI-generated content is mandatorily labeled and gated by Xuangui review. |
| 231 | [tanbopiao/xuangui-check](https://github.com/tanbopiao/xuangui-check) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness plugin: call the Xuangui public demo API — nine-class text classification, entity-relation extraction, and demo-member credit lookup. Read-only, stateless, zero credentials. |
| 232 | [Tanloon/dsh-share-chat-card](https://github.com/Tanloon/dsh-share-chat-card) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness plugin: export any records of a conversation as PNG images or one self-contained HTML page. |
| 233 | [tanson515/dsh-usage](https://github.com/tanson515/dsh-usage) | 0 | 2026-11-26 | 2026-11-26 | OpenCode Go usage panel for DeepSeek Harness: plan quota (rolling/weekly/monthly), local token stats, per-model cost, and one-click Go model list refresh |
| 234 | [tanxiaolong/dsh-battlefield](https://github.com/tanxiaolong/dsh-battlefield) | 0 | 2026-11-26 | 2026-11-26 | Floating in-app keyboard battlefield HUD for DSH: every keypress becomes gunfire, graded by how long you hold the key |
| 235 | [TianYi666666/dsh-ego-browser](https://github.com/TianYi666666/dsh-ego-browser) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness plugin: drive the ego lite browser from your agent (run ego-browser scripts, open pages, read snapshots) in the profile you are already signed in to. |
| 236 | [Tino0713/dsh_wechat_bot_talkingabout](https://github.com/Tino0713/dsh_wechat_bot_talkingabout) | 0 | 2026-11-26 | 2026-11-26 | Deepseek Harness插件，用于在左边栏显示【微信助手】，点击后查看聊天内容 |
| 237 | [tiregqw/controlgui](https://github.com/tiregqw/controlgui) | 0 | 2026-11-26 | 2026-11-26 | Visual DOM feedback and live CSS/text editing for coding agents |
| 238 | [tkkpku/timebudget-guard](https://github.com/tkkpku/timebudget-guard) | 0 | 2026-11-26 | 2026-11-26 | Stop an AI agent from silently grinding: a time budget plus three progress-window rules that force a report before the hour is gone. DeepSeek Harness plugin + portable Claude Code/Codex hook + rule pack. |
| 239 | [truecih/dsh-live-ops](https://github.com/truecih/dsh-live-ops) | 0 | 2026-11-26 | 2026-11-26 | Live-commerce operations playbook as on-demand DeepSeek Harness plugin tools: seven-layer funnel diagnosis, 15 role briefs, 11-step SOP, 10 templates. |
| 240 | [ttackqwed/dsh-session-log-import](https://github.com/ttackqwed/dsh-session-log-import) | 0 | 2026-11-26 | 2026-11-26 | Restore a DeepSeek Harness session-log export ZIP as a stored session, so the conversation returns to the sidebar and can be continued. |
| 241 | [txp2026txp/dsh-connect-loomy](https://github.com/txp2026txp/dsh-connect-loomy) | 0 | 2026-11-26 | 2026-11-26 | 把讯飞 Loomy 接成 DeepSeek Harness 的模型提供方：复用桌面端登录态，提供模型目录、对话与积分。 |
| 242 | [unifilitence/dsh-perf-guard](https://github.com/unifilitence/dsh-perf-guard) | 0 | 2026-11-26 | 2026-11-26 | Zero-polling performance guard, reversible session cold-archiver, and on-demand storage doctor for DeepSeek Harness (DSH). |
| 243 | [VanillaNahida/dsh-bluearchive-theme](https://github.com/VanillaNahida/dsh-bluearchive-theme) | 0 | 2026-11-06 | 2026-11-26 | 高还原度的 DeepSeek Harness 蔚蓝档案主题 |
| 244 | [VictoriaCloud360/dsh-llm-provider-audit](https://github.com/VictoriaCloud360/dsh-llm-provider-audit) | 0 | 2026-11-26 | 2026-11-26 | Audita y limpia los proveedores LLM de un perfil DSH: compara con la API real, borra modelos inexistentes, pregunta antes de eliminar proveedores. |
| 245 | [VoyagerXvoyagerx/dsh-wallpaper](https://github.com/VoyagerXvoyagerx/dsh-wallpaper) | 0 | 2026-11-26 | 2026-11-26 | Semi-transparent photo wallpaper for the DeepSeek Harness Web GUI: daily rotation from any folder, manual switching, per-photo opacity. |
| 246 | [WangAnran123/dsh-companion-starter](https://github.com/WangAnran123/dsh-companion-starter) | 0 | 2026-11-24 | 2026-11-26 | 把一个「住在你电脑里的 AI 伙伴」搭起来的骨架：桌面大脑 + QQ + 语音 + 记忆 + 视频/3D 能力（素材库优先） |
| 247 | [WangDouble-Dev/dsh-contract-stamp](https://github.com/WangDouble-Dev/dsh-contract-stamp) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness 合同盖章插件，支持 PDF 与图片盖章、分组骑缝章、拖动定位和多图合成 PDF，文件全程本地处理。 |
| 248 | [wellsoren/dsh-restart](https://github.com/wellsoren/dsh-restart) | 0 | 2026-11-26 | 2026-11-26 | Reload plugins or gracefully restart DeepSeek Harness (DSH) from the sidebar More menu. |
| 249 | [William-JT-Shen/dsh-chat-web](https://github.com/William-JT-Shen/dsh-chat-web) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness sidebar plugin: Work/Chat switch plus DeepSeek web chat history inside Harness |
| 250 | [Wjc41164404/dsh-side-questions](https://github.com/Wjc41164404/dsh-side-questions) | 0 | 2026-11-26 | 2026-11-26 | Multi-window side questions for DeepSeek Harness (DSH). |
| 251 | [wsdzwx2001/dshgo-connect-madao](https://github.com/wsdzwx2001/dshgo-connect-madao) | 0 | 2026-11-26 | 2026-11-26 | 把华为云码道（CodeArts Agent）接入 dsh-go：本机 OpenAI 兼容桥 + 原生状态条与面板 |
| 252 | [wsl1602291891-stack/dsh-zhilian-box](https://github.com/wsl1602291891-stack/dsh-zhilian-box) | 0 | 2026-11-26 | 2026-11-26 | 智连工具箱：dsh 的多功能工具箱（标题栏重启 / /clear / 智连 MCP / 常规模式预设），所有模块设置页按需开启 |
| 253 | [WyankinzZ/dsh-plugin-abap-diff](https://github.com/WyankinzZ/dsh-plugin-abap-diff) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness (DSH) plugin: Git-style read-only ABAP change tracker and embedded Diff workbench for abap-adt MCP servers. |
| 254 | [x25hhr/dsh-annotations](https://github.com/x25hhr/dsh-annotations) | 0 | 2026-11-26 | 2026-11-26 | 在 DeepSeek Harness 对话里划词做分类注释：原文保留同色色块、点注释跳回原文、一键汇总插入输入框。 / Select text in a DSH reply to file color-coded annotations, jump back to a passage, and insert the digest into the composer. |
| 255 | [xiaochouxia11/dsh-hindsight-workbench](https://github.com/xiaochouxia11/dsh-hindsight-workbench) | 0 | 2026-11-25 | 2026-11-26 | Hindsight 记忆工作台：在 DSH 里只读浏览本机 Hindsight 记忆库、知识页与本机技能，简体中文界面。 |
| 256 | [xiaomengxinbb/dsh-message-workbench](https://github.com/xiaomengxinbb/dsh-message-workbench) | 0 | 2026-11-26 | 2026-11-26 | 为 DeepSeek Harness 添加消息原地编辑、停止重发、文件回退与截图批注。 |
| 257 | [ximi-chen/dsh-supersede](https://github.com/ximi-chen/dsh-supersede) | 0 | 2026-11-26 | 2026-11-26 | Per-session Supersede switch for the DeepSeek Harness composer. |
| 258 | [xinhe1337/dsh-institutional-literature](https://github.com/xinhe1337/dsh-institutional-literature) | 0 | 2026-11-26 | 2026-11-26 | DSH plugin: institutional-access literature download |
| 259 | [xpopux/dsh-version-sentinel](https://github.com/xpopux/dsh-version-sentinel) | 0 | 2026-11-26 | 2026-11-26 | DSH Version Sentinel: stable and prerelease update notices for DeepSeek Harness Web. |
| 260 | [XtremXpert/dsh-voice-conversation](https://github.com/XtremXpert/dsh-voice-conversation) | 0 | 2026-11-26 | 2026-11-26 | Mode conversation mains libres pour DSH : écoute avec détection de silence, envoi automatique, réponse lue à voix haute |
| 261 | [XtremXpert/dsh-voice-tts](https://github.com/XtremXpert/dsh-voice-tts) | 0 | 2026-11-26 | 2026-11-26 | Synthèse vocale locale pour DSH : expose les voix Apple comme service HTTP sur la boucle locale, pour lire une réponse à voix haute |
| 262 | [yasaxiwind/dsh-branch-studio](https://github.com/yasaxiwind/dsh-branch-studio) | 0 | 2026-11-26 | 2026-11-26 | Parallel branch studio for DeepSeek Harness: fork isolated branches, run each with its own model/prompt, compare results, and promote the winner back with verification and rollback. |
| 263 | [yasaxiwind/dsh-experiment-ledger](https://github.com/yasaxiwind/dsh-experiment-ledger) | 0 | 2026-11-25 | 2026-11-26 | Local-first experiment ledger for DeepSeek Harness: runs, metrics, artifacts, comparison, provenance and reports. |
| 264 | [yc5991/dsh-wechatbot](https://github.com/yc5991/dsh-wechatbot) | 0 | 2026-11-25 | 2026-11-26 | 基于微信官方 iLink Bot 协议的 DSH 官方私聊机器人与个人助理插件：扫码直连、管理员双层遥控（个人助理 /dev 直连 Harness）、双向加密传文件与记忆驱动提醒 |
| 265 | [Yituojuanjuana/dsh-skill-shelf](https://github.com/Yituojuanjuana/dsh-skill-shelf) | 0 | 2026-11-26 | 2026-11-26 | DSH 技能中枢插件（本地开发分支持久化） |
| 266 | [ykybl/dsh-altare](https://github.com/ykybl/dsh-altare) | 0 | 2026-11-26 | 2026-11-26 | Altare 云平台官方 API 接入 DeepSeek Harness：13 个工具覆盖应用/电源/部署/日志/文件/变量/备份/快照/域名端口/Job/Schedule/团队审计，按 token scope 自动鉴权 |
| 267 | [you-see-seeyou/dsh-shared-tree](https://github.com/you-see-seeyou/dsh-shared-tree) | 0 | 2026-11-26 | 2026-11-26 | Cross-profile shared plugin tree manager (dsh.plugin: install/search/enable/disable/verify &lt;DSH_HOME&gt;/profiles/node_modules) |
| 268 | [ysun6203-hash/dsh-kimi-bridge](https://github.com/ysun6203-hash/dsh-kimi-bridge) | 0 | 2026-11-26 | 2026-11-26 | Kimi as a second brain for DeepSeek Harness: chat with Moonshot from any session, fetch pages through the local VPN proxy, and keep the DSH + Kimi wallet total on one page. |
| 269 | [Yuhuan-zz/pet-dress](https://github.com/Yuhuan-zz/pet-dress) | 0 | 2026-11-26 | 2026-11-26 | Wardrobe plugin for dsh-pet — right-click to switch full outfits + animations, four outfits included. |
| 270 | [Yunfung/dsh-plugin-hdc-phone](https://github.com/Yunfung/dsh-plugin-hdc-phone) | 0 | 2026-11-26 | 2026-11-26 | DSH plugin: drive a second HarmonyOS/OpenHarmony phone via a local hdc bridge (observe/tap/swipe/key/input/launch). |
| 271 | [YuRuhuan/dsh-singing](https://github.com/YuRuhuan/dsh-singing) | 0 | 2026-11-26 | 2026-11-26 | 选中工作区里有会话在干活时自动循环播放音乐，停下暂停、再开续播；右上角鲸鱼尾面板支持进度拖动、切歌、暂停、导入/删除 mp3 和工作区多选。Windows 专用，零 token。DSH 插件。 |
| 272 | [yxn3hc/dsh-precise-quote](https://github.com/yxn3hc/dsh-precise-quote) | 0 | 2026-11-25 | 2026-11-26 | 面向 DeepSeek Harness 的精确划词引用与批注插件：选中对话里的任意文字，连同批注加入待发队列，常驻输入框上方，可拖拽排序，序号动态调整；发送后每条引用渲染为卡片，点击 ↑ 回到原文。几乎所有选得中的文字都能引用：思考过程、工具卡片、命令输出、错误信息、搜索结果，乃至已发送的引用卡片，跨段落、跨多条消息也不例外。引用依据它在消息里的分层位置与重复出现次数精准定位，折叠开合、流式输出都不影响，宁可不跳也不跳错。 |
| 273 | [zcslack17858645276-del/dsh-app-restart](https://github.com/zcslack17858645276-del/dsh-app-restart) | 0 | 2026-11-26 | 2026-11-26 | DeepSeek Harness plugin: adds a restart button to the Windows title bar of the DSH desktop app, left of the minimize/maximize/close buttons. |
| 274 | [Zephyr-Axis/dsh-astrbot-unified](https://github.com/Zephyr-Axis/dsh-astrbot-unified) | 0 | 2026-11-25 | 2026-11-26 | AstrBot ↔ DeepSeek Harness 统一桥：LLM 自主调用 DSH 执行任务，QQ 对话镜像进 DSH 会话。为 dsh-go 适配。 |
| 275 | [ZF3373/dsh-mathmodel](https://github.com/ZF3373/dsh-mathmodel) | 0 | 2026-11-26 | 2026-11-26 | Math modeling contest and research paper workflow and linting tools for DeepSeek Harness |
| 276 | [ZhanRuiXin/dsh-autorouter](https://github.com/ZhanRuiXin/dsh-autorouter) | 0 | 2026-11-26 | 2026-11-26 | One DSH provider over a fallback chain of every registered route, with reasoning effort inherited from the caller. |
| 277 | [Zi-Kong/dsh-tag](https://github.com/Zi-Kong/dsh-tag) | 0 | 2026-11-26 | 2026-11-26 | 给 DeepSeek Harness 聊天窗口打标签：划词打标、左侧标签轨道、点击跳回原文并高亮 |
| 278 | [zman406986/dsh-bot](https://github.com/zman406986/dsh-bot) | 0 | 2026-09-15 | 2026-11-26 | Grok-bot-like multitask dispatcher for dsh (DeepSeek Harness) |
| 279 | [zyw294/cloud189-mcp](https://github.com/zyw294/cloud189-mcp) | 0 | 2026-11-26 | 2026-11-26 | Tianyi Cloud (cloud.189.cn) MCP server + DSH plugin: list, search, download links, upload, mkdir, delete, recycle bin, quota. Zero runtime deps. |
| 280 | [ZZR-rui-997/dsh-skill-switchboard](https://github.com/ZZR-rui-997/dsh-skill-switchboard) | 0 | 2026-11-25 | 2026-11-26 | Sidebar skill switchboard for the DSH web client: list your own skills, switch model/user invocation, check and fix spec problems, edit SKILL.md, import, move, tag, and restore deleted ones. |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中。同 owner 的纯改名已自动同步引用，此处多为删除/转私或同名换主——核实后从 [data/approved.json](../approved.json) 移除，或按上面的待复核节处理。

Approved but no longer present in the current snapshot. Same-owner renames were already synced automatically, so what remains is mostly deletion, privating, or a recycled slug — after checking, remove them from [data/approved.json](../approved.json) or handle them via the renames-pending-review section above.

- 123123liang/dsh-subagent-model-sync
- AhYi8/dsh-agent-recycle-guard
- Asthestarsfalll/dsh-answer-card
- DrWang1/dsh-plugin-mode-cycle
- fufuf-c/dsh-token
- G-TY/dsh-refresh
- houyanchao/dsh-quote-ask
- LANHJUN/dsh-liang-time
- todrinkcho/dsh-task-chime-badge
- xiaobaga281/dsh-token-spend
- xiaochouxia11/dsh-hindsight-memory
- xiaoge480/dsh-qzone-diary
- xuedai-mayi/dsh-wenshan
- zhuowenzhang288-web/dsh-ai-research-workflow
- ZZR-rui-997/dsh-skills-workbench
