import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Product, User } from '@/types';
import { formatPrice } from '@/utils/format-price';
import { pay } from '@/utils/midtrans';
import { Link, router } from '@inertiajs/react';
import { Banknote, CreditCard, MapPin } from 'lucide-react';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface CheckoutPageProps {
    user: User;
    product: Product;
    buyQuantity: number;
    onNavigateToLocation: () => void;
    onNavigateToHome: () => void;
}

export function OneCheckoutPage({
    user,
    product,
    buyQuantity,
    onNavigateToLocation,
    onNavigateToHome,
}: CheckoutPageProps) {
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<'primary' | 'alt'>(
        'primary',
    );

    const handlePlaceOrder = async () => {
        setIsPlacingOrder(true);
        try {
            const response = await fetch('/api/orders/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': (
                        document.querySelector(
                            'meta[name="csrf-token"]',
                        ) as HTMLMetaElement
                    )?.content,
                },
                body: JSON.stringify({
                    cart_items: [
                        {
                            product_id: product.id,
                            quantity: buyQuantity,
                        },
                    ],
                    delivery_fee: deliveryFee,
                    payment_method: paymentMethod,
                    delivery_address: activeDeliveryAddress,
                    subtotal: subtotal,
                    total: total,
                }),
            });

            if (!response.ok) {
                throw new Error('Gagal membuat pesanan');
            }

            const data = await response.json();
            console.log('data', data);

            if (paymentMethod === 'cod') {
                router.visit('/product/status');
            } else {
                pay(data.snap_token, {
                    async onSuccess(result) {
                        router.visit('/product/status');
                    },
                    async onError(result) {
                        await Swal.fire({
                            title: 'Pembayaran gagal. Mohon coba lagi',
                            icon: 'error',
                        });
                    },
                    onClose() {},
                });
            }
        } catch (error) {
            console.error(error);
            await Swal.fire({
                title: 'Gagal membuat pesanan. Mohon coba lagi',
                icon: 'error',
            });
        } finally {
            setIsPlacingOrder(false);
        }
    };

    // console.log(user);
    const activeDeliveryAddress =
        selectedAddress === 'primary'
            ? {
                  name: user.name,
                  phone: user.phone_number,
                  street: user.street,
                  city: user.city,
                  state: user.state,
              }
            : {
                  name: user.name,
                  phone: user.phone_number,
                  street: user.alt_street,
                  city: user.alt_city,
                  state: user.alt_state,
              };

    const applyCoupon = () => {
        if (couponCode.toUpperCase() === 'SAVE20') {
            setAppliedCoupon('SAVE20');
        } else if (couponCode.toUpperCase() === 'FIRST50') {
            setAppliedCoupon('FIRST50');
        } else {
            alert('Kode kupon tidak valid');
        }
    };

    // Calculate totals
    const subtotal =
        (product.price_discount ?? product.price_origin) * buyQuantity;
    const savings =
        (product.price_origin || product.price_discount) -
        product.price_discount;
    const deliveryFee = subtotal > 20000 ? 0 : 11000;
    const couponDiscount =
        appliedCoupon === 'SAVE20'
            ? subtotal * 0.2
            : appliedCoupon === 'FIRST50'
              ? 50
              : 0;
    const total = subtotal + deliveryFee - couponDiscount;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <button
                        onClick={onNavigateToHome}
                        className="text-primaryf mb-2 hover:underline"
                    >
                        ← Lanjutkan Belanja
                    </button>
                    <h1
                        className="text-[32px] text-gray-900"
                        style={{ fontWeight: 700 }}
                    >
                        Checkout
                    </h1>
                    <p className="mt-1 text-gray-600">
                        Selesaikan pesanan Anda hanya dalam beberapa langkah
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                    {/* Left Column */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Delivery Address Section */}
                        <Card className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            {/* PRIMARY ADDRESS */}
                            <div
                                onClick={() => setSelectedAddress('primary')}
                                className={`cursor-pointer rounded-lg border p-4 transition ${
                                    selectedAddress === 'primary'
                                        ? 'border-primary bg-gradient-to-br from-orange-50 to-yellow-50'
                                        : 'border-gray-200'
                                }`}
                            >
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-1 h-5 w-5 text-primary" />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">
                                                {user.name}
                                            </span>
                                            {selectedAddress === 'primary' && (
                                                <Badge className="bg-primary text-[11px] text-white">
                                                    Dipilih
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-700">
                                            {user.phone_number}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {user.street}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {user.city}, {user.state}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* second alt address */}

                            {/* ALT ADDRESS */}
                            {user.alt_street &&
                            user.alt_city &&
                            user.alt_state ? (
                                <div
                                    onClick={() => setSelectedAddress('alt')}
                                    className={`mt-3 cursor-pointer rounded-lg border p-4 transition ${
                                        selectedAddress === 'alt'
                                            ? 'border-primary bg-gradient-to-br from-orange-50 to-yellow-50'
                                            : 'border-gray-200'
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <MapPin className="mt-1 h-5 w-5 text-primary" />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">
                                                    {user.name}
                                                </span>
                                                {selectedAddress === 'alt' && (
                                                    <Badge className="bg-primary text-[11px] text-white">
                                                        Dipilih
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-700">
                                                {user.phone_number}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {user.alt_street}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                {user.alt_city},{' '}
                                                {user.alt_state}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link href="/profile#address-section">
                                    <div className="mt-3 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-4 text-sm text-gray-500 hover:border-primary">
                                        Tambahkan alamat kedua
                                    </div>
                                </Link>
                            )}

                            {/* <Link href="/profile">
                                <div className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition-colors hover:border-primary hover:bg-orange-50">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                                            <MapPin className="h-4 w-4 text-white" />
                                        </div>

                                        <div className="flex-1">
                                            <div className="mb-1 flex items-center gap-2">
                                                <span
                                                    className="text-gray-700"
                                                    style={{ fontWeight: 600 }}
                                                >
                                                    Tambahkan alamat kedua?
                                                </span>
                                                <Badge className="bg-gray-200 text-[11px] text-gray-600">
                                                    Opsional
                                                </Badge>
                                            </div>

                                            <p className="mb-1 text-[14px] text-gray-500">
                                                Anda dapat menambahkan alamat
                                                cadangan
                                            </p>

                                            <p className="text-[14px] text-gray-400">
                                                Contoh: alamat kantor, kos, atau
                                                rumah keluarga
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link> */}
                        </Card>

                        {/* Cart Items */}
                        <Card className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2
                                className="mb-4 text-[20px] text-gray-900"
                                style={{ fontWeight: 600 }}
                            >
                                Item Pesanan
                            </h2>

                            <div className="space-y-4">
                                <div
                                    key={product.id}
                                    className="flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                                >
                                    <div className="h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
                                        <img
                                            src={product.image || ''}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <h3
                                            className="mb-1 text-gray-900"
                                            style={{ fontWeight: 600 }}
                                        >
                                            {product.name}
                                        </h3>
                                        <p className="mb-2 text-[14px] text-gray-500">
                                            {product.category}
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <span
                                                className="text-primary"
                                                style={{ fontWeight: 600 }}
                                            >
                                                {formatPrice(
                                                    product.price_discount,
                                                )}
                                            </span>
                                            {product.price_origin && (
                                                <>
                                                    <span className="text-[14px] text-gray-400 line-through">
                                                        {formatPrice(
                                                            product.price_origin,
                                                        )}
                                                    </span>
                                                    <Badge className="bg-orange-100 text-[11px] text-primary">
                                                        {Math.round(
                                                            ((product.price_origin -
                                                                product.price_discount) /
                                                                product.price_origin) *
                                                                100,
                                                        )}
                                                        % OFF
                                                    </Badge>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p
                                            className="text-gray-900"
                                            style={{ fontWeight: 600 }}
                                        >
                                            {formatPrice(
                                                product.price_discount,
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Payment Method */}
                        <Card className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2
                                className="mb-4 text-[20px] text-gray-900"
                                style={{ fontWeight: 600 }}
                            >
                                Metode Pembayaran
                            </h2>

                            <RadioGroup
                                value={paymentMethod}
                                onValueChange={setPaymentMethod}
                                className="space-y-3"
                            >
                                <div className="flex items-center space-x-3 rounded-lg border-2 border-gray-200 p-4 hover:border-primary">
                                    <RadioGroupItem value="cod" id="cod" />
                                    <Label
                                        htmlFor="cod"
                                        className="flex flex-1 items-center gap-3"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                                            <Banknote className="h-5 w-5 text-[#D97706]" />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 600 }}>
                                                Bayar di Tempat (COD)
                                            </p>
                                            <p className="text-[14px] text-gray-500">
                                                Bayar saat pesanan diterima
                                            </p>
                                        </div>
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-3 rounded-lg border-2 border-gray-200 p-4 hover:border-primary">
                                    <RadioGroupItem
                                        value="transfer"
                                        id="transfer"
                                    />
                                    <Label
                                        htmlFor="transfer"
                                        className="flex flex-1 items-center gap-3"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                                            <CreditCard className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 600 }}>
                                                Transfer
                                            </p>
                                            <p className="text-[14px] text-gray-500">
                                                Transfer dan tunggu makanan Anda
                                            </p>
                                        </div>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <h3
                                className="mb-4 text-[18px] text-gray-900"
                                style={{ fontWeight: 600 }}
                            >
                                Ringkasan Pesanan
                            </h3>

                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal (1 item)</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Biaya Pengiriman</span>
                                    {deliveryFee === 0 ? (
                                        <span className="font-semibold text-[#059669]">
                                            GRATIS
                                        </span>
                                    ) : (
                                        <span>{formatPrice(deliveryFee)}</span>
                                    )}
                                </div>

                                <Separator />

                                <div
                                    className="flex justify-between text-[18px]"
                                    style={{ fontWeight: 700 }}
                                >
                                    <span>Total Pembayaran</span>
                                    <span className="text-primary">
                                        {formatPrice(total)}
                                    </span>
                                </div>
                            </div>

                            <Button
                                onClick={handlePlaceOrder}
                                disabled={isPlacingOrder}
                                className="mt-5 w-full bg-primary py-6 text-[16px] text-white hover:bg-orange-600"
                                style={{ fontWeight: 600 }}
                            >
                                {isPlacingOrder
                                    ? 'Membuat pesanan...'
                                    : `Buat Pesanan • ${formatPrice(total)}`}
                            </Button>

                            <p className="mt-3 text-center text-[12px] text-gray-500">
                                Dengan melakukan pemesanan, Anda menyetujui
                                Syarat & Ketentuan kami
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
