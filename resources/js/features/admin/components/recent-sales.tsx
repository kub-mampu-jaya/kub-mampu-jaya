import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RecentSalesStats } from '..';

export function RecentSales({ salesData }: { salesData: RecentSalesStats[] }) {
    return (
        <div className="space-y-8">
            {salesData.map((data, i) => (
                <div key={i} className="flex items-center gap-4">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                        <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-wrap items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-sm leading-none font-medium">
                                {data.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {data.email}
                            </p>
                        </div>
                        <div className="font-medium">{data.value}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
