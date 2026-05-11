// import tagidaLogoLight from 'figma:asset/9edcb5d1c1d891caa243d54c08fd1ef7f88354c1.png';
import {
    Facebook,
    Instagram,
    Leaf,
    Mail,
    MapPin,
    Phone,
    Twitter,
    Youtube,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { useLanguage } from './LanguageContext';

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-16">
                {/* Newsletter Section */}
                <div className="mb-12 text-center">
                    <h3 className="mb-4 text-2xl font-bold">
                        {t('stayConnected')}
                    </h3>
                    <p className="mx-auto mb-6 max-w-2xl text-gray-400">
                        {t('newsletterDesc')}
                    </p>
                    <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="border-gray-700 bg-gray-800 text-white placeholder-gray-400"
                        />
                        <Button className="bg-orange-600 hover:bg-orange-700">
                            {t('subscribe')}
                        </Button>
                    </div>
                </div>

                <Separator className="mb-12 bg-gray-800" />

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div>
                        <div className="mb-6">
                            <img
                                src="/images/logo-pbp.png"
                                alt="TAGIDA Naturals Logo"
                                className="h-12 w-auto object-contain"
                            />
                        </div>
                        <p className="mb-6 text-gray-400">
                            Memimpin masa depan kuliner praktis dengan makanan cepat saji berkualitas yang mengutamakan rasa, kecepatan, dan kenyamanan.
                        </p>
                        <div className="flex space-x-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-2 text-gray-400 hover:text-white"
                            >
                                <Facebook className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-2 text-gray-400 hover:text-white"
                            >
                                <Twitter className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-2 text-gray-400 hover:text-white"
                            >
                                <Instagram className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-2 text-gray-400 hover:text-white"
                            >
                                <Youtube className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-6 font-semibold">
                            {t('quickLinks')}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#products"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    Semua Produk
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#about"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    {t('about')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#sustainability"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    {t('sustainability')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#recipes"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    Resep
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#nutrition"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    Panduan Nutrisi
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#bulk"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    Pembelian Grosir
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="mb-6 font-semibold">
                            {t('customerService')}
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#help"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    Pusat Bantuan
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#shipping"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    Info Pengiriman
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#returns"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    Pengembalian & Penukaran
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#warranty"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    Garansi Produk
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    {t('contact')}
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#track"
                                    className="text-gray-400 transition-colors hover:text-white"
                                >
                                    Lacak Pesanan Anda
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="mb-6 font-semibold">
                            {t('contactInfo')}
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <MapPin className="mt-0.5 h-5 w-5 text-orange-600" />
                                <div className="text-gray-400">
                                    <p>Krian, Sidoarjo, Jawa Timur</p>
                                    <p></p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-orange-600" />
                                <span className="text-gray-400">
                                    081-***-***
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-orange-600" />
                                <span className="text-gray-400">
                                    PerusahaanFNB@gmail.com
                                </span>
                            </div>
                        </div>

                        {/* Certifications
                        <div className="mt-6">
                            <h5 className="mb-3 font-semibold">
                                {t('certifications')}
                            </h5>
                            <div className="flex items-center space-x-2 text-sm text-gray-400">
                                <Leaf className="h-4 w-4 text-green-400" />
                                <span>
                                    USDA Organic • Non-GMO • Gluten-Free
                                </span>
                            </div>
                        </div> */}
                    </div>
                </div>

                <Separator className="my-8 bg-gray-800" />

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between text-sm text-gray-400 md:flex-row">
                    <p>© 2025 FNB e-Commerce. All rights reserved.</p>
                    <div className="mt-4 flex space-x-6 md:mt-0">
                        <a
                            href="#privacy"
                            className="transition-colors hover:text-white"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#terms"
                            className="transition-colors hover:text-white"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#cookies"
                            className="transition-colors hover:text-white"
                        >
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
