import { Cart, CartItem } from '@/types';
import { getCSRFToken } from '@/utils/csrf';
import { router, usePage } from '@inertiajs/react';
import { createContext, ReactNode, useContext, useState } from 'react';

// export interface SimpleCartItem {
//     id: number | string;
//     name: string;
//     price: string;
//     quantity: number;
//     image: string;
// }

interface CartContextType {
    cart: Cart;
    cartItems: CartItem[];
    cartCount: number;
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: number | string) => void;
    updateQuantity: (id: number | string, quantity: number) => void;
    clearCart: () => void;
    checkExistence: (id: number) => boolean;
    sendToCart: (productId: number, buyQuantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { cart } = usePage().props;
    console.log('cart', cart);
    console.log('cart2', {});
    const initialCartItems = !cart
        ? []
        : cart.items.map((item) => ({
              id: item.id,
              name: item.product.name,
              price: item.product.price_discount || item.product.price_origin,
              quantity: Number(item.quantity),
              image: item.product.image,
          }));

    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    const checkExistence = (productId: number) => {
        const isAlreadyAddedToCart = cartItems
            .map((item) => item.id)
            .includes(productId);
        return isAlreadyAddedToCart;
    };

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    const addToCart = (item: Omit<CartItem, 'quantity'>) => {
        setCartItems((prev) => {
            const existingItem = prev.find((i) => i.id === item.id);

            if (existingItem) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
                );
            }

            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number | string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: number | string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }

        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const sendToCart = (productId: number, buyQuantity: number) => {
        const csrf = getCSRFToken();
        router.post(
            '/cart/add',
            {
                product_id: productId,
                buy_quantity: buyQuantity,
            },
            {
                headers: {
                    'X-CSRF-TOKEN': csrf ?? '',
                },
            },
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart: cart || { items: [] },
                cartItems,
                cartCount,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                checkExistence,
                sendToCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
