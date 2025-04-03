# InstaChoice - 智能电子产品选择平台

InstaChoice是一个现代化的电子产品推荐系统，帮助用户基于个人偏好和需求快速找到最适合的电子产品。

## 功能特性

- 🎯 **个性化决策**: 根据用户的具体需求和偏好提供定制化产品建议
- 📱 **多类别支持**: 支持手机、笔记本电脑、鼠标、键盘、显示器等多种电子产品
- 🔄 **产品对比**: 直观比较不同产品的规格和性能差异
- 🔍 **详细信息**: 提供全面的产品规格、优缺点和用户评价
- 💡 **小白/专家模式**: 针对不同用户知识水平的交互体验

## 技术栈

- **框架**: Next.js
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion

## 快速开始

### 前提条件

- Node.js >= 16.x
- npm 或 yarn

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/yourusername/instachoice.git
cd instachoice

# 安装依赖
npm install
# 或
yarn install

# 运行开发服务器
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
InstaChoice/
├── public/            # 静态资源
├── src/               # 源代码
│   ├── components/    # 可复用组件
│   ├── pages/         # 页面路由
│   ├── styles/        # 全局样式
│   └── types/         # TypeScript类型定义
├── next.config.js     # Next.js配置
├── tsconfig.json      # TypeScript配置
└── tailwind.config.js # Tailwind CSS配置
```

## 主要页面

- **首页**: 展示所有支持的产品类别
- **决策页**: 用户输入他们的偏好和需求
- **推荐页**: 基于用户输入显示推荐产品
- **对比页**: 直观比较多个产品的差异
- **产品详情页**: 显示单个产品的完整信息

## 开发计划

- [ ] 实现用户账户系统
- [ ] 添加更多产品类别
- [ ] 集成真实产品数据API
- [ ] 改进推荐算法
- [ ] 添加多语言支持

## 贡献

欢迎贡献和改进建议！请先fork仓库并创建pull request。

## 许可

本项目采用MIT许可证。详见 [LICENSE](LICENSE) 文件。

---

*InstaChoice - 找到最适合你的电子产品。* 