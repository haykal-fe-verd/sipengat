<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class Supplier extends Model
{
    use HasFactory, Searchable;
    protected $table = "tb_supplier";
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function toSearchableArray(): array
    {
        return [
            'nama_supplier' => $this->nama_supplier,
            'telepon' => $this->telepon,
            'alamat' => $this->alamat,
        ];
    }

    public function pemasukan(): HasMany
    {
        return $this->hasMany(Pemasukan::class);
    }
}
