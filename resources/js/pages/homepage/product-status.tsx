import { Button } from '@/components/ui/button';
import type { OrderNew } from '@/types';
import { OrderStatus } from '@/types';
import { Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    CheckCircle,
    ChefHat,
    Clock,
    Clock10,
    MapPin,
    ShoppingBag,
    Truck,
} from 'lucide-react';

interface OrderStatusPageProps {
    currentOrder: OrderNew | null;
    onNavigateToHome: () => void;
}

export default function OrderStatusPage({
    currentOrder,
}: OrderStatusPageProps) {
    const navigate = (url: string) => router.visit(url);
    if (!currentOrder) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
                <div className="w-full max-w-md animate-in space-y-8 text-center duration-500 fade-in zoom-in">
                    {/* Illustration Icon */}
                    <div className="relative mx-auto h-28 w-28">
                        <div className="absolute inset-0 animate-pulse rounded-full bg-orange-100" />
                        <div className="relative flex h-full w-full items-center justify-center rounded-full border border-orange-50 bg-white shadow-xl">
                            <ShoppingBag className="h-12 w-12 text-[#FF6900]" />
                            <div className="absolute -top-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#FF6900] shadow-lg">
                                <span className="text-sm font-bold text-white">
                                    !
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Text Information */}
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Belum Ada Pesanan
                        </h2>
                        <p className="text-lg leading-relaxed text-gray-500">
                            Perut mulai lapar? <br />
                            Yuk, jelajahi menu lezat kami dan buat pesanan
                            pertamamu sekarang!
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 pt-4">
                        <Button
                            onClick={() => navigate('/products')}
                            className="h-14 w-full rounded-2xl bg-[#FF6900] text-base font-bold text-white shadow-lg shadow-orange-200 transition-all hover:scale-[1.02] hover:bg-[#E55F00] active:scale-95"
                        >
                            Mulai Pesan Sekarang
                        </Button>

                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center justify-center gap-2 py-2 text-sm font-semibold text-gray-400 transition-colors hover:text-[#FF6900]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Beranda
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const getStatusIndex = (status: OrderStatus): number => {
        const statuses: OrderStatus[] = [
            'pending',
            'cooking',
            'on the way',
            'arrived',
        ];
        return statuses.indexOf(status);
    };

    const currentStatusIndex = getStatusIndex(currentOrder.status);

    const statusSteps = [
        {
            key: 'pending' as OrderStatus,
            label: 'Pending',
            icon: Clock10,
            description: 'Pesananmu sedang disiapkan',
        },
        {
            key: 'cooking' as OrderStatus,
            label: 'Sedang dimasak',
            icon: ChefHat,
            description: 'Orderan anda sedang di persiapkan di dapur',
        },
        {
            key: 'on the way' as OrderStatus,
            label: 'Dalam perjalanan',
            icon: Truck,
            description: 'Orderan anda sedang dalam perjalanan',
        },
        {
            key: 'arrived' as OrderStatus,
            label: 'Pesanan diterima',
            icon: CheckCircle,
            description: 'Orderan sudah sampai secara sukses',
        },
    ];

    const statusMap = Object.fromEntries(
        statusSteps.map((step) => [
            step.key,
            {
                label: step.label,
                description: step.description,
            },
        ]),
    ) as Record<OrderStatus, { label: string; description: string }>;

    const formatRupiah = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        }).format(value);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/products"
                        onClick={() => navigate('/')}
                        className="mb-4 inline-flex items-center gap-2 text-[#FF6900] hover:text-[#E55F00]"
                    >
                        ← Kembali
                    </Link>
                    <h1
                        className="mb-2 text-[32px]"
                        style={{ fontWeight: 700 }}
                    >
                        Status Pesanan Anda
                    </h1>
                    <p className="text-gray-600">Order {currentOrder.id}</p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Content - Order Tracking */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Status Progress */}
                        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                            <div className="mb-8 flex items-center justify-between">
                                <div>
                                    <h2
                                        className="mb-1 text-[20px]"
                                        style={{ fontWeight: 700 }}
                                    >
                                        {statusSteps[currentStatusIndex].label}
                                    </h2>
                                    <p className="text-gray-600">
                                        {
                                            statusSteps[currentStatusIndex]
                                                .description
                                        }
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="mb-1 flex items-center gap-2 text-[#FF6900]">
                                        <Clock className="h-5 w-5" />
                                        <span
                                            className="text-[18px]"
                                            style={{ fontWeight: 600 }}
                                        >
                                            {Math.ceil(
                                                Number(
                                                    currentOrder.estimated_delivery_at,
                                                ),
                                            )}{' '}
                                            Menit
                                        </span>
                                    </div>
                                    <p className="text-[14px] text-gray-500">
                                        Estimasi Sampai
                                    </p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative">
                                {/* Line */}
                                <div className="absolute top-6 right-0 left-0 h-1 bg-gray-200">
                                    <div
                                        className="h-full bg-[#FF6900] transition-all duration-500"
                                        style={{
                                            width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%`,
                                        }}
                                    />
                                </div>

                                {/* Steps */}
                                <div className="relative flex justify-between">
                                    {statusSteps.map((step, index) => {
                                        const isCompleted =
                                            index <= currentStatusIndex;
                                        const isCurrent =
                                            index === currentStatusIndex;
                                        const Icon = step.icon;

                                        return (
                                            <div
                                                key={step.key}
                                                className="flex flex-col items-center"
                                            >
                                                <div
                                                    className={`flex h-12 w-12 items-center justify-center rounded-full border-4 border-white shadow-md transition-all ${
                                                        isCompleted
                                                            ? 'bg-[#FF6900] text-white'
                                                            : 'bg-gray-200 text-gray-400'
                                                    } ${isCurrent ? 'scale-110' : ''}`}
                                                >
                                                    <Icon className="h-6 w-6" />
                                                </div>
                                                <p
                                                    className={`mt-3 text-center text-[14px] ${
                                                        isCompleted
                                                            ? 'text-gray-900'
                                                            : 'text-gray-500'
                                                    }`}
                                                    style={{
                                                        fontWeight: isCompleted
                                                            ? 600
                                                            : 400,
                                                    }}
                                                >
                                                    {step.label}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Delivery Information */}
                        {currentOrder.status === 'on the way' &&
                            currentOrder.driver_name && (
                                <div className="rounded-lg border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-6">
                                    <h3
                                        className="mb-4 text-[18px]"
                                        style={{ fontWeight: 700 }}
                                    >
                                        Delivery Partner
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF6900] text-[24px] text-white"
                                            style={{ fontWeight: 700 }}
                                        >
                                            {currentOrder.driver_name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <p
                                                className="mb-1 text-[16px]"
                                                style={{ fontWeight: 600 }}
                                            >
                                                {currentOrder.driver_name}
                                            </p>
                                            <p className="text-[14px] text-gray-600">
                                                {currentOrder.driver_number}
                                            </p>
                                        </div>
                                        <Button
                                            className="bg-[#FF6900] text-white hover:bg-[#E55F00]"
                                            style={{ fontWeight: 600 }}
                                        >
                                            Call Driver
                                        </Button>
                                    </div>
                                </div>
                            )}

                        {/* Tracking Updates */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <h3
                                className="mb-4 text-[18px]"
                                style={{ fontWeight: 700 }}
                            >
                                Update Pesanan
                            </h3>
                            <div className="space-y-4">
                                {currentOrder.tracking_updates.map(
                                    (update, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className="h-3 w-3 rounded-full bg-[#FF6900]" />
                                                {index <
                                                    currentOrder
                                                        .tracking_updates
                                                        .length -
                                                        1 && (
                                                    <div className="mt-1 h-full w-0.5 flex-1 bg-gray-200" />
                                                )}
                                            </div>
                                            <div className="flex-1 pb-6">
                                                <p
                                                    className="mb-1 text-[14px] text-gray-900"
                                                    style={{ fontWeight: 600 }}
                                                >
                                                    {
                                                        statusMap[update.status]
                                                            .description
                                                    }
                                                </p>
                                                <p className="text-[13px] text-gray-500">
                                                    {update.time}
                                                </p>
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-1 h-5 w-5 text-[#FF6900]" />
                                <div>
                                    <h3
                                        className="mb-1 text-[16px]"
                                        style={{ fontWeight: 700 }}
                                    >
                                        Alamat Pengiriman
                                    </h3>
                                    <p className="text-gray-700">
                                        {currentOrder.street}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <h3
                                className="mb-4 text-[18px]"
                                style={{ fontWeight: 700 }}
                            >
                                Jumlah Pesanan
                            </h3>

                            {/* Order Items */}
                            <div className="mb-6 space-y-4 border-b border-gray-200 pb-6">
                                {currentOrder.order_items.map((item, index) => (
                                    <div key={index} className="flex gap-3">
                                        <img
                                            src={item.image ?? 'none'}
                                            alt={item.name}
                                            className="h-16 w-16 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <p
                                                className="mb-1 text-[14px]"
                                                style={{ fontWeight: 600 }}
                                            >
                                                {item.name}
                                            </p>
                                            <p className="text-[13px] text-gray-500">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Details */}
                            <div className="mb-6 space-y-3 border-b border-gray-200 pb-6">
                                <div className="flex items-center justify-between text-[14px]">
                                    <span className="text-gray-600">
                                        Tanggal Pesan
                                    </span>
                                    <span className="text-gray-900">
                                        {currentOrder.created_at}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-[14px]">
                                    <span className="text-gray-600">
                                        Nomor Pesanan
                                    </span>
                                    <span className="text-gray-900">
                                        {currentOrder.id}
                                    </span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="mb-6 flex items-center justify-between">
                                <span
                                    className="text-[16px]"
                                    style={{ fontWeight: 700 }}
                                >
                                    Total Harga
                                </span>
                                <span
                                    className="text-[20px] text-[#FF6900]"
                                    style={{ fontWeight: 700 }}
                                >
                                    {formatRupiah(currentOrder.total)}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <Link
                                    href="/products"
                                    className="cursor-pointer"
                                >
                                    <Button
                                        onClick={() => navigate('/')}
                                        className="w-full bg-[#FF6900] text-white hover:bg-[#E55F00]"
                                        style={{ fontWeight: 600 }}
                                    >
                                        Lanjutkan Belanja
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
