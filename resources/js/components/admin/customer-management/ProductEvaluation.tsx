import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Star, TrendingDown, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

// const productsData = [
//     {
//         id: 'PRD001',
//         name: 'Nasi Goreng Spesial',
//         category: 'Makanan',
//         totalReviews: 345,
//         avgRating: 4.8,
//         rating5: 280,
//         rating4: 45,
//         rating3: 15,
//         rating2: 3,
//         rating1: 2,
//         totalSold: 1250,
//         trend: 'up',
//     },
//     {
//         id: 'PRD002',
//         name: 'Es Teh Manis',
//         category: 'Minuman',
//         totalReviews: 520,
//         avgRating: 4.5,
//         rating5: 350,
//         rating4: 120,
//         rating3: 35,
//         rating2: 10,
//         rating1: 5,
//         totalSold: 2100,
//         trend: 'up',
//     },
//     {
//         id: 'PRD003',
//         name: 'Ayam Geprek',
//         category: 'Makanan',
//         totalReviews: 412,
//         avgRating: 4.7,
//         rating5: 320,
//         rating4: 68,
//         rating3: 18,
//         rating2: 4,
//         rating1: 2,
//         totalSold: 980,
//         trend: 'up',
//     },
//     {
//         id: 'PRD004',
//         name: 'Kopi Latte Premium',
//         category: 'Minuman',
//         totalReviews: 289,
//         avgRating: 4.6,
//         rating5: 210,
//         rating4: 58,
//         rating3: 15,
//         rating2: 4,
//         rating1: 2,
//         totalSold: 750,
//         trend: 'up',
//     },
//     {
//         id: 'PRD005',
//         name: 'Mie Goreng',
//         category: 'Makanan',
//         totalReviews: 198,
//         avgRating: 4.2,
//         rating5: 110,
//         rating4: 55,
//         rating3: 25,
//         rating2: 6,
//         rating1: 2,
//         totalSold: 560,
//         trend: 'down',
//     },
//     {
//         id: 'PRD006',
//         name: 'Jus Alpukat',
//         category: 'Minuman',
//         totalReviews: 167,
//         avgRating: 4.4,
//         rating5: 105,
//         rating4: 42,
//         rating3: 15,
//         rating2: 3,
//         rating1: 2,
//         totalSold: 420,
//         trend: 'up',
//     },
//     {
//         id: 'PRD007',
//         name: 'Sate Ayam',
//         category: 'Makanan',
//         totalReviews: 234,
//         avgRating: 4.3,
//         rating5: 145,
//         rating4: 62,
//         rating3: 20,
//         rating2: 5,
//         rating1: 2,
//         totalSold: 680,
//         trend: 'down',
//     },
//     {
//         id: 'PRD008',
//         name: 'Es Jeruk',
//         category: 'Minuman',
//         totalReviews: 389,
//         avgRating: 4.6,
//         rating5: 280,
//         rating4: 82,
//         rating3: 20,
//         rating2: 5,
//         rating1: 2,
//         totalSold: 1150,
//         trend: 'up',
//     },
// ];

// const ratingDistribution = [
//     { rating: '5 Bintang', count: 1800, color: '#10b981' },
//     { rating: '4 Bintang', count: 532, color: '#3b82f6' },
//     { rating: '3 Bintang', count: 163, color: '#f59e0b' },
//     { rating: '2 Bintang', count: 40, color: '#f97316' },
//     { rating: '1 Bintang', count: 19, color: '#ef4444' },
// ];
interface ProductData {
    id: string;
    name: string;
    category: string;
    totalReviews: number;
    avgRating: number;
    rating5: number;
    rating4: number;
    rating3: number;
    rating2: number;
    rating1: number;
    totalSold: number;
    trend: string;
}

interface RatingDistribution {
    rating: string;
    count: number;
    color: string;
    [key: string]: any;
}

interface ProductEvaluationProps {
    data: {
        productsData: ProductData[];
        ratingDistribution: RatingDistribution[];
    };
}

