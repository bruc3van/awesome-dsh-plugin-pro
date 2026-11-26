# 阶段 2：分类准确率 gold-set 测量报告（2026-11-26）

状态：**测量完成，未回写任何生产数据**。本报告回答"当前分类体系有多准"，为阶段 3 全量复核提供标尺与方法论验证。

## 方法

- **Gold set**：685 个唯一仓库，分层抽样（featured 300 / presentation-reviewed 95 / 类目分层 150 / rule-multi 50 / fallback 40 / drift-30d 40 / 重标定后新核准 40 / control-single 30 / 疑似误错 11，分层互有重叠）。
- **标尺**：RUBRIC v2.2（`Temp/metadata-audit/RUBRIC-v2.2.md`）——在 v1 基础上新增 8 条边界条款，全部源自碰撞数据中的真实混淆模式；最重要的第 11 条区分"宿主界面增强"（ui-experience）与"外部 Web 内容/服务操作"（web-browser），第 12 条明确垂直领域工具（行情/外卖/天气等）归 utilities。
- **双通道独立评审**：blind 通道不给当前分类独立判断；informed 通道给当前分类但要求批判性复核。各 14 批 × 约 50 行，共 1,370 个独立裁决。
- **裁决**：两通道一致的 636 行直接成为 consensus；不一致的 49 行由第三轮独立裁决（采纳 blind 19 / informed 30）。

## 核心结果

### 1. 基线准确率：58.8%（403/685）

| 分类来源 | 准确率 | 样本 |
|---|---:|---|
| override（人工/编辑钉） | 65.3% | 139/213 |
| rule-single（单规则命中） | 56.6% | 94/166 |
| rule-multi（多规则首中） | 57.0% | 130/228 |
| fallback（无命中落 utilities） | 51.3% | 40/78 |

**重要口径说明**：58.8% 是**难度加权样本**上的准确率——gold set 刻意超采了疑难分层（multi/fallback/drift/suspect），不代表全目录估计值。对照分层 control-single（69.2%）和 featured（68.9%）更接近"普通"条目水平。全目录真实准确率估计在 65–75% 区间，但这意味着仍有 **7,000–10,000 个仓库可能分类不准**。

同时注意：测量基准是 v2.2 澄清后的边界口径，部分"错误"实为边界重定义（尤其宿主 Web UI 类）——这正是本次审计要修正的口径漂移。

### 2. 评审标尺稳定：双通道一致率 92.8%（636/685）

两个互不知情的评审通道在 10 分类任务上独立收敛到 92.8%，说明 rubric v2.2 具有可操作性，LLM 语义复核的方法论成立——阶段 3 可以用同一管线规模化。不一致的 49 行集中于真正的边界情形。

### 3. 结构性偏差：web-browser 严重超采，agents-workflows/developer-tools 被抽干

净流向（当前 → 复核共识）：

| 类目 | 当前 | 共识 | 净变化 |
|---|---:|---:|---:|
| web-browser | 80 | 38 | **-42** |
| agents-workflows | 71 | 119 | **+48** |
| developer-tools | 71 | 115 | **+44** |
| integrations-sharing | 62 | 48 | -14 |
| ui-experience | 124 | 110 | -14 |
| multi-agents | 38 | 29 | -9 |
| utilities | 88 | 81 | -7 |
| knowledge-research | 54 | 52 | -2 |
| ecosystem-resources | 34 | 30 | -4 |
| media-vision | 63 | 63 | ±0 |

头部混淆对：integrations-sharing→developer-tools（21）、web-browser→agents-workflows（14）、developer-tools→agents-workflows（12）、media-vision↔ui-experience（双向各 10）、web-browser→utilities（10）。

解读：
- **web-browser 超采主因**：(a) 宿主 Web 界面增强被误吞（边界 11 已澄清）；(b) "Web 技术形态"（用浏览器/前端实现）与"Web 内容能力"（操作外部网页）混淆；(c) 正则 `web`/`browser` 关键词过宽。按当前分布外推，全目录 2,971 个 web-browser 条目中可能有 **1,000+ 应迁出**。
- **agents-workflows/developer-tools 被抽干**：大量单 Agent 任务执行插件与开发交付物工具被上游关键词（web/ui/share）抢走。这两个类目是 market-pro 选型的高频需求区，漏召回影响直接。

