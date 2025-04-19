import { useState } from 'react';
import avatar from './assets/img/avatarIcon.svg';

type ReviewType = {
    id: number;
    name: string;
    review: string;
    title: string;
    rating: number;
    date: string;
};

export const Review = () => {
    const [reviewText, setReviewText] = useState<string>('');
    const [reviewsList, setReviewsList] = useState<ReviewType[]>([
        {
            id: 1,
            name: 'John Doe',
            review: 'This is a great product! I love it.',
            title: 'Amazing Product',
            rating: 5,
            date: '2023-10-01',
        },
        {
            id: 2,
            name: 'Jane Smith',
            review: 'Not bad, but could be better.',
            title: 'Good Product',
            rating: 3,
            date: '2023-10-02',
        },
        {
            id: 3,
            name: 'Alice Johnson',
            review: 'I had a terrible experience with this product.',
            title: 'Terrible Product',
            rating: 1,
            date: '2023-10-03',
        },
    ]);

    const addReview = () => {
        if (!reviewText.trim()) return;

        const newReview: ReviewType = {
            id: reviewsList.length + 1,
            name: 'Current User',
            review: reviewText,
            title: 'New Review',
            rating: 5,
            date: new Date().toISOString().split('T')[0],
        };

        setReviewsList([newReview, ...reviewsList]);

        setReviewText('');
    };

    return (
        <div className='reviewBox'>
            <div className='review'>
                <h3>{`Reviews (${reviewsList.length})`}</h3>
                <textarea
                    name='reviewText'
                    id='reviewInput'
                    placeholder='Provide your text...'
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}></textarea>
                <button onClick={addReview}>Send review</button>
            </div>
            {reviewsList.map((rev) => {
                return (
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
                );
            })}
        </div>
    );
};
