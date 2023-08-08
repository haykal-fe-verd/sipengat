<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Divisi;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Inertia\Response;

class RegisterController extends Controller
{
    public function index(): Response
    {
        $divisi = Divisi::all();
        return Inertia::render('Auth/Register', compact('divisi'));
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'divisi_id' => 'required',
            'role' => 'required',
        ], [
            'divisi_id.required' => 'Pilih salah satu divisi dari opsi yang tersedia.'
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'divisi_id' => $request->divisi_id,
        ]);

        return redirect()->route('login')->with('status', 'Pendaftaran akun berhasil');
    }
}
