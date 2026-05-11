<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notification extends Model
{
    use HasFactory;

    protected $table = 'notification';

    protected $fillable = [
        'users_id',
        'title',
        'message',
    ];

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class, 'users_id');
    }
}
