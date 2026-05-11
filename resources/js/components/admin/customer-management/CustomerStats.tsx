import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    CustomerSegmentation,
    MonthlyCustomer,
    RecentActivity,
    StatsData,
} from '@/pages/admin/customer-management';
import { formatPrice } from '@/utils/format-price';
import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import {
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

// const monthlyCustomers = [
//     { month: 'Jan', pelanggan: 245, pesanan: 580 },
//     { month: 'Feb', pelanggan: 289, pesanan: 645 },
//     { month: 'Mar', pelanggan: 312, pesanan: 720 },
//     { month: 'Apr', pelanggan: 356, pesanan: 810 },
//     { month: 'Mei', pelanggan: 398, pesanan: 920 },
//     { month: 'Jun', pelanggan: 425, pesanan: 1050 },
// ];

// const customerSegmentation = [
//     { name: 'Pelanggan Setia', value: 45, color: '#10b981' },
//     { name: 'Pelanggan Aktif', value: 30, color: '#3b82f6' },
//     { name: 'Pelanggan Baru', value: 15, color: '#f59e0b' },
//     { name: 'Tidak Aktif', value: 10, color: '#ef4444' },
// ];

// const statsData = [
//     {
//         title: 'Total Pelanggan',
//         value: '100',
//         change: '+12.5%',
//         icon: Users,
//         color: 'text-blue-600',
//         bgColor: 'bg-blue-100',
//     },
//     {
//         title: 'Pesanan Bulan Ini',
//         value: '20',
//         change: '+8.2%',
//         icon: ShoppingCart,
//         color: 'text-green-600',
//         bgColor: 'bg-green-100',
//     },
//     {
//         title: 'Pelanggan Aktif',
//         value: '1,892',
//         change: '+15.3%',
//         icon: TrendingUp,
//         color: 'text-purple-600',
//         bgColor: 'bg-purple-100',
//     },
//     {
//         title: 'Rata-rata Transaksi',
//         value: 'Rp 125K',
//         change: '+5.1%',
//         icon: DollarSign,
//         color: 'text-orange-600',
//         bgColor: 'bg-orange-100',
//     },
// ];

type CustomerStatsProps = {
    data: {
        monthlyCustomers: MonthlyCustomer[];
        customerSegmentation: CustomerSegmentation[];
        statsData: StatsData[];
        recentActivities: RecentActivity[];
    };
};

export function CustomerStats({
    data: {
        monthlyCustomers,
        customerSegmentation,
        statsData,
        recentActivities,
    },
}: CustomerStatsProps) {
    const statCards = [
        {
            title: 'Total Pelanggan',
            icon: Users,
            color: 'text-orange-600',
        },
        {
            title: 'Pesanan Bulan Ini',
            icon: ShoppingCart,
            color: 'text-orange-600',
        },
        {
            title: 'Pelanggan Aktif',
            icon: TrendingUp,
            color: 'text-orange-600',
        },
        {
            title: 'Rata-rata Transaksi',
            icon: DollarSign,
            color: 'text-orange-600',
        },
    ];



    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statsData.map((stat, index) => {
                    const Icon = statCards[index].icon;
                    return (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {statCards[index].title}
                                </CardTitle>
                                <Icon className={statCards[index].color} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stat.change} dari bulan lalu
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Customer Growth Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Pertumbuhan Pelanggan & Pesanan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={monthlyCustomers}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="pelanggan"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    name="Pelanggan Baru"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="pesanan"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    name="Total Pesanan"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Customer Segmentation */}
                <Card>
                    <CardHeader>
                        <CardTitle>Segmentasi Pelanggan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-center">
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={customerSegmentation}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, value }) =>
                                            `${name}: ${value}%`
                                        }
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {customerSegmentation.map(
                                            (entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.color}
                                                />
                                            ),
                                        )}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Aktivitas Pelanggan Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between border-b py-3 last:border-b-0"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white">
                                        {activity.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-slate-900">
                                            {activity.name}
                                        </p>
                                        <p className="text-slate-600">
                                            {activity.action} - {activity.item}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {!activity.amount ? (
                                        ''
                                    ) : (
                                        <p className="text-slate-900">
                                            {formatPrice(activity.amount)}
                                        </p>
                                    )}
                                    <p className="text-slate-500">
                                        {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
