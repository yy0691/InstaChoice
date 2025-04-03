export type ProductType = '手机' | '笔记本电脑' | '游戏鼠标' | '键盘';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  thumbnail: string;
  rating: number;
  specs: Record<string, string | number>;
  match_score: number;
  key_factors: string[];
  product_type: ProductType;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>;
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 