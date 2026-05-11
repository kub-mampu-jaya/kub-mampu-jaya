import { Link } from '@inertiajs/react';
import { Globe, Leaf, Shield, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from './LanguageContext';
// import greenBackground from 'figma:asset/af8f9c76d5e9d20cdce79be680203c8c9e0c8526.png';

export function Hero() {
    const { t } = useLanguage();

    return (
        <section
            id="home"
            className="relative flex min-h-[100svh] items-center"
        >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 bg-cover bg-center py-12 text-white sm:py-16" />
            <div className="absolute inset-0 bg-black/10" />

            <div className="relative z-10 container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-3xl leading-tight font-bold text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
                                {t('heroTitle')}
                                <span className="text-white">
                                    {' '}
                                    {t('heroTitleHighlight')}
                                </span>
                            </h1>

                            <p className="max-w-xl text-base text-white/90 drop-shadow-md sm:text-lg">
                                {t('heroDescription')}
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 sm:gap-6">
                            {[
                                {
                                    icon: Leaf,
                                    title: t('ecoFriendly'),
                                    desc: t('sustainablePackaging'),
                                },
                                {
                                    icon: Zap,
                                    title: t('longLasting'),
                                    desc: t('shelfLife'),
                                },
                                {
                                    icon: Shield,
                                    title: t('nutrientRich'),
                                    desc: t('nutritionRetained'),
                                },
                                {
                                    icon: Globe,
                                    title: t('accessible'),
                                    desc: t('easyPreparation'),
                                },
                            ].map(({ icon: Icon, title, desc }, i) => (
                                <div
                                    key={i}
                                    className="flex items-start space-x-3 sm:items-center"
                                >
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm sm:h-10 sm:w-10">
                                        <Icon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold text-white sm:text-base">
                                            {title}
                                        </h3>
                                        <p className="text-xs text-white/80 sm:text-sm">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link href="/products">
                                <Button
                                    size="lg"
                                    className="w-full cursor-pointer bg-white text-primary shadow-lg hover:bg-white/90 sm:w-auto"
                                >
                                    {t('checkOurProducts')}
                                </Button>
                            </Link>

                            <Link href="#why-us">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="w-full cursor-pointer border-white text-white backdrop-blur-sm hover:bg-white/10 sm:w-auto"
                                >
                                    {t('learnMore')}
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/90 sm:text-sm">
                            {[
                                t('freeShipping'),
                                t('dayReturns'),
                                t('natural'),
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-center space-x-2"
                                >
                                    <span className="h-2 w-2 rounded-full bg-blue-400"></span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none">
                        <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
                            <img
                                src="images/menu.jpg"
                                alt="Premium freeze dried fruits and vegetables"
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -top-3 -right-3 rounded-xl bg-orange-500 p-3 shadow-lg backdrop-blur-sm sm:-top-4 sm:-right-4 sm:p-4">
                            <div className="text-center">
                                <div className="text-xl font-bold text-white sm:text-2xl">
                                    100%
                                </div>
                                <div className="text-xs text-white sm:text-sm">
                                    Halal
                                </div>
                            </div>
                        </div>

                        <div className="absolute -bottom-3 -left-3 rounded-xl bg-orange-500 p-3 shadow-lg backdrop-blur-sm sm:-bottom-4 sm:-left-4 sm:p-4">
                            <div className="text-center">
                                <div className="text-xl font-bold text-white sm:text-2xl">
                                    98%
                                </div>
                                <div className="text-xs text-white sm:text-sm">
                                    Berkualitas
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
