<?php

namespace Database\Seeders;

use App\Models\DataAtk;
use App\Models\Kategori;
use App\Models\Pemasukan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DataAtkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kategori = Kategori::all();
        $pemasukan = Pemasukan::all();

        for ($i = 1; $i <= 200; $i++) {
            DataAtk::create([
                'kategori_id' => $kategori->random()->id,
                'pemasukan_id' => $pemasukan->random()->id,
                'stok' => $pemasukan->random()->jumlah_masuk,
            ]);
        }
    }
}
