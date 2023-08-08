<?php

namespace App\Http\Controllers;

use App\Models\Pemasukan;
use App\Models\Pengeluaran;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LaporanController extends Controller
{
    public function index(Request $request): Response
    {
        $startDate = $request->dari_tanggal;
        $endDate = $request->sampai_tanggal;

        // query
        $pemasukanQuery = Pemasukan::query()->with(['supplier'])->latest();
        $pengeluaranQuery = Pengeluaran::query()->latest();

        if ($startDate && $endDate) {
            $pemasukanQuery->whereBetween('tanggal_masuk', [Carbon::parse($startDate), Carbon::parse($endDate)]);
            $pengeluaranQuery->whereBetween('created_at', [Carbon::parse($startDate), Carbon::parse($endDate)]);
        }

        $pemasukan = $pemasukanQuery->paginate($request->perpage ?? 10)->withQueryString();
        $pengeluaran = $pengeluaranQuery->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('Laporan/Page', [
            'laporan_pemasukan' => $pemasukan,
            'laporan_pengeluaran' => $pengeluaran,
        ]);
    }
}
