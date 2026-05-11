<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ShopbranchProduct extends Pivot
{
    use HasFactory;

    protected $table = 'product_shop_branch';

    public function shopBranch()
    {
        return $this->belongsTo(ShopBranch::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
