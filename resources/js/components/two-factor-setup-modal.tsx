// import TwoFactorController from '@/actions/App/Http/Controllers/Settings/TwoFactorController';
import { usePage } from '@inertiajs/react';
import { useForm } from 'laravel-precognition-react-inertia';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TwoFactorSetupModal() {
    const [enabling, setEnabling] = useState(false);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [setupKey, setSetupKey] = useState<string | null>(null);
    const { props } = usePage();

    const form = useForm('post', '/two-factor-challenge', {
        code: '',
    });

    const handleSubmission: FormEventHandler = (e) => {
        e.preventDefault();
        form.submit({
            preserveScroll: true,
            onSuccess: () => {
                //
            },
        });
    };

    const handleEnable = () => {
        setEnabling(true);
        // TwoFactorController.enable.submit({
        //     preserveScroll: true,
        //     onSuccess: (page) => {
        //         setQrCode(page.props.jetstream.flash.qrCode);
        //         setSetupKey(page.props.jetstream.flash.setupKey);
        //     },
        // });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button onClick={handleEnable} disabled={enabling}>
                    Enable
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Two-factor authentication</DialogTitle>
                    <DialogDescription>
                        Scan the QR code with your authenticator app.
                    </DialogDescription>
                </DialogHeader>

                {qrCode && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: qrCode,
                        }}
                    />
                )}

                {setupKey && (
                    <p className="text-sm text-muted-foreground">
                        Setup key: {setupKey}
                    </p>
                )}

                <form onSubmit={handleSubmission}>
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="code" className="sr-only">
                            Code
                        </Label>
                        <Input
                            id="code"
                            placeholder="Enter code"
                            value={form.data.code}
                            onChange={(e) =>
                                form.setData('code', e.target.value)
                            }
                        />
                    </div>
                    <DialogFooter className="mt-4">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={form.processing}
                        >
                            Submit
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
