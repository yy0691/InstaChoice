# InstaChoice - 智能电子产品选择平台

## 项目概述

InstaChoice是一个基于用户决策因素的电子产品推荐网站，旨在帮助用户根据个人需求快速选择适合的电子产品。网站提供小白模式和专业模式两种界面，适应不同用户群体的需求。

### 核心功能

- 产品类型选择（手机、笔记本电脑、鼠标、键盘、显示器）
- 双模式界面（小白模式/专业模式）
- 基于多因素决策的产品推荐系统
- 推荐产品展示与对比功能
- 产品筛选与排序
- 产品详情页面
- 评论与评分系统
- 动态推荐更新机制

### 设计风格

苹果简约风格，注重UI设计的高级感，交互过渡自然流畅，包含适度的交互动画与CSS动效。

## 目录结构

```
InstaChoice/
├── doc/                  # 项目文档
│   ├── README.md         # 项目概述文档
│   ├── DEV_PROGRESS.md   # 开发进度文档
│   ├── API_DOC.md        # API文档
│   └── DATA_DICT.md      # 数据字典文档
├── public/               # 静态资源
├── src/                  # 源代码
│   ├── components/       # 组件目录
│   ├── pages/            # 页面目录
│   ├── styles/           # 样式文件
│   ├── utils/            # 工具函数
│   ├── hooks/            # 自定义钩子
│   ├── api/              # API相关
│   ├── store/            # 状态管理
│   └── types/            # 类型定义
├── .env                  # 环境变量
├── .gitignore            # Git忽略文件
├── package.json          # 项目依赖
├── tsconfig.json         # TypeScript配置
└── next.config.js        # Next.js配置
```

## 技术选型

### 前端技术栈

- **框架**: React.js + Next.js（SSR支持）
- **UI库**: Tailwind CSS + 自定义组件
- **状态管理**: Redux或Context API
- **动画**: Framer Motion
- **图表**: Chart.js或D3.js（雷达图、对比图表等）

### 后端技术栈

- **服务器**: Node.js + Express
- **数据库**: MongoDB（产品数据）+ PostgreSQL（用户数据）
- **API**: RESTful API设计
- **认证**: JWT（用户系统）

### 部署

- **服务器**: AWS或阿里云
- **CDN**: Cloudflare（静态资源）
- **CI/CD**: GitHub Actions

## 启动命令

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 生产环境

```bash
# 构建应用
npm run build

# 启动生产服务器
npm start
```

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 团队协作

- 使用Git进行版本控制
- 遵循[约定式提交](https://www.conventionalcommits.org/zh-hans/v1.0.0/)规范
- 使用分支策略：feature/fix/docs/refactor

## 项目联系人

待定 