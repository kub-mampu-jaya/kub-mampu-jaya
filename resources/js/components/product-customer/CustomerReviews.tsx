import { Button } from '@/components/ui/button';
import { Review, ReviewProps } from '@/types';
import { MessageSquare, Star, ThumbsUp } from 'lucide-react';

type CustomerReviewsProps = {
    reviews: Review[];
};

export function CustomerReviews(reviews: ReviewProps) {
    const reviewHighlights = [
        { text: 'Quick & easy', count: 45 },
        { text: 'Tastes incredible!', count: 38 },
        { text: 'Healthy option', count: 32 },
        { text: 'Perfect for lunch', count: 28 },
    ];

    const ratingSum = reviews.map((r) => r.rating).reduce((a, b) => a + b, 0);
    const averageRating = !reviews.length ? 0 : ratingSum / reviews.length;

    return (
        <div className="mt-12 rounded-lg border border-primary bg-gradient-to-br from-amber-50 to-orange-50 p-6">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                {/* Left Section - Rating Summary */}
                <div className="flex-1">
                    <div className="mb-4 flex items-center gap-4">
                        <div
                            className="text-[#1B263B ] text-[48px]"
                            style={{ fontWeight: 700 }}
                        >
                            {averageRating}
                        </div>
                        <div>
                            <div className="mb-1 flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`h-6 w-6 ${
                                            star <= averageRating
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-700">
                                Based on {reviews.length} reviews
                            </p>
                        </div>
                    </div>

                    {/* Review Highlights */}
                    <div className="mb-4 flex flex-wrap gap-2">
                        {reviewHighlights.map((highlight, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 rounded-full border border-primary bg-white px-3 py-2"
                            >
                                <ThumbsUp className="h-4 w-4 text-primary" />
                                <span className="text-[14px] text-[#1B263B]">
                                    {highlight.text}
                                </span>
                                <span className="text-[12px] text-gray-500">
                                    ({highlight.count})
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section - CTA */}
                <div className="flex flex-col items-start gap-3 md:items-end">
                    <div className="flex items-center gap-2 text-gray-700">
                        <MessageSquare className="h-5 w-5" />
                        <span>See what our customers are saying</span>
                    </div>
                    <Button
                        className="bg-primary px-6 text-white hover:bg-orange-400"
                        style={{ fontWeight: 600 }}
                    >
                        View All Reviews
                    </Button>
                </div>
            </div>

            {/* Quick Review Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-primary pt-6 md:grid-cols-4">
                <div className="text-center">
                    <div
                        className="text-[24px] text-primary"
                        style={{ fontWeight: 700 }}
                    >
                        92%
                    </div>
                    <div className="text-[14px] text-gray-600">
                        Would Recommend
                    </div>
                </div>
                <div className="text-center">
                    <div
                        className="text-[24px] text-primary"
                        style={{ fontWeight: 700 }}
                    >
                        4.6
                    </div>
                    <div className="text-[14px] text-gray-600">
                        Taste Rating
                    </div>
                </div>
                <div className="text-center">
                    <div
                        className="text-[24px] text-primary"
                        style={{ fontWeight: 700 }}
                    >
                        4.8
                    </div>
                    <div className="text-[14px] text-gray-600">Convenience</div>
                </div>
                <div className="text-center">
                    <div
                        className="text-[24px] text-primary"
                        style={{ fontWeight: 700 }}
                    >
                        4.4
                    </div>
                    <div className="text-[14px] text-gray-600">
                        Value for Money
                    </div>
                </div>
            </div>
        </div>
    );
}
