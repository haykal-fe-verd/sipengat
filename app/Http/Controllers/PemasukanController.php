<?php

namespace App\Http\Controllers;

use App\Http\Resources\PemasukanResource;
use App\Models\Kategori;
use App\Models\Pemasukan;
use App\Models\Satuan;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PemasukanController extends Controller
{
    public function index(Request $request): Response
    {
        $supplier = Supplier::all();
        $satuan = Satuan::all();
        $pemasukan = Pemasukan::search($request->search)
            ->query(fn (Builder $query) => $query->with(['satuan', 'supplier']))
            ->paginate($request->perpage ?? 10)
            ->appends('query', null)
            ->withQueryString();

        // $pemasukan = Pemasukan::search($request->search)
        //     ->query(function ($query) {
        //         $query->join('tb_kategori', 'tb_pemasukan.kategori_id', 'tb_kategori.id')
        //             ->select(['tb_pemasukan.id', 'tb_pemasukan.nomor_faktur', 'tb_pemasukan.tanggal_masuk', 'tb_pemasukan.jumlah_masuk', 'tb_kategori.nama_kategori as kategori'])
        //             ->orderBy('tb_pemasukan.id', 'DESC');
        //     });

        return Inertia::render('Pemasukan/Page', [
            'pemasukan' =>  PemasukanResource::collection($pemasukan),
            'supplier' => $supplier,
            'satuan' => $satuan
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'supplier_id' => 'required|integer',
            'satuan_id' => 'required|integer',
            'jenis_atk' => 'required',
            'nomor_faktur' => 'required',
            'tanggal_masuk' => 'required|date',
            'jumlah_masuk' => 'required|integer',
        ]);

        try {
            Pemasukan::create($request->all());

            return redirect()->route('pemasukan.index')->with('success', 'Pemasukan berhasil ditambahkan');
        } catch (\Throwable $th) {
            return redirect()->route('pemasukan.index')->with('error', "Opps something went wrong");
        }
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'supplier_id' => 'required|integer',
            'satuan_id' => 'required|integer',
            'jenis_atk' => 'required',
            'nomor_faktur' => 'required',
            'tanggal_masuk' => 'required|date',
            'jumlah_masuk' => 'required|integer',
        ]);

        try {
            $pemasukan = Pemasukan::findOrFail($id);
            $pemasukan->supplier_id = $request->supplier_id;
            $pemasukan->satuan_id = $request->satuan_id;
            $pemasukan->jenis_atk = $request->jenis_atk;
            $pemasukan->nomor_faktur = $request->nomor_faktur;
            $pemasukan->tanggal_masuk = $request->tanggal_masuk;
            $pemasukan->jumlah_masuk = $request->jumlah_masuk;
            $pemasukan->save();

            return redirect()->route('pemasukan.index')->with('success', 'Pemasukan berhasil diedit');
        } catch (\Throwable $th) {
            return redirect()->route('pemasukan.index')->with('error', "Opps something went wrong");
        }
    }

    public function destroy(string $id): RedirectResponse
    {
        try {
            $pemasukan = Pemasukan::findOrFail($id);
            $pemasukan->delete();

            return redirect()->route('pemasukan.index')->with('success', 'Pemasukan berhasil dihapus');
        } catch (\Throwable $th) {
            return redirect()->route('pemasukan.index')->with('error', "Opps something went wrong");
        }
    }
}
