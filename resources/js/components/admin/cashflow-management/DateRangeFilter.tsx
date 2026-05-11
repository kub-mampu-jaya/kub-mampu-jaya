import { PeriodType } from '@/pages/admin/cashflow-management';
import { Calendar } from 'lucide-react';

interface DateRangeFilterProps {
    period: PeriodType;
    setPeriod: (period: PeriodType) => void;
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

export function DateRangeFilter({
    period,
    setPeriod,
    selectedDate,
    setSelectedDate,
}: DateRangeFilterProps) {
    const periods: { value: PeriodType; label: string }[] = [
        { value: 'daily', label: 'Harian' },
        { value: 'weekly', label: 'Mingguan' },
        { value: 'monthly', label: 'Bulanan' },
        { value: 'yearly', label: 'Tahunan' },
    ];

    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            {/* Period Selector */}
            <div className="flex gap-1 rounded-md bg-gray-100 p-1 h-[36px]">
                {periods.map((p) => (
                    <button
                        key={p.value}
                        onClick={() => setPeriod(p.value)}
                        className={`
                            inline-flex h-full items-center justify-center rounded-md
                            px-3 py-1 text-sm font-medium border border-transparent
                            transition-all
                            ${
                                period === p.value
                                    ? "bg-gray-100 shadow-sm text-foreground" // Active → sama seperti TabsTrigger
                                    : "text-muted-foreground hover:text-foreground"
                            }
                        `}
                    >
                        {p.label}
                    </button>
                ))}
            </div>

            {/* Date Picker */}
            <div className="relative h-[36px]">
                <Calendar className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                <input
                    type="date"
                    value={selectedDate.toISOString().split('T')[0]}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="
                        h-full rounded-md border border-transparent bg-white
                        py-1 pr-4 pl-9 text-sm text-foreground
                        shadow-sm transition-all
                        focus:ring-[3px] focus:ring-ring/50 focus:outline-ring
                        dark:bg-input/30 dark:border-input
                        dark:text-foreground
                    "
                />
            </div>
        </div>
    );
}


