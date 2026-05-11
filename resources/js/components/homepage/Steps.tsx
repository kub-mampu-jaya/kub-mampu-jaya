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
                'Daftar dengan cepat dan dapatkan akses ke berbagai menu makanan cepat saji pilihan.',
        },
        {
            icon: ShoppingCart,
            title: 'Pilih Menu Favoritmu',
            description:
                'Jelajahi berbagai menu yang tersedia dan pilih hidangan yang paling cocok dengan selera anda.',
        },
        {
            icon: Package,
            title: 'Sesuaikan Paket',
            description:
                'Atur porsi, jumlah pesanan, dan jadwal pengiriman sesuai kebutuhan.',
        },
        {
            icon: Clock,
            title: 'Lacak Pesanan',
            description:
                'Pantau proses pengiriman secara real-time dan tahu kapan pesanan akan sampai.',
        },
        {
            icon: Utensils,
            title: 'Panaskan & Nikmati',
            description:
                'Hangatkan sebentar, dan hidangan lezat siap Anda santap di mana pun.',
        },
        {
            icon: Star,
            title: 'Beri Penilaian',
            description:
                'Bantu kami berkembang dengan memberikan ulasan setelah menyantap menu kami.',
        },
    ];

    return (
        <section className="mx-auto max-w-6xl py-20">
            {/* Section Header */}
            <div className="mb-16 text-center">
                <h2 className="mb-2 text-3xl font-bold text-orange-600 md:text-4xl">
                    Proses Sederhana
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                    Dari dapur kami ke meja Anda dalam beberapa langkah mudah
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
                            <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 text-white shadow-sm">
                                <span>{index + 1}</span>
                            </div>

                            {/* Icon */}
                            <div className="mb-6">
                                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-orange-600">
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
