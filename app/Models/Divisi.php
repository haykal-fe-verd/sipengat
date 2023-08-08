<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Divisi extends Model
{
    use HasFactory, Searchable;
    protected $table = "tb_divisi";
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function toSearchableArray(): array
    {
        return [
            'nama_divisi' => $this->nama_divisi,
        ];
    }

    public function user()
    {
        return $this->hasOne(User::class);
    }
}
