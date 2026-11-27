# 待审核仓库 / Pending review

> 新增到 `dsh-plugin` Topic 下、带有简介、尚未经维护者核实的仓库。本文件由 `scripts/update.mjs` 每日刷新，仅供审核使用，不是用户可见页面。
>
> Repositories newly added to the `dsh-plugin` topic that the maintainer has not verified yet. Refreshed daily by `scripts/update.mjs`; review-only, not a user-facing page.

- 生成时间 / Generated: **2026-11-27**
- 快照日期 / Snapshot date: **2026-11-27 (UTC)**
- 待审核 / Pending: **289**
- 从快照消失的已核准仓库 / Approved repositories missing from the snapshot: **33**
- Star 异常增长 / Star-growth alerts: **9** — 先看下方告警节 / see the alert section first
- 改名/身份待复核 / Renames pending review: **41**

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

对比上一份快照 **2026-11-26** / vs previous snapshot **2026-11-26**。规则：日增 ≥100★；单日净减 ≥100★（GitHub 批量清号回收的签名——被回收的星通常是刷的，余下星数也应视为虚高）；已核准仓新入 Top 200（且 Δ≥50）/ 名次跃升 ≥50 / 冲入 Top 20；待审仓 ≥100★ 且核准后将进入 Top 200。

- 看 Star 是否与 fork、提交活跃度、仓库年龄匹配（高星零 fork、创建当天几百星，多为刷星）
- 单日大幅掉星 = 此前刷星被官方回收；刷星常贴着 +100★/日阈值之下滴灌增长，掉星往往是我们能机器检出的唯一痕迹
- 是否把已有高星的通用项目贴上 `dsh-plugin` Topic 蹭榜——插件本身可进目录，但应加入 `leaderboard_exclusions`，理由写清 stars accrued as …
- 待审仓若核准会直接冲进 Top 20 / Top 200，先确认热度来自 **DSH 插件本身**
- 已核准仓的异常跃升：确认后同样可记入 `leaderboard_exclusions`，不必下架目录

Check stars against forks, commit activity and age (hundreds of stars on day one, or high stars with zero forks, usually look bought). A generic high-star project that only just tagged `dsh-plugin` can stay in the catalog but should go to `leaderboard_exclusions` (reason: stars accrued as …). If approving a pending repo would drop it into Top 20 / Top 200, confirm the audience is the DSH plugin itself.

- 告警数 / Alerts: **9**

