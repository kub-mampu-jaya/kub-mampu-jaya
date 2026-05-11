import { CheckoutPage } from '@/components/product-customer/CheckoutPage';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import HomepageLayout from '@/layouts/client-side/HomepageLayout';
import { Cart, User } from '@/types';
import { formatPrice } from '@/utils/format-price';
import { Link, router } from '@inertiajs/react';
import {
    ChevronRight,
    Minus,
    Plus,
    ShoppingBag,
    ShoppingCart,
    Trash2,
} from 'lucide-react';
import { ReactNode, useState } from 'react';

type productCartProps = {
    user: User;
    cart: Cart;
};

export default function CartPage({ user, cart }: productCartProps) {
    const [currentPage, setCurrentPage] = useState<
        'product-cart' | 'checkout' | 'location' | '/'
    >('product-cart');

    const [cartItems, setCartItems] = useState(
        !cart
            ? []
            : cart.items.map((item) => ({
                  ...item,
                  selected: true,
                  inStock: item.product.quantity > 0,
              })),
    );

    const updateQuantity = (id: number, newQuantity: number) => {
        console.log('cartItems', cartItems, id, newQuantity);
        const item = cartItems.find((item) => item.id);
        if (newQuantity < 1) return;
        if (item && newQuantity > item.product.quantity) return;
        setCartItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item,
            ),
        );
    };

    const removeItem = (id: number) => {
        try {
            console.log('removeItem');
            const data = {
                _method: 'delete',
            };
            router.post(`/cart/remove/${id}`, data, { preserveScroll: true });
            setCartItems(cartItems.filter((item) => item.id !== id));
        } catch (error) {
            console.log('removeItem error', error);
        }
    };

    const toggleItemSelection = (id: number) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, selected: !item.selected } : item,
            ),
        );
    };

    const toggleSelectAll = () => {
        const allSelected = cartItems.every((item) => item.selected);
        setCartItems((items) =>
            items.map((item) =>
                item.inStock ? { ...item, selected: !allSelected } : item,
            ),
        );
    };

    const selectedItems = cartItems.filter(
        (item) => item.selected && item.inStock,
    );

    const subtotal = selectedItems.reduce(
        (sum, item) => sum + item.product.price_discount * item.quantity,
        0,
    );

    const deliveryFee = subtotal > 299 ? 0 : 40;
    const total = subtotal + deliveryFee;

    const allInStockSelected = cartItems
        .filter((item) => item.inStock)
        .every((item) => item.selected);

    return (
        <div className="min-h-screen bg-gray-50">
            {currentPage === 'product-cart' && (
                <div className="container mx-auto px-4 py-6 sm:py-8">
                    {/* HEADER */}
                    <div className="mb-6">
                        <Link href="/products">
                            <button className="mb-2 text-sm text-[#FF6900] hover:underline">
                                ← Kembali
                            </button>
                        </Link>

                        <h1 className="text-2xl font-bold text-gray-900 sm:text-[32px]">
                            Keranjang Pesanan
                        </h1>

                        <p className="mt-1 text-sm text-gray-600 sm:text-base">
                            {cartItems.length} produk di keranjang
                        </p>
                    </div>

                    {cartItems.length === 0 ? (
                        <Card className="rounded-xl border bg-white p-8 text-center sm:p-12">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 sm:h-24 sm:w-24">
                                <ShoppingCart className="h-10 w-10 text-[#FF6900] sm:h-12 sm:w-12" />
                            </div>
                            <h2 className="mb-2 text-lg font-semibold sm:text-2xl">
                                Keranjang masih kosong
                            </h2>
                            <p className="mb-6 text-sm text-gray-600 sm:text-base">
                                Temukan produk menarik untukmu
                            </p>
                            <Link href="/products">
                                <Button className="bg-[#FF6900] text-white hover:bg-[#E55D00]">
                                    <ShoppingBag className="mr-2 h-4 w-4" />
                                    Lihat Produk
                                </Button>
                            </Link>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                            {/* CART LIST */}
                            <div className="space-y-4 lg:col-span-2">
                                <Card className="rounded-xl border bg-white p-4">
                                    <div className="flex items-center gap-3">
                                        <Checkbox
                                            checked={allInStockSelected}
                                            onCheckedChange={toggleSelectAll}
                                        />
                                        <Label className="cursor-pointer text-sm font-medium">
                                            Pilih semua produk (
                                            {
                                                cartItems.filter(
                                                    (i) => i.inStock,
                                                ).length
                                            }
                                            )
                                        </Label>
                                    </div>
                                </Card>

                                <Card className="rounded-xl border bg-white p-4 sm:p-6">
                                    <div className="space-y-6">
                                        {cartItems.map((item, index) => (
                                            <div key={item.id}>
                                                <div className="flex gap-3 sm:gap-4">
                                                    <Checkbox
                                                        checked={item.selected}
                                                        onCheckedChange={() =>
                                                            toggleItemSelection(
                                                                item.id,
                                                            )
                                                        }
                                                        disabled={!item.inStock}
                                                    />

                                                    <img
                                                        src={
                                                            item.product
                                                                .image || ''
                                                        }
                                                        alt={item.product.name}
                                                        className={`h-20 w-20 rounded-lg object-cover ${
                                                            !item.inStock
                                                                ? 'opacity-50 grayscale'
                                                                : ''
                                                        }`}
                                                    />

                                                    <div className="min-w-0 flex-1">
                                                        <h3 className="truncate text-sm font-semibold sm:text-base">
                                                            {item.product.name}
                                                        </h3>

                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold text-[#FF6900]">
                                                                {formatPrice(
                                                                    item.product
                                                                        .price_discount,
                                                                )}
                                                            </span>
                                                            {item.product
                                                                .price_origin && (
                                                                <span className="text-xs text-gray-400 line-through">
                                                                    {formatPrice(
                                                                        item
                                                                            .product
                                                                            .price_origin,
                                                                    )}
                                                                </span>
                                                            )}
                                                        </div>

                                                        {item.inStock ? (
                                                            <div className="mt-2 flex items-center gap-2">
                                                                <div className="flex items-center overflow-hidden rounded-lg border">
                                                                    <button
                                                                        onClick={() =>
                                                                            updateQuantity(
                                                                                Number(
                                                                                    item.id,
                                                                                ),
                                                                                Number(
                                                                                    item.quantity,
                                                                                ) -
                                                                                    1,
                                                                            )
                                                                        }
                                                                        className="flex h-8 w-8 items-center justify-center"
                                                                    >
                                                                        <Minus className="h-4 w-4" />
                                                                    </button>
                                                                    <span className="w-10 text-center text-sm font-medium">
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </span>
                                                                    <button
                                                                        onClick={() =>
                                                                            updateQuantity(
                                                                                Number(
                                                                                    item.id,
                                                                                ),
                                                                                Number(
                                                                                    item.quantity,
                                                                                ) +
                                                                                    1,
                                                                            )
                                                                        }
                                                                        className="flex h-8 w-8 items-center justify-center"
                                                                    >
                                                                        <Plus className="h-4 w-4" />
                                                                    </button>
                                                                </div>

                                                                <button
                                                                    onClick={() =>
                                                                        removeItem(
                                                                            item.id,
                                                                        )
                                                                    }
                                                                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <Badge className="mt-2 bg-red-100 text-red-600">
                                                                Stok Habis
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    <div className="text-sm font-semibold">
                                                        {formatPrice(
                                                            item.product
                                                                .price_discount *
                                                                item.quantity,
                                                        )}
                                                    </div>
                                                </div>

                                                {index <
                                                    cartItems.length - 1 && (
                                                    <Separator className="mt-4" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>

                            {/* SUMMARY */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-20 space-y-4">
                                    <Card className="rounded-xl border bg-white p-4">
                                        <h3 className="mb-3 text-base font-semibold">
                                            Rincian Harga
                                        </h3>

                                        {selectedItems.length === 0 && (
                                            <p className="text-center text-sm text-gray-500">
                                                Belum ada produk dipilih
                                            </p>
                                        )}

                                        {selectedItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex justify-between text-sm text-gray-600"
                                            >
                                                <span>
                                                    {item.product.name} ×{' '}
                                                    {item.quantity}
                                                </span>
                                                <span>
                                                    {formatPrice(
                                                        item.product
                                                            .price_discount *
                                                            item.quantity,
                                                    )}
                                                </span>
                                            </div>
                                        ))}

                                        <Separator className="my-3" />

                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span className="text-[#FF6900]">
                                                {formatPrice(total)}
                                            </span>
                                        </div>

                                        <Button
                                            disabled={
                                                selectedItems.length === 0
                                            }
                                            className="mt-4 w-full bg-[#FF6900] text-white hover:bg-[#E55D00]"
                                            onClick={() =>
                                                setCurrentPage('checkout')
                                            }
                                        >
                                            {selectedItems.length === 0
                                                ? 'Pilih produk terlebih dahulu'
                                                : 'Lanjut ke Checkout'}
                                            <ChevronRight className="ml-2 h-5 w-5" />
                                        </Button>
                                    </Card>

                                    {/* SECURITY INFO */}
                                    <Card className="rounded-xl border border-orange-200 bg-orange-50 p-4 text-sm">
                                        <ul className="space-y-2 text-gray-700">
                                            <li>✓ Pembayaran Aman</li>
                                            <li>✓ Pengembalian Mudah</li>
                                            <li>✓ Produk Berkualitas</li>
                                        </ul>
                                    </Card>

                                    <Link href="/products">
                                        <Button
                                            variant="outline"
                                            className="w-full border-dashed border-[#FF6900] text-[#FF6900]"
                                        >
                                            Tambah Produk
                                            <Plus className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {currentPage === 'checkout' && (
                <CheckoutPage
                    user={user}
                    cartItems={selectedItems}
                    onNavigateToLocation={() => setCurrentPage('location')}
                    onNavigateToHome={() => setCurrentPage('/')}
                />
            )}
        </div>
    );
}

function Label({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <label className={className}>{children}</label>;
}

CartPage.layout = (page: ReactNode) => <HomepageLayout>{page}</HomepageLayout>;
