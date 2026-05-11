import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { User } from '@/types';
import {
    Bike,
    CheckCircle2,
    Home,
    Mail,
    MapPin,
    MessageCircle,
    Package,
    Phone,
    ShoppingBag,
    Store,
    User as UserIcon,
} from 'lucide-react';
import { OrderDetails } from './checkout';

// --- Interfaces ---
type CartItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
};

// type OrderItem = {
//     order_id: number;
//     orderdetail_quantity: number;
//     orderdetail_subtotal: string;
//     product: {
//         date_created: string;
//         last_updated: string;
//         product_category: string;
//         product_description: string;
//         product_id: number;
//         product_name: string;
//         price_discount: string;
//         price_origin: string;
//         product_stock: number;
//         product_image?: string;
//     };
// };

export type Product = {
    id: number;
    name: string;
    description: string;
    category: string;
    price_origin: string; // String karena data API menggunakan kutip ("40205.41")
    price_discount: string; // String
    quantity: number; // Stock quantity
    image: string;
    popular: boolean;
    rating: string; // String ("3.1")
    preparation_time: string;
    badge: string | null; // Bisa string atau null
    food_type: string[]; // Array of strings
    created_at: string; // ISO Date String
    updated_at: string; // ISO Date String
};

// 2. Definisi untuk Item Keranjang/Transaksi (Wrapper)
export type OrderItem = {
    id: number;
    quantity: number; // Qty pembelian
    subtotal: string; // String ("67545.08")
    product_id: number;
    product: Product; // Nested object
};

export type NearestBranch = {
    name: string;
    distance: string;
    address: string;
};

export type CourierInfo = {
    name: string;
    plate: string;
    status: string;
};

export type Recommendation = {
    id: number;
    name: string;
    discount: number;
    price: number;
};

export type TrackingDetail = {
    date: string;
    completed: boolean;
};

type DeliveryPageProps = {
    orderNumber: number;
    cartItems: CartItem[]; // Keep for fallback images if needed
    orderDetails: OrderDetails;
    orderItems?: OrderItem[];
    nearestBranch: NearestBranch;
    courierInfo: CourierInfo;
    recommendations: Recommendation[];
    currentStepIndex: number;
    trackingDetails: TrackingDetail[];
    user: User;
    // onBackToHome?: () => void;
};

