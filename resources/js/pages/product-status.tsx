import { Button } from '@/components/ui/button';
import type { OrderNew } from '@/types';
import { OrderStatus } from '@/types';
import { Link } from '@inertiajs/react';
import { CheckCircle, ChefHat, Clock, MapPin, Truck } from 'lucide-react';

interface OrderStatusPageProps {
    currentOrder: OrderNew;
    onNavigateToHome: () => void;
}

// interface Order {
//     id: string;
//     orderNumber: string;
//     items: {
//         name: string;
//         quantity: number;
//         image: string;
//     }[];
//     status: OrderStatus;
//     estimatedTime: string;
//     address: string;
//     orderDate: string;
//     totalAmount: number;
//     driverName?: string;
//     driverPhone?: string;
//     trackingUpdates: {
//         status: OrderStatus;
//         time: string;
//         message: string;
//     }[];
// }

// export type Order = {
//     id: number;
//     user_id: number;
//     shop_branch_id?: number;
//     courier_id?: number | null;
//     order_items: Pick<
//         Product,
//         'name' | 'quantity' | 'price_discount' | 'image'
//     >[];
//     payment_method?: string;
//     status: OrderStatus;
//     estimated_delivery_at: number;
//     street: User['street'];
//     confirmed_at: string | null;
//     delivery_fee?: number;
//     total: number;
//     driver_name?: string;
//     driver_number?: string;
//     trackingUpdates: {
//         status: OrderStatus;
//         time: string;
//         message: string;
//     }[];
//     processed_at?: string | null;
//     delivered_at?: string | null;
//     created_at?: string;
//     updated_at?: string;
// };

// export default function Order() {
//     return <div>oo</div>;
// }

export default function OrderStatusPage({
    currentOrder,
    onNavigateToHome,
}: OrderStatusPageProps) {
    // Dummy data - in real app, this would come from backend
    // const currentOrder: OrderNew = {
    //     id: 1,
    //     user_id: 1,
    //     order_items: [
    //         {
    //             name: '7-Minute Khichdi - Superb Vegetable',
    //             quantity: 2,
    //             price_discount: 12000,
    //             image: 'https://images.unsplash.com/photo-1737210235283-7675f83efc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraGljaGRpJTIwYm93bCUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjA1MTM2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    //         },
    //         {
    //             name: '7-Minute Khichdi - Classic Dal',
    //             quantity: 1,
    //             price_discount: 12000,
    //             image: 'https://images.unsplash.com/photo-1653849942524-ef2c6882d70d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByaWNlJTIwbGVudGlsJTIwZGlzaHxlbnwxfHx8fDE3NjA1MTM2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    //         },
    //     ],
    //     status: 'on the way',
    //     estimated_delivery_at: 10,
    //     street: '123 MG Road, Bangalore, Karnataka 560001',
    //     created_at: 'Dec 13, 2024 at 12:30 PM',
    //     total: 247,
    //     driver_name: 'Rajesh Kumar',
    //     driver_number: '+91 98765 43210',
    //     tracking_updates: [
    //         {
    //             status: 'cooking',
    //             time: '12:35 PM',
    //             message: 'Your order is being prepared with fresh ingredients',
    //         },
    //         {
    //             status: 'on the way',
    //             time: '12:50 PM',
    //             message: 'Your order is out for delivery',
    //         },
    //     ],
    // };

    // const currentOrder: Order2 = {
    //     id: 1,
    //     user_id: 1
    //     order_items: [
    //         {
    //             name: '7-Minute Khichdi - Superb Vegetable',
    //             quantity: 2,
    //             price_discount: 12000
    //             image: 'https://images.unsplash.com/photo-1737210235283-7675f83efc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraGljaGRpJTIwYm93bCUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjA1MTM2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    //         },
    //         {
    //             name: '7-Minute Khichdi - Classic Dal',
    //             quantity: 1,
    //             price_discount: 12000
    //             image: 'https://images.unsplash.com/photo-1653849942524-ef2c6882d70d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByaWNlJTIwbGVudGlsJTIwZGlzaHxlbnwxfHx8fDE3NjA1MTM2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    //         },
    //     ],
    //     status: 'on the way',
    //     estimated_delivery_at: '15-20 mins',
    //     address: '123 MG Road, Bangalore, Karnataka 560001',
    //     orderDate: 'Dec 13, 2024 at 12:30 PM',
    //     totalAmount: 247,
    //     driverName: 'Rajesh Kumar',
    //     driverPhone: '+91 98765 43210',
    //     trackingUpdates: [
    //         {
    //             status: 'cooking',
    //             time: '12:35 PM',
    //             message: 'Your order is being prepared with fresh ingredients',
    //         },
    //         {
    //             status: 'on the way',
    //             time: '12:50 PM',
    //             message: 'Your order is out for delivery',
    //         },
    //     ],
    // };
    const getStatusIndex = (status: OrderStatus): number => {
        const statuses: OrderStatus[] = ['cooking', 'on the way', 'arrived'];
        return statuses.indexOf(status);
    };

    const currentStatusIndex = getStatusIndex(currentOrder.status);
    console.log(currentOrder);

    const statusSteps = [
        {
            key: 'cooking' as OrderStatus,
            label: 'Cooking',
            icon: ChefHat,
            description: 'Your order is being prepared',
        },
        {
            key: 'on the way' as OrderStatus,
            label: 'On the Way',
            icon: Truck,
            description: 'Your order is out for delivery',
        },
        {
            key: 'arrived' as OrderStatus,
            label: 'Arrived',
            icon: CheckCircle,
            description: 'Order delivered successfully',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/products"
                        onClick={onNavigateToHome}
                        className="mb-4 inline-flex items-center gap-2 text-[#FF6900] hover:text-[#E55F00]"
                    >
                        ← Kembali
                    </Link>
                    <h1
                        className="mb-2 text-[32px]"
                        style={{ fontWeight: 700 }}
                    >
                        Track Your Order
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
                                            {currentOrder.estimated_delivery_at}{' '}
                                            Minutes
                                        </span>
                                    </div>
                                    <p className="text-[14px] text-gray-500">
                                        Estimated time
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
                                Tracking Updates
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
                                                    {update.message}
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
                                        Delivery Address
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
                                Order Summary
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
                                        Order Date
                                    </span>
                                    <span className="text-gray-900">
                                        {currentOrder.created_at}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-[14px]">
                                    <span className="text-gray-600">
                                        Order Number
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
                                    Total Amount
                                </span>
                                <span
                                    className="text-[20px] text-[#FF6900]"
                                    style={{ fontWeight: 700 }}
                                >
                                    ₹{currentOrder.total}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <Button
                                    className="w-full bg-[#FF6900] text-white hover:bg-[#E55F00]"
                                    style={{ fontWeight: 600 }}
                                >
                                    Need Help?
                                </Button>
                                <Button
                                    onClick={onNavigateToHome}
                                    className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                                    style={{ fontWeight: 600 }}
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
