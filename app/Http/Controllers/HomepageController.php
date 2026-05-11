<?php

namespace App\Http\Controllers; 

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\Notification;

class HomepageController extends Controller
{
    public function index() {
        $products = Product::take(8)->get();

        foreach ($products as $product) {
            $reviews = $product->reviews()->get();
            $product->rating = $reviews->avg('rating');
        }
        
        $props = [
            'products' => $products,
        ];

        return Inertia::render('homepage/home', $props);
    }

    public function productDetail(Product $product) {
        $user = Auth::user();
        $reviews = $product->reviews()->get();
        
        $productImages = [
            $product->image,
            $product->image_2,
            $product->image_3,
            $product->image_4,
        ];

        $suggestedProducts = Product::take(4)->get();

        foreach ($suggestedProducts as $suggestedProduct) {
            $suggestedProductReviews = $suggestedProduct->reviews()->get();
            $suggestedProduct->rating = $suggestedProductReviews->avg('rating');
        }

        $props = [
            'user' => $user,
            'productImages' => $productImages,
            'product' => $product,
            'reviews' => $reviews,
            'suggestedProducts' => $suggestedProducts,
        ];
        
        return Inertia::render('homepage/product-details', $props);
    }

     public function productListing() {

        $products = Product::all();

        foreach ($products as $product) {
            $reviews = $product->reviews()->get();
            $product->rating = $reviews->avg('rating');
        }

        $props = [
            'products' => $products,
        ];

        return Inertia::render('homepage/product-listing', $props);
    }

    public function auth() {
        return Inertia::render('auth');
    }

    public function userProfile() {
        $user = Auth::user();
        $props = [
            'user' => $user,
        ];
        return Inertia::render('homepage/user-profile', $props);
    }

    public function productStatus() {
        $user = Auth::user();
        $order = Order::with(['orderDetails.product', 'courier', 'user'])
            ->where('user_id', $user->id)
            ->latest()
            ->first();

        $currentOrder = null; // Initialize as null if no order is found

        if ($order) {
            $orderItems = [];
            foreach ($order->orderDetails as $detail) {
                $orderItems[] = [
                    'name' => $detail->product->name,
                    'quantity' => $detail->quantity,
                    'price_discount' => $detail->product->price_discount,
                    'image' => $detail->product->image,
                ];
            }

            // Calculate estimated_delivery_at in minutes
            $estimatedDeliveryMinutes = 0;
            if ($order->estimated_delivery_at && $order->estimated_delivery_at->isFuture()) {
                $estimatedDeliveryMinutes = Carbon::now()->diffInMinutes($order->estimated_delivery_at);
            }

            $estimatedDeliveryMinutes = $estimatedDeliveryMinutes > 0 ? $estimatedDeliveryMinutes : 0;

            // Construct tracking_updates
            $tracking_updates = [];
            if ($order->processed_at) {
                $tracking_updates[] = [
                    'status' => 'cooking',
                    'time' => $order->processed_at->format('h:i A'),
                    'message' => 'Your order is being prepared with fresh ingredients',
                ];
            }

            // The original hardcoded example has 'on the way' with a time
            // I'll try to map this to an actual timestamp if available.
            // If the order status is 'on the way', or it has been delivered, or has an estimated delivery time
            if ($order->status === 'on the way' || $order->delivered_at || $order->estimated_delivery_at) {
                $onTheWayTime = '';
                if ($order->delivered_at) {
                    $onTheWayTime = $order->delivered_at->format('h:i A');
                } elseif ($order->estimated_delivery_at) {
                    $onTheWayTime = $order->estimated_delivery_at->format('h:i A');
                }
                $tracking_updates[] = [
                    'status' => 'on the way',
                    'time' => $onTheWayTime,
                    'message' => 'Your order is out for delivery',
                ];
            }

            // Add 'arrived' status if applicable, based on your logic for order status
            if ($order->status === 'delivered') {
                 $tracking_updates[] = [
                    'status' => 'arrived',
                    'time' => $order->delivered_at ? $order->delivered_at->format('h:i A') : '',
                    'message' => 'Order delivered successfully',
                ];
            }


            $currentOrder = [
                'id' => $order->id,
                'user_id' => $order->user_id,
                'order_items' => $orderItems,
                'status' => $order->status,
                'delivery_status' => $order->delivery_status,
                'estimated_delivery_at' => $estimatedDeliveryMinutes,
                'street' => $order->user ? ($order->user->street . ', ' . $order->user->city . ', ' . $order->user->state) : 'N/A',
                'created_at' => $order->created_at->format('M d, Y \a\t h:i A'),
                'total' => $order->total,
                'driver_name' => $order->courier ? $order->courier->name : 'N/A',
                'driver_number' => $order->courier ? $order->courier->phone_number : 'N/A',
                'tracking_updates' => $tracking_updates,
            ];
        }

        $props = [
            'user' => $user,
            'currentOrder' => $currentOrder,
        ];

        return Inertia::render('homepage/product-status', $props);
    }

    public function productCart() {
        $user = Auth::user();
        $props = [
            'user' => $user,
        ];
        return Inertia::render('homepage/product-cart', $props);
    }

    public function order() {
        return Inertia::render('homepage/order-dummy');
    }

    public function productDetailDummy(Product $product) {
        $user = Auth::user();
        $reviews = $product->reviews()->get();

        // Product Images (Indexed Array)
        $productImages = [
            'https://images.unsplash.com/photo-1737210235283-7675f83efc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxraGljaGRpJTIwYm93bCUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjA1MTM2ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            'https://images.unsplash.com/photo-1653849942524-ef2c6882d70d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxpbmRpYW4lMjByaWNlJTIwbGVudGlsJTIwZGlzaHxlbnwxfHx8fDE3NjA1MTM2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            'https://images.unsplash.com/photo-1624935984039-395c058e3944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzcGljZXMlMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3NjA0MTY3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            'https://images.unsplash.com/photo-1756361947369-8c0e1e8d6828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0YW50JTIwZm9vZCUyMHBhY2thZ2V8ZW58MXx8fHwxNzYwNTEzNjg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        ];

        $suggestedProducts = Product::take(4)->get();
        $props = [
            'user' => $user,
            'productImages' => $productImages,
            'product' => $product,
            'reviews' => $reviews,
            'suggestedProducts' => $suggestedProducts,
        ];
        
        return Inertia::render('homepage/product-details', $props);
    }

    public function checkoutDummy() {
        $order = Order::find(1);
        $props = [
            'order' => $order
        ];
        return Inertia::render('homepage/checkout-dummy', $props);
    }
}