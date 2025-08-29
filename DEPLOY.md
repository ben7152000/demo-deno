# 部署指南

## 本地测试

### 1. API Key 准备

准备您的 Google Gemini API Key，将通过 URL 参数传递。

### 2. 运行项目

```bash
# 开发模式
deno task dev

# 或者直接运行
deno run --allow-net --allow-env --allow-read main.ts
```

### 3. 测试 API

访问 `http://localhost:8001` 查看健康检查

使用 curl 测试聊天 API：

```bash
curl -X POST "http://localhost:8001/api/chat?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"input": "你好，请介绍一下自己"}'
```

## 部署到 Deno Deploy

### 1. 准备 GitHub 仓库

```bash
# 初始化 Git 仓库
git init
git add .
git commit -m "Initial commit"

# 推送到 GitHub
git remote add origin https://github.com/yourusername/deno-gemini.git
git push -u origin main
```

### 2. 部署到 Deno Deploy

1. 访问 [Deno Deploy](https://deno.com/deploy)
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择您的 GitHub 仓库
5. 设置项目名称（如：`deno-gemini`）
6. 点击 "Link" 连接仓库

### 3. 部署配置

无需配置环境变量，API Key 通过 URL 参数传递。

### 4. 部署

1. 点击 "Deploy" 按钮
2. 等待部署完成
3. 复制生成的 URL（如：`https://deno-gemini-xxx.deno.dev`）

### 5. 测试部署

访问您的部署 URL，应该能看到健康检查响应。使用 API 端点进行聊天功能测试。

## 获取 Google Gemini API Key

1. 访问 [Google AI Studio](https://makersuite.google.com/app/apikey)
2. 使用 Google 账号登录
3. 点击 "Create API Key"
4. 复制生成的 API Key
5. 在环境变量中使用这个 Key

## 故障排除

### 常见问题

1. **API Key 错误**
   - 确保在 URL 参数中正确传递 `key` 参数
   - 检查 API Key 是否有效

2. **CORS 错误**
   - 代码已包含 CORS 支持，应该能正常处理跨域请求

3. **部署失败**
   - 检查 `deno.json` 配置是否正确
   - 确保所有文件都已提交到 GitHub

4. **权限错误**
   - 确保 Deno 有足够的权限（`--allow-net --allow-env`）

### 日志查看

在 Deno Deploy 控制台中可以查看实时日志，帮助调试问题。

## 性能优化

- 项目使用 Gemini 2.5 Flash 模型，响应速度快
- 已添加错误处理和重试机制
- 支持并发请求处理
