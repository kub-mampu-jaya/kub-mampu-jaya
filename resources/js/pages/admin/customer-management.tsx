import { AreaSalesReport } from '@/components/admin/customer-management/AreaSalesReport';
import { CustomerList } from '@/components/admin/customer-management/CustomerList';
import { CustomerStats } from '@/components/admin/customer-management/CustomerStats';
import { ProductEvaluation } from '@/components/admin/customer-management/ProductEvaluation';
import { ConfigDrawer } from '@/components/config-drawer';
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { TopNav } from '@/components/layout/top-nav';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchProvider } from '@/context/search-provider';
import { useState } from 'react';

const topNav = [
    {
        title: 'Overview',
        href: 'admin',
        isActive: false,
        disabled: false,
    },
    {
        title: 'Customers',
        href: 'admin/customer-management',
        isActive: true,
        disabled: false,
    },
    {
        title: 'Products',
        href: 'admin/product-management',
        isActive: false,
        disabled: false,
    },
    {
        title: 'Settings',
        href: 'admin/settings',
        isActive: false,
        disabled: false,
    },
];

export type MonthlyCustomer = {
    month: string;
    pelanggan: number;
    pesanan: number;
};

export type CustomerSegmentation = {
    name: string;
    value: number;
    color: string;
    [key: string]: any;
};

export type StatsData = {
    title: string;
    value: string;
    change: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
};

export type RecentActivity = {
    name: string;
    action: string;
    item: string;
    time: string;
    amount: number;
};

export type CustomerData = {
    id: string;
    name: string;
    email: string;
    phone: string;
    area: string;
    totalOrders: number;
    totalSpent: number;
    lastOrder: string;
    status: string;
    avgRating: number;
};

export type ProductData = {
    id: string;
    name: string;
    category: string;
    totalReviews: number;
    avgRating: number;
    rating5: number;
    rating4: number;
    rating3: number;
    rating2: number;
    rating1: number;
    totalSold: number;
    trend: string;
};

export type RatingDistribution = {
    rating: string;
    count: number;
    color: string;
};

export type AreaData = {
    area: string;
    totalCustomers: number;
    totalOrders: number;
    totalRevenue: number;
    avgOrderValue: number;
    topProduct: string;
    growth: number;
};

export type MonthlyAreaData = {
    month: string;
    jaksel: number;
    jakpus: number;
    jakbar: number;
    jaktim: number;
};

type CustomerManagementProps = {
    monthlyCustomers: MonthlyCustomer[];
    customerSegmentation: CustomerSegmentation[];
    statsData: StatsData[];
    customersData: CustomerData[];
    productsData: ProductData[];
    ratingDistribution: RatingDistribution[];
    areaData: AreaData[];
    monthlyAreaData: MonthlyAreaData[];
    recentActivities: RecentActivity[];
};

export default function CustomerManagement({
    monthlyCustomers,
    customerSegmentation,
    statsData,
    customersData,
    productsData,
    ratingDistribution,
    areaData,
    monthlyAreaData,
    recentActivities,
}: CustomerManagementProps) {
    const [activeTab, setActiveTab] = useState('overview');

    // console.log(users);

    return (
        <AuthenticatedLayout>
            <SearchProvider>
                {/* ===== Top Heading ===sea== */}
                <Header>
                    {/* <TopNav links={topNav} /> */}
                    <div className="ms-auto flex items-center space-x-4">
                        <Search />
                        <ThemeSwitch />
                        <ConfigDrawer />
                        <ProfileDropdown />
                    </div>
                </Header>

                {/* ===== Main ===== */}
                <Main>
                    <div className="mb-2 flex items-center justify-between space-y-2">
                        <h1 className="text-2xl font-bold tracking-tight">
                            Manajemen Pelanggan
                        </h1>
                        <div className="flex items-center space-x-2">
                            <Button>Download</Button>
                        </div>
                    </div>
                    <Tabs
                        orientation="vertical"
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-4"
                    >
                        <div className="w-full overflow-x-auto pb-2">
                            <TabsList>
                                <TabsTrigger
                                    value="overview"
                                    className="flex items-center gap-2"
                                >
                                    {/* <Users className="size-4" /> */}
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger
                                    value="customers"
                                    className="flex items-center gap-2"
                                >
                                    {/* <ShoppingBag className="size-4" /> */}
                                    Data Pelanggan
                                </TabsTrigger>
                                <TabsTrigger
                                    value="evaluation"
                                    className="flex items-center gap-2"
                                >
                                    {/* <Star className="size-4" /> */}
                                    Evaluasi Produk
                                </TabsTrigger>
                                <TabsTrigger
                                    value="area"
                                    className="flex items-center gap-2"
                                >
                                    {/* <MapPin className="size-4" /> */}
                                    Laporan Area
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="overview">
                            <CustomerStats
                                data={{
                                    monthlyCustomers,
                                    customerSegmentation,
                                    statsData,
                                    recentActivities,
                                }}
                            />
                        </TabsContent>

                        <TabsContent value="customers">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Data Pelanggan</CardTitle>
                                    <CardDescription>
                                        Berikut adalah daftar semua pelanggan
                                        Anda.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <CustomerList data={{ customersData }} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="evaluation">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Evaluasi Produk</CardTitle>
                                    <CardDescription>
                                        Analisis evaluasi produk dari para
                                        pelanggan.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ProductEvaluation
                                        data={{
                                            productsData,
                                            ratingDistribution,
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="area">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Laporan Area</CardTitle>
                                    <CardDescription>
                                        Laporan penjualan berdasarkan area
                                        pelanggan.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <AreaSalesReport
                                        data={{
                                            areaData,
                                            monthlyAreaData,
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </Main>
            </SearchProvider>
        </AuthenticatedLayout>
    );
}
