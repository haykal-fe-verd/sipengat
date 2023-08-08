<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class Satuan extends Model
{
    use HasFactory, Searchable;
    protected $table = "tb_satuan";
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function toSearchableArray(): array
    {
        return [
            'nama_satuan' => $this->nama_satuan,
        ];
    }

    public function pemasukan(): HasMany
    {
        return $this->hasMany(Pemasukan::class);
    }
}
