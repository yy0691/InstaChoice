# InstaChoice - 数据字典

本文档记录了InstaChoice项目的数据库表结构和字段说明，为开发人员提供数据模型参考。

## 数据库架构

项目使用双数据库架构：
- **MongoDB**: 用于存储产品相关数据
- **PostgreSQL**: 用于存储用户相关数据

## 产品数据模型 (MongoDB)

### 1. 产品类型集合 (product_types)

存储所有产品类型信息。

| 字段 | 类型 | 描述 | 示例 |
|-----|-----|------|-----|
| `_id` | ObjectId | 唯一标识符 | `5f8a7b2e9d3e2a1b4c6d8e7f` |
| `id` | String | 产品类型ID | `"mobile"` |
| `name` | String | 产品类型名称 | `"手机"` |
| `description` | String | 产品类型描述 | `"手机产品分类"` |
| `icon` | String | 产品类型图标URL | `"mobile-icon.svg"` |
| `decisionFactors` | Array | 决策因素列表 | `[{"id": "budget", "name": "预算"}, ...]` |
| `createdAt` | Date | 创建时间 | `2025-03-01T08:00:00Z` |
| `updatedAt` | Date | 更新时间 | `2025-03-01T08:00:00Z` |

### 2. 手机产品集合 (mobile_products)

存储所有手机产品信息。

| 字段 | 类型 | 描述 | 示例 |
|-----|-----|------|-----|
| `_id` | ObjectId | 唯一标识符 | `5f8a7b2e9d3e2a1b4c6d8e7f` |
| `id` | String | 产品ID | `"m001"` |
| `name` | String | 产品名称 | `"iPhone 15 Pro"` |
| `brand` | String | 品牌 | `"Apple"` |
| `price` | Number | 价格（元） | `8999` |
| `releaseDate` | Date | 发布日期 | `2023-09-22T00:00:00Z` |
| `thumbnail` | String | 缩略图URL | `"iphone15-pro.jpg"` |
| `images` | Array | 产品图片URL列表 | `["iphone15-pro-1.jpg", "iphone15-pro-2.jpg"]` |
| `specs` | Object | 技术规格 | 见子表 |
| `ratings` | Object | 评分数据 | 见子表 |
| `pros` | Array | 优点列表 | `["卓越的性能", "优秀的相机系统"]` |
| `cons` | Array | 缺点列表 | `["价格较高", "充电速度一般"]` |
| `externalReviews` | Array | 外部评测链接 | 见子表 |
| `createdAt` | Date | 创建时间 | `2025-03-01T08:00:00Z` |
| `updatedAt` | Date | 更新时间 | `2025-03-01T08:00:00Z` |

#### 手机技术规格子表 (specs)

| 字段 | 类型 | 描述 | 示例 |
|-----|-----|------|-----|
| `os` | String | 操作系统 | `"iOS 17"` |
| `processor` | String | 处理器 | `"A17 Pro"` |
| `ram` | Number | 内存容量(GB) | `8` |
| `storage` | Number | 存储容量(GB) | `256` |
| `displaySize` | Number | 屏幕尺寸(英寸) | `6.1` |
| `resolution` | String | 分辨率 | `"2556 × 1179"` |
| `battery` | Number | 电池容量(mAh) | `3274` |
| `camera` | Object | 相机信息 | `{"main": "48MP", "selfie": "12MP", "features": ["夜景模式", "电影模式"]}` |
| `connectivity` | Array | 连接性 | `["5G", "Wi-Fi 6E", "Bluetooth 5.3", "NFC"]` |
| `dimensions` | Object | 尺寸 | `{"height": 146.7, "width": 71.5, "thickness": 7.8, "weight": 187}` |
| `additionalFeatures` | Array | 额外功能 | `["Face ID", "IP68防水", "MagSafe"]` |

#### 手机评分数据子表 (ratings)

| 字段 | 类型 | 描述 | 示例 |
|-----|-----|------|-----|
| `overall` | Number | 总体评分(0-100) | `92` |
| `performance` | Number | 性能评分(0-100) | `95` |
| `display` | Number | 显示屏评分(0-100) | `94` |
| `camera` | Number | 相机评分(0-100) | `92` |
| `battery` | Number | 电池评分(0-100) | `85` |
| `design` | Number | 设计评分(0-100) | `96` |
| `valueForMoney` | Number | 性价比评分(0-100) | `80` |
| `expertRating` | Number | 专家评分(0-100) | `90` |
| `userRating` | Object | 用户评分 | `{"average": 4.8, "count": 1256}` |

