import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CheckoutPageProps {
    cartItems: CartItem[];
    onBack: () => void;
    onPlaceOrder: (orderDetails: OrderDetails) => void;
}

export interface OrderDetails {
    shipping: {
        fullName: string;
        email: string;
        phone: string;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    payment: {
        cardNumber: string;
        cardName: string;
        expiryDate: string;
        cvv: string;
    };
}

export default function CheckoutPage() {
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
    });

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: '',
    });

    // const subtotal = cartItems.reduce(
    //     (acc, item) => acc + item.price * item.quantity,
    //     0,
    // );
    const subtotal = 50000;
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // onPlaceOrder({
        //     shipping: shippingInfo,
        //     payment: paymentInfo,
        // });
    };

    return (
        <div className="min-h-screen bg-muted/30 py-8">
            <div className="container mx-auto px-4">
                <Button
                    variant="ghost"
                    // onClick={onBack}
                    className="mb-6 hover:bg-muted"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Cart
                </Button>

                <h1 className="mb-8">Checkout</h1>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Checkout Form */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Shipping Information */}
                            <Card className="border-2 border-border p-6">
                                <h2 className="mb-6">Shipping Information</h2>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div>
                                            <Label htmlFor="fullName">
                                                Full Name *
                                            </Label>
                                            <Input
                                                id="fullName"
                                                value={shippingInfo.fullName}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        fullName:
                                                            e.target.value,
                                                    })
                                                }
                                                className="bg-input-background border-2 border-border"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">
                                                Email *
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={shippingInfo.email}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        email: e.target.value,
                                                    })
                                                }
                                                className="bg-input-background border-2 border-border"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">
                                            Phone Number *
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={shippingInfo.phone}
                                            onChange={(e) =>
                                                setShippingInfo({
                                                    ...shippingInfo,
                                                    phone: e.target.value,
                                                })
                                            }
                                            className="bg-input-background border-2 border-border"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="address">
                                            Street Address *
                                        </Label>
                                        <Input
                                            id="address"
                                            value={shippingInfo.address}
                                            onChange={(e) =>
                                                setShippingInfo({
                                                    ...shippingInfo,
                                                    address: e.target.value,
                                                })
                                            }
                                            className="bg-input-background border-2 border-border"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="city">City *</Label>
                                            <Input
                                                id="city"
                                                value={shippingInfo.city}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        city: e.target.value,
                                                    })
                                                }
                                                className="bg-input-background border-2 border-border"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="state">
                                                State *
                                            </Label>
                                            <Input
                                                id="state"
                                                value={shippingInfo.state}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        state: e.target.value,
                                                    })
                                                }
                                                className="bg-input-background border-2 border-border"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="zipCode">
                                                ZIP Code *
                                            </Label>
                                            <Input
                                                id="zipCode"
                                                value={shippingInfo.zipCode}
                                                onChange={(e) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        zipCode: e.target.value,
                                                    })
                                                }
                                                className="bg-input-background border-2 border-border"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="country">
                                                Country *
                                            </Label>
                                            <Select
                                                value={shippingInfo.country}
                                                onValueChange={(value) =>
                                                    setShippingInfo({
                                                        ...shippingInfo,
                                                        country: value,
                                                    })
                                                }
                                            >
                                                <SelectTrigger
                                                    id="country"
                                                    className="bg-input-background border-2 border-border"
                                                >
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="United States">
                                                        United States
                                                    </SelectItem>
                                                    <SelectItem value="Canada">
                                                        Canada
                                                    </SelectItem>
                                                    <SelectItem value="United Kingdom">
                                                        United Kingdom
                                                    </SelectItem>
                                                    <SelectItem value="Australia">
                                                        Australia
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Payment Information */}
                            <Card className="border-2 border-border p-6">
                                <div className="mb-6 flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-primary" />
                                    <h2>Payment Information</h2>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="cardNumber">
                                            Card Number *
                                        </Label>
                                        <Input
                                            id="cardNumber"
                                            placeholder="1234 5678 9012 3456"
                                            value={paymentInfo.cardNumber}
                                            onChange={(e) =>
                                                setPaymentInfo({
                                                    ...paymentInfo,
                                                    cardNumber: e.target.value,
                                                })
                                            }
                                            className="bg-input-background border-2 border-border"
                                            maxLength={19}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="cardName">
                                            Cardholder Name *
                                        </Label>
                                        <Input
                                            id="cardName"
                                            placeholder="John Doe"
                                            value={paymentInfo.cardName}
                                            onChange={(e) =>
                                                setPaymentInfo({
                                                    ...paymentInfo,
                                                    cardName: e.target.value,
                                                })
                                            }
                                            className="bg-input-background border-2 border-border"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="expiryDate">
                                                Expiry Date *
                                            </Label>
                                            <Input
                                                id="expiryDate"
                                                placeholder="MM/YY"
                                                value={paymentInfo.expiryDate}
                                                onChange={(e) =>
                                                    setPaymentInfo({
                                                        ...paymentInfo,
                                                        expiryDate:
                                                            e.target.value,
                                                    })
                                                }
                                                className="bg-input-background border-2 border-border"
                                                maxLength={5}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="cvv">CVV *</Label>
                                            <Input
                                                id="cvv"
                                                placeholder="123"
                                                type="password"
                                                value={paymentInfo.cvv}
                                                onChange={(e) =>
                                                    setPaymentInfo({
                                                        ...paymentInfo,
                                                        cvv: e.target.value,
                                                    })
                                                }
                                                className="bg-input-background border-2 border-border"
                                                maxLength={4}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-muted-foreground">
                                        <Lock className="h-4 w-4" />
                                        <p>
                                            Your payment information is secure
                                            and encrypted
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-24 border-2 border-border p-6">
                                <h3 className="mb-4">Order Summary</h3>
                                <div className="mb-4 space-y-3">
                                    {/* {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between gap-2"
                                        >
                                            <span className="line-clamp-1 text-muted-foreground">
                                                {item.name} x {item.quantity}
                                            </span>
                                            <span>
                                                $
                                                {(
                                                    item.price * item.quantity
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    ))} */}
                                    {Array(2)
                                        .fill(null)
                                        .map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex justify-between gap-2"
                                            >
                                                <span className="line-clamp-1 text-muted-foreground">
                                                    Item name x 2
                                                </span>
                                                <span>Rp 50000</span>
                                            </div>
                                        ))}
                                </div>
                                <Separator className="my-4" />
                                <div className="mb-4 space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Subtotal
                                        </span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Shipping
                                        </span>
                                        <span>
                                            {shipping === 0 ? (
                                                <span className="text-secondary">
                                                    Free
                                                </span>
                                            ) : (
                                                `$${shipping.toFixed(2)}`
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Tax
                                        </span>
                                        <span>${tax.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <div className="mb-6 flex justify-between">
                                    <span>Total</span>
                                    <span className="text-primary">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-accent"
                                    size="lg"
                                >
                                    Place Order
                                </Button>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
