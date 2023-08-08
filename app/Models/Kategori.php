<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class Kategori extends Model
{
    use HasFactory, Searchable;
    protected $table = "tb_kategori";
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function toSearchableArray(): array
    {
        return [
            'nama_kategori' => $this->nama_kategori,
        ];
    }
}
