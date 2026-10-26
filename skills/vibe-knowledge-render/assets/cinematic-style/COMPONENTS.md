# 组件复用说明

本项目的源代码作为四个 Vibe 技能共享的 `assets/cinematic-style`。读取现行 STYLE_BIBLE 后按需复用。人物和场景按当前内容设计，组件不是强制母版。

## 环境

依赖版本见package.json：Remotion及renderer/bundler/cli均为4.0.536，React/React DOM为18.3.1，TypeScript为5.9.3。当前工作副本复用本地已安装node_modules，没有修改旧视频工程；组件压缩包不包含node_modules。

在新工程中按 package.json 安装依赖，使用 `npm run typecheck` 检查。`npm run studio` 打开交互预览；按新话题创建或复用适题 Composition。运行渲染脚本前需确认当前机器的浏览器路径。

当前FontGate加载macOS Songti SC Regular的完整字体名，等待真实字体就绪。包中不附系统字体文件。其他机器需准备契约允许且有合适许可的字体并明确配置同一字族，不静默回退。图像生成只提供无字素材，最终文字由程序绘制。

## 接口

| 组件 | 职责 | 主要参数 |
|---|---|---|
| CinematicStage | 五层统一舞台 | template A–F、accent、dust、光位、motif、layout children |
| AtmosphereBackground | 有色暗部、空间面、颗粒与暗角 | template；frame/fps自动提供微动 |
| LightField | 局部柔和体积光、聚光及微弱边光 | accent、x/y、是否窗光 |
| DustMotes | 固定种子的稀疏漂浮颗粒 | window/depth/none、数量 |
| SerifText | 真实宋体分层入场 | lines、强调、坐标、宽度、字号、开始时间与对齐 |
| ChapterNumber | 极细描边章节编号 | 字符、坐标与字号 |
| ThinLineChart | 细线增长、节点、面积及轴刻度 | 同一源数据、主/对照系列、坐标、尺寸、最大值与开始时间 |
| AbstractConcept | 受控的概念关系模型 | branch/threshold/orbit、强调、位置与展开比例 |
| ChapterTransition | 暗部、细线、编号与轻字入场 | 章节、标题、开始与时长 |
| FontGate | 字体加载与渲染捕获同步 | 包裹场景；缺少字族即报错 |

示例场景见src/Showcase.tsx。三个Composition独立注册，不拼成已完成视频；每个示例用同一系列令牌，但改变空间和构图。示例只演示组件，不是新话题的必读图片或造型模板。基础令牌复用，主体、背景与动画表达开放。

## 门槛与检查

`python3 scripts/validate-style-contract.py <当前项目计划.json>` 检查风格和场景结构；`--for-full-video` 仅保留命令兼容，不检查固定三帧批准。

同帧复渲可用于检查确定性；先比较 PNG 完全一致，若 GPU 产生微小栅格舍入差异，再记录像素误差。这项检查不能代替连续动画观看或声音验收。

同一工程已经确认的相同版本不重复询问。完整视频按已选输入与制作授权实现，不新增固定设计图片审批；本包提供可预览的短场景组件示例，没有整片导出。新工程填当前内容、事件与规格，并执行阶段独立评审；正式整片仍需用户制作授权与实际动作检查。
