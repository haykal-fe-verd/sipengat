<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class Pemasukan extends Model
{
    use HasFactory, Searchable;
    protected $table = "tb_pemasukan";
    protected $primaryKey = 'id';
    protected $guarded = [];

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class, 'supplier_id', 'id');
    }

    public function satuan(): BelongsTo
    {
        return $this->belongsTo(Satuan::class, 'satuan_id', 'id');
    }

    public function toSearchableArray(): array
    {
        return [
            'nomor_faktur' => $this->nomor_faktur,
            'jenis_atk' => $this->jenis_atk,
            'tanggal_masuk' => $this->tanggal_masuk,
            'jumlah_masuk' => $this->jumlah_masuk,
            // 'tb_kategori.nama_kategori' => "",
            // 'tb_satuan.nama_satuan' => "",
            // 'tb_supplier.nama_supplier' => "",
        ];
    }
}
