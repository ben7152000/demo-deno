# Deno Gemini API 服务

这是一个基于 Deno 和 Google Gemini API 的纯 API 服务。

## 功能特性

- 使用 Google Gemini 2.5 Flash 模型
- 简洁的 REST API 接口
- 支持 Deno Deploy 部署
- 无 UI 依赖，专注于 API 服务

## 本地开发

### 前置要求

- 安装 [Deno](https://deno.land/)
- 获取 Google Gemini API Key

### API Key 使用

API Key 通过 URL 参数传递，无需设置环境变量。

### 运行项目

```bash
# 开发模式（自动重启）
deno task dev

# 生产模式
deno task start

# 或者直接运行
deno run --allow-net --allow-env main.ts
```

服务器将在 `http://localhost:8001` 启动

## API 使用

### 聊天接口

**POST** `/api/chat?key=YOUR_API_KEY`

请求体：
```json
{
  "input": "你好，请介绍一下自己"
}
```

响应：
```json
{
  "text": "你好！我是 Gemini，一个由 Google 开发的大型语言模型..."
}
```

## 部署到 Deno Deploy

1. 将代码推送到 GitHub 仓库
2. 访问 [Deno Deploy](https://deno.com/deploy)
3. 连接 GitHub 仓库
4. 设置环境变量 `GEMINI_API_KEY`
5. 部署项目

### API Key 配置

API Key 通过 URL 参数传递，无需在 Deno Deploy 中设置环境变量。

## 项目结构

```
deno-gemini/
├── main.ts          # 主服务器文件
├── deno.json        # Deno 配置文件
├── README.md        # 项目说明
├── DEPLOY.md        # 部署指南
└── .gitignore       # Git 忽略文件
```

## 许可证

MIT
