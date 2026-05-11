import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HomepageLayout from '@/layouts/client-side/HomepageLayout';
import { router, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function FakePayment() {
    const { props } = usePage();
    const { order_id, total } = props;

    const handlePaymentSuccess = () => {
        router.post('/payment/fake/success', { order_id });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        Fake Payment Page
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">
                        This is a fake payment page. In a real scenario, this
                        would be the Midtrans Snap payment gateway.
                    </p>
                    <div className="mb-4 space-y-2">
                        <p>
                            <strong>Order ID:</strong> {order_id}
                        </p>
                        <p>
                            <strong>Total:</strong> {total}
                        </p>
                    </div>
                    <Button
                        onClick={handlePaymentSuccess}
                        className="w-full bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Pay Now
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

FakePayment.layout = (page: ReactNode) => (
    <HomepageLayout>{page}</HomepageLayout>
);
