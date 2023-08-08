<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Inertia\Response;


class ProfileController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Auth/Profile', [
            'status' => session('success'),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email,' . $user->id,
        ]);

        $user->name = $request->input('name');
        $user->email = $request->input('email');

        $oldImagePath = $user->image;
        if ($request->hasFile('image')) {
            $request->validate([
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($oldImagePath) {
                File::delete(public_path('avatars/' . basename($oldImagePath)));
            }

            $file = $request->file('image');
            $fileName = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('avatars'), $fileName);
            $user->image = $fileName;
        }

        $user->save();

        return Redirect::route('profile.index')->with('success', 'Profil berhasil diperbarui.');
    }
}