#### 外部评测子表 (externalReviews)

| 字段 | 类型 | 描述 | 示例 |
|-----|-----|------|-----|
| `platform` | String | 平台 | `"bilibili"` |
| `title` | String | 评测标题 | `"iPhone 15 Pro深度评测"` |
| `url` | String | 评测链接 | `"https://www.bilibili.com/video/xxxxx"` |
| `rating` | Number | 评分(如有) | `4.7` |

### 3. 电脑产品集合 (computer_products)

存储所有电脑产品信息。

| 字段 | 类型 | 描述 | 示例 |
|-----|-----|------|-----|
| `_id` | ObjectId | 唯一标识符 | `5f8a7b2e9d3e2a1b4c6d8e7f` |
| `id` | String | 产品ID | `"c001"` |
| `name` | String | 产品名称 | `"MacBook Pro 14"` |
| `brand` | String | 品牌 | `"Apple"` |
| `price` | Number | 价格（元） | `14999` |
| `releaseDate` | Date | 发布日期 | `2023-11-07T00:00:00Z` |
| `thumbnail` | String | 缩略图URL | `"macbook-pro-14.jpg"` |
| `images` | Array | 产品图片URL列表 | `["macbook-pro-14-1.jpg", "macbook-pro-14-2.jpg"]` |
| `specs` | Object | 技术规格 | 见子表 |
| `ratings` | Object | 评分数据 | 见子表 |
| `pros` | Array | 优点列表 | `["出色的性能", "高品质屏幕"]` |
| `cons` | Array | 缺点列表 | `["价格高", "端口有限"]` |
| `externalReviews` | Array | 外部评测链接 | 见子表 |
| `createdAt` | Date | 创建时间 | `2025-03-01T08:00:00Z` |
| `updatedAt` | Date | 更新时间 | `2025-03-01T08:00:00Z` |

#### 电脑技术规格子表 (specs)

| 字段 | 类型 | 描述 | 示例 |
|-----|-----|------|-----|
| `os` | String | 操作系统 | `"macOS Sonoma"` |
| `processor` | String | 处理器 | `"Apple M3 Pro"` |
| `processorDetails` | Object | 处理器详情 | `{"cores": 12, "baseFrequency": "3.5GHz"}` |
| `ram` | Number | 内存容量(GB) | `32` |
| `ramType` | String | 内存类型 | `"LPDDR5"` |
| `storage` | Number | 存储容量(GB) | `1024` |
| `storageType` | String | 存储类型 | `"SSD"` |
| `gpu` | String | 显卡 | `"19核心GPU"` |
| `displaySize` | Number | 屏幕尺寸(英寸) | `14.2` |
| `resolution` | String | 分辨率 | `"3024 × 1964"` |
| `refreshRate` | Number | 刷新率(Hz) | `120` |
| `battery` | Object | 电池信息 | `{"capacity": 70, "lifeHours": 18}` |
| `ports` | Array | 接口 | `["Thunderbolt 4", "HDMI", "SD卡槽"]` |
| `dimensions` | Object | 尺寸 | `{"height": 1.55, "width": 31.26, "depth": 22.12, "weight": 1.6}` |
| `additionalFeatures` | Array | 额外功能 | `["Touch ID", "1080p FaceTime HD摄像头", "六扬声器系统"]` |

### 4. 鼠标产品集合 (mouse_products)

存储所有鼠标产品信息。

