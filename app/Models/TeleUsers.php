<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class TeleUsers extends Model
{
    use HasFactory;
    protected $table = 'teleusers';
    protected $fillable = [
        'users_id',
        'chat_id',
        'name',
        'languange_code',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
