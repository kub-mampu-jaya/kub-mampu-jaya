// import { Badge } from '@/components/ui/badge';
import { Badge } from '@';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Calendar,
    CheckCircle2,
    Home,
    Mail,
    MapPin,
    Package,
    Phone,
    Truck,
} from 'lucide-react';
import { OrderDetails } from './checkout';

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface OrderItem {
    order_id: number;
    orderdetail_quantity: number;
    orderdetail_subtotal: string;
    product: {
        date_created: string;
        last_updated: string;
        product_category: string;
        product_description: string;
        product_id: number;
        product_name: string;
        product_price: string;
        product_stock: number;
    };
}

interface DeliveryPageProps {
    orderNumber: string;
    cartItems: CartItem[];
    orderDetails: OrderDetails;
    onBackToHome: () => void;
    orderItems: OrderItem[];
}

export default function Delivery({
    orderNumber,
    cartItems,
    orderDetails,
    onBackToHome,
    orderItems,
}: DeliveryPageProps) {
    const subtotal = orderItems
        .map((item) => parseInt(item.orderdetail_subtotal))
        .reduce((prev, next) => prev + next);
    const shipping = subtotal > 20000 ? 0 : 12000;
    const tax = Math.ceil(subtotal * 0.11);
    const total = subtotal + shipping + tax;

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    const trackingSteps = [
        {
            icon: CheckCircle2,
            label: 'Order Confirmed',
            date: new Date().toLocaleDateString(),
            completed: true,
        },
        {
            icon: Package,
            label: 'Processing',
            date: new Date().toLocaleDateString(),
            completed: true,
        },
        {
            icon: Truck,
            label: 'Shipped',
            date: 'Pending',
            completed: false,
        },
        {
            icon: Home,
            label: 'Delivered',
            date: estimatedDelivery.toLocaleDateString(),
            completed: false,
        },
    ];

    return (
        <div className="min-h-screen bg-muted/30 py-8">
            <div className="container mx-auto max-w-4xl px-4">
                {/* Success Message */}
                <Card className="mb-8 border-2 border-primary bg-gradient-to-br from-primary/5 to-secondary/5 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                        <CheckCircle2 className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <h1 className="mb-2">Order Confirmed!</h1>
                    <p className="mb-4 text-muted-foreground">
                        Thank you for your purchase. Your order has been
                        received and is being processed.
                    </p>
                    <div className="inline-block rounded-lg border-2 border-border bg-card px-4 py-2">
                        <p className="text-muted-foreground">Order Number</p>
                        <p className="text-primary">{orderNumber}</p>
                    </div>
                </Card>

                {/* Order Tracking */}
                <Card className="mb-8 border-2 border-border p-6">
                    <h2 className="mb-6">Order Tracking</h2>
                    <div className="space-y-6">
                        {trackingSteps.map((step, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div
                                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                                        step.completed
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted text-muted-foreground'
                                    }`}
                                >
                                    <step.icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1 pt-2">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h4 className="mb-1">
                                                {step.label}
                                            </h4>
                                            <p className="text-muted-foreground">
                                                {step.date}
                                            </p>
                                        </div>
                                        {step.completed && (
                                            <Badge className="bg-secondary text-secondary-foreground">
                                                Completed
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 rounded-lg border border-secondary/20 bg-secondary/10 p-4">
                        <div className="flex items-center gap-2 text-secondary">
                            <Calendar className="h-5 w-5" />
                            <p>
                                Estimated delivery:{' '}
                                {estimatedDelivery.toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Shipping Address */}
                <Card className="mb-8 border-2 border-border p-6">
                    <h3 className="mb-4">Shipping Address</h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                            {/* <div>
                                <p>{orderDetails.shipping.fullName}</p>
                                <p className="text-muted-foreground">
                                    {orderDetails.shipping.address}
                                </p>
                                <p className="text-muted-foreground">
                                    {orderDetails.shipping.city},{' '}
                                    {orderDetails.shipping.state}{' '}
                                    {orderDetails.shipping.zipCode}
                                </p>
                                <p className="text-muted-foreground">
                                    {orderDetails.shipping.country}
                                </p>
                            </div> */}
                            <div>
                                <p>Nama lengkap</p>
                                <p className="text-muted-foreground">
                                    Alamat pengiriman
                                </p>
                                <p className="text-muted-foreground">
                                    Nama kota, Provinsi, Kode pos
                                </p>
                                <p className="text-muted-foreground">
                                    Indonesia
                                </p>
                            </div>
                        </div>
                        <Separator />
                        {/* <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-primary" />
                            <p className="text-muted-foreground">
                                {orderDetails.shipping.email}
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-primary" />
                            <p className="text-muted-foreground">
                                {orderDetails.shipping.phone}
                            </p>
                        </div> */}
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-primary" />
                            <p className="text-muted-foreground">
                                mail@mail.com
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-primary" />
                            <p className="text-muted-foreground">0885454888</p>
                        </div>
                    </div>
                </Card>

                {/* Order Summary */}
                <Card className="mb-8 border-2 border-border p-6">
                    <h3 className="mb-4">Order Summary</h3>
                    <div className="mb-4 space-y-4">
                        {orderItems.map((item, i) => (
                            <div key={i} className="flex justify-between gap-4">
                                <div className="flex-1">
                                    <p>{item.product.product_name}</p>
                                    <p className="text-muted-foreground">
                                        Quantity: {item.orderdetail_quantity}
                                    </p>
                                </div>
                                <p>
                                    Rp
                                    {parseInt(item.product.product_price) *
                                        item.orderdetail_quantity}
                                </p>
                            </div>
                        ))}
                    </div>
                    {/* <div className="mb-4 space-y-4">
                        {Array(2)
                            .fill(null)
                            .map((_, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between gap-4"
                                >
                                    <div className="flex-1">
                                        <p>Nama item</p>
                                        <p className="text-muted-foreground">
                                            Quantity: 2
                                        </p>
                                    </div>
                                    <p>$10</p>
                                </div>
                            ))}
                    </div> */}
                    <Separator className="my-4" />
                    <div className="mb-4 space-y-2">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">
                                Subtotal
                            </span>
                            <span>Rp {subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">
                                Shipping
                            </span>
                            <span>
                                {shipping === 0 ? (
                                    <span className="text-gray-400">Free</span>
                                ) : (
                                    `Rp ${shipping}`
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Tax</span>
                            <span>Rp {tax}</span>
                        </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between">
                        <span>Total Paid</span>
                        <span className="text-primary">Rp {total}</span>
                    </div>
                </Card>

                {/* Actions */}
                {/* <div className="flex flex-col gap-4 sm:flex-row">
                    <Button
                        onClick={onBackToHome}
                        className="flex-1 bg-primary hover:bg-accent"
                        size="lg"
                    >
                        Continue Shopping
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1 border-2 border-border hover:bg-muted"
                        size="lg"
                    >
                        Download Invoice
                    </Button>
                </div> */}
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Button
                        onClick={() => {}}
                        className="flex-1 bg-primary hover:bg-accent"
                        size="lg"
                    >
                        Continue Shopping
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1 border-2 border-border hover:bg-muted"
                        size="lg"
                    >
                        Download Invoice
                    </Button>
                </div>

                <div className="mt-8 rounded-lg bg-muted p-4 text-center">
                    <p className="text-muted-foreground">
                        Need help with your order? Contact our support team at{' '}
                        <a
                            href="mailto:support@marketplace.com"
                            className="text-primary hover:underline"
                        >
                            support@marketplace.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
