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
    const [name, setName] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [rating, setRating] = useState<number>(5);
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
            name: name.trim() ? name : 'Anonymous User',
            review: reviewText,
            title: title.trim() ? title : 'New Review',
            rating: rating,
            date: new Date().toISOString().split('T')[0],
        };

        setReviewsList([newReview, ...reviewsList]);

        // Reset form fields
        setReviewText('');
        setName('');
        setTitle('');
        setRating(5);
    };

    return (
        <div className='reviewBox'>
            <div className='review'>
                <h3>{`Reviews (${reviewsList.length})`}</h3>
                
                <div className="review-form" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ 
                            width: '50%', 
                            padding: '8px', 
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                    
                    <input
                        type="text"
                        placeholder="Review Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ 
                            width: '50%', 
                            padding: '8px', 
                            borderRadius: '4px',
                            border: '1px solid #ccc'
                        }}
                    />
                    
                    <div style={{ width: '50%' }}>
                        <label htmlFor="rating" style={{ display: 'block', marginBottom: '5px' }}>Rating:</label>
                        <select
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            style={{ 
                                width: '100%', 
                                padding: '8px', 
                                borderRadius: '4px',
                                border: '1px solid #ccc'
                            }}
                        >
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Average</option>
                            <option value="4">4 - Good</option>
                            <option value="5">5 - Excellent</option>
                        </select>
                    </div>
                    
                    <textarea
                        name='reviewText'
                        id='reviewInput'
                        placeholder='Provide your text...'
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
                    
                    <button 
                        onClick={addReview}
                        style={{ alignSelf: 'flex-start' }}
                    >
                        Send review
                    </button>
                </div>
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
