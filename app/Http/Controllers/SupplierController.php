<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SupplierController extends Controller
{
    public function index(Request $request): Response
    {
        $supplier = Supplier::search($request->search)
            ->query(fn (Builder $query) => $query)
            ->paginate($request->perpage ?? 10)
            ->appends('query', null)
            ->withQueryString();

        return Inertia::render('Supplier/Page', [
            'supplier' => $supplier
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'nama_supplier' => 'required',
            'telepon' => 'required',
            'alamat' => 'required',
        ]);

        try {
            Supplier::create($request->all());

            return redirect()->route('supplier.index')->with('success', 'Supplier berhasil ditambahkan');
        } catch (\Throwable $th) {
            return redirect()->route('supplier.index')->with('error', "Opps something went wrong");
        }
    }

    public function update(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'nama_supplier' => 'required',
            'telepon' => 'required',
            'alamat' => 'required',
        ]);

        try {
            $supplier = Supplier::findOrFail($id);
            $supplier->nama_supplier = $request->nama_supplier;
            $supplier->telepon = $request->telepon;
            $supplier->alamat = $request->alamat;
            $supplier->save();

            return redirect()->route('supplier.index')->with('success', 'Supplier berhasil diedit');
        } catch (\Throwable $th) {
            return redirect()->route('supplier.index')->with('error', "Opps something went wrong");
        }
    }

    public function destroy(string $id): RedirectResponse
    {
        try {
            $supplier = Supplier::findOrFail($id);
            $supplier->delete();

            return redirect()->route('supplier.index')->with('success', 'Supplier berhasil dihapus');
        } catch (\Throwable $th) {
            return redirect()->route('supplier.index')->with('error', "Opps something went wrong");
        }
    }
}
