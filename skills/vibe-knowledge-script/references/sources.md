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

## 2026-10-17：用户指定的短视频脚本技能整合

以下版本由 GitHub API 核对默认分支提交，并读取该提交下列出的文件；没有安装这些外部技能、执行仓库代码、验证其营销数据或改变当前视频渲染技能。本文与 [开头与叙事推进](hooks-and-retention.md) 为方法取舍后的中文适配，不是逐段翻译或整包复制。

### Vyral：开头与推进

- 项目：[vyralcontent/content-skills](https://github.com/vyralcontent/content-skills)，核对提交 `349e495d97029a3e6303a7510e3f39c73f36d8fe`。
- 实际读取：[viral-short-form/SKILL.md](https://github.com/vyralcontent/content-skills/blob/349e495d97029a3e6303a7510e3f39c73f36d8fe/skills/viral-short-form/SKILL.md)、[retention.md](https://github.com/vyralcontent/content-skills/blob/349e495d97029a3e6303a7510e3f39c73f36d8fe/skills/viral-short-form/references/retention.md)、[viral-hooks/SKILL.md](https://github.com/vyralcontent/content-skills/blob/349e495d97029a3e6303a7510e3f39c73f36d8fe/skills/viral-hooks/SKILL.md)、[three-layer-hook.md](https://github.com/vyralcontent/content-skills/blob/349e495d97029a3e6303a7510e3f39c73f36d8fe/skills/viral-hooks/references/three-layer-hook.md)。仓库与技能标注 MIT。
- 吸收：从不同角度设计开头；画面与字幕围绕同一问题；中段增加因果和发现；定位开头不清、过程不推进、答案埋得过晚；结尾兑现承诺。
- 适配：无旁白时不强补口播；先提供有用发现，再解释机制。按用户任务决定候选数量，保留必要阅读时间，不照搬定时切镜或硬切音尾。
- 不引入：产品推广指令、商业服务依赖、效果保证、未经独立验证的平台权重与营销规模。开头方法可用于抖音，TikTok 的平台说法不能直接视为抖音规范。

### ItsRealAJ：分清写稿、编辑与诊断

- 项目：[ItsRealAJ/Viral-Short-Form-Script-Skill](https://github.com/ItsRealAJ/Viral-Short-Form-Script-Skill)，核对提交 `706f40371910d6d76063e76652ff6deeab2d8ce0`。
- 实际读取：[SKILL.md](https://github.com/ItsRealAJ/Viral-Short-Form-Script-Skill/blob/706f40371910d6d76063e76652ff6deeab2d8ce0/SKILL.md)、[micro-details.md](https://github.com/ItsRealAJ/Viral-Short-Form-Script-Skill/blob/706f40371910d6d76063e76652ff6deeab2d8ce0/references/micro-details.md)、[script-anatomy.md](https://github.com/ItsRealAJ/Viral-Short-Form-Script-Skill/blob/706f40371910d6d76063e76652ff6deeab2d8ce0/references/script-anatomy.md)。GitHub 仓库元数据未检出明确许可证；未安装或复制其技能正文。
- 吸收：区分从零写、保留结构的编辑与具体诊断；逐句找空话、抽象表达、重复情绪和节奏单一的问题；必要时展示少量修改前后对照。
- 适配：自然语言检查同时服务中文阅读，不只检查口播。共情有其叙事作用，但不能替代解释；候选、诊断标签和过程说明按需要展示，不占据正文。
- 不引入：强制十种固定模板、无条件删除概率限定、虚构第一人称经历、把所有答案延迟到固定百分比，以及把其心理学或算法解释直接作为已验证事实。原稿锁定内容优先。

### social-media-skills：WATCH 的无旁白改写

- 项目：[social-media-skills/skills 的 short-form-video-script](https://github.com/social-media-skills/skills/tree/f28cef2b7067ec64e79c9d85421c022c06659e03/skills/short-form-video-script)，核对提交 `f28cef2b7067ec64e79c9d85421c022c06659e03`。
- 实际读取：[SKILL.md](https://github.com/social-media-skills/skills/blob/f28cef2b7067ec64e79c9d85421c022c06659e03/skills/short-form-video-script/SKILL.md)、[the-watch-framework.md](https://github.com/social-media-skills/skills/blob/f28cef2b7067ec64e79c9d85421c022c06659e03/skills/short-form-video-script/references/the-watch-framework.md)。仓库许可元数据为 MIT。
- 吸收：重视开头的可见问题、贯穿全片的推进、静音也能理解、承诺被兑现，以及适合时自然回收开头。这五项可作内部检查，不要求按英文字母给用户排稿。
- 适配（现行V2）：事件视觉与必要文字共同承担观看轨，完整正文保留知识轨，声音反馈可见动作；结尾可有回环，也可完整收束。时长、阅读量、切镜频率和互动形式服从本片。
- 不引入：固定15–35秒成片、英文词数换算、强制互动或循环、WoopSocial 发布及其他未安装技能依赖。其静音观看比例、提升倍数、算法阈值和平台对比数值未经本次独立验证，不写成事实或制作硬指标。

### 整合后的边界

2026-10-18按用户四阶段方案更新：原四阶段现于2026-10-20按用户V2要求升级：第一阶段交知识轨/观看轨及事件链，第二阶段比较机制与核心三状态，第三阶段导演事件并做无字幕设计测试，第四阶段按动作选择画面技术、统一Remotion导出并验收真实连续过程，见 [现行事件契约](visual-events.md)。事实核对、用户立意、已确认顺序与引文位置优先；第一阶段不生成媒体；第二、三阶段可生成静态概念/分镜图帮助用户选择，不生成视频或音频，不新增营销服务或发布动作。
