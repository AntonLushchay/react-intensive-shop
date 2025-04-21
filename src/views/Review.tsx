import React, { useEffect, useState } from 'react';
import avatar from '../assets/img/avatarIcon.svg';
import ReviewController from '../controllers/ReviewController';
import { ReviewType } from '../models/ReviewModel';

interface ReviewProps {
    productId: number;
}

export const Review: React.FC<ReviewProps> = ({ productId }) => {
    const [reviewText, setReviewText] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [rating, setRating] = useState<number>(5);
    const [reviews, setReviews] = useState<ReviewType[]>([]);

    useEffect(() => {
        // Получаем отзывы для данного продукта
        setReviews(ReviewController.getReviews(productId));

        // Подписываемся на изменения в отзывах
        const unsubscribe = ReviewController.addReviewChangeListener(() => {
            setReviews(ReviewController.getReviews(productId));
        });

        return () => {
            unsubscribe();
        };
    }, [productId]);

    const addReview = () => {
        if (!reviewText.trim()) return;

        ReviewController.addReview(productId, {
            name: name.trim() ? name : 'Anonymous User',
            title: title.trim() ? title : 'New Review',
            review: reviewText,
            rating: rating,
        });

        // Сбрасываем форму
        setReviewText('');
        setName('');
        setTitle('');
        setRating(5);
    };

    return (
        <div className='reviewBox'>
            <div className='review'>
                <h3>{`Reviews (${reviews.length})`}</h3>

                <div className='review-form' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                        type='text'
                        placeholder='Your Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: '50%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                        }}
                    />

                    <input
                        type='text'
                        placeholder='Review Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{
                            width: '50%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                        }}
                    />

                    <div style={{ width: '50%' }}>
                        <label htmlFor='rating' style={{ display: 'block', marginBottom: '5px' }}>
                            Rating:
                        </label>
                        <select
                            id='rating'
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            style={{
                                width: '100%',
                                padding: '8px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                            }}>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Average</option>
                            <option value='4'>4 - Good</option>
                            <option value='5'>5 - Excellent</option>
                        </select>
                    </div>

                    <textarea
                        name='reviewText'
                        id='reviewInput'
                        placeholder='Provide your text...'
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}></textarea>

                    <button onClick={addReview} style={{ alignSelf: 'flex-start' }}>
                        Send review
                    </button>
                </div>
            </div>

            {reviews.map((rev) => (
                <div key={rev.id} className='reviewField'>
                    <div className='info'>
                        <div className='user'>
                            <img src={avatar} alt='аватар' />
                            <div className='infoBox'>
                                <p className='author'>{rev.name}</p>
                                <p className='rating'>{`${rev.rating} Rating`}</p>
                            </div>
                        </div>
                        <p className='date'>{rev.date}</p>
                    </div>
                    <div className='content'>
                        <div className='title'>{rev.title}</div>
                        <p>{rev.review}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
