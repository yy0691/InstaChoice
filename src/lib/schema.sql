-- 创建产品表
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  thumbnail VARCHAR(255),
  rating DECIMAL(3,1) NOT NULL,
  specs JSONB NOT NULL,
  match_score INTEGER NOT NULL,
  key_factors TEXT[] NOT NULL,
  product_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT valid_product_type CHECK (product_type IN ('mobile', 'computer', 'mouse', 'keyboard', 'monitor')),
  CONSTRAINT valid_rating CHECK (rating >= 0 AND rating <= 5),
  CONSTRAINT valid_match_score CHECK (match_score >= 0 AND match_score <= 100)
);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 创建索引
CREATE INDEX idx_products_product_type ON products(product_type);
CREATE INDEX idx_products_match_score ON products(match_score);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_price ON products(price);

-- 插入示例数据
INSERT INTO products (name, brand, price, thumbnail, rating, specs, match_score, key_factors, product_type)
VALUES
  (
    'iPhone 15 Pro',
    'Apple',
    8999,
    '/images/products/iphone15-pro.jpg',
    4.8,
    '{
      "os": "iOS 17",
      "processor": "A17 Pro",
      "ram": "8GB",
      "storage": "256GB",
      "displaySize": "6.1英寸",
      "camera": "4800万像素主摄",
      "battery": "3274mAh"
    }',
    92,
    ARRAY['操作系统匹配', '相机性能出色', '设计符合需求'],
    'mobile'
  ),
  (
    'MacBook Air M2',
    'Apple',
    9999,
    '/images/products/macbook-air-m2.jpg',
    4.7,
    '{
      "os": "macOS",
      "processor": "Apple M2",
      "ram": "8GB",
      "storage": "256GB SSD",
      "displaySize": "13.6英寸",
      "resolution": "2560 × 1664",
      "battery": "18小时续航"
    }',
    90,
    ARRAY['轻薄设计', '长续航', '性能强大'],
    'computer'
  ),
  (
    '罗技G Pro X超轻无线游戏鼠标',
    '罗技',
    799,
    '/images/products/logitech-g-pro-x.jpg',
    4.8,
    '{
      "type": "无线",
      "dpi": "25600",
      "sensor": "HERO 25K",
      "weight": "63g",
      "buttons": "8个可编程按键",
      "batteryLife": "70小时"
    }',
    94,
    ARRAY['专业电竞', '超轻重量', '精准传感器'],
    'mouse'
  ); 