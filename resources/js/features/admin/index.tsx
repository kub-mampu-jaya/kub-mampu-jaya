import { ConfigDrawer } from '@/components/config-drawer';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminPageProps } from '@/pages/admin';
import { useState } from 'react';
import { Analytics } from './components/analytics';
import { Overview } from './components/overview';
import { RecentSales } from './components/recent-sales';

const topNav = [
    {
        title: 'Overview',
        href: 'admin',
        isActive: true,
        disabled: false,
    },
    {
        title: 'Customers',
        href: 'admin/customer-management',
        isActive: false,
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

export function AdminDashboard({ data }: { data: AdminPageProps }) {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <>
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
                        Dashboard
                    </h1>
                    {/* <div className="flex items-center space-x-2">
                        <Button>Download</Button>
                    </div> */}
                </div>
                <Tabs
                    orientation="vertical"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="space-y-4"
                >
                    <div className="w-full overflow-x-auto pb-2">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="analytics">
                                Analytics
                            </TabsTrigger>
                            {/* <TabsTrigger value="reports" disabled>
                                Reports
                            </TabsTrigger>
                            <TabsTrigger value="notifications" disabled>
                                Notifications
                            </TabsTrigger> */}
                        </TabsList>
                    </div>
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Total Revenue
                                    </CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-orange-600"
                                    >
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {data.statsData[0].value}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {data.statsData[0].change}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Subscriptions
                                    </CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-orange-600"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {data.statsData[1].value}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {data.statsData[1].change}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Sales
                                    </CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-orange-600"
                                    >
                                        <rect
                                            width="20"
                                            height="14"
                                            x="2"
                                            y="5"
                                            rx="2"
                                        />
                                        <path d="M2 10h20" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {data.statsData[2].value}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {data.statsData[2].change}
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        Active Now
                                    </CardTitle>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="h-4 w-4 text-orange-600"
                                    >
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {data.statsData[3].value}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {data.statsData[3].change}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
                            <Card className="col-span-1 lg:col-span-4">
                                <CardHeader>
                                    <CardTitle>Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="ps-2">
                                    <Overview data={data.overviewData} />
                                </CardContent>
                            </Card>
                            <Card className="col-span-1 lg:col-span-3">
                                <CardHeader>
                                    <CardTitle>Recent Sales</CardTitle>
                                    <CardDescription>
                                        You made {data.currentMonthSales} sales
                                        this month.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RecentSales salesData={data.recentSales} />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="analytics" className="space-y-4">
                        <Analytics
                            data={{
                                trafficOverview: data.trafficOverview,
                                trafficStats: data.trafficStats,
                                trafficSources: data.trafficSources,
                                devices: data.devices,
                            }}
                        />
                    </TabsContent>
                </Tabs>
            </Main>
        </>
    );
}
