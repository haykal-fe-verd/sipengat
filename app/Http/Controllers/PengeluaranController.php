<?php

namespace App\Http\Controllers;

use App\Models\Pengeluaran;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Database\Eloquent\Builder;

class PengeluaranController extends Controller
{
    public function index(Request $request): Response
    {

        $pengeluaran = Pengeluaran::search($request->search)
            ->query(fn (Builder $query) => $query)
            ->paginate($request->perpage ?? 10)
            ->appends('query', null)
            ->withQueryString();

        return Inertia::render('Pengeluaran/Page', [
            'pengeluaran' => $pengeluaran,
        ]);
    }
}
