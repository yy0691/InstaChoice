// 添加Next.js和React模块的声明
declare module 'next/router' {
  export interface NextRouter {
    query: {
      [key: string]: string | string[] | undefined;
    };
  }
}

declare module 'next/head' {
  export default function Head(props: { children: React.ReactNode }): JSX.Element;
}

declare module 'next/link' {
  import { ComponentType, HTMLAttributes } from 'react';
  export default function Link(props: HTMLAttributes<HTMLAnchorElement>): JSX.Element;
}

declare module 'framer-motion' {
  import { ComponentType, HTMLAttributes } from 'react';
  export const motion: {
    div: ComponentType<HTMLAttributes<HTMLDivElement>>;
    [key: string]: ComponentType<HTMLAttributes<HTMLElement>>;
  };
}

// 产品类型枚举
export type ProductType = 'mobile' | 'computer' | 'mouse' | 'keyboard' | 'monitor';

// 用户模式枚举
export type UserMode = 'basic' | 'advanced';

// 决策因素接口
export interface DecisionFactor {
  id: string;
  name: string;
  description: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  unit?: string;
  step?: number;
  options?: string[];
  labels?: Record<number, string>;
  type?: 'toggle' | 'slider';
}

// 产品规格接口
export interface ProductSpecs {
  os?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  displaySize?: string;
  camera?: string;
  battery?: string;
  resolution?: string;
  type?: string;
  dpi?: string;
  sensor?: string;
  weight?: string;
  buttons?: string;
  batteryLife?: string;
  layout?: string;
  switch?: string;
  keycaps?: string;
  connection?: string;
  lighting?: string;
  size?: string;
  panel?: string;
  refresh?: string;
  response?: string;
  color?: string;
  [key: string]: string | undefined;
}

// 产品接口
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  thumbnail: string;
  rating: number;
  specs: ProductSpecs;
  matchScore: number;
  keyFactors: string[];
}

// 产品数据映射
export type ProductData = {
  [K in ProductType]: Product[];
};

// 规格字段映射
export type KeySpecFields = {
  [K in ProductType]: string[];
};

// 规格标签映射
export interface SpecLabels {
  [key: string]: string;
}

// 产品类型名称映射
export type ProductTypeNames = {
  [K in ProductType]: string;
};

// 高亮规格状态
export interface HighlightedSpecs {
  [key: string]: boolean;
}

// 比较状态类型
export type ComparisonStatus = "相同" | "不同" | "更好" | "较差" | null;

// 决策因素数据映射
export type DecisionFactors = {
  [K in ProductType]: DecisionFactor[];
};

// 详细产品类型定义
export interface DetailedProduct extends Product {
  fullDescription: string;
  imageGallery: string[];
  reviews: Review[];
  advantages: string[];
  disadvantages: string[];
  availability: {
    online: boolean;
    stores: string[];
    deliveryTime: string;
  };
  warranty: string;
  technicalSpecs?: {
    cpu?: {
      model: string;
      cores: number;
      frequency: string;
    };
    display?: {
      type: string;
      size: string;
      resolution: string;
      refreshRate: string;
      brightness: string;
      features: string[];
    };
    camera?: {
      main: {
        megapixels: string;
        aperture: string;
        features: string[];
      };
      ultra?: {
        megapixels: string;
        aperture: string;
        features: string[];
      };
      telephoto?: {
        megapixels: string;
        aperture: string;
        opticalZoom: string;
        features: string[];
      };
      front: {
        megapixels: string;
        aperture: string;
        features: string[];
      };
    };
    battery?: {
      capacity: string;
      chargingSpeed: string;
      wirelessCharging: boolean;
      reverseCharging: boolean;
      talkTime: string;
      standbyTime: string;
    };
    connectivity?: {
      wifi: string;
      bluetooth: string;
      nfc: boolean;
      gps: string[];
      ports: string[];
    };
    sensors?: string[];
    security?: string[];
  };
  designFeatures?: string[];
  specialFeatures?: string[];
  operatingSystem?: {
    name: string;
    version: string;
    features: string[];
    updates: string;
  };
  inTheBox?: string[];
  dimensions?: {
    height: string;
    width: string;
    thickness: string;
    weight: string;
  };
  videos?: {
    title: string;
    url: string;
    thumbnail: string;
  }[];
  comparisonTable?: {
    vs: {
      name: string;
      advantages: string[];
      disadvantages: string[];
    }[];
  };
}

// 用户评价类型定义
export interface Review {
  id: string;
  user: string;
  rating: number;
  content: string;
  date: string;
}

// 产品规格分组
export interface SpecGroups {
  [key: string]: {
    [key: string]: string[];
  };
}

// 用户模式名称映射
export interface UserModeNames {
  [key: string]: string;
}

// 动画变体类型
export interface AnimationVariants {
  hidden: {
    opacity: number;
    y?: number;
  };
  show: {
    opacity: number;
    y?: number;
    transition?: {
      staggerChildren?: number;
    };
  };
}

// 产品类型图标映射
export interface ProductIcons {
  [brand: string]: string;
}

// 规格比较工具类型
export interface SpecComparisonUtils {
  getComparisonStatus: (spec: string) => ComparisonStatus;
  getSpecCellClass: (index: number, spec: string) => string;
  toggleHighlight: (spec: string) => void;
} 