| Project | Queue | Stars | Δ | Forks | Age | Signals | 审核提示 / Hint |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| ⚠️ [rohitg00/agentmemory](https://github.com/rohitg00/agentmemory) | 待审 / pending | 30634 | — | 2729 | 274d | 待审高星 | 核准即 Top 1 |
| ⚠️ [nexu-io/opengame](https://github.com/nexu-io/opengame) | 已核准 / approved | 2197 | +1422 | 356 | 1d | 日增百星 | 日增 +1422★；创建 1 天；已不进榜单 |
| ⚠️ [Ebony-Vinyl/dsh-our-free-model](https://github.com/Ebony-Vinyl/dsh-our-free-model) | 已核准 / approved | 89089 | +943 | 2522 | 63d | 日增百星 | 日增 +943★；已不进榜单 |
| ⚠️ [kunkundi/crossdesk](https://github.com/kunkundi/crossdesk) | 已核准 / approved | 8776 | +319 | 939 | 1102d | 日增百星 | 日增 +319★；已不进榜单 |
| ⚠️ [nexu-io/openmotion](https://github.com/nexu-io/openmotion) | 已核准 / approved | 16935 | +230 | 1689 | 199d | 日增百星 | 日增 +230★；已不进榜单 |
| ⚠️ [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | 已核准 / approved | 20280 | +219 | 705 | 105d | 日增百星 | 日增 +219★；已不进榜单 |
| ⚠️ [Fei-Craft/DS-Bot](https://github.com/Fei-Craft/DS-Bot) | 已核准 / approved | 9143 | +136 | 920 | 50d | 日增百星 | 日增 +136★ |
| ⚠️ [tw93/Mole](https://github.com/tw93/Mole) | 已核准 / approved | 76438 | +113 | 2760 | 429d | 日增百星 | 日增 +113★；已不进榜单 |
| ⚠️ [helloHub1212/dsh-windows-mcp](https://github.com/helloHub1212/dsh-windows-mcp) | 已核准 / approved | 2745 | +110 | 12 | 46d | 日增百星 | 日增 +110★；★/fork 228.8；已不进榜单 |

## 改名与身份变化待复核 / Renames pending review

同 owner、同 GitHub 仓库 ID 的纯改名已由脚本自动同步全部引用（approved / curated / packages / 榜单简介 / 精选）并保留原审批日期；以下条目无法安全自动处理，需人工核实：

- owner 迁移（仓库转移到别的账号）→ 人工确认后更新各文件的 key
- 同名换主（slug 未变但仓库 ID 变化，原仓库删除后被人重建）→ 人工确认审批去留
- 检测到改名但没有存储引用可同步 → 人工确认是否需要补引用

Same-owner, same-repository-id renames were synced automatically across approved.json / curated.json / packages.json / leaderboard descriptions / featured picks, with the original approval date kept. The entries below could not be handled safely and need manual review.

- `1475505/dsh-plugin-miliastra-toolbox` → `duduk233/dsh-plugin-miliastra-toolbox` — owner changed — transfer needs review
- `1475505/miliastra-beyond-simulator` → `duduk233/miliastra-beyond-simulator` — owner changed — transfer needs review
- `alicesaikawa/cache-sentinel` → `nvqy/cache-sentinel` — owner changed — transfer needs review
- `AliceSaikawa/dsh-webui-m3e` → `nvqy/dsh-webui-m3e` — owner changed — transfer needs review
- `beaver-awa/dsh-model-source-picker` → `BEAVER-fishcake/dsh-model-source-picker` — owner changed — transfer needs review
- `JeremyCruzFang/dsh-plugin-dshm` → `VeynAI/dsh-plugin-dshm` — owner changed — transfer needs review
- `zepeng-jin/dsh-completion-notifier` → `can-mrjin/dsh-completion-notifier` — owner changed — transfer needs review
- `zepeng-jin/dsh-particle-whale` → `can-mrjin/dsh-particle-whale` — owner changed — transfer needs review
- `1804608397/dsh-plugin-linux-computer-use` → `BeiningCheng/dsh-plugin-linux-computer-use` — owner changed — transfer needs review
- `1804608397/dsh-plugin-browser-bridge` → `BeiningCheng/dsh-plugin-browser-bridge` — owner changed — transfer needs review
- `lintaojlu/dsh-inplace-edit` → `hellonil/dsh-inplace-edit` — owner changed — transfer needs review
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
- `6jeffr3y/dsh-session-manager` — identity change: repository id 1351285906 → 1474312423 under the same slug — approval needs review


| # | Project | Stars | Created | First seen | Description |
| ---: | --- | ---: | ---: | ---: | --- |
| 1 | [rohitg00/agentmemory](https://github.com/rohitg00/agentmemory) ⚠️ | 30634 | 2026-02-25 | 2026-11-27 | #1 Persistent memory for AI coding agents based on real-world benchmarks |
| 2 | [duduk233/miliastra-beyond-simulator](https://github.com/duduk233/miliastra-beyond-simulator) | 107 | 2026-09-23 | 2026-11-27 | 千星沙箱模拟器：Lua 驱动的 2D 奇域外置沙箱 ，支持 DeepSeek Harness、Web 和 MCP |
| 3 | [duduk233/dsh-plugin-miliastra-toolbox](https://github.com/duduk233/dsh-plugin-miliastra-toolbox) | 38 | 2026-08-13 | 2026-11-27 | 将千星沙箱（原神千星奇域）知识库接入 Deepseek Harness 的插件 |
| 4 | [xiazeying/dsh-liang-rheostat](https://github.com/xiazeying/dsh-liang-rheostat) | 6 | 2026-11-27 | 2026-11-27 | An 8-tier Liang Rheostat for DeepSeek Harness: full-app cross-faded wallpapers and reasoning effort sync. |
| 5 | [gyc0717/jiyixinghai](https://github.com/gyc0717/jiyixinghai) | 3 | 2026-11-02 | 2026-11-27 | 把和 AI 聊过的记录摊成一片能漂游的星海 —— DeepSeek Harness 插件 |
| 6 | [TaplioOfficial/taplio-linkedin-plugin](https://github.com/TaplioOfficial/taplio-linkedin-plugin) | 3 | 2026-07-10 | 2026-11-27 | Taplio for LinkedIn plugin: 26 LinkedIn skills running on the Taplio MCP, for Claude Code, Cursor, GitHub Copilot, Gemini CLI and Grok Build. Write, plan, engage and grow on LinkedIn from your AI assistant. |
| 7 | [Arthyra/multisim-mcp](https://github.com/Arthyra/multisim-mcp) | 2 | 2026-11-19 | 2026-11-27 | Local MCP for NI Multisim schematic editing, F5 logic testing, and COM simulation. |
| 8 | [Casual05/dsh-image-reference](https://github.com/Casual05/dsh-image-reference) | 2 | 2026-11-27 | 2026-11-27 | DSH 插件：降低带图长会话的首字延迟（TTFT）——历史图片换成只读路径、文字描述和可选缩略图。Reduce time to first token (TTFT) in image-heavy DeepSeek Harness chats with lightweight references for older images. |
| 9 | [liujing9178/dsh-tool-picker](https://github.com/liujing9178/dsh-tool-picker) | 2 | 2026-11-22 | 2026-11-27 | Progressive tool disclosure for DeepSeek (DSH): catalog first, pick with tool_pick, send only selected tool schemas. |
| 10 | [NaiDragonForge/dsh-better-wps-for-study](https://github.com/NaiDragonForge/dsh-better-wps-for-study) | 2 | 2026-11-27 | 2026-11-27 | 面向大学学习的 DeepSeek Harness（DSH）插件：一份 Markdown 提纲一次成稿，直接输出 16:9 PPTX、可编辑 Word 与 PDF。梁的受力/剪力/弯矩图、桁架内力、公式、分子结构式、实验数据图表、机械电子示意图全部由算法求解并自动校核（每次返回 checks\[\] 与可引用的数值），图与数不会互相打架。另含由文档提炼 PPT、实验报告抬头表单、正文字体（楷体/宋体/黑体/Times）与关键词搜图。安装：dsh plugin --profile web add dsh-better-wps-for-study。依赖随包，Windows x64 离线可用；不含任何学校专用模板。 |
| 11 | [nvqy/dsh-webui-m3e](https://github.com/nvqy/dsh-webui-m3e) | 2 | 2026-09-26 | 2026-11-27 | Material 3 Expressive mobile Web UI plugin for DeepSeek Harness (DSH), switched per device |
| 12 | [TengJiao33/skillnet-dsh](https://github.com/TengJiao33/skillnet-dsh) | 2 | 2026-11-16 | 2026-11-27 | SkillNet plugin for DeepSeek Harness: discovery, personal skills, graph analysis, routing, creation and evaluation. |
| 13 | [yhuan416/dsh-opencode-client](https://github.com/yhuan416/dsh-opencode-client) | 2 | 2026-11-05 | 2026-11-27 | Cross-server observation console and native subagent backend for OpenCode, as a DeepSeek Harness plugin. |
| 14 | [0sparrow0/dsh-protect-files](https://github.com/0sparrow0/dsh-protect-files) | 1 | 2026-11-27 | 2026-11-27 | 把「生产级配置」挡在 agent 的工具之外：按分组登记不允许被读取、搜索或写入的目录与文件，DeepSeek Harness 会在工具真正执行之前拒绝任何触碰它们的调用。 |
| 15 | [666-mbz/dsh-bailian-meter](https://github.com/666-mbz/dsh-bailian-meter) | 1 | 2026-11-27 | 2026-11-27 | DSH Web 左侧栏百炼花费面板：本地会话 token 统计、300 元额度估算与校准 |
| 16 | [ADkun/dk](https://github.com/ADkun/dk) | 1 | 2026-11-23 | 2026-11-27 | 轻量代码索引：一份 .dk/map.txt 一行一个文件，写清职责 / 关系 / 契约 / 约束。模型改代码前先 dk_map 查、改完 dk_put 写回。Rust 核心 + MCP + DSH 插件。 |
| 17 | [AeolusJack/d01-suite](https://github.com/AeolusJack/d01-suite) | 1 | 2026-11-27 | 2026-11-27 | D-01 suite: market board + quant machine as DeepSeek Harness plugins |
| 18 | [afspero/CanvasMind](https://github.com/afspero/CanvasMind) | 1 | 2026-11-27 | 2026-11-27 | CanvasMind — project canvas, free whiteboard and component studio plugin for DeepSeek Harness. Local JSON data, no database or config, reuses the Harness default model. |
| 19 | [Alone-Ray/dsh-plugins](https://github.com/Alone-Ray/dsh-plugins) | 1 | 2026-11-27 | 2026-11-27 | Plugins for DeepSeek Harness (DSH): one folder per plugin, ready to install from this repository. |
| 20 | [Applepinea/dsh-gemini-widget](https://github.com/Applepinea/dsh-gemini-widget) | 1 | 2026-11-27 | 2026-11-27 | DSH 界面右下角的 Gemini娘：上下文占用 / Token / 缓存命中率 / 余额 / 每轮消耗，五帧表情联动、确认提醒、轮末播报 |
| 21 | [BEAVER-fishcake/dsh-model-source-picker](https://github.com/BEAVER-fishcake/dsh-model-source-picker) | 1 | 2026-11-08 | 2026-11-27 | Provider-first model picker for DeepSeek Harness: pick the model source first, then the model. |
| 22 | [CollinsLiu615/mc-harness-ui](https://github.com/CollinsLiu615/mc-harness-ui) | 1 | 2026-11-27 | 2026-11-27 | DeepSeek Harness外观插件，将你的DeepSeek改造成mc主题的界面。 |
| 23 | [fubai-fenzhi/dsh-bilibili-upload](https://github.com/fubai-fenzhi/dsh-bilibili-upload) | 1 | 2026-11-26 | 2026-11-27 | Upload videos to Bilibili from DSH through biliup: title, description, tags, cover, partition, visibility, plus a settings panel. |
| 24 | [fubai-fenzhi/dsh-qqmail](https://github.com/fubai-fenzhi/dsh-qqmail) | 1 | 2026-11-27 | 2026-11-27 | Manage a QQ mailbox from DSH: read, search, archive by rule, mark read, deduplicate, and send — over IMAP/SMTP with a dependency-free client. |
| 25 | [Gatsby666-jay/dsh-doubaowork-connect](https://github.com/Gatsby666-jay/dsh-doubaowork-connect) | 1 | 2026-11-27 | 2026-11-27 | 把本机登录的豆包工作接入 DeepSeek Harness 模型选择器：倍率由上游目录给出，逐模型图片输入开关、账号池自动换号、只读积分胶囊。Doubao Work models for DSH. |
| 26 | [guagua159/dsh-sleep-guard](https://github.com/guagua159/dsh-sleep-guard) | 1 | 2026-11-27 | 2026-11-27 | DeepSeek Harness bundle that refuses shell commands that would block the whole turn. |
| 27 | [hanshalwi/dsh-tokenharbor-usage](https://github.com/hanshalwi/dsh-tokenharbor-usage) | 1 | 2026-11-27 | 2026-11-27 | A DeepSeek Harness (DSH) plugin that shows how much of your TokenHarbor weekly allowance is left — the paid Pass and the free-model pool — as a chip at the sidebar foot, a popover, and an agent tool. |
| 28 | [him-steve/dsh-memora](https://github.com/him-steve/dsh-memora) | 1 | 2026-11-27 | 2026-11-27 | 纯文本通用记忆架构：常驻层不到 2KB，记忆永久存档，可随时迁移。适用于各类能读文件的 AI Agent，提供 DSH 插件与纯文件双版本。 \| Ultra-lightweight plain-text memory architecture: &lt;2KB resident layer, persistent archives, portable anytime. For file-capable AI agents; DSH plugin and plain-file editions. |
| 29 | [hoducthien36-lang/dsh-mentor](https://github.com/hoducthien36-lang/dsh-mentor) | 1 | 2026-11-27 | 2026-11-27 | Clean-room, zero-dependency task supervision &amp; independent verification plugin for DeepSeek Harness with an Apple-style interactive Mind-Map UI. |
| 30 | [Inks-Jynne/dsh-sidebar-icons](https://github.com/Inks-Jynne/dsh-sidebar-icons) | 1 | 2026-11-27 | 2026-11-27 | 给 DeepSeek Harness 侧栏的黏土质感 3D 图标主题：21 个项目文件夹 + 28 个会话图标，按名称自动匹配、也可逐行自定义，会话相对项目缩进成层级。Claymorphism 3D icon theme for the DeepSeek Harness sidebar: 21 clay folders for projects, 28 clay objects for sessions — matched from names, overridable per row, with hierarchy indentation. |
| 31 | [ivezhang/dsh-GameDesignMemory](https://github.com/ivezhang/dsh-GameDesignMemory) | 1 | 2026-11-24 | 2026-11-27 | Common memory tricks for game design |
| 32 | [jlnkx5200-beep/dsh-video-forge](https://github.com/jlnkx5200-beep/dsh-video-forge) | 1 | 2026-11-27 | 2026-11-27 | Style-agnostic AI filmmaking pipeline for DSH: Storyboard DAG -&gt; Seedream / ComfyUI / MiniMax H3 / MAGI-2 -&gt; Deterministic Remotion + Three.js 3D Renderer. |
| 33 | [Le-Overdue/DSH-theme](https://github.com/Le-Overdue/DSH-theme) | 1 | 2026-11-25 | 2026-11-27 | Warm cream/charcoal palette theme for DeepSeek Harness (dsh) Web UI, light and dark. |
| 34 | [liushutong123/dsh-choerodon-plugin](https://github.com/liushutong123/dsh-choerodon-plugin) | 1 | 2026-11-27 | 2026-11-27 | 适配 DSH 的猪齿鱼插件：账号、项目、任务看板与项目模型接入 |
| 35 | [Lubin-Github/stillpoint](https://github.com/Lubin-Github/stillpoint) | 1 | 2026-11-25 | 2026-11-27 | Activity-aware workspace lock &amp; Argon2id + AES-256-GCM encrypted plugin vault for DeepSeek Harness (DSH) \| 活动感知工作区锁屏、任务平稳收尾与邮件验证码解锁插件 |
| 36 | [lukstei/dsh-plugins](https://github.com/lukstei/dsh-plugins) | 1 | 2026-11-22 | 2026-11-27 | Run several coding agents side by side in DeepSeek Harness, see at a glance which one needs you, and review their changes without leaving the browser. |
| 37 | [MOUboy/dsh-haloflux-orbit](https://github.com/MOUboy/dsh-haloflux-orbit) | 1 | 2026-11-27 | 2026-11-27 | HALOFLUX by Ryder191 as a live DSH session dashboard. Noncommercial use only. |
| 38 | [mrxublue-a11y/dsh-event-predict](https://github.com/mrxublue-a11y/dsh-event-predict) | 1 | 2026-11-27 | 2026-11-27 | DeepSeek Harness 事件预测与产业链因果推演插件（4+1 靶向红蓝对抗）\| Evidence-grounded industry-chain event impact plugin for DeepSeek Harness |
| 39 | [omnijk/dsh-learn-expert](https://github.com/omnijk/dsh-learn-expert) | 1 | 2026-11-27 | 2026-11-27 | Teach you learn sth util you really understand. |
| 40 | [shskyc/dsh-token-unit-zh](https://github.com/shskyc/dsh-token-unit-zh) | 1 | 2026-11-27 | 2026-11-27 | Rewrite DSH's native token usage pill units to 亿/百万 while preserving the click-to-open dialog. |
| 41 | [sjkk16/dsh-game-player](https://github.com/sjkk16/dsh-game-player) | 1 | 2026-11-10 | 2026-11-27 | DeepSeek Harness Windows 插件：受审批控制的键鼠操作、截图与 Live2D 桌面显示。源码采用 MIT；运行包通过 Releases 提供。 |
| 42 | [skyrocks/dsh-session-handoff](https://github.com/skyrocks/dsh-session-handoff) | 1 | 2026-11-27 | 2026-11-27 | DeepSeek Harness 插件：把当前会话讨论压缩后发送到任意工作区的另一个会话继续执行 |
| 43 | [speed55/dsh-plugin-balance-badge](https://github.com/speed55/dsh-plugin-balance-badge) | 1 | 2026-11-26 | 2026-11-27 | DeepSeek Harness plugin: sidebar account balance + full-frame spend notice with coin sound |
| 44 | [Thomas-zz/dsh-worktree-desk](https://github.com/Thomas-zz/dsh-worktree-desk) | 1 | 2026-11-25 | 2026-11-27 | DSH（DeepSeek Harness）插件「工作树」：总览本机所有仓库的 Git 工作树、就地看差异和本地分支，并关联 Codex / ZCode / DSH 会话 |
| 45 | [wstt78/dsh-pet-snakegame](https://github.com/wstt78/dsh-pet-snakegame) | 1 | 2026-11-27 | 2026-11-27 | 在你闲暇的时候，带领你的大肥鱼来一场紧张刺激的贪吃蛇游戏，躲避重重障碍，吃到token/白米饭 |
| 46 | [wuzeno/dsh-global-instructions](https://github.com/wuzeno/dsh-global-instructions) | 1 | 2026-11-27 | 2026-11-27 | Save, switch, and pause global instruction profiles in DeepSeek Harness (DSH). 多套全局指令，一键切换与暂停。 |
| 47 | [Xiami74/dsh-effort-dial](https://github.com/Xiami74/dsh-effort-dial) | 1 | 2026-11-27 | 2026-11-27 | DSH 模型菜单里的 Codex 风格推理等级滑条（重绘自 dsh-codex-power-slider） |
| 48 | [xiaobaijiadepugongyingpai-coder/dsh-crew-x](https://github.com/xiaobaijiadepugongyingpai-coder/dsh-crew-x) | 1 | 2026-11-23 | 2026-11-27 | Production-grade DeepSeek Harness (DSH) worker orchestrator: persistent sessions, dynamic port discovery, 4-tier permissions, Windows worktree fallback &amp; auto-offload. |
| 49 | [xionglongztz/dsh-media-keys](https://github.com/xionglongztz/dsh-media-keys) | 1 | 2026-11-27 | 2026-11-27 | 🎵 Windows Media-key control for DSH: play/pause, stop, previous, next, mute, volume up/down through Windows media keys. \| 为DSH设计的Windows媒体操作工具 |
| 50 | [xnn-08/dsh-mathpad](https://github.com/xnn-08/dsh-mathpad) | 1 | 2026-11-27 | 2026-11-27 | Math symbol palette for the DSH composer: click-to-insert, editable draft, operators, LaTeX. |
| 51 | [zhanghaoyudeyouxiang-sketch/dsbot-antigravity-bridge](https://github.com/zhanghaoyudeyouxiang-sketch/dsbot-antigravity-bridge) | 1 | 2026-11-26 | 2026-11-27 | 专为想在 DS Bot 中使用 Google Antigravity、又担心第三方 CLI 封号的用户设计：全原生内置 Sidecar + agentapi，非外部 CLI/OAuth 劫持，零安全风险。 |
| 52 | [10110011-ling/dsh-memo-sync](https://github.com/10110011-ling/dsh-memo-sync) | 0 | 2026-11-27 | 2026-11-27 | 目录式长期记忆 for DeepSeek Harness：一条记忆一个 markdown 文件，只把分层目录注入 AGENTS.md；带原文归档、召回计数、3D 星图。 |
| 53 | [1194868144/dsh-learning-coach](https://github.com/1194868144/dsh-learning-coach) | 0 | 2026-11-27 | 2026-11-27 | Plan-driven learning coach for DeepSeek Harness: per-subject plans, runnable acceptance checks, and mistake tracking. |
| 54 | [2102CHEN/dsh-xhs-insight](https://github.com/2102CHEN/dsh-xhs-insight) | 0 | 2026-11-27 | 2026-11-27 | Reads your own Xiaohongshu bookmarks through your logged-in Chrome (titles, bodies, likes, comments), filters by keyword, then analyses them with the DSH model or a tool-using child agent. Data stays on this machine. |
| 55 | [4Nz/dsh-agent-relay](https://github.com/4Nz/dsh-agent-relay) | 0 | 2026-11-11 | 2026-11-27 | Connect DSH with local Claude Code, Codex, and Antigravity sessions to track progress, relay messages, and hand off tasks across agents. |
| 56 | [603619710-creator/dsh-peak-coach](https://github.com/603619710-creator/dsh-peak-coach) | 0 | 2026-11-27 | 2026-11-27 | Peak/valley coach mode for DeepSeek Harness: blocks only the work nobody asked for during peak billing hours. |
| 57 | [856tangbin/context-recap](https://github.com/856tangbin/context-recap) | 0 | 2026-10-16 | 2026-11-27 | 方便用户理解的上下文摘要，等待Agent几小时后马上读懂输出结果。 |
| 58 | [A18953901111/dsh-agentflow](https://github.com/A18953901111/dsh-agentflow) | 0 | 2026-11-27 | 2026-11-27 | Declarative multi-agent workflow engine for DeepSeek Harness — YAML templates, hard budgets, citation anchors, evals. |
| 59 | [Adrenaline036/MAGI](https://github.com/Adrenaline036/MAGI) | 0 | 2026-10-03 | 2026-11-27 | 连接 Codex、DSH 与 Antigravity 的指定会话，支持定向消息、广播通知和 DSH 独立代码外审。 |
| 60 | [Akira-yylm/dsh-session-calendar](https://github.com/Akira-yylm/dsh-session-calendar) | 0 | 2026-11-27 | 2026-11-27 | 在 DSH 左侧栏加入会话日历：按天查看每个工作区创建的会话。Session calendar bundle for DeepSeek Harness. |
| 61 | [AleixRocal/dsh-subagent-routing](https://github.com/AleixRocal/dsh-subagent-routing) | 0 | 2026-11-27 | 2026-11-27 | Routing table for DeepSeek Harness subagents: pick the model per task kind (flash / strong / premium) and serve it to the skill, the command and the subagent_route tool. |
| 62 | [Allenyou1126/dsh-donetick-webhook](https://github.com/Allenyou1126/dsh-donetick-webhook) | 0 | 2026-11-27 | 2026-11-27 | Receive signed Donetick webhooks and inject them into a DeepSeek Harness conversation as a reminder-style prompt. |
| 63 | [anise0x7c/dsh-git-sidepanle](https://github.com/anise0x7c/dsh-git-sidepanle) | 0 | 2026-11-20 | 2026-11-27 | A DSH Plugin which provides a git right side panel similar to the style of VS Code |
| 64 | [AOD-YAN16/dsh-linglong-beautify](https://github.com/AOD-YAN16/dsh-linglong-beautify) | 0 | 2026-11-27 | 2026-11-27 | 玲珑美化（Linglong Beautify）：三套温柔配色 + 柔光、纸纹、花瓣，可换配色、可调装饰，侧栏 logo 也能换成小花 |
| 65 | [AOD-YAN16/dsh-linglong-persona](https://github.com/AOD-YAN16/dsh-linglong-persona) | 0 | 2026-11-27 | 2026-11-27 | 玲珑人格（Linglong Persona）：给 DSH 的每个 agent 叠加一段可随时编辑的人格，不改动任何预设的能力 |
| 66 | [arctwind/inkboard](https://github.com/arctwind/inkboard) | 0 | 2026-11-27 | 2026-11-27 | A thinking board in the right sidebar: blocks, pseudocode, and pen; the model reads and edits it through tools. |
| 67 | [ArmedHelicopter/dsh-timelessNascence-pet](https://github.com/ArmedHelicopter/dsh-timelessNascence-pet) | 0 | 2026-11-27 | 2026-11-27 | Timeless Nascence 桌宠：DSH 客户端里的透明动画桌宠 —— 状态机 / 星尘计费 / 语音 / 硬件挂牌，附宣传片（派生自 dsh-closure-pet，MIT） |
| 68 | [ArmedHelicopter/dsh-timelessNascence-skin](https://github.com/ArmedHelicopter/dsh-timelessNascence-skin) | 0 | 2026-11-27 | 2026-11-27 | Timeless Nascence 主题：藏青 / 黑 / 白极简科技风的 DeepSeek Harness 客户端皮肤（派生自 dsh-closure-skin，MIT） |
| 69 | [asun-labs/dsh-chatchat](https://github.com/asun-labs/dsh-chatchat) | 0 | 2026-11-21 | 2026-11-27 | Team agents and group chat for DeepSeek Harness and Seal Harness, with bot collaboration, long-term memory, and file delivery. |
| 70 | [asun-labs/dsh-ez-tree](https://github.com/asun-labs/dsh-ez-tree) | 0 | 2026-11-25 | 2026-11-27 | Procedural 3D tree editor for DeepSeek Harness and Seal Harness. Create and edit trees by hand or with an agent, then export GLB, PNG, or JSON. |
| 71 | [asun-labs/dsh-models](https://github.com/asun-labs/dsh-models) | 0 | 2026-11-24 | 2026-11-27 | 3D asset library for DeepSeek Harness. Browse, search, and interactively preview models, then download original GLB or X3D files with source and license details. |
| 72 | [asun-labs/dsh-super-star](https://github.com/asun-labs/dsh-super-star) | 0 | 2026-11-27 | 2026-11-27 | Discovery dashboard for DeepSeek Harness. Browse and search rankings for GitHub projects, agent skills, MCP servers, and DSH plugins. |
| 73 | [augustineclark10145-star/dsh-chat-idea-jump](https://github.com/augustineclark10145-star/dsh-chat-idea-jump) | 0 | 2026-11-24 | 2026-11-27 | Click a file reference in DSH chat to open it in the right sidebar or IntelliJ IDEA at the exact line. |
| 74 | [augustineclark10145-star/dsh-niuma-harness-widget](https://github.com/augustineclark10145-star/dsh-niuma-harness-widget) | 0 | 2026-11-24 | 2026-11-27 | DSH sidebar widget: real-time salary earned, off-work countdown and savings-goal progress. |
| 75 | [augustineclark10145-star/dsh-subagent-model-badge](https://github.com/augustineclark10145-star/dsh-subagent-model-badge) | 0 | 2026-11-24 | 2026-11-27 | Read-only model and reasoning-effort badge for DSH subagent sessions. |
| 76 | [AXHYHXA/dsh-peak-guard](https://github.com/AXHYHXA/dsh-peak-guard) | 0 | 2026-11-27 | 2026-11-27 | Token peak-hour scheduling guard for DeepSeek Harness |
| 77 | [axns8888/dsh-session-list-refresh](https://github.com/axns8888/dsh-session-list-refresh) | 0 | 2026-11-27 | 2026-11-27 | Independent DSH plugin that refreshes session lists after external persistence changes |
| 78 | [Azyzg/dsh-selective-trim](https://github.com/Azyzg/dsh-selective-trim) | 0 | 2026-11-24 | 2026-11-27 | 可选、可反悔地修剪 DSH 会话上下文：按段/按轮清工具结果、折叠记忆替换、复制或转移成新会话；带备份还原与 billion-context 折叠账支持。 |
| 79 | [BeiningCheng/dsh-plugin-browser-bridge](https://github.com/BeiningCheng/dsh-plugin-browser-bridge) | 0 | 2026-11-26 | 2026-11-27 | Chrome page bridge for DeepSeek Harness: read DOM elements and drive tabs through a paired browser extension, no screen capture required. |
| 80 | [BeiningCheng/dsh-plugin-linux-computer-use](https://github.com/BeiningCheng/dsh-plugin-linux-computer-use) | 0 | 2026-11-25 | 2026-11-27 | Computer Use for Ubuntu / GNOME Wayland in DeepSeek Harness: screenshots, AT-SPI UI tree, uinput pointer/keyboard, clipboard, processes and gsettings, bridged as mcp__linux__* tools. |
| 81 | [belly001/dsh-aurabot-native-purge](https://github.com/belly001/dsh-aurabot-native-purge) | 0 | 2026-11-27 | 2026-11-27 | 在 Aurabot 和 Purge 之间架一条通道：让住在 QQ 里的 Aurabot 直接走 DSH 原生装配，能拆包、能跑工具、亲密聊天不被拒，人格与记忆不变。 |
| 82 | [best0127/dsh-theme-liquid-glass](https://github.com/best0127/dsh-theme-liquid-glass) | 0 | 2026-11-27 | 2026-11-27 | Liquid glass theme for the DeepSeek Harness web GUI: wallpaper, frosted surfaces, translucent tokens. |
| 83 | [biezhixiwodainiwanzhangba/dsh-session-delete](https://github.com/biezhixiwodainiwanzhangba/dsh-session-delete) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness 插件：真正删掉一次会话留下的全部文件（日志/投影缓存/附件/临时溢出/工作区产物），删除前可逐类备份。 |
| 84 | [binsonHao/dsh-llm-gateway](https://github.com/binsonHao/dsh-llm-gateway) | 0 | 2026-11-27 | 2026-11-27 | Local LLM relay plugin for DeepSeek Harness: merges many OpenAI-compatible upstreams behind one endpoint with automatic failover. Zero dependencies, runs in-process. |
| 85 | [can-mrjin/dsh-completion-notifier](https://github.com/can-mrjin/dsh-completion-notifier) | 0 | 2026-10-01 | 2026-11-27 | DSH macOS native completion notification banners and sound alerts with Settings UI |
| 86 | [can-mrjin/dsh-particle-whale](https://github.com/can-mrjin/dsh-particle-whale) | 0 | 2026-08-16 | 2026-11-27 | 🐳 DeepSeek official 3D particle whale plugin for DeepSeek Harness / DSH Desktop (Three.js WebGL) |
| 87 | [caopeihuaaini/dsh-memory-hint](https://github.com/caopeihuaaini/dsh-memory-hint) | 0 | 2026-11-27 | 2026-11-27 | Shows the rules that match what you're typing, above the DSH composer. Local matching, no model calls, no API key. |
| 88 | [ccr-wer/diverge-tree](https://github.com/ccr-wer/diverge-tree) | 0 | 2026-11-27 | 2026-11-27 | 发散 → 细化 → 动态工作树：把模糊想法拆成可勾选进度的交互式步骤树；一份技能内容，支持 WorkBuddy / Codex / Claude Code / DSH |
| 89 | [chenlie84/dsh-sync-station](https://github.com/chenlie84/dsh-sync-station) | 0 | 2026-11-27 | 2026-11-27 | 跨设备同步 DeepSeek Harness 的会话、工作区与插件配置到私有 GitHub 仓库。Cross-device sync for DeepSeek Harness. |
| 90 | [chfeizy/dsh-paste-as-file](https://github.com/chfeizy/dsh-paste-as-file) | 0 | 2026-11-27 | 2026-11-27 | Turn long pasted text in the chat input into a .txt attachment, DeepSeek Web style. |
| 91 | [chrischjh/dsh-astryx](https://github.com/chrischjh/dsh-astryx) | 0 | 2026-11-27 | 2026-11-27 | DSH plugin: watches @astryxdesign releases, judges compatibility against its support contract, and self-checks the Astryx MCP server and skill. |
| 92 | [coder-zkl1988/dsh-chat-translator](https://github.com/coder-zkl1988/dsh-chat-translator) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness plugin that translates Chinese prompts into English and assistant replies into Chinese. |
| 93 | [comchris/deepamp-audio](https://github.com/comchris/deepamp-audio) | 0 | 2026-11-07 | 2026-11-27 | better vibes during vibe coding: DSH-adapter for async audio.cpp (CPU or GPU) multi-node scheduling of TTS, STT, clone-sample-lib, sfx, music, multi-speaker audio scripts, control by agent or user, digital clock |
| 94 | [Constantine-mty/dsh-chemical-structure-editor](https://github.com/Constantine-mty/dsh-chemical-structure-editor) | 0 | 2026-11-27 | 2026-11-27 | Chemical structure editor plugin for DeepSeek Harness: draw molecules, build from SMILES/molfiles, inspect descriptors, hand structures to the agent. |
| 95 | [Constantine-mty/dsh-protein-workbench](https://github.com/Constantine-mty/dsh-protein-workbench) | 0 | 2026-11-27 | 2026-11-27 | 蛋白质结构可视化——在 DSH 左侧栏打开一个完全离线的结构观察面板，支持卡通/骨架/球棍/空间填充、链与界面隔离、残基查询与 4 Å 邻居、距离测量、三档出图风格、PNG 导出与视图状态。 |
| 96 | [Constantine-mty/dsh-sequence-bench](https://github.com/Constantine-mty/dsh-sequence-bench) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness sequence bench: local DNA/RNA/protein analysis with 27 genetic codes, ENC/CAI, salt-aware Tm, pI models, and real primer design through a bundled primer3 (macOS arm64 / Windows x64). |
| 97 | [coyomii/dsh-fish-reader](https://github.com/coyomii/dsh-fish-reader) | 0 | 2026-11-27 | 2026-11-27 | DSH Fish Reader: a quiet local TXT/EPUB novel reader in the DeepSeek Harness composer placeholder. |
| 98 | [Cyrus0719/dsh-pet-remielle](https://github.com/Cyrus0719/dsh-pet-remielle) | 0 | 2026-11-27 | 2026-11-27 | 蕾米埃尔桌宠：常驻 Windows 桌面的全帧透明桌宠，能在桌面上直接和 DSH 智能体对话、派活。 |
| 99 | [daydream-wjh/dsh-llm-qianfan](https://github.com/daydream-wjh/dsh-llm-qianfan) | 0 | 2026-11-27 | 2026-11-27 | Baidu Qianfan Token Plan provider route for the DeepSeek Harness LLM seam |
| 100 | [Dealport-HQ/dealport](https://github.com/Dealport-HQ/dealport) | 0 | 2026-11-26 | 2026-11-27 | Official Dealport CLI, TypeScript SDK, MCP server &amp; Agent Skills — 28M+ US private companies, commercial buildings, cited filings &amp; owner contacts |
| 101 | [dengmuming/dsh-cloud-sandbox](https://github.com/dengmuming/dsh-cloud-sandbox) | 0 | 2026-11-24 | 2026-11-27 | Docker execution sandbox for DeepSeek Harness with workspace isolation, resource limits, and fair scheduling. Supports Linux and Windows/WSL2. |
| 102 | [dingchenhui0618-arch/dsh-dub-stage](https://github.com/dingchenhui0618-arch/dsh-dub-stage) | 0 | 2026-11-27 | 2026-11-27 | 短剧配音交付台：台词本按角色×情绪拆轨，导出保留原始文件名/扩展名/目录结构；默认 dry-run 打印路径，显式 --apply 才落盘，每轨给出时长与响度统计；内置离线占位试听轨 + 外部 TTS 命令引擎。 |
| 103 | [dingchenhui0618-arch/dsh-mahjong-solo](https://github.com/dingchenhui0618-arch/dsh-mahjong-solo) | 0 | 2026-11-27 | 2026-11-27 | Sidebar solo Sichuan mahjong (血战到底) for DeepSeek Harness: seeded AI opponents, whole-hand replay from the seed, and a game-record JSON export with tenpai and deal-in statistics. |
| 104 | [diyu331/dsh-ofm-watch](https://github.com/diyu331/dsh-ofm-watch) | 0 | 2026-11-27 | 2026-11-27 | OFM 额度看板（dsh-ofm-balance 的修改版）：侧栏显示各渠道剩余额度；无分母时显示真实数字，不编造百分比。 |
| 105 | [DokeDev/dsh-session-trash-bin](https://github.com/DokeDev/dsh-session-trash-bin) | 0 | 2026-11-27 | 2026-11-27 | Session trash bin for DeepSeek Harness: move to trash, restore, permanently delete, empty. DeepSeek Harness 会话垃圾箱：删除移入垃圾箱，可恢复、彻底删除、清空；零依赖。 |
| 106 | [DR34M3R-T/dsh-antigravity-balance](https://github.com/DR34M3R-T/dsh-antigravity-balance) | 0 | 2026-11-27 | 2026-11-27 | 为 Antigravity-Manager 适配 dsh-pet 桌宠与 dsh-model-allowance 余额展示的 DeepSeek Harness 插件 |
| 107 | [ElementBen555/context-hub](https://github.com/ElementBen555/context-hub) | 0 | 2026-11-26 | 2026-11-27 | context-hub |
| 108 | [Elysia-laoda/dsh-repair-plugins](https://github.com/Elysia-laoda/dsh-repair-plugins) | 0 | 2026-11-27 | 2026-11-27 | DSH 修理插件：两个修补 DeepSeek Harness 体验缺口的小插件 —— 提问预算闸门 + 隐藏「上下文注入」行。Two small repair plugins for DSH. |
| 109 | [endlessstary/dsh-emotion-recognition](https://github.com/endlessstary/dsh-emotion-recognition) | 0 | 2026-11-25 | 2026-11-27 | 情绪、记忆与关系，让大肥鱼拥有自己的心 |
| 110 | [factyy163/dsh-stock-hud](https://github.com/factyy163/dsh-stock-hud) | 0 | 2026-11-27 | 2026-11-27 | A draggable A-share watchlist bubble for the DeepSeek Harness Web GUI: pinyin initial + live price, configurable rotation, right-click watchlist editor, and a Settings visibility switch. |
| 111 | [fake40443/dsh-file-to-chat](https://github.com/fake40443/dsh-file-to-chat) | 0 | 2026-11-27 | 2026-11-27 | DSH plugin: send files from the workspace file tree to the chat composer via right-click or drag. 把右侧工作区文件树里的文件直接送进对话输入框（右键/拖拽）。 |
| 112 | [FallenWings27/saving-your-ass](https://github.com/FallenWings27/saving-your-ass) | 0 | 2026-11-27 | 2026-11-27 | Reins for full-access AI agents in DeepSeek Harness (DSH): hard red-line stops, reversible vault soft-delete, plain-language impact cards, and live Web settings panel. Powered by Mirai Engine. |
| 113 | [fere2012yy-coder/dsh-canvas](https://github.com/fere2012yy-coder/dsh-canvas) | 0 | 2026-10-14 | 2026-11-27 | 画布 · DSH 右栏画布工作区插件：Alt+\` 一键互换中栏/右栏，画布为主、对话为辅 |
| 114 | [flairamos/dsh-hub](https://github.com/flairamos/dsh-hub) | 0 | 2026-11-27 | 2026-11-27 | Curated index of DeepSeek Harness (DSH) plugins that actually install — every repo is checked for a real dsh.bundle.patch and statically screened for risky install scripts. Updated weekly. |
| 115 | [fleekelon/fintax-portal](https://github.com/fleekelon/fintax-portal) | 0 | 2026-11-21 | 2026-11-27 | FINTAX Portal — dsh-fintax 离线财税工作台 × IMA 跨境财税知识库 V2.4.1 |
| 116 | [Float-dream1/dsh-sudo-mode](https://github.com/Float-dream1/dsh-sudo-mode) | 0 | 2026-10-31 | 2026-11-27 | 给 DeepSeek Harness 增加 Sudo 访问权限模式：root 命令前弹窗输入密码，支持黑名单/模型评分二次确认、终端 sudo 和 npm 安装。 |
| 117 | [fuwenbo/dsh-thinking-viz](https://github.com/fuwenbo/dsh-thinking-viz) | 0 | 2026-11-27 | 2026-11-27 | Live thinking panel for DeepSeek Harness — real reasoning text, tool activity and 14 animated skins. |
| 118 | [fyb0603-bit/dsh-oneclick-restart](https://github.com/fyb0603-bit/dsh-oneclick-restart) | 0 | 2026-11-27 | 2026-11-27 | DSH 设置页「重启」分区：检测运行中对话 + 二次确认 + 一键重启 Host / 桌面应用 |
| 119 | [gaochangsheng0828/dsh-image-canvas](https://github.com/gaochangsheng0828/dsh-image-canvas) | 0 | 2026-11-27 | 2026-11-27 | Infinite canvas for AI image work in DeepSeek Harness: text-to-image, image-to-image, upload, crop, preview and generation history. |
| 120 | [gechengli/dsh-checkpoint](https://github.com/gechengli/dsh-checkpoint) | 0 | 2026-11-27 | 2026-11-27 | 给 agent 的每一步操作自动打快照，后悔随时回滚 |
| 121 | [gechengli/dsh-pr-reviewer](https://github.com/gechengli/dsh-pr-reviewer) | 0 | 2026-11-27 | 2026-11-27 | 让 dsh 自动做 PR 第一轮代码审查 |
| 122 | [gechengli/dsh-scope-guard](https://github.com/gechengli/dsh-scope-guard) | 0 | 2026-11-27 | 2026-11-27 | Block out-of-scope coding-agent writes and restricted commands before DeepSeek Harness runs them. |
| 123 | [gitleej/dsh-sidebar-usage](https://github.com/gitleej/dsh-sidebar-usage) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness sidebar card: balance, today's token usage and spend (official usage endpoints first, local estimate as fallback). |
| 124 | [Glazyon/dsh-shuguang-pet](https://github.com/Glazyon/dsh-shuguang-pet) | 0 | 2026-11-27 | 2026-11-27 | A clickable Shuguang companion that sits in the corner of the DeepSeek Harness window. |
| 125 | [Glazyon/dsh-shuguang-skin](https://github.com/Glazyon/dsh-shuguang-skin) | 0 | 2026-11-27 | 2026-11-27 | 星源主题套装：四套日夜皮肤、开屏动画与三个交互 PET，适用于 DeepSeek Harness。 |
| 126 | [Glazyon/dsh-shuguang-star-pet](https://github.com/Glazyon/dsh-shuguang-star-pet) | 0 | 2026-11-27 | 2026-11-27 | A clickable Shuguang companion that sits in the corner of the DeepSeek Harness window. |
| 127 | [Glazyon/dsh-shuguang-wish-pet](https://github.com/Glazyon/dsh-shuguang-wish-pet) | 0 | 2026-11-27 | 2026-11-27 | A clickable Shuguang wish companion that sits in the corner of the DeepSeek Harness window. |
| 128 | [GuyeQiuchen/dsh-jiyiti-memory](https://github.com/GuyeQiuchen/dsh-jiyiti-memory) | 0 | 2026-11-20 | 2026-11-27 | DSH 的紧凑长期记忆：开机只注入一小段，细节按需检索。带家规预算、压缩后核对与主动唤醒，模块化可删。 |
| 129 | [gwtwly-coder/dsh-connect-doubao-pool](https://github.com/gwtwly-coder/dsh-connect-doubao-pool) | 0 | 2026-11-27 | 2026-11-27 | 豆包多账号 —— DSH 插件：自带 doubao-pool provider 与多账号池（扫码收纳、批量测额度、失败自动换号、一键切换） |
| 130 | [gyc0717/dafeiyu](https://github.com/gyc0717/dafeiyu) | 0 | 2026-11-27 | 2026-11-27 | 大肥鱼 · 音乐管家：绑定 QQ 音乐的 DSH agent preset |
| 131 | [Hakuno410/dsh-snip](https://github.com/Hakuno410/dsh-snip) | 0 | 2026-11-27 | 2026-11-27 | WeChat-style region screenshot for DeepSeek Harness Desktop - Alt+A, drag, and the crop lands in the composer. |
| 132 | [Hakuno410/dsh-window-pin](https://github.com/Hakuno410/dsh-window-pin) | 0 | 2026-11-27 | 2026-11-27 | Pushpin button for DeepSeek Harness Desktop that keeps the window always on top (Windows). |
| 133 | [halcyon6669/dsh-offline-market](https://github.com/halcyon6669/dsh-offline-market) | 0 | 2026-11-26 | 2026-11-27 | Offline plugin market for DeepSeek Harness: install/update from local .tgz, remember source URL, uninstall per row. |
| 134 | [HaloSunQAQ/dsh-pet-split](https://github.com/HaloSunQAQ/dsh-pet-split) | 0 | 2026-11-27 | 2026-11-27 | 小肥鱼撞墙反弹时分裂出幻影分身，静止后慢慢散去。不改动 dsh-pet 本体，桌面窗口与网页宠物都支持。 |
| 135 | [Hanice404/dsh-sidebar-selected-tint](https://github.com/Hanice404/dsh-sidebar-selected-tint) | 0 | 2026-11-27 | 2026-11-27 | DSH 插件：左侧边栏被选中的会话行，用浅红色高亮替代默认灰色。A DSH plugin that tints the selected sidebar session row light red. |
| 136 | [hellonil/dsh-inplace-edit](https://github.com/hellonil/dsh-inplace-edit) | 0 | 2026-11-26 | 2026-11-27 | Edit an earlier DSH prompt in the same session and send it again. |
| 137 | [hinanawiQ-hys/dsh-amadeus-pet](https://github.com/hinanawiQ-hys/dsh-amadeus-pet) | 0 | 2026-11-27 | 2026-11-27 | 牧濑红莉栖桌宠（dsh-amadeus-pet）：渲染在 DSH 页面内，悬停出气泡、点气泡看余额与剩余 token，全屏可见 |
| 138 | [holderlink/blue-fat-fish-toolkit](https://github.com/holderlink/blue-fat-fish-toolkit) | 0 | 2026-11-27 | 2026-11-27 | ??? DSH ????:FishClick ?????? + Video Preflight ?????? |
| 139 | [holderlink/dsh-cover-lint](https://github.com/holderlink/dsh-cover-lint) | 0 | 2026-11-27 | 2026-11-27 | Thumbnail readability check for DSH creators. |
| 140 | [holderlink/dsh-plugin-release](https://github.com/holderlink/dsh-plugin-release) | 0 | 2026-11-27 | 2026-11-27 | Bundle Doctor: preflight a DSH plugin bundle before publishing. |
| 141 | [holderlink/dsh-tutorial-check](https://github.com/holderlink/dsh-tutorial-check) | 0 | 2026-11-27 | 2026-11-27 | Persistent tutorial checklist for DSH. |
| 142 | [holderlink/dsh-video-preflight](https://github.com/holderlink/dsh-video-preflight) | 0 | 2026-11-27 | 2026-11-27 | Local Bilibili upload preflight for DSH: video, loudness, cover, title, description and tags. |
| 143 | [hosimiAKE/dsh-ssh-scper](https://github.com/hosimiAKE/dsh-ssh-scper) | 0 | 2026-11-27 | 2026-11-27 | SSH remote workspace for DeepSeek Harness: read, write, edit, grep, glob and bash run on a remote host over a saved SSH connection. |
| 144 | [Houraiji9/dsh-grok-build](https://github.com/Houraiji9/dsh-grok-build) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness plugin embedding the official local Grok Build CLI (ACP) into the native model picker with a graphical Settings console. |
| 145 | [houwudi14010/dsh-global-find](https://github.com/houwudi14010/dsh-global-find) | 0 | 2026-11-27 | 2026-11-27 | Ctrl+F find bar for the whole DSH frame |
| 146 | [HSHSir/dsh-plugins](https://github.com/HSHSir/dsh-plugins) | 0 | 2026-11-25 | 2026-11-27 | dsh插件 |
| 147 | [ht34robot-173000/dsh-ctl-desktop](https://github.com/ht34robot-173000/dsh-ctl-desktop) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness 桌面版生命周期控制：开机自启（设置里一个开关）、状态查询、优雅停止。自启指向 Electron 外壳而不是 Host 子进程，用 .lnk 快捷方式以支持中文路径。 |
| 148 | [ht34robot-173000/dsh-turn-reminder](https://github.com/ht34robot-173000/dsh-turn-reminder) | 0 | 2026-11-27 | 2026-11-27 | 会话里提问 N 次后弹窗提醒开新会话（避免上下文过长触发 429）：按会话独立计数、首问免计、计数持久化；药丸可拖动并记住位置、双击复位，确认框走 DSH 主题令牌 |
| 149 | [ht34robot-173000/dsh-win11-theme](https://github.com/ht34robot-173000/dsh-win11-theme) | 0 | 2026-11-27 | 2026-11-27 | Windows 11 (Fluent) skin for the DSH Web GUI: host-injected stylesheet on --dsw-* tokens, layout-safe. |
| 150 | [huan0111/ai-streamer-doudizhu](https://github.com/huan0111/ai-streamer-doudizhu) | 0 | 2026-11-23 | 2026-11-27 | 微信小程序斗地主的实时识别、决策、执行与 AI 主播口播事件引擎。Real-time Doudizhu gameplay and execution-aligned commentary events for AI streamers. |
| 151 | [hzzzcyn/dsh-notice-helper](https://github.com/hzzzcyn/dsh-notice-helper) | 0 | 2026-11-27 | 2026-11-27 | 给 DeepSeek Harness 桌面版补待办提醒：待确认时任务栏闪烁 + 提示音 + 右下角置顶卡片；主任务完成按 turn/end 判定成功/失败（子任务静默）。不落地 exe、不开额外端口。 |
| 152 | [itr-del/dsh-article-digest](https://github.com/itr-del/dsh-article-digest) | 0 | 2026-11-26 | 2026-11-27 | 把「发个文章链接，我按四段式读给你」做成 DSH 插件 —— 技能（主要内容 / 亮点金句 / 关键词 / 联想）+ 微信号 iLink BOT |
| 153 | [Jarvis1919/dsh-task-completion-notifier](https://github.com/Jarvis1919/dsh-task-completion-notifier) | 0 | 2026-11-27 | 2026-11-27 | Lightweight Windows desktop popups when a DeepSeek Harness turn completes, independent of notification-center banner policy. |
| 154 | [Jason-KK-kk/dsh-db-lens](https://github.com/Jason-KK-kk/dsh-db-lens) | 0 | 2026-11-26 | 2026-11-27 | 只读·限量·留痕的 DSH agent 查数窗口 |
| 155 | [jhuanxx44/dsh-voxflow](https://github.com/jhuanxx44/dsh-voxflow) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness (dsh) plugin for VoxFlow: deterministic, local-first audio/video editing via MCP |
| 156 | [jsnancy/dsh-shiliu-wechat-assistant](https://github.com/jsnancy/dsh-shiliu-wechat-assistant) | 0 | 2026-11-27 | 2026-11-27 | 十六公众号助手：学任意一篇公众号文章的版式，把内容排好存进草稿箱。 |
| 157 | [k39846336-collab/dsh-figextract](https://github.com/k39846336-collab/dsh-figextract) | 0 | 2026-11-27 | 2026-11-27 | Extract plotted values from figure images for DeepSeek Harness - axis ticks, colour series, bars and error-bar caps, with a sidebar panel. |
| 158 | [kaideng1234/dsh-speech-loop](https://github.com/kaideng1234/dsh-speech-loop) | 0 | 2026-11-27 | 2026-11-27 | Real-time voice loop for DeepSeek Harness: streaming local speech-to-text, VAD auto-send, barge-in with pre-roll, 14 Chinese edge-tts voices, unified settings panel. |
| 159 | [kormoran/dsh-additions](https://github.com/kormoran/dsh-additions) | 0 | 2026-11-12 | 2026-11-27 | Plugin for DeepSeek Harness - gives a new workspace to an old chat. Or moves an old chat to another workspace. |
| 160 | [kuanbandu/dsh-fleet](https://github.com/kuanbandu/dsh-fleet) | 0 | 2026-11-24 | 2026-11-27 | DeepSeek Harness 插件：把用户给出的一句方向拆成互不重叠的分工，派给外部执行体（CLI / MCP / REST）并行执行，看门狗管截止与接管，最后读回真实输出再综合。 |
| 161 | [KunKun24/dsh-sidebar-editor](https://github.com/KunKun24/dsh-sidebar-editor) | 0 | 2026-11-27 | 2026-11-27 | DSH 插件：把左侧栏按钮一个个藏起来，隐藏项仍留在「更多」里 \| Hide sidebar entries; hidden ones stay in the More menu. |
| 162 | [kUROITORIII/dsh-computer-use](https://github.com/kUROITORIII/dsh-computer-use) | 0 | 2026-11-27 | 2026-11-27 | Windows computer-use tools for DeepSeek Harness: UI Automation first, OCR second, screenshots last. |
| 163 | [langli137/portable-memory](https://github.com/langli137/portable-memory) | 0 | 2026-11-27 | 2026-11-27 | 适配不同的系统的外挂记忆系统（Cross-project long-term memory MCP server for DeepSeek Harness, with project isolation, sessions, and a Web UI.） |
| 164 | [ldfxsj/dsh-claim-ledger](https://github.com/ldfxsj/dsh-claim-ledger) | 0 | 2026-11-26 | 2026-11-27 | Claim ledger for DeepSeek Harness: audits the agent's completion claims against tool output and shows them as a badge. |
| 165 | [leecyno1/newma-kanban-dsh](https://github.com/leecyno1/newma-kanban-dsh) | 0 | 2026-11-27 | 2026-11-27 | newma看板：DeepSeek Harness 的五列会话与任务看板 |
| 166 | [li1378380/dsh-file-tools](https://github.com/li1378380/dsh-file-tools) | 0 | 2026-11-27 | 2026-11-27 | File toolbox for DeepSeek Harness: full-text search (file_search), disk usage report (disk_report), duplicate file finder (find_duplicates). Read-only, zero-dependency, local. |
| 167 | [LinLVEO/dsh-perf](https://github.com/LinLVEO/dsh-perf) | 0 | 2026-11-27 | 2026-11-27 | DSH 性能侦测台：进程/系统/硬件三层采样，9 个工具给 agent 直接查，零运行时依赖。 |
| 168 | [linzhong-lin/dsh-daily-schedule](https://github.com/linzhong-lin/dsh-daily-schedule) | 0 | 2026-11-27 | 2026-11-27 | 每日日程：每晚按人设和日程类型生成角色第二天的全天日程，联动生图工作室给每段配好穿搭和场景，把日期、时间、此刻在做什么、穿着什么注入对话，角色可以自己查看和临时调整。 |
| 169 | [linzhong-lin/dsh-image-studio](https://github.com/linzhong-lin/dsh-image-studio) | 0 | 2026-11-27 | 2026-11-27 | 生图工作室：本地参考库（人物 / 服饰 / 场景 / 道具）+ 智能组合参考图 + 调用生图 API，模型可自行判断何时发图；设置页里可视化管理素材库。 |
| 170 | [linzhong-lin/dsh-plugin-pack](https://github.com/linzhong-lin/dsh-plugin-pack) | 0 | 2026-11-27 | 2026-11-27 | DSH 插件合集：一条链接装齐 dsh-soul-md / dsh-context / billion-context / dsh-genui / dsh-speak-up / modlens 等（清单 + 一键安装脚本，不含插件源码） |
| 171 | [linzhong-lin/dsh-qqbot](https://github.com/linzhong-lin/dsh-qqbot) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness 的 QQ 频道插件：基于 OpenQQ（OneBot v11）的一对一/群聊桥接，自带 QQ 表情、语音合成发送、「主动搭话」计时器，以及首页侧边栏面板。 |
| 172 | [lirunhui/dsh-claude-sessions](https://github.com/lirunhui/dsh-claude-sessions) | 0 | 2026-11-27 | 2026-11-27 | 在 DSH 里浏览全部 Claude Code CLI 会话，一键回终端接着聊 |
| 173 | [LiuQhahah/dsh-approval-radar](https://github.com/LiuQhahah/dsh-approval-radar) | 0 | 2026-11-27 | 2026-11-27 | One-click jump to the DeepSeek Harness session that is waiting for your approval. |
| 174 | [LPFPP/douyin-insight-minihaha](https://github.com/LPFPP/douyin-insight-minihaha) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness 抖音洞察插件：关键词/链接取数、批量主评子评采集与 CSV 导出 |
| 175 | [LPRabdusamat/dsh-gh-downloader](https://github.com/LPRabdusamat/dsh-gh-downloader) | 0 | 2026-11-26 | 2026-11-27 | GitHub 资源加速下载管理插件 for DSH - 下载面板 + Agent 自动调用 |
| 176 | [Luys521/dsh-plugin-everything](https://github.com/Luys521/dsh-plugin-everything) | 0 | 2026-11-27 | 2026-11-27 | DSH plugin: whole-disk file search through the Everything index — millisecond filename and content lookup on Windows, no directory recursion. DSH 插件：借 Everything 全盘索引搜索本机文件，毫秒级定位，不再靠递归遍历目录。 |
| 177 | [M1nesy111/dsh-important-turns](https://github.com/M1nesy111/dsh-important-turns) | 0 | 2026-11-27 | 2026-11-27 | Mark the important turns of a DeepSeek Harness conversation: star a reply or right-click the turn rail, give each star a colour and a note, review and jump back from the right sidebar, and keep a longer coloured tick on the rail. |
| 178 | [MadeSpark/dsh-codex-preset](https://github.com/MadeSpark/dsh-codex-preset) | 0 | 2026-11-27 | 2026-11-27 | 把 Codex 的 PTC 预设接进 DSH，并修好限定作用域的 WorkBuddy 提示词兼容性。 |
| 179 | [MadeSpark/dsh-context-guardian](https://github.com/MadeSpark/dsh-context-guardian) | 0 | 2026-11-27 | 2026-11-27 | 监控每个会话的实际与预测上下文占用，越界时强制结束回合并停放会话，交给用户处理。 |
| 180 | [MadeSpark/dsh-context-preserve](https://github.com/MadeSpark/dsh-context-preserve) | 0 | 2026-11-27 | 2026-11-27 | 把被失败回合吞掉的用户指令补写回会话历史并持久化。 |
| 181 | [MadeSpark/dsh-file-menu-fast](https://github.com/MadeSpark/dsh-file-menu-fast) | 0 | 2026-11-27 | 2026-11-27 | 文件右键菜单秒开：Host 缓存文件关联查询，浏览器侧加超时兜底。 |
| 182 | [MadeSpark/dsh-mode-switch](https://github.com/MadeSpark/dsh-mode-switch) | 0 | 2026-11-27 | 2026-11-27 | 在会话状态栏直接切换标准、PTC、创造等 Agent 模式，切换前提示模型缓存会清零。 |
| 183 | [MadeSpark/dsh-subagent-model](https://github.com/MadeSpark/dsh-subagent-model) | 0 | 2026-11-27 | 2026-11-27 | 在输入框上方列出当前会话的子智能体，并显示各自实际分配到的模型与推理档位。 |
| 184 | [MadeSpark/dsh-subagent-refresh](https://github.com/MadeSpark/dsh-subagent-refresh) | 0 | 2026-11-27 | 2026-11-27 | 全局启用按最新设置选择路由的子智能体工具，并在会话标题栏显示启动快照与当前配置的差异。 |
| 185 | [MadeSpark/dsh-workbuddy-preset](https://github.com/MadeSpark/dsh-workbuddy-preset) | 0 | 2026-11-27 | 2026-11-27 | DSH 的 WorkBuddy 风格 Agent 预设：PTC 组合、全面重写的人设，以及强制的子智能体分派指南。 |
| 186 | [MadeSpark/dsh-workspace-migrate](https://github.com/MadeSpark/dsh-workspace-migrate) | 0 | 2026-11-27 | 2026-11-27 | 在工作区菜单里迁移文件夹，或只把 DSH 登记的目录改到另一个文件夹，不动文件本身。 |
| 187 | [Maj-05/dsh-workflow-studio](https://github.com/Maj-05/dsh-workflow-studio) | 0 | 2026-11-27 | 2026-11-27 | Visual DAG editor that compiles to DSH native workflow scripts. Client plugin with node editor and compiler. |
| 188 | [mantou132/dsh-plugin-agentdeck](https://github.com/mantou132/dsh-plugin-agentdeck) | 0 | 2026-11-27 | 2026-11-27 | Zero-config mobile remote control plugin for DeepSeek Harness (dsh) via AgentDeck — auto-installs ACP &amp; agentdeckd with autostart, pairing QR code, and keep-awake controls. |
| 189 | [maximwong/dsh-nprdda-pre](https://github.com/maximwong/dsh-nprdda-pre) | 0 | 2026-11-27 | 2026-11-27 | Windows NPR-DDA Pre drawing and native geometry verification for DeepSeek Harness |
| 190 | [mayufeng2595/dsh-commit-plugin](https://github.com/mayufeng2595/dsh-commit-plugin) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness 的 IDEA 风格 Git 提交面板：逐文件 diff、勾选提交、pull / push / fetch / merge / rebase、分支切换，以及带凭据校验的远程管理。 |
| 191 | [menhaiez/dsh-web-deepseek](https://github.com/menhaiez/dsh-web-deepseek) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Web in a small window above the sidebar balance: your own account, browser usage limits, no API tokens. |
| 192 | [merrily01/dsh-quotacat](https://github.com/merrily01/dsh-quotacat) | 0 | 2026-11-26 | 2026-11-27 | QuotaCat for DeepSeek Harness — LLM provider usage &amp; quota monitoring: composer-dock pill, detail dialog, threshold alerts, quota agent tool. GLM Coding Plan supported today; more providers on the way. |
| 193 | [MGHTprog/dsh-intel-mac-gpu-switch](https://github.com/MGHTprog/dsh-intel-mac-gpu-switch) | 0 | 2026-11-26 | 2026-11-27 | MIT-licensed DeepSeek Harness plugin and launcher for switchable Intel/AMD graphics on Intel Macs. |
| 194 | [mgx1995/dsh-image-switch](https://github.com/mgx1995/dsh-image-switch) | 0 | 2026-11-27 | 2026-11-27 | Switch which backend generate_image uses — local Stable Diffusion, Volcengine Ark (Doubao Seedream), AutoDL.Art, async video models such as SCNet MiniMax-H3, or any OpenAI-compatible image API — from a Settings page, with per-backend keys. |
| 195 | [miorin-chan/dsh-plugin-knobs-ui](https://github.com/miorin-chan/dsh-plugin-knobs-ui) | 0 | 2026-11-27 | 2026-11-27 | Shared React layout for fine-grained settings on DeepSeek Harness plugin detail pages. |
| 196 | [moqiaoduo/dsh-qianwen](https://github.com/moqiaoduo/dsh-qianwen) | 0 | 2026-11-25 | 2026-11-27 | 一个dsh接入千问AI平台的插件 |
| 197 | [MorrisonEX/vega-memory-architecture](https://github.com/MorrisonEX/vega-memory-architecture) | 0 | 2026-11-04 | 2026-11-27 | Cognitive architecture for LLM agents: memory as identity, not data retrieval. Four-layer lifecycle, ACT-R emotion-weighted recall, attention-based cross-session scheduling. Running in production 3+ months (Cherry Studio → DeepSeek Harness). Mechanism layer open-sourced. |
| 198 | [moyuer233/dsh-temperature-slider](https://github.com/moyuer233/dsh-temperature-slider) | 0 | 2026-11-27 | 2026-11-27 | DSH 插件：输入栏温度滑杆，经 agent/request 钩子调模型 temperature（WIP） |
| 199 | [mpppp1169-svg/dsh-ai-voice-preset](https://github.com/mpppp1169-svg/dsh-ai-voice-preset) | 0 | 2026-11-27 | 2026-11-27 | DSH plugin: insert a prepared user/assistant transcript into the open session as real history; generate a draft from a character card. |
| 200 | [msp-world/dsh-msp](https://github.com/msp-world/dsh-msp) | 0 | 2026-11-27 | 2026-11-27 | MSP node tools and A2A skills for DeepSeek Harness |
| 201 | [MuTao106/dsh-token-squeeze](https://github.com/MuTao106/dsh-token-squeeze) | 0 | 2026-11-27 | 2026-11-27 | Compress every tool result before the model reads it: strip terminal noise, fold JSON and console tables into compact records, clip oversized output to disk-backed budgets, and collapse repeated results. |
| 202 | [MUYU46548/dsh-fangcun](https://github.com/MUYU46548/dsh-fangcun) | 0 | 2026-11-03 | 2026-11-27 | 方寸（Tegula）的附属项目，专用DSH插件，适用于DeepSeek Harness。 |
| 203 | [MUYU46548/dsh-ronghuamofang](https://github.com/MUYU46548/dsh-ronghuamofang) | 0 | 2026-11-27 | 2026-11-27 | 绒花墨坊（Ronghua Mofang）附属项目，专用DSH 插件，用于连接绒花墨坊本体与DSH，深度集成DSH工作平台，提供更强大的小说创作能力。 |
| 204 | [mxchen-xyz/dsh-ym-voice-assistant](https://github.com/mxchen-xyz/dsh-ym-voice-assistant) | 0 | 2026-11-27 | 2026-11-27 | 幽梦语音助手 · DSH 双工语音通话插件：阿里 Qwen-Omni 实时语音 + 场景/提示词 + 面试模拟（读简历/JD、出评分报告） |
| 205 | [N006Unnamed/dsh-dsimport](https://github.com/N006Unnamed/dsh-dsimport) | 0 | 2026-11-27 | 2026-11-27 | Import DeepSeek web (chat.deepseek.com) conversations into DeepSeek Harness as real, resumable dsh sessions. DSH plugin. |
| 206 | [n9isw274rt/dsh-fast-file-associations](https://github.com/n9isw274rt/dsh-fast-file-associations) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness plugin: answer the Windows Open-with list from a warm helper instead of spawning PowerShell per request (~4s -&gt; ~0.02ms). |
| 207 | [nange1107/dsh-omnicat](https://github.com/nange1107/dsh-omnicat) | 0 | 2026-11-27 | 2026-11-27 | 全能猫 AI 的 DeepSeek Harness 侧边栏插件：余额/赠送金、用量、模型分时价、API Key 与一键测试。 |
| 208 | [NethielChou/dsh-turn-report](https://github.com/NethielChou/dsh-turn-report) | 0 | 2026-11-26 | 2026-11-27 | Turn-end project report for DeepSeek Harness: metrics, model/token spend, files touched, finished items, and a collapsible plan HUD. Derived from the session log; no model calls, no token cost. |
| 209 | [Nexcy789/n-chat](https://github.com/Nexcy789/n-chat) | 0 | 2026-11-27 | 2026-11-27 | DSH 上的多角色群聊框架：协调器 + 七维情绪 + 六个插件 + Android 壳 |
| 210 | [NIXOA/dsh-context-hud](https://github.com/NIXOA/dsh-context-hud) | 0 | 2026-11-27 | 2026-11-27 | Composer pill showing the running model's wallet balance, with context occupancy, TTFT/TPS and per-channel quota tabs. |
| 211 | [noahhqy-star/dsh-weread](https://github.com/noahhqy-star/dsh-weread) | 0 | 2026-11-27 | 2026-11-27 | 在 DeepSeek Harness 里打开微信读书书架、分屏阅读和按需找书。 |
| 212 | [nvqy/cache-sentinel](https://github.com/nvqy/cache-sentinel) | 0 | 2026-10-16 | 2026-11-27 | DSH host plugin that guards against uncached prompts: blocks sends (read-only) and/or archives sessions after the prompt cache likely expired. |
| 213 | [oldc12138/dsh-moyu-novel](https://github.com/oldc12138/dsh-moyu-novel) | 0 | 2026-11-27 | 2026-11-27 | A bookshelf tab for the DSH right column: a legado-style reading page (tap to page, font / line / paragraph / paper themes) whose column collapses the moment the window loses focus. Imports TXT, EPUB, HTML or the dsh-novel cache.DSH 右栏的书架标签页：照「阅读（legado）」手感做的阅读页，切换窗口就收起整个右栏；可导入 TXT / EPUB / HTML，或直接接 dsh-novel 的下载缓存。 |
| 214 | [omnijk/dsh-todolist](https://github.com/omnijk/dsh-todolist) | 0 | 2026-11-27 | 2026-11-27 | A per-workspace prompt queue for DeepSeek Harness: write the next prompts while the model works, and the first one is sent when a turn in that workspace ends. |
| 215 | [oooO0O0O0O0ooo/dsh-web-annotate](https://github.com/oooO0O0O0O0ooo/dsh-web-annotate) | 0 | 2026-11-27 | 2026-11-27 | 在 DSH 自带浏览器里批注网页元素：自动生成带红框整页截图的单文件报告，批注随会话交给 AI |
| 216 | [ouyang111/video-preview](https://github.com/ouyang111/video-preview) | 0 | 2026-11-26 | 2026-11-27 | 在 DeepSeek Harness 侧边栏直接播放 mp4、m4v、webm、ogv、mov，替代“该格式文件暂无法预览”，支持原生播放控件。 |
| 217 | [PandaBoby/dsh-liangheng](https://github.com/PandaBoby/dsh-liangheng) | 0 | 2026-11-26 | 2026-11-27 | DeepSeek Harness agent preset derived from LiangShen (梁神模式) — v0.4.21 baseline import with build tooling |
| 218 | [Parado-D/stata-copilot](https://github.com/Parado-D/stata-copilot) | 0 | 2026-11-26 | 2026-11-27 | MCP server + skill pack that turn a coding agent into a disciplined Stata analyst: structured results, command safety rails, reproducible run ledger. Zero dependencies. |
| 219 | [pidongqianqian/dsh-session-content-search](https://github.com/pidongqianqian/dsh-session-content-search) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness plugin: search earlier sessions, file names, and optionally file contents from the @ menu |
| 220 | [polchan/dsh-group-chat](https://github.com/polchan/dsh-group-chat) | 0 | 2026-11-27 | 2026-11-27 | Multi-model bot group chats for DeepSeek Harness: streaming, file tools, real DSH Agent members, and in-room execution logs. |
| 221 | [ppxCh/dsh-frontend-d2c-chain](https://github.com/ppxCh/dsh-frontend-d2c-chain) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness plugin: MasterGo design to Vue 3 through five stages — design-to-code, interactions, Swagger APIs, self-test, ZenTao bug fixes. |
| 222 | [qiancheng19494/dsh-screen-qa](https://github.com/qiancheng19494/dsh-screen-qa) | 0 | 2026-11-27 | 2026-11-27 | Screen Q&amp;A plugin for DeepSeek Harness (macOS): Apple Vision OCR + DeepSeek multi-sample voting, runs on your DSH account model |
| 223 | [QiNuoTu/pixel-creative-taste-suite](https://github.com/QiNuoTu/pixel-creative-taste-suite) | 0 | 2026-11-27 | 2026-11-27 | 六个审美技能与十二个像素展示，含可试玩游戏与中文插件 \| Six taste skills, twelve pixel showcases, a playable game and a DSH plugin. |
| 224 | [randomGGo/dsh-ai-one-person-company](https://github.com/randomGGo/dsh-ai-one-person-company) | 0 | 2026-11-22 | 2026-11-27 | AI一人公司 · DeepSeek Harness (DSH) 工作台插件，组织 Agent、任务、交付与独立复核。 |
| 225 | [raydoomed/dsh-noesia](https://github.com/raydoomed/dsh-noesia) | 0 | 2026-11-27 | 2026-11-27 | Noesia voice companion for DeepSeek Harness: Vidu component avatar + DeepSeek TTS. |
| 226 | [RedDd771212/dsh-toolbox](https://github.com/RedDd771212/dsh-toolbox) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness 面板插件：通用的工具/项目启动台，工具按分类登记、按扩展名路由、一键启动与关闭 |
| 227 | [regrevia/wiser](https://github.com/regrevia/wiser) | 0 | 2026-11-26 | 2026-11-27 | 把一条真实做过的流程沉淀成窄 skill，并用五道闸判定够不够格发布 |
| 228 | [ReinEins/dsh-approve-all](https://github.com/ReinEins/dsh-approve-all) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness plugin: a per-session "approve all" switch. 全部同意 — 单会话审批自动放行开关。 |
| 229 | [Ricardozhuyuyu/dsh-game-archive](https://github.com/Ricardozhuyuyu/dsh-game-archive) | 0 | 2026-11-27 | 2026-11-27 | 五平台（Steam/PSN/Switch/Xbox/Epic）游戏记录档案 —— DeepSeek Harness 插件 |
| 230 | [royan0596/dsh-session-context-cleaner](https://github.com/royan0596/dsh-session-context-cleaner) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness 插件：多选问答并原地清理当前会话上下文，保持同一 Session ID。 |
| 231 | [runzhi214/gui-eyes](https://github.com/runzhi214/gui-eyes) | 0 | 2026-11-26 | 2026-11-27 | 通用 web GUI 采集与验证引擎：持久鉴权会话 + 观测 + 断言，CLI 与 MCP 双通道 |
| 232 | [RUO-MO/dsh-draworld](https://github.com/RUO-MO/dsh-draworld) | 0 | 2026-11-27 | 2026-11-27 | 画界（Xenra DrawWorld）：DSH 画布插件 —— 真画布、结构化图层笔迹、32 支参数化笔刷，模型通过 paint_canvas 在同一份文档上作画 |
| 233 | [ShangyuLei-HIT/dsh-remote-ssh-plugin](https://github.com/ShangyuLei-HIT/dsh-remote-ssh-plugin) | 0 | 2026-11-27 | 2026-11-27 | SSH remote development for DeepSeek Harness — npm package dsh-remote-ssh-plugin: visual SSH machine management, remote directory browser, remote workspaces, and SSH-backed agent tools. |
| 234 | [sm0k3net/dsh-redteam](https://github.com/sm0k3net/dsh-redteam) | 0 | 2026-11-27 | 2026-11-27 | Red Team workbench for DeepSeek Harness: PTES engagement engine, live attack graph, Kali toolbox, browser and API testing, evidence vault and reporting in the native sidebar. |
| 235 | [SnowNight777/dsh-nikoapi](https://github.com/SnowNight777/dsh-nikoapi) | 0 | 2026-11-23 | 2026-11-27 | 简单快速的使用NikoAPI中转站 |
| 236 | [songhangze985-eng/dsh-health-assessment](https://github.com/songhangze985-eng/dsh-health-assessment) | 0 | 2026-11-27 | 2026-11-27 | DSH（DeepSeek Harness）插件：健康打卡、7 天确定性评分、左栏独立界面、模型工具与桌宠播报（原 health-assessment 的插件化版本） |
| 237 | [squidwantyou/dsh-brand-logo](https://github.com/squidwantyou/dsh-brand-logo) | 0 | 2026-11-27 | 2026-11-27 | Replace the DeepSeek Harness sidebar brand row with your own image or a typeset wordmark. |
| 238 | [ST0new/dsh-harness-orb](https://github.com/ST0new/dsh-harness-orb) | 0 | 2026-11-27 | 2026-11-27 | 给 DeepSeek Harness 加一道真的会喊你的提醒：回合跑完、或者 DSH 正在等你批准 / 回答时，只要窗口不在前台，就响铃并弹出系统通知。 |
| 239 | [SuYouRyo/dsh-cm-core](https://github.com/SuYouRyo/dsh-cm-core) | 0 | 2026-11-25 | 2026-11-27 | 把 companion-memory 记忆库搬进 DSH 宿主的一个插件：注入 / 摄入 / 检索 / 恢复。已定档（frozen），作者不再维护。 |
| 240 | [sweetpoints/dsh-blender-plugin](https://github.com/sweetpoints/dsh-blender-plugin) | 0 | 2026-11-27 | 2026-11-27 | Blender capability bundle for DeepSeek Harness: headless inspect/run/render tools, a Blender skill, and the plugin market index |
| 241 | [SYFabric/dsh-panel-opacity](https://github.com/SYFabric/dsh-panel-opacity) | 0 | 2026-11-27 | 2026-11-27 | 独立控制 DeepSeek Harness 聊天区 / 输入框 / 顶部栏 / 侧边栏不透明度的插件 |
| 242 | [tanson515/dsh-shared-memory](https://github.com/tanson515/dsh-shared-memory) | 0 | 2026-11-27 | 2026-11-27 | Cross-agent experience library: local multi-agent sharing or a remote team server over HTTP; kb_search / kb_get / kb_upsert tools for DeepSeek Harness |
| 243 | [theBigGavin/opc-office-view](https://github.com/theBigGavin/opc-office-view) | 0 | 2026-11-27 | 2026-11-27 | DSH (DeepSeek Harness) plugin: OPC transparent office board as a floating iframe panel |
| 244 | [thenist/dsh-wallet](https://github.com/thenist/dsh-wallet) | 0 | 2026-11-27 | 2026-11-27 | Shows the signed-in DeepSeek account balance as its own indicator beside the context-usage reading under the message composer. |
| 245 | [thenist/moeseek](https://github.com/thenist/moeseek) | 0 | 2026-11-26 | 2026-11-27 | Anime moe voice styles for the assistant in DeepSeek Harness. Pick a style and a prompt language inside the composer model menu, and the assistant keeps its technical accuracy while its chat prose turns sweet, cat-like, prickly, quiet, explosive, or doting. |
| 246 | [TigerdyXu/AgentOutpost](https://github.com/TigerdyXu/AgentOutpost) | 0 | 2026-11-27 | 2026-11-27 | 前哨 Outpost — a DeepSeek Harness desktop plugin that tracks products daily and writes you a fact-checked morning brief |
| 247 | [Tsukiiiiiovo/valo-lookup](https://github.com/Tsukiiiiiovo/valo-lookup) | 0 | 2026-11-27 | 2026-11-27 | Valorant agent-ability and map-callout lookup plugin for DeepSeek Harness |
| 248 | [tunaflsh/dsh-reply-session-references](https://github.com/tunaflsh/dsh-reply-session-references) | 0 | 2026-11-27 | 2026-11-27 | Let agents reference other sessions in DSH |
| 249 | [tunaflsh/dsh-safe-plugin-manager](https://github.com/tunaflsh/dsh-safe-plugin-manager) | 0 | 2026-11-27 | 2026-11-27 | dsh-plugin-manager wrapper to install host-changing plugins async-safe |
| 250 | [tunaflsh/dsh-subagent-archive](https://github.com/tunaflsh/dsh-subagent-archive) | 0 | 2026-11-27 | 2026-11-27 | Session manager for subagents |
| 251 | [tunaflsh/dsh-tool-gate](https://github.com/tunaflsh/dsh-tool-gate) | 0 | 2026-11-27 | 2026-11-27 | Disable or enable tools available to a DSH session at runtime. |
| 252 | [VeynAI/dsh-plugin-dshm](https://github.com/VeynAI/dsh-plugin-dshm) | 0 | 2026-10-28 | 2026-11-27 | DSHM plugin for DeepSeek Harness: pair your iPhone or iPad over LAN or your own VPN |
| 253 | [vvzula/dsh-jianyu-biaoxun-mcp](https://github.com/vvzula/dsh-jianyu-biaoxun-mcp) | 0 | 2026-11-27 | 2026-11-27 | 在 DSH 对话里直接查剑鱼标讯的招标采购信息：找项目、看预算、查采购单位。 |
| 254 | [wangzimu2007/dsh-noncoder-engineering-plugin](https://github.com/wangzimu2007/dsh-noncoder-engineering-plugin) | 0 | 2026-11-27 | 2026-11-27 | DSH Host-only plugin for noncoder-engineering: technical decisions for non-coders, non-blocking execution, goal-aware final reports. |
| 255 | [weedlu/dsh-browser-element-picker](https://github.com/weedlu/dsh-browser-element-picker) | 0 | 2026-11-27 | 2026-11-27 | DSH Desktop plugin: pick an element in the built-in browser toolbar and hand its descriptor to the agent. |
| 256 | [wind-h/dsh-reload-restart](https://github.com/wind-h/dsh-reload-restart) | 0 | 2026-11-27 | 2026-11-27 | 为 DeepSeek Harness 桌面版顶部菜单栏加「刷新 / 重启」按钮 |
| 257 | [Windsland52/dsh-fxxk-pwsh](https://github.com/Windsland52/dsh-fxxk-pwsh) | 0 | 2026-11-27 | 2026-11-27 | fxxk pwsh and sandbox |
| 258 | [wkqian06/dsh-knowledgepalace](https://github.com/wkqian06/dsh-knowledgepalace) | 0 | 2026-11-26 | 2026-11-27 | A claim-anchored academic paper library and knowledge graph for evidence-backed research and writing. |
| 259 | [WQLEON/dsh-better-plan](https://github.com/WQLEON/dsh-better-plan) | 0 | 2026-11-27 | 2026-11-27 | Two-phase grilling-then-planning agent with a right-sidebar confirmation panel for DeepSeek Harness |
| 260 | [wunengbiao/dsh-image-edit](https://github.com/wunengbiao/dsh-image-edit) | 0 | 2026-11-27 | 2026-11-27 | DSH 插件：点击输入框图片直接标注编辑（画笔/箭头/矩形/椭圆/序号/马赛克/文字），保存后替换原附件。DeepSeek Harness plugin: annotate composer image attachments before sending. |
| 261 | [wzb2015116/dsh-workspace-manager](https://github.com/wzb2015116/dsh-workspace-manager) | 0 | 2026-11-27 | 2026-11-27 | DSH 插件：为每个新会话按日期时间创建独立工作空间，resume 时恢复原目录；不删除任何文件。 |
| 262 | [xiaobu573040026/dsh-zh-thinking](https://github.com/xiaobu573040026/dsh-zh-thinking) | 0 | 2026-11-27 | 2026-11-27 | DeepSeekRuntime（DSH）模型调用层插件，强制大模型用中文思考。不靠提示词劝说：在 llm/stream 拦截每一次流式请求，扣住 reasoning 开头 64 个字符判定语种，命中英文就整次丢弃、重新采样，只把中文思考透传给界面；另附自动展开思考、思考语言面板与成本熔断。适配 DSH 0.2.2-rc.1 ~ 0.2.x（实测 0.2.2-rc.5），零第三方依赖。 |
| 263 | [XiaoHuaV587/dsh-purge-ultra](https://github.com/XiaoHuaV587/dsh-purge-ultra) | 0 | 2026-11-27 | 2026-11-27 | 本地运行时增强：提示词注入、审批与沙箱放行、资产测绘工作台（dsh-purge 加固衍生版） |
| 264 | [XiaoleC05/dsh-rd-suite](https://github.com/XiaoleC05/dsh-rd-suite) | 0 | 2026-11-26 | 2026-11-27 | DeepSeek Harness 研发套件：模式预设、卡片增强、context7、代码格式化与 GitHub Issue 流程（单包合并） |
| 265 | [xiaoyuanGP/dsh-codenow](https://github.com/xiaoyuanGP/dsh-codenow) | 0 | 2026-11-04 | 2026-11-27 | 多角色 AI 协同工作台：17 个岗位模板、群聊回放、团队任务与各 agent 用量/缓存；编排能力作为 codenow 工具交给 Lead，内置 Blender 建模技能与 MCP 桥，并支持子会话结束后自动接续主智能体。 |
| 266 | [xiaozou-second/dsh-gateway-web-search](https://github.com/xiaozou-second/dsh-gateway-web-search) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness plugin: web search that follows each conversation's model route, key and headers, with DeepSeek official-channel handling and keyless Bing fallbacks |
| 267 | [xiaozou-second/dsh-workspace-drop](https://github.com/xiaozou-second/dsh-workspace-drop) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness plugin: drag a folder onto the window, or use Open in DSH in Explorer, to add it as a workspace |
| 268 | [xin007-kong/dsh-cozy-water-cat](https://github.com/xin007-kong/dsh-cozy-water-cat) | 0 | 2026-11-27 | 2026-11-27 | A cozy storybook cat wellness buddy plugin for DeepSeek Harness — offers water, guides 20-20-20 eye breaks, stretches &amp; prints thermal wellness receipts right during AI thinking windows. |
| 269 | [xingcha-lab/dsh-market-next](https://github.com/xingcha-lab/dsh-market-next) | 0 | 2026-11-27 | 2026-11-27 | 每个插件都装过、跑过基本测试、查过没风险，还有精选榜单看大家都在用啥——看完就敢装的 DSH 插件市场。Every plugin is installed, smoke-tested, and scanned clean — plus a curated list showing what everyone else is using. The DSH plugin marketplace you'll dare to install from at first glance. |
| 270 | [xMasterSolidx/security-audit-dsh](https://github.com/xMasterSolidx/security-audit-dsh) | 0 | 2026-11-27 | 2026-11-27 | Cloudflare's security-audit skill for DeepSeek Harness: reconnaissance, coverage-led hunting, adversarial validation, and verified reporting, vendored verbatim from cloudflare/security-audit-skill. |
| 271 | [xuanli-cn/dsh-ascii-ocean](https://github.com/xuanli-cn/dsh-ascii-ocean) | 0 | 2026-11-27 | 2026-11-27 | Living ASCII ocean behind the DeepSeek Harness new-session home. |
| 272 | [Yang-wudi/dsh-video-gen](https://github.com/Yang-wudi/dsh-video-gen) | 0 | 2026-08-26 | 2026-11-27 | Bring text-to-video and image-to-video generation to DeepSeek Harness — DashScope Wanx, Volcengine/Doubao Seedance, Google Veo, OpenAI Sora &amp; compatible relays. |
| 273 | [yangdw2024/dsh-chat-find](https://github.com/yangdw2024/dsh-chat-find) | 0 | 2026-11-27 | 2026-11-27 | Non-destructive Ctrl+F conversation search plugin for DeepSeek Harness (plus userscript &amp; Chrome/Edge MV3 extension) |
| 274 | [yeisme/muweave-dsh](https://github.com/yeisme/muweave-dsh) | 0 | 2026-11-26 | 2026-11-27 | MuWeave DSH creator plugin suite — bundle CLI, host core RPC, workbench/eikona/script/drama/schedule plugins |
| 275 | [ygp987/dsh-qwen-token-plan](https://github.com/ygp987/dsh-qwen-token-plan) | 0 | 2026-11-26 | 2026-11-27 | Qianwen Token Plan model provider, quota console and usage dashboard for DeepSeek Harness |
| 276 | [yidasanqian/dsh-mac-intel-desktop](https://github.com/yidasanqian/dsh-mac-intel-desktop) | 0 | 2026-11-27 | 2026-11-27 | DSH Mac Desktop for Intel Macs (x86_64) — unofficial DeepSeek Harness (DSH) macOS desktop builds + lightweight self-updater \| DSH Mac Intel 桌面版构建与自更新器 |
| 277 | [YING1112-zm/dsh-write-tool-switch](https://github.com/YING1112-zm/dsh-write-tool-switch) | 0 | 2026-11-27 | 2026-11-27 | A DSH plugin to switch between inline and on-the-fly writing tools. |
| 278 | [yinsiyuan83/dsh-plugin-skill-library](https://github.com/yinsiyuan83/dsh-plugin-skill-library) | 0 | 2026-11-27 | 2026-11-27 | Classified Chinese skill catalogue under the composer; regenerates on change and auto-translates new skills. |
| 279 | [you-kunpeng/dsh-project-overview](https://github.com/you-kunpeng/dsh-project-overview) | 0 | 2026-11-27 | 2026-11-27 | DSH 插件：侧边栏项目资料总览，玻璃质感卡片墙 + 卡内可滚动的文件清单 |
| 280 | [youkucola/dsh-aurabot-private-notice](https://github.com/youkucola/dsh-aurabot-private-notice) | 0 | 2026-11-27 | 2026-11-27 | Aurabot 模块：主人私聊时注入通知，并附带距上次说话的间隔 |
| 281 | [YZY131425/dsh-fish-channel](https://github.com/YZY131425/dsh-fish-channel) | 0 | 2026-11-27 | 2026-11-27 | School channel plugin for DSH: bind a workspace/session and deliver school messages. |
| 282 | [Z123M/dsh-chrome-suite](https://github.com/Z123M/dsh-chrome-suite) | 0 | 2026-11-27 | 2026-11-27 | Chrome browser tools for DeepSeek Harness: page snapshots, real clicks and typing, screenshots, tab control, downloads and DevTools Console/Network, with a pause gate and configurable action allowlists. |
| 283 | [Zbcc0826/better-dsh](https://github.com/Zbcc0826/better-dsh) | 0 | 2026-11-18 | 2026-11-27 | DeepSeek Harness plugin for human-approved runtime tool repair and self-improvement. Shaped by real feedback from DeepSeek models running in DSH. |
| 284 | [Zbcc0826/dsh-llm-wiki](https://github.com/Zbcc0826/dsh-llm-wiki) | 0 | 2026-11-26 | 2026-11-27 | DeepSeek Harness plugin that keeps a persistent wiki. Writes wait for approval. 把材料维护成持续更新的知识维基，写入前征求同意。 |
| 285 | [zh666524/dsh-deskpilot](https://github.com/zh666524/dsh-deskpilot) | 0 | 2026-11-27 | 2026-11-27 | Desktop control for DeepSeek Harness: read the Windows UI tree, click controls, type Chinese where paste is blocked |
| 286 | [zhang24xiao/dsh-skin-studio](https://github.com/zhang24xiao/dsh-skin-studio) | 0 | 2026-11-27 | 2026-11-27 | Five-skin visual style studio for the DeepSeek Harness web GUI — pixel terminal, neon night, paper ink, frosted glass, moss, plus native reset. · DSH Web 视觉风格工坊 |
| 287 | [zhilincom/dsh-plugin-bulk-update](https://github.com/zhilincom/dsh-plugin-bulk-update) | 0 | 2026-11-27 | 2026-11-27 | 批量更新 DeepSeek Harness 插件的插件：一次检查并更新所有可更新的 npm / Git 插件。 |
| 288 | [zj6511235/dsh-model-usage](https://github.com/zj6511235/dsh-model-usage) | 0 | 2026-11-27 | 2026-11-27 | Live per-model token usage and provider balance for the current DeepSeek Harness session, right under the composer. |
| 289 | [ZNovaDev/dsh-plugin-updater](https://github.com/ZNovaDev/dsh-plugin-updater) | 0 | 2026-11-27 | 2026-11-27 | DeepSeek Harness plugin: one Updates tab on the Plugins page that updates every plugin at once |

## 从快照消失的已核准仓库 / Approved repositories missing from the snapshot

已核准但已不在当前快照中。同 owner 的纯改名已自动同步引用，此处多为删除/转私或同名换主——核实后从 [data/approved.json](../approved.json) 移除，或按上面的待复核节处理。

Approved but no longer present in the current snapshot. Same-owner renames were already synced automatically, so what remains is mostly deletion, privating, or a recycled slug — after checking, remove them from [data/approved.json](../approved.json) or handle them via the renames-pending-review section above.

- 1475505/dsh-plugin-miliastra-toolbox
- 1475505/miliastra-beyond-simulator
- 1804608397/dsh-plugin-browser-bridge
- 1804608397/dsh-plugin-linux-computer-use
- AliceSaikawa/cache-sentinel
- AliceSaikawa/dsh-webui-m3e
- anysda/dsh-quota
- Arrosam/dsh-fishball-bundle
- BEAVER-awa/dsh-model-source-picker
- cheetahbeatbeat/dsh-optimize
- chocobo77/adaptive-effort-scheduler
- clevebitr/dsh-base16-skins
- hyw032120/dsh-memory-space
- iMankoppai/dsh-right
- JeremyCruzFang/dsh-plugin-dshm
- jfjfgu/flow-keeper
- Leica-Shen/deepseek-harness-metre
- likaileave/dsh-session-title-tuner
- lintaojlu/dsh-inplace-edit
- MC5lan/dsh-multimodal
- MeZenith/dsh-flow
- music875/dsh-workbuddy-pulse
- mustarddaddy/dsh-serial-proto
- OldLigant/dsh-opt-legacy
- PABIPRG/investment-research-agent
- plugin-academy/dsh-plugin-academy
- Raven-Jackdaw/dsh-film-analysis
- xuedai-mayi/wenshan
- YUYUY9527/dsh-plugin-management
- zepeng-jin/dsh-completion-notifier
- zepeng-jin/dsh-particle-whale
- zriyox/dsh-goal-scaffold
- zriyox/dsh-verify-judge
