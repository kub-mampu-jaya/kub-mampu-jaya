// product-management.tsx

import { ProductDialog } from '@/components/admin/product-management/ProductDialog';
import { ProductTable } from '@/components/admin/product-management/ProductTable';
import { ConfigDrawer } from '@/components/config-drawer';
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { SearchProvider } from '@/context/search-provider';
import axios, { AxiosError } from 'axios';
import { Filter, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export type ProductRow = {
    id: number;
    name: string;
    category: string;
    price_origin: number;
    price_discount: number | null;
    quantity: number;
    branch?: string;
    image: string | null;
    description: string;
    rating?: number;
    status?: string;
};

export type ShopBranch = {
    id: number;
    name: string;
    address: string;
};

const topNav = [
    {
        title: 'Overview',
        href: 'admin',
        isActive: false,
        disabled: false,
    },
    {
        title: 'Customers',
        href: 'admin/customer-management',
        isActive: false,
        disabled: false,
    },
    {
        title: 'Products',
        href: 'admin/product-management',
        isActive: true,
        disabled: false,
    },
    {
        title: 'Settings',
        href: 'admin/settings',
        isActive: false,
        disabled: false,
    },
];

export default function ProductManagement({
    products: initialProducts,
}: {
    products: ProductRow[];
}) {
    const [products, setProducts] = useState<ProductRow[]>(initialProducts);
    const [shopBranches, setShopBranches] = useState<ShopBranch[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('name');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<ProductRow | null>(
        null,
    );
    const [activeTab, setActiveTab] = useState('products');

    useEffect(() => {
        // fetchProducts();
        fetchShopBranches();
    }, []);

    // const fetchProducts = async () => {
    //     try {
    //         const response = await axios.get('/api/products');
    //         setProducts(response.data);
    //     } catch (error) {
    //         console.error('Failed to fetch products:', error);
    //     }
    // };

    const fetchShopBranches = async () => {
        try {
            const response = await axios.get('/api/shop-branches');
            setShopBranches(response.data);
        } catch (error) {
            console.error('Failed to fetch shop branches:', error);
        }
    };

    const handleAddProduct = async (product: Omit<ProductRow, 'id'>) => {
        const formData = new FormData();
        Object.keys(product).forEach((key) => {
            const value = product[key as keyof typeof product];
            if (value !== null && value !== undefined) {
                if (key === 'image' && value instanceof File) {
                    formData.append(key, value);
                } else if (
                    typeof value === 'number' ||
                    typeof value === 'string'
                ) {
                    formData.append(key, String(value));
                }
            }
        });

        try {
            // console.log('formData', formData.keys(), formData.values());
            formData.forEach((value, key) => {
                console.log(key, value);
            });
            const response = await axios.post('/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);

            const newProduct = {
                ...response.data,
                branch: product.branch, // Tambah branch di sini karena tidak ada pada tabel product
                rating: Number(product.rating || 0),
            };
            setProducts([...products, newProduct]);
            handleCloseDialog();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{
                    errors: Record<string, string[]>;
                }>;
                if (axiosError.response?.data?.errors) {
                    const errorMessages = Object.values(
                        axiosError.response.data.errors,
                    ).flat();
                    Swal.fire({
                        icon: 'error',
                        title: 'Validation Error',
                        html: `<ul class="list-disc list-inside text-left">${errorMessages.map((e) => `<li>${e}</li>`).join('')}</ul>`,
                    });
                }
            } else {
                console.error('Failed to add product:', error);
            }
        }
    };

    const handleEditProduct = async (product: ProductRow) => {
        const formData = new FormData();
        Object.keys(product).forEach((key) => {
            const value = product[key as keyof typeof product];
            if (value !== null && value !== undefined) {
                if (key === 'image' && value instanceof File) {
                    formData.append(key, value);
                } else if (
                    key !== 'image' &&
                    (typeof value === 'number' || typeof value === 'string')
                ) {
                    formData.append(key, String(value));
                }
            }
        });
        formData.append('_method', 'PUT');

        try {
            const response = await axios.post(
                `/api/products/${product.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );
            console.log('response', response);
            const newProduct = {
                ...response.data,
                branch: product.branch, // Tambah branch di sini karena tidak ada pada tabel product
                rating: Number(product.rating || 0),
            };
            setProducts(
                products.map((p) => (p.id === product.id ? newProduct : p)),
            );
            handleCloseDialog();
        } catch (error) {
            console.log('handleEditProduct error', error);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{
                    errors: Record<string, string[]>;
                }>;
                if (axiosError.response?.data?.errors) {
                    const errorMessages = Object.values(
                        axiosError.response.data.errors,
                    ).flat();
                    Swal.fire({
                        icon: 'error',
                        title: 'Validation Error',
                        html: `<ul class="list-disc list-inside text-left">${errorMessages.map((e) => `<li>${e}</li>`).join('')}</ul>`,
                    });
                }
            } else {
                console.error('Failed to edit product:', error);
            }
        }
    };

    const handleDeleteProduct = async (id: number) => {
        try {
            console.log('handleDeleteProduct');
            console.log('handleDeleteProduct id', id);
            const data = { _method: 'delete' };
            const response = await axios.post(
                `/api/products/remove/${id}`,
                data,
            );
            console.log('handleDeleteProduct response', response);
            setProducts(products.filter((p) => p.id !== id));
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    };

    const handleOpenDialog = (product?: ProductRow) => {
        setEditingProduct(product || null);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setEditingProduct(null);
        setIsDialogOpen(false);
    };

    const filteredAndSortedProducts = products
        .filter((product) => {
            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (product.description || '')
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const matchesCategory =
                categoryFilter === 'all' || product.category === categoryFilter;

            const matchesStatus =
                statusFilter === 'all' ||
                (product.quantity > 0 ? 'Aktif' : 'Tidak Aktif') ===
                    statusFilter;

            return matchesSearch && matchesCategory && matchesStatus;
        })
        .sort((a, b) => {
            const priceA = a.price_discount ?? a.price_origin;
            const priceB = b.price_discount ?? b.price_origin;

            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price-asc':
                    return priceA - priceB;
                case 'price-desc':
                    return priceB - priceA;
                case 'stock':
                    return (b.quantity ?? 0) - (a.quantity ?? 0);
                case 'rating':
                    return (b.rating ?? 0) - (a.rating ?? 0);
                default:
                    return 0;
            }
        });

    return (
        <AuthenticatedLayout>
            <SearchProvider>
                <Header>
                    <div className="ms-auto flex flex-wrap items-center gap-2 sm:gap-4">
                        <Search />
                        <ThemeSwitch />
                        <ConfigDrawer />
                        <ProfileDropdown />
                    </div>
                </Header>
                <Main>
                    <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Button
                            className="w-full sm:w-auto"
                            onClick={() => handleOpenDialog()}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Produk
                        </Button>
                        {/* <Button className="w-full sm:w-auto" variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Export Data
                        </Button> */}
                    </div>

                    {/* <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="space-y-4"
                    >
                        <TabsList className="w-full overflow-x-auto sm:w-auto">
                            <TabsTrigger
                                className="flex-1 sm:flex-none"
                                value="products"
                            >
                                Daftar Produk
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="products"> */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Produk</CardTitle>
                            <CardDescription>
                                Kelola produk makanan dan minuman Anda.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    {/* KIRI: Input Search */}
                                    <div className="w-full sm:min-w-[240px] sm:flex-1">
                                        <Input
                                            type="text"
                                            placeholder="Cari produk..."
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                        />
                                    </div>

                                    {/* KANAN: Filters (mentok kanan) */}
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                        {/* Filter Kategori */}
                                        <Select
                                            value={categoryFilter}
                                            onValueChange={setCategoryFilter}
                                        >
                                            <SelectTrigger className="w-full sm:w-[180px]">
                                                <SelectValue placeholder="Semua Kategori" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">
                                                    Semua Kategori
                                                </SelectItem>
                                                <SelectItem value="Makanan">
                                                    Makanan
                                                </SelectItem>
                                                <SelectItem value="Minuman">
                                                    Minuman
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>

                                        {/* Filter Status */}
                                        <Select
                                            value={statusFilter}
                                            onValueChange={setStatusFilter}
                                        >
                                            <SelectTrigger className="w-full sm:w-[180px]">
                                                <SelectValue placeholder="Semua Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">
                                                    Semua Status
                                                </SelectItem>
                                                <SelectItem value="Aktif">
                                                    Aktif
                                                </SelectItem>
                                                <SelectItem value="Tidak Aktif">
                                                    Tidak Aktif
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Filter className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            Urutkan:
                                        </span>
                                        <Select
                                            value={sortBy}
                                            onValueChange={setSortBy}
                                        >
                                            <SelectTrigger className="w-full min-w-[180px] sm:w-auto">
                                                <SelectValue placeholder="Urutkan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="name">
                                                    Nama (A-Z)
                                                </SelectItem>
                                                <SelectItem value="price-asc">
                                                    Harga (Terendah)
                                                </SelectItem>
                                                <SelectItem value="price-desc">
                                                    Harga (Tertinggi)
                                                </SelectItem>
                                                <SelectItem value="stock">
                                                    Stok (Terbanyak)
                                                </SelectItem>
                                                <SelectItem value="rating">
                                                    Rating (Tertinggi)
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Menampilkan{' '}
                                        {filteredAndSortedProducts.length} dari{' '}
                                        {products.length} produk
                                    </div>
                                </div>
                                <ProductTable
                                    products={filteredAndSortedProducts}
                                    onEdit={handleOpenDialog}
                                    onDelete={handleDeleteProduct}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    {/* </TabsContent>
                    </Tabs> */}
                </Main>
            </SearchProvider>

            <ProductDialog
                key={String(isDialogOpen)}
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                onSave={editingProduct ? handleEditProduct : handleAddProduct}
                product={editingProduct}
                shopBranches={shopBranches}
            />
        </AuthenticatedLayout>
    );
}
