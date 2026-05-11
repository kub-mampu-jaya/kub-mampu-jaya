import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { TransactionRow } from '@/pages/admin/cashflow-management';
import { ArrowUpDown, Download, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

type TransactionTableProps = {
    transactions: TransactionRow[];
};

export function TransactionTable({ transactions }: TransactionTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortAsc, setSortAsc] = useState(false);
    const itemsPerPage = 10;

    const categoryColors: Record<string, string> = {
        Makanan: 'border-red-100 bg-red-50 text-red-700',
        Minuman: 'border-blue-100 bg-blue-50 text-blue-700',
    };

    /* ================= FILTER + SORT ================= */
    const filteredTransactions = useMemo(() => {
        const filtered = transactions.filter((t) =>
            [t.description, t.branch, t.category, t.customer].some((field) =>
                field.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        );

        return filtered.sort((a, b) =>
            sortAsc ? a.amount - b.amount : b.amount - a.amount,
        );
    }, [transactions, searchTerm, sortAsc]);

    /* ================= PAGINATION ================= */
    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTransactions = filteredTransactions.slice(
        startIndex,
        startIndex + itemsPerPage,
    );

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(value);

    const totalRevenue = filteredTransactions.reduce(
        (sum, t) => sum + Math.round(Number(t.amount)),
        0,
    );

    return (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            {/* HEADER */}
            <div className="border-b p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="font-bold text-gray-900">
                            Detail Transaksi
                        </h3>
                        <p className="mt-1 text-gray-500">
                            Total {filteredTransactions.length} transaksi •{' '}
                            {formatCurrency(totalRevenue)}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        {/* SEARCH */}
                        <div className="relative">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Cari transaksi..."
                                className="w-full rounded-lg border py-2 pr-4 pl-9 focus:ring-2 focus:ring-emerald-500 sm:w-64"
                            />
                        </div>

                        {/* EXPORT */}
                        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-orange-400">
                            <Download className="h-4 w-4" />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto px-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>Deskripsi</TableHead>
                            <TableHead>Pelanggan</TableHead>
                            <TableHead>Cabang</TableHead>
                            <TableHead>Metode</TableHead>
                            <TableHead className="text-right">
                                <button
                                    onClick={() => setSortAsc(!sortAsc)}
                                    className="inline-flex items-center gap-1"
                                >
                                    Jumlah
                                    <ArrowUpDown className="h-4 w-4" />
                                </button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {paginatedTransactions.map((t) => (
                            <TableRow key={t.id}>
                                <TableCell>{t.id}</TableCell>
                                <TableCell>{t.date}</TableCell>
                                <TableCell>
                                    <span
                                        className={`rounded-md px-2 py-1 ${
                                            categoryColors[t.category] ??
                                            'bg-gray-100 text-gray-700'
                                        }`}
                                    >
                                        {t.category}
                                    </span>
                                </TableCell>
                                <TableCell className="max-w-xs truncate">
                                    {t.description}
                                </TableCell>
                                <TableCell>{t.customer}</TableCell>
                                <TableCell>{t.branch}</TableCell>
                                <TableCell>{t.paymentMethod}</TableCell>
                                <TableCell className="text-right font-medium">
                                    {formatCurrency(t.amount)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-between border-t px-6 py-4">
                <p className="text-sm text-gray-600">
                    Menampilkan {startIndex + 1} –{' '}
                    {Math.min(
                        startIndex + itemsPerPage,
                        filteredTransactions.length,
                    )}{' '}
                    dari {filteredTransactions.length}
                </p>

                <div className="flex gap-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                        className="rounded border px-3 py-1 disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="rounded border px-3 py-1 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
