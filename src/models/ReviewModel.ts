export type ReviewType = {
    id: number;
    name: string;
    review: string;
    title: string;
    rating: number;
    date: string;
};

class ReviewModel {
    private reviews: Map<number, ReviewType[]> = new Map();
    private listeners: (() => void)[] = [];

    // Начальные отзывы для демонстрации
    private defaultReviews: ReviewType[] = [
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
    ];

    getReviewsForProduct(productId: number): ReviewType[] {
        if (!this.reviews.has(productId)) {
            this.reviews.set(productId, [...this.defaultReviews]);
        }
        return this.reviews.get(productId) || [];
    }

    addReview(productId: number, review: Omit<ReviewType, 'id' | 'date'>): void {
        const currentReviews = this.getReviewsForProduct(productId);

        const newReview: ReviewType = {
            ...review,
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
        };

        this.reviews.set(productId, [newReview, ...currentReviews]);
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

export default new ReviewModel();
