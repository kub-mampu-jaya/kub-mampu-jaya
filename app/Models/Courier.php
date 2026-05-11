<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Courier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'license_plate',
        'phone_number',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