| 字段 | 类型 | 描述 | 示例 |
|-----|-----|------|-----|
| `_id` | ObjectId | 唯一标识符 | `5f8a7b2e9d3e2a1b4c6d8e7f` |
| `id` | String | 产品ID | `"ms001"` |
| `name` | String | 产品名称 | `"罗技G Pro X超轻无线游戏鼠标"` |
| `brand` | String | 品牌 | `"罗技"` |
| `price` | Number | 价格（元） | `799` |
| `releaseDate` | Date | 发布日期 | `2022-09-27T00:00:00Z` |
| `thumbnail` | String | 缩略图URL | `"logitech-g-pro-x.jpg"` |
| `images` | Array | 产品图片URL列表 | `["logitech-g-pro-x-1.jpg", "logitech-g-pro-x-2.jpg"]` |
| `specs` | Object | 技术规格 | 见子表 |
| `ratings` | Object | 评分数据 | 见子表 |
| `pros` | Array | 优点列表 | `["超轻重量", "出色的传感器"]` |
| `cons` | Array | 缺点列表 | `["价格高", "对小手不够友好"]` |
| `externalReviews` | Array | 外部评测链接 | 见子表 |
| `createdAt` | Date | 创建时间 | `2025-03-01T08:00:00Z` |
| `updatedAt` | Date | 更新时间 | `2025-03-01T08:00:00Z` |

#### 鼠标技术规格子表 (specs)

| 字段 | 类型 | 描述 | 示例 |
|-----|-----|------|-----|
| `mouseType` | String | 鼠标类型 | `"无线"` |
| `connection` | Array | 连接方式 | `["2.4G无线", "蓝牙", "有线"]` |
| `sensor` | String | 传感器 | `"HERO 25K"` |
| `dpi` | Number | 灵敏度(DPI) | `25600` |
| `pollingRate` | Number | 轮询率(Hz) | `1000` |
| `buttonCount` | Number | 按键数量 | `8` |
| `weight` | Number | 重量(g) | `63` |
| `rgb` | Boolean | 是否支持RGB | `true` |
| `batteryLife` | Number | 电池续航(小时) | `70` |
| `dimensions` | Object | 尺寸 | `{"height": 40, "width": 63.5, "length": 125, "weight": 63}` |

### 5. 键盘产品集合 (keyboard_products)

存储所有键盘产品信息。

| 字段 | 类型 | 描述 | 示例 |
|-----|-----|------|-----|
| `_id` | ObjectId | 唯一标识符 | `5f8a7b2e9d3e2a1b4c6d8e7f` |
| `id` | String | 产品ID | `"kb001"` |
| `name` | String | 产品名称 | `"杜伽FUSION 79机械键盘"` |
| `brand` | String | 品牌 | `"杜伽"` |
| `price` | Number | 价格（元） | `649` |
| `releaseDate` | Date | 发布日期 | `2023-05-15T00:00:00Z` |
| `thumbnail` | String | 缩略图URL | `"ducky-fusion.jpg"` |
| `images` | Array | 产品图片URL列表 | `["ducky-fusion-1.jpg", "ducky-fusion-2.jpg"]` |
| `specs` | Object | 技术规格 | 见子表 |
| `ratings` | Object | 评分数据 | 见子表 |
| `pros` | Array | 优点列表 | `["优质PBT键帽", "支持热插拔"]` |
| `cons` | Array | 缺点列表 | `["没有托腕", "无线延迟略高"]` |
| `externalReviews` | Array | 外部评测链接 | 见子表 |
| `createdAt` | Date | 创建时间 | `2025-03-01T08:00:00Z` |
| `updatedAt` | Date | 更新时间 | `2025-03-01T08:00:00Z` |

#### 键盘技术规格子表 (specs)

| 字段 | 类型 | 描述 | 示例 |
|-----|-----|------|-----|
| `keyboardType` | String | 键盘类型 | `"机械键盘"` |
| `layout` | String | 布局 | `"75%"` |
| `switch` | String | 开关类型 | `"Cherry MX 红轴"` |
| `hotSwappable` | Boolean | 是否支持热插拔 | `true` |
| `keyCapMaterial` | String | 键帽材质 | `"PBT"` |
| `connection` | Array | 连接方式 | `["三模无线", "USB Type-C"]` |
| `backlighting` | String | 背光类型 | `"RGB"` |
| `batteryLife` | Number | 电池续航(小时) | `80` |
| `dimensions` | Object | 尺寸 | `{"height": 41, "width": 353, "depth": 135, "weight": 910}` |
| `additionalFeatures` | Array | 额外功能 | `["多设备切换", "宏编程", "RGB灯效自定义"]` |

### 6. 显示器产品集合 (monitor_products)

存储所有显示器产品信息。

