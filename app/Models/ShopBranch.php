<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ShopBranch extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone_number',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_shop_branch');
    }

    /**
     * The users that belong to the shop branch.
     */
    public function assignedUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'shop_branch_user');
    }

    public function shopBranchProducts()
    {
        return $this->hasMany(ShopbranchProduct::class);
    }
}
