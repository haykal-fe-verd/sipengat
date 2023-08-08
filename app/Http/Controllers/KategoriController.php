<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class KategoriController extends Controller
{
    public function index(Request $request): Response
    {
        $kategori = Kategori::search($request->search)
            ->query(fn (Builder $query) => $query)
            ->paginate($request->perpage ?? 10)
            ->appends('query', null)
            ->withQueryString();

        return Inertia::render('Kategori/Page', [
            'kategori' => $kategori
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nama_kategori' => 'required',
        ]);

        try {
            Kategori::create($request->all());

            return redirect()->route('kategori.index')->with('success', 'Kategori berhasil ditambahkan');
        } catch (\Throwable $th) {
            return redirect()->route('kategori.index')->with('error', "Opps something went wrong");
        }
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'nama_kategori' => 'required',
        ]);

        try {
            $kategori = Kategori::findOrFail($id);
            $kategori->nama_kategori = $request->nama_kategori;
            $kategori->save();

            return redirect()->route('kategori.index')->with('success', 'Kategori berhasil diedit');
        } catch (\Throwable $th) {
            return redirect()->route('kategori.index')->with('error', "Opps something went wrong");
        }
    }

    public function destroy(string $id): RedirectResponse
    {
        try {
            $kategori = Kategori::findOrFail($id);
            $kategori->delete();

            return redirect()->route('kategori.index')->with('success', 'Kategori berhasil dihapus');
        } catch (\Throwable $th) {
            return redirect()->route('kategori.index')->with('error', "Opps something went wrong");
        }
    }
}