| 字段 | 类型 | 描述 | 示例 |
|-----|-----|------|-----|
| `_id` | ObjectId | 唯一标识符 | `5f8a7b2e9d3e2a1b4c6d8e7f` |
| `id` | String | 产品ID | `"mo001"` |
| `name` | String | 产品名称 | `"华硕ProArt PA32UCG-K"` |
| `brand` | String | 品牌 | `"华硕"` |
| `price` | Number | 价格（元） | `24999` |
| `releaseDate` | Date | 发布日期 | `2023-02-10T00:00:00Z` |
| `thumbnail` | String | 缩略图URL | `"asus-proart.jpg"` |
| `images` | Array | 产品图片URL列表 | `["asus-proart-1.jpg", "asus-proart-2.jpg"]` |
| `specs` | Object | 技术规格 | 见子表 |
| `ratings` | Object | 评分数据 | 见子表 |
| `pros` | Array | 优点列表 | `["专业级色彩准确度", "Mini LED背光"]` |
| `cons` | Array | 缺点列表 | `["价格极高", "功耗大"]` |
| `externalReviews` | Array | 外部评测链接 | 见子表 |
| `createdAt` | Date | 创建时间 | `2025-03-01T08:00:00Z` |
| `updatedAt` | Date | 更新时间 | `2025-03-01T08:00:00Z` |

#### 显示器技术规格子表 (specs)

| 字段 | 类型 | 描述 | 示例 |
|-----|-----|------|-----|
| `panelType` | String | 面板类型 | `"Mini LED"` |
| `displaySize` | Number | 屏幕尺寸(英寸) | `32` |
| `aspectRatio` | String | 宽高比 | `"16:9"` |
| `resolution` | String | 分辨率 | `"3840 × 2160"` |
| `refreshRate` | Number | 刷新率(Hz) | `144` |
| `responseTime` | Number | 响应时间(ms) | `1` |
| `colorGamut` | Object | 色域覆盖率 | `{"sRGB": "100%", "AdobeRGB": "99.5%", "DCI-P3": "98%"}` |
| `brightness` | Number | 亮度(nits) | `1600` |
| `hdr` | String | HDR支持 | `"HDR1600"` |
| `ports` | Array | 接口 | `["HDMI 2.1", "DisplayPort 1.4", "Thunderbolt 4", "USB Hub"]` |
| `speakers` | Object | 扬声器 | `{"included": true, "power": "2W × 2"}` |
| `dimensions` | Object | 尺寸 | `{"height": 571.5, "width": 724.5, "depth": 213.1, "weight": 12.5}` |
| `adjustment` | Object | 可调节性 | `{"height": true, "pivot": true, "swivel": true, "tilt": true}` |
| `additionalFeatures` | Array | 额外功能 | `["硬件校色", "色彩均匀性补偿", "烤机防残影"]` |

## 用户数据模型 (PostgreSQL)

### 1. 用户表 (users)

存储用户账户信息。

| 字段 | 类型 | 约束 | 描述 | 示例 |
|-----|-----|------|-----|-----|
| `id` | UUID | PK | 唯一标识符 | `550e8400-e29b-41d4-a716-446655440000` |
| `username` | VARCHAR(50) | UNIQUE, NOT NULL | 用户名 | `"example_user"` |
| `email` | VARCHAR(100) | UNIQUE, NOT NULL | 电子邮件 | `"user@example.com"` |
| `password_hash` | VARCHAR(255) | NOT NULL | 密码哈希 | `"$2b$10$..."` |
| `avatar` | VARCHAR(255) | NULL | 头像URL | `"avatar.jpg"` |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 创建时间 | `2025-03-01 08:00:00` |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 更新时间 | `2025-03-01 08:00:00` |
| `last_login` | TIMESTAMP | NULL | 最后登录时间 | `2025-03-10 15:30:00` |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT TRUE | 账户是否激活 | `true` |

### 2. 用户偏好表 (user_preferences)

存储用户偏好设置。

