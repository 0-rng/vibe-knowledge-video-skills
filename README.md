# Vibe 知识视频四阶段 Skills

一组用于制作知识短片的 Codex Skills：从有来源的内容发现，到可观察的视觉机制、事件分镜，再到有声成片。四个阶段共享 `claim_id / beat_id / event_id / concept_id` 等标识，方便核对知识依据与最终画面。

| 阶段 | Skill | 主要交付 |
| --- | --- | --- |
| 1 内容 | [`vibe-knowledge-script`](skills/vibe-knowledge-script/SKILL.md) | 研究与选题候选、知识轨和观看轨 |
| 2 视觉 | [`vibe-knowledge-visual`](skills/vibe-knowledge-visual/SKILL.md) | 可比较的视觉机制与关键状态 |
| 3 分镜 | [`vibe-knowledge-storyboard`](skills/vibe-knowledge-storyboard/SKILL.md) | 观看路径、事件分镜与验证计划 |
| 4 制作 | [`vibe-knowledge-render`](skills/vibe-knowledge-render/SKILL.md) | 连续动作检查、有声 MP4、封面和发布文案 |

## 安装

将 `skills/` 下的四个目录复制到你的 Codex Skills 目录。四个目录应保持同级，因为它们会通过相对路径共享参考文件。重启或刷新 Codex 后，可分别调用 `$vibe-knowledge-script`、`$vibe-knowledge-visual`、`$vibe-knowledge-storyboard` 和 `$vibe-knowledge-render`。

第四阶段会引用 [Remotion 官方 Skills](https://www.remotion.dev/docs/ai/skills)。使用制作阶段前，按其官方说明单独安装 `remotion-best-practices`；本仓库没有再分发该套件。制作阶段还需要适用的 Node.js、Remotion、浏览器和 FFmpeg 环境。`skills/vibe-knowledge-render/assets/cinematic-style/` 中提供一个可选的暗色风格组件示例，在该目录运行 `npm install` 和 `npm run typecheck` 可检查 TypeScript 部分。

## 使用方式

从内容阶段开始时，先给一个主题、问题或现有原稿。第一阶段提出有来源的不同方向供选择；选定后形成知识轨和观看轨。第二阶段比较视觉机制，第三阶段导演事件发生过程，第四阶段按已确认的分镜制作并检查连续动作与声音。已有稿件或只需要局部修改时，直接调用对应阶段。

默认示例使用 16:9、1920×1080、30fps 和暗色知识动画基础。每个新项目应在对话或项目文件中明确品牌、旁白、音乐、画幅、内容锁定项和可用素材；[项目偏好入口](skills/vibe-knowledge-script/references/account-profile.md)会优先读取这些信息。

## 仓库内容与来源

`SKILL.md`、`references/` 是四阶段的工作说明；`assets/` 和 `scripts/` 提供第四阶段的组件示例和校验工具。历史风格附件与关键帧仅供追溯，不是新作品的固定模板。本仓库发布的是已安装 Skills 的公开版本，去掉了个人账号设置和本机绝对路径；原始私有设置不随仓库发布。

方法调研和取舍记录在各阶段的 `references/sources.md` 与 `references/director-sources.md`。上游 MIT 声明保存在 `references/upstream-notices/`；被引用的其他项目和素材仍受各自许可约束。本仓库的 MIT 许可只适用于本仓库有权授权的原创内容。

## 许可

[MIT](LICENSE)。外部工具、参考资料、音乐和用户输入素材须分别遵循各自的使用条件。
