# InstaChoice - API文档

本文档记录了InstaChoice项目的API接口设计，供前后端开发人员参考。

## API基础信息

- **基础URL**: `/api`
- **请求格式**: JSON
- **响应格式**: JSON
- **认证方式**: JWT Token (Bearer Authentication)
- **状态码**:
  - `200`: 成功
  - `201`: 创建成功
  - `400`: 请求参数错误
  - `401`: 未授权
  - `403`: 禁止访问
  - `404`: 资源不存在
  - `500`: 服务器内部错误

## 产品相关API

### 1. 获取产品类型列表

获取所有可用的产品类型。

**请求**:
- **方法**: `GET`
- **路径**: `/products/types`
- **认证**: 不需要

**响应**:
```json
{
  "status": "success",
  "data": [
    {
      "id": "mobile",
      "name": "手机",
      "description": "手机产品分类",
      "icon": "mobile-icon.svg"
    },
    {
      "id": "computer",
      "name": "笔记本电脑",
      "description": "笔记本电脑产品分类",
      "icon": "laptop-icon.svg"
    },
    // 其他产品类型...
  ]
}
```

### 2. 获取指定类型的产品列表

获取特定类型的产品列表。

**请求**:
- **方法**: `GET`
- **路径**: `/products/:type`
- **认证**: 不需要
- **参数**:
  - `type`: 产品类型ID (如 "mobile", "computer")
  - `page`: 页码，默认为1
  - `limit`: 每页项目数，默认为20
  - `sort`: 排序字段，默认为"price"
  - `order`: 排序方向，"asc" 或 "desc"，默认为"asc"
  - `filter`: 过滤条件，JSON格式

**响应**:
```json
{
  "status": "success",
  "data": {
    "products": [
      {
        "id": "m001",
        "name": "iPhone 15 Pro",
        "brand": "Apple",
        "price": 8999,
        "thumbnail": "iphone15-pro.jpg",
        "rating": 4.8,
        // 其他产品信息...
      },
      // 更多产品...
    ],
    "pagination": {
      "total": 120,
      "page": 1,
      "limit": 20,
      "pages": 6
    }
  }
}
```

### 3. 获取单个产品详情

获取单个产品的详细信息。

**请求**:
- **方法**: `GET`
- **路径**: `/products/:type/:id`
- **认证**: 不需要
- **参数**:
  - `type`: 产品类型ID
  - `id`: 产品ID

**响应**:
```json
{
  "status": "success",
  "data": {
    "id": "m001",
    "name": "iPhone 15 Pro",
    "brand": "Apple",
    "price": 8999,
    "images": ["iphone15-pro-1.jpg", "iphone15-pro-2.jpg"],
    "specs": {
      "os": "iOS 17",
      "processor": "A17 Pro",
      "ram": 8,
      "storage": 256,
      "displaySize": 6.1,
      "resolution": "2556 × 1179",
      "battery": 3274,
      "camera": {
        "main": "48MP",
        "selfie": "12MP",
        "features": ["夜景模式", "电影模式", "4K视频"]
      },
      // 其他规格...
    },
    "ratings": {
      "overall": 92,
      "performance": 95,
      "display": 94,
      "camera": 92,
      "battery": 85,
      "design": 96,
      "valueForMoney": 80,
      "userRating": {
        "average": 4.8,
        "count": 1256
      }
    },
    "pros": ["卓越的性能", "优秀的相机系统", "高质量屏幕"],
    "cons": ["价格较高", "充电速度一般"],
    "externalReviews": [
      {
        "platform": "bilibili",
        "title": "iPhone 15 Pro深度评测",
        "url": "https://www.bilibili.com/video/xxxxx",
        "rating": 4.7
      }
      // 更多评测...
    ]
  }
}
```

### 4. 获取推荐产品

基于用户设置的决策因素获取推荐产品。

**请求**:
- **方法**: `POST`
- **路径**: `/products/recommend`
- **认证**: 不需要
- **请求体**:
```json
{
  "productType": "mobile",
  "factors": {
    "budget": 75,
    "brand": {
      "value": 60,
      "preferences": ["Apple", "Samsung"]
    },
    "usagePattern": 80,
    "usageScenario": 65,
    "os": 90,
    "cameraQuality": 85,
    "batteryLife": 70,
    "screenSize": 50,
    "support5g": 100,
    "storage": 67,
    "design": 60,
    "audioQuality": 30
  },
  "limit": 5
}
```

**响应**:
```json
{
  "status": "success",
  "data": {
    "recommendations": [
      {
        "id": "m001",
        "name": "iPhone 15 Pro",
        "brand": "Apple",
        "price": 8999,
        "thumbnail": "iphone15-pro.jpg",
        "matchScore": 92,
        "keyFactors": ["操作系统匹配", "相机性能出色", "设计符合需求"],
        // 其他产品信息...
      },
      // 更多推荐产品...
    ]
  }
}
```

### 5. 获取产品对比

获取多个产品的对比数据。

**请求**:
- **方法**: `GET`
- **路径**: `/products/compare`
- **认证**: 不需要
- **参数**:
  - `type`: 产品类型ID
  - `ids`: 产品ID数组，以逗号分隔

