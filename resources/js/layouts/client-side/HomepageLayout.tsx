import { CartProvider } from '@/components/homepage/CartContext';
import { Footer } from '@/components/homepage/Footer';
import { Header } from '@/components/homepage/Header';
import { LanguageProvider } from '@/components/homepage/LanguageContext';
import { Notification, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useState } from 'react';

interface LayoutProps {
    children: ReactNode;
}

export default function HomepageLayout({ children }: LayoutProps) {
    const { notifications } = usePage<SharedData>().props;
    const [currentPage, setCurrentPage] = useState<
        'product' | 'checkout' | 'location' | 'profile' | 'cart'
    >('product');

    return (
        <CartProvider>
            <LanguageProvider>
                <div className="min-h-screen">
                    {/* <Header /> */}
                    <Header notifications={notifications} />
                    {children}

                    <Footer />
                </div>
            </LanguageProvider>
        </CartProvider>
    );
}
