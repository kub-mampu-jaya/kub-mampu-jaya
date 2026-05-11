import React from 'react';
import { cn } from '@/lib/utils';

type HeadingSmallProps = {
    title: string;
    description?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export default function HeadingSmall({
    title,
    description,
    className,
    ...props
}: HeadingSmallProps) {
    return (
        <div
            className={cn('grid gap-1', className)}
            {...props}
        >
            <h3 className="font-medium">{title}</h3>
            {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )}
        </div>
    );
}
