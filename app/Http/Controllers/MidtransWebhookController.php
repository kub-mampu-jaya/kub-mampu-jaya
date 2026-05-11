<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class MidtransWebhookController extends Controller
{
    public function handle(Request $request)
    {
        $testFile = fopen(storage_path('logs/midtrans-webhook.log'), 'a');
        try {
            fwrite($testFile, json_encode($request->all()) . "\n");
        // VALIDASI SIGNATURE
        $signature = hash(
            'sha512',
            $request->order_id .
            $request->status_code .
            $request->gross_amount .
            config('midtrans.server_key')
        );

        fwrite($testFile, "Computed Signature: " . $signature . "\n");

        if ($signature !== $request->signature_key) {
            abort(403);
        }

        fwrite($testFile, "Signature valid\n");

        $order = Order::where('order_id', $request->order_id)->firstOrFail();

        fwrite($testFile, "Order found: ID " . $order->id . "\n");

        $is_success = in_array($request->transaction_status, ['settlement', 'capture']);

        fwrite($testFile, "Transaction Status: " . $request->transaction_status . "\n");

        if ($is_success) {
            fwrite($testFile, "Payment successful, updating order\n");
            $order->update([
                'payment_status' => 'paid',
                'payment_type' => $request->payment_type,
                'paid_at' => now()
            ]);
            fwrite($testFile, "Order updated successfully\n");
        }

        if ($request->transaction_status === 'expire') {
            $order->update(['payment_status' => 'expired']);
        }
        fwrite($testFile, "Webhook processing completed\n");

            fclose($testFile);
        } catch (\Exception $e) {
            fwrite($testFile, "Error: " . $e->getMessage() . "\n");
            fclose($testFile);
            throw $e;
        }
        return response()->json(['ok' => true]);
    }
}
