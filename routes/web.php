<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ChangePasswordController;
use App\Http\Controllers\Auth\ForgetPasswordController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataAtkController;
use App\Http\Controllers\DivisiController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\PemasukanController;
use App\Http\Controllers\PengeluaranController;
use App\Http\Controllers\PermintaanController;
use App\Http\Controllers\SatuanController;
use App\Http\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;

// guest
Route::middleware('guest')->group(function () {
    // login
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    // register
    Route::get('register', [RegisterController::class, 'index'])
        ->name('register');
    Route::post('register', [RegisterController::class, 'store'])
        ->name('register.store');

    // forget password
    Route::get('forgot-password', [ForgetPasswordController::class, 'index'])
        ->name('forget-password.index');
    Route::post('forgot-password', [ForgetPasswordController::class, 'store'])
        ->name('forget-password.store');
    Route::get('reset-password/{token}', [ForgetPasswordController::class, 'create'])
        ->name('password.reset');
    Route::post('reset-password', [ForgetPasswordController::class, 'update'])
        ->name('reset-password.update');
});

// auth
Route::middleware('auth')->group(function () {
    // dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    // profile
    Route::get('profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::post('profile', [ProfileController::class, 'update'])->name('profile.update');

    // change password
    Route::get('password', [ChangePasswordController::class, 'index'])->name('password.index');
    Route::put('password', [ChangePasswordController::class, 'update'])->name('password.update');

    // middleware can logistik
    Route::middleware(['can:logistik'])->group(function () {
        // divisi
        Route::get('divisi', [DivisiController::class, 'index'])->name('divisi.index');
        Route::post('divisi', [DivisiController::class, 'store'])->name('divisi.store');
        Route::put('divisi/{id}', [DivisiController::class, 'update'])->name('divisi.update');
        Route::delete('divisi/{id}', [DivisiController::class, 'destroy'])->name('divisi.destroy');

        // satuan
        Route::get('satuan', [SatuanController::class, 'index'])->name('satuan.index');
        Route::post('satuan', [SatuanController::class, 'store'])->name('satuan.store');
        Route::put('satuan/{id}', [SatuanController::class, 'update'])->name('satuan.update');
        Route::delete('satuan/{id}', [SatuanController::class, 'destroy'])->name('satuan.destroy');

        // kategori
        Route::get('kategori', [KategoriController::class, 'index'])->name('kategori.index');
        Route::post('kategori', [KategoriController::class, 'store'])->name('kategori.store');
        Route::put('kategori/{id}', [KategoriController::class, 'update'])->name('kategori.update');
        Route::delete('kategori/{id}', [KategoriController::class, 'destroy'])->name('kategori.destroy');

        // supplier
        Route::get('supplier', [SupplierController::class, 'index'])->name('supplier.index');
        Route::post('supplier', [SupplierController::class, 'store'])->name('supplier.store');
        Route::put('supplier/{id}', [SupplierController::class, 'update'])->name('supplier.update');
        Route::delete('supplier/{id}', [SupplierController::class, 'destroy'])->name('supplier.destroy');

        // pemasukan
        Route::get('pemasukan', [PemasukanController::class, 'index'])->name('pemasukan.index');
        Route::post('pemasukan', [PemasukanController::class, 'store'])->name('pemasukan.store');
        Route::put('pemasukan/{id}', [PemasukanController::class, 'update'])->name('pemasukan.update');
        Route::delete('pemasukan/{id}', [PemasukanController::class, 'destroy'])->name('pemasukan.destroy');

        // data atk
        Route::get('data-atk', [DataAtkController::class, 'index'])->name('data-atk.index');
        Route::post('data-atk', [DataAtkController::class, 'store'])->name('data-atk.store');
        Route::put('data-atk/{id}', [DataAtkController::class, 'update'])->name('data-atk.update');
        Route::delete('data-atk/{id}', [DataAtkController::class, 'destroy'])->name('data-atk.destroy');

        // permintaan
        Route::get('permintaan', [PermintaanController::class, 'index'])->name('permintaan.index');
        Route::put('permintaan/{id}/accept', [PermintaanController::class, 'accept'])->name('permintaan.accept');
        Route::put('permintaan/{id}/refuse', [PermintaanController::class, 'refuse'])->name('permintaan.refuse');

        // pengeluaran
        Route::get('pengeluaran', [PengeluaranController::class, 'index'])->name('pengeluaran.index');

        // laporan
        Route::get('laporan', [LaporanController::class, 'index'])->name('laporan.index');
    });

    // middleware can divisi
    Route::middleware(['can:divisi'])->group(function () {
        // permintaan atk
        Route::get('divisi/permintaan', [PermintaanController::class, 'indexDivisi'])->name('divisi-permintaan.index');
        Route::post('divisi/permintaan', [PermintaanController::class, 'storeDivisi'])->name('divisi-permintaan.store');
        Route::put('divisi/permintaan/{id}', [PermintaanController::class, 'updateDivisi'])->name('divisi-permintaan.update');
        Route::delete('divisi/permintaan/{id}', [PermintaanController::class, 'destroyDivisi'])->name('divisi-permintaan.destroy');

        // data atk
        Route::get('divisi/data-atk', [DataAtkController::class, 'indexDivisi'])->name('divisi-data-atk.index');
    });

    // logout
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
