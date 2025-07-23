@echo off
echo 小红书文字卡片生成器 - 部署脚本
echo =====================================
echo.

echo 检查Node.js安装状态...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到Node.js，请先安装Node.js
    echo 下载地址: https://nodejs.org/
    pause
    exit /b 1
)

echo [成功] Node.js已安装
echo.

echo 检查Vercel CLI安装状态...
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [信息] 正在安装Vercel CLI...
    npm install -g vercel
    if %errorlevel% neq 0 (
        echo [错误] Vercel CLI安装失败
        pause
        exit /b 1
    )
    echo [成功] Vercel CLI安装完成
) else (
    echo [成功] Vercel CLI已安装
)
echo.

echo 开始部署到Vercel...
vercel --prod

if %errorlevel% equ 0 (
    echo.
    echo [成功] 部署完成！
    echo 你的网站已经上线，可以通过Vercel提供的链接访问。
) else (
    echo.
    echo [错误] 部署失败，请检查网络连接和Vercel配置。
)

echo.
echo 按任意键退出...
pause >nul