export default function Delivery({
    orderNumber,
    cartItems = [],
    orderDetails,
    // onBackToHome = () => {},
    orderItems = [],
    nearestBranch,
    courierInfo,
    recommendations,
    currentStepIndex,
    trackingDetails,
    user,
}: DeliveryPageProps) {
    // --- Safe Data Handling ---
    const safeOrderItems = Array.isArray(orderItems) ? orderItems : [];
    console.log(safeOrderItems);

    // --- Calculations ---
    const subtotal =
        safeOrderItems.length > 0
            ? safeOrderItems
                  .map((item) => {
                      const val = parseInt(item.subtotal);
                      return isNaN(val) ? 0 : val;
                  })
                  .reduce((prev, next) => prev + next, 0)
            : 0;

    const shipping = subtotal > 200000 ? 0 : 12000; // Adjusted threshold example
    const tax = Math.ceil(subtotal * 0.11);
    const total = subtotal + shipping + tax;

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 1); // 1 day delivery assumption

    // --- Mock Data for Features ---
    // const nearestBranch = {
    //     name: 'Cabang Jakarta Selatan (Pusat)',
    //     distance: '2.3 km',
    //     address: 'Jl. Senopati No. 10, Jakarta',
    // };

    // const courierInfo = {
    //     name: 'Budi Santoso',
    //     plate: 'B 1234 XYZ',
    //     status: 'Menuju lokasi restoran',
    // };

    // const recommendations = [
    //     { id: 101, name: 'Ice Matcha Latte', discount: '20%', price: '24000' },
    //     { id: 102, name: 'Choco Croissant', discount: '15%', price: '18000' },
    // ];

    // --- Tracking Logic ---
    // In a real app, this comes from backend status
    // const currentStepIndex: number = 2; // 0: Confirmed, 1: Processing, 2: Shipped, 3: Delivered

    // const trackingDetails: TrackingDetail[] = [
    //     {
    //         date: '12:00 PM',
    //         completed: true,
    //     },
    //     {
    //         date: '12:30 PM',
    //         completed: true,
    //     },
    //     {
    //         date: 'Sedang berlangsung',
    //         completed: true,
    //     },
    //     {
    //         date: 'Est. 30 min',
    //         completed: false,
    //     },
    // ];

    const trackingSteps = [
        {
            icon: CheckCircle2,
            label: 'Dikonfirmasi',
            date: trackingDetails[0].date,
            completed: trackingDetails[0].completed,
        },
        {
            icon: Store,
            label: 'Diproses Dapur',
            date: trackingDetails[1].date,
            completed: trackingDetails[1].completed,
        },
        {
            icon: Bike,
            label: 'Diantar Kurir',
            date: trackingDetails[2].date,
            completed: trackingDetails[2].completed,
        }, // Active
        {
            icon: Home,
            label: 'Tiba di Lokasi',
            date: trackingDetails[3].date,
            completed: trackingDetails[3].completed,
        },
    ];

    const progressValue = (currentStepIndex / (trackingSteps.length - 1)) * 100;

    return (
        <div className="min-h-screen bg-gray-50/50 py-8 font-sans">
            <div className="container mx-auto max-w-5xl px-4 md:px-6">
                {/* Header Section with AI Chat Button */}
                <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-primary">
                            Status Pesanan
                        </h1>
                        <p className="text-muted-foreground">
                            Lacak pengiriman makananmu secara real-time.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="gap-2 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
                    >
                        <MessageCircle className="h-4 w-4" />
                        Tanya AI Chatbot (WhatsApp)
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* LEFT COLUMN: Tracking & Details (Span 2) */}
                    <div className="space-y-6 md:col-span-2">
                        {/* Status Card */}
                        <Card className="overflow-hidden border-primary/20 shadow-sm">
                            <div className="bg-primary/5 p-6 text-center">
                                <div className="mx-auto mb-3 flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-primary/20 text-primary">
                                    <Bike className="h-7 w-7" />
                                </div>
                                <h2 className="text-xl font-semibold text-primary">
                                    Pesanan Sedang Diantar
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Order TRX-{orderNumber} • Estimasi tiba
                                    13:45 WIB
                                </p>
                            </div>

                            <div className="p-6">
                                {/* Visual Progress Bar */}
                                <div className="relative mt-2 mb-8">
                                    <Progress
                                        value={progressValue}
                                        className="h-2 bg-gray-100"
                                    />
                                    <div className="absolute top-0 flex w-full -translate-y-1/2 justify-between px-1">
                                        {trackingSteps.map((step, index) => {
                                            const isActive =
                                                index <= currentStepIndex;
                                            return (
                                                <div
                                                    key={index}
                                                    className={`flex flex-col items-center gap-2 bg-white px-2 ${isActive ? 'text-primary' : 'text-gray-400'}`}
                                                >
                                                    <div
                                                        className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${isActive ? 'border-primary bg-primary text-primary-foreground' : 'border-gray-200 bg-gray-50'}`}
                                                    >
                                                        <step.icon className="h-4 w-4" />
                                                    </div>
                                                    <span className="hidden text-xs font-medium sm:block">
                                                        {step.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Detailed Activity Log */}
                                <div className="space-y-4 rounded-lg bg-gray-50 p-4 text-sm">
                                    {trackingSteps.map((step, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-3">
                                                <step.icon
                                                    className={`h-4 w-4 ${i <= currentStepIndex ? 'text-primary' : 'text-gray-300'}`}
                                                />
                                                <span
                                                    className={
                                                        i <= currentStepIndex
                                                            ? 'text-foreground'
                                                            : 'text-muted-foreground'
                                                    }
                                                >
                                                    {step.label}
                                                </span>
                                            </div>
                                            <span className="text-xs text-muted-foreground">
                                                {step.date}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card>

                        {/* Delivery Details Grid */}
                        <div className="grid gap-6 sm:grid-cols-2">
                            {/* Branch Info (Fitur Cabang Terdekat) */}
                            <Card className="border-l-4 border-l-blue-500">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                        <Store className="h-4 w-4" />
                                        Cabang Pemroses
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-semibold">
                                        {nearestBranch.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {nearestBranch.address}
                                    </p>
                                    <Badge
                                        variant="secondary"
                                        className="mt-2 text-xs"
                                    >
                                        Jarak: {nearestBranch.distance}
                                    </Badge>
                                </CardContent>
                            </Card>

                            {/* Courier Info (Fitur Delivery) */}
                            <Card className="border-l-4 border-l-orange-500">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                        <Bike className="h-4 w-4" />
                                        Kurir Pengantar
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                            <UserIcon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold">
                                                {courierInfo.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {courierInfo.plate}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 w-full text-xs"
                                        >
                                            Chat
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 w-full text-xs"
                                        >
                                            Telpon
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Smart Recommendations (Fitur Rekomendasi Diskon) */}
                        <Card className="border-pink-100 bg-gradient-to-r from-pink-50 to-purple-50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg text-pink-700">
                                    <ShoppingBag className="h-5 w-5" />
                                    Spesial Untukmu (Diskon!)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                {recommendations.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm"
                                    >
                                        <div>
                                            <p className="text-sm font-medium">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Rp{' '}
                                                {Number(
                                                    item.price,
                                                ).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                        <Badge className="bg-pink-500 hover:bg-pink-600">
                                            -{item.discount * 100}%
                                        </Badge>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN: Summary & Address (Span 1) */}
                    <div className="space-y-6">
                        {/* Shipping Address */}
                        <Card>
                            <CardHeader className="bg-gray-50/50 pb-4">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    Alamat Pengiriman
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4 text-sm">
                                <div className="space-y-1">
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-muted-foreground">
                                        {user.street}
                                    </p>
                                    <p className="text-muted-foreground">
                                        {user.city}, {user.state}{' '}
                                        {orderDetails?.shipping?.zipCode}
                                    </p>
                                    <p className="text-muted-foreground">
                                        Indonesia
                                    </p>
                                </div>
                                <Separator className="my-3" />
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="h-3.5 w-3.5" />
                                        <span className="truncate">
                                            {user.email}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Phone className="h-3.5 w-3.5" />
                                        <span>{user.phone_number}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Order Summary */}
                        <Card>
                            <CardHeader className="bg-gray-50/50 pb-4">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Package className="h-4 w-4 text-primary" />
                                    Rincian Pembayaran
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="custom-scrollbar mb-4 max-h-[200px] space-y-3 overflow-y-auto pr-1">
                                    {safeOrderItems.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between gap-3 text-sm"
                                        >
                                            <div className="flex gap-3">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-gray-100 text-xs font-bold text-gray-500">
                                                    {item.quantity}x
                                                </div>
                                                <div>
                                                    <p className="line-clamp-1 font-medium">
                                                        {item.product.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        @ Rp{' '}
                                                        {parseInt(
                                                            item.product
                                                                .price_discount ||
                                                                item.product
                                                                    .price_origin,
                                                        ).toLocaleString(
                                                            'id-ID',
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="font-medium">
                                                Rp{' '}
                                                {(
                                                    parseInt(
                                                        item.product
                                                            .price_discount ||
                                                            item.product
                                                                .price_origin,
                                                    ) * item.quantity
                                                ).toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <Separator className="my-4" />

                                <div className="space-y-1.5 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Subtotal
                                        </span>
                                        <span>
                                            Rp{' '}
                                            {subtotal.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Ongkir (Jarak &lt; 5km)
                                        </span>
                                        <span
                                            className={
                                                shipping === 0
                                                    ? 'font-medium text-green-600'
                                                    : ''
                                            }
                                        >
                                            {shipping === 0
                                                ? 'GRATIS'
                                                : `Rp ${shipping.toLocaleString('id-ID')}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Pajak (11%)
                                        </span>
                                        <span>
                                            Rp {tax.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>

                                <Separator className="my-4" />

                                <div className="flex items-center justify-between rounded-lg bg-primary/5 p-3">
                                    <span className="font-semibold text-primary">
                                        Total Bayar
                                    </span>
                                    <span className="text-lg font-bold text-primary">
                                        Rp {total.toLocaleString('id-ID')}
                                    </span>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <Button
                                        className="w-full bg-primary hover:bg-primary/90"
                                        size="lg"
                                        // onClick={onBackToHome}
                                    >
                                        Belanja Lagi
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Unduh Invoice
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    <p>
                        Butuh bantuan? Hubungi{' '}
                        <span className="cursor-pointer text-primary hover:underline">
                            Support
                        </span>{' '}
                        atau gunakan Chatbot AI kami.
                    </p>
                </div>
            </div>
        </div>
    );
}
