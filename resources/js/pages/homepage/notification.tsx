import HomepageLayout from '@/layouts/client-side/HomepageLayout';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { Package, Trash2, X } from 'lucide-react';
import { ReactNode, useMemo, useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface NotificationItem {
    id: number;
    users_id: number;
    title: string;
    message: string;
    created_at?: string;
    updated_at?: string;
    user?: User | null;
}

const NotificationPage = () => {
    const { props } = usePage();
    const initData: NotificationItem[] = Array.isArray(props.dataNotification)
        ? props.dataNotification
        : [];
    const usersData: User[] = Array.isArray(props.usersData)
        ? props.usersData
        : [];

    const [notifications, setNotifications] =
        useState<NotificationItem[]>(initData);
    const [query, setQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState<NotificationItem | null>(null);
    const [form, setForm] = useState({
        users_id: usersData[0]?.id ?? 0,
        title: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return notifications;
        return notifications.filter((n) => {
            const userName = (n.user?.name || '').toLowerCase();
            const userEmail = (n.user?.email || '').toLowerCase();
            const title = (n.title || '').toLowerCase();
            const message = (n.message || '').toLowerCase();
            return (
                userName.includes(q) ||
                userEmail.includes(q) ||
                title.includes(q) ||
                message.includes(q)
            );
        });
    }, [notifications, query]);

    const handleSubmit = async (e?: any) => {
        if (e) e.preventDefault();
        setLoading(true);
        try {
            if (editing) {
                const res = await axios.put(
                    `/notifications/${editing.id}`,
                    form,
                );
                const updated: NotificationItem = res.data.data;
                setNotifications((prev) =>
                    prev.map((p) => (p.id === updated.id ? updated : p)),
                );
            } else {
                const res = await axios.post('/notifications', form);
                const created: NotificationItem = res.data.data;
                setNotifications((prev) => [created, ...prev]);
            }
            setIsModalOpen(false);
        } catch (err: any) {
            alert(err?.response?.data?.message || 'Gagal menyimpan notifikasi');
        } finally {
            setLoading(false);
        }
    };

    const [deletingIds, setDeletingIds] = useState<number[]>([]);

    const handleDelete = async (id: number) => {
        if (!confirm('Hapus notifikasi ini?')) return;
        if (deletingIds.includes(id)) return;

        setDeletingIds((prev) => [...prev, id]);
        try {
            const res = await axios.delete(`/notifications/${id}`);
            const success =
                res?.data?.success ??
                (res.status === 200 || res.status === 204);
            if (success) {
                setNotifications((prev) => prev.filter((p) => p.id !== id));
            } else {
                alert('Gagal menghapus notifikasi');
            }
        } finally {
            setDeletingIds((prev) => prev.filter((x) => x !== id));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#FFF5F0]">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
                {/* Statistik & Pencarian */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border bg-white p-4 shadow-sm sm:col-span-2 sm:p-6">
                        <p className="mb-1 text-sm text-gray-600">
                            Total Notifikasi (tersaring / total)
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {filtered.length} / {notifications.length}
                        </p>
                    </div>

                    <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-6">
                        <label className="mb-2 block text-sm text-gray-600">
                            Pencarian
                        </label>
                        <div className="relative">
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Cari judul / pesan / pengguna..."
                                className="w-full rounded-xl border px-3 py-2 pr-10 text-sm focus:border-[#FF6900] focus:ring-4 focus:ring-[#FF6900]/10 focus:outline-none"
                            />
                            {query && (
                                <button
                                    onClick={() => setQuery('')}
                                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 hover:bg-gray-100"
                                >
                                    <X className="h-4 w-4 text-gray-500" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Daftar */}
                {filtered.length > 0 ? (
                    <div>
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">
                            Daftar Notifikasi
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((item) => {
                                const isDeleting = deletingIds.includes(
                                    item.id,
                                );
                                return (
                                    <div
                                        key={item.id}
                                        className="rounded-xl border bg-white p-4 shadow-sm"
                                    >
                                        <div className="flex justify-between gap-3">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {item.title}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-600">
                                                    {item.message}
                                                </p>
                                                <p className="mt-3 text-xs text-gray-500">
                                                    Untuk:{' '}
                                                    <span className="text-gray-800">
                                                        {item.user?.name ??
                                                            'Tidak diketahui'}
                                                    </span>{' '}
                                                    • {item.user?.email ?? '-'}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-400">
                                                    {item.created_at
                                                        ? new Date(
                                                              item.created_at,
                                                          ).toLocaleString()
                                                        : ''}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                                disabled={isDeleting}
                                                className="h-fit rounded-md p-2 hover:bg-red-50"
                                            >
                                                <Trash2
                                                    className={`h-4 w-4 ${
                                                        isDeleting
                                                            ? 'text-gray-400'
                                                            : 'text-red-500'
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                            <Package className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="mb-2 font-semibold text-gray-900">
                            Tidak Ada Notifikasi
                        </h3>
                        <p className="text-sm text-gray-500">
                            Buat notifikasi baru menggunakan tombol Buat
                        </p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <form
                        onSubmit={handleSubmit}
                        className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-lg"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold">
                                {editing
                                    ? 'Edit Notifikasi'
                                    : 'Buat Notifikasi'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-full p-1 hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="grid gap-3">
                            <label className="text-sm text-gray-600">
                                Pengguna
                            </label>
                            <select
                                value={form.users_id}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        users_id: Number(e.target.value),
                                    }))
                                }
                                className="rounded-xl border px-3 py-2 text-sm"
                            >
                                {usersData.map((u) => (
                                    <option key={u.id} value={u.id}>
                                        {u.name} — {u.email}
                                    </option>
                                ))}
                            </select>

                            <label className="text-sm text-gray-600">
                                Judul
                            </label>
                            <input
                                value={form.title}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                className="rounded-xl border px-3 py-2 text-sm"
                                required
                            />

                            <label className="text-sm text-gray-600">
                                Pesan
                            </label>
                            <textarea
                                value={form.message}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        message: e.target.value,
                                    }))
                                }
                                className="h-28 rounded-xl border px-3 py-2 text-sm"
                                required
                            />
                        </div>

                        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-xl border px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-xl bg-[#FF6900] px-4 py-2 text-sm text-white"
                            >
                                {loading
                                    ? 'Menyimpan...'
                                    : editing
                                      ? 'Simpan Perubahan'
                                      : 'Buat'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default NotificationPage;
NotificationPage.layout = (page: ReactNode) => (
    <HomepageLayout>{page}</HomepageLayout>
);
