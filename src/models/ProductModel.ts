import axios from 'axios';

export type ProductType = {
    _id: string;
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
};

class ProductModel {
    private products: ProductType[] = [];
    private baseUrl = 'https://masterclass.kimitsu.it-incubator.io/api/products';

    async fetchAllProducts(): Promise<ProductType[]> {
        try {
            const response = await axios.get(this.baseUrl);
            this.products = response.data;
            return this.products;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    async fetchProductById(id: string | number): Promise<ProductType> {
        try {
            const response = await axios.get(`${this.baseUrl}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product with id ${id}:`, error);
            throw error;
        }
    }

    getAllProducts(): ProductType[] {
        return this.products;
    }

    getProductById(id: number): ProductType | undefined {
        return this.products.find((product) => product.id === id);
    }
}

export default new ProductModel();
