import { ProductType } from './ProductModel';

export interface CartItem {
    productId: number;
    quantity: number;
}

class CartModel {
    private items: CartItem[] = [];
    private listeners: (() => void)[] = [];

    getItems(): CartItem[] {
        return [...this.items];
    }

    addItem(productId: number): void {
        const existingItemIndex = this.items.findIndex((item) => item.productId === productId);

        if (existingItemIndex >= 0) {
            // Если товар уже в корзине, удаляем его
            this.items = this.items.filter((item) => item.productId !== productId);
        } else {
            // Если товара нет в корзине, добавляем его
            this.items.push({ productId, quantity: 1 });
        }

        this.notifyListeners();
    }

    removeItem(productId: number): void {
        this.items = this.items.filter((item) => item.productId !== productId);
        this.notifyListeners();
    }

    updateQuantity(productId: number, quantity: number): void {
        if (quantity < 1) return;

        const existingItemIndex = this.items.findIndex((item) => item.productId === productId);
        if (existingItemIndex >= 0) {
            this.items[existingItemIndex].quantity = quantity;
            this.notifyListeners();
        }
    }

    isInCart(productId: number): boolean {
        return this.items.some((item) => item.productId === productId);
    }

    getCount(): number {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    getTotal(products: ProductType[]): number {
        return this.items.reduce((total, item) => {
            const product = products.find((p) => p.id === item.productId);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    }

    clearCart(): void {
        this.items = [];
        this.notifyListeners();
    }

    // Observer pattern для обновления UI при изменениях корзины
    addListener(listener: () => void): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notifyListeners(): void {
        this.listeners.forEach((listener) => listener());
    }
}

export default new CartModel();
