<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DataAtk extends Model
{
    use HasFactory, Searchable;
    protected $table = "tb_data_atk";
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function kategori(): BelongsTo
    {
        return $this->belongsTo(Kategori::class, 'kategori_id', 'id');
    }

    public function pemasukan(): BelongsTo
    {
        return $this->belongsTo(Pemasukan::class, 'pemasukan_id', 'id');
    }

    public function toSearchableArray(): array
    {
        return [
            'stok' => $this->stok,
        ];
    }
}
