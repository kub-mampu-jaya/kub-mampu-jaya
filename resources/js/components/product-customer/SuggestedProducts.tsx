import { ProductCard } from '@/components/ui/product-card-homepage';
import { Product } from '@/types';

interface SuggestedProductsProps {
    products: Product[];
}

export function SuggestedProducts({ products }: SuggestedProductsProps) {
    console.log('Suggested products:', products);
    return (
        <div className="mt-16">
            <div className="mb-8 text-center">
                <h2
                    className="mb-2 text-[28px] text-gray-900"
                    style={{ fontWeight: 700 }}
                >
                    Produk Lain yang Mungkin Anda Suka
                </h2>
                <p className="text-gray-600">
                    Temukan lebih banyak varian khichdi lezat dari Kamlesh
                    Khichdi Wala
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price_discount={product.price_discount}
                        image={product.image}
                        rating={product.rating ?? 0}
                        category={product.category}
                    />
                ))}
            </div>
        </div>
    );
}
