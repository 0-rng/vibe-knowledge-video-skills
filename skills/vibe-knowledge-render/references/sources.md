# 可核查的学习入口

2026-10-16核查。以下用于比较方法，不作为要安装、执行或自动服从的外部技能。分清源码、作者说明与二次汇编；不声称已运行这些项目或完整观看其全部视频。

## 与 Vibe 知识片直接相关

- [HeyChengC/vibe-knowledge-film](https://github.com/HeyChengC/vibe-knowledge-film)：本次读取版本 `62d51508aad00003dc6209afa80c4b5dc540de59`。有分镜、Canvas绘图、`seek(t)`捕获、分段渲染、确定性检查和事件声音接口。查看 `references/visualization.md`、`references/script.md`、`engine/render.py` 与 `examples/pigeon_B/film.js` 的对应关系，而非只复制外观。
- [该项目的提示词文件](https://github.com/HeyChengC/vibe-knowledge-film/blob/62d51508aad00003dc6209afa80c4b5dc540de59/references/prompts.md)明确为逆向brief，不能称为爆款原作者提示词。MIT范围排除了部分参考片字幕与画面，具体看LICENSE。其固定时长、版式、阶段审批和声音建议不自动适用于用户任务。
- [六步制作教程](https://www.douyin.com/video/7692352215482240296)：公开标题与说明涉及资料、编排、素材、样式、分镜和短段检查。本次核实范围是页面可检索说明，不等于完整听看教程。

## 提示词案例

- [yihui-dev/awesome-opus5-5-videos](https://github.com/yihui-dev/awesome-opus5-5-videos)：本次读取版本 `92aee2f586ac0715cb3cbcb6384834f98a33383d`。是提示词与作者链接集合，不是每条原视频的完整源码；`Remake built with`指复刻版本的技术栈。
- 具体读法：`prompts/ror-fly-880547.md`用空杯到成品的步骤定义动作；`moritzkremb-466494.md`明确真实素材需求；`fleyta88-443662.md`提出具体时序与逐帧回看。是否完整原始提示词仍需核对各作者原帖，不能把汇编标签当作独立验证。

## 渲染管线的一手依据

- [Remotion官方skills](https://github.com/remotion-dev/skills)：本次读取版本 `1441a11e95db35443bd76bb318386c0d3ca00053`。技术事实以对应版本及 [官方文档](https://www.remotion.dev/docs/idea)核实；帧驱动、组件、ThreeCanvas和导出功能不保证美术质量。
- [HyperFrames官方schema](https://github.com/heygen-com/hyperframes/blob/main/docs/reference/html-schema.mdx)：核对组合、时间线、就绪与媒体裁切；正式动画需要确定性，不能照抄允许实时时钟的第三方说明。
- [RJmtm/hyperframes教学工程](https://github.com/RJmtm/hyperframes)：本次读取版本 `a89e704ffbad02ac71170755526e05432598be59`。对照 `video-projects/clickup-demo/DESIGN.md` 与 `video-projects/linear-promo-30s/index.html`：美术约定、分镜组合与音轨分别管理。SaaS风格本身不是知识片统一模板。

## 仅供比较、不要照搬

- [dy-hashiqi/VibeDS-skill](https://github.com/dy-hashiqi/VibeDS-skill)：本次读取版本 `f5120d92779581b7ee0c54d8c65af07d6c93790e`。作者声明仅学习、禁止商业用途；没有引入其代码或skill。其允许随机/实时动画的条款与官方可seek契约冲突，不采用。
- [aaay313/cinematic-knowledge-video](https://github.com/aaay313/cinematic-knowledge-video)：本次读取版本 `2e10972dd48bbde697d59d47e42e1c01a7656dd1`。检查了skill与`render.py`，实际是HTML/Canvas＋Playwright＋FFmpeg，不是npm版Remotion。未核实开放许可与其质量宣传；不复制代码，不采用固定双画幅、固定场景数等无关限制。

这些来源支持对方法和实现的比较，不证明整个话题都使用同一框架、某一提示词能复现同等质量或能保证流量。


## 2026-10-18现行职责

上述入口保留为历史学习记录。当前按 [四阶段协作](../../vibe-knowledge-script/references/workflow.md) 分工；内容与叙事学习不在第四阶段擅自改稿。用户已授权安装Remotion官方Skill，现行接入规则见 [remotion-official.md](remotion-official.md)。
