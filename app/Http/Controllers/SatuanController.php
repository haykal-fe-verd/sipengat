<?php

namespace App\Http\Controllers;

use App\Models\Satuan;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SatuanController extends Controller
{
    public function index(Request $request): Response
    {
        $satuan = Satuan::search($request->search)
            ->query(fn (Builder $query) => $query)
            ->paginate($request->perpage ?? 10)
            ->appends('query', null)
            ->withQueryString();

        return Inertia::render('Satuan/Page', [
            'satuan' => $satuan
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nama_satuan' => 'required',
        ]);

        try {
            Satuan::create($request->all());

            return redirect()->route('satuan.index')->with('success', 'Satuan berhasil ditambahkan');
        } catch (\Throwable $th) {
            return redirect()->route('satuan.index')->with('error', "Opps something went wrong");
        }
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'nama_satuan' => 'required',
        ]);

        try {
            $satuan = Satuan::findOrFail($id);
            $satuan->nama_satuan = $request->nama_satuan;
            $satuan->save();

            return redirect()->route('satuan.index')->with('success', 'Satuan berhasil diedit');
        } catch (\Throwable $th) {
            return redirect()->route('satuan.index')->with('error', "Opps something went wrong");
        }
    }

    public function destroy(string $id): RedirectResponse
    {
        try {
            $satuan = Satuan::findOrFail($id);
            $satuan->delete();

            return redirect()->route('satuan.index')->with('success', 'Satuan berhasil dihapus');
        } catch (\Throwable $th) {
            return redirect()->route('satuan.index')->with('error', "Opps something went wrong");
        }
    }
}
