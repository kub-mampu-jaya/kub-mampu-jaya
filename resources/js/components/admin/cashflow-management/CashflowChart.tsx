import {
    PeriodType,
    TrendDataItem,
    TrendDataPeriod,
} from '@/pages/admin/cashflow-management';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface CashflowChartProps {
    period: PeriodType;
    type: 'trend' | 'category';
    trendDataPeriod: TrendDataPeriod;
    categoryData: TrendDataItem[];
}

export function CashflowChart({
    period,
    type,
    trendDataPeriod,
    categoryData,
}: CashflowChartProps) {
    const trenDataPeriodOption = {
        daily: trendDataPeriod.dailyTrendData,
        weekly: trendDataPeriod.weeklyTrendData,
        monthly: trendDataPeriod.monthlyTrendData,
        yearly: trendDataPeriod.yearlyTrendData,
    };

    const trendData = trenDataPeriodOption[period];

    const formatCurrency = (value: number): string => {
        return `Rp ${(value / 1000000).toFixed(1)}jt`;
    };

    if (type === 'trend') {
        return (
            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div className="mb-6">
                    <h3 className="text-gray-900">Trend Pendapatan</h3>
                    <p className="mt-1 text-gray-500">
                        Grafik pendapatan dan jumlah pesanan
                    </p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f1f5f9"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="name"
                            stroke="#94a3b8"
                            style={{ fontSize: '12px' }}
                        />
                        <YAxis
                            stroke="#94a3b8"
                            tickFormatter={formatCurrency}
                            style={{ fontSize: '12px' }}
                        />
                        <Tooltip
                            formatter={(value: number, name: string) => {
                                if (name === 'pendapatan')
                                    return formatCurrency(value);
                                return value;
                            }}
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e2e8f0',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            }}
                            labelStyle={{
                                fontWeight: '600',
                                marginBottom: '4px',
                            }}
                        />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px' }}
                            iconType="circle"
                        />
                        <Line
                            type="monotone"
                            dataKey="pendapatan"
                            stroke="#10b981"
                            strokeWidth={3}
                            name="Pendapatan"
                            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="pesanan"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            name="Pesanan"
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }

    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h3 className="text-gray-900">Pendapatan per Kategori</h3>
                <p className="mt-1 text-gray-500">
                    Breakdown berdasarkan kategori produk
                </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f1f5f9"
                        vertical={false}
                    />
                    <XAxis
                        dataKey="name"
                        stroke="#94a3b8"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        tickFormatter={formatCurrency}
                        style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        }}
                        labelStyle={{ fontWeight: '600', marginBottom: '4px' }}
                    />
                    <Legend
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="circle"
                    />
                    <Bar
                        dataKey="pendapatan"
                        fill="#10b981"
                        name="Pendapatan"
                        radius={[8, 8, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
