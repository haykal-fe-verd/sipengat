<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PemasukanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'jumlah_masuk' => $this->jumlah_masuk,
            'tanggal_masuk' => $this->tanggal_masuk,
            'nomor_faktur' => $this->nomor_faktur,
            'jenis_atk' => $this->jenis_atk,
            'satuan' => $this->satuan,
            'supplier' => $this->supplier,
        ];
    }
}
