<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            DivisiSeeder::class,
            UserSeeder::class,
            SatuanSeeder::class,
            KategoriSeeder::class,
            SupplierSeeder::class,
        ]);
    }
}
