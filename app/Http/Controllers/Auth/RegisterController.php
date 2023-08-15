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
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'divisi_id' => 'required',
            'role' => 'required',
        ]);

        User::create([
            'divisi_id' => $request->divisi_id,
            'role' => $request->role,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('login')->with('status', 'Pendaftaran akun berhasil');
    }
}
