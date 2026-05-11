import { LucideIcon } from 'lucide-react';
import { Card } from './ui/card';

interface CategoryCardProps {
    name: string;
    icon: LucideIcon;
    count: number;
}

export function CategoryCard({ name, icon: Icon, count }: CategoryCardProps) {
    return (
        <Card className="flex cursor-pointer flex-col items-center justify-center gap-3 border-2 border-border bg-card p-6 transition-all duration-300 hover:border-primary hover:shadow-lg">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
                <Icon className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className="text-center">
                <h3>{name}</h3>
                <p className="text-muted-foreground">{count} items</p>
            </div>
        </Card>
    );
}
