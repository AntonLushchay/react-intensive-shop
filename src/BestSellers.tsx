import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

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

export const BestSellers = () => {
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        const promise = axios.get('https://masterclass.kimitsu.it-incubator.io/api/products');
        promise
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className='bestSeller'>
            <h2>Bestsellers</h2>
            <div className='cards'>
                {products.map((pr) => {
                    return (
                        <div key={pr.id} className='card'>
                            <img src={pr.image} alt='img' />
                            <h4>{pr.title}</h4>
                            <p className='price'>${pr.price}</p>
                            <Link to={`/product/${pr.id}`}>Show more</Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
