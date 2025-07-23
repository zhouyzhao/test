# 小红书文字卡片生成器

一个功能丰富的在线文字卡片生成器，支持多种模板、Markdown语法、文字样式自定义等功能。

## 功能特点

- 🎨 **多种模板**：渐变、纯色、图案、霓虹、复古等5种精美模板
- 📝 **Markdown支持**：实时渲染Markdown语法，支持粗体、斜体、代码、标题、引用、链接、列表
- 🎯 **文字样式**：字体选择、大小调整、颜色自定义、阴影效果
- 📐 **布局控制**：标题和正文独立对齐设置（居中、左对齐、右对齐）
- 🖼️ **卡片设计**：圆角处理、内边距调整、背景透明度、渐变背景
- ✂️ **裁剪功能**：支持卡片裁剪和尺寸调整
- 💾 **导出下载**：一键下载生成的卡片图片
- ⌨️ **快捷键**：Ctrl+S下载、Ctrl+N新建、Ctrl+C裁剪

## 部署方式

### 方式一：Vercel部署（推荐）

1. 安装Node.js和npm
2. 全局安装Vercel CLI：
   ```bash
   npm install -g vercel
   ```
3. 在项目目录下运行：
   ```bash
   vercel --prod
   ```
4. 按照提示完成部署

### 方式二：GitHub Pages部署

1. 将项目上传到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择主分支作为源
4. 访问生成的GitHub Pages链接

### 方式三：Netlify部署

1. 访问 [Netlify](https://netlify.com)
2. 拖拽项目文件夹到Netlify部署区域
3. 等待部署完成
4. 获取部署链接

### 方式四：本地运行

1. 在项目目录下启动HTTP服务器：
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx serve .
   ```
2. 访问 `http://localhost:8000`

## 文件结构

```
trae-test/
├── index.html      # 主页面
├── style.css       # 样式文件
├── script.js       # 交互逻辑
├── .vercel/        # Vercel配置
└── README.md       # 说明文档
```

## 使用说明

1. **选择模板**：在左侧选择喜欢的卡片模板
2. **输入内容**：在右侧文本框输入标题和正文内容
3. **调整样式**：使用右侧控制面板调整字体、颜色、对齐等
4. **预览效果**：中间区域实时预览卡片效果
5. **导出卡片**：点击下载按钮或使用Ctrl+S保存卡片

## Markdown语法示例

```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体文字**
*斜体文字*
`代码片段`

> 这是一个引用

[链接文字](https://example.com)

- 列表项1
- 列表项2
- 列表项3
```

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- Marked.js (Markdown解析)
- html2canvas (图片导出)

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 开源协议

MIT License