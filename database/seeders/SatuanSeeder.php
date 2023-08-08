<?php

namespace Database\Seeders;

use App\Models\Satuan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SatuanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $namaSatuan = ['Rim', 'Kotak', 'Buah', 'Lusin', 'Butir', 'Pack', 'Dus'];

        foreach ($namaSatuan as $satuan) {
            Satuan::create([
                'nama_satuan' => $satuan
            ]);
        }
    }
}
