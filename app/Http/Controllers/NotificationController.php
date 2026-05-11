<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use Inertia\Inertia;
use App\Models\User;
use App\Models\TeleUsers;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();

        $dataNotification = Notification::where('users_id', $userId)
            ->with('user')
            ->orderByDesc('created_at')
            ->get();

        // kalau masih perlu list user (mis. admin), ambil terpisah
        $users = User::select('id','name','email')->get();

        return Inertia::render('homepage/notification', [
            'dataNotification' => $dataNotification,
            'usersData' => $users,
            'selectedUser' => $userId,
    ]);
    }



    public function sendNotificationSave(Request $request){
        $validated = $request->validate([
            'name'   => 'required|string',
            'chat_id' => 'required|string',
            'pesan'  => 'required|string',
            'title' => 'required|string',
        ]);
        $teleuser = TeleUsers::where('chat_id', $validated['chat_id'])->firstOrFail();
        $user_id = $teleuser->users_id;

        $data = Notification::create([
                    'users_id' => $user_id,
                    'title' => $validated['title'],
                    'message' => $validated['pesan'],
                ]);

        return response()->json([
            'NotificationData' => $data,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'users_id' => ['required', 'integer', Rule::in(User::pluck('id')->toArray())],
            'title' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $notification = Notification::create($validated);

        // kembalikan JSON agar frontend axios bisa memprosesnya
        return response()->json([
            'success' => true,
            'data' => $notification->load('user'),
            'message' => 'Notification created'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $notification = Notification::with('user')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $notification
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $notification = Notification::findOrFail($id);

        $validated = $request->validate([
            'users_id' => ['required', 'integer', Rule::in(User::pluck('id')->toArray())],
            'title' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $notification->update($validated);

        return response()->json([
            'success' => true,
            'data' => $notification->fresh('user'),
            'message' => 'Notification updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);

        // Authorization: hanya pemilik atau admin yang boleh hapus
        // Ganti cek is_admin sesuai implementasimu (mis. role field)
        if (Auth::id() !== (int) $notification->users_id && !(Auth::user()?->is_admin ?? false)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        // Kalau kamu ingin force delete ketika ada query param ?force=true
        if (request()->query('force') === 'true' && method_exists($notification, 'forceDelete')) {
            $notification->forceDelete();
        } else {
            $notification->delete(); // soft delete jika model pakai SoftDeletes, else permanent
        }

        return response()->json([
            'success' => true,
            'message' => 'Notification deleted',
            'id'      => (int)$id,
        ], 200);
    }

}