| 字段 | 类型 | 约束 | 描述 | 示例 |
|-----|-----|------|-----|-----|
| `id` | UUID | PK | 唯一标识符 | `550e8400-e29b-41d4-a716-446655440000` |
| `user_id` | UUID | FK, NOT NULL | 关联用户ID | `550e8400-e29b-41d4-a716-446655440000` |
| `mode` | VARCHAR(20) | NOT NULL, DEFAULT 'basic' | 界面模式 | `"advanced"` |
| `theme` | VARCHAR(20) | NOT NULL, DEFAULT 'light' | 主题 | `"dark"` |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 创建时间 | `2025-03-01 08:00:00` |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 更新时间 | `2025-03-01 08:00:00` |

### 3. 保存的过滤器表 (saved_filters)

存储用户保存的产品过滤器设置。

| 字段 | 类型 | 约束 | 描述 | 示例 |
|-----|-----|------|-----|-----|
| `id` | UUID | PK | 唯一标识符 | `550e8400-e29b-41d4-a716-446655440000` |
| `user_id` | UUID | FK, NOT NULL | 关联用户ID | `550e8400-e29b-41d4-a716-446655440000` |
| `name` | VARCHAR(100) | NOT NULL | 过滤器名称 | `"我的游戏手机"` |
| `product_type` | VARCHAR(50) | NOT NULL | 产品类型 | `"mobile"` |
| `filter_settings` | JSONB | NOT NULL | 过滤器设置 | `{"budget": 75, "brand": {"value": 60, "preferences": ["Apple"]}}` |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 创建时间 | `2025-03-01 08:00:00` |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 更新时间 | `2025-03-01 08:00:00` |

### 4. 用户活动表 (user_activities)

存储用户活动历史。

| 字段 | 类型 | 约束 | 描述 | 示例 |
|-----|-----|------|-----|-----|
| `id` | UUID | PK | 唯一标识符 | `550e8400-e29b-41d4-a716-446655440000` |
| `user_id` | UUID | FK, NOT NULL | 关联用户ID | `550e8400-e29b-41d4-a716-446655440000` |
| `activity_type` | VARCHAR(50) | NOT NULL | 活动类型 | `"view_product"` |
| `product_id` | VARCHAR(50) | NULL | 相关产品ID | `"m001"` |
| `product_type` | VARCHAR(50) | NULL | 产品类型 | `"mobile"` |
| `details` | JSONB | NULL | 活动详情 | `{"name": "iPhone 15 Pro", "thumbnail": "iphone15-pro.jpg"}` |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 创建时间 | `2025-03-01 08:00:00` |

### 5. 收藏产品表 (saved_products)

存储用户收藏的产品。

| 字段 | 类型 | 约束 | 描述 | 示例 |
|-----|-----|------|-----|-----|
| `id` | UUID | PK | 唯一标识符 | `550e8400-e29b-41d4-a716-446655440000` |
| `user_id` | UUID | FK, NOT NULL | 关联用户ID | `550e8400-e29b-41d4-a716-446655440000` |
| `product_id` | VARCHAR(50) | NOT NULL | 产品ID | `"m001"` |
| `product_type` | VARCHAR(50) | NOT NULL | 产品类型 | `"mobile"` |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 创建时间 | `2025-03-01 08:00:00` |

### 6. 产品对比历史表 (comparison_history)

存储用户的产品对比历史。

| 字段 | 类型 | 约束 | 描述 | 示例 |
|-----|-----|------|-----|-----|
| `id` | UUID | PK | 唯一标识符 | `550e8400-e29b-41d4-a716-446655440000` |
| `user_id` | UUID | FK, NOT NULL | 关联用户ID | `550e8400-e29b-41d4-a716-446655440000` |
| `product_type` | VARCHAR(50) | NOT NULL | 产品类型 | `"mobile"` |
| `product_ids` | VARCHAR[] | NOT NULL | 对比的产品ID数组 | `["m001", "m002", "m003"]` |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 创建时间 | `2025-03-01 08:00:00` |

### 7. 评论表 (reviews)

存储用户对产品的评论。

