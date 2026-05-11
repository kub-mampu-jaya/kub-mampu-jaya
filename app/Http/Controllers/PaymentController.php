<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Courier;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Midtrans\Snap;
use Midtrans\Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function create(Request $request)
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');

        try {
            $user = Auth::user();
            $customOrderId = time() . rand(100, 999);
            $shop_branch_id = 1;

            $order = DB::transaction(function () use ($request, $user, $customOrderId, $shop_branch_id) {
                foreach ($request->cart_items as $item) {
                    $product = Product::find($item['product_id']);
                    if (!$product || $product->quantity < $item['quantity']) {
                        throw new \Exception('Stok produk ' . ($product ? $product->name : '') . ' tidak mencukupi.');
                    }
                }

                $courier = Courier::inRandomOrder()->first();
                $courier_id = $courier ? $courier->id : null;

                $order = Order::create([
                    'user_id' => $user->id,
                    'order_id' => $customOrderId,
                    'shop_branch_id' => $shop_branch_id,
                    'courier_id' => $courier_id,
                    'total' => $request->total,
                    'payment_status' => 'pending',
                    'status' => 'pending',
                    'payment_method' => $request->payment_method,
                    'total_amount' => $request->total,
                    'subtotal' => $request->subtotal,
                    'delivery_fee' => $request->delivery_fee,
                ]);

                foreach ($request->cart_items as $item) {
                    OrderDetail::create([
                        'order_id' => $order->id,
                        'product_id' => $item['product_id'],
                        'quantity' => $item['quantity'],
                        'subtotal' => $request->total,
                    ]);

                    $product = Product::find($item['product_id']);
                    $product->decrement('quantity', $item['quantity']);
                }

                return $order;
            });

            $params = array(
                'transaction_details' => array(
                    'order_id' => $order->order_id,
                    'gross_amount' => ceil($order->total),
                ),
                'customer_details' => array(
                    'first_name' => $user->name,
                    'email' => $user->email,
                ),
            );
            $snapToken = Snap::getSnapToken($params);

            return response()->json([
                'order_order_id' => $order->order_id,
                'snap_token' => $snapToken,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Gagal membuat order: ' . $th->getMessage(),
            ], 500);
        }
    }
}
