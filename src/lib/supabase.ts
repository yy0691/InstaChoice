import { createClient } from '@supabase/supabase-js';
import { Database, ProductType } from '@/types/product';

const supabaseUrl = 'https://cjttuufktnmkwwzosibi.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

// 测试数据库连接和数据获取
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const { count, error } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;
    console.log('数据库连接成功，产品总数:', count);
    return true;
  } catch (error) {
    console.error('数据库连接测试失败:', error);
    return false;
  }
}

// 产品数据服务
export const productService = {
  // 获取所有产品类型的数量统计
  async getProductTypeCounts(): Promise<Record<ProductType, number>> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('product_type');

      if (error) throw error;

      const counts: Record<ProductType, number> = {
        '手机': 0,
        '笔记本电脑': 0,
        '游戏鼠标': 0,
        '键盘': 0
      };

      if (data) {
        data.forEach((item) => {
          const type = item.product_type as ProductType;
          if (type in counts) {
            counts[type]++;
          }
        });
      }

      return counts;
    } catch (error) {
      console.error('获取产品类型统计失败:', error);
      return {
        '手机': 0,
        '笔记本电脑': 0,
        '游戏鼠标': 0,
        '键盘': 0
      };
    }
  },

  // 获取推荐产品
  async getRecommendedProducts(type: ProductType, factors: Record<string, number>): Promise<Database['public']['Tables']['products']['Row'][]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('product_type', type)
        .order('match_score', { ascending: false })
        .limit(3);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('获取推荐产品失败:', error);
      return [];
    }
  },

  // 获取单个产品详情
  async getProductById(id: number): Promise<Database['public']['Tables']['products']['Row'] | null> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('获取产品详情失败:', error);
      return null;
    }
  },

  // 获取多个产品（用于对比）
  async getProductsForComparison(ids: number[]): Promise<Database['public']['Tables']['products']['Row'][]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .in('id', ids);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('获取对比产品失败:', error);
      return [];
    }
  },
}; 