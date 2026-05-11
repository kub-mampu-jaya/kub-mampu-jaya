// import TwoFactorController from '@/actions/App/Http/Controllers/Settings/TwoFactorController';
import { usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/button';

export default function TwoFactorRecoveryCodes() {
    const { auth } = usePage().props as any;

    return (
        <div>
            {auth.user.two_factor_recovery_codes?.length > 0 && (
                <div className="mt-4 space-y-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900">
                    <div className="grid gap-1">
                        <h3 className="font-medium">Recovery codes</h3>
                        <p className="text-sm text-muted-foreground">
                            Store these recovery codes in a secure location.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-x-4 gap-y-2 font-mono text-sm sm:grid-cols-2">
                        {auth.user.two_factor_recovery_codes.map(
                            (code: string) => (
                                <div key={code}>{code}</div>
                            ),
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <form /* {...TwoFactorController.regenerate.form()} */>
                            <Button variant="secondary" size="sm">
                                Regenerate
                            </Button>
                        </form>
                        <form /* {...TwoFactorController.disable.form()} */>
                            <Button variant="secondary" size="sm">
                                Disable
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
