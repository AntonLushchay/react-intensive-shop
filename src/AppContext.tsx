import { createContext, useState, ReactNode, useEffect, useContext } from 'react';
import CartController from './controllers/CartController';
import ProductController from './controllers/ProductController';

interface AppContextType {
    cartCount: number;
    isLoading: boolean;
}

const AppContext = createContext<AppContextType>({
    cartCount: 0,
    isLoading: true,
});

// Хук для удобного доступа к контексту из компонентов
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
};

export function AppProvider({ children }: { children: ReactNode }) {
    const [cartCount, setCartCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Загрузка начальных данных о продуктах
        const loadInitialData = async () => {
            setIsLoading(true);
            await ProductController.getAllProducts();
            setIsLoading(false);
        };

        loadInitialData();

        // Подписываемся на изменения в корзине
        const unsubscribe = CartController.addCartChangeListener(() => {
            setCartCount(CartController.getCartCount());
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return <AppContext.Provider value={{ cartCount, isLoading }}>{children}</AppContext.Provider>;
}
