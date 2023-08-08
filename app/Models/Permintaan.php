<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Permintaan extends Model
{
    use HasFactory;
    protected $table = "tb_permintaan";
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function dataAtk(): BelongsTo
    {
        return $this->belongsTo(DataAtk::class, 'data_atk_id', 'id');
    }
}