export function ProductEvaluation({
    data: { productsData, ratingDistribution },
}: ProductEvaluationProps) {
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState('rating');

    const filteredProducts = productsData
        .filter(
            (product) =>
                categoryFilter === 'all' || product.category === categoryFilter,
        )
        .sort((a, b) => {
            if (sortBy === 'rating') return b.avgRating - a.avgRating;
            if (sortBy === 'reviews') return b.totalReviews - a.totalReviews;
            if (sortBy === 'sold') return b.totalSold - a.totalSold;
            return 0;
        });

    const totalReviews = productsData.reduce(
        (sum, p) => sum + p.totalReviews,
        0,
    );
    const avgRatingAll = (
        productsData.reduce((sum, p) => sum + p.avgRating * p.totalReviews, 0) /
        totalReviews
    ).toFixed(1);

    const getRatingColor = (rating: number) => {
        if (rating >= 4.5) return 'text-green-600';
        if (rating >= 4.0) return 'text-blue-600';
        if (rating >= 3.5) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="mb-1 text-slate-600">
                                    Total Review
                                </p>
                                <h2>{totalReviews.toLocaleString('id-ID')}</h2>
                            </div>
                            <div className="rounded-lg bg-blue-100 p-3">
                                <Star className="size-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="mb-1 text-slate-600">
                                    Rating Rata-rata
                                </p>
                                <h2 className="flex items-center gap-1">
                                    <span>{avgRatingAll}</span>{' '}
                                    <Star
                                        fill="#FFC83D"
                                        stroke=""
                                        className="inline h-4.5 w-4.5"
                                    />
                                </h2>
                            </div>
                            <div className="rounded-lg bg-green-100 p-3">
                                <TrendingUp className="size-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="mb-1 text-slate-600">
                                    Produk Terevaluasi
                                </p>
                                <h2>{productsData.length}</h2>
                            </div>
                            <div className="rounded-lg bg-orange-100 p-3">
                                <Star className="size-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Distribusi Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={ratingDistribution}
                                layout="vertical"
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis
                                    dataKey="rating"
                                    type="category"
                                    width={100}
                                />
                                <Tooltip />
                                <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                                    {ratingDistribution.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Persentase Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={ratingDistribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ payload, percent }) =>
                                        `${payload.rating}: ${(percent ? percent * 100 : 0).toFixed(0)}%`
                                    }
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="count"
                                >
                                    {ratingDistribution.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Product Evaluation Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>
                            Evaluasi Produk Berdasarkan Rating
                        </CardTitle>
                        <div className="flex gap-2">
                            <Select
                                value={categoryFilter}
                                onValueChange={setCategoryFilter}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Kategori" />
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
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Urutkan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="rating">
                                        Rating Tertinggi
                                    </SelectItem>
                                    <SelectItem value="reviews">
                                        Terbanyak Review
                                    </SelectItem>
                                    <SelectItem value="sold">
                                        Terlaris
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID Produk</TableHead>
                                    <TableHead>Nama Produk</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Total Review</TableHead>
                                    <TableHead>Rating</TableHead>
                                    <TableHead>5★</TableHead>
                                    <TableHead>4★</TableHead>
                                    <TableHead>3★</TableHead>
                                    <TableHead>2★</TableHead>
                                    <TableHead>1★</TableHead>
                                    <TableHead>Terjual</TableHead>
                                    <TableHead>Trend</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {product.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {product.totalReviews}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={getRatingColor(
                                                        product.avgRating,
                                                    )}
                                                >
                                                    {product.avgRating}
                                                </span>
                                                <span>
                                                    <Star
                                                        fill="#FFC83D"
                                                        stroke=""
                                                        className="inline h-4.5 w-4.5"
                                                    />
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{product.rating5}</TableCell>
                                        <TableCell>{product.rating4}</TableCell>
                                        <TableCell>{product.rating3}</TableCell>
                                        <TableCell>{product.rating2}</TableCell>
                                        <TableCell>{product.rating1}</TableCell>
                                        <TableCell>
                                            {product.totalSold}
                                        </TableCell>
                                        <TableCell>
                                            {product.trend === 'up' ? (
                                                <TrendingUp className="size-5 text-green-600" />
                                            ) : (
                                                <TrendingDown className="size-5 text-red-600" />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Top & Bottom Performers */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-600">
                            <TrendingUp className="size-5" />
                            Produk Rating Tertinggi
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {filteredProducts
                                .slice(0, 5)
                                .map((product, index) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between rounded-lg bg-green-50 p-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p>{product.name}</p>
                                                <p className="text-slate-600">
                                                    {product.totalReviews}{' '}
                                                    review
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-green-600">
                                                {product.avgRating}{' '}
                                                <Star
                                                    fill="#FFC83D"
                                                    stroke=""
                                                    className="inline h-4.5 w-4.5"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-600">
                            <Star className="size-5" />
                            Produk Perlu Perbaikan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {filteredProducts
                                .slice()
                                .reverse()
                                .slice(0, 5)
                                .map((product, index) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between rounded-lg bg-orange-50 p-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <p>{product.name}</p>
                                                <p className="text-slate-600">
                                                    {product.totalReviews}{' '}
                                                    review
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-orange-600">
                                                {product.avgRating}{' '}
                                                <Star
                                                    fill="#FFC83D"
                                                    stroke=""
                                                    className="inline h-4.5 w-4.5"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
