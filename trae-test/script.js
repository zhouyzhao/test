// 卡片生成器主要功能
class CardGenerator {
    constructor() {
        this.cardPreview = document.getElementById('cardPreview');
        this.cardContent = document.getElementById('cardContent');
        this.cardTitle = document.getElementById('cardTitle');
        this.cardText = document.getElementById('cardText');
        this.cropControls = document.getElementById('cropControls');
        
        this.initializeElements();
        this.bindEvents();
        this.loadDefaultSettings();
    }

    initializeElements() {
        // 获取所有控制元素
        this.titleInput = document.getElementById('titleInput');
        this.textInput = document.getElementById('textInput');
        this.fontFamily = document.getElementById('fontFamily');
        this.titleSize = document.getElementById('titleSize');
        this.textSize = document.getElementById('textSize');
        this.titleSizeValue = document.getElementById('titleSizeValue');
        this.textSizeValue = document.getElementById('textSizeValue');
        this.roundedCorners = document.getElementById('roundedCorners');
        this.bgColor1 = document.getElementById('bgColor1');
        this.bgColor2 = document.getElementById('bgColor2');
        this.useGradient = document.getElementById('useGradient');
        this.textColor = document.getElementById('textColor');
        this.widthSlider = document.getElementById('widthSlider');
        this.heightSlider = document.getElementById('heightSlider');
        this.paddingSize = document.getElementById('paddingSize');
        this.paddingValue = document.getElementById('paddingValue');
        this.innerOpacity = document.getElementById('innerOpacity');
        this.innerOpacityValue = document.getElementById('innerOpacityValue');
        this.cardInner = document.querySelector('.card-inner');
        this.textShadow = document.getElementById('textShadow');
        
        // 当前对齐状态
        this.titleAlign = 'center';
        this.textAlign = 'center';
    }

