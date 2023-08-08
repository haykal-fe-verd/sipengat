<?php

namespace App\Http\Controllers;

use App\Models\DataAtk;
use App\Models\Kategori;
use App\Models\Pemasukan;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DataAtkController extends Controller
{
    // logistik
    public function index(Request $request): Response
    {
        $kategori = Kategori::all();
        $pemasukan = Pemasukan::with('supplier')->get();
        $query = DataAtk::latest()->with(['kategori', 'pemasukan.satuan']);

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('stok', 'LIKE', "%$search%")
                    ->orWhereHas('kategori', function ($query) use ($search) {
                        $query->where('nama_kategori', 'LIKE', "%$search%");
                    })
                    ->orWhereHas('pemasukan', function ($query) use ($search) {
                        $query->where('jenis_atk', 'LIKE', "%$search%")
                            ->orWhereHas('satuan', function ($query) use ($search) {
                                $query->where('nama_satuan', 'LIKE', "%$search%");
                            });
                    });
            });
        }

        $data_atk = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('DataAtk/Page', [
            'data_atk' => $data_atk,
            'kategori' => $kategori,
            'pemasukan' => $pemasukan
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'stok' => 'required',
            'kategori_id' => 'required',
            'pemasukan_id' => 'required',
        ]);

        try {
            DataAtk::create($request->all());

            return redirect()->route('data-atk.index')->with('success', 'Data ATK berhasil ditambahkan');
        } catch (\Throwable $th) {
            return redirect()->route('data-atk.index')->with('error', "Opps something went wrong");
        }
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'stok' => 'required',
            'kategori_id' => 'required',
            'pemasukan_id' => 'required',
        ]);

        try {
            $data_atk = DataAtk::findOrFail($id);
            $data_atk->pemasukan_id = $request->pemasukan_id;
            $data_atk->kategori_id = $request->kategori_id;
            $data_atk->stok = $request->stok;
            $data_atk->save();

            return redirect()->route('data-atk.index')->with('success', 'Data ATK berhasil diedit');
        } catch (\Throwable $th) {
            return redirect()->route('data-atk.index')->with('error', "Opps something went wrong");
        }
    }

    public function destroy(string $id): RedirectResponse
    {
        try {
            $data_atk = DataAtk::findOrFail($id);
            $data_atk->delete();

            return redirect()->route('data-atk.index')->with('success', 'Data ATK berhasil dihapus');
        } catch (\Throwable $th) {
            return redirect()->route('data-atk.index')->with('error', "Opps something went wrong");
        }
    }

    // divisi

    public function indexDivisi(Request $request): Response
    {
        $query = DataAtk::latest()->with(['kategori', 'pemasukan.satuan']);

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($query) use ($search) {
                $query->where('stok', 'LIKE', "%$search%")
                    ->orWhereHas('kategori', function ($query) use ($search) {
                        $query->where('nama_kategori', 'LIKE', "%$search%");
                    })
                    ->orWhereHas('pemasukan', function ($query) use ($search) {
                        $query->where('jenis_atk', 'LIKE', "%$search%")
                            ->orWhereHas('satuan', function ($query) use ($search) {
                                $query->where('nama_satuan', 'LIKE', "%$search%");
                            });
                    });
            });
        }

        $data_atk = $query->paginate($request->perpage ?? 10)->withQueryString();

        return Inertia::render('ViewDivisi/DataAtk/Page', [
            'data_atk' => $data_atk,
        ]);
    }
}
