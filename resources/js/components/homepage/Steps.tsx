import {
    Clock,
    Package,
    ShoppingCart,
    Star,
    UserPlus,
    Utensils,
} from 'lucide-react';

export function Steps() {
    const steps = [
        {
            icon: UserPlus,
            title: 'Buat Akun',
            description:
                'Daftar dan hubungkan Anda dengan informasi produk terbaru hingga tracking pesanan Anda.',
        },
        {
            icon: ShoppingCart,
            title: 'Pilih Produk',
            description:
                'mulai dari koleksi sepatu premium, slipper hotel, hingga laundry bag. Pilih produk yang paling sesuai dengan kebutuhan atau gaya Anda.',
        },
        {
            icon: Package,
            title: 'Tentukan Detail & Customisasi',
            description:
                'Beri tahu kami spesifikasi yang Anda inginkan. Anda bisa berkonsultasi mengenai ukuran, penyesuaian desain, hingga detail sablon khusus sesuai yang diinginkan.',
        },
        {
            icon: Clock,
            title: 'Konfirmasi & Pembayaran',
            description:
                'Setelah detail pesanan dan estimasi waktu selesai disepakati, tim kami akan memberikan rincian total biaya. Lakukan pembayaran melalui metode yang tersedia secara aman, dan pesanan Anda akan langsung masuk ke antrean kami.',
        },
        {
            icon: Utensils,
            title: 'Produksi & Pengiriman',
            description:
                'Produk akan dikerjakan oleh pengrajin kami. Anda dapat melacak status pesanan secara realtime dari sistem kami hingga pesanan mendarat dengan aman di alamat Anda.',
        },
        {
            icon: Star,
            title: 'Berikan penilaian',
            description:
                'Saatnya mencoba! Setelah diterima dan dicoba bagikan pengalaman Anda dengan memberikan rating dan ulasan.',
        },
    ];

    return (
        <section className="mx-auto max-w-6xl py-20">
            {/* Section Header */}
            <div className="mb-16 text-center">
                <h2 className="mb-2 text-3xl font-bold text-cream-600 md:text-4xl">
                    Proses Sederhana
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                    Dari tangan pengrajin hingga ke tangan Anda
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid gap-8 md:grid-cols-3">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <div
                            key={index}
                            className="group relative rounded-xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:shadow-lg"
                        >
                            {/* Step Number */}
                            <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-lg bg-cream-600 text-white shadow-sm">
                                <span>{index + 1}</span>
                            </div>

                            {/* Icon */}
                            <div className="mb-6">
                                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-cream-600">
                                    <Icon
                                        className="h-7 w-7 text-white"
                                        strokeWidth={2}
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="mb-3 text-gray-900">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
