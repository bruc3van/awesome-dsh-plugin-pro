# DSH 插件分类评审标尺 v2.2（2026-11-26，market-pro 选型数据核查 · 阶段 2）

> 在 2026-11-18 v1 标尺基础上扩展。v1 全文依然有效；本版新增/修订的边界条款以**加粗编号 11–18** 为准，用于解决审计中暴露的真实碰撞（最大 collision pair `ui-experience+web-browser` 2,999 行、`agents-workflows+ui-experience` 1,108 行）。

## 背景

DSH（DeepSeek Harness）是一个 AI 编程助手/Agent 平台，本目录收录它的插件。因此**所有**插件描述都可能出现 "AI"、"agent"、"助手"、"DeepSeek Harness"、"harness"、"dsh-plugin" 这类样板词——**这些词不构成任何分类依据**。判断只看插件的**核心功能**（它为用户做什么），而不是它服务于什么平台、用什么技术实现。

输入字段：`full_name`、`name`、`description`、`topics`、`stars`、`language`。三者结合判断；topics 常暴露真实功能（如 wallpaper、feishu、git）。

## 十个类目（key 必须逐字使用）

| key | 中文标签 | 收录什么 |
| --- | --- | --- |
| `ecosystem-resources` | 生态与资源 | 插件目录/榜单/awesome 列表、模板与脚手架、插件开发框架/SDK、插件注册表与体检工具、社区资源站 |
| `ui-experience` | 界面与体验 | 状态栏/侧边栏/悬浮面板、主题皮肤 CSS 字体、表情包气泡、聊天窗口布局与宽度、输入增强、应用内通知/toast、桌宠、壁纸、界面组件与交互优化 |
| `media-vision` | 设计、媒体与视觉 | 图像生成与处理、OCR/视觉识别、视频处理、语音合成 TTS/语音识别、画布/白板/设计工具、AIGC 创作、头像 |
| `web-browser` | 网页与浏览器 | 网页抓取/正文提取、浏览器自动化、网页内容摘要、URL 处理、联网搜索、新闻资讯聚合（HN/知乎热榜/微博热搜类）、启动器/spotlight |
| `integrations-sharing` | 集成与分享 | 第三方服务桥接（飞书/Lark、Telegram、QQ、微信、Discord、Slack、Notion、Zotero、GitHub 事件同步等）、消息推送到第三方渠道、远程遥控助手、分享导出、webhook |
| `knowledge-research` | 知识与研究 | 记忆库/长期记忆检索、知识库/笔记知识管理、文献/论文/学术、学习卡片/间隔重复、深度研究报告、蒸馏总结 |
| `developer-tools` | 开发者工具 | git 相关、代码审查/lint、调试器、终端/shell 增强、日志、JSON/CSV/YAML 处理、正则、编码转换、沙箱/运行时、数据库、API 调试、密钥/凭据/账号管理、代理网关 |
| `multi-agents` | 多 Agent 编排与协作 | 子代理调度（subagent）、多智能体团队/协作/编排、agent 编排队列 |
| `agents-workflows` | Agent、自动化与工作流 | 会话与上下文管理（持久化/压缩/历史检索）、提示词/人格/规则注入、工作流引擎/任务编排/自动化流水线、定时任务/计划、审批门/检查点、工具调用策略、agent 行为增强 |
| `utilities` | 实用工具与其他 | 以上都不是的通用工具：翻译、天气、汇率、记账、日历/番茄钟、文件格式转换（PDF/DOCX 解析导出）、系统信息、计算器、健康、游戏娱乐、纯样板描述（只说"一个 DSH 插件"说不出功能的） |

## 难点边界（按此裁决）

1. **用量/成本/余额**：界面化显示面板（状态栏用量条、仪表盘）→ `ui-experience`；API 密钥/账号/配额的**管理**、余额监测脚本、代理网关 → `developer-tools`。
2. **会话/上下文/压缩（session/context/compaction）**：属于 agent 机制 → `agents-workflows`；若纯粹是"导出/查看聊天记录"的工具 → `utilities`。
3. **提示词/人格/prompt 模板包** → `agents-workflows`（agent 行为的一部分）；纯文本片段管理 → `utilities`。
4. **通知**：应用内 UI 通知 → `ui-experience`；推送到飞书/Telegram/邮件等第三方渠道 → `integrations-sharing`。
5. **网页类**：凡是核心动作发生在"网页内容"上（抓、读、搜、摘要、发帖）→ `web-browser`；核心动作是"把助手接到另一个服务" → `integrations-sharing`。
6. **记忆/笔记**：助手的记忆机制、知识库问答 → `knowledge-research`；通用剪贴板/文本收藏 → `utilities`。
7. **图像/设计**：生成、编辑、识别图片 → `media-vision`；仅"导入壁纸到引擎"这类界面资产 → `ui-experience`。
8. **定时/自动化**：cron/定时任务/自动化流水线/工作流 → `agents-workflows`；单纯倒计时/番茄钟 → `utilities`。
9. **多 Agent vs 单 Agent**：明显调度多个子代理/团队协作 → `multi-agents`；单个 agent 的行为/会话/流程增强 → `agents-workflows`。
10. **两面可擦**时优先级：具体类目 > `utilities`。只有当描述确实给不出任何具体类目的核心功能时才用 `utilities`。实在五五开选更具体的一个。

