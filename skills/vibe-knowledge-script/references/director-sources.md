# 导演升级来源与适用边界

本次于2026-10-17按实际commit审查README、SKILL及相关参考；以下是方法迁移和原创实现，不整体安装上游或覆盖现有流程。

- [wuwangzhang1216/DirectorSKILL](https://github.com/wuwangzhang1216/DirectorSKILL/tree/c65ae0d14457053efb1e354c7e7f7e120d97fad1)，commit `c65ae0d14457053efb1e354c7e7f7e120d97fad1`。
- [gainubi/storyboard-video-skill](https://github.com/gainubi/storyboard-video-skill/tree/d5168ca0237eff2b6cfa5f03a8e4f7488b3d62fc)，commit `d5168ca0237eff2b6cfa5f03a8e4f7488b3d62fc`。
- [LottieFiles/motion-design-skill](https://github.com/LottieFiles/motion-design-skill/tree/f9a8a041b85185ee4881b3471d3415e939aac772)，commit `f9a8a041b85185ee4881b3471d3415e939aac772`。
- [remotion-dev/skills](https://github.com/remotion-dev/skills/tree/1441a11e95db35443bd76bb318386c0d3ca00053)，commit `1441a11e95db35443bd76bb318386c0d3ca00053`。

## 实际读到与迁移

- DirectorSKILL：README、SKILL、cinematic-language、blocking-and-staging、production-workflow、shot-plan-template、qc-checklist。采用视觉主张、先beat再shot、动作起止、连续性锚点、基于结果诊断和最小有效修复。MIT；保留 upstream-notices/DirectorSKILL-MIT.txt。不移植AI视频模型提示词、导演模仿包、固定焦距/镜头数、额外审批或照搬其无文字要求。
- storyboard-video-previs：SKILL、README、shot-language、storyboard-formats。研究beat/构图/方向/终态的思考方式，自行重写程序化交接；仓库快照未提供LICENSE，也无frontmatter许可声明，因此不复制或安装其Skill、表格或代码。没有采用它默认16:9、12/16格图像生成流程。
- LottieFiles：SKILL、README、disney-principles、choreography、emotion-mapping、timing-easing-tables、quality-checklist。迁移蓄力、主次动作、随动、材质/节奏、情绪意图；MIT，保留upstream-notices/LottieFiles-MIT.txt。不机械执行UI专用的500ms/1⁄3/20元素门槛，不要求每幕必须有环境动画，不安装Lottie渲染器。
- remotion-dev/skills：README、best-practices/SKILL、render/SKILL，markup/SKILL及timing、sequencing、3d、audio、motion-blur。此快照已从旧rules结构改为多个skill；best-practices本身是路由，不提供导演审美。快照无独立LICENSE、package无license字段；因此不复制其示例代码或再分发文件到安装Skill。实现按官方API文档与本地4.0.536类型原创编写，保留原本工程依赖许可，不把Remotion软件许可等同于该仓库许可。

官方实现依据：[frame](https://www.remotion.dev/docs/use-current-frame)、[spring](https://www.remotion.dev/docs/spring)、[renderMedia](https://www.remotion.dev/docs/renderer/render-media)、[ThreeCanvas](https://www.remotion.dev/docs/three-canvas)。新上游的Interactive/Track/HtmlInCanvas建议不强推到已验证Canvas工程；API以实际本地包可用性为准。Remotion负责帧和导出，不自动评判画面。

本地新增motion-kit、Canvas readiness组件、媒体检查脚本和实战画面均为原创实现；未导入上游代码。研究快照留在升级工作目录，不将许可证不明确的仓库打包进发布Skill。


## 2026-10-18：四阶段重组与用户授权安装

上文“未安装/不复制上游”记录的是2026-10-17的方法研究，不再表示当前安装状态。用户本次明确要求加入官方Skill；已按官方 [安装入口](https://www.remotion.dev/docs/ai/skills) 从 remotion-dev/skills 的同一提交 `1441a11e95db35443bd76bb318386c0d3ca00053` 安装原样 `remotion-best-practices` 套件，其内部含创建、markup、渲染、字幕、文档等完整参考。未把官方正文改写进四个自定义Skill，也未执行上游项目代码。

现行分工为内容创作发散→视觉创意关联内容→视觉分镜导演→动画渲染、声音与成片交付。导演与知识准确性由自定义Skill负责，官方Skill作为第四阶段技术参考；本机包版本与用户约束的衔接见 [官方技能接入](../../vibe-knowledge-render/references/remotion-official.md)。安装授权不等于取得仓库内所有外部素材的使用许可；具体素材仍按原有素材约定选择。

## 2026-10-19：知识可视化与长片制作方法补强

审阅 [zhaosenlin12-creator/vibe-know--skill](https://github.com/zhaosenlin12-creator/vibe-know--skill/tree/74cd27291a1e1c1725f5c58867313d69f044cd67)，commit `74cd27291a1e1c1725f5c58867313d69f044cd67`。实际读取SKILL、visualization、layout、craft、script、worlds、visual-grammar、engine参考，渲染/声音/绘图源码及两个例子的分镜和代码；未安装、运行或验证实际成片品质。

以自己的说明和示例补入理解障碍与最小例子、表达选型、关系驱动构图与时间、对照同时可见、元素生命周期、事件与累计量以及章节/转场检查。保留已有四阶段、真实联网研究、用户选案、横屏规格、STYLE_BIBLE和Remotion管线；不搬代码、字幕、参考片画面或案例素材，不把既有的语义与确定性要求重复包装为新增能力。

未迁移按题材换B/C画风、画不出来便改确认稿、固定文字镜头比例、强制常驻“尺子”、通用亮度阈值或独立Playwright截图编码器。layout文档所称的同步读像素与多轮det检查未与所读源码对应，不能据文档假定本地已经修复。MIT另排除若干参考片内容；本次只作方法参考，未复制其代码或实质文档段落，不导入被排除素材。
