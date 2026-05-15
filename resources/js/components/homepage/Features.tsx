// import greyBackground from 'figma:asset/a0db27bdaccee7281040b12773da358fcf6e87f1.png';
import { Clock, Heart, Truck } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Card, CardContent } from '../ui/card';

export function Features() {
    const features = [
        {
            icon: Clock,
            title: 'Solusi Fleksibel Sesuai Kebutuhan',
            description:
                'Kami menyediakan layanan yang fleksibel, mulai dari pemesanan sepatu custom untuk gaya personal, hingga pengadaan slipper berkualitas untuk menunjang bisnis hospitality Anda. Semuanya dirancang untuk menjadi koleksi alas kaki yang trendi dengan desain presisi.',
        },
        {
            icon: Truck,
            title: 'Kualitas Premium',
            description:
                'Kami menggunakan material premium pilihan yang terbukti awet dan tangguh. Sebuah ketahanan yang bisa diandalkan untuk menemani berbagai kesibukan harian.',
        },
        {
            icon: Heart,
            title: 'Pelayanan Sepenuh Hati',
            description:
                'Kepuasan Anda adalah prioritas utama kami. Tim kami selalu siap berdiskusi dan membantu dengan ramah, mulai dari konsultasi pesanan hingga produk tiba dengan aman di tangan Anda.',
        },
    ];

    return (
        <section
            className="relative bg-gradient-to-r from-cream-500 to-cream-600 bg-cover bg-center bg-no-repeat py-20 text-white"
            id="why-us"
        >
            {/* Overlay for better text readability */}

            <div className="relative z-10 container mx-auto px-4">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Content */}
                    <div>
                        <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                            Kenapa Harus Pilih Kami Untuk Temani Langkah Anda?
                        </h2>
                        <p className="mb-8 text-lg text-white">
                            Bagi kami, ini bukan sekadar tentang alas kaki,
                            melainkan tentang membangun rasa percaya diri.
                            Sebagai produsen lokal, kami berkomitmen penuh
                            menghadirkan kualitas terbaik di setiap karya.
                        </p>

                        <div className="grid gap-6">
                            {features.map((feature, index) => (
                                <Card
                                    key={index}
                                    className="border-none bg-white shadow-none backdrop-blur-sm"
                                >
                                    <CardContent className="flex items-start space-x-4 p-6">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100">
                                            <feature.icon className="h-6 w-6 textcream800" />
                                        </div>
                                        <div>
                                            <h3 className="mb-2 text-lg font-semibold text-gray-800">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="aspect-square overflow-hidden rounded-xl shadow-lg">
                                <img
                                    src="images/tas.png"
                                    alt="tas"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                                <img
                                    src="images/sandal hotel.png"
                                    alt="sandal hotel"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="space-y-4 pt-8">
                            <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                                <img
                                    src="images/sepatu p.png"
                                    alt="sepatu p"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="aspect-square overflow-hidden rounded-xl shadow-lg">
                                <ImageWithFallback
                                    src="images/sepatu.png"
                                    alt="sepatu"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
