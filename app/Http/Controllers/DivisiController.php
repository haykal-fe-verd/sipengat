<?php

namespace App\Http\Controllers;

use App\Models\Divisi;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DivisiController extends Controller
{
    public function index(Request $request): Response
    {
        $divisi = Divisi::search($request->search)
            ->query(fn (Builder $query) => $query)
            ->paginate($request->perpage ?? 10)
            ->appends('query', null)
            ->withQueryString();

        return Inertia::render('Divisi/Page', [
            'divisi' => $divisi
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nama_divisi' => 'required',
        ]);

        try {
            Divisi::create($request->all());

            return redirect()->route('divisi.index')->with('success', 'Divisi berhasil ditambahkan');
        } catch (\Throwable $th) {
            return redirect()->route('divisi.index')->with('error', "Opps something went wrong");
        }
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'nama_divisi' => 'required',
        ]);

        try {
            $divisi = Divisi::findOrFail($id);
            $divisi->nama_divisi = $request->nama_divisi;
            $divisi->save();

            return redirect()->route('divisi.index')->with('success', 'Divisi berhasil diedit');
        } catch (\Throwable $th) {
            return redirect()->route('divisi.index')->with('error', "Opps something went wrong");
        }
    }

    public function destroy(string $id): RedirectResponse
    {
        try {
            $divisi = Divisi::findOrFail($id);
            $divisi->delete();

            return redirect()->route('divisi.index')->with('success', 'Divisi berhasil dihapus');
        } catch (\Throwable $th) {
            return redirect()->route('divisi.index')->with('error', "Opps something went wrong");
        }
    }
}
