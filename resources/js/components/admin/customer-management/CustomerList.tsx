import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Download, Eye, Filter, Search, Star } from 'lucide-react';
import { useState } from 'react';

// const customersData = [
//     {
//         id: 'CST001',
//         name: 'Budi Santoso',
//         email: 'budi.santoso@email.com',
//         phone: '08123456789',
//         area: 'Jakarta Selatan',
//         totalOrders: 24,
//         totalSpent: 2850000,
//         lastOrder: '2024-11-18',
//         status: 'Setia',
//         avgRating: 4.8,
//     },
//     {
//         id: 'CST002',
//         name: 'Siti Nurhaliza',
//         email: 'siti.nur@email.com',
//         phone: '08234567890',
//         area: 'Bandung',
//         totalOrders: 15,
//         totalSpent: 1750000,
//         lastOrder: '2024-11-19',
//         status: 'Aktif',
//         avgRating: 4.5,
//     },
//     {
//         id: 'CST003',
//         name: 'Ahmad Wijaya',
//         email: 'ahmad.w@email.com',
//         phone: '08345678901',
//         area: 'Jakarta Pusat',
//         totalOrders: 31,
//         totalSpent: 3920000,
//         lastOrder: '2024-11-20',
//         status: 'Setia',
//         avgRating: 4.9,
//     },
//     {
//         id: 'CST004',
//         name: 'Dewi Lestari',
//         email: 'dewi.lestari@email.com',
//         phone: '08456789012',
//         area: 'Surabaya',
//         totalOrders: 8,
//         totalSpent: 920000,
//         lastOrder: '2024-11-15',
//         status: 'Aktif',
//         avgRating: 4.3,
//     },
//     {
//         id: 'CST005',
//         name: 'Rudi Hartono',
//         email: 'rudi.h@email.com',
//         phone: '08567890123',
//         area: 'Jakarta Barat',
//         totalOrders: 3,
//         totalSpent: 285000,
//         lastOrder: '2024-11-20',
//         status: 'Baru',
//         avgRating: 4.0,
//     },
//     {
//         id: 'CST006',
//         name: 'Rina Kusuma',
//         email: 'rina.k@email.com',
//         phone: '08678901234',
//         area: 'Yogyakarta',
//         totalOrders: 18,
//         totalSpent: 2100000,
//         lastOrder: '2024-11-17',
//         status: 'Setia',
//         avgRating: 4.7,
//     },
//     {
//         id: 'CST007',
//         name: 'Fajar Nugroho',
//         email: 'fajar.n@email.com',
//         phone: '08789012345',
//         area: 'Jakarta Timur',
//         totalOrders: 12,
//         totalSpent: 1450000,
//         lastOrder: '2024-11-19',
//         status: 'Aktif',
//         avgRating: 4.4,
//     },
//     {
//         id: 'CST008',
//         name: 'Linda Wijayanti',
//         email: 'linda.w@email.com',
//         phone: '08890123456',
//         area: 'Semarang',
//         totalOrders: 6,
//         totalSpent: 720000,
//         lastOrder: '2024-10-28',
//         status: 'Tidak Aktif',
//         avgRating: 3.9,
//     },
// ];

interface CustomerData {
    id: string;
    name: string;
    email: string;
    phone: string;
    area: string;
    totalOrders: number;
    totalSpent: number;
    lastOrder: string;
    status: string;
    avgRating: number;
}

interface CustomerListProps {
    data: {
        customersData: CustomerData[];
    };
}

