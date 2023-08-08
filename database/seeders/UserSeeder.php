<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => "Muhammad Haykal",
            'email' => "muhammadhaykall99@gmail.com",
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'remember_token' => Str::random(10),
            'role' => "logistik",
            'divisi_id' => 1,
        ]);

        User::create([
            'name' => "Akun Logistik",
            'email' => "logistik@kip.com",
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'remember_token' => Str::random(10),
            'role' => "logistik",
            'divisi_id' => 1,
        ]);

        User::create([
            'name' => "Akun Divisi 1",
            'email' => "divisi1@kip.com",
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'remember_token' => Str::random(10),
            'role' => "divisi",
            'divisi_id' => 2,
        ]);


        User::create([
            'name' => "Akun Divisi 2",
            'email' => "divisi2@kip.com",
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'remember_token' => Str::random(10),
            'role' => "divisi",
            'divisi_id' => 3,
        ]);


        User::create([
            'name' => "Akun Divisi 3",
            'email' => "divisi3@kip.com",
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'remember_token' => Str::random(10),
            'role' => "divisi",
            'divisi_id' => 4,
        ]);


        User::create([
            'name' => "Akun Divisi 4",
            'email' => "divisi4@kip.com",
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
            'remember_token' => Str::random(10),
            'role' => "divisi",
            'divisi_id' => 5,
        ]);
    }
}
