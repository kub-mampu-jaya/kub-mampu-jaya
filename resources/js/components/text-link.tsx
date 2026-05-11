import { cn } from '@/lib/utils';
import { Link, type InertiaLinkProps } from '@inertiajs/react';
import React from 'react';

export default function TextLink({ className, ...props }: InertiaLinkProps) {
    return (
        <Link
            className={cn(
                'text-sm text-muted-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:text-foreground hover:decoration-current! dark:decoration-neutral-500',
                className,
            )}
            {...props}
        />
    );
}
