import CartModel from '../models/CartModel';
import ProductModel, { ProductType } from '../models/ProductModel';

class CartController {
    toggleCartItem(productId: number): void {
        CartModel.addItem(productId);
    }

    removeFromCart(productId: number): void {
        CartModel.removeItem(productId);
    }

    updateQuantity(productId: number, quantity: number): void {
        CartModel.updateQuantity(productId, quantity);
    }

    isProductInCart(productId: number): boolean {
        return CartModel.isInCart(productId);
    }

    getCartCount(): number {
        return CartModel.getCount();
    }

    getCartItems() {
        return CartModel.getItems();
    }

    getCartProducts(): ProductType[] {
        const cartItems = CartModel.getItems();
        const allProducts = ProductModel.getAllProducts();

        return allProducts.filter((product) => cartItems.some((item) => item.productId === product.id));
    }

    getCartTotal(): number {
        const products = ProductModel.getAllProducts();
        return CartModel.getTotal(products);
    }

    getQuantity(productId: number): number {
        const items = CartModel.getItems();
        const item = items.find((item) => item.productId === productId);
        return item ? item.quantity : 0;
    }

    clearCart(): void {
        CartModel.clearCart();
    }

    addCartChangeListener(listener: () => void): () => void {
        return CartModel.addListener(listener);
    }
}

export default new CartController();
