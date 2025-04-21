import ProductModel, { ProductType } from '../models/ProductModel';

class ProductController {
    async getAllProducts(): Promise<ProductType[]> {
        try {
            const products = await ProductModel.fetchAllProducts();
            return products;
        } catch (error) {
            console.error('Error in ProductController.getAllProducts:', error);
            return [];
        }
    }

    async getProductById(id: string | number): Promise<ProductType | null> {
        try {
            const product = await ProductModel.fetchProductById(id);
            return product;
        } catch (error) {
            console.error(`Error in ProductController.getProductById(${id}):`, error);
            return null;
        }
    }

    getCachedProducts(): ProductType[] {
        return ProductModel.getAllProducts();
    }

    getCachedProductById(id: number): ProductType | undefined {
        return ProductModel.getProductById(id);
    }
}

export default new ProductController();
