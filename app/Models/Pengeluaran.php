<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Pengeluaran extends Model
{
    use HasFactory, Searchable;
    protected $table = "tb_pengeluaran";
    protected $primaryKey = 'id';
    protected $guarded = [];


    public function toSearchableArray(): array
    {
        return [
            'jenis_atk' => $this->jenis_atk,
            'nama_satuan' => $this->nama_satuan,
            'jumlah_keluar' => $this->jumlah_keluar,
        ];
    }
}
