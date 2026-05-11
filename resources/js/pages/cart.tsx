import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category: string;
}

interface CartPageProps {
    cartItems: CartItem[];
    onBack: () => void;
    onUpdateQuantity: (itemId: number, quantity: number) => void;
    onRemoveItem: (itemId: number) => void;
    onCheckout: () => void;
}

export default function CartPage() {
    // const subtotal = cartItems.reduce(
    //     (acc, item) => acc + item.price * item.quantity,
    //     0,
    // );
    const subtotal = 45000;
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4">
                <Button
                    variant="ghost"
                    // onClick={onBack}
                    className="mb-6 hover:bg-muted"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                </Button>

                <h1 className="mb-8">Shopping Cart</h1>

                {
                    /* cartItems.length */ false ? (
                        <Card className="border-2 border-border p-12 text-center">
                            <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                            <h3 className="mb-2">Your cart is empty</h3>
                            <p className="mb-6 text-muted-foreground">
                                Add some products to get started!
                            </p>
                            <Button
                                // onClick={onBack}
                                className="bg-primary hover:bg-accent"
                            >
                                Start Shopping
                            </Button>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {/* Cart Items */}
                            <div className="space-y-4 lg:col-span-2">
                                {/* {cartItems.map((item) => (
                                <Card
                                    key={item.id}
                                    className="border-2 border-border p-4"
                                >
                                    <div className="flex gap-4">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                                            <ImageWithFallback
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="mb-2 flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h4 className="mb-1 line-clamp-1">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-muted-foreground">
                                                        {item.category}
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        onRemoveItem(item.id)
                                                    }
                                                    className="flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            onUpdateQuantity(
                                                                item.id,
                                                                Math.max(
                                                                    1,
                                                                    item.quantity -
                                                                        1,
                                                                ),
                                                            )
                                                        }
                                                        className="h-8 w-8 border-2 border-border p-0"
                                                    >
                                                        -
                                                    </Button>
                                                    <Input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) =>
                                                            onUpdateQuantity(
                                                                item.id,
                                                                Math.max(
                                                                    1,
                                                                    parseInt(
                                                                        e.target
                                                                            .value,
                                                                    ) || 1,
                                                                ),
                                                            )
                                                        }
                                                        className="bg-input-background h-8 w-16 border-2 border-border p-0 text-center"
                                                        min="1"
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            onUpdateQuantity(
                                                                item.id,
                                                                item.quantity +
                                                                    1,
                                                            )
                                                        }
                                                        className="h-8 w-8 border-2 border-border p-0"
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                                <div className="text-primary">
                                                    $
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))} */}
                                {Array(4)
                                    .fill(null)
                                    .map((_, i) => (
                                        <Card
                                            key={i}
                                            className="border-2 border-border p-4"
                                        >
                                            <div className="flex gap-4">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                                                    <ImageWithFallback
                                                        src=""
                                                        alt="s"
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="mb-2 flex items-start justify-between gap-4">
                                                        <div className="flex-1">
                                                            <h4 className="mb-1 line-clamp-1">
                                                                {/* {item.name} */}{' '}
                                                                Item name
                                                            </h4>
                                                            <p className="text-muted-foreground">
                                                                {/* {item.category} */}{' '}
                                                                item category
                                                            </p>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            // onClick={() =>
                                                            //     onRemoveItem(item.id)
                                                            // }
                                                            className="flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <div className="flex items-center justify-between gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                // onClick={() =>
                                                                //     onUpdateQuantity(
                                                                //         item.id,
                                                                //         Math.max(
                                                                //             1,
                                                                //             item.quantity -
                                                                //                 1,
                                                                //         ),
                                                                //     )
                                                                // }
                                                                className="h-8 w-8 border-2 border-border p-0"
                                                            >
                                                                -
                                                            </Button>
                                                            <Input
                                                                type="number"
                                                                // value={item.quantity}
                                                                value={4}
                                                                // onChange={(e) =>
                                                                //     onUpdateQuantity(
                                                                //         item.id,
                                                                //         Math.max(
                                                                //             1,
                                                                //             parseInt(
                                                                //                 e.target
                                                                //                     .value,
                                                                //             ) || 1,
                                                                //         ),
                                                                //     )
                                                                // }
                                                                className="bg-input-background h-8 w-16 border-2 border-border p-0 text-center"
                                                                min="1"
                                                            />
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                // onClick={() =>
                                                                //     onUpdateQuantity(
                                                                //         item.id,
                                                                //         item.quantity +
                                                                //             1,
                                                                //     )
                                                                // }
                                                                className="h-8 w-8 border-2 border-border p-0"
                                                            >
                                                                +
                                                            </Button>
                                                        </div>
                                                        <div className="text-primary">
                                                            {/* $
                                                    {(
                                                        item.price *
                                                        item.quantity
                                                    ).toFixed(2)} */}
                                                            Rp 45000
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <Card className="sticky top-24 border-2 border-border p-6">
                                    <h3 className="mb-4">Order Summary</h3>
                                    <div className="mb-6 space-y-3">
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
                                                Tax (10%)
                                            </span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        {subtotal < 50 && subtotal > 0 && (
                                            <div className="rounded bg-secondary/10 p-2 text-secondary">
                                                Add $
                                                {(50 - subtotal).toFixed(2)}{' '}
                                                more for free shipping!
                                            </div>
                                        )}
                                        <div className="flex justify-between border-t border-border pt-3">
                                            <span>Total</span>
                                            <span className="text-primary">
                                                ${total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        // onClick={onCheckout}
                                        className="w-full bg-primary hover:bg-accent"
                                        size="lg"
                                    >
                                        Proceed to Checkout
                                    </Button>
                                    <p className="mt-4 text-center text-muted-foreground">
                                        Secure checkout with SSL encryption
                                    </p>
                                </Card>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
