<?php

namespace Database\Seeders;

use App\Models\Kategori;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $namaKategori = ['Pensil, Pulpen, Spidol', 'Buku Catatan', 'Kertas', 'Tools', 'Perekat', 'Penghapus', 'Amplop', 'Paperclip', 'Map', 'Tinta', 'Pemotong', 'Penyimpanan', 'Aksesoris'];

        foreach ($namaKategori as $kategori) {
            Kategori::create([
                'nama_kategori' => $kategori
            ]);
        }
    }
}
