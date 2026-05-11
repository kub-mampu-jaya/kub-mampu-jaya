<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'description',
        'category',
        'price_origin',
        'price_discount',
        'quantity',
        'image',
        'image_2',
        'image_3',
        'image_4',
        'image_5',
        'popular',
        'rating',
        'preparation_time',
        'badge',
        'food_type',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'popular' => 'boolean',
        'rating' => 'integer', 
        'food_type' => 'array',
    ];

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function shopBranches(): BelongsToMany
    {
        return $this->belongsToMany(ShopBranch::class, 'product_shop_branch');
    }

    public function shopBranchProducts()
    {
        return $this->hasMany(ShopbranchProduct::class);
    }
}
