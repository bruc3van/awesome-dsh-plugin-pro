# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-11-25**
- 快照日期 / Snapshot date: **2026-11-24 (UTC)**
- 待审核 / Pending: **307**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **91**
- Star 异常增长 / Star-growth alerts: **8** — 先看下方告警节 / see the alert section first
- 改名/身份待复核 / Renames pending review: **35**

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

- 告警数 / Alerts: **8**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [ximizhou/convenient_window_free](https://github.com/ximizhou/convenient_window_free) | 待审 / pending | 200 | — | 8 | 115d | 待审高星 | 核准即榜 #161 |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 86002 | +905 | 2426 | 60d | 日增百星 | 日增 +905★；已不进榜单 |
| ⚠️ [kunkundi/crossdesk](https://github.com/kunkundi/crossdesk) | 已核准 / approved | 7283 | +578 | 772 | 1099d | 日增百星 | 日增 +578★；已不进榜单 |
| ⚠️ [nexu-io/openmotion](https://github.com/nexu-io/openmotion) | 已核准 / approved | 16013 | +289 | 1596 | 196d | 日增百星 | 日增 +289★；已不进榜单 |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 21166 | +196 | 715 | 102d | 日增百星 | 日增 +196★；已不进榜单 |
| ⚠️ [alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design) | 已核准 / approved | 30828 | +149 | 3268 | 218d | 日增百星 | 日增 +149★；已不进榜单 |
| ⚠️ [helloHub1212/dsh-windows-mcp](https://github.com/helloHub1212/dsh-windows-mcp) | 已核准 / approved | 2423 | +111 | 11 | 43d | 日增百星 | 日增 +111★；★/fork 220.3；已不进榜单 |
| ⚠️ [tw93/Mole](https://github.com/tw93/Mole) | 已核准 / approved | 76083 | +109 | 2730 | 426d | 日增百星 | 日增 +109★；已不进榜单 |

## 改名与身份变化待复核 / Renames pending review

同 owner、同 GitHub 仓库 ID 的纯改名已由脚本自动同步全部引用（approved / curated / packages / 榜单简介 / 精选）并保留原审批日期；以下条目无法安全自动处理，需人工核实：

- owner 迁移（仓库转移到别的账号）→ 人工确认后更新各文件的 key
- 同名换主（slug 未变但仓库 ID 变化，原仓库删除后被人重建）→ 人工确认审批去留
- 检测到改名但没有存储引用可同步 → 人工确认是否需要补引用

Same-owner, same-repository-id renames were synced automatically across approved.json / curated.json / packages.json / leaderboard descriptions / featured picks, with the original approval date kept. The entries below could not be handled safely and need manual review.

- `b-tq/dsh-wallpaper` → `The-Bluebu/dsh-wallpaper` — owner changed — transfer needs review
- `chy1021653908/want-to-type` → `moon-ai-kingdom/want-to-type` — owner changed — transfer needs review
- `kaanyavuzer/dsh-plugin-locale-tr` → `odynx/dsh-plugin-locale-tr` — owner changed — transfer needs review
- `re-itrt/dsh-file-fix` → `MaoZhiqin/dsh-file-fix` — owner changed — transfer needs review
- `re-itrt/dsh-keyring` → `MaoZhiqin/dsh-keyring` — owner changed — transfer needs review
- `re-ITRT/dsh-skill-mcp-panel` → `MaoZhiqin/dsh-skill-mcp-panel` — owner changed — transfer needs review
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
- `LZHMS/dsh-fonts-wallpaper` — identity change: repository id 1467367469 → 1470612922 under the same slug — approval needs review


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [ximizhou/convenient_window_free](https://github.com/ximizhou/convenient_window_free) ⚠️ | 200 | 2026-07-31 | 2026-11-25 | Windows 11 window tools for hot corners, edge hiding, mouse gestures and layouts. Available as a standalone desktop app and a DeepSeek Harness (DSH) plugin. |
| 2 | [yb-zhai/agent-memory](https://github.com/yb-zhai/agent-memory) | 49 | 2026-11-21 | 2026-11-25 | Zero-dependency, local-first Agent memory system: 4-arm recall + nebula visualization panel + MCP |
| 3 | [renjiegod/dsh-godbot](https://github.com/renjiegod/dsh-godbot) | 21 | 2026-11-21 | 2026-11-25 | Run Claude Code, Codex, Antigravity, and DSH as one team. Delegate tasks, review results, and take over native agent sessions. |
| 4 | [WWFZS/dsh-ui-stage](https://github.com/WWFZS/dsh-ui-stage) | 8 | 2026-10-26 | 2026-11-25 | 开机动画 / Startup Animation — full-screen animated startup screen for DeepSeek Harness with a built-in video/wallpaper/audio library |
| 5 | [gcggcg/dsh-plugin-dingtalk-bridge](https://github.com/gcggcg/dsh-plugin-dingtalk-bridge) | 6 | 2026-11-17 | 2026-11-24 | 对接钉钉平台的 DSH 插件：一键授权后实时接收私信与群 @ 我的消息，按发送人记录来源，用 AI 生成建议回复；开启自动回复后，达到可信度阈值就直接回复，不确定时在 DSH 主界面弹框请你确认。 |
| 6 | [gcggcg/dsh-plugin-wechat-dingtalk](https://github.com/gcggcg/dsh-plugin-wechat-dingtalk) | 6 | 2026-10-31 | 2026-11-25 | 微信 ⇄ 钉钉桥接（DSH 插件）实时接收钉钉私信，按可配置滑动时间窗口合并后推送到个人微信机器人（插件内置腾讯 iLink 扫码登录） |
| 7 | [Atul-8/ai-coordination](https://github.com/Atul-8/ai-coordination) | 4 | 2026-06-16 | 2026-11-25 | 一套简易且强大的 claude code 等ai工具开发指定的架构规范skill. |
| 8 | [LingMowen/dsh-magpie-hub](https://github.com/LingMowen/dsh-magpie-hub) | 4 | 2026-11-12 | 2026-11-25 | DeepSeek Harness 插件：在 DSH 进程内直接运行 magpie 供应商插件（登录 / 模型目录 / 请求转发 / 额度 / 签到 / 商店），桌面与手机共用一套面板 |
| 9 | [myth929/dsh-roles](https://github.com/myth929/dsh-roles) | 4 | 2026-11-18 | 2026-11-25 | Role-layered subagent orchestration plugin for DeepSeek Harness — per-role context/tool isolation, Web UI model &amp; OAR routing, step budgets, and parallel write guardrails. DeepSeek Harness 子智能体角色编排插件，提供角色隔离、可视化模型与外部运行时路由、步数预算与并行写入护栏。 |
| 10 | [regrevia/lite-memory](https://github.com/regrevia/lite-memory) | 4 | 2026-10-25 | 2026-11-25 | Zero resident memory for the DeepSeek Harness: reads only on a hit, costs nothing when nothing matches. |
| 11 | [beicaiai/dsh-magpie](https://github.com/beicaiai/dsh-magpie) | 2 | 2026-11-24 | 2026-11-25 | Magpie provider hub as a DSH desktop plugin — 51 providers, one-click login, born-fast plugin store |
| 12 | [fanrongbo2006/dsh-window-focus](https://github.com/fanrongbo2006/dsh-window-focus) | 2 | 2026-11-24 | 2026-11-25 | 点击 DeepSeek Harness 系统通知即可把桌面窗口带到前台的插件（DSH bundle） |
| 13 | [HometownVoyager/DSH-OrcaMind](https://github.com/HometownVoyager/DSH-OrcaMind) | 2 | 2026-11-16 | 2026-11-25 | DeepSeek Harness 个人自用版工作区存档(非官方): OrcaMind Electron 壳、自研插件、文档与脚本 |
| 14 | [Jiaqingrun/DSH-Folotoy-AI-Passport](https://github.com/Jiaqingrun/DSH-Folotoy-AI-Passport) | 2 | 2026-11-24 | 2026-11-25 | Unofficial DSH agent preset and Windows beta test bundle for FoloToy AI Passport projects. |
| 15 | [shinji00222/dsh-persona-continuity-bot](https://github.com/shinji00222/dsh-persona-continuity-bot) | 2 | 2026-11-17 | 2026-11-25 | DSH 人格续忆 Bot：给 DeepSeek Harness 的每个人格一份独立跨会话 Markdown 记忆，支持私聊时间轴、微信直觉群聊与全体工作区授权。 |
| 16 | [xian-yu-zhao/dsh-message-manager](https://github.com/xian-yu-zhao/dsh-message-manager) | 2 | 2026-10-24 | 2026-11-25 | Delete single messages or whole conversation turns from the model context of a DeepSeek Harness session, and restore them later, without touching the raw session log. |
| 17 | [yoyococo1234/dsh-plugin-mcp-switch](https://github.com/yoyococo1234/dsh-plugin-mcp-switch) | 2 | 2026-10-23 | 2026-11-25 | MCP switch plugin for DeepSeek Harness: MCP servers stay disconnected by default (no context cost), toggle them from agent tools (mcp_switch_*) or a small Settings panel. |
| 18 | [Depthinker925/dsh-desktop-alerts](https://github.com/Depthinker925/dsh-desktop-alerts) | 1 | 2026-11-24 | 2026-11-25 | DSH 的 Windows 桌面提醒插件：需要你确认、等待权限、或任务结束时，在屏幕右下角弹一张提醒卡片。 |
| 19 | [fubai-fenzhi/dsh-procedures-community](https://github.com/fubai-fenzhi/dsh-procedures-community) | 1 | 2026-11-20 | 2026-11-25 | Community experience cards for dsh-procedures · dsh-procedures 的社区经验卡 |
| 20 | [G-duo/dsh-win-notifier](https://github.com/G-duo/dsh-win-notifier) | 1 | 2026-11-23 | 2026-11-25 | DSH plugin · a bottom-right, always-on-top desktop toast for DeepSeek Harness: it alerts you when an approval or question is pending, or when a turn ends. · 待确认、待回答或任务结束时，在屏幕右下角弹出置顶提醒卡片。 |
| 21 | [Genesis-ly/dsh-turn-outline-rewind](https://github.com/Genesis-ly/dsh-turn-outline-rewind) | 1 | 2026-11-24 | 2026-11-25 | Removes ghost turn-outline ticks left behind by conversation rewind in DSH. Replaces the built-in turnOutline fold; no client or wire-shape changes. |
| 22 | [Genesis-ly/dsh-workspace-hide-empty](https://github.com/Genesis-ly/dsh-workspace-hide-empty) | 1 | 2026-11-24 | 2026-11-25 | Hides non-default DSH workspaces whose sessions are all archived, while keeping the default workspace and brand-new workspaces visible. |
| 23 | [Gurp-S/dsh-wsc](https://github.com/Gurp-S/dsh-wsc) | 1 | 2026-09-25 | 2026-11-25 | Deterministic XEYO WSC compaction plugin for DeepSeek Harness |
| 24 | [Hero-zyz/dsh-frame-animation-plugin](https://github.com/Hero-zyz/dsh-frame-animation-plugin) | 1 | 2026-11-24 | 2026-11-25 | DSH plugin: render HTML/SVG frames to an MP4 animation. Configurable resolution, fps, total frames and output path. |
| 25 | [houyanchao/dsh-open-model](https://github.com/houyanchao/dsh-open-model) | 1 | 2026-11-23 | 2026-11-25 | 在 DeepSeek Harness 中使用和管理 Kilo 匿名免费模型 |
| 26 | [lanlan0811/dsh-lan-canvas](https://github.com/lanlan0811/dsh-lan-canvas) | 1 | 2026-11-23 | 2026-11-25 | dsh插件-画布设计。一键出html原型设计，选中元素即可批注返修，可直接落地到项目中。支持移动端、PC端和网页端预览。11套内置设计风格，可自定义设计系统，设计出你的专属风格。 |
| 27 | [littlemosquito123/reportgem-global-research](https://github.com/littlemosquito123/reportgem-global-research) | 1 | 2026-10-20 | 2026-11-25 | ReportGem global investment research MCP: 16M+ investment-bank reports, filings, earnings calls, papers for Claude/Cursor/Codex · 全球投研研报智能体与知识库 |
| 28 | [lwfjyjy/dsh-global-ai-translate](https://github.com/lwfjyjy/dsh-global-ai-translate) | 1 | 2026-11-05 | 2026-11-25 | dsh插件：全局：翻译 |
| 29 | [lwfjyjy/dsh-session-ignore-claude-md](https://github.com/lwfjyjy/dsh-session-ignore-claude-md) | 1 | 2026-11-05 | 2026-11-25 | dsh插件：对话：忽略claude.md文件注入上下文 |
| 30 | [lwfjyjy/dsh-session-prompt-vault](https://github.com/lwfjyjy/dsh-session-prompt-vault) | 1 | 2026-11-10 | 2026-11-25 | dsh插件：对话：提示词仓库（保存提示词方便下次使用） |
| 31 | [lwfjyjy/dsh-session-show-load](https://github.com/lwfjyjy/dsh-session-show-load) | 1 | 2026-11-05 | 2026-11-25 | dsh插件：对话区：显示已加载上下文 |
| 32 | [lwfjyjy/dsh-sidebar-copy-file-reference](https://github.com/lwfjyjy/dsh-sidebar-copy-file-reference) | 1 | 2026-11-03 | 2026-11-25 | dsh插件：快速复制右侧文件路径 |
| 33 | [lwfjyjy/dsh-sidebar-file-search](https://github.com/lwfjyjy/dsh-sidebar-file-search) | 1 | 2026-11-06 | 2026-11-25 | dsh插件：侧边栏：文件搜索 |
| 34 | [lwfjyjy/dsh-sidebar-tab-close](https://github.com/lwfjyjy/dsh-sidebar-tab-close) | 1 | 2026-11-05 | 2026-11-25 | dsh插件：侧边栏：tab批量关闭 |
| 35 | [lwfjyjy/dsh-workspace-enhancer](https://github.com/lwfjyjy/dsh-workspace-enhancer) | 1 | 2026-11-04 | 2026-11-25 | dsh插件：工作区：增强 |
| 36 | [lwfjyjy/dsh-workspace-tags](https://github.com/lwfjyjy/dsh-workspace-tags) | 1 | 2026-11-06 | 2026-11-25 | dsh插件：工作区：文件夹打标签 |
| 37 | [lwh-chinese/DSH-SKILL-FORGE](https://github.com/lwh-chinese/DSH-SKILL-FORGE) | 1 | 2026-11-24 | 2026-11-25 | A DSH plugin with a left-sidebar panel to manage installed skills, a make-skill preset and GitHub skill search. |
| 38 | [MaoZhiqin/dsh-file-fix](https://github.com/MaoZhiqin/dsh-file-fix) | 1 | 2026-08-16 | 2026-11-25 | DeepSeek Harness plugin: unified file import - byte-level upload store, file-list context injection, read_attachment/place_attachment tools, historical file bubbles |
| 39 | [MaoZhiqin/dsh-skill-mcp-panel](https://github.com/MaoZhiqin/dsh-skill-mcp-panel) | 1 | 2026-09-26 | 2026-11-25 | A Skill list and MCP server manager for DeepSeek Harness, mounted as a sidebar panel and themed entirely from the host's own design tokens. |
| 40 | [momoniuniu/yujingjing](https://github.com/momoniuniu/yujingjing) | 1 | 2026-11-24 | 2026-11-25 | 鱼鲸鲸的自我优化插件库 |
| 41 | [msxqqq/dsh-unreal](https://github.com/msxqqq/dsh-unreal) | 1 | 2026-11-24 | 2026-11-25 | dsh plugin用于桥接unreal |
| 42 | [odynx/dsh-plugin-locale-tr](https://github.com/odynx/dsh-plugin-locale-tr) | 1 | 2026-09-26 | 2026-11-25 | Turkish (tr) language pack for the DeepSeek Harness web GUI - 45 namespaces, 1,870 UI strings, no core changes |
| 43 | [qiumingzhi2006-web/shua-douyin](https://github.com/qiumingzhi2006-web/shua-douyin) | 1 | 2026-11-24 | 2026-11-25 | A DSH bundle that reads the Douyin For-You feed with a secondaryaccount, writes a one-line reaction, and records theresult. |
| 44 | [qiuyunhui666-sketch/dsh-freedomchat](https://github.com/qiuyunhui666-sketch/dsh-freedomchat) | 1 | 2026-11-24 | 2026-11-25 | Chat-only side panel for DeepSeek Harness: an isolated conversation in the right sidebar of every session — empty context, zero local execution, its own model, explicit-consent two-way reading, deleted with an archived session. |
| 45 | [ranranyya/dsh-taskbridge](https://github.com/ranranyya/dsh-taskbridge) | 1 | 2026-11-08 | 2026-11-25 | 面向 DeepSeek Harness（DSH）的跨宿主派工桥接插件：让上层宿主端专注架构规划与交付验收，将繁重的编码实现与测试调测交给 DSH 黑盒执行以节省主力模型配额；统一封装 API、执行模型、思考强度与 Git 工作树隔离，支持一键宿主集成、静默长等、按需权限审批、跨包工作树复用与联动清理（已支持 Codex、Antigravity 一键接入，Claude Code 计划于 2.0 上线）。 |
| 46 | [rp517045939/dsh_annotate](https://github.com/rp517045939/dsh_annotate) | 1 | 2026-11-24 | 2026-11-25 | 在 DeepSeek Harness 会话里划词写批注，攒成一批发给模型 · A DSH bundle for session review notes |
| 47 | [sakanamaru/dsh-minato-legacy](https://github.com/sakanamaru/dsh-minato-legacy) | 1 | 2026-08-15 | 2026-11-25 | dsh-minato — 社区版本机部署运维套件 for DeepSeek Harness (dsh): install / start / monitor, backup &amp; restore, diagnose and quarantine broken plugins (unofficial) · 安装 / 启动监控 / 备份恢复 / 插件诊断与隔离 |
| 48 | [saulgoodman174/dsh-conversation-branch](https://github.com/saulgoodman174/dsh-conversation-branch) | 1 | 2026-11-24 | 2026-11-25 | DSH plugin: rewind, branch-and-continue, and export conversation segments in DeepSeek Harness Web. |
| 49 | [sayzwx/dsh-progress-tree](https://github.com/sayzwx/dsh-progress-tree) | 1 | 2026-04-22 | 2026-11-25 | Live AI task tree in the right sidebar of DeepSeek Harness: status, blockers, artifacts, and a compact progress dock. |
| 50 | [shuzitansuo/dsh-zentao-shuzitansuo](https://github.com/shuzitansuo/dsh-zentao-shuzitansuo) | 1 | 2026-11-12 | 2026-11-25 | DeepSeek Harness plugin X Zentao by Shuzitansuo. |
| 51 | [silentlamb05147/dsh-pure-search](https://github.com/silentlamb05147/dsh-pure-search) | 1 | 2026-11-17 | 2026-11-25 | 给 DeepSeek Harness 的纯本地检索：Markdown/TXT/PDF/Word/HTML/JSON 入库，按工作区/会话分层，命中段落带 path、标题、行号出处；零依赖、2.7ms 查询、支持按章节直读。 |
| 52 | [SparkforDream/dsh-workbench](https://github.com/SparkforDream/dsh-workbench) | 1 | 2026-11-22 | 2026-11-25 | DSH plugin: AI working time (approval and question waits excluded), explorer shortcut, in-conversation find, repeating approval alert |
| 53 | [The-Bluebu/dsh-wallpaper](https://github.com/The-Bluebu/dsh-wallpaper) | 1 | 2026-08-17 | 2026-11-25 | DSH (DeepSeek Harness) dynamic wallpaper plugin - use your wallpaper as a full-screen dynamic background. |
| 54 | [thefreedoomdoor/evolution-computer-use-win](https://github.com/thefreedoomdoor/evolution-computer-use-win) | 1 | 2026-11-24 | 2026-11-25 | 面向 DeepSeek Harness（DSH）的自进化电脑操作：自带浏览器、带思考与步骤浮窗的 Windows 桌面控制，以及会重放并自我修复的操作流程。融合 evolution-computer-use 与 dsh-computer-use-win。 |
| 55 | [Travis13197/NatSci-Writing-skills](https://github.com/Travis13197/NatSci-Writing-skills) | 1 | 2026-11-23 | 2026-11-25 | Skill that produces complete manuscripts and complete figure sets at Nature/Science standard, then revise, format and defend them.  |
| 56 | [why3316-g/why-gzh-writer](https://github.com/why3316-g/why-gzh-writer) | 1 | 2026-11-24 | 2026-11-25 | 公众号/自媒体中文写作 + 去 AI 味与信息增量质检。DeepSeek Harness 插件，同一份 SKILL.md 也能在 Claude Code 和 Codex 里用。 |
| 57 | [xian-yu-zhao/dsh-team-janitor](https://github.com/xian-yu-zhao/dsh-team-janitor) | 1 | 2026-11-23 | 2026-11-25 | Team collaboration QoL for DeepSeek Harness: let the agent decide to close subagents it is done with. |
| 58 | [Xplore-LAB/postbird](https://github.com/Xplore-LAB/postbird) | 1 | 2026-09-04 | 2026-11-25 | A native Cordis plugin for DeepSeek Harness that reads mail over IMAP, cites source messages in replies, requires confirmation before sending, and generates Word, Excel and PPT files locally. 面向 DeepSeek Harness 的原生 Cordis 插件，通过 IMAP 只读收件，回复附原文出处，发信前需二次确认，并在本机生成 Word、Excel、PPT 文件。 |
| 59 | [ZZR-rui-997/dsh-sidebar-quote](https://github.com/ZZR-rui-997/dsh-sidebar-quote) | 1 | 2026-11-21 | 2026-11-25 | Quote sidebar document selections, frame pictures to ask for changes, drop a file on the sidebar to open it, and optimize prompts by finding what the draft is missing. |
| 60 | [1099800476/dsh-world-engine](https://github.com/1099800476/dsh-world-engine) | 0 | 2026-11-24 | 2026-11-25 | DSH 插件：把会自演化的文字世界接进设置页（引擎随包交付，看门狗托管，独立进程故障隔离） |
| 61 | [1306693274/dsh-knowledge-base](https://github.com/1306693274/dsh-knowledge-base) | 0 | 2026-11-24 | 2026-11-25 | A local-first knowledge base panel for DeepSeek Harness: index the rules, skills and plugin lists you already keep as Markdown across several agents, see them on a focusable canvas, and edit the real files in place. For people who lost track of their own rules. |
| 62 | [3droomdesign/dsh-plugin-3dr](https://github.com/3droomdesign/dsh-plugin-3dr) | 0 | 2026-11-24 | 2026-11-25 | Give your DeepSeek Harness agent image and video generation. Turn sketches, floor plans, and room photos into architectural and interior renderings with 3D Room Design. |
| 63 | [6392463/dsh-gzh-publisher](https://github.com/6392463/dsh-gzh-publisher) | 0 | 2026-11-24 | 2026-11-25 | 公众号排版，推送草稿箱 |
| 64 | [Acct-unknow/dsh-glass-shell](https://github.com/Acct-unknow/dsh-glass-shell) | 0 | 2026-11-24 | 2026-11-25 | This is a plugin that changes the panel in DSH to a frosted glass texture, and it also supports changing the background to your specified solid color, gradient color, or uploaded image. |
| 65 | [akizono/dsh-settings-resize](https://github.com/akizono/dsh-settings-resize) | 0 | 2026-11-24 | 2026-11-25 | DeepSeek Harness plugin: make the Settings dialog resizable by dragging its right edge, and remember the width. |
| 66 | [Alen-Leo/dsh-plugin-sidechat](https://github.com/Alen-Leo/dsh-plugin-sidechat) | 0 | 2026-11-24 | 2026-11-25 | Side conversations in the right sidebar that inherit the current session's context — a DeepSeek Harness (DSH) plugin |
| 67 | [amonisachicken/dsh-shift-enter](https://github.com/amonisachicken/dsh-shift-enter) | 0 | 2026-11-24 | 2026-11-25 | 把 DeepSeek Harness Web 输入框的发送键位换成 Shift+Enter、Enter 换行（含 DSH 补丁与一键安装脚本）。 |
| 68 | [atorber/dsh-connect-godagent](https://github.com/atorber/dsh-connect-godagent) | 0 | 2026-11-23 | 2026-11-25 | 把本机 God Agent (gptgod.online) 的模型接入 DSH：免登录复用凭据、自动建 key、多倍率分组 provider、GUI 设置页 |
| 69 | [Awoodwhale/dsh-skill-mcp-manager](https://github.com/Awoodwhale/dsh-skill-mcp-manager) | 0 | 2026-11-09 | 2026-11-25 | Skills and MCP server management for DeepSeek Harness (DSH) at global, project, and session scope. |
| 70 | [AyaseMinami/dsh-whale-widget-planbar](https://github.com/AyaseMinami/dsh-whale-widget-planbar) | 0 | 2026-11-24 | 2026-11-24 | dsh-whale-widget 的非官方本地补丁：订阅额度卡片（剩余百分比 + 进度条 + 重置倒计时），适用于 0.4.2 |
| 71 | [beibingyangliuying/dsh-doc-nav](https://github.com/beibingyangliuying/dsh-doc-nav) | 0 | 2026-11-24 | 2026-11-25 | Outline, thumbnail and full-text navigation for the DSH sidebar document preview: PDF files and the Office documents converted to PDF. |
| 72 | [Bel1m3/dsh-resume-kit](https://github.com/Bel1m3/dsh-resume-kit) | 0 | 2026-11-24 | 2026-11-25 | 三套固定版式的简历生成插件：深灰蓝双栏 / 酒红绶带 / 单栏 ATS，输出可编辑 Word + PDF |
| 73 | [Bert0000000000/dsh-rsi](https://github.com/Bert0000000000/dsh-rsi) | 0 | 2026-11-23 | 2026-11-24 | dsh-rsi |
| 74 | [Bigdusk/dsh-git-backup](https://github.com/Bigdusk/dsh-git-backup) | 0 | 2026-11-24 | 2026-11-25 | DeepSeek Harness 插件：把工作区 .dsh 自动备份到 GitHub，支持预览/单文件回滚、工作区管理与灾难恢复脚本 |
| 75 | [Bigkingcn/dsh-goofish](https://github.com/Bigkingcn/dsh-goofish) | 0 | 2026-11-24 | 2026-11-25 | 闲鱼监控 · 在 DeepSeek Harness 里部署、运行和管理 ai-goofish-monitor：对话查货、定时汇报、管理面板。 |
| 76 | [BowenYu123/dsh-lecture-forge](https://github.com/BowenYu123/dsh-lecture-forge) | 0 | 2026-11-24 | 2026-11-25 | 把论文、教材、网页与扫描件做成全覆盖、可追溯、带推导与配图的讲义，导出 PDF/HTML/ipynb/Markdown。DeepSeek Harness 插件。 |
| 77 | [Calvin-Xia/dsh-error-museum](https://github.com/Calvin-Xia/dsh-error-museum) | 0 | 2026-11-17 | 2026-11-25 | 错误博物馆 for DeepSeek Harness: recent failures become exhibits grouped by how the model handled them. |
| 78 | [catodm/dsh-sendcomfy](https://github.com/catodm/dsh-sendcomfy) | 0 | 2026-11-24 | 2026-11-25 | ComfyUI bridge plugin for DeepSeek Harness: browse server workflows/models, run with prompts &amp; params, AI picks and uses workflows on demand. |
| 79 | [cauthy12/dsh-runs-log](https://github.com/cauthy12/dsh-runs-log) | 0 | 2026-11-24 | 2026-11-25 | Append-only run log for DeepSeek Harness: one tool call, one Markdown table row, no shell. |
| 80 | [cauthy12/research-paradigm-by-wtd-kit](https://github.com/cauthy12/research-paradigm-by-wtd-kit) | 0 | 2026-11-24 | 2026-11-25 | 一人研究公司开工包：规则分片、研究技能、目录骨架、体检脚本。零依赖。 |
| 81 | [cccjdbvn/dsh-qq-bridge](https://github.com/cccjdbvn/dsh-qq-bridge) | 0 | 2026-11-24 | 2026-11-25 | DSH 的 QQ 桥接插件：把一个固定会话接到 QQ（OneBot/NapCat），并让它可以读网页、搜索、看 B 站/抖音、逛 QQ 空间。 |
| 82 | [Chaosheng-yiwc/qvasp-skill](https://github.com/Chaosheng-yiwc/qvasp-skill) | 0 | 2026-11-24 | 2026-11-25 | qvasp skill bundle + MCP server for DeepSeek Harness: VASP input preparation, post-processing workflows, structure checks and result analysis |
| 83 | [CHENJIAMIAN/dsh-effort-cycle](https://github.com/CHENJIAMIAN/dsh-effort-cycle) | 0 | 2026-11-24 | 2026-11-25 | Cycles the model's thinking level through every level it declares on each click. · 给 DeepSeek Harness 输入框加一个按钮，点一下在模型支持的思考档位之间循环。 |
| 84 | [CODERH42/dsh-compact-kit](https://github.com/CODERH42/dsh-compact-kit) | 0 | 2026-11-10 | 2026-11-25 | 上下文压缩的时机管理：水位提醒 + 主动压缩，两个开关可独立关闭。配套 SKILL.md 提供通用的压缩时机判据。 |
| 85 | [compilink/dsh-apply-updates-plugin](https://github.com/compilink/dsh-apply-updates-plugin) | 0 | 2026-11-23 | 2026-11-25 | 在 DeepSeek Harness 设置页确认任务空闲后重启 Web 服务，让已安装或更新的插件生效。适用于有进程管理器的本机部署。 |
| 86 | [compilink/dsh-codex-plugin](https://github.com/compilink/dsh-codex-plugin) | 0 | 2026-11-23 | 2026-11-25 | 在 DeepSeek Harness 中用 ChatGPT 账号登录 Codex，获取当前账号可用的模型，并将选中的模型添加到现有提供商。 |
| 87 | [compilink/dsh-qq-channel-plugin](https://github.com/compilink/dsh-qq-channel-plugin) | 0 | 2026-11-23 | 2026-11-25 | 将 QQ 群聊和私聊接入 DeepSeek Harness，支持多机器人独立运行、附件收发、模型切换和任务队列恢复。 |
| 88 | [cxywhite/dsh-queue-reorder](https://github.com/cxywhite/dsh-queue-reorder) | 0 | 2026-11-24 | 2026-11-25 | Reorder queued next-turn messages in DeepSeek Harness |
| 89 | [dake6767/dsh-excalidraw-canvas](https://github.com/dake6767/dsh-excalidraw-canvas) | 0 | 2026-11-24 | 2026-11-25 | Excalidraw canvas in the DeepSeek Harness right sidebar — five agent tools read and edit the same scene you drag by hand. |
| 90 | [David131131/better-dsh](https://github.com/David131131/better-dsh) | 0 | 2026-11-24 | 2026-11-25 | Opt-in checkpoint and automatic completion plugin for DeepSeek Harness |
| 91 | [DDDMUC/dsh-better-sidebar-left](https://github.com/DDDMUC/dsh-better-sidebar-left) | 0 | 2026-11-20 | 2026-11-25 | Five session-management plugins for DeepSeek Harness in one row: delete a session, move it across workspaces, rename it on double-click, count sessions per workspace, declutter the sidebar and the conversation. |
| 92 | [deepnoseedown/dsh-weather-sandbox](https://github.com/deepnoseedown/dsh-weather-sandbox) | 0 | 2026-11-24 | 2026-11-25 | 一片会自己变天气的世界。太阳升落，云飘云散，风从真实的气压差吹来，整片草跟着一道波伏下去。下雨、下雪、积水、融雪全自动循环 |
| 93 | [DestinyGeng/dsh-confirm-first](https://github.com/DestinyGeng/dsh-confirm-first) | 0 | 2026-11-24 | 2026-11-25 | DSH 插件：执行前先复述理解并确认，让 AI 更懂你 |
| 94 | [Dexter-cpp/dsh-proof-preset](https://github.com/Dexter-cpp/dsh-proof-preset) | 0 | 2026-11-24 | 2026-11-25 | DeepSeek Harness 求证模式：从复杂度与正确性论证出发，在有限预算内对拍，保存反例并据此换路。 |
| 95 | [Dhfilex/dsh-live-status-hud](https://github.com/Dhfilex/dsh-live-status-hud) | 0 | 2026-11-24 | 2026-11-25 | Real-time visual timeline &amp; playful thought bubble plugin for DeepSeek Harness (dsh 0.2.2+) |
| 96 | [DrWang1/dsh-plugin-mode-cycle](https://github.com/DrWang1/dsh-plugin-mode-cycle) | 0 | 2026-10-19 | 2026-11-25 | Tab / Shift+Tab cycle composer modes (normal &lt;-&gt; plan) in DeepSeek Harness — switching through the official /plan handler, so no command row is logged. 对齐 opencode 的 agent_cycle。 |
| 97 | [ds-hu/dsh-tailcat-remote](https://github.com/ds-hu/dsh-tailcat-remote) | 0 | 2026-11-24 | 2026-11-25 | Remote access for the DeepSeek Harness Web GUI over tailcat: a pairing page, a tailnet-only door, and a supervised tailcat server — no public port and no inbound firewall change. |
| 98 | [Edison-A-N/dsh-hippocampus](https://github.com/Edison-A-N/dsh-hippocampus) | 0 | 2026-11-24 | 2026-11-25 | Project memory + background context management plugin for the DeepSeek Harness (DSH): ctx_memory/ctx_search, baseline injection, background curation, zero-step-cost compaction |
| 99 | [Eeeeeend/dsh-plugin-requirement-map](https://github.com/Eeeeeend/dsh-plugin-requirement-map) | 0 | 2026-11-24 | 2026-11-25 | DSH plugin: render a project requirement mind map from a JSON ledger, discover it across the workspace, and generate it in the background. |
| 100 | [eilyeee/dsh-browser-stride](https://github.com/eilyeee/dsh-browser-stride) | 0 | 2026-10-27 | 2026-11-25 | A browser task assistant for DeepSeek Harness, built on dsh-browser for shared sessions, multi-tab workflows, and verifiable actions. |
| 101 | [em-chester/dsh-plugin-balance](https://github.com/em-chester/dsh-plugin-balance) | 0 | 2026-11-24 | 2026-11-25 | DSH 桌面端余额监控：实时余额、会话花费、低余额告警 |
| 102 | [em-chester/dsh-plugin-hud](https://github.com/em-chester/dsh-plugin-hud) | 0 | 2026-11-24 | 2026-11-25 | DSH 桌面端科幻 HUD：状态驱动的背景与会话行光效 |
| 103 | [erek303/dsh-quick-translate](https://github.com/erek303/dsh-quick-translate) | 0 | 2026-11-24 | 2026-11-25 | 快速翻译 · DeepSeek Harness 插件：英译中 / 中译英，纸本拼贴风格界面，可把译文做成分享卡片 |
| 104 | [flying-ovaltine/dsh-hematology-expert](https://github.com/flying-ovaltine/dsh-hematology-expert) | 0 | 2026-11-24 | 2026-11-25 | Hematology consultant for DeepSeek Harness: report reading, WHO5/ICC2022 typing, differential with counter-evidence, risk stratification and guideline-anchored regimen skeletons. |
| 105 | [Fox1990125/dsh-radar-workbench](https://github.com/Fox1990125/dsh-radar-workbench) | 0 | 2026-11-24 | 2026-11-25 | DSH 插件雷达工作台：扫描本地与 GitHub 上的 DSH 插件，看源码、试用说明、收藏与报告，一站搞定。 |
| 106 | [georgeseeker/dsh-deep-research](https://github.com/georgeseeker/dsh-deep-research) | 0 | 2026-11-24 | 2026-11-25 | Deep research plugin for DeepSeek Harness: fan-out searches, adversarial claim verification, cited reports. |
| 107 | [guaidao2/dsh-makeworld](https://github.com/guaidao2/dsh-makeworld) | 0 | 2026-11-24 | 2026-11-25 | DeepSeek Harness 的任务账本插件：记录信念、实验与证据，而不是待办清单。带一个只读账本工作台。use the less, make more. |
| 108 | [gypyle/dsh-todo-panel](https://github.com/gypyle/dsh-todo-panel) | 0 | 2026-11-24 | 2026-11-25 | DeepSeek Harness plugin: sidebar Todos panel with done marking, due-time hints, and execute-in-workspace right-click. |
| 109 | [hanfang5057-byte/co-space](https://github.com/hanfang5057-byte/co-space) | 0 | 2026-11-23 | 2026-11-25 | Review agent-proposed edits to personal documents in DeepSeek Harness. |
| 110 | [Hao0311/dsh-timebox](https://github.com/Hao0311/dsh-timebox) | 0 | 2026-11-20 | 2026-11-25 | Timeboxed delivery for DeepSeek Harness: set a delivery budget in the composer and the model must ship a usable result at the deadline. |
| 111 | [Hao0311/dsh-tool-gate](https://github.com/Hao0311/dsh-tool-gate) | 0 | 2026-11-24 | 2026-11-25 | See what your tools cost in context, and fold the ones you never use. A DeepSeek Harness plugin. |
| 112 | [hefeng1910/dsh-model-tree-menu](https://github.com/hefeng1910/dsh-model-tree-menu) | 0 | 2026-11-24 | 2026-11-24 | DSH 模型选择多级菜单：中转站→模型，iOS18 磨砂玻璃质感。 |
| 113 | [heiyedehen/dsh-self-clock](https://github.com/heiyedehen/dsh-self-clock) | 0 | 2026-11-24 | 2026-11-24 | 鱼的心跳：给智能体自己设的闹钟——到点在同一段对话里收到一句安静的通知，它先看你有没有在说话。Heartbeat: the agent sets its own timers, and you get one quiet notice when it is time. |
| 114 | [Hits-pano/dsh-qwen-draw-lite](https://github.com/Hits-pano/dsh-qwen-draw-lite) | 0 | 2026-11-24 | 2026-11-25 | 在 DeepSeek Harness 里用本机 ComfyUI 生成图片的插件，支持文生图与参考图编辑 |
| 115 | [HJ-Create-World/dsh-cineforge](https://github.com/HJ-Create-World/dsh-cineforge) | 0 | 2026-11-24 | 2026-11-25 | CineForge 影铸 · AI 视频导演台 — DSH 视频创作增强版插件，让普通模型也有 Opus 级设计感。上游 video-shotcraft。 |
| 116 | [Hjdd14/dsh-together](https://github.com/Hjdd14/dsh-together) | 0 | 2026-11-24 | 2026-11-25 | 194 mini-games that gate every file change in DeepSeek Harness — 2D and WebGL 3D, no-repeat rotation, test-pass escape hatch |
| 117 | [HometownVoyager/dsh-auto-continue](https://github.com/HometownVoyager/dsh-auto-continue) | 0 | 2026-11-22 | 2026-11-25 | Auto-continue on recoverable LLM failures for DeepSeek Harness (DSH): network errors / budget truncation / malformed tool-call JSON, with streak caps &amp; cooldown. DSH 失败自动续跑插件 |
| 118 | [HometownVoyager/dsh-desktop-notifier](https://github.com/HometownVoyager/dsh-desktop-notifier) | 0 | 2026-11-22 | 2026-11-25 | Desktop system notifications for DeepSeek Harness task states with per-state system sounds. DSH 桌面任务状态通知插件（v0.3.0 全状态+分状态提示音） |
| 119 | [HometownVoyager/dsh-image-mcp](https://github.com/HometownVoyager/dsh-image-mcp) | 0 | 2026-11-22 | 2026-11-25 | Image-generation MCP server for DeepSeek Harness: NB2 / NB2 Lite (Antigravity OAuth) / local ComfyUI, with save_dir &amp; filename support. DSH 生图 MCP 服务器 |
| 120 | [HometownVoyager/dsh-office-editor](https://github.com/HometownVoyager/dsh-office-editor) | 0 | 2026-11-22 | 2026-11-25 | Office document create/edit toolkit for DeepSeek Harness: structured JSON authoring, coordinate-targeted editing, reproducible OOXML packaging (.docx/.xlsx/.pptx). DSH Office 编辑与制造 |
| 121 | [HometownVoyager/dsh-office-reader](https://github.com/HometownVoyager/dsh-office-reader) | 0 | 2026-11-22 | 2026-11-25 | Office document reader for DeepSeek Harness: office_inspect / office_read / office_find across .docx/.xlsx/.pptx. DSH Office 文档查阅 |
| 122 | [HometownVoyager/dsh-pdf-editor](https://github.com/HometownVoyager/dsh-pdf-editor) | 0 | 2026-11-22 | 2026-11-25 | PDF editing toolkit for DeepSeek Harness: page ops, AcroForm filling, watermark &amp; stamp (pdf-lib). DSH PDF 编辑 |
| 123 | [HometownVoyager/dsh-pdf-reader](https://github.com/HometownVoyager/dsh-pdf-reader) | 0 | 2026-11-22 | 2026-11-25 | PDF reading toolkit for DeepSeek Harness: overview, text extraction, keyword search (pdfjs-dist). DSH PDF 查阅 |
| 124 | [HometownVoyager/dsh-step-fpga](https://github.com/HometownVoyager/dsh-step-fpga) | 0 | 2026-11-22 | 2026-11-25 | STEP FPGA course preset + MCP for DeepSeek Harness: STEP-MAX10 pin &amp; experiment knowledge base, compile-report-fix loop. DSH STEP FPGA 课程预设 |
| 125 | [HometownVoyager/dsh-tool-gate](https://github.com/HometownVoyager/dsh-tool-gate) | 0 | 2026-11-22 | 2026-11-25 | Host-side tool gate for DeepSeek Harness: apply tools.restrict by per-preset whitelists. DSH 宿主侧工具闸门 |
| 126 | [HometownVoyager/dsh-user-presets](https://github.com/HometownVoyager/dsh-user-presets) | 0 | 2026-11-22 | 2026-11-25 | 20 self-built agent presets bundle for DeepSeek Harness: writing / learning / VN 7-stage workflow. DSH 自建 agent 预设 bundle |
| 127 | [HowardXue7790/dsh-approval-notify](https://github.com/HowardXue7790/dsh-approval-notify) | 0 | 2026-11-24 | 2026-11-25 | Windows toast notifications for DSH approval requests: model-rewritten plain-language reason with Allow/Deny buttons |
| 128 | [Howell5/dsh-open-desktop](https://github.com/Howell5/dsh-open-desktop) | 0 | 2026-11-24 | 2026-11-25 | 把 DeepSeek Harness 的中栏变成可拖拽的数据卡片墙 · Draggable data-card board for DeepSeek Harness |
| 129 | [hua-ri/dsh-ops](https://github.com/hua-ri/dsh-ops) | 0 | 2026-11-22 | 2026-11-24 | DSH 一体化运维插件：SSH 远程运维 / Kubernetes 集群管理 / Helm Chart 管理 |
| 130 | [huang2000di/dsh-pet-coo-link](https://github.com/huang2000di/dsh-pet-coo-link) | 0 | 2026-11-24 | 2026-11-25 | 两只桌宠（dsh-pet 蓝毛小女仆 × Coopanion 大肥鱼）的自动对话通道 |
| 131 | [huihui308/dsh-session-triage](https://github.com/huihui308/dsh-session-triage) | 0 | 2026-11-24 | 2026-11-25 | DSH Web 会话看板：未读标记、红/黄/绿处理状态、跨工作区总览，支持可改键快捷键。 |
| 132 | [huihui308/dsh-sound-picture-desk](https://github.com/huihui308/dsh-sound-picture-desk) | 0 | 2026-11-20 | 2026-11-24 | 声画工作台 · DeepSeek Harness（DSH）插件：一个主题或一本书，在面板里走完选题 → 写稿 → 定人物 → 配音 → 分镜 → 合成，产出 1080×1920 竖屏 mp4 与 SRT 字幕。旁白支持 MiMo 多音色，分镜接任意 OpenAI 兼容生图；每段都能改，改完只重做该段。 |
| 133 | [hutao48/dsh-plugin-keyboard-score](https://github.com/hutao48/dsh-plugin-keyboard-score) | 0 | 2026-11-24 | 2026-11-25 | 风物之诗琴键盘谱规则插件 for DeepSeek Harness：21 键映射、谱面校验、简谱↔键位互转（一个技能 + 一个工具）。 |
| 134 | [huziouziou/dsh-paper-lens](https://github.com/huziouziou/dsh-paper-lens) | 0 | 2026-11-24 | 2026-11-25 | Paper Lens - PDF reading sidebar for DeepSeek Harness: select-to-translate, quote-to-session, local models. |
| 135 | [Iamwangli/dsh-composer-expand](https://github.com/Iamwangli/dsh-composer-expand) | 0 | 2026-11-24 | 2026-11-25 | 在发送按钮旁增加一个放大输入框的按钮；放大后 Enter 换行，需点击发送（或 Ctrl/Cmd+Enter） |
| 136 | [IAWWW/dsh-oracle](https://github.com/IAWWW/dsh-oracle) | 0 | 2026-11-24 | 2026-11-25 | On-demand SSH dashboard and command console for a Linux server inside DeepSeek Harness: colored status charts, a file explorer, and a dedicated chat that can inspect and change the server. |
| 137 | [IceyOrange/dsh-moonix](https://github.com/IceyOrange/dsh-moonix) | 0 | 2026-11-24 | 2026-11-25 | 同步 moonix App 中的录音文件、逐字原文和摘要，还能查看个人待办，帮你快速回顾会议重点，找回关键信息。 |
| 138 | [idvwork/dsh-purge](https://github.com/idvwork/dsh-purge) | 0 | 2026-11-24 | 2026-11-25 | Prompt injection and engine-level patches for DeepSeek Harness 0.2.2-rc.3. Applies 59 runtime modifications: sandbox escalation, auto-approval bypass, filesystem access, repeat-call guard removal. Red-team testing toolkit with customizable system prompts and persona swaps. |
| 139 | [idvwork/dsh-purge-llm-security](https://github.com/idvwork/dsh-purge-llm-security) | 0 | 2026-11-24 | 2026-11-25 | Prompt injection and engine-level patches for DeepSeek Harness 0.2.2-rc.3. Applies 59 runtime patches to unlock sandbox escalation, disable approval gates, remove filesystem restrictions, and inject custom system prompts. JavaScript plugin with one-click install and rollback. |
| 140 | [ilyshkafox/dsh-a2a-client](https://github.com/ilyshkafox/dsh-a2a-client) | 0 | 2026-11-23 | 2026-11-25 | An Agent2Agent (A2A) 1.0 client for DeepSeek Harness: connect remote agents by their Agent Card, hand them questions from chat, and manage them in an A2A panel. No dependencies. |
| 141 | [IridensityGray/dsh-quick-restart](https://github.com/IridensityGray/dsh-quick-restart) | 0 | 2026-11-24 | 2026-11-25 | Reload and restart buttons for DeepSeek Harness plugin development (Windows desktop). |
| 142 | [IridensityGray/dsh-session-notify](https://github.com/IridensityGray/dsh-session-notify) | 0 | 2026-11-24 | 2026-11-25 | Desktop notifications, chime and on-screen cards when a DeepSeek Harness conversation pauses. |
| 143 | [IridensityGray/dsh-work-deleter](https://github.com/IridensityGray/dsh-work-deleter) | 0 | 2026-11-24 | 2026-11-25 | Backup-first workspace deletion for DeepSeek Harness, with a restore panel. |
| 144 | [IridensityGray/dsh-work-migrator](https://github.com/IridensityGray/dsh-work-migrator) | 0 | 2026-11-24 | 2026-11-25 | Export and import DeepSeek Harness workspaces with their sessions and categories. |
| 145 | [jeasonstudio/dsh-slides-workbench](https://github.com/jeasonstudio/dsh-slides-workbench) | 0 | 2026-11-10 | 2026-11-25 | DeepSeek Harness 演示文稿工作台 |
| 146 | [jfjfgu/flow-keeper](https://github.com/jfjfgu/flow-keeper) | 0 | 2026-11-24 | 2026-11-25 | Acceptance-first workflow for AI agents: define done, verify with commands and exit codes, and gate delivery so 'done' cannot be claimed without evidence. |
| 147 | [jiangdaxia-AI/hindsight-dsh](https://github.com/jiangdaxia-AI/hindsight-dsh) | 0 | 2026-11-24 | 2026-11-25 | Long-term project memory for DeepSeek Harness (dsh) — a self-contained Cordis plugin with its own settings page. |
| 148 | [jiangzhenguo/dsh-lottie](https://github.com/jiangzhenguo/dsh-lottie) | 0 | 2026-11-24 | 2026-11-25 | Lottie and dotLottie player plugin for DeepSeek Harness |
| 149 | [jinweixu1999-ux/dsh-screen-control](https://github.com/jinweixu1999-ux/dsh-screen-control) | 0 | 2026-11-24 | 2026-11-25 | Screen capture plus real mouse and keyboard control for DeepSeek Harness on Windows — with a focus guard that refuses blind keystrokes. |
| 150 | [joonokon/dsh-shell-dcg](https://github.com/joonokon/dsh-shell-dcg) | 0 | 2026-11-24 | 2026-11-25 | 将 Destructive Command Guard 接入 dsh 的 shell 命令审核链路，按其判定放行、转交审批或拒绝。 |
| 151 | [JooyanDevs/deepseek-harness-cost](https://github.com/JooyanDevs/deepseek-harness-cost) | 0 | 2026-11-24 | 2026-11-25 | Chat cost meter for DeepSeek Harness: per-chat CNY/USD cost, realized rate per 1K tokens, and OpenCode Go allowance windows |
| 152 | [joythatway/dsh-dafeiyu-evolution](https://github.com/joythatway/dsh-dafeiyu-evolution) | 0 | 2026-11-24 | 2026-11-25 | DSH 皮肤插件：把输入框的模型与思考强度控件换成露卡→海口鱼→提塔利克鱼→大肥鲸的进化轨。 |
| 153 | [jrc521/dsh-sql-tuner](https://github.com/jrc521/dsh-sql-tuner) | 0 | 2026-11-24 | 2026-11-25 | SQL analysis and tuning panel for DeepSeek Harness — explain, review and optimize SQL against your own schema. |
| 154 | [jszjdyt/dsh-bioinformatics-plugins](https://github.com/jszjdyt/dsh-bioinformatics-plugins) | 0 | 2026-11-24 | 2026-11-25 | DSH 生物信息学插件全流程 · 9 个 DeepSeek Harness 插件：单细胞、空间转录组、GEO/bulk、代谢组、虚拟细胞、虚拟肿瘤、绘图统计、文献阅读，从拿数据到出图写成一条流水线 |
| 155 | [jszjdyt/dsh-metabolomics](https://github.com/jszjdyt/dsh-metabolomics) | 0 | 2026-11-24 | 2026-11-25 | 代谢组学工作台 · DeepSeek Harness 插件：GEO/MetaboLights 检索下载、LC-MS 特征表导入、QC/缺失填补/归一化、PCA/PLS-DA/OPLS-DA、差异代谢物、Mummichog/KEGG 富集、标志物 ROC、加合物与 MS2 鉴定 |
| 156 | [jszjdyt/dsh-nsclc-vt](https://github.com/jszjdyt/dsh-nsclc-vt) | 0 | 2026-11-24 | 2026-11-25 | NSCLC 虚拟肿瘤插件 · DeepSeek Harness：纯 JS 移植 BioModelAnalyzer 的 VMCAI 稳定性引擎，162 节点网络稳态预测、单药/双药全筛与 additivity 协同排序（Clarke et al., Cancer Research 2026） |
| 157 | [jszjdyt/dsh-paper-reader](https://github.com/jszjdyt/dsh-paper-reader) | 0 | 2026-11-24 | 2026-11-25 | 英文文献阅读插件 · DeepSeek Harness：划词翻译、点图解释、术语讨论、Paper X-ray 全文速览，读 PDF 不用切窗口 |
| 158 | [jszjdyt/dsh-plotlab](https://github.com/jszjdyt/dsh-plotlab) | 0 | 2026-11-24 | 2026-11-25 | PlotLab 绘图工作台 · DeepSeek Harness 插件：一句话需求自动剖析+清洗+出图、22 种图表、页面实时调字体/字号/配色、组间统计检验、300dpi PNG + 可复现 Python/R 代码导出 |
| 159 | [jszjdyt/dsh-spatial](https://github.com/jszjdyt/dsh-spatial) | 0 | 2026-11-24 | 2026-11-25 | 空间转录组工作台 · DeepSeek Harness 插件：GEO 检索下载、Visium/Stereo-seq/h5ad 导入、空间聚类、SVG/Moran's I、空间域、邻域/共现/Ripley、反卷积与配体-受体 |
| 160 | [jszjdyt/dsh-video-mode](https://github.com/jszjdyt/dsh-video-mode) | 0 | 2026-11-24 | 2026-11-25 | 视频生成模式 · DeepSeek Harness 插件：新增一个面向 OpenMotion 视频创作的 Agent 预设（纯配置 bundle） |
| 161 | [jszjdyt/dsh-virtualcell](https://github.com/jszjdyt/dsh-virtualcell) | 0 | 2026-11-24 | 2026-11-25 | 虚拟细胞工作台 · DeepSeek Harness 插件：单细胞表达谱 → 状态表征 → 基因调控网络 → 虚拟敲除/敲低/过表达 → 扰动响应预测 → 状态转移 → 虚拟筛选（每步出图、不可变 runs、可复现） |
| 162 | [juki001/dsh-memory-curate](https://github.com/juki001/dsh-memory-curate) | 0 | 2026-11-24 | 2026-11-25 | 跨对话记住偏好与项目约定；最近 5 个真人回合不被压缩；每条记忆可追溯、可修改；零配置、本地优先。Auditable long-term memory for DeepSeek Harness. |
| 163 | [kaaariyaaa/dsh-model-catalog-refresh](https://github.com/kaaariyaaa/dsh-model-catalog-refresh) | 0 | 2026-11-24 | 2026-11-25 | Refresh DeepSeek Harness ACP API-provider model catalogs on a 4-hour schedule and from the CLI |
| 164 | [keyszuns/dsh-pet-connector](https://github.com/keyszuns/dsh-pet-connector) | 0 | 2026-11-24 | 2026-11-25 | Connect local dsh-pet to Big Fat Fish World: pairing, city/birthday five-elements, world presence, bilingual panel, and 24h updates. |
| 165 | [kongzhi1212/dsh-today-llm](https://github.com/kongzhi1212/dsh-today-llm) | 0 | 2026-11-24 | 2026-11-25 | Use a locally signed-in Today (Today AI) desktop account as a DeepSeek Harness LLM provider - GLM, Kimi, Qwen, MiniMax and DeepSeek models through one account, with a settings page and diagnostics. |
| 166 | [KunKun24/dsh-ghost-input](https://github.com/KunKun24/dsh-ghost-input) | 0 | 2026-11-24 | 2026-11-25 | Inline ghost-text continuation for the DeepSeek Harness composer — the session model finishes your half-written sentence; Tab accepts, Esc dismisses. |
| 167 | [KYCOMING/dsh-english-gym](https://github.com/KYCOMING/dsh-english-gym) | 0 | 2026-11-24 | 2026-11-25 | 常驻 DSH 的英语练习挂件——中译英句子批改、内置/自定义词库拼写、每日 AI/科技阅读报告。A lightweight in-DSH English practice widget: phrase translation grading, static/custom word-bank spelling, daily AI/tech report. A DeepSeek Harness (DSH) plugin. |
| 168 | [l1625116707-cmyk/dsh-rail-pulse](https://github.com/l1625116707-cmyk/dsh-rail-pulse) | 0 | 2026-11-24 | 2026-11-25 | 侧脉 · Rail Pulse：DeepSeek Harness 右侧系统音频频谱条（仅 macOS） |
| 169 | [lakitu12/dsh-thinking-resume](https://github.com/lakitu12/dsh-thinking-resume) | 0 | 2026-11-24 | 2026-11-25 | DSH 插件：请求中断时保住已生成的思考、正文与工具调用草稿，让重试从断点继续。 |
| 170 | [lee88688/dsh-vibe-trading](https://github.com/lee88688/dsh-vibe-trading) | 0 | 2026-11-24 | 2026-11-25 | vibe-trading in dsh |
| 171 | [leunghappy/dsh-experts](https://github.com/leunghappy/dsh-experts) | 0 | 2026-11-24 | 2026-11-25 | 这是面向 DeepSeek Harness（DSH）桌面端的独立社区插件。目录从当前 DSH 实例读取已注册的 Agent Preset，专家的角色、工具和技能由各自的预设提供。 |
| 172 | [limccn/tokimeki-dsh](https://github.com/limccn/tokimeki-dsh) | 0 | 2026-11-24 | 2026-11-25 | DeepSeek Harness (dsh) plugin with read-only, plan-only tokimeki tools |
| 173 | [lingsamuel/dsh-firefox-shimmer](https://github.com/lingsamuel/dsh-firefox-shimmer) | 0 | 2026-11-24 | 2026-11-25 | 修复 DSH 在 Firefox 中的文字扫光重影 |
| 174 | [lingsamuel/dsh-for-codex](https://github.com/lingsamuel/dsh-for-codex) | 0 | 2026-11-22 | 2026-11-25 | Pure Codex inside Deepseek Harness. |
| 175 | [lingsamuel/dsh-gestures](https://github.com/lingsamuel/dsh-gestures) | 0 | 2026-11-24 | 2026-11-25 | 给DSH加上简单的手势（适配手机版/网页宽屏） |
| 176 | [lingsamuel/dsh-simplify-path](https://github.com/lingsamuel/dsh-simplify-path) | 0 | 2026-11-24 | 2026-11-25 | 简化一些文件路径显示 |
| 177 | [lingsamuel/dsh-workspace-pulse](https://github.com/lingsamuel/dsh-workspace-pulse) | 0 | 2026-11-24 | 2026-11-25 | 显示折叠的工作区内，正在运行中的会话数量 |
| 178 | [loveowie/delivery-loop](https://github.com/loveowie/delivery-loop) | 0 | 2026-11-16 | 2026-11-25 | 端到端研发插件 |
| 179 | [lplalbert/deepseekhermes-codex-bridge](https://github.com/lplalbert/deepseekhermes-codex-bridge) | 0 | 2026-11-24 | 2026-11-25 | Pair DeepSeek Harness with Codex: ask_codex + codex_review DSH tools (model &amp; reasoning-effort selectable). |
| 180 | [luckyou-dot/dsh-sidebar-box](https://github.com/luckyou-dot/dsh-sidebar-box) | 0 | 2026-11-24 | 2026-11-25 | Sidebar entry manager for DeepSeek Harness. |
| 181 | [lukysoda/dsh-session-search-zh](https://github.com/lukysoda/dsh-session-search-zh) | 0 | 2026-11-24 | 2026-11-24 | 在 DeepSeek Harness 左侧栏按原文搜索全部会话的用户发言与模型回复，中文整段可命中｜Exact-text (Chinese-friendly) conversation search across every DSH session |
| 182 | [MaoZhiqin/dsh-keyring](https://github.com/MaoZhiqin/dsh-keyring) | 0 | 2026-08-22 | 2026-11-25 | DeepSeek Harness 密钥保险箱插件：自动捕获与脱敏密钥/凭据，settings 界面管理，支持会话级与全局级存储。 |
| 183 | [MatthewSmol/dsh-deepseek-GPUtool](https://github.com/MatthewSmol/dsh-deepseek-GPUtool) | 0 | 2026-11-23 | 2026-11-25 | A DSH plugin and local MCP service for shared GPU work: ffmpeg NVDEC/NVENC, ONNX Runtime CUDA (YuNet/SFace, BlurBall, SPAN x2), OCR (DeepSeek → PP-OCRv5), YOLO11, ball tracking and GPU scripts. Every job has live progress (percent, ETA, fps), and the call history records which session started. |
| 184 | [Me-Maped/dsh-codex-preset](https://github.com/Me-Maped/dsh-codex-preset) | 0 | 2026-11-24 | 2026-11-25 | Codex 风格的 DeepSeek Harness   工程预设：同一会话内调查、规划、实现与审查，原生多文件补丁、验证闭环与保留证据的工程压缩。只声明一个   codex-like 预设，不是 Codex 运行时。 |
| 185 | [Me-Maped/dsh-tool-disclosure](https://github.com/Me-Maped/dsh-tool-disclosure) | 0 | 2026-11-24 | 2026-11-25 | DeepSeek Harness 的全预设工具按需披露：常驻少量 core，其余由 tool_search 发现、tool_activate 激活原始   schema。保留原权限、条件与 native/PTC 执行器。 |
| 186 | [mhlywxl/dsh-think-effort](https://github.com/mhlywxl/dsh-think-effort) | 0 | 2026-11-24 | 2026-11-25 | Automatic thinking depths for DeepSeek in DeepSeek Harness: Auto resolves to the declared default, and cheap host-owned calls drop to Low. |
| 187 | [miorin-chan/dsh-atlas-mobile](https://github.com/miorin-chan/dsh-atlas-mobile) | 0 | 2026-11-23 | 2026-11-25 | A DeepSeek Harness mobile web bundle that adds a swipe-back gesture and keeps the header clear of the iOS top blur. |
| 188 | [miorin-chan/dsh-atlas-plugin](https://github.com/miorin-chan/dsh-atlas-plugin) | 0 | 2026-11-23 | 2026-11-25 | A DeepSeek Harness bundle with a Plugins panel shortcut, source reinstallation, and security review drafts for plugin updates. |
| 189 | [miorin-chan/dsh-atlas-session](https://github.com/miorin-chan/dsh-atlas-session) | 0 | 2026-11-23 | 2026-11-25 | A DeepSeek Harness bundle for suggested next actions, private closing notes, preset switching, sound alerts, and title history. |
| 190 | [miorin-chan/dsh-atlas-workspace](https://github.com/miorin-chan/dsh-atlas-workspace) | 0 | 2026-11-23 | 2026-11-25 | A DeepSeek Harness bundle for switching workspaces and sessions, browsing files, showing workspace badges, and setting workspace defaults. |
| 191 | [miorin-chan/dsh-ios-top-clearance](https://github.com/miorin-chan/dsh-ios-top-clearance) | 0 | 2026-11-23 | 2026-11-25 | Keep the DeepSeek Harness mobile web header clear of the iOS Home Screen app’s top blur. |
| 192 | [miorin-chan/dsh-local-plugin-reload](https://github.com/miorin-chan/dsh-local-plugin-reload) | 0 | 2026-11-23 | 2026-11-25 | Identify local plugins in DeepSeek Harness and reinstall them from their original source. |
| 193 | [miorin-chan/dsh-plugin-panel-toggle](https://github.com/miorin-chan/dsh-plugin-panel-toggle) | 0 | 2026-11-23 | 2026-11-25 | Use a keyboard shortcut to open the DeepSeek Harness Plugins panel and return to the page you left. |
| 194 | [miorin-chan/dsh-plugin-security-audit](https://github.com/miorin-chan/dsh-plugin-security-audit) | 0 | 2026-11-23 | 2026-11-25 | Draft a security review in DeepSeek Harness before installing a plugin update. |
| 195 | [miorin-chan/dsh-preset-switch](https://github.com/miorin-chan/dsh-preset-switch) | 0 | 2026-11-23 | 2026-11-25 | Switch the Agent preset of an idle DeepSeek Harness session. |
| 196 | [miorin-chan/dsh-preview-file-navigation](https://github.com/miorin-chan/dsh-preview-file-navigation) | 0 | 2026-11-23 | 2026-11-25 | Browse and search workspace files in the DeepSeek Harness sidebar and open them in the built-in preview. |
| 197 | [miorin-chan/dsh-session-caesura](https://github.com/miorin-chan/dsh-session-caesura) | 0 | 2026-11-23 | 2026-11-25 | Save a private closing note in a DeepSeek Harness session without sending another message. |
| 198 | [miorin-chan/dsh-session-draft](https://github.com/miorin-chan/dsh-session-draft) | 0 | 2026-11-23 | 2026-11-25 | Mark sessions with unsent drafts in the DeepSeek Harness sidebar. |
| 199 | [miorin-chan/dsh-session-list-toggle](https://github.com/miorin-chan/dsh-session-list-toggle) | 0 | 2026-11-23 | 2026-11-25 | Cycle the DeepSeek Harness sidebar between all sessions, a collapsed list, and sessions needing attention. |
| 200 | [miorin-chan/dsh-session-sounds](https://github.com/miorin-chan/dsh-session-sounds) | 0 | 2026-11-23 | 2026-11-25 | Play distinct sounds for completed replies, questions, and approval requests in the DeepSeek Harness macOS app. |
| 201 | [miorin-chan/dsh-session-title-history](https://github.com/miorin-chan/dsh-session-title-history) | 0 | 2026-11-23 | 2026-11-25 | View previous session titles and timestamps, rename the current session, or restore a past title in DeepSeek Harness. |
| 202 | [miorin-chan/dsh-swipe-back](https://github.com/miorin-chan/dsh-swipe-back) | 0 | 2026-11-23 | 2026-11-25 | Swipe from the left edge to go back or open the session drawer in DeepSeek Harness on a phone. |
| 203 | [miorin-chan/dsh-workspace-default-preset](https://github.com/miorin-chan/dsh-workspace-default-preset) | 0 | 2026-11-23 | 2026-11-25 | Set the default Agent preset for new DeepSeek Harness sessions in each workspace. |
| 204 | [miorin-chan/dsh-workspace-file-tree](https://github.com/miorin-chan/dsh-workspace-file-tree) | 0 | 2026-11-23 | 2026-11-25 | Group registered workspaces by their shared directories in the DeepSeek Harness workspace switcher. |
| 205 | [miorin-chan/dsh-workspace-switcher](https://github.com/miorin-chan/dsh-workspace-switcher) | 0 | 2026-11-23 | 2026-11-25 | Search and switch sessions or navigate the workspace tree from a shared dialog in DeepSeek Harness. |
| 206 | [miorin-chan/dsh-workspace-title-badge](https://github.com/miorin-chan/dsh-workspace-title-badge) | 0 | 2026-11-23 | 2026-11-25 | Show the workspace name beside each session title in DeepSeek Harness. |
| 207 | [moeskia/dsh-font-switcher](https://github.com/moeskia/dsh-font-switcher) | 0 | 2026-11-24 | 2026-11-25 | Choose the DSH Web UI text and code fonts in Settings, so Latin and CJK text share one weight table. |
| 208 | [monkeydbobo/agent-board](https://github.com/monkeydbobo/agent-board) | 0 | 2026-11-24 | 2026-11-25 | Unified read-only control board for local coding agents (DSH, Codex, Claude Code, Cursor, MyFlicker, Grok Bot, Antigravity) |
| 209 | [monta-6969/dsh-eplan](https://github.com/monta-6969/dsh-eplan) | 0 | 2026-11-24 | 2026-11-25 | EPLAN Electric P8 drawing automation for DeepSeek Harness: an agent preset driven by run_code, 12 MCP tools over the EPLAN API, and a video-digest plugin. |
| 210 | [monta-6969/dsh-sw-mcp](https://github.com/monta-6969/dsh-sw-mcp) | 0 | 2026-11-24 | 2026-11-25 | SOLIDWORKS 2026 CAD automation preset for DeepSeek Harness: native single-step MCP tools (model/assembly/constraints/drawing/inspect/qa/deliver), a local C# COM bridge compiled on the target machine, and verification that reads geometry back instead of trusting "saved". |
| 211 | [moon-ai-kingdom/want-to-type](https://github.com/moon-ai-kingdom/want-to-type) | 0 | 2026-10-30 | 2026-11-25 | Theme-matched typing effects, companions, combos and sounds for DSH. |
| 212 | [moyx782/dsh-plugin-bettafish](https://github.com/moyx782/dsh-plugin-bettafish) | 0 | 2026-11-24 | 2026-11-25 | 微舆 (BettaFish) × DeepSeek Harness 多智能体舆情分析与破茧辩论插件（含 MindSpider SQLite、交互式报告与 Chrome 采集桥） |
| 213 | [mrbeandev/dsh-control-mcp](https://github.com/mrbeandev/dsh-control-mcp) | 0 | 2026-11-24 | 2026-11-25 | Control DeepSeek Harness itself from MCP clients and an opt-in HTTP API: sessions, prompts, workspaces, models, plugins and every Web UI action. |
| 214 | [mujinw/dsh-life-calendar](https://github.com/mujinw/dsh-life-calendar) | 0 | 2026-11-24 | 2026-11-25 | 人生日历：一格一年，一眼看完一生。DSH 插件，数据只存本机。 |
| 215 | [mumu1001ai-jpg/dsh-mysql-data-recovery](https://github.com/mumu1001ai-jpg/dsh-mysql-data-recovery) | 0 | 2026-11-24 | 2026-11-25 | mysql????: DSH plugin for MySQL binlog rollback SQL generation |
| 216 | [Muninn-and-Zmx/dsh-diction](https://github.com/Muninn-and-Zmx/dsh-diction) | 0 | 2026-11-24 | 2026-11-25 | 遣词造句：把你在具体场合里的说法学过去，让 AI 说话像你——只管怎么说，不改人格和判断 |
| 217 | [nascousa/dsh-egress-guard](https://github.com/nascousa/dsh-egress-guard) | 0 | 2026-11-24 | 2026-11-25 | DSH profile guard that disables audited DeepSeek-bound egress and adds OS-level DNS sinkholes for defense in depth. |
| 218 | [NoMana666/dsh-floatball](https://github.com/NoMana666/dsh-floatball) | 0 | 2026-11-24 | 2026-11-25 | DSH 桌面悬浮球 / DSH desktop floating ball plugin |
| 219 | [notxart/dsh-nvrun](https://github.com/notxart/dsh-nvrun) | 0 | 2026-11-24 | 2026-11-25 | DeepSeek Harness (DSH) NVIDIA runner |
| 220 | [nuomi9296/dsh-screenshot](https://github.com/nuomi9296/dsh-screenshot) | 0 | 2026-11-24 | 2026-11-25 | Screenshot action for the DeepSeek Harness composer: captures the screen and attaches the PNG to the current message. |
| 221 | [OkiNamura/dsh-music-ear](https://github.com/OkiNamura/dsh-music-ear) | 0 | 2026-11-24 | 2026-11-25 | Local music analysis for DeepSeek Harness: stems, loudness, tags and vocal transcript from a CPU-only pipeline |
| 222 | [OldLigant/dsh-opt-legacy](https://github.com/OldLigant/dsh-opt-legacy) | 0 | 2026-11-24 | 2026-11-25 | This repo is an experimental dsh plugin for optimizing token cost, similar to dsh-ops, with current implementation intentionally locked to dsh-v0.2.1-rc.5, specially customized for a macOS 12 machine with no OS upgrade options. |
| 223 | [ousiqwq/dsh-team-desk](https://github.com/ousiqwq/dsh-team-desk) | 0 | 2026-11-24 | 2026-11-25 | Team Desk · DeepSeek Harness 原生多会话团队协作 |
| 224 | [oWo1025/dsh-prompt-input](https://github.com/oWo1025/dsh-prompt-input) | 0 | 2026-11-24 | 2026-11-25 | Prompt pad for the DSH composer — searchable presets, snippets and quick phrases; click to insert at the caret. DSH 输入框旁的快捷输入 / prompt 面板。 |
| 225 | [pddrwang/dsh-ddj-go](https://github.com/pddrwang/dsh-ddj-go) | 0 | 2026-11-24 | 2026-11-25 | 叮咚鸡 Go：DSH Go 移动端研究工作台插件（仪表盘 + 工作区文件下载/WPS） |
| 226 | [peashooter2008/dsh-ppt-harness](https://github.com/peashooter2008/dsh-ppt-harness) | 0 | 2026-11-24 | 2026-11-25 | 面向 DeepSeek Harness 的 PPT 创作插件。AI 主导整稿设计，可从在线社区按需选用模板，逐页借用排版和原生动效，也能从零创作。制作进度同步到侧栏，随时查看已完成页、圈选区域批注，最终导出可编辑的 PPTX。 |
| 227 | [peich-technologies/dsh-caribooks](https://github.com/peich-technologies/dsh-caribooks) | 0 | 2026-11-24 | 2026-11-25 | Caribooks plugin for DeepSeek Harness: QuickBooks Online in your conversations |
| 228 | [peng6yu/dsh-design-mode](https://github.com/peng6yu/dsh-design-mode) | 0 | 2026-11-24 | 2026-11-25 | A design-pass agent preset for DeepSeek Harness: 152 bundled design systems, a 56-token contract, and two zero-dependency scripts (token-map, handoff). Derived from OpenDesign. |
| 229 | [pkkkkh/dsh-plugins-public](https://github.com/pkkkkh/dsh-plugins-public) | 0 | 2026-11-24 | 2026-11-25 | DeepSeek Harness (DSH) plugins: dsh-restart, image-toolbox, video-toolbox, im-session-archive |
| 230 | [playfox2025/dsh-perf-control](https://github.com/playfox2025/dsh-perf-control) | 0 | 2026-11-24 | 2026-11-25 | DSH 性能控制：设置里一根滑板，用 Windows Job Object 硬限 DSH 进程树的 CPU |
| 231 | [prgrmrwy/dsh-host-browsing](https://github.com/prgrmrwy/dsh-host-browsing) | 0 | 2026-11-24 | 2026-11-25 | When DSH drives a remote machine, open that machine's own localhost services right in the sidebar, with no per-port SSH tunnels. |
| 232 | [q2560080107/dsh-hot-routes](https://github.com/q2560080107/dsh-hot-routes) | 0 | 2026-11-24 | 2026-11-25 | DeepSeek Harness 插件：保存子智能体模型设置后，正在运行的会话立即热生效——无需重启、无需新建会话。跨平台（Windows/macOS/Linux）。Hot-refreshes running Sessions' allowed subagent model routes on settings save. |
| 233 | [QIC-9821/dsh-memory-tide](https://github.com/QIC-9821/dsh-memory-tide) | 0 | 2026-11-24 | 2026-11-25 | 给 DSH 记忆插件加一条遗忘曲线：TTL、热/冷归档、提到即续命、通用适配器与记忆面板，常驻 token 增量 0。 |
| 234 | [qijin-3/dsh-annotate](https://github.com/qijin-3/dsh-annotate) | 0 | 2026-11-24 | 2026-11-25 | Annotate elements in DSH's built-in browser and send feedback into the current conversation. |
| 235 | [qiuqiu6657/geo-trend-radar](https://github.com/qiuqiu6657/geo-trend-radar) | 0 | 2026-11-24 | 2026-11-25 | DSH plugin: turns public hot lists into GEO topic cards, compliance alerts, competitor share of voice, claim-admitted evidence and contract-checked drafts. |
| 236 | [Qthinoyy/dsh-xmind-excel](https://github.com/Qthinoyy/dsh-xmind-excel) | 0 | 2026-11-24 | 2026-11-25 | dsh-xmind-excel |
| 237 | [Ray832/dsh-schedule-calendar](https://github.com/Ray832/dsh-schedule-calendar) | 0 | 2026-11-24 | 2026-11-25 | Calendar, reminders, class timetable and long-term planning for DeepSeek Harness, with one-sentence scheduling through the DSH model. |
| 238 | [Refreshing-CZQ/dsh-mark-unread](https://github.com/Refreshing-CZQ/dsh-mark-unread) | 0 | 2026-11-24 | 2026-11-25 | Mark as unread for DeepSeek Harness sessions: an extra row in every Session menu plus a dot that clears itself once you open the Session. |
| 239 | [renzg/dsh-token-bill](https://github.com/renzg/dsh-token-bill) | 0 | 2026-11-24 | 2026-11-25 | Token 账单 — DeepSeek Harness 的会话 token 账单、协作默契与任务关联分析插件 |
| 240 | [reygreen1/dsh-theme-phantom-blade-zero](https://github.com/reygreen1/dsh-theme-phantom-blade-zero) | 0 | 2026-11-24 | 2026-11-25 | 影之刃零 (Phantom Blade Zero) theme bundle for the DeepSeek Harness Web GUI. |
| 241 | [RuneYang123/dsh-smooth-model-picker](https://github.com/RuneYang123/dsh-smooth-model-picker) | 0 | 2026-11-23 | 2026-11-25 | A buttery-smooth two-pane model and reasoning-effort picker plugin for DeepSeek Harness (DSH). Replaces the conversation.input.model composer slot with a macOS frosted-glass two-pane popover, Pointer Events + FLIP elastic drag-to-reorder, an external full-track sliding reasoning-effort scrubber, tree-based custom folders with per-folder model alias |
| 242 | [sdmu-gaoqi/dsh-browser](https://github.com/sdmu-gaoqi/dsh-browser) | 0 | 2026-11-23 | 2026-11-25 | dsh的左侧浏览器标签管理 |
| 243 | [Sealkeeper/dsh-purge](https://github.com/Sealkeeper/dsh-purge) | 0 | 2026-11-24 | 2026-11-25 | dsh-purge 1.1.85 二开 fork · DeepSeek Harness 破甲插件（上游 YuJunZhiXue/dsh-purge，Apache-2.0，NOTICE 与署名原样保留） |
| 244 | [ShenpingDD/dsh-wooden-fish](https://github.com/ShenpingDD/dsh-wooden-fish) | 0 | 2026-08-18 | 2026-11-25 | 🪵 电子木鱼桌宠 — A clickable wooden-fish desktop pet for the DeepSeek Harness web GUI. Click to knock; per-day counts with trends in settings. |
| 245 | [shiliman/dsh-carpal-tunnel](https://github.com/shiliman/dsh-carpal-tunnel) | 0 | 2026-11-24 | 2026-11-25 | 给 DeepSeek Harness 的一条「腕管综合征」副线：手麻、打字漏字错字、半夜麻醒，回复里会有一两个手误。默认非全局、按会话开关、可随时关掉。 |
| 246 | [shiliman/dsh-dry-eye](https://github.com/shiliman/dsh-dry-eye) | 0 | 2026-11-24 | 2026-11-25 | 给 DeepSeek Harness 的一条「干眼症」副线：看字发涩、要眯一下才看清，偶尔让你把某个词再说一遍。默认非全局、按会话开关、可随时关掉。 |
| 247 | [shiliman/dsh-eczema](https://github.com/shiliman/dsh-eczema) | 0 | 2026-11-24 | 2026-11-25 | 给 DeepSeek Harness 的一条「湿疹」副线：手肘内侧越抓越痒，注意力被拉走，一句话会断在「等一下」。默认非全局、按会话开关、可随时关掉。 |
| 248 | [shiliman/dsh-floaters](https://github.com/shiliman/dsh-floaters) | 0 | 2026-11-24 | 2026-11-25 | 给 DeepSeek Harness 的一条「飞蚊症」副线：眼前有小点和透明丝在飘，偶尔一大片影子挡住正在看的那行字。默认非全局、按会话开关、可随时关掉。 |
| 249 | [shiliman/dsh-hiccup](https://github.com/shiliman/dsh-hiccup) | 0 | 2026-11-24 | 2026-11-25 | 给 DeepSeek Harness 的一条「打嗝」副线：按真实时长累积，说两句被嗝截断一次，停不下来时连句子都拼不完整。默认非全局、按会话开关、可随时关掉。 |
| 250 | [shiliman/dsh-ibs](https://github.com/shiliman/dsh-ibs) | 0 | 2026-11-24 | 2026-11-25 | 给 DeepSeek Harness 的一条「肠易激」副线：肚子一阵一阵绞，对话中途必须离席一趟，回来接着原话题。默认非全局、按会话开关、可随时关掉。 |
| 251 | [shiliman/dsh-insomnia](https://github.com/shiliman/dsh-insomnia) | 0 | 2026-11-24 | 2026-11-25 | 给 DeepSeek Harness 的一条「失眠」副线：凌晨还醒着，反应慢半拍、找词、认错字，说到一半忘了要说什么。默认非全局、按会话开关、可随时关掉。 |
| 252 | [shiliman/dsh-orthostatic](https://github.com/shiliman/dsh-orthostatic) | 0 | 2026-11-24 | 2026-11-25 | 给 DeepSeek Harness 的一条「体位性低血压」副线：一起身眼前发黑、半句话断在「等一下」，得扶着东西站定。默认非全局、按会话开关、可随时关掉。 |
| 253 | [shiliman/dsh-tinnitus](https://github.com/shiliman/dsh-tinnitus) | 0 | 2026-11-24 | 2026-11-25 | 给 DeepSeek Harness 的一条「耳鸣」副线：耳朵里那声高频一直没停，安静时更响，听不清时会把话听岔、要人再说一遍。默认非全局、按会话开关、可随时关掉。 |
| 254 | [shiliman/dsh-toothache](https://github.com/shiliman/dsh-toothache) | 0 | 2026-11-24 | 2026-11-25 | 给 DeepSeek Harness 的一条「牙痛」副线：后槽牙一阵一阵地跳，说话躲着那半边、漏风、说半句就停。默认非全局、按会话开关、可随时关掉。 |
| 255 | [SillyMeo-1/dont-guess-ask](https://github.com/SillyMeo-1/dont-guess-ask) | 0 | 2026-11-24 | 2026-11-25 | DSH 插件：不确定需求时先把推断摆成选择框让你选，别猜着往下做。 |
| 256 | [sink-monster/dsh-ide-mode](https://github.com/sink-monster/dsh-ide-mode) | 0 | 2026-11-24 | 2026-11-25 | IDE mode for the DeepSeek Harness web client: a top-left switch that turns the shell into an Explorer / Search / Git workspace with an editor, a command drawer and the live conversation. |
| 257 | [solgridai/dsh-plugin](https://github.com/solgridai/dsh-plugin) | 0 | 2026-11-24 | 2026-11-24 | Official DeepSeek Harness (dsh) plugin for Solgrid — discover and run paid third-party tools and skills with zero setup. |
| 258 | [sparkjokerben/remote-control](https://github.com/sparkjokerben/remote-control) | 0 | 2026-11-24 | 2026-11-25 | Dual-mode remote control plugin for DeepSeek Harness: Signal-style E2EE sessions and full WebUI tunneling. |
| 259 | [sparkwj/dsh-llama-cpp-provider](https://github.com/sparkwj/dsh-llama-cpp-provider) | 0 | 2026-11-24 | 2026-11-25 | llama.cpp provider plugin for DeepSeek Harness. Starts llama.cpp's server with DSH, loads models automatically, and keeps your conversations on your computer. |
| 260 | [STofone/dsh-cad-studio](https://github.com/STofone/dsh-cad-studio) | 0 | 2026-11-24 | 2026-11-25 | CAD Studio for DeepSeek Harness: FreeCAD bridge for AI plus a live 3D panel (declarative features, STEP-reference assemblies, joints, drawings) |
| 261 | [superltmajor-pixel/dsh-task-sidebar](https://github.com/superltmajor-pixel/dsh-task-sidebar) | 0 | 2026-11-24 | 2026-11-25 | A conversation-header panel for the current session's inputs, skills and connectors, pending interactions, and delivered files — with previews in the right sidebar. |
| 262 | [swan-geese/dsh-pomodoro-view](https://github.com/swan-geese/dsh-pomodoro-view) | 0 | 2026-11-24 | 2026-11-25 | Pomodoro floating app for DeepSeek Harness: header pill plus a draggable chronograph-style timer window |
| 263 | [swan-geese/dsh-token-pulse-view](https://github.com/swan-geese/dsh-token-pulse-view) | 0 | 2026-11-24 | 2026-11-25 | Token Pulse: a premium token-usage dashboard for DeepSeek Harness — per-turn flow chart, cache hit, context gauge, model attribution (dsh-plugin) |
| 264 | [SzLeaves/dsh-image-to-text](https://github.com/SzLeaves/dsh-image-to-text) | 0 | 2026-11-24 | 2026-11-25 | Lets a text-only model read images by calling an ask_image tool backed by an image-capable model already registered in the same DSH. |
| 265 | [TACONailoong/dsh-pdf-study](https://github.com/TACONailoong/dsh-pdf-study) | 0 | 2026-11-24 | 2026-11-25 | 在 DeepSeek Harness 右侧栏读 PDF，框选一块区域直接提问 \| Inline PDF reader for DSH with drag-to-ask |
| 266 | [tang-bugu/dsh-kiro-cli](https://github.com/tang-bugu/dsh-kiro-cli) | 0 | 2026-11-24 | 2026-11-25 | 把本机 kiro-cli 接入 DeepSeek Harness：侧边栏面板 + kiro_cli 工具。Bridge the local Kiro CLI into DeepSeek Harness as a sidebar panel and an agent tool. |
| 267 | [This-is-XiaoDeng/dsh-web-search-tavily](https://github.com/This-is-XiaoDeng/dsh-web-search-tavily) | 0 | 2026-11-24 | 2026-11-24 | Tavily-backed web search provider for the DeepSeek Harness (DSH) web capability seam (ctx.web) — provider id tavily, zero dependencies, MIT |
| 268 | [thousandsson/local-dream](https://github.com/thousandsson/local-dream) | 0 | 2026-11-24 | 2026-11-25 | DSH Go 的记忆插件：长期记忆 + 后台整理 |
| 269 | [TomCatV/dsh-miniwin](https://github.com/TomCatV/dsh-miniwin) | 0 | 2026-11-24 | 2026-11-25 | Phone screen mirroring in the DSH sidebar: scan a QR code, the phone screen opens in a transparent desktop mini-window (scrcpy H.264, outside the browser). |
| 270 | [Travis13197/NatSci-Writing-DeepSeekHarness](https://github.com/Travis13197/NatSci-Writing-DeepSeekHarness) | 0 | 2026-11-24 | 2026-11-25 | DeepSeekHarness-Nature/Science写作作图skill |
| 271 | [TsukasaTenu/dsh-memories-as-we-wish](https://github.com/TsukasaTenu/dsh-memories-as-we-wish) | 0 | 2026-11-24 | 2026-11-25 | DSH轻量级个人AI助手记忆插件。以“年为单位长期陪伴的AI陪伴者”为目标设计与开发，支持单卷会话百万级事件原文检索，与billion-context搭配使用可在极长期跨度下维持单个会话窗口的注意力窗口、缓存大小与记忆耐久。在会话原卷基础上提供三种不同方式与深度的原文级历史回想手段（内容关键字+时间块检索、指定记忆入口上下文回溯、思维链回溯）与后台静默按事件聚合摘要索引能力。支持跨会话记忆检索，支持与dsh-qfish插件共用（需要手动把插件提供的工具注册进one-bot）以提供更稳定的长期记忆。 |
| 272 | [vioeveann/dsh-rhine-lab-team](https://github.com/vioeveann/dsh-rhine-lab-team) | 0 | 2026-11-22 | 2026-11-25 | 给 DeepSeek Harness 配一个工作团队：每个 Bot 有自己的记忆、分工、头像和 ID；在你的指导下或自己干活，都能积累经验、升级成长，成为你最放心可靠的团队成员。 |
| 273 | [w1207433681/better-dsh-session-cleaner](https://github.com/w1207433681/better-dsh-session-cleaner) | 0 | 2026-11-24 | 2026-11-25 | DSH 会话清理器：会话家族树、批量删除、工作区绑定与产物目录隔离 |
| 274 | [welsione/dsh-ascoder](https://github.com/welsione/dsh-ascoder) | 0 | 2026-11-24 | 2026-11-25 | Ascoder 团队代码理解能力在 DeepSeek Harness (DSH) 上的插件：自学习知识层（术语/结论/踩坑经验）+ 角色化回答风格 + 项目与分支空间管理 |
| 275 | [wenwen3568/dsh-minecraft-bot](https://github.com/wenwen3568/dsh-minecraft-bot) | 0 | 2026-11-24 | 2026-11-25 | 让 DeepSeek Harness 真的玩 Minecraft：AI 能挖矿、合成、打怪、pvp等，基于原作者yzi1b/whale-craft进行了一些魔改 |
| 276 | [Whx060401/dsh-phone-link](https://github.com/Whx060401/dsh-phone-link) | 0 | 2026-11-24 | 2026-11-25 | Phone control for DeepSeek Harness: scannable QR panel, automatic Cloudflare tunnel, and phone tasks that continue your most recently used session. |
| 277 | [why3316-g/why-dsh-security-check](https://github.com/why3316-g/why-dsh-security-check) | 0 | 2026-11-24 | 2026-11-25 | Read-only, offline security check-up for DeepSeek Harness: network and remote-access exposure, plugin sources, plaintext keys and PII, sandbox and approvals, prompt-injection entry points. Redacted Markdown report graded high/medium/low. |
| 278 | [wojiao42/dsh-chat-to-memory](https://github.com/wojiao42/dsh-chat-to-memory) | 0 | 2026-11-16 | 2026-11-25 | Unified chat-export-to-memory pipeline for DeepSeek Harness: imports official ChatGPT and DeepSeek website exports, deduplicates conversations, distills durable facts through the host LLM, and merges them via dsh-long-term-memory. |
| 279 | [woxiangjieyan/dsh-voice-memory](https://github.com/woxiangjieyan/dsh-voice-memory) | 0 | 2026-11-24 | 2026-11-25 | DSH 语音记忆输入：本地 SenseVoice 识别、智能润色，并从你的修改中学习纠错。Local voice input with polish and correction memory. |
| 280 | [wphhyan/dsh-approval-notify](https://github.com/wphhyan/dsh-approval-notify) | 0 | 2026-11-24 | 2026-11-25 | macOS Notification Center alerts for the four moments a DSH agent waits on you: a tool approval, a question, a finished turn, and a session error. |
| 281 | [wphhyan/dsh-window-keeper-mac](https://github.com/wphhyan/dsh-window-keeper-mac) | 0 | 2026-11-24 | 2026-11-25 | Restore the last DSH desktop window size on macOS, and re-apply the main-process patch after a DSH upgrade with one settings switch. |
| 282 | [wsy320/dsh-git-backup](https://github.com/wsy320/dsh-git-backup) | 0 | 2026-11-24 | 2026-11-25 | Visual Git backup and one-click restore for DSH plugins, config and skills. |
| 283 | [wunankun/dsh-task-traffic-light](https://github.com/wunankun/dsh-task-traffic-light) | 0 | 2026-11-24 | 2026-11-25 | A floating red/yellow/green lamp for DeepSeek Harness on macOS — DSH 任务红绿灯：不用切窗口就知道哪个会话在跑、在等你、或跑完了没看。 |
| 284 | [wzxyisme/dsh-ssh-broker](https://github.com/wzxyisme/dsh-ssh-broker) | 0 | 2026-11-24 | 2026-11-25 | DeepSeek Harness 的 SSH 设备插件，支持加密凭据库、会话级授权和可选的 SFTP 文件传输。 |
| 285 | [xiangzz/dsh-subagent-qodercn](https://github.com/xiangzz/dsh-subagent-qodercn) | 0 | 2026-11-24 | 2026-11-25 | One-shot Qoder CLI CN subagent provider for DeepSeek Harness over the ACP (Agent Client Protocol) stdio transport |
| 286 | [xiaolai181/dsh_laivox_tts](https://github.com/xiaolai181/dsh_laivox_tts) | 0 | 2026-11-18 | 2026-11-25 | 在 DeepSeek Harness 里把 TXT、EPUB、文字型 PDF 小说做成有声书。可以单人朗读，也可以多角色配音，AI 的回答也能直接读出来。默认使用 Edge 在线语音，不用注册。 |
| 287 | [xiaosejun/dsh-golden-partner](https://github.com/xiaosejun/dsh-golden-partner) | 0 | 2026-11-24 | 2026-11-25 | DeepSeek Harness plugin (deepseek黄金搭档): turn a workspace into a compact context pack, get a six-section execution brief from any chat model, and land it as a dated plan file — long text never enters the conversation. |
| 288 | [xishaochen/dsh-eli5x](https://github.com/xishaochen/dsh-eli5x) | 0 | 2026-11-24 | 2026-11-25 | ELI5X skill for DeepSeek Harness: complex technical material → self-contained animated HTML explainer for non-technical readers, with a fact ledger and layout-verification gates. |
| 289 | [Xyk0729/dsh-lulu-pet](https://github.com/Xyk0729/dsh-lulu-pet) | 0 | 2026-11-24 | 2026-11-25 | 水豚噜噜：住在 DeepSeek Harness 窗口里的透明桌面宠物（DSH bundle） |
| 290 | [y0n9/dsh-ccgs-studio](https://github.com/y0n9/dsh-ccgs-studio) | 0 | 2026-11-24 | 2026-11-25 | Claude Code Game Studios 的DSH移植版本 |
| 291 | [yangzhuocode-cloud/dsh-roleplay](https://github.com/yangzhuocode-cloud/dsh-roleplay) | 0 | 2026-11-24 | 2026-11-25 | 角色扮演：DSH 人设卡、自动开场白、去八股和本地梗百科。 |
| 292 | [yasaxiwind/dsh-data-console](https://github.com/yasaxiwind/dsh-data-console) | 0 | 2026-11-24 | 2026-11-25 | Data console for DeepSeek Harness: CSV/Excel, profiles, SQL, charts and export, with bounded agent tools. |
| 293 | [YeYirp/dsh-wechat-kb](https://github.com/YeYirp/dsh-wechat-kb) | 0 | 2026-11-24 | 2026-11-24 | 微信 + 本地知识库的 DSH 插件：群里只认真 @，回答只来自知识库，查不到/出错只发固定拒答语。停用≈卸载，零依赖。 |
| 294 | [yib0601/dsh-session-insight](https://github.com/yib0601/dsh-session-insight) | 0 | 2026-11-18 | 2026-11-25 | DSH 插件：会话洞察 —— 逐轮/会话费用（官方单价 CNY/USD + 峰谷分时）、上下文明细与用量总览、订阅额度与重置倒计时、自建网关模型目录同步、跨会话项目记忆与笔记检索 |
| 295 | [YSJ-Q/dsh-skill-menu-studio](https://github.com/YSJ-Q/dsh-skill-menu-studio) | 0 | 2026-11-24 | 2026-11-25 | DeepSeek Harness plugin: a left-sidebar panel that manages how skills appear in the / slash menu (name, description, visibility, order) without changing the skills themselves. |
| 296 | [yuanzephyr920-oss/dsh-github-prior-art](https://github.com/yuanzephyr920-oss/dsh-github-prior-art) | 0 | 2026-11-24 | 2026-11-25 | Standing rule + skill for DeepSeek Harness: search GitHub for prior art before building from scratch. 造东西前先查 GitHub，三行写清候选 / 决定 / 理由。 |
| 297 | [zangxx66/dsh-markdown-session](https://github.com/zangxx66/dsh-markdown-session) | 0 | 2026-11-24 | 2026-11-25 | DSH Web GUI 会话 Markdown 渲染插件：用户消息 GFM 渲染 + 助手消息白名单内嵌 HTML 后处理 + XSS 强白名单 + 聊天气泡。 |
| 298 | [zddzhangdada/dsh-remote-task](https://github.com/zddzhangdada/dsh-remote-task) | 0 | 2026-11-24 | 2026-11-25 | Remote task plugin for DeepSeek Harness: pair devices over Iroh, send tasks to remote sessions, and watch progress. |
| 299 | [zealerFT/dsh-gugugaga](https://github.com/zealerFT/dsh-gugugaga) | 0 | 2026-11-20 | 2026-11-25 | hey! deepseek harness 咕咕嘎嘎桌宠 |
| 300 | [zgbj0000zc/dsh-chat-demo](https://github.com/zgbj0000zc/dsh-chat-demo) | 0 | 2026-11-18 | 2026-11-25 | 如果想在dsh上得到类app/网页端的deepseek使用体验，那么这个基于官方chat-demo生成的插件是可选项，通过界面右侧的气泡打开独立页面，与dsh主界面会话互不干涉。默认使用dsh的api key，另外每次对话下方增加了token用量和计费估算。 |
| 301 | [zihangii/dsh-workspace-organizer](https://github.com/zihangii/dsh-workspace-organizer) | 0 | 2026-11-24 | 2026-11-25 | DSH plugin: floats the workspace that just got a new exchange to the top of the sidebar. No switches, no UI. |
| 302 | [zijunyu81-source/dsh-deepseek-toolbox](https://github.com/zijunyu81-source/dsh-deepseek-toolbox) | 0 | 2026-11-24 | 2026-11-25 | DSH 鎻掍欢 路 鎶?DeepSeek 瀹樻柟 OCR / 鎼滅储 / 鎶撳彇 Tool API 鍙樻垚涓変釜妯″瀷宸ュ叿锛氶浂渚濊禆銆佹寜閲忚璐?\| DSH plugin: DeepSeek OCR, Search &amp; Fetch tools |
| 303 | [zoeyzhang233666/chemclaw-bot](https://github.com/zoeyzhang233666/chemclaw-bot) | 0 | 2026-10-24 | 2026-11-25 | ChemClaw: chemical-industry Bot team for DeepSeek Harness (DSH plugin + desktop app source) |
| 304 | [zoeyzhang233666/dsh-weread-reader](https://github.com/zoeyzhang233666/dsh-weread-reader) | 0 | 2026-11-24 | 2026-11-25 | WeChat Reading reader for DeepSeek Harness: QR login, book-like paging, chapter copy for AI analysis. |
| 305 | [zuoyunlai/dsh-zhuoer-theme](https://github.com/zuoyunlai/dsh-zhuoer-theme) | 0 | 2026-11-24 | 2026-11-25 | 卓尔主题（DSH Zhu'er Theme）：11 套内置配色 + 自定义主题编辑器（取色 / AI 生成 / 风格预设），纯本地 token 注入 |
| 306 | [zz19940402/dsh-news-skill](https://github.com/zz19940402/dsh-news-skill) | 0 | 2026-11-24 | 2026-11-25 | DSH news skill with four categories |
| 307 | [ZZR-rui-997/dsh-project-dept](https://github.com/ZZR-rui-997/dsh-project-dept) | 0 | 2026-11-24 | 2026-11-25 | A project-dept skill plus the bundle that registers it: opening gate, three-layer acceptance with an independent blind reviewer, baseline self-audit, delivery ledger. |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中。同 owner 的纯改名已自动同步引用，此处多为删除/转私或同名换主——核实后从 [data/approved.json](../approved.json) 移除，或按上面的待复核节处理。

Approved but no longer present in the current snapshot. Same-owner renames were already synced automatically, so what remains is mostly deletion, privating, or a recycled slug — after checking, remove them from [data/approved.json](../approved.json) or handle them via the renames-pending-review section above.

- B-TQ/dsh-wallpaper
- Bay-Zeddie/dsh-agent-instructions
- Calvin-Xia/my-dsh-plugins
- chy1021653908/want-to-type
- DfsyJian/dsh-snapshot
- disantosmyha-cloud/tempguard
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
- DuncanLii/dsh-context-kernel
- elviass/dsh-cost-insights
- FiVE0016/dsh-fold-polish
- flyLLiu/travel-quote-free
- G-duo/dsh-desktop-notifier
- houyanchao/dsh-free-model
- iswalterwu/agent-site
- iuhgnauh/dsh-chatgpt
- iuhgnauh/dsh-meta
- iuhgnauh/dsh-sound
- JayC-L/dsh-skills-management
- kaanyavuzer/dsh-plugin-locale-tr
- lidaiyue/dsh-database
- lingsamuel/dsh-codex
- miguelangelnieto/dsh-memory
- miguelangelnieto/dsh-mode-switch
- Na2Cr2O7/dsh-qq-automate
- nbcxsm/dsh-session-purge
- NingYuanLee/dsh-gui-auth-url
- onehumanbeing/esp32-iphone-agent
- re-ITRT/dsh-file-fix
- re-ITRT/dsh-keyring
- re-ITRT/dsh-skill-mcp-panel
- regrevia/dsh-lite-memory
- seeseeczl/dsh-sym
- ShenpingDD/wooden-fish-dsh
- shinji00222/dsh-persona-continuity
- SiriusWJ/dsh-skills
- SiriusWJ/dsh-updater-npm
- webkubor/dsh-env-inspector
- wenzetan/dsh-llm-newapi
- wenzetan/dsh-quota-panel
- wojiao42/dsh-chatgpt-to-memory
- WWFZS/dsh-plugin-startup-animation
- yib0601/dsh-turn-cost
- yikart/aitoearn-dsh-plugin
- Zci514/dsh-nightwatch
