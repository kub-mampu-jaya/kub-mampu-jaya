import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Download,
    MapPin,
    Medal,
    TrendingUp,
    Trophy,
    Users,
} from 'lucide-react';
import { useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

// const areaData = [
//     {
//         area: 'Jakarta Selatan',
//         totalCustomers: 845,
//         totalOrders: 3250,
//         totalRevenue: 42500000,
//         avgOrderValue: 130769,
//         topProduct: 'Nasi Goreng Spesial',
//         growth: 15.3,
//     },
//     {
//         area: 'Jakarta Pusat',
//         totalCustomers: 698,
//         totalOrders: 2780,
//         totalRevenue: 38200000,
//         avgOrderValue: 137410,
//         topProduct: 'Ayam Geprek',
//         growth: 12.8,
//     },
//     {
//         area: 'Jakarta Barat',
//         totalCustomers: 612,
//         totalOrders: 2450,
//         totalRevenue: 32800000,
//         avgOrderValue: 133878,
//         topProduct: 'Kopi Latte Premium',
//         growth: 10.5,
//     },
//     {
//         area: 'Jakarta Timur',
//         totalCustomers: 534,
//         totalOrders: 2120,
//         totalRevenue: 28500000,
//         avgOrderValue: 134433,
//         topProduct: 'Es Teh Manis',
//         growth: 8.7,
//     },
//     {
//         area: 'Bandung',
//         totalCustomers: 478,
//         totalOrders: 1890,
//         totalRevenue: 25600000,
//         avgOrderValue: 135449,
//         topProduct: 'Nasi Goreng Spesial',
//         growth: 11.2,
//     },
//     {
//         area: 'Surabaya',
//         totalCustomers: 423,
//         totalOrders: 1650,
//         totalRevenue: 22100000,
//         avgOrderValue: 133939,
//         topProduct: 'Sate Ayam',
//         growth: 9.8,
//     },
//     {
//         area: 'Yogyakarta',
//         totalCustomers: 356,
//         totalOrders: 1420,
//         totalRevenue: 18900000,
//         avgOrderValue: 133099,
//         topProduct: 'Mie Goreng',
//         growth: 7.5,
//     },
//     {
//         area: 'Semarang',
//         totalCustomers: 289,
//         totalOrders: 1150,
//         totalRevenue: 15400000,
//         avgOrderValue: 133913,
//         topProduct: 'Ayam Geprek',
//         growth: 6.3,
//     },
// ];

// const monthlyAreaDataDummy = [
//     { month: 'Jan', jaksel: 3.2, jakpus: 2.8, jakbar: 2.4, jaktim: 2.0 },
//     { month: 'Feb', jaksel: 3.5, jakpus: 3.0, jakbar: 2.6, jaktim: 2.2 },
//     { month: 'Mar', jaksel: 3.8, jakpus: 3.3, jakbar: 2.8, jaktim: 2.4 },
//     { month: 'Apr', jaksel: 4.0, jakpus: 3.5, jakbar: 3.0, jaktim: 2.6 },
//     { month: 'Mei', jaksel: 4.2, jakpus: 3.7, jakbar: 3.2, jaktim: 2.7 },
//     { month: 'Jun', jaksel: 4.5, jakpus: 3.9, jakbar: 3.4, jaktim: 2.9 },
// ];

interface AreaData {
    area: string;
    totalCustomers: number;
    totalOrders: number;
    totalRevenue: number;
    avgOrderValue: number;
    topProduct: string;
    growth: number;
}

interface MonthlyAreaData {
    month: string;
    jaksel: number;
    jakpus: number;
    jakbar: number;
    jaktim: number;
}

interface AreaSalesReportProps {
    data: {
        areaData: AreaData[];
        monthlyAreaData: MonthlyAreaData[];
    };
}

const COLORS = [
    '#f97316',
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#8b5cf6',
    '#ec4899',
    '#14b8a6',
    '#84cc16',
];

export function AreaSalesReport({ data: { areaData, monthlyAreaData } }: any) {
    const areaRevenueShare = areaData.map((area: any) => ({
        name: area.area.replace(/([a-z])([A-Z])/g, '$1 $2'),
        value: area.totalRevenue,
    }));

    console.log('areaRevenueShare', areaRevenueShare);

    const [sortBy, setSortBy] = useState('revenue');
    const [timeFilter, setTimeFilter] = useState('month');

    const sortedAreas = [...areaData].sort((a, b) => {
        if (sortBy === 'revenue') return b.totalRevenue - a.totalRevenue;
        if (sortBy === 'orders') return b.totalOrders - a.totalOrders;
        if (sortBy === 'customers') return b.totalCustomers - a.totalCustomers;
        if (sortBy === 'growth') return b.growth - a.growth;
        return 0;
    });

    const monthlyAreaDataKeys = Object.keys(monthlyAreaData[0]).slice(1);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const totalRevenue = areaData.reduce(
        (sum, area) => sum + area.totalRevenue,
        0,
    );
    const totalOrders = areaData.reduce(
        (sum, area) => sum + area.totalOrders,
        0,
    );
    const totalCustomers = areaData.reduce(
        (sum, area) => sum + area.totalCustomers,
        0,
    );

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="mb-1 text-slate-600">
                                    Total Area
                                </p>
                                <h2>{areaData.length}</h2>
                            </div>
                            <div className="rounded-lg bg-orange-100 p-3">
                                <MapPin className="size-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="mb-1 text-slate-600">
                                    Total Pelanggan
                                </p>
                                <h2>
                                    {totalCustomers.toLocaleString('id-ID')}
                                </h2>
                            </div>
                            <div className="rounded-lg bg-blue-100 p-3">
                                <Users className="size-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="mb-1 text-slate-600">
                                    Total Pesanan
                                </p>
                                <h2>{totalOrders.toLocaleString('id-ID')}</h2>
                            </div>
                            <div className="rounded-lg bg-green-100 p-3">
                                <TrendingUp className="size-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="mb-1 text-slate-600">
                                    Total Pendapatan
                                </p>
                                <h3 className="text-green-600">
                                    {formatCurrency(totalRevenue)}
                                </h3>
                            </div>
                            <div className="rounded-lg bg-purple-100 p-3">
                                <TrendingUp className="size-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Trend Penjualan per Area (Juta Rupiah)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyAreaData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {monthlyAreaDataKeys.map((dataKey, i) => {
                                    const colors = [
                                        '#f97316',
                                        '#3b82f6',
                                        '#10b981',
                                        '#f59e0b',
                                    ];
                                    return (
                                        <Bar
                                            key={i}
                                            dataKey={dataKey}
                                            fill={colors[i]}
                                            name={dataKey}
                                        />
                                    );
                                })}
                                {/* <Bar
                                    dataKey="jaksel"
                                    fill="#f97316"
                                    name="Jakarta Selatan"
                                />
                                <Bar
                                    dataKey="jakpus"
                                    fill="#3b82f6"
                                    name="Jakarta Pusat"
                                />
                                <Bar
                                    dataKey="jakbar"
                                    fill="#10b981"
                                    name="Jakarta Barat"
                                />
                                <Bar
                                    dataKey="jaktim"
                                    fill="#f59e0b"
                                    name="Jakarta Timur"
                                /> */}
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Kontribusi Pendapatan per Area</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={areaRevenueShare}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => {
                                        const formatted = name
                                            .split(/(?=[A-Z])/)
                                            .join(' ');
                                        return `${formatted}: ${(percent * 100).toFixed(0)}%`;
                                    }}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {areaRevenueShare.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip
                                    formatter={(value: number) =>
                                        formatCurrency(value)
                                    }
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Area Sales Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>
                            Laporan Pembelian Berdasarkan Area
                        </CardTitle>
                        <div className="flex gap-2">
                            <Select
                                value={timeFilter}
                                onValueChange={setTimeFilter}
                            >
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Periode" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="week">
                                        Minggu Ini
                                    </SelectItem>
                                    <SelectItem value="month">
                                        Bulan Ini
                                    </SelectItem>
                                    <SelectItem value="year">
                                        Tahun Ini
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Urutkan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="revenue">
                                        Pendapatan Tertinggi
                                    </SelectItem>
                                    <SelectItem value="orders">
                                        Pesanan Terbanyak
                                    </SelectItem>
                                    <SelectItem value="customers">
                                        Pelanggan Terbanyak
                                    </SelectItem>
                                    <SelectItem value="growth">
                                        Pertumbuhan Tertinggi
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <Button className="flex items-center gap-2">
                                <Download className="size-4" />
                                Export
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ranking</TableHead>
                                    <TableHead>Area</TableHead>
                                    <TableHead>Total Pelanggan</TableHead>
                                    <TableHead>Total Pesanan</TableHead>
                                    <TableHead>Total Pendapatan</TableHead>
                                    <TableHead>Rata-rata Nilai Order</TableHead>
                                    <TableHead>Produk Terlaris</TableHead>
                                    <TableHead>Pertumbuhan</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedAreas.map((area, index) => (
                                    <TableRow key={area.area}>
                                        <TableCell>
                                            <div className="flex items-center justify-center">
                                                <Badge
                                                    className={
                                                        index === 0
                                                            ? 'bg-yellow-500 text-white'
                                                            : index === 1
                                                              ? 'bg-gray-400 text-white'
                                                              : index === 2
                                                                ? 'bg-orange-600 text-white'
                                                                : 'bg-slate-200 text-slate-800'
                                                    }
                                                >
                                                    #{index + 1}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="size-4 text-orange-600" />
                                                {area.area}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {area.totalCustomers.toLocaleString(
                                                'id-ID',
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {area.totalOrders.toLocaleString(
                                                'id-ID',
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {formatCurrency(area.totalRevenue)}
                                        </TableCell>
                                        <TableCell>
                                            {formatCurrency(area.avgOrderValue)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {area.topProduct}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-green-600">
                                                <TrendingUp className="size-4" />
                                                {area.growth}%
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Top Performing Areas */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-600">
                            <Trophy className="size-6" /> Area Terbaik
                            (Pendapatan)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {sortedAreas.slice(0, 3).map((area, index) => (
                                <li
                                    key={area.area}
                                    className="flex items-center gap-4"
                                >
                                    {index === 0 && (
                                        <Medal className="size-7 shrink-0 text-yellow-500" />
                                    )}
                                    {index === 1 && (
                                        <Medal className="size-7 shrink-0 text-gray-400" />
                                    )}
                                    {index === 2 && (
                                        <Medal className="size-7 shrink-0 text-orange-600" />
                                    )}
                                    <div>
                                        <p className="font-semibold">
                                            {area.area}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {area.totalOrders.toLocaleString(
                                                'id-ID',
                                            )}{' '}
                                            pesanan
                                        </p>
                                    </div>
                                    <p className="ms-auto text-base font-semibold text-orange-600">
                                        {formatCurrency(area.totalRevenue)}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-600">
                            <Users className="size-6" /> Area Terbanyak
                            (Pelanggan)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {[...areaData]
                                .sort(
                                    (a, b) =>
                                        b.totalCustomers - a.totalCustomers,
                                )
                                .slice(0, 3)
                                .map((area, index) => (
                                    <li
                                        key={area.area}
                                        className="flex items-center gap-4"
                                    >
                                        {index === 0 && (
                                            <Medal className="size-7 shrink-0 text-yellow-500" />
                                        )}
                                        {index === 1 && (
                                            <Medal className="size-7 shrink-0 text-gray-400" />
                                        )}
                                        {index === 2 && (
                                            <Medal className="size-7 shrink-0 text-orange-600" />
                                        )}

                                        <div>
                                            <p className="font-semibold">
                                                {area.area}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {area.totalOrders.toLocaleString(
                                                    'id-ID',
                                                )}{' '}
                                                pesanan
                                            </p>
                                        </div>

                                        <p className="ms-auto text-base font-semibold text-blue-600">
                                            {area.totalCustomers.toLocaleString(
                                                'id-ID',
                                            )}{' '}
                                            pelanggan
                                        </p>
                                    </li>
                                ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-600">
                            <TrendingUp className="size-6" /> Area Tercepat
                            (Pertumbuhan)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {[...areaData]
                                .sort((a, b) => b.growth - a.growth)
                                .slice(0, 3)
                                .map((area, index) => (
                                    <li
                                        key={area.area}
                                        className="flex items-center gap-4"
                                    >
                                        {index === 0 && (
                                            <Medal className="size-7 shrink-0 text-yellow-500" />
                                        )}
                                        {index === 1 && (
                                            <Medal className="size-7 shrink-0 text-gray-400" />
                                        )}
                                        {index === 2 && (
                                            <Medal className="size-7 shrink-0 text-orange-600" />
                                        )}
                                        <div>
                                            <p className="font-semibold">
                                                {area.area}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {area.totalCustomers.toLocaleString(
                                                    'id-ID',
                                                )}{' '}
                                                pelanggan
                                            </p>
                                        </div>
                                        <div className="ms-auto flex items-center gap-1 text-lg font-semibold text-green-600">
                                            <TrendingUp className="size-5" />
                                            {area.growth}%
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
