import ReviewModel, { ReviewType } from '../models/ReviewModel';

class ReviewController {
    getReviews(productId: number): ReviewType[] {
        return ReviewModel.getReviewsForProduct(productId);
    }

    addReview(
        productId: number,
        review: {
            name: string;
            title: string;
            review: string;
            rating: number;
        },
    ): void {
        ReviewModel.addReview(productId, review);
    }

    addReviewChangeListener(listener: () => void): () => void {
        return ReviewModel.addListener(listener);
    }
}

export default new ReviewController();