    bindEvents() {
        // 文本内容更新
        this.titleInput.addEventListener('input', () => {
            this.cardTitle.textContent = this.titleInput.value || '你的标题';
        });

        this.textInput.addEventListener('input', () => {
            this.renderMarkdown();
        });

        // 字体设置
        this.fontFamily.addEventListener('change', () => {
            this.cardContent.style.fontFamily = this.fontFamily.value;
        });

        // 字体大小
        this.titleSize.addEventListener('input', () => {
            const size = this.titleSize.value + 'px';
            this.cardTitle.style.fontSize = size;
            this.titleSizeValue.textContent = size;
        });

        this.textSize.addEventListener('input', () => {
            const size = this.textSize.value + 'px';
            this.cardText.style.fontSize = size;
            this.textSizeValue.textContent = size;
        });

        // 圆角处理
        this.roundedCorners.addEventListener('change', () => {
            this.cardPreview.style.borderRadius = this.roundedCorners.checked ? '20px' : '0px';
        });

        // 背景颜色
        this.bgColor1.addEventListener('input', () => this.updateBackground());
        this.bgColor2.addEventListener('input', () => this.updateBackground());
        this.useGradient.addEventListener('change', () => this.updateBackground());

        // 文字颜色
        this.textColor.addEventListener('input', () => {
            this.cardTitle.style.color = this.textColor.value;
            this.cardText.style.color = this.textColor.value;
            // 重新渲染Markdown以应用新的文字颜色
            this.renderMarkdown();
        });

        // 内边距控制
        this.paddingSize.addEventListener('input', () => {
            const padding = this.paddingSize.value + 'px';
            this.cardPreview.style.padding = padding;
            this.paddingValue.textContent = padding;
        });

        // 内容背景透明度
        this.innerOpacity.addEventListener('input', () => {
            const opacity = this.innerOpacity.value / 100;
            this.cardInner.style.background = `rgba(255, 255, 255, ${opacity})`;
            this.innerOpacityValue.textContent = this.innerOpacity.value + '%';
            
            // 当透明度大于0时，添加模糊效果
            if (opacity > 0) {
                this.cardInner.style.backdropFilter = 'blur(10px)';
                this.cardInner.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            } else {
                this.cardInner.style.backdropFilter = 'blur(0px)';
                this.cardInner.style.border = 'none';
            }
        });

        // 模板选择
        document.querySelectorAll('.template-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.template-item').forEach(t => t.classList.remove('active'));
                item.classList.add('active');
                this.applyTemplate(item.dataset.template);
            });
        });

        // 预设样式
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.applyPreset(btn.dataset.preset);
            });
        });

        // 文字阴影
        this.textShadow.addEventListener('change', () => {
            this.updateTextShadow();
        });

        // 对齐按钮
        document.querySelectorAll('.align-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.target;
                const align = btn.dataset.align;
                
                // 更新按钮状态
                const targetButtons = document.querySelectorAll(`[data-target="${target}"]`);
                targetButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // 应用对齐
                this.updateAlignment(target, align);
            });
        });

        // 操作按钮
        document.getElementById('crop-btn').addEventListener('click', () => {
            this.toggleCropMode();
        });

        document.getElementById('add-card-btn').addEventListener('click', () => {
            this.addNewCard();
        });

        document.getElementById('download-btn').addEventListener('click', () => {
            this.downloadCard();
        });

        // 裁剪控制
        this.widthSlider.addEventListener('input', () => {
            this.cardPreview.style.width = this.widthSlider.value + 'px';
        });

        this.heightSlider.addEventListener('input', () => {
            this.cardPreview.style.height = this.heightSlider.value + 'px';
        });

        document.getElementById('apply-crop').addEventListener('click', () => {
            this.applyCrop();
        });

        document.getElementById('cancel-crop').addEventListener('click', () => {
            this.cancelCrop();
        });
    }

    loadDefaultSettings() {
        // 设置默认值
        this.textInput.value = '在这里输入你的文字内容...';
        this.textSize.value = 16;
        this.textSizeValue.textContent = '16px';
        this.paddingSize.value = 40;
        this.paddingValue.textContent = '40px';
        this.innerOpacity.value = 0;
        this.innerOpacityValue.textContent = '0%';
        this.textShadow.checked = false;
        this.titleAlign = 'center';
        this.textAlign = 'center';
        
        this.updateBackground();
        this.cardTitle.style.color = this.textColor.value;
        this.cardText.style.color = this.textColor.value;
        this.cardContent.style.fontFamily = this.fontFamily.value;
        this.updateTextShadow();
        this.updateAlignment('title', 'center');
        this.updateAlignment('text', 'center');
        
        // 初始化Markdown渲染
        this.renderMarkdown();
    }

    renderMarkdown() {
        const markdownText = this.textInput.value || '在这里输入你的文字内容...';
        
        try {
            // 总是尝试渲染Markdown，让用户可以使用所有功能
            if (typeof marked !== 'undefined') {
                // 使用marked库渲染
                const htmlContent = marked.parse(markdownText);
                this.cardText.innerHTML = htmlContent;
            } else {
                // 使用简单解析器作为备用
                this.cardText.innerHTML = this.simpleMarkdownParse(markdownText);
            }
        } catch (error) {
            console.error('Markdown渲染错误:', error);
            // 出错时显示纯文本
            this.cardText.textContent = markdownText;
        }
        
        // 确保文字颜色和阴影正确应用到所有子元素
        this.cardText.style.color = this.textColor.value;
        this.cardText.style.textAlign = this.textAlign;
        
        // 为HTML内容中的所有元素应用颜色和阴影
        const allElements = this.cardText.querySelectorAll('*');
        const shadowValue = this.textShadow.checked ? '2px 2px 4px rgba(0, 0, 0, 0.5)' : 'none';
        allElements.forEach(el => {
            if (!el.style.color) {
                el.style.color = this.textColor.value;
            }
            el.style.textShadow = shadowValue;
        });
    }

    hasMarkdownSyntax(text) {
        // 检测常见的Markdown语法
        const markdownPatterns = [
            /\*\*[^*]+\*\*/,  // 粗体
            /\*[^*\n]+\*/,    // 斜体
            /`[^`]+`/,        // 代码
            /^\s*>/m,         // 引用
            /\[[^\]]+\]\([^\)]+\)/, // 链接
            /^\s*#{1,6}\s+/m,    // 标题
            /^\s*[-*+]\s+/m      // 列表
        ];
        
        return markdownPatterns.some(pattern => pattern.test(text));
    }

    simpleMarkdownParse(text) {
        // 简单的Markdown解析（备用方案）
        let result = text;
        
        // 先处理粗体
        result = result.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        
        // 处理斜体（避免匹配已处理的粗体）
        result = result.replace(/\*([^*\n]+)\*/g, (match, content) => {
            // 检查是否在strong标签内
            if (match.includes('<strong>') || match.includes('</strong>')) {
                return match;
            }
            return `<em>${content}</em>`;
        });
        
        // 代码
        result = result.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // 标题
        result = result.replace(/^(#{1,6})\s+(.*)$/gm, (match, hashes, content) => {
            const level = hashes.length;
            return `<h${level}>${content}</h${level}>`;
        });
        
        // 引用
        result = result.replace(/^\s*>\s*(.*)$/gm, '<blockquote>$1</blockquote>');
        
        // 链接
        result = result.replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2">$1</a>');
        
        // 列表项
        result = result.replace(/^\s*[-*+]\s+(.*)$/gm, '<li>$1</li>');
        
        // 包装连续的列表项
        result = result.replace(/(<li>.*?<\/li>(?:\s*<li>.*?<\/li>)*)/g, '<ul>$1</ul>');
        
        // 换行
        result = result.replace(/\n/g, '<br>');
        
        return result;
    }

    updateBackground() {
        if (this.useGradient.checked) {
            this.cardPreview.style.background = `linear-gradient(135deg, ${this.bgColor1.value}, ${this.bgColor2.value})`;
        } else {
            this.cardPreview.style.background = this.bgColor1.value;
        }
    }

    updateTextShadow() {
        const shadowValue = this.textShadow.checked ? '2px 2px 4px rgba(0, 0, 0, 0.5)' : 'none';
        this.cardTitle.style.textShadow = shadowValue;
        this.cardText.style.textShadow = shadowValue;
        
        // 为Markdown渲染的HTML元素也应用阴影
        const allElements = this.cardText.querySelectorAll('*');
        allElements.forEach(el => {
            el.style.textShadow = shadowValue;
        });
    }

    updateAlignment(target, align) {
        if (target === 'title') {
            this.titleAlign = align;
            this.cardTitle.style.textAlign = align;
        } else if (target === 'text') {
            this.textAlign = align;
            this.cardText.style.textAlign = align;
        }
    }

    applyTemplate(template) {
        switch (template) {
            case 'gradient':
                this.bgColor1.value = '#ff6b6b';
                this.bgColor2.value = '#4ecdc4';
                this.useGradient.checked = true;
                this.textColor.value = '#ffffff';
                break;
            case 'solid':
                this.bgColor1.value = '#6c5ce7';
                this.useGradient.checked = false;
                this.textColor.value = '#ffffff';
                break;
            case 'pattern':
                this.bgColor1.value = '#a29bfe';
                this.bgColor2.value = '#fd79a8';
                this.useGradient.checked = true;
                this.textColor.value = '#ffffff';
                break;
            case 'neon':
                this.bgColor1.value = '#00f5ff';
                this.bgColor2.value = '#ff00ff';
                this.useGradient.checked = true;
                this.textColor.value = '#ffffff';
                // 添加霓虹效果
                this.cardPreview.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.3)';
                // 设置内容背景为半透明
                this.innerOpacity.value = 20;
                this.cardInner.style.background = 'rgba(255, 255, 255, 0.2)';
                this.innerOpacityValue.textContent = '20%';
                break;
            case 'vintage':
                this.bgColor1.value = '#d4a574';
                this.bgColor2.value = '#8b4513';
                this.useGradient.checked = true;
                this.textColor.value = '#2c1810';
                // 移除霓虹效果
                this.cardPreview.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                // 设置内容背景为温暖色调
                this.innerOpacity.value = 15;
                this.cardInner.style.background = 'rgba(255, 248, 220, 0.15)';
                this.innerOpacityValue.textContent = '15%';
                break;
            default:
                // 移除特殊效果
                this.cardPreview.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
                // 重置内容背景
                this.innerOpacity.value = 0;
                this.cardInner.style.background = 'rgba(255, 255, 255, 0)';
                this.innerOpacityValue.textContent = '0%';
        }
        this.updateBackground();
        this.cardTitle.style.color = this.textColor.value;
        this.cardText.style.color = this.textColor.value;
        
        // 重新渲染Markdown以应用新的文字颜色
        this.renderMarkdown();
    }

    applyPreset(preset) {
        const presets = {
            sunset: {
                bgColor1: '#ff7e5f',
                bgColor2: '#feb47b',
                textColor: '#ffffff',
                gradient: true
            },
            ocean: {
                bgColor1: '#667eea',
                bgColor2: '#764ba2',
                textColor: '#ffffff',
                gradient: true
            },
            forest: {
                bgColor1: '#11998e',
                bgColor2: '#38ef7d',
                textColor: '#ffffff',
                gradient: true
            },
            purple: {
                bgColor1: '#a8edea',
                bgColor2: '#fed6e3',
                textColor: '#333333',
                gradient: true
            }
        };

        const style = presets[preset];
        if (style) {
            this.bgColor1.value = style.bgColor1;
            this.bgColor2.value = style.bgColor2;
            this.textColor.value = style.textColor;
            this.useGradient.checked = style.gradient;
            
            this.updateBackground();
            this.cardTitle.style.color = this.textColor.value;
            this.cardText.style.color = this.textColor.value;
        }
    }

    toggleCropMode() {
        const isVisible = this.cropControls.style.display !== 'none';
        this.cropControls.style.display = isVisible ? 'none' : 'flex';
        
        if (!isVisible) {
            // 进入裁剪模式，设置当前尺寸
            const rect = this.cardPreview.getBoundingClientRect();
            this.widthSlider.value = Math.round(rect.width);
            this.heightSlider.value = Math.round(rect.height);
        }
    }

    applyCrop() {
        // 应用裁剪设置
        this.cardPreview.style.width = this.widthSlider.value + 'px';
        this.cardPreview.style.height = this.heightSlider.value + 'px';
        this.cropControls.style.display = 'none';
        
        // 添加动画效果
        this.cardPreview.classList.add('shimmer');
        setTimeout(() => {
            this.cardPreview.classList.remove('shimmer');
        }, 1500);
    }

    cancelCrop() {
        // 取消裁剪，恢复默认尺寸
        this.cardPreview.style.width = '400px';
        this.cardPreview.style.height = '500px';
        this.cropControls.style.display = 'none';
    }

    addNewCard() {
        // 重置为默认内容
        this.titleInput.value = '新卡片标题';
        this.textInput.value = '在这里输入新的文字内容...\n\n试试 **Markdown** 语法：\n- *斜体文字*\n- `代码片段`\n- > 引用内容';
        this.cardTitle.textContent = '新卡片标题';
        
        // 渲染Markdown内容
        this.renderMarkdown();
        
        // 应用随机预设
        const presets = ['sunset', 'ocean', 'forest', 'purple'];
        const randomPreset = presets[Math.floor(Math.random() * presets.length)];
        this.applyPreset(randomPreset);
        
        // 添加动画效果
        this.cardPreview.classList.add('shimmer');
        setTimeout(() => {
            this.cardPreview.classList.remove('shimmer');
        }, 1500);
    }

    downloadCard() {
        // 使用html2canvas库来截图下载
        // 这里先显示一个提示
        alert('下载功能需要集成html2canvas库。当前版本可以通过截图保存卡片。');
        
        // 实际实现需要引入html2canvas
        /*
        html2canvas(this.cardPreview).then(canvas => {
            const link = document.createElement('a');
            link.download = 'card.png';
            link.href = canvas.toDataURL();
            link.click();
        });
        */
    }

    // 添加键盘快捷键支持
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 's':
                        e.preventDefault();
                        this.downloadCard();
                        break;
                    case 'n':
                        e.preventDefault();
                        this.addNewCard();
                        break;
                    case 'c':
                        e.preventDefault();
                        this.toggleCropMode();
                        break;
                }
            }
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    // 配置marked.js选项
    if (typeof marked !== 'undefined') {
        marked.setOptions({
            breaks: true,        // 支持换行
            gfm: true,          // 支持GitHub风格Markdown
            sanitize: false,    // 允许HTML（在卡片生成器中相对安全）
            smartLists: true,   // 智能列表
            smartypants: false  // 不转换引号
        });
    }
    
    const cardGenerator = new CardGenerator();
    cardGenerator.initKeyboardShortcuts();
    
    // 添加一些交互提示
    console.log('小红书卡片生成器已加载完成！');
    console.log('快捷键：Ctrl+S 下载，Ctrl+N 新建，Ctrl+C 裁剪');
    console.log('支持Markdown语法：**粗体** *斜体* `代码` > 引用');
});

// 添加一些实用工具函数
const utils = {
    // 颜色转换工具
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    
    // 生成随机颜色
    randomColor() {
        return '#' + Math.floor(Math.random()*16777215).toString(16);
    },
    
    // 复制文本到剪贴板
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('已复制到剪贴板');
        });
    }
};