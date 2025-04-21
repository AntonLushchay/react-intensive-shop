import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../models/ProductModel';
import ProductController from '../controllers/ProductController';

export const BestSellers: React.FC = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            try {
                const products = await ProductController.getAllProducts();
                setProducts(products);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <div className='bestSeller'>
            <h2>Bestsellers</h2>
            <div className='cards'>
                {products.map((product) => (
                    <div key={product.id} className='card'>
                        <img src={product.image} alt={product.title} />
                        <h4>{product.title}</h4>
                        <p className='price'>${product.price}</p>
                        <Link to={`/product/${product.id}`}>Show more</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