export function CustomerList({ data: { customersData } }: CustomerListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [areaFilter, setAreaFilter] = useState('all');

    console.log('customersData', customersData);

    const filteredCustomers = customersData.filter((customer) => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' || customer.status === statusFilter;
        const matchesArea =
            areaFilter === 'all' || customer.area === areaFilter;
        return matchesSearch && matchesStatus && matchesArea;
    });

    console.log('filteredCustomers', filteredCustomers);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Setia':
                return 'bg-green-100 text-green-800';
            case 'Aktif':
                return 'bg-blue-100 text-blue-800';
            case 'Baru':
                return 'bg-yellow-100 text-yellow-800';
            case 'Tidak Aktif':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const areas = [...new Set(customersData.map((c) => c.area))];

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Daftar Pelanggan</CardTitle>
                        <p className="mt-2 text-slate-600">
                            Total {filteredCustomers.length} pelanggan
                        </p>
                    </div>
                    <Button className="flex items-center gap-2">
                        <Download className="size-4" />
                        Export Data
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {/* Filters */}
                <div className="mb-6 flex flex-col gap-4 md:flex-row">
                    <div className="relative flex-1">
                        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 transform text-slate-400" />
                        <Input
                            placeholder="Cari nama, email, atau ID pelanggan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                    >
                        <SelectTrigger className="w-full md:w-[180px]">
                            <Filter className="mr-2 size-4" />
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Status</SelectItem>
                            <SelectItem value="Setia">Setia</SelectItem>
                            <SelectItem value="Aktif">Aktif</SelectItem>
                            <SelectItem value="Baru">Baru</SelectItem>
                            <SelectItem value="Tidak Aktif">
                                Tidak Aktif
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={areaFilter} onValueChange={setAreaFilter}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Area" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Area</SelectItem>
                            {areas.map((area) => (
                                <SelectItem key={area} value={area}>
                                    {area}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Pelanggan</TableHead>
                                <TableHead>Area</TableHead>
                                <TableHead>Total Pesanan</TableHead>
                                <TableHead>Total Belanja</TableHead>
                                <TableHead>Pesanan Terakhir</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCustomers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>{customer.id}</TableCell>
                                    <TableCell>
                                        <div>
                                            <p>{customer.name}</p>
                                            <p className="text-slate-500">
                                                {customer.email}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{customer.area}</TableCell>
                                    <TableCell>
                                        {customer.totalOrders}
                                    </TableCell>
                                    <TableCell>
                                        {formatCurrency(customer.totalSpent)}
                                    </TableCell>
                                    <TableCell>
                                        {customer.lastOrder === '-'
                                            ? '-'
                                            : new Date(
                                                  customer.lastOrder,
                                              ).toLocaleDateString('id-ID')}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <Star
                                                fill="#FFC83D"
                                                stroke=""
                                                className="h-4.5 w-4.5"
                                            />{' '}
                                            {customer.avgRating}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            className={getStatusColor(
                                                customer.status,
                                            )}
                                        >
                                            {customer.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    <Eye className="size-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-2xl">
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Detail Pelanggan
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Informasi lengkap
                                                        pelanggan
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="grid grid-cols-2 gap-4 py-4">
                                                    <div>
                                                        <p className="text-slate-500">
                                                            ID Pelanggan
                                                        </p>
                                                        <p>{customer.id}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-500">
                                                            Nama Lengkap
                                                        </p>
                                                        <p>{customer.name}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-500">
                                                            Email
                                                        </p>
                                                        <p>{customer.email}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-500">
                                                            Telepon
                                                        </p>
                                                        <p>{customer.phone}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-500">
                                                            Area
                                                        </p>
                                                        <p>{customer.area}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-500">
                                                            Status
                                                        </p>
                                                        <Badge
                                                            className={getStatusColor(
                                                                customer.status,
                                                            )}
                                                        >
                                                            {customer.status}
                                                        </Badge>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-500">
                                                            Total Pesanan
                                                        </p>
                                                        <p>
                                                            {
                                                                customer.totalOrders
                                                            }{' '}
                                                            pesanan
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-500">
                                                            Total Belanja
                                                        </p>
                                                        <p>
                                                            {formatCurrency(
                                                                customer.totalSpent,
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-500">
                                                            Rating Rata-rata
                                                        </p>
                                                        <p className="flex items-center gap-1">
                                                            <Star
                                                                fill="#FFC83D"
                                                                stroke=""
                                                                className="h-4.5 w-4.5"
                                                            />
                                                            <span>
                                                                {
                                                                    customer.avgRating
                                                                }
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-slate-500">
                                                            Pesanan Terakhir
                                                        </p>
                                                        <p>
                                                            {new Date(
                                                                customer.lastOrder,
                                                            ).toLocaleDateString(
                                                                'id-ID',
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}