| 字段 | 类型 | 约束 | 描述 | 示例 |
|-----|-----|------|-----|-----|
| `id` | UUID | PK | 唯一标识符 | `550e8400-e29b-41d4-a716-446655440000` |
| `user_id` | UUID | FK, NOT NULL | 关联用户ID | `550e8400-e29b-41d4-a716-446655440000` |
| `product_id` | VARCHAR(50) | NOT NULL | 产品ID | `"m001"` |
| `product_type` | VARCHAR(50) | NOT NULL | 产品类型 | `"mobile"` |
| `rating` | DECIMAL(3,1) | NOT NULL | 评分(0-5) | `4.5` |
| `comment` | TEXT | NOT NULL | 评论内容 | `"这是一款非常好用的手机，性能强大，拍照很棒！"` |
| `images` | VARCHAR[] | NULL | 评论图片URL数组 | `["review-image-1.jpg", "review-image-2.jpg"]` |
| `helpful_count` | INT | NOT NULL, DEFAULT 0 | 有用标记数 | `12` |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 创建时间 | `2025-03-01 08:00:00` |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 更新时间 | `2025-03-01 08:00:00` |

### 8. 评论有用标记表 (review_helpful_marks)

存储用户对评论的有用标记。

| 字段 | 类型 | 约束 | 描述 | 示例 |
|-----|-----|------|-----|-----|
| `id` | UUID | PK | 唯一标识符 | `550e8400-e29b-41d4-a716-446655440000` |
| `user_id` | UUID | FK, NOT NULL | 关联用户ID | `550e8400-e29b-41d4-a716-446655440000` |
| `review_id` | UUID | FK, NOT NULL | 关联评论ID | `550e8400-e29b-41d4-a716-446655440000` |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 创建时间 | `2025-03-01 08:00:00` |

### 9. 评论举报表 (review_reports)

存储对评论的举报。

| 字段 | 类型 | 约束 | 描述 | 示例 |
|-----|-----|------|-----|-----|
| `id` | UUID | PK | 唯一标识符 | `550e8400-e29b-41d4-a716-446655440000` |
| `user_id` | UUID | FK, NOT NULL | 关联用户ID | `550e8400-e29b-41d4-a716-446655440000` |
| `review_id` | UUID | FK, NOT NULL | 关联评论ID | `550e8400-e29b-41d4-a716-446655440000` |
| `reason` | VARCHAR(100) | NOT NULL | 举报原因 | `"含有虚假信息"` |
| `details` | TEXT | NULL | 举报详情 | `"评论中提到的功能实际并不存在"` |
| `status` | VARCHAR(20) | NOT NULL, DEFAULT 'pending' | 处理状态 | `"pending"` |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 创建时间 | `2025-03-01 08:00:00` |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW() | 更新时间 | `2025-03-01 08:00:00` |

## 数据关系图

```
+--------------+       +--------------------+       +---------------+
|    users     |------>| user_preferences   |       | product_types |
+--------------+       +--------------------+       +---------------+
      |                                                   |
      |                                                   |
      v                                                   v
+---------------+      +----------------+      +-------------------+
| saved_filters |      | saved_products |      | mobile_products   |
+---------------+      +----------------+      +-------------------+
                             |                        |
                             |                        |
+------------------+         |                        |
| user_activities  |<--------+                        |
+------------------+                                  |
      |                                               |
      v                                               v
+------------------+      +------------+      +---------------+
| comparison_history|     |  reviews   |----->| review_reports|
+------------------+      +------------+      +---------------+
                                |
                                v
                         +--------------------+
                         | review_helpful_marks|
                         +--------------------+
```

## 索引设计

### MongoDB索引

1. 产品集合索引：
   - 对 `brand`、`price` 和 `releaseDate` 字段创建索引，优化排序和筛选查询
   - 对 `specs` 字段的特定子字段创建索引，如手机产品的 `specs.os`、`specs.storage` 等

2. 文本搜索索引：
   - 在所有产品集合的 `name` 和 `specs` 字段上创建文本索引，支持产品搜索功能

### PostgreSQL索引

1. 外键索引：
   - 对所有外键字段创建索引，如 `user_id`、`review_id` 等

2. 查询优化索引：
   - 在 `user_activities` 表的 `activity_type` 和 `created_at` 字段上创建组合索引
   - 在 `reviews` 表的 `product_id` 和 `product_type` 字段上创建组合索引

## 数据迁移与版本控制

使用适当的迁移工具管理数据库结构的变更：
- PostgreSQL: 使用 Sequelize 或 Knex.js 的迁移功能
- MongoDB: 使用 Mongoose 迁移工具

每次数据库结构变更需要创建新的迁移文件，并在生产环境部署前进行测试。 