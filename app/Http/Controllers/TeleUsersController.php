<?php

namespace App\Http\Controllers;

use App\Models\TeleUsers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\Notification;
use Illuminate\Support\Facades\DB;

class TeleUsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Controller
        $data = TeleUsers::latest()->get();

        // Hapus null, unique, dan ubah ke array
        $usersIds = $data->pluck('users_id')
            ->filter()      // hapus null/empty
            ->unique()      // hapus duplikat
            ->values()      // reset index
            ->all();        // jadi array biasa

        $usersData = User::whereIn('id', $usersIds)->get();

        return Inertia::render('courier/courier-home', [
            'data' => $data,
            'usersData' => $usersData,
        ]);
    }

    public function sendChatIdToN8N(Request $request){
        if (TeleUsers::where('chat_id' ,$request->chat_id)->exists()){
            return response()->json([
                'success' => true,
                'data' => TeleUsers::where('chat_id' ,$request->chat_id)->firstOrFail()
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Data belum ditemukan',
                'chat_id' => null,
            ]);
        }
    }


    public function sendOrder(Request $request){
        if (User::where('id' ,$request->users_id)->exists()){
            $user_id = $request->users_id;
            $order = Order::where('user_id', $user_id)->get();
            return response()->json([
                'data' => $order,
            ]);
        }
    }
    public function sendOrderDetail(Request $request){
        $request->validate([
            'order' => 'required|array',
            'order.*.id' => 'required|integer',
        ]);
        $order_id = collect($request->order)->pluck('id');
        $order_detail = OrderDetail::whereIn('order_id', $order_id)->get();
        return response()->json([
            'data' => $order_detail,
        ]);
    }
    public function sendProduct(Request $request){
        $request->validate([
            'orderDetail' => 'required|array',
            'orderDetail.*.product_id' => 'required|integer',
            'orderDetail.*.quantity' => 'required|integer',
        ]);
        $product_id = collect($request->orderDetail)->pluck('product_id');
        $quantity = collect($request->orderDetail)->pluck('quantity');
        $product = Product::whereIn('id', $product_id)->get();
        $all_product_name = Product::pluck('name');
        return response()->json([
            'data' => $product,
            'allproduct' => $all_product_name,

        ]);
    }
        // di Product model:
    // public function orderDetails() { return $this->hasMany(OrderDetail::class, 'product_id'); }

    public function sendAllTopProduct()
    {
        $topProducts = Product::withCount('orderDetails')
            ->orderByDesc('order_details_count')
            ->limit(5)
            ->get(['id','name','order_details_count']);

        $topProductName = collect($topProducts)->pluck('name');

        return response()->json([
            'topProducts' => $topProducts->map(fn($p) => [
                'product_id' => $p->id,
                'name' => $p->name,
                'count' => (int) $p->order_details_count,
            ])->values(),
            
            'topProductName' => $topProductName,
        ], 200);
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
        Log::info('DATA MASUK DARI N8N', $request->all());

        $validated = $request->validate([
            'email' => 'required|string', 
            'chat_id' => 'required|string',
            'name'   => 'required|string',
            'languange_code'  => 'required|string',
        ]);

        $email = $validated['email'];
        
        $isUsersEmailExist = User::where('email', $email)->exists();



        $chat_id = $validated['chat_id'];
        $isChat_idExist = TeleUsers::where('chat_id', $chat_id)->exists();

       if($isChat_idExist && $isUsersEmailExist){
            return response()->json([
                'success' => false,
                'data' => TeleUsers::where('chat_id', $chat_id)->firstOrFail(),
                'users_email' => User::where('email', $email)->firstOrFail(),
                'message' => 'Data Sudah Ada',
            ]);
        } else {
            $emailData = User::where('email', $email)->firstOrFail();
            $data = TeleUsers::create([
                'users_id' => $emailData->id,
                'chat_id' => $validated['chat_id'],
                'name' => $validated['name'],
                'languange_code' => $validated['languange_code'],
            ]);
            return response()->json([
                'success' => true,
                'message' => 'Data Berhasil Disimpan',
                'data' => $data,
                'users_email' => $emailData,
            ]);
        }

        

    }

    /**
     * Display the specified resource.
     */
    public function show(TeleUsers $teleUsers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TeleUsers $teleUsers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TeleUsers $teleUsers)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TeleUsers $teleUsers)
    {
        //
    }
}