### 4. 漂移与准确率的因果证据

| 分层 | 准确率 |
|---|---:|
| control-single（对照） | 69.2% |
| featured（编辑精选） | 68.9% |
| presentation-reviewed | 65.9% |
| rule-multi | 55.3% |
| post-recalibration（新核准） | 54.5% |
| fallback | 53.8% |
| **drift-30d（近 30 天描述变更）** | **43.6%** |
| suspect（疑似误错样本） | 27.3% |

- **drift-30d 是所有自然分层中准确率最低的**（43.6%）——证实阶段 1 的预测：描述漂移直接破坏分类有效性。这支撑"每日增量监控"的必要性：分类不是一次性工作，上游文案流动会持续腐蚀准确率。
- suspect 层 27.3%（11 个抽查中 8 个确认误分类）验证了人工抽查方法的探测效率。
- featured/presentation-reviewed 也只有 65–69%：编辑流程过去的分类口径与 v2.2 边界不一致，历史 override 需要按新标尺复核，不能视为金标准。

### 5.  taxonomy 完备：0 个 taxonomy-gap

1,370 个裁决中无一标记 taxonomy-gap——现有 10 类目在 v2.2 边界条款下覆盖了全部样本，**不需要新增公开分类 key**（避免了下游 schema 破坏）。

## 对阶段 3 的输入

1. **全量复核必要性确认**：以 gold 测量为准，全目录约 1/4–1/3 条目分类不可信，且偏差是结构性的（web-browser 超采、双 wf/dev 抽干），仅靠规则修补无法解决——需要全量 LLM 语义复核。
2. **方法论已验证**：rubric v2.2 + 结构化输出契约 + 批量并行子代理，92.8% 双通道一致。阶段 3 可简化为单通道 + 低置信抽检复核（双通道用于疑难层），成本减半。
3. **复核优先级**：drift/多规则/fallback 层错误率最高，但 featured/订阅的影响面最大——维持阶段 0 的 P0–P3 队列顺序。
4. **正则反掘**：consensus-final.json 的 282 个改判行是挖掘高Precision关键词的训练集；阶段 3 完成后应反向修订 `scripts/categories.mjs`（尤其收紧 web-browser 正则，增加 boundary-11 排除）。
5. **override 非金标准**：历史 override 按新标尺有 34.7% 需复核，全量复核时不应跳过 override 行。

## 产物

| 文件 | 说明 |
|---|---|
| `Temp/metadata-audit/RUBRIC-v2.2.md` | 分类标尺 v2.2（10 类目 + 18 边界条款） |
| `Temp/metadata-audit/gold/gold-set.json` | 685 行 gold 集定义与分层 |
| `Temp/metadata-audit/gold/decisions-{blind,informed}/` | 28 批 × 双通道独立裁决 |
| `Temp/metadata-audit/gold/consensus-final.json` | 最终共识（685 行，含来源/分层/路径） |
| `Temp/metadata-audit/gold/adjudication.json` | 49 行第三轮裁决及理由 |

（`Temp/` 为 gitignored；如需将 gold 共识固化为长期回归基准，建议把 `consensus-final.json` 复制到 `data/review/metadata-audit/` 入库——约 100 KB。）

## 下一步

阶段 3 全量复核设计草案：
- 输入：31,103 行全量目录，按 P0→P3 波次；
- 通道：单通道 rubric-v2.2 语义复核（成本约为 31k × ~500 token/行），对低置信（<0.7）与改判行抽 5–10% 二次复核；
- 输出契约沿用 gold 管线 + 增加 `summary_zh/keywords`（为 market-pro 规范化 selection metadata 铺路）；
- 回写门禁：仅高置信改判进 `category_overrides`，低置信进人工队列；正则修订在所有 decisions 落地后反向进行。
