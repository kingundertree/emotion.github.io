#!/bin/bash

echo "🔍 执行代码提交前检查..."

# 1. 检查 JavaScript 语法
echo ""
echo "1️⃣ 检查 JavaScript 语法..."
js_files=$(find . -name "*.js" -type f -not -path "./node_modules/*" 2>/dev/null)
js_error=0

for file in $js_files; do
    node --check "$file" 2>&1
    if [ $? -ne 0 ]; then
        echo "❌ 语法错误: $file"
        js_error=1
    fi
done

if [ $js_error -eq 0 ]; then
    echo "✅ JavaScript 语法检查通过"
else
    echo "❌ JavaScript 语法检查失败"
    exit 1
fi

# 2. 检查 HTML 标签匹配
echo ""
echo "2️⃣ 检查 HTML 标签..."
if [ -f "index.html" ]; then
    open_tags=$(grep -c "<script" index.html)
    close_tags=$(grep -c "</script>" index.html)
    
    if [ "$open_tags" -ne "$close_tags" ]; then
        echo "❌ HTML 标签不匹配: <script> $open_tags vs </script> $close_tags"
        exit 1
    fi
    echo "✅ HTML 标签检查通过"
fi

# 3. 检查关键文件
echo ""
echo "3️⃣ 检查关键文件..."
if [ -f "data.js" ]; then
    echo "✅ data.js 存在"
else
    echo "❌ data.js 不存在"
    exit 1
fi

if [ -f "app.js" ]; then
    echo "✅ app.js 存在"
else
    echo "❌ app.js 不存在"
    exit 1
fi

# 4. 启动本地服务器测试
echo ""
echo "4️⃣ 启动本地服务器测试..."
python3 -m http.server 8000 --bind 127.0.0.1 > /dev/null 2>&1 &
SERVER_PID=$!
sleep 2

# 测试页面是否可访问
if curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8000/ | grep -q "200"; then
    echo "✅ 本地服务器启动成功，页面可访问"
    kill $SERVER_PID 2>/dev/null
else
    echo "❌ 页面无法访问"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

echo ""
echo "✅ 所有检查通过！可以提交代码了。"
echo ""
