<?php

namespace Database\Seeders;

use App\Models\Kategori;
use App\Models\Pemasukan;
use App\Models\Satuan;
use App\Models\Supplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PemasukanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jenis_atk = ['HVS A4', 'HVS A5', 'Pulpen Mygel', 'Pulpen TTD', 'Pensil 2B', 'Binder'];
        $satuan = Satuan::all();
        $supplier = Supplier::all();

        for ($i = 1; $i <= 200; $i++) {
            Pemasukan::create([
                'supplier_id' => $supplier->random()->id,
                'jenis_atk' => fake()->randomElement($jenis_atk),
                'satuan_id' => $satuan->random()->id,
                'nomor_faktur' => fake()->bothify('????-####-####-####'),
                'tanggal_masuk' => fake()->date('Y-m-d'),
                'jumlah_masuk' => fake()->numberBetween(1, 200),
            ]);
        }
    }
}
