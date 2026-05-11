// import greyBackground from 'figma:asset/a0db27bdaccee7281040b12773da358fcf6e87f1.png';
import { Clock, Heart, Truck } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Card, CardContent } from '../ui/card';

export function Features() {
    const features = [
        {
            icon: Clock,
            title: 'Lebih Awet',
            description:
                'Dikemas secara higienis untuk menjaga kualitas dan kesegarannya.',
        },
        {
            icon: Truck,
            title: 'Ringan & Mudah Dibawa',
            description:
                'Cocok untuk bekal, piknik, atau sekadar camilan cepat di sela aktivitas.',
        },
        {
            icon: Heart,
            title: 'Mudah Disiapkan',
            description:
                'Cukup panaskan sebentar dan makanan siap dinikmati—tanpa perlu keahlian memasak.',
        },
    ];

    return (
        <section
            className="relative bg-gradient-to-r from-orange-500 to-red-500 bg-cover bg-center bg-no-repeat py-20 text-white"
            id="why-us"
        >
            {/* Overlay for better text readability */}

            <div className="relative z-10 container mx-auto px-4">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Content */}
                    <div>
                        <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                            Kenapa Memilih Makanan Cepat Saji Kami?
                        </h2>
                        <p className="mb-8 text-lg text-white">
                            Hidangan cepat saji kami dibuat untuk anda yang
                            ingin makan enak tanpa membuang waktu. Praktis untuk
                            kerja, kuliah, perjalanan, atau saat tidak sempat
                            memasak.
                        </p>

                        <div className="grid gap-6">
                            {features.map((feature, index) => (
                                <Card
                                    key={index}
                                    className="border-none bg-white shadow-none backdrop-blur-sm"
                                >
                                    <CardContent className="flex items-start space-x-4 p-6">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100">
                                            <feature.icon className="h-6 w-6 text-orange-600" />
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
                                    src="images/coca.jpg"
                                    alt="Freeze dried strawberries"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                                <img
                                    src="images/Pizza.jpg"
                                    alt="Camping meal preparation"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="space-y-4 pt-8">
                            <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                                <img
                                    src="images/Kentang.jpg"
                                    alt="Emergency food storage"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="aspect-square overflow-hidden rounded-xl shadow-lg">
                                <ImageWithFallback
                                    src="https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=300&h=300&fit=crop"
                                    alt="Healthy meal prep"
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
