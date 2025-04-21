import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ProductType } from './BestSellers';
import axios from 'axios';

interface CartItem {
    productId: number;
    quantity: number;
    product?: ProductType; // Добавляем полные данные о продукте
}

interface CartContextType {
    cartCount: number;
    cartItems: CartItem[];
    toggleCartItem: (productId: number) => void;
    isProductInCart: (productId: number) => boolean;
    removeFromCart: (productId: number) => void;
    getCartTotal: () => number;
    cartProducts: ProductType[];
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [allProducts, setAllProducts] = useState<ProductType[]>([]);
    
    // Загружаем все продукты один раз при инициализации
    useEffect(() => {
        axios
            .get('https://masterclass.kimitsu.it-incubator.io/api/products')
            .then((res) => {
                setAllProducts(res.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    // Общее количество товаров в корзине
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Фильтруем продукты, которые находятся в корзине
    const cartProducts = allProducts.filter(product => 
        cartItems.some(item => item.productId === product.id)
    );

    // Функция для добавления/удаления товара из корзины
    const toggleCartItem = (productId: number) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((item) => item.productId === productId);

            if (existingItemIndex >= 0) {
                // Если товар уже в корзине, удаляем его
                return prevItems.filter((item) => item.productId !== productId);
            } else {
                // Если товара нет в корзине, добавляем его
                return [...prevItems, { productId, quantity: 1 }];
            }
        });
    };

    // Функция для удаления товара из корзины
    const removeFromCart = (productId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
    };

    // Функция для проверки, есть ли товар в корзине
    const isProductInCart = (productId: number) => {
        return cartItems.some((item) => item.productId === productId);
    };

    // Функция для расчета общей стоимости товаров в корзине
    const getCartTotal = (): number => {
        return cartProducts.reduce((total, product) => {
            return total + product.price;
        }, 0);
    };

    return (
        <CartContext.Provider value={{ 
            cartCount, 
            cartItems, 
            toggleCartItem, 
            isProductInCart,
            removeFromCart,
            getCartTotal,
            cartProducts
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
