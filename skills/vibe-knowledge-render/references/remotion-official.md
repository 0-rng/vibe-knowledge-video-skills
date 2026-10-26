# Remotion 官方技能的接入边界

第四阶段实现时读取 [remotion-best-practices](../../remotion-best-practices/SKILL.md)。用户2026-10-18明确要求加入官方Skill；来源为 [remotion-dev/skills](https://github.com/remotion-dev/skills/tree/1441a11e95db35443bd76bb318386c0d3ca00053)，安装提交 `1441a11e95db35443bd76bb318386c0d3ca00053`，frontmatter版本 `4.0.536`。通过Codex的skill-installer下载，保持官方文件原样。

该路由套件内部已包含完整子模块参考，不必为了读取文档再安装十二套重复内容。按实际任务读取：

| 任务 | 官方参考 |
|---|---|
| 新工程或composition | [create](../../remotion-best-practices/remotion-create/REFERENCE.md) |
| React、动画、媒体、字体、布局与时序 | [markup](../../remotion-best-practices/remotion-markup/REFERENCE.md) |
| 视频、静帧与局部渲染 | [render](../../remotion-best-practices/remotion-render/REFERENCE.md) |
| 交互预览 | [studio](../../remotion-best-practices/remotion-studio/REFERENCE.md) |
| 字幕数据与显示 | [captions](../../remotion-best-practices/remotion-captions/REFERENCE.md) |
| 查API与对应版本文档 | [docs](../../remotion-best-practices/remotion-docs/REFERENCE.md) |

先读取所需参考再使用相关API，不把文档表述直接当成本机已具备的能力。前三阶段仅做内容、创意与文字分镜时，无须加载创建/渲染指令或启动Studio。

## 与本工作流如何协作

- **授权与交付**：官方通用路由默认先预览、用户明确要求后才导出。按本次实际请求执行：用户只讨论或改Skill时不启动制作；前三阶段仅按其范围检索与生成策划静态图，未完成用户创作选案前不进入动画制作；用户已要求按稿生成成片、交付视频或MP4时，该授权包含第四阶段的样段验证、正式渲染与交付，不另加一次导出审批。只要预览、样帧或片段则止于该范围。
- **创作决定**：官方资料指导技术，不替代正文、视觉关联、美术brief、导演分镜及其锁定项。官方默认展示样式、示例音效和通用版式不变成本片模板。
- **画面方法与时间**：Canvas/JavaScript保留为已有优先路线，按V2事件需求可选SVG、分层插画/2.5D、合格角色/道具素材、图像序列和WebGL；不能为套单一画法降级动作。Remotion统一帧、合成、声音与导出。预览与导出使用同一状态函数，不另开实时动画时钟或截图编码路线。
- **版本与API**：使用工程锁定的本地Remotion包与类型；官方提到的Interactive、Track、HtmlInCanvas或新媒体组件须确认本地可用且适合本任务。不得为了套示例升级已有工程或强改已验证的Canvas结构。
- **浏览器与依赖**：显式使用已安装Chrome路径，按 [引擎约定](engines.md) 执行；不因官方示例省略参数就自动下载浏览器。已有工程用本地CLI，新增包保持兼容版本。
- **声音与字幕**：无旁白任务不因官方voiceover章节生成TTS；字幕JSON可按技术需求在工程内部使用，不额外交给用户。音效按真实动作与材质选择，不将官方示例URL的可访问性当成合适度或授权证明。
- **验证**：Studio加载、类型检查或渲染返回成功不等于创作通过。实际画面、连续动作、声音与编码成片继续按本技能的QA检查。

安装官方技能不自动升级Remotion项目、不运行上游示例，也不新增云服务、发布或账户操作。只有实际执行了检查才记录通过；本次技能重组只验证文件、引用与阶段接口，不生成视频。
