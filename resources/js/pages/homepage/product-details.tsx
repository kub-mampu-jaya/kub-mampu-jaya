import { useState } from 'react';
// import { CheckoutPage } from './components/CheckoutPage';
import { CustomerReviews } from '@/components/product-customer/CustomerReview';
import { LocationPage } from '@/components/product-customer/LocationPage';
import { OneCheckoutPage } from '@/components/product-customer/OneCheckoutPage';
import { ProductDetails } from '@/components/product-customer/ProductDetails';
import { ProductImageGallery } from '@/components/product-customer/ProductImageGallery';
import { ProductOverview } from '@/components/product-customer/ProductOverview';
import { SuggestedProducts } from '@/components/product-customer/SuggestedProducts';
import HomepageLayout from '@/layouts/client-side/HomepageLayout';
import type { Product, ReviewProps, User } from '@/types/index';
import { ReactNode } from 'react';

export type ProductWithRating = Product & {
    rating: Number;
};

type ProductDetailsProps = Product & {
    user: User;
    productImages: string[];
    product: ProductWithRating;
    reviews: ReviewProps;
    suggestedProducts: Product[];
};

export default function ProductDetailsPage({
    user,
    productImages,
    product,
    reviews,
    suggestedProducts,
}: ProductDetailsProps) {
    const [currentPage, setCurrentPage] = useState<
        'product' | 'checkout' | 'location'
    >('product');
    const [buyQuantity, setBuyQuantity] = useState(1);

    return (
        <div className="flex min-h-screen flex-col bg-white">
            {currentPage === 'product' && (
                <main className="flex-1">
                    {/* Breadcrumb */}
                    <div className="border-b bg-gray-50">
                        <div className="container mx-auto px-4 py-3">
                            <div className="text-md flex items-center gap-2 text-gray-600">
                                <a href="#" className="hover:text-green-600">
                                    Beranda
                                </a>
                                <span>/</span>
                                <a href="#" className="hover:text-green-600">
                                    Produk
                                </a>
                                <span>/</span>
                                <span className="text-gray-900">
                                    {product.name}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bagian Utama Produk */}
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                            {/* Kolom Kiri - Gambar Produk */}
                            <div>
                                <ProductImageGallery images={productImages} />
                            </div>

                            {/* Kolom Kanan - Ringkasan Produk */}
                            <div>
                                <ProductOverview
                                    product={product}
                                    reviews={reviews}
                                    onNavigateToCheckout={() =>
                                        setCurrentPage('checkout')
                                    }
                                    buyQuantity={buyQuantity}
                                    onChangeBuyQuantity={setBuyQuantity}
                                />
                            </div>
                        </div>

                        {/* Detail Produk */}
                        <ProductDetails
                            ingredients={product.ingredients}
                            description={product.description}
                        />

                        {/* Ulasan Pelanggan */}
                        <CustomerReviews reviews={reviews} product={product} />

                        {/* Produk Rekomendasi */}
                        <SuggestedProducts products={suggestedProducts} />
                    </div>
                </main>
            )}

            {currentPage === 'checkout' && (
                <main className="flex-1">
                    <OneCheckoutPage
                        user={user}
                        product={product}
                        buyQuantity={buyQuantity}
                        onNavigateToLocation={() => setCurrentPage('location')}
                        onNavigateToHome={() => setCurrentPage('product')}
                    />
                </main>
            )}

            {currentPage === 'location' && (
                <main className="flex-1">
                    <LocationPage
                        onNavigateToCheckout={() => setCurrentPage('checkout')}
                        onNavigateToHome={() => setCurrentPage('product')}
                    />
                </main>
            )}
        </div>
    );
}

ProductDetailsPage.layout = (page: ReactNode) => (
    <HomepageLayout>{page}</HomepageLayout>
);
