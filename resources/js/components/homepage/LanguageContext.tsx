import { createContext, ReactNode, useContext, useState } from 'react';

type Language = 'en' | 'tr' | 'de';

interface Translations {
    en: Record<string, string>;
    tr: Record<string, string>;
    de: Record<string, string>;
}

const translations: Translations = {
    en: {
        // Navigation
        home: 'Beranda',
        products: 'Produk',
        about: 'Tentang Kami',
        sustainability: 'Keberlanjutan',
        contact: 'Kontak',

        // Hero Section
        heroTitle: 'Makanan Cepat Saji Lezat, Untuk',
        heroTitleHighlight: 'Teman Aktivitas Sehari-Hari',
        heroDescription:
            'Nikmati hidangan cepat saji yang praktis, enak, dan selalu siap menemani kesibukan anda. Menu kami dibuat dengan bahan pilihan dan diolah agar tetap segar, sehingga anda bisa menikmati makanan',
        ecoFriendly: 'Kualitas Terjaga',
        sustainablePackaging: 'Mutu selalu konsisten',
        longLasting: 'Cepat & Praktis',
        shelfLife: 'Waktu penyajian minim',
        nutrientRich: 'Standar Higienis',
        nutritionRetained: 'Proses sesuai regulasi',
        accessible: 'Mudah Diakses',
        easyPreparation: 'Tersedia kapan saja',
        checkOurProducts: 'Cek Produk Kami',
        shopNow: 'Shop Now',
        learnMore: 'Lebih Lanjut',
        freeShipping: 'Pengiriman Gratis',
        dayReturns: 'Pengembalian 30 Hari',
        natural: '100% Natural',

        // Products Section
        ourProducts: 'Our Products',
        premiumCollection: 'Premium Freeze Dried Collection',
        productsDescription:
            'From nutrient-packed fruits to complete meal solutions, discover our range of carefully crafted freeze-dried foods that maintain their original taste and nutrition.',
        addToCart: 'Add to Cart',
        viewAllProducts: 'View All Products',

        // Features Section
        whyChoose: 'Why Choose Freeze Dried Foods?',
        featuresDescription:
            'Our innovative freeze-drying technology preserves food at its peak freshness, creating lightweight, nutritious meals that last for decades without refrigeration.',

        // Shopping Cart
        shoppingCart: 'Shopping Cart',
        cartEmpty: 'Your cart is empty',
        cartEmptyDesc: 'Add some delicious freeze-dried foods to get started!',
        continueShopping: 'Continue Shopping',
        subtotal: 'Subtotal',
        shipping: 'Shipping',
        total: 'Total',
        checkout: 'Checkout',

        // Footer
        stayConnected: 'Tetap Terhubung dengan Kami',
        newsletterDesc:
            'Dapatkan pembaruan terbaru tentang produk baru, inisiatif keberlanjutan, dan penawaran eksklusif.',
        subscribe: 'Ikuti',
        quickLinks: 'Akses Cepat',
        customerService: 'Layanan Pelanggan',
        contactInfo: 'Info Kontak',
        certifications: 'Certifications',
    },
    tr: {
        // Navigation
        home: 'Ana Sayfa',
        products: 'Ürünler',
        about: 'Hakkımızda',
        sustainability: 'Sürdürülebilirlik',
        contact: 'İletişim',

        // Hero Section
        heroTitle: 'Geleceğin Premium Dondurarak',
        heroTitleHighlight: 'Kurutulmuş Gıdaları',
        heroDescription:
            "Taviz vermeden beslenme deneyimi yaşayın. TAGIDA Naturals'ın çevik dondurarak kurutma yaklaşımı, maksimum besin değerini korurken herkes için sürdürülebilir, erişilebilir gıda çözümleri yaratır.",
        ecoFriendly: 'Çevre Dostu',
        sustainablePackaging: 'Sürdürülebilir ambalaj',
        longLasting: 'Uzun Ömürlü',
        shelfLife: '25+ yıl raf ömrü',
        nutrientRich: 'Besin Değeri Yüksek',
        nutritionRetained: '%98 beslenme değeri korunur',
        accessible: 'Erişilebilir',
        easyPreparation: 'Kolay hazırlık',
        shopNow: 'Hemen Alışveriş',
        learnMore: 'Daha Fazla Bilgi',
        freeShipping: 'Ücretsiz Kargo',
        dayReturns: '30 Gün İade',
        natural: '%100 Doğal',

        // Products Section
        ourProducts: 'Ürünlerimiz',
        premiumCollection: 'Premium Dondurarak Kurutulmuş Koleksiyon',
        productsDescription:
            'Besin değeri yüksek meyvelerden komple öğün çözümlerine kadar, orijinal lezzet ve besin değerini koruyan özenle hazırlanmış dondurarak kurutulmuş gıda ürünleri koleksiyonumuzu keşfedin.',
        addToCart: 'Sepete Ekle',
        viewAllProducts: 'Tüm Ürünleri Görüntüle',

        // Features Section
        whyChoose: 'Neden Dondurarak Kurutulmuş Gıdalar?',
        featuresDescription:
            'Yenilikçi dondurarak kurutma teknolojimiz, gıdaları en taze halinde koruyarak soğutma gerektirmeyen, hafif ve besleyici öğünler yaratır.',

        // Shopping Cart
        shoppingCart: 'Alışveriş Sepeti',
        cartEmpty: 'Sepetiniz boş',
        cartEmptyDesc:
            'Başlamak için lezzetli dondurarak kurutulmuş gıdalar ekleyin!',
        continueShopping: 'Alışverişe Devam Et',
        subtotal: 'Ara Toplam',
        shipping: 'Kargo',
        total: 'Toplam',
        checkout: 'Ödeme',

        // Footer
        stayConnected: 'Bağlantıda Kalın',
        newsletterDesc:
            "TAGIDA Naturals'dan yeni ürünler, sürdürülebilirlik girişimleri ve özel teklifler hakkında en son güncellemeleri alın.",
        subscribe: 'Abone Ol',
        quickLinks: 'Hızlı Bağlantılar',
        customerService: 'Müşteri Hizmetleri',
        contactInfo: 'İletişim Bilgileri',
        certifications: 'Sertifikalar',
    },
    de: {
        // Navigation
        home: 'Startseite',
        products: 'Produkte',
        about: 'Über uns',
        sustainability: 'Nachhaltigkeit',
        contact: 'Kontakt',

        // Hero Section
        heroTitle: 'Premium Gefriergetrocknete Lebensmittel für die',
        heroTitleHighlight: 'Zukunft',
        heroDescription:
            "Erleben Sie Ernährung ohne Kompromisse. TAGIDA Naturals' agiler Ansatz zur Gefriertrocknung bewahrt maximale Nährstoffe und schafft nachhaltige, zugängliche Lebensmittellösungen für alle.",
        ecoFriendly: 'Umweltfreundlich',
        sustainablePackaging: 'Nachhaltige Verpackung',
        longLasting: 'Langlebig',
        shelfLife: '25+ Jahre Haltbarkeit',
        nutrientRich: 'Nährstoffreich',
        nutritionRetained: '98% Nährstoffe erhalten',
        accessible: 'Zugänglich',
        easyPreparation: 'Einfache Zubereitung',
        shopNow: 'Jetzt Einkaufen',
        learnMore: 'Mehr Erfahren',
        freeShipping: 'Kostenloser Versand',
        dayReturns: '30-Tage Rückgabe',
        natural: '100% Natürlich',

        // Products Section
        ourProducts: 'Unsere Produkte',
        premiumCollection: 'Premium Gefriergetrocknete Kollektion',
        productsDescription:
            'Von nährstoffreichen Früchten bis hin zu kompletten Mahlzeitenlösungen - entdecken Sie unser Sortiment sorgfältig hergestellter gefriergetrockneter Lebensmittel, die ihren ursprünglichen Geschmack und ihre Nährstoffe bewahren.',
        addToCart: 'In den Warenkorb',
        viewAllProducts: 'Alle Produkte Anzeigen',

        // Features Section
        whyChoose: 'Warum Gefriergetrocknete Lebensmittel Wählen?',
        featuresDescription:
            'Unsere innovative Gefriertrocknungstechnologie bewahrt Lebensmittel in ihrer höchsten Frische und schafft leichte, nahrhafte Mahlzeiten, die jahrzehntelang ohne Kühlung haltbar sind.',

        // Shopping Cart
        shoppingCart: 'Warenkorb',
        cartEmpty: 'Ihr Warenkorb ist leer',
        cartEmptyDesc:
            'Fügen Sie einige köstliche gefriergetrocknete Lebensmittel hinzu, um zu beginnen!',
        continueShopping: 'Weiter Einkaufen',
        subtotal: 'Zwischensumme',
        shipping: 'Versand',
        total: 'Gesamt',
        checkout: 'Zur Kasse',

        // Footer
        stayConnected: 'Bleiben Sie Verbunden',
        newsletterDesc:
            'Erhalten Sie die neuesten Updates zu neuen Produkten, Nachhaltigkeitsinitiativen und exklusiven Angeboten von TAGIDA Naturals.',
        subscribe: 'Abonnieren',
        quickLinks: 'Schnelle Links',
        customerService: 'Kundendienst',
        contactInfo: 'Kontaktinformationen',
        certifications: 'Zertifizierungen',
    },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