**响应**:
```json
{
  "status": "success",
  "data": {
    "products": [
      {
        "id": "m001",
        "name": "iPhone 15 Pro",
        // 详细产品信息...
      },
      {
        "id": "m002",
        "name": "Samsung Galaxy S23",
        // 详细产品信息...
      }
      // 更多产品...
    ],
    "comparisonTable": {
      "价格": ["8999元", "7999元"],
      "处理器": ["A17 Pro", "骁龙8 Gen 2"],
      "屏幕": ["6.1英寸 ProMotion", "6.2英寸 Dynamic AMOLED"],
      // 更多比较项...
    },
    "radarData": {
      "categories": ["性能", "屏幕", "相机", "电池", "设计", "性价比"],
      "products": [
        {
          "name": "iPhone 15 Pro",
          "data": [95, 94, 92, 85, 96, 80]
        },
        {
          "name": "Samsung Galaxy S23",
          "data": [93, 92, 90, 88, 90, 85]
        }
      ]
    }
  }
}
```

## 用户相关API

### 1. 用户注册

注册新用户。

**请求**:
- **方法**: `POST`
- **路径**: `/auth/register`
- **认证**: 不需要
- **请求体**:
```json
{
  "username": "example",
  "email": "example@mail.com",
  "password": "Password123"
}
```

**响应**:
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "u001",
      "username": "example",
      "email": "example@mail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
  }
}
```

### 2. 用户登录

用户登录。

**请求**:
- **方法**: `POST`
- **路径**: `/auth/login`
- **认证**: 不需要
- **请求体**:
```json
{
  "email": "example@mail.com",
  "password": "Password123"
}
```

**响应**:
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "u001",
      "username": "example",
      "email": "example@mail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsIn..."
  }
}
```

### 3. 获取用户信息

获取当前登录用户的信息。

**请求**:
- **方法**: `GET`
- **路径**: `/user/profile`
- **认证**: 需要

**响应**:
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "u001",
      "username": "example",
      "email": "example@mail.com",
      "preferences": {
        "mode": "advanced",
        "savedFilters": [
          {
            "name": "我的游戏手机",
            "productType": "mobile",
            "filterSettings": {
              // 保存的过滤设置...
            }
          }
        ]
      },
      "activity": {
        "recentlyViewed": [
          {
            "productId": "m001",
            "productName": "iPhone 15 Pro",
            "thumbnail": "iphone15-pro.jpg",
            "timestamp": "2025-03-30T12:34:56Z"
          }
        ]
      }
    }
  }
}
```

### 4. 更新用户偏好

更新用户偏好设置。

**请求**:
- **方法**: `PUT`
- **路径**: `/user/preferences`
- **认证**: 需要
- **请求体**:
```json
{
  "mode": "basic",
  "newFilter": {
    "name": "家用电脑",
    "productType": "computer",
    "filterSettings": {
      // 过滤设置...
    }
  }
}
```

**响应**:
```json
{
  "status": "success",
  "data": {
    "preferences": {
      "mode": "basic",
      "savedFilters": [
        // 所有过滤器，包括新添加的...
      ]
    }
  }
}
```

## 评论相关API

### 1. 获取产品评论

获取产品的评论。

**请求**:
- **方法**: `GET`
- **路径**: `/reviews/:productId`
- **认证**: 不需要
- **参数**:
  - `productId`: 产品ID
  - `page`: 页码，默认为1
  - `limit`: 每页项目数，默认为20
  - `sort`: 排序字段，默认为"date"
  - `order`: 排序方向，"asc" 或 "desc"，默认为"desc"

**响应**:
```json
{
  "status": "success",
  "data": {
    "reviews": [
      {
        "id": "r001",
        "userId": "u001",
        "username": "example",
        "rating": 4.5,
        "comment": "这是一款非常好用的手机，性能强大，拍照很棒！",
        "images": ["review-image-1.jpg"],
        "date": "2025-03-30T12:34:56Z",
        "helpfulCount": 12
      },
      // 更多评论...
    ],
    "pagination": {
      "total": 56,
      "page": 1,
      "limit": 20,
      "pages": 3
    }
  }
}
```

### 2. 添加评论

添加产品评论。

**请求**:
- **方法**: `POST`
- **路径**: `/reviews`
- **认证**: 需要
- **请求体**:
```json
{
  "productId": "m001",
  "rating": 4.5,
  "comment": "这是一款非常好用的手机，性能强大，拍照很棒！",
  "images": ["data:image/jpeg;base64,/9j/4AAQ..."] // Base64编码的图片
}
```

**响应**:
```json
{
  "status": "success",
  "data": {
    "review": {
      "id": "r001",
      "userId": "u001",
      "username": "example",
      "rating": 4.5,
      "comment": "这是一款非常好用的手机，性能强大，拍照很棒！",
      "images": ["review-image-1.jpg"],
      "date": "2025-03-31T10:12:34Z",
      "helpfulCount": 0
    }
  }
}
```

### 3. 标记评论为有用

标记一条评论为有用。

**请求**:
- **方法**: `PUT`
- **路径**: `/reviews/:reviewId/helpful`
- **认证**: 需要
- **参数**:
  - `reviewId`: 评论ID

**响应**:
```json
{
  "status": "success",
  "data": {
    "helpfulCount": 13
  }
}
```

### 4. 举报评论

举报不当评论。

**请求**:
- **方法**: `POST`
- **路径**: `/reviews/:reviewId/report`
- **认证**: 需要
- **参数**:
  - `reviewId`: 评论ID
- **请求体**:
```json
{
  "reason": "含有虚假信息",
  "details": "评论中提到的功能实际并不存在"
}
```

**响应**:
```json
{
  "status": "success",
  "message": "举报已提交"
}
```

---

## 错误响应格式

当API遇到错误时，会返回以下格式的响应：

```json
{
  "status": "error",
  "error": {
    "code": 400,
    "message": "请求参数错误",
    "details": "产品ID不能为空"
  }
}
```

## API版本控制

当前API版本为v1，未来版本更新时将通过路径前缀（如 `/api/v2/`）进行区分。 