### v2.2 新增条款

11. **宿主界面 vs 外部网页（最大碰撞源，务必先判）**：插件增强的对象是 **DSH 宿主自身的界面**——哪怕宿主恰好是 web 技术（"DSH Web"、"网页版界面"、"web GUI"）、用了 Electron/WebGL——只要功能是给宿主加皮肤/桌宠/面板/通知中心/布局/重启按钮，一律 → `ui-experience`，**"web" 字样在此只是宿主形态，不是 web-browser 证据**。`web-browser` 只收核心动作作用于**外部网页/外部网站**的插件（抓取、阅读、搜索、摘要、归档、自动化浏览器操作外部站点）。
12. **垂直领域数据工具**：天气/汇率/记账/外卖/旅行/行情/快递等**垂直领域**工具 → `utilities`（与 v1 天气/汇率一致）。哪怕数据来自外部 API（股票行情、同花顺、淘宝外卖），也不进 integrations-sharing——除非其核心是把数据**推送/桥接到第三方消息渠道**。`web-browser` 只收通用网页能力与资讯热榜聚合，不收垂直行业工具。
13. **办公文档与设计交付物**：视觉设计交付为核心（海报、宣传图、PPT 视觉稿、网页/App 原型视觉、信息图、动画）→ `media-vision`；文档解析/格式转换/写作润色/办公效率（PDF 解析、DOCX 导出、会议纪要文本）→ `utilities`。一条龙但交付物是"能看的稿子"的（如设计 agent），按交付物归 `media-vision`。
14. **IM/邮件/远程桥接**：即时通讯与邮件双向桥（QQ/微信/飞书/Telegram/邮件收发）、手机/移动端配套、远程桌面/远程控制另一客户端 → `integrations-sharing`（把助手接到另一块屏/另一个服务），即使其实现内部用了自动化或 agent 机制。
15. **桌面/系统级 GUI 自动化**：computer-use、鼠标键盘级操作系统/桌面应用控制 → `agents-workflows`（agent 能力的自动化延伸）；**浏览器内**的网页自动化仍归 `web-browser`；系统清理/系统监控/硬件信息/开机管理 → `utilities`。
16. **MCP/协议形态不构成依据**：MCP server、skill、subagent 只是**实现形态**。按其连接的终端服务归类：飞书 MCP → `integrations-sharing`；数据库/运维 MCP → `developer-tools`；网页 MCP → `web-browser`。纯协议网关/模型路由/凭据代理/密钥管理 → `developer-tools`。
17. **桌宠 vs 游戏**：桌宠（陪伴、装饰、状态显示、余额播报）→ `ui-experience`；有完整玩法循环的游戏（养成进度、关卡、胜负）→ `utilities`。
18. **插件合集仓**：monorepo 装多个独立插件的仓库，按其主要/招牌功能归类；确实无主导功能的纯集合 → `ecosystem-resources`。

## 输出契约

写入指定 JSON 文件，结构严格为：

```json
{"decisions": [{"full_name": "owner/repo", "category": "ui-experience", "confidence": 0.85, "evidence": "一句话说明核心功能依据", "taxonomy_gap": false}, ...]}
```

- 每个输入条目**必须**恰好有一条输出（full_name 逐字一致）
- `category` 只能是上表 10 个 key 之一
- `confidence`：0–1，主观置信度，诚实给——低置信不是错误，是重要信号
- `evidence`：不超过 40 字的中文短语，说明判断抓住的核心功能
- `taxonomy_gap`：仅当 10 个类目都明显不合适时置 true（此时仍必须选最接近的一个）；绝大多数行应为 false
- 合法 JSON：UTF-8、无注释、无尾逗号
- 除该输出文件外不得改动任何文件
