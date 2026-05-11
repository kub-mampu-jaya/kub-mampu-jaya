import { PeriodType } from '@/pages/admin/cashflow-management';
import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';

interface CashflowSummaryCardProps {
    title: string;
    amount: number;
    growth: number;
    icon: LucideIcon;
    iconBgColor: string;
    iconColor: string;
    isPercentage?: boolean;
    isCount?: boolean;
    period: PeriodType;
}

export function CashflowSummaryCard({
    title,
    amount,
    growth,
    icon: Icon,
    iconBgColor,
    iconColor,
    isPercentage = false,
    isCount = false,
    period,
}: CashflowSummaryCardProps) {
    const isPositive = growth >= 0;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const formatNumber = (value: number) => {
        return new Intl.NumberFormat('id-ID').format(value);
    };

    const getPeriodText = () => {
        switch (period) {
            case 'daily':
                return 'vs hari sebelumnya';
            case 'weekly':
                return 'vs minggu sebelumnya';
            case 'monthly':
                return 'vs bulan sebelumnya';
            case 'yearly':
                return 'vs tahun sebelumnya';
            default:
                return 'vs periode sebelumnya';
        }
    };

    const displayValue = isPercentage
        ? `${amount.toFixed(1)}%`
        : isCount
          ? formatNumber(amount)
          : formatCurrency(amount);

    return (
        <div className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-gray-500">{title}</p>
                    <p className="mt-2 text-gray-900">{displayValue}</p>
                </div>
                <div
                    className={`${iconBgColor} ${iconColor} rounded-lg p-3 shadow-sm`}
                >
                    <Icon className="h-5 w-5" />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div
                    className={`flex items-center gap-1 rounded-md px-2 py-1 ${
                        isPositive ? 'bg-white' : 'bg-white'
                    }`}
                >
                    {isPositive ? (
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                        <TrendingDown className="h-3.5 w-3.5 text-red-600" />
                    )}
                    <span
                        className={`${isPositive ? 'text-emerald-700' : 'text-red-700'}`}
                    >
                        {isPositive ? '+' : ''}
                        {growth.toFixed(1)}%
                    </span>
                </div>
                <span className="text-gray-500">{getPeriodText()}</span>
            </div>
        </div>
    );
}
