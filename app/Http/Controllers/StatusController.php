<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use Illuminate\Http\Request;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        
        // Initialize as null if no order is found
        $validated = $request->validate([
            'status' => 'required|string',
            'user_id' => 'required|integer',
        ]);
        
        $order = Order::where('user_id', $validated['user_id'])
            ->latest()
            ->first();

        if($validated['status'] === 'cooking'){
            $order->confirmed_at = now();
            $order->processed_at = now();
            $order->estimated_delivery_at = now()->addMinutes(35);
        }else if ($validated['status'] === 'on the way') {
            $order->estimated_delivery_at = now()->addMinutes(15);
        }else {
            $order->estimated_delivery_at = now();
            $order->delivered_at = now();
        }

        $order->status = $validated['status'];

        $order->update();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
