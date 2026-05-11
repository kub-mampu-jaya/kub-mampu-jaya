<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function add(Request $request)
    {
        $cart = Cart::firstOrCreate([
            'user_id' => Auth::user()->id
        ]);

        $cartItem = $cart->items()->where('product_id', $request->product_id)->first();

        $buy_quantity = $request->buy_quantity ?? 1;

        if ($cartItem) {
            $cartItem->quantity = $buy_quantity;
            $cartItem->save();
        } else {
            $cart->items()->create([
                'product_id' => $request->product_id,
                'quantity' => $buy_quantity,
            ]);
        }

        return back();
    }

    public function destroy(CartItem $item)
    {
        try {
            $item->delete();
            return back();
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to remove item from cart.',
                'message' => $e->getMessage()
            ]);
        }
    }
}
