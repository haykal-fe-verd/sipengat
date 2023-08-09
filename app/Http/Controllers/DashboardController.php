<?php

namespace App\Http\Controllers;

use App\Models\DataAtk;
use App\Models\Divisi;
use App\Models\Kategori;
use App\Models\Pemasukan;
use App\Models\Pengeluaran;
use App\Models\Permintaan;
use App\Models\Satuan;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $currentYear = Carbon::now()->year;
        $totalPermintaanDivisi = Permintaan::where('user_id', Auth::user()->id)->count();
        $totalPermintaanDiterimaDivisi = Permintaan::where('user_id', Auth::user()->id)->where('status', 'disetujui')->count();
        $totalPermintaanDitolakDivisi = Permintaan::where('user_id', Auth::user()->id)->where('status', 'ditolak')->count();

        $bulan = [
            '1' => 'Jan',
            '2' => 'Feb',
            '3' => 'Mar',
            '4' => 'Apr',
            '5' => 'Mei',
            '6' => 'Jun',
            '7' => 'Jul',
            '8' => 'Ags',
            '9' => 'Sep',
            '10' => 'Okt',
            '11' => 'Nov',
            '12' => 'Des'
        ];

        $dataPermintaanDivisi = Permintaan::selectRaw('MONTH(created_at) AS bulan, COUNT(*) AS total_permintaan')
            ->whereYear('created_at', $currentYear)
            ->where('user_id', Auth::user()->id)
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->pluck('total_permintaan', 'bulan')
            ->toArray();

        $chartDivisi = [];

        foreach ($bulan as $key => $value) {
            $chartDivisi[] = $dataPermintaanDivisi[$key] ?? 0;
        }

        $totalDivisi = Divisi::count();
        $totalSatuan = Satuan::count();
        $totalKategori = Kategori::count();
        $totalSupplier = Supplier::count();
        $totalPermintaan = Permintaan::count();
        $totalPemasukan = Pemasukan::count();
        $totalPengeluaran = Pengeluaran::count();
        $totalSupplier = Supplier::count();
        $totalDataAtk = DataAtk::count();

        $dataPemasukan = Pemasukan::selectRaw('MONTH(tanggal_masuk) AS bulan, SUM(jumlah_masuk) AS total_pemasukan')
            ->whereYear('tanggal_masuk', $currentYear)
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->pluck('total_pemasukan', 'bulan')
            ->toArray();

        $dataPengeluaran = Pengeluaran::selectRaw('MONTH(created_at) AS bulan, SUM(jumlah_keluar) AS total_pengeluaran')
            ->whereYear('created_at', $currentYear)
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->pluck('total_pengeluaran', 'bulan')
            ->toArray();

        $chartPemasukan = [];
        $chartPengeluaran = [];

        foreach ($bulan as $key => $value) {
            $chartPemasukan[] = $dataPemasukan[$key] ?? 0;
            $chartPengeluaran[] = $dataPengeluaran[$key] ?? 0;
        }

        return Inertia::render('Dashboard', [
            'totalPermintaanDivisi' => $totalPermintaanDivisi,
            'totalPermintaanDiterimaDivisi' => $totalPermintaanDiterimaDivisi,
            'totalPermintaanDitolakDivisi' => $totalPermintaanDitolakDivisi,
            'bulan' => $bulan,
            'chartDivisi' => $chartDivisi,
            'totalDivisi' => $totalDivisi,
            'totalSatuan' => $totalSatuan,
            'totalKategori' => $totalKategori,
            'totalSupplier' => $totalSupplier,
            'totalPemasukan' => $totalPemasukan,
            'totalPengeluaran' => $totalPengeluaran,
            'totalSupplier' => $totalSupplier,
            'totalDataAtk' => $totalDataAtk,
            'chartPemasukan' => $chartPemasukan,
            'chartPengeluaran' => $chartPengeluaran,
            'totalPermintaan' => $totalPermintaan
        ]);
    }
}
