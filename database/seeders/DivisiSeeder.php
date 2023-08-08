<?php

namespace Database\Seeders;

use App\Models\Divisi;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DivisiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $nama_divisis = ['Keuangan, Umum dan Logistik', 'Penyelenggaraan Pemilu Partisipasi dan Hubungan Masyarakat', 'Perencanaan, Data dan Informasi', 'Hukum dan Sumber Daya Manusia', 'Bendahara'];

        foreach ($nama_divisis as $divisi) {
            Divisi::create([
                'nama_divisi' => $divisi
            ]);
        }
    }
}
