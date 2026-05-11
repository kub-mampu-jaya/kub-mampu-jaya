<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

class DeliveryController extends Controller
{
    public function detail(Order $order) {
        // Eager load all necessary relationships for efficiency
        $order->load('orderDetails.product', 'shopBranch', 'courier');

        // Data for the 'user' prop
        $user = Auth::user();

        // Data for the 'orderItems' prop
        $orderItems = $order->orderDetails;

        // Data for the 'nearestBranch' prop
        $nearestBranch = [
            'name'     => $order->shopBranch->name ?? 'Cabang tidak ditemukan',
            'distance' => "2 KM",
            'address'  => $order->shopBranch->address ?? 'Alamat tidak tersedia',
        ];

        // Data for the 'courierInfo' prop
        $courierInfo = [
            'name'   => $order->courier->name ?? 'Kurir belum ditugaskan',
            'plate'  => $order->courier->license_plate ?? '-',
            'status' => $order->status, // Assuming order status reflects courier status
        ];

        // Data for the 'recommendations' prop
        $recommendations = \App\Models\Product::whereNotNull('price_discount')
            ->where('price_discount', '>', 0)
            ->inRandomOrder()
            ->limit(2)
            ->get()
            ->map(function ($product) {
                // Calculate discount percentage, avoid division by zero
                $discountPercentage = $product->price_origin > 0
                    ? ($product->price_origin - $product->price_discount) / $product->price_origin
                    : 0;

                return [
                    'id'       => $product->id,
                    'name'     => $product->name,
                    'discount' => round($discountPercentage, 2),
                    'price'    => $product->price_discount,
                ];
            });

        // Data for the 'currentStepIndex' prop
        $statusMap = [
            'confirmed'   => 0,
            'processing'  => 1,
            'shipped'     => 2,
            'delivered'   => 3,
        ];
        $currentStepIndex = $statusMap[$order->status] ?? 0;

        // Data for the 'trackingDetails' prop
        // Assumes 'confirmed_at', 'processing_at', 'shipped_at', 'delivered_at' timestamps exist on the Order model
        $trackingSteps = [
            ['date' => $order->confirmed_at, 'completed' => !is_null($order->confirmed_at)],
            ['date' => $order->processing_at, 'completed' => !is_null($order->processing_at)],
            ['date' => $order->shipped_at, 'completed' => !is_null($order->shipped_at)],
            ['date' => $order->delivered_at, 'completed' => !is_null($order->delivered_at)],
        ];

        $trackingDetails = array_map(function ($step, $index) use ($currentStepIndex) {
            $dateText = '...';
            if ($step['completed']) {
                $dateText = $step['date']->format('H:i A');
            } elseif ($index === $currentStepIndex) {
                $dateText = 'Sedang berlangsung';
            }
            return ['date' => $dateText, 'completed' => $step['completed']];
        }, $trackingSteps, array_keys($trackingSteps));


        $props = [
            'user' => $user,
            'orderNumber' => $order->id,
            'orderItems' => $orderItems,
            'nearestBranch' => $nearestBranch,
            'courierInfo' => $courierInfo,
            'recommendations' => $recommendations,
            'currentStepIndex' => $currentStepIndex,
            'trackingDetails' => $trackingDetails,
        ];

        return Inertia::render('delivery', $props);
    }
}
