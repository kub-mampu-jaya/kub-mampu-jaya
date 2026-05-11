import { useState } from 'react';
// import { CheckoutPage } from './components/CheckoutPage';
import { CheckoutPageDummy } from '@/components/product-customer/CheckoutPageDummy';
import { CustomerReviews } from '@/components/product-customer/CustomerReviews';
import { LocationPage } from '@/components/product-customer/LocationPage';
import { ProductDetails } from '@/components/product-customer/ProductDetails';
import { ProductImageGallery } from '@/components/product-customer/ProductImageGallery';
import { ProductOverview } from '@/components/product-customer/ProductOverview';
import { SuggestedProducts } from '@/components/product-customer/SuggestedProducts';
import HomepageLayout from '@/layouts/client-side/HomepageLayout';
import type { Product, Review, User } from '@/types/index';
import { ReactNode } from 'react';

type ProductWithRating = Product & {
    rating: Number;
};

type ProductDetailsProps = Product & {
    user: User;
    productImages: string[];
    product: ProductWithRating;
    reviews: Review[];
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

    return (
        <div className="flex min-h-screen flex-col bg-white">
            {currentPage === 'product' && (
                <main className="flex-1">
                    {/* Breadcrumb */}
                    <div className="border-b bg-gray-50">
                        <div className="container mx-auto px-4 py-3">
                            <div className="text-md flex items-center gap-2 text-gray-600">
                                <a href="#" className="hover:text-green-600">
                                    Home
                                </a>
                                <span>/</span>
                                <a href="#" className="hover:text-green-600">
                                    Products
                                </a>
                                <span>/</span>
                                {/* <a href="#" className="hover:text-green-600">
                                    Instant Khichdi
                                </a>
                                <span>/</span> */}
                                <span className="text-gray-900">
                                    {product.name}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Product Main Section */}
                    <div className="container mx-auto px-4 py-8">
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                            {/* Left Column - Product Images */}
                            <div>
                                <ProductImageGallery images={productImages} />
                            </div>

                            {/* Right Column - Product Overview */}
                            <div>
                                <ProductOverview
                                    product={product}
                                    reviews={reviews}
                                    onNavigateToCheckout={() =>
                                        setCurrentPage('checkout')
                                    }
                                />
                            </div>
                        </div>

                        {/* Product Details Tabs */}
                        <ProductDetails />

                        {/* Customer Reviews */}
                        <CustomerReviews reviews={reviews} />

                        {/* Suggested Products */}
                        <SuggestedProducts products={suggestedProducts} />
                    </div>
                </main>
            )}

            {currentPage === 'checkout' && (
                <main className="flex-1">
                    <CheckoutPageDummy
                        user={user}
                        product={product}
                        onNavigateToLocation={() => setCurrentPage('location')}
                        onNavigateToHome={() => setCurrentPage('product')}
                    />
                </main>
            )}

            {currentPage === 'location' && (
                <main className="flex-1">
                    <LocationPage
                        // user={user}
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
