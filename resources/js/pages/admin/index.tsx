import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { SearchProvider } from '@/context/search-provider';
import { AdminDashboard } from '@/features/admin';

export type StatsData = {
    title: string;
    value: string;
    change: string;
};

export type OverviewData = {
    name: string;
    total: number;
};

export type RecentSalesStats = {
    name: string;
    email: string;
    value: string;
};

export type AdminPageProps = {
    statsData: StatsData[];
    currentMonthSales: number;
    overviewData: OverviewData[];
    recentSales: RecentSalesStats[];
    trafficOverview: any;
    trafficStats: any;
    trafficSources: any;
    devices: any;
};

export default function AdminPage({
    statsData,
    overviewData,
    currentMonthSales,
    recentSales,
    trafficOverview,
    trafficStats,
    trafficSources,
    devices,
}: AdminPageProps) {
    return (
        <AuthenticatedLayout>
            <SearchProvider>
                <AdminDashboard
                    data={{
                        statsData,
                        overviewData,
                        currentMonthSales,
                        recentSales,
                        trafficOverview,
                        trafficStats,
                        trafficSources,
                        devices,
                    }}
                />
            </SearchProvider>
        </AuthenticatedLayout>
    );
}
