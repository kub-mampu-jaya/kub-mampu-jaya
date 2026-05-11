<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Handle user registration.
     */
    public function register(Request $request) {
        $request->validate([
            'username' => 'required|string|max:255|unique:users,name',
            'password' => 'required|string|min:8',
            'homeAddress' => 'required|string|max:255',
        ]);

        // The 'email' field is required and unique. We'll generate a dummy one.
        // The 'name' field will be used as the username.
        $user = User::create([
            'name' => $request->username,
            'email' => $request->username . '@example.com', // Dummy email to satisfy DB constraint
            'password' => Hash::make($request->password),
            'street' => $request->homeAddress, // Storing the address in the 'street' column
        ]);

        Auth::login($user);

        return response()->json([
            'suceess' => true,
            'message' => 'Registration successful.',
            'user' => $user
        ], 201);
    }

    /**
     * Handle user login.
     */
    public function login(Request $request) {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        // Attempt login using 'name' as the username field
        $credentials = [
            'name' => $request->username,
            'password' => $request->password,
        ];

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json([
                'suceess' => true,
                'message' => 'Login successful.',
                'user' => Auth::user()
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Login failed.',
            ])->setStatusCode(401);
        }

        // throw ValidationException::withMessages([
        //     'username' => [trans('auth.failed')],
        // ]);
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json(['message' => 'Logged out successfully.']);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        // return response()->json(['user' => $user]);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'phone_number' => 'nullable|string|max:20',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|string|in:male,female,other',
            'street' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'label' => 'nullable|string|max:255',
            'alt_street' => 'nullable|string|max:255',
            'alt_city' => 'nullable|string|max:255',
            'alt_state' => 'nullable|string|max:255',
            'alt_label' => 'nullable|string|max:255',
            'password' => 'nullable|string|min:8',
        ]);

        if (!empty($validatedData['password'])) {
            $user->password = Hash::make($validatedData['password']);
        }
        $user->update([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone_number' => $validatedData['phone_number'],
            'birth_date' => $validatedData['birth_date'],
            'gender' => $validatedData['gender'],
            'street' => $validatedData['street'],
            'city' => $validatedData['city'],
            'state' => $validatedData['state'],
            'label' => $validatedData['label'],
            'alt_street' => $validatedData['alt_street'],
            'alt_city' => $validatedData['alt_city'],
            'alt_state' => $validatedData['alt_state'],
            'alt_label' => $validatedData['alt_label'],
        ]);
        $user->save();
        return redirect()->back()->with('success', 'Profile updated successfully.');
    }
}