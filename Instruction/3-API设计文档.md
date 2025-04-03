### 产品API

- **GET /api/products/:type** - 获取指定类型的产品列表
- **GET /api/products/:type/:id** - 获取单个产品详情
- **POST /api/products/recommend** - 根据用户设置的决策因素获取推荐产品
- **GET /api/products/compare** - 获取多个产品的对比数据

###  用户API

- **POST /api/auth/register** - 用户注册
- **POST /api/auth/login** - 用户登录
- **GET /api/user/profile** - 获取用户个人信息
- **PUT /api/user/preferences** - 更新用户偏好设置
- **POST /api/user/saved-products** - 保存产品
- **GET /api/user/saved-products** - 获取已保存产品

### 评论API

- **GET /api/reviews/:productId** - 获取产品评论
- **POST /api/reviews** - 添加评论
- **PUT /api/reviews/:reviewId/helpful** - 标记评论为有用
- **POST /api/reviews/:reviewId/report** - 举报评论