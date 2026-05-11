<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    // protected $fillable = [
    //     'id',
    //     'order_id',
    //     'user_id',
    //     'shop_branch_id',
    //     'courier_id',
    //     'payment_method',
    //     'status',
    //     'subtotal',
    //     'delivery_fee',
    //     'total',
    //     'confirmed_at',
    //     'processed_at',
    //     'estimated_delivery_at',
    //     'delivered_at',
    // ];
    protected $guarded = ['id'];

    protected $casts = [
        'confirmed_at' => 'datetime',
        'processed_at' => 'datetime',
        'estimated_delivery_at' => 'datetime',
        'delivered_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function courier()
    {
        return $this->belongsTo(Courier::class);
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function shopBranch()
    {
        return $this->belongsTo(ShopBranch::class);
    }
}
