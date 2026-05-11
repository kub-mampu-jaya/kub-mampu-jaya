import { UserCard } from '@/components/usercard';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { ChevronDown, Package, X } from 'lucide-react';
import { useMemo, useState } from 'react';

interface teleProps {
    users_id: number | string;
    chat_id: number;
    name: string;
    languange_code: string;
}

interface usersProps {
    id: number;
    name: string;
    email: string;
    phone_number?: string;
    birth_date?: string | Date;
    gender?: string;
    street?: string;
    city?: string;
    state?: string;
    label?: string;
}

const App = () => {
    const { props } = usePage();
    const dataObj: teleProps[] = Array.isArray(props.data) ? props.data : [];
    const usersDataObj: usersProps[] = Array.isArray(props.usersData)
        ? props.usersData
        : [];

    console.log('usersDataObj', usersDataObj);

    // Map user id -> user, pastikan key selalu number (coerce)
    const userMap = useMemo(() => {
        const map = new Map<number, usersProps>();
        usersDataObj.forEach((user) => {
            if (user && user.id != null) {
                map.set(Number(user.id), user);
            }
        });
        return map;
    }, [usersDataObj]);

    // --- pencarian ---
    const [query, setQuery] = useState<string>('');

    const filteredData = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return dataObj;
        return dataObj.filter((d) => {
            const user = userMap.get(Number(d.users_id));
            const teleName = (d.name || '').toLowerCase();
            const userName = (user?.name || '').toLowerCase();
            const userEmail = (user?.email || '').toLowerCase();
            return (
                teleName.includes(q) ||
                userName.includes(q) ||
                userEmail.includes(q)
            );
        });
    }, [dataObj, userMap, query]);
    console.log('filteredData', filteredData);
    // --- akhir pencarian ---

    const [type, setType] = useState('prepare');
    const [sendNote, setSendNote] = useState('Pesanan Akan Dikirim');

    const sendTo = async (url: string, payload: object) => {
        try {
            await axios.post(url, payload);
            console.log('Data terkirim ke Laravel → n8n');
        } catch (error) {
            console.error('Gagal mengirim:', error);
        }
    };

    const handleSend = (
        type: string,
        id_chat: number,
        name: string,
        languange_code: string,
        note: string,
    ) => {
        const payload = { chat_id: id_chat, name, note, languange_code };
        switch (type) {
            case 'prepare':
                return sendTo('/api/send-to-n8n-prepare', payload);
            case 'middle':
                return sendTo('/api/send-to-n8n-middle', payload);
            case 'done':
                return sendTo('/api/send-to-n8n-done', payload);
            default:
                return;
        }
    };

    const handleTypeChange = (newType: string) => {
        setType(newType);
        switch (newType) {
            case 'prepare':
                setSendNote('Pesanan Akan Dikirim');
                break;
            case 'middle':
                setSendNote('Pesananmu Ditengah Perjalanan');
                break;
            case 'done':
                setSendNote('Pesananmu Sampaii!!, Selamat Menikmati');
                break;
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'prepare':
                return 'Prepare Order';
            case 'middle':
                return 'Order In Transit';
            case 'done':
                return 'Order Delivered';
            default:
                return 'Select Type';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#FFF5F0]">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FF6900] to-[#FA2C36] px-4 py-8 text-white shadow-lg sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                            <Package className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-white">Order Management</h1>
                            <p className="mt-1 text-white/90">
                                Send order notifications to customers
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Control Panel */}
                <div className="mb-8 rounded-2xl border border-border bg-white p-6 shadow-sm">
                    <div className="max-w-md">
                        <label className="mb-3 block text-gray-700">
                            Notification Type
                        </label>
                        <div className="relative">
                            <select
                                name="sendType"
                                value={type}
                                onChange={(e) =>
                                    handleTypeChange(e.target.value)
                                }
                                className="w-full cursor-pointer appearance-none rounded-xl border-2 border-gray-200 bg-white px-4 py-3 pr-10 transition-all hover:border-gray-300 focus:border-[#FF6900] focus:ring-4 focus:ring-[#FF6900]/10 focus:outline-none"
                            >
                                <option value="prepare">
                                    📦 Prepare - Order will be shipped
                                </option>
                                <option value="middle">
                                    🚚 Middle - Order in transit
                                </option>
                                <option value="done">
                                    ✅ Done - Order delivered
                                </option>
                            </select>
                            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="mt-4 rounded-xl border border-[#FF6900]/20 bg-gradient-to-r from-[#FFF5F0] to-white p-4">
                            <p className="text-gray-600">
                                <span className="text-gray-900">Message: </span>
                                {sendNote}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats + Search */}
                <div className="mb-8 grid grid-cols-1 items-center gap-4 lg:grid-cols-4">
                    <div className="col-span-2 rounded-xl border border-border bg-white p-6 shadow-sm">
                        <p className="mb-1 text-gray-600">
                            Total Orders (filtered / total)
                        </p>
                        <p className="text-gray-900">
                            {filteredData.length} / {dataObj.length}
                        </p>
                    </div>
                    <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                        <p className="mb-1 text-gray-600">Active Type</p>
                        <p className="text-gray-900">{getTypeLabel(type)}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                        <p className="mb-1 text-gray-600">Total Users</p>
                        <p className="text-gray-900">{usersDataObj.length}</p>
                    </div>
                </div>

                {/* Search input */}
                <div className="mb-6 max-w-2xl">
                    <label className="mb-2 block text-gray-700">
                        Cari berdasarkan nama atau email
                    </label>
                    <div className="relative">
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Masukkan nama atau email..."
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 transition-all focus:border-[#FF6900] focus:ring-4 focus:ring-[#FF6900]/10 focus:outline-none"
                        />
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 hover:bg-gray-100"
                                aria-label="Clear search"
                            >
                                <X className="h-4 w-4 text-gray-500" />
                            </button>
                        )}
                    </div>
                </div>

                {/* User Cards Grid */}
                {filteredData.length > 0 ? (
                    <div>
                        <h2 className="mb-6 text-gray-900">Customer Orders</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredData.map((d) => {
                                const user = userMap.get(Number(d.users_id));
                                // fallback minimal user jika belum ada di usersData
                                const userForCard = user
                                    ? { name: user.name, email: user.email }
                                    : undefined;
                                console.log('userForCard', userForCard);
                                return (
                                    <UserCard
                                        key={d.chat_id}
                                        user={userForCard}
                                        chatId={d.chat_id}
                                        languageCode={d.languange_code}
                                        sendType={type}
                                        onSend={() =>
                                            handleSend(
                                                type,
                                                d.chat_id,
                                                d.name,
                                                d.languange_code,
                                                sendNote,
                                            )
                                        }
                                    />
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="rounded-2xl border border-border bg-white p-12 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                            <Package className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="mb-2 text-gray-900">No Orders Found</h3>
                        <p className="text-gray-500">
                            Coba kata kunci lain atau kosongkan pencarian
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;
