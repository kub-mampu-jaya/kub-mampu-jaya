import React from 'react';
import { cn } from '@/lib/utils';

export function PlaceholderPattern({ className, ...props }: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg
            className={cn('size-full', className)}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <defs>
                <pattern
                    id="placeholder-pattern"
                    width="32"
                    height="32"
                    patternUnits="userSpaceOnUse"
                    patternContentUnits="userSpaceOnUse"
                >
                    <path
                        d="M30.5 32V1.5H0"
                        fill="none"
                        strokeWidth="3"
                    ></path>
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                fill="url(#placeholder-pattern)"
            ></rect>
        </svg>
    );
}
