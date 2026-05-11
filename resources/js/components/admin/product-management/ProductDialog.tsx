import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ProductRow, ShopBranch } from '@/pages/admin/product-management';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

type ProductDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Omit<ProductRow, 'id'> | ProductRow) => void;
    product: ProductRow | null;
    shopBranches: ShopBranch[];
};

export function ProductDialog({
    isOpen,
    onClose,
    onSave,
    product,
    shopBranches,
}: ProductDialogProps) {
    const getInitialFormData = (): ProductRow => ({
        id: product?.id || 0,
        name: product?.name || '',
        category: product?.category || 'Makanan',
        price_origin: product?.price_origin || 0,
        price_discount: product?.price_discount || null,
        quantity: product?.quantity || 0,
        branch: product?.branch || '',
        image: product?.image || null,
        description: product?.description || '',
        rating: product?.rating || 0,
        status: product?.status || 'Aktif',
    });

    const [formData, setFormData] = useState<ProductRow>(getInitialFormData());
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        setFormData(getInitialFormData());
        setImageFile(null);
    }, [product, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            image: imageFile,
        };

        console.log('payload', payload);

        onSave(payload);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white">
                {/* HEADER */}
                <div className="sticky top-0 flex items-center justify-between border-b px-6 py-4">
                    <h2>{product ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
                    <button onClick={onClose}>
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6 p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Nama */}
                        <div className="md:col-span-2">
                            <Label>Nama Produk *</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        {/* Kategori */}
                        <div>
                            <Label>Kategori *</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        category: value as any,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Makanan">
                                        Makanan
                                    </SelectItem>
                                    <SelectItem value="Minuman">
                                        Minuman
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Cabang */}
                        <div>
                            <Label>Cabang *</Label>
                            <Select
                                value={formData.branch}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        branch: value,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Cabang" />
                                </SelectTrigger>
                                <SelectContent>
                                    {shopBranches.map((branch) => (
                                        <SelectItem
                                            key={branch.id}
                                            value={branch.name}
                                        >
                                            {branch.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Harga */}
                        <div>
                            <Label>Harga *</Label>
                            <Input
                                type="number"
                                value={formData.price_origin}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        price_origin: Number(e.target.value),
                                    })
                                }
                                required
                            />
                        </div>

                        {/* Stok */}
                        <div>
                            <Label>Stok *</Label>
                            <Input
                                type="number"
                                value={formData.quantity}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        quantity: Number(e.target.value),
                                    })
                                }
                                required
                            />
                        </div>

                        {/* Diskon */}
                        <div>
                            <Label>Harga Setelah Diskon</Label>
                            <Input
                                type="number"
                                value={formData.price_discount ?? ''}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        price_discount: e.target.value
                                            ? Number(e.target.value)
                                            : null,
                                    })
                                }
                            />
                        </div>

                        {/* Status */}
                        {/* <div>
                            <Label>Status *</Label>
                            <Select
                                value={formData.status}
                                onValueChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        status: value as any,
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Aktif">Aktif</SelectItem>
                                    <SelectItem value="Tidak Aktif">
                                        Tidak Aktif
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div> */}

                        {/* Image Upload */}
                        <div className="md:col-span-2">
                            <Label>Gambar Produk</Label>
                            <Input
                                type="file"
                                onChange={(e) =>
                                    setImageFile(
                                        e.target.files
                                            ? e.target.files[0]
                                            : null,
                                    )
                                }
                            />
                            {product?.image && !imageFile && (
                                <p className="mt-2 text-sm text-slate-500">
                                    Current image:{' '}
                                    <a
                                        href={product.image}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="underline"
                                    >
                                        {product.image}
                                    </a>
                                </p>
                            )}
                        </div>

                        {/* Deskripsi */}
                        <div className="md:col-span-2">
                            <Label>Deskripsi *</Label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="flex justify-end gap-3 border-t pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                        >
                            Batal
                        </Button>
                        <Button type="submit">
                            {product ? 'Simpan Perubahan' : 'Tambah Produk'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
