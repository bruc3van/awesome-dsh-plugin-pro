# 阶段 3 全量语义复核报告（2026-11-27）

## 规模与方法

- 全量 31,103 行目录行，625 批（50 行/批）经 LLM 单通道语义复核，标尺 RUBRIC-v2.2
- 执行方式：73 个 chunk 子代理（每块 6 批），恒定并发 4，补发式机队
- 输出契约：category / confidence / evidence / summary_zh(25-60字) / keywords(3-8) / taxonomy_gap
- 全部 625 批通过逐行契约校验入库；人工修补 9 个批次中的字段级缺陷（full_name 笔误、摘要过短）

## 质量门（写回前置证据）

| 校验 | 结果 |
|---|---|
| 与 gold consensus（685 行双通道裁决基准）整体一致率 | **92.8%**（636/685） |
| 高置信行（≥0.8）与 gold consensus 一致率 | **96.1%**（524/545） |
| taxonomy_gap | 全部为 false（10 类目完备，与 gold 结论一致） |

## 核心结果

- 改判 **11,448 / 31,103（36.8%）**
- 高置信改判（≥0.8，自动回写候选）：**6,664**
- 低置信行（<0.7，人工复核队列）：**4,450**（其中改判 2,668、未改判但存疑 1,782）
- 中间带（改判但置信 0.7-0.8，不自动回写）：**2,116**

## 净类目流动（现分类 → 复核后）

| 类目 | 净变化 |
|---|---:|
| developer-tools | **+1,714** |
| agents-workflows | **+1,496** |
| ecosystem-resources | +436 |
| multi-agents | +113 |
| media-vision | +19 |
| knowledge-research | -68 |
| integrations-sharing | -393 |
| ui-experience | -633 |
| utilities | -801 |
| web-browser | **-1,883** |

复核后分布：ui-experience 7,823 / agents-workflows 5,146 / developer-tools 4,927 / utilities 3,721 / media-vision 2,081 / knowledge-research 2,024 / integrations-sharing 1,743 / ecosystem-resources 1,607 / web-browser 1,064 / multi-agents 967。

**gold 阶段的结构性预测在全量尺度完全坐实**：web-browser 超采 64%（2,947→1,064），agents-workflows 与 developer-tools 两个 market-pro 选型高频类目被系统性抽干。分波次改判率：P0 42.5% / P1 34.0% / P2 49.1% / P3 43.7% / P4 32.6%。

## 回写候选分层（6,664 行，按原分类来源）

| 原来源 | 数量 | 说明 |
|---|---:|---|
| rule-multi | 1,935 | 多规则碰撞行，LLM 裁决 |
| rule-single | 1,896 | 单规则误判 |
| fallback | 1,332 | 无规则命中行归位 |
| **override** | **1,501** | **与现有人工/历史钉冲突——敏感类** |

## 产物位置（大体积，Temp 内）

- `Temp/metadata-audit/full-review/all-decisions.jsonl` — 全量 31,103 行复核决议（join 原分类）
- `Temp/metadata-audit/full-review/writeback-candidates.json` — 6,664 行高置信改判候选
- `Temp/metadata-audit/full-review/manual-review-queue.jsonl` — 4,450 行低置信人工队列
- `Temp/metadata-audit/full-review/selection-metadata-draft.json` — 31,103 行 summary_zh+keywords 规范化元数据草稿（market-pro sidecar 原料）

## 已知弱适配模式（评审代理反馈）

桌面/移动客户端壳（Tauri/Qt/RN 打包类）在现行 10 类目下无干净归属，多落 utilities 低置信——rubric 未将其判为 taxonomy_gap，但这是最集中的语义无家门类，下行决策可考虑在 market_exclusions/leaderboard_exclusions 既有口径下人工处理。

## 门禁待定事项

1. override 冲突的 1,501 行：整体随写回覆盖 / 单独人工复核 / 跳过不回写
2. 低置信队列 4,450 行的人工复核排期
3. selection-metadata sidecar 的定稿格式与落位（market-pro 消费约定）
