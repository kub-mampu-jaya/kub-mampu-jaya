import React from 'react';
import HeadingSmall from '@/components/heading-small';

export default function DeleteUser() {
    return (
        <div className="space-y-6">
            <HeadingSmall
                title="Delete account"
                description="Permanently delete your account"
                className="text-red-500"
            />
            <div className="p-6 border-l border-r border-b">
                 <p className="text-muted-foreground">
                    [Delete User form placeholder - Feature to be implemented]
                </p>
            </div>
        </div>
    );
}
