import { Button } from '@/components/ui/button';
import { ProductWithRating } from '@/pages/homepage/product-details';
import type { ReviewProps, User } from '@/types/index';
import { formatDate } from '@/utils/format-created-at';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, MessageSquare, Star } from 'lucide-react';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import Swal from 'sweetalert2';
// import 'slick-carousel/slick/slick-theme.css';
// import 'slick-carousel/slick/slick.css';

type CustomerReviewsProps = {
    reviews: ReviewProps;
    product: ProductWithRating;
};

export function CustomerReviews({ reviews, product }: CustomerReviewsProps) {
    const reviewHighlights = [
        { text: 'Cepat & mudah', count: 45 },
        { text: 'Rasanya luar biasa!', count: 38 },
        { text: 'Pilihan sehat', count: 32 },
        { text: 'Cocok untuk makan siang', count: 28 },
    ];

    const customerReviews = reviews ?? [
        {
            id: 1,
            name: 'Priya Sharma',
            rating: 5,
            date: '10 Desember 2024',
            comment:
                'Sangat suka produk ini! Sayurannya segar dan penuh rasa. Cocok untuk hari kerja yang sibuk saat tidak sempat memasak. Persiapan 7 menit benar-benar membantu!',
            helpful: 24,
        },
        {
            id: 2,
            name: 'Rajesh Kumar',
            rating: 4,
            date: '8 Desember 2024',
            comment:
                'Rasanya enak dan sangat praktis. Saran saya mungkin sedikit dikurangi rasa asinnya. Selebihnya sudah sempurna untuk makan siang cepat.',
            helpful: 18,
        },
        {
            id: 3,
            name: 'Anjali Patel',
            rating: 5,
            date: '5 Desember 2024',
            comment:
                'Sudah jadi menu wajib di dapur saya! Sehat, enak, dan sangat mudah dibuat. Anak-anak saya juga suka. Sangat direkomendasikan!',
            helpful: 31,
        },
        {
            id: 4,
            name: 'Vikram Singh',
            rating: 5,
            date: '3 Desember 2024',
            comment:
                'Produk yang luar biasa! Kualitas bahannya sangat baik. Saya suka karena sehat tanpa mengorbankan rasa.',
            helpful: 15,
        },
        {
            id: 5,
            name: 'Meera Reddy',
            rating: 4,
            date: '30 November 2024',
            comment:
                'Produk yang sangat baik. Porsinya pas untuk satu orang. Akan lebih menarik jika ada variasi sayuran yang lebih banyak.',
            helpful: 12,
        },
    ];

    const totalRating = reviews.reduce(
        (sum, item) => sum + Number(item.rating),
        0,
    );

    const averageRating = reviews.length
        ? Math.round((totalRating / reviews.length) * 10) / 10
        : 0;

    const basedOnReviewReviews =
        reviews.length <= 100 ? String(reviews.length) : '100+';
    const goodReviews = reviews.filter((review) => review.rating >= 4);

    const [userRating, setUserRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const sliderRef = useRef<Slider>(null);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);

    const { auth } = usePage().props;
    const user: User = auth.user;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const handleSubmitReview = async () => {
        if (userRating > 0 && reviewText.trim()) {
            setIsSubmittingComment(true);

            const payload = {
                user_id: user.id,
                product_id: product.id,
                rating: userRating,
                description: reviewText.trim(),
            };

            const response = await axios.post('/api/product/review', payload);
            console.log('response', response);

            Swal.fire({
                title: 'Terima kasih atas ulasan Anda! Ulasan berhasil dikirim.',
                icon: 'success',
            });
            setUserRating(0);
            setReviewText('');
            setIsSubmittingComment(false);
        } else {
            Swal.fire({
                title: 'Silakan beri penilaian dan tulis ulasan Anda.',
                icon: 'error',
            });
        }
    };

    return (
        <div className="mt-12">
            {/* Summary Section */}
            <div className="rounded-lg border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                    {/* Left Section - Rating Summary */}
                    <div className="flex-1">
                        <div className="mb-4 flex items-center gap-4">
                            <div
                                className="text-[48px] text-primary"
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
                                    Berdasarkan {basedOnReviewReviews} ulasan
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - CTA */}
                    <div className="flex flex-col items-start gap-3 md:items-end">
                        <div className="flex items-center gap-2 text-gray-700">
                            <MessageSquare className="h-5 w-5" />
                            <span>Lihat pendapat pelanggan kami</span>
                        </div>
                    </div>
                </div>

                {/* Quick Review Stats */}
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-amber-300 pt-6 md:grid-cols-4">
                    <div className="text-center">
                        <div
                            className="text-[24px] text-primary"
                            style={{ fontWeight: 700 }}
                        >
                            92%
                        </div>
                        <div className="text-[14px] text-gray-600">
                            Merekomendasikan
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
                            Penilaian Rasa
                        </div>
                    </div>
                    <div className="text-center">
                        <div
                            className="text-[24px] text-primary"
                            style={{ fontWeight: 700 }}
                        >
                            4.8
                        </div>
                        <div className="text-[14px] text-gray-600">Praktis</div>
                    </div>
                    <div className="text-center">
                        <div
                            className="text-[24px] text-primary"
                            style={{ fontWeight: 700 }}
                        >
                            4.4
                        </div>
                        <div className="text-[14px] text-gray-600">
                            Nilai Seimbang
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Reviews Carousel */}
            {/* <div className="mt-12">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-[24px]" style={{ fontWeight: 700 }}>
                        Ulasan Pelanggan
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => sliderRef.current?.slickPrev()}
                            className="rounded-full border border-gray-300 bg-white p-2 transition-colors hover:bg-gray-50"
                            aria-label="Ulasan sebelumnya"
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-700" />
                        </button>
                        <button
                            onClick={() => sliderRef.current?.slickNext()}
                            className="rounded-full border border-gray-300 bg-white p-2 transition-colors hover:bg-gray-50"
                            aria-label="Ulasan berikutnya"
                        >
                            <ChevronRight className="h-5 w-5 text-gray-700" />
                        </button>
                    </div>
                </div>
            </div> */}

            {/* Customer Reviews Carousel */}
            <div className="mt-12">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-[24px]" style={{ fontWeight: 700 }}>
                        Customer Reviews
                    </h3>
                    <div className="flex gap-2">
                        <button
                            onClick={() => sliderRef.current?.slickPrev()}
                            className="rounded-full border border-gray-300 bg-white p-2 transition-colors hover:bg-gray-50"
                            aria-label="Previous reviews"
                        >
                            <ChevronLeft className="h-5 w-5 text-gray-700" />
                        </button>
                        <button
                            onClick={() => sliderRef.current?.slickNext()}
                            className="rounded-full border border-gray-300 bg-white p-2 transition-colors hover:bg-gray-50"
                            aria-label="Next reviews"
                        >
                            <ChevronRight className="h-5 w-5 text-gray-700" />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <Slider ref={sliderRef} {...settings}>
                        {reviews.map((review) => (
                            <div key={review.user_id} className="px-2">
                                <div className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                                    <div className="mb-3 flex items-start justify-between">
                                        <div>
                                            <h4
                                                className="text-[16px]"
                                                style={{ fontWeight: 600 }}
                                            >
                                                {review.name}
                                            </h4>
                                            <p className="text-[14px] text-gray-500">
                                                {formatDate(review.created_at)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-3 flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-4 w-4 ${
                                                    star <= review.rating
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    <p className="mb-4 line-clamp-4 text-[14px] text-gray-700">
                                        {review.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            {/* Write a Review Section */}
            <div className="mt-12 rounded-lg border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-8">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-8 text-center">
                        <h3
                            className="mb-2 text-[28px]"
                            style={{ fontWeight: 700 }}
                        >
                            Bagikan Pengalaman Anda
                        </h3>
                        <p className="text-gray-600">
                            Bantu pengguna lain dengan membagikan ulasan jujur
                            Anda
                        </p>
                    </div>

                    <div className="rounded-xl border border-orange-100 bg-white p-8 shadow-sm">
                        {/* Rating Section */}
                        <div className="mb-6 border-b border-gray-200 pb-6">
                            <label
                                className="mb-3 block text-[16px] text-gray-800"
                                style={{ fontWeight: 600 }}
                            >
                                Beri penilaian produk ini
                            </label>
                            <div className="flex items-center gap-3">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setUserRating(star)}
                                        onMouseEnter={() =>
                                            setHoveredRating(star)
                                        }
                                        onMouseLeave={() => setHoveredRating(0)}
                                        className="transition-all hover:scale-110 focus:outline-none active:scale-95"
                                    >
                                        <Star
                                            className={`h-10 w-10 transition-colors ${
                                                star <=
                                                (hoveredRating || userRating)
                                                    ? 'fill-[#FF6900] text-[#FF6900]'
                                                    : 'text-gray-300 hover:text-gray-400'
                                            }`}
                                        />
                                    </button>
                                ))}
                                {userRating > 0 && (
                                    <div className="ml-3 flex items-center gap-2">
                                        <span
                                            className="text-[18px] text-[#FF6900]"
                                            style={{ fontWeight: 600 }}
                                        >
                                            {userRating === 5
                                                ? 'Sangat Baik!'
                                                : userRating === 4
                                                  ? 'Baik Sekali!'
                                                  : userRating === 3
                                                    ? 'Cukup'
                                                    : userRating === 2
                                                      ? 'Kurang'
                                                      : 'Buruk'}
                                        </span>
                                    </div>
                                )}
                            </div>
                            {userRating === 0 && (
                                <p className="mt-2 text-[13px] text-gray-500">
                                    Klik bintang untuk memberi nilai
                                </p>
                            )}
                        </div>

                        {/* Review Text Section */}
                        <div className="mb-6">
                            <label
                                className="mb-3 block text-[16px] text-gray-800"
                                style={{ fontWeight: 600 }}
                            >
                                Tulis ulasan Anda
                            </label>
                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                maxLength={500}
                                placeholder="Ceritakan pendapat Anda tentang rasa, kualitas, kepraktisan, dan pengalaman keseluruhan menggunakan produk ini..."
                                rows={6}
                                className="w-full resize-none rounded-lg border-2 border-gray-200 px-4 py-3 transition-all focus:border-[#FF6900] focus:ring-2 focus:ring-[#FF6900] focus:outline-none"
                            />
                            <div className="mt-2 flex items-center justify-between">
                                <p className="text-[13px] text-gray-500">
                                    {reviewText.length > 0
                                        ? `${reviewText.length}/500 karakter`
                                        : 'Minimal 10 karakter disarankan'}
                                </p>
                                {reviewText.length >= 10 && (
                                    <p className="text-[13px] text-green-600">
                                        ✓ Sudah bagus!
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-3">
                            <Button
                                onClick={() => {
                                    setUserRating(0);
                                    setReviewText('');
                                }}
                                className="bg-gray-100 px-6 text-gray-700 hover:bg-gray-200"
                                style={{ fontWeight: 600 }}
                            >
                                Bersihkan
                            </Button>
                            <Button
                                onClick={handleSubmitReview}
                                disabled={
                                    userRating === 0 ||
                                    reviewText.trim().length < 10 ||
                                    isSubmittingComment
                                }
                                className="bg-[#FF6900] px-8 text-white hover:bg-[#E55F00] disabled:cursor-not-allowed disabled:bg-gray-300"
                                style={{ fontWeight: 600 }}
                            >
                                {isSubmittingComment ? 'Mengirim...' : 'Kirim'}
                            </Button>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 text-center">
                        <p className="text-[13px] text-gray-500">
                            Masuk sebagai{' '}
                            <span style={{ fontWeight: 600 }}>
                                Nama Pengguna
                            </span>{' '}
                            • Ulasan Anda akan bersifat publik
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
