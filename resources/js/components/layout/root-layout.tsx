import { CartProvider } from '@/context/CartContext';

type RootLayoutProps = {
    children?: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <CartProvider>
            <div>{children}</div>
        </CartProvider>
    );
}
