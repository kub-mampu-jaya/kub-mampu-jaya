<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function index() {
        $now = Carbon::now();
        $lastMonth = $now->copy()->subMonth();

        // Total Revenue
        $totalRevenue = Order::whereNotNull('confirmed_at')->sum('subtotal');
        $lastMonthRevenue = Order::whereNotNull('confirmed_at')->whereMonth('confirmed_at', $lastMonth->month)->sum('subtotal');
        $currentMonthRevenue = Order::whereNotNull('confirmed_at')->whereMonth('confirmed_at', $now->month)->sum('subtotal');
        $revenueChange = $lastMonthRevenue > 0 ? (($currentMonthRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100 : 0;

        // New Users
        $newUsers = User::whereMonth('created_at', $now->month)->count();
        $lastMonthNewUsers = User::whereMonth('created_at', $lastMonth->month)->count();
        $newUserChange = $lastMonthNewUsers > 0 ? (($newUsers - $lastMonthNewUsers) / $lastMonthNewUsers) * 100 : 0;

        // Sales
        $sales = Order::whereMonth('confirmed_at', $now->month)->count();
        $lastMonthSales = Order::whereMonth('confirmed_at', $lastMonth->month)->count();
        $salesChange = $lastMonthSales > 0 ? (($sales - $lastMonthSales) / $lastMonthSales) * 100 : 0;

        // Active Now
        $activeNow = Order::where('created_at', '>=', $now->copy()->subMinutes(30))->distinct('user_id')->count();
        $lastHourActive = Order::where('created_at', '>=', $now->copy()->subHour())->distinct('user_id')->count();
        $activeNowChange = $lastHourActive > 0 ? (($activeNow - $lastHourActive) / $lastHourActive) * 100 : 0;

        $statsData = [
            [
                'title' => 'Total Revenue',
                'value' => 'Rp ' . number_format($totalRevenue, 0, ',', '.'),
                'change' => sprintf('%+.2f%% from last month', $revenueChange),
            ],
            [
                'title' => 'New Users',
                'value' => '+' . $newUsers,
                'change' => sprintf('%+.2f%% from last month', $newUserChange),
            ],
            [
                'title' => 'Sales',
                'value' => '+' . $sales,
                'change' => sprintf('%+.2f%% from last month', $salesChange),
            ],
            [
                'title' => 'Active Now',
                'value' => $activeNow,
                'change' => sprintf('%+.2f%% from last hour', $activeNowChange),
            ],
        ];

        $overviewData = Order::select(
                DB::raw('MONTH(confirmed_at) as month'),
                DB::raw('SUM(subtotal) as total')
            )
            ->whereYear('confirmed_at', $now->year)
            ->groupBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => Carbon::create()->month((int) $item->month)->format('M'),
                    'total' => $item->total,
                ];
            })->toArray();

        $currentMonthSales = $sales;

        $recentSales = Order::with('user')
            ->whereNotNull('confirmed_at')
            ->latest('confirmed_at')
            ->take(5)
            ->get()
            ->map(function ($order) {
                return [
                    'name' => $order->user->name,
                    'email' => $order->user->email,
                    'value' => 'Rp ' . number_format($order->subtotal, 0, ',', '.'),
                ];
            });

        $trafficOverview = [
            [
                'name' => 'Mon',
                'clicks' => rand(100, 999),
                'uniques' => rand(80, 779),
            ],
            [
                'name' => 'Tue',
                'clicks' => rand(100, 999),
                'uniques' => rand(80, 779),
            ],
            [
                'name' => 'Wed',
                'clicks' => rand(100, 999),
                'uniques' => rand(80, 779),
            ],
            [
                'name' => 'Thu',
                'clicks' => rand(100, 999),
                'uniques' => rand(80, 779),
            ],
            [
                'name' => 'Fri',
                'clicks' => rand(100, 999),
                'uniques' => rand(80, 779),
            ],
            [
                'name' => 'Sat',
                'clicks' => rand(100, 999),
                'uniques' => rand(80, 779),
            ],
            [
                'name' => 'Sun',
                'clicks' => rand(100, 999),
                'uniques' => rand(80, 779),
            ],
        ];

        $trafficStats = [
            [
                'title' => 'Jumlah Klik',
                'value' => '345',
                'change' => sprintf('%+.2f%% vs minggu sebelumnya', '+10%'),
            ],
            [
                'title' => 'Pelanggan Unik',
                'value' => '39',
                'change' => sprintf('%+.2f%% vs minggu sebelumnya', '7%'),
            ],
            [
                'title' => 'Tingkat Bounce',
                'value' => '42%',
                'change' => '+10% vs minggu sebelumnya',
            ],
            [
                'title' => 'Rerata Sesi',
                'value' => '3m 43s',
                'change' => '+10% vs minggu sebelumnya',
            ],
        ];

        $trafficSources = [
            ['name' => 'Direct', 'value' => 513],
            ['name' => 'Product Hunt', 'value' => 238],
            ['name' => 'Twitter', 'value' => 174],
            ['name' => 'Blog', 'value' => 104],
        ];

        $devices = [
            ['name' => 'Desktop', 'value' => 74],
            ['name' => 'Mobile', 'value' => 22],
            ['name' => 'Tablet', 'value' => 4],
        ];


        $props = [
            'statsData' => $statsData,
            'overviewData' => $overviewData,
            'currentMonthSales' => $currentMonthSales,
            'recentSales' => $recentSales,
            'trafficOverview' => $trafficOverview,
            'trafficStats' => $trafficStats,
            'trafficSources' => $trafficSources,
            'devices' => $devices,
        ];

        return Inertia::render('admin/index', $props);
    }

    public function customerManagement() {
        // --- 1. Fetch Basic Data ---
        $customers = User::where('role', 'user')
            ->with(['orders', 'reviews'])
            ->get();

        $products = Product::with(['orderDetails', 'reviews'])->get();
        $allOrders = Order::all();
        $currentMonth = Carbon::now()->month;

        // --- 2. Calculate Stats Data ---
        $now = Carbon::now();
        $currentMonthStart = $now->copy()->startOfMonth();
        $previousMonthStart = $now->copy()->subMonth()->startOfMonth();
        $previousMonthEnd = $previousMonthStart->copy()->endOfMonth();

        // Helper functions
        $calculateGrowth = function ($current, $previous) {
            if ($previous == 0) {
                return $current > 0 ? 100.0 : 0.0;
            }
            return (($current - $previous) / $previous) * 100;
        };
        $formatGrowth = function ($growth) {
            $formatted = number_format($growth, 1);
            return ($growth >= 0 ? '+' : '') . $formatted . '%';
        };

        // --- Total Pelanggan Growth (New customers this month vs last month) ---
        $newCustomersThisMonth = User::where('created_at', '>=', $currentMonthStart)->count();
        $newCustomersLastMonth = User::whereBetween('created_at', [$previousMonthStart, $previousMonthEnd])->count();
        $totalPelangganGrowth = $calculateGrowth($newCustomersThisMonth, $newCustomersLastMonth);

        // --- Pesanan Bulan Ini Growth ---
        $ordersThisMonth = Order::where('confirmed_at', '>=', $currentMonthStart)->count();
        $ordersLastMonth = Order::whereBetween('confirmed_at', [$previousMonthStart, $previousMonthEnd])->count();
        $pesananGrowth = $calculateGrowth($ordersThisMonth, $ordersLastMonth);

        // --- Pelanggan Aktif Growth (Active this month vs last month) ---
        $activeCustomersThisMonth = Order::where('confirmed_at', '>=', $currentMonthStart)->distinct('user_id')->count('user_id');
        $activeCustomersLastMonth = Order::whereBetween('confirmed_at', [$previousMonthStart, $previousMonthEnd])->distinct('user_id')->count('user_id');
        $activePelangganGrowth = $calculateGrowth($activeCustomersThisMonth, $activeCustomersLastMonth);

        // --- Rata-rata Transaksi Growth ---
        $avgTransactionThisMonth = Order::where('confirmed_at', '>=', $currentMonthStart)->avg('subtotal') ?? 0;
        $avgTransactionLastMonth = Order::whereBetween('confirmed_at', [$previousMonthStart, $previousMonthEnd])->avg('subtotal') ?? 0;
        $avgTransaksiGrowth = $calculateGrowth($avgTransactionThisMonth, $avgTransactionLastMonth);

        $statsData = [
            [
                'title' => 'Total Pelanggan',
                'value' => (string) User::count(),
                'change' => $formatGrowth($totalPelangganGrowth),
            ],
            [
                'title' => 'Pesanan Bulan Ini',
                'value' => (string) $ordersThisMonth,
                'change' => $formatGrowth($pesananGrowth),
            ],
            [
                'title' => 'Pelanggan Aktif (Bulan Ini)',
                'value' => (string) $activeCustomersThisMonth,
                'change' => $formatGrowth($activePelangganGrowth),
            ],
            [
                'title' => 'Rata-rata Transaksi (Bulan Ini)',
                'value' => 'Rp ' . number_format(($avgTransactionThisMonth ?? 0) / 1000, 0) . 'K',
                'change' => $formatGrowth($avgTransaksiGrowth),
            ],
        ];

        // --- 3. Process Customers Data List ---
        $customersData = $customers->map(function ($user) {
            $totalSpent = $user->orders->sum('subtotal');
            $totalOrders = $user->orders->count();
            $lastOrderDate = $user->orders->max('created_at');

            $status = 'Baru';
            if ($totalOrders > 5) $status = 'Setia';
            elseif ($totalOrders > 0) $status = 'Aktif';
            if ($lastOrderDate && Carbon::parse($lastOrderDate)->diffInMonths(now()) > 12) $status = 'Tidak Aktif';

            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone_number ?? '-',
                'area' => $user->city ?? 'Unknown',
                'totalOrders' => $totalOrders,
                'totalSpent' => (float) $totalSpent,
                'lastOrder' => $lastOrderDate ? Carbon::parse($lastOrderDate)->format('Y-m-d') : '-',
                'status' => $status,
                'avgRating' => round($user->reviews->avg('rating'), 1) ?? 0,
            ];
        })->values();

        // --- 4. Customer Segmentation ---
        $segmentationCounts = $customersData->groupBy('status')->map->count();
        $customerSegmentation = [
            [ 'name' => 'Pelanggan Setia', 'value' => $segmentationCounts['Setia'] ?? 0, 'color' => '#10b981' ],
            [ 'name' => 'Pelanggan Aktif', 'value' => $segmentationCounts['Aktif'] ?? 0, 'color' => '#3b82f6' ],
            [ 'name' => 'Pelanggan Baru', 'value' => $segmentationCounts['Baru'] ?? 0, 'color' => '#f59e0b' ],
            [ 'name' => 'Tidak Aktif', 'value' => $segmentationCounts['Tidak Aktif'] ?? 0, 'color' => '#ef4444' ],
        ];

        // --- 5. Monthly Customers ---
        $monthlyStats = Order::select(
            DB::raw('DATE_FORMAT(confirmed_at, "%b") as month'),
            DB::raw('COUNT(DISTINCT user_id) as pelanggan'),
            DB::raw('COUNT(id) as pesanan')
        )
        ->whereYear('confirmed_at', Carbon::now()->year)
        ->groupBy('month')
        ->orderBy(DB::raw('MIN(confirmed_at)'), 'asc')
        ->get();

        $monthlyCustomers = $monthlyStats->isEmpty() ? [] : $monthlyStats->toArray();

        // --- 6. Products Data ---
        $productsData = $products->map(function ($product) {
            $reviews = $product->reviews;
            $totalSold = $product->orderDetails->sum('quantity');
            return [
                'id' => 'PRD' . str_pad($product->id, 3, '0', STR_PAD_LEFT),
                'name' => $product->name,
                'category' => $product->category,
                'totalReviews' => $reviews->count(),
                'avgRating' => round($reviews->avg('rating'), 1) ?? 0,
                'rating5' => $reviews->where('rating', 5)->count(),
                'rating4' => $reviews->where('rating', 4)->count(),
                'rating3' => $reviews->where('rating', 3)->count(),
                'rating2' => $reviews->where('rating', 2)->count(),
                'rating1' => $reviews->where('rating', 1)->count(),
                'totalSold' => $totalSold,
                'trend' => $totalSold > 50 ? 'up' : 'down', // Simple trend logic
            ];
        })->values();

        // --- 7. Rating Distribution ---
        $allReviews = Review::all();
        $ratingDistribution = [
            [ 'rating' => '5 Bintang', 'count' => $allReviews->where('rating', 5)->count(), 'color' => '#10b981' ],
            [ 'rating' => '4 Bintang', 'count' => $allReviews->where('rating', 4)->count(), 'color' => '#3b82f6' ],
            [ 'rating' => '3 Bintang', 'count' => $allReviews->where('rating', 3)->count(), 'color' => '#f59e0b' ],
            [ 'rating' => '2 Bintang', 'count' => $allReviews->where('rating', 2)->count(), 'color' => '#f97316' ],
            [ 'rating' => '1 Bintang', 'count' => $allReviews->where('rating', 1)->count(), 'color' => '#ef4444' ],
        ];

        // --- 8. Area Data ---
        $areaData = $customersData->where('area', '!=', 'Unknown')->groupBy('area')->map(function ($group, $areaName) {
            return [
                'area' => $areaName,
                'totalCustomers' => $group->count(),
                'totalOrders' => $group->sum('totalOrders'),
                'totalRevenue' => $group->sum('totalSpent'),
                'avgOrderValue' => $group->sum('totalSpent') / ($group->sum('totalOrders') ?: 1),
                'topProduct' => '-', // Needs complex query
                'growth' => rand(5, 15), // Placeholder
            ];
        })->values();

        // --- 9. Monthly Area Data (Dynamic) ---
        // Define city abbreviations for cleaner column names
        $cityAbbreviations = [
            'Jakarta Selatan' => 'jaksel',
            'Jakarta Pusat' => 'jakpus',
            'Jakarta Barat' => 'jakbar',
            'Jakarta Timur' => 'jaktim',
            'Bandung' => 'bandung',
            'Surabaya' => 'surabaya',
            'Yogyakarta' => 'yogya',
            'Semarang' => 'semarang',
        ];

        // Get top 4 cities by revenue in the last 6 months
        $topCities = DB::table('orders')
            ->join('users', 'orders.user_id', '=', 'users.id')
            ->select('users.city')
            ->whereNotNull('users.city')
            ->where('orders.confirmed_at', '>=', Carbon::now()->subMonths(6))
            ->groupBy('users.city')
            ->orderByRaw('SUM(orders.subtotal) DESC')
            ->limit(4)
            ->pluck('city')
            ->toArray();

        // Build the dynamic select expressions for the pivot table
        $selects = [
            DB::raw('DATE_FORMAT(orders.confirmed_at, "%b") as month'),
            DB::raw('MIN(orders.confirmed_at) as month_order_key') // For sorting
        ];

        // return response()->json($topCities);

        foreach ($topCities as $city) {
            // Use predefined abbreviation or generate one
            $alias = $cityAbbreviations[$city] ?? strtolower(substr(str_replace(' ', '', $city), 0, 6));

            // The value is divided by 1,000,000 to match the scale of the original static data (e.g., 3.2 for 3,200,000)
            $selects[] = DB::raw("SUM(CASE WHEN users.city = '{$city}' THEN orders.subtotal / 1000000 ELSE 0 END) as {$alias}");
        }

        // Execute the final query if there are cities to report on
        if (!empty($topCities)) {
            $monthlyAreaData = DB::table('orders')
                ->join('users', 'orders.user_id', '=', 'users.id')
                ->select($selects)
                ->whereIn('users.city', $topCities)
                ->where('orders.confirmed_at', '>=', Carbon::now()->subMonths(6))
                ->groupBy('month')
                ->orderBy('month_order_key')
                ->get()
                ->map(function($row) {
                    unset($row->month_order_key); // Clean up the sorting key
                    // Round the values to 2 decimal places
                    foreach ($row as $key => $value) {
                        if ($key !== 'month') {
                            $row->$key = round($value, 2);
                        }
                    }
                    return (array)$row;
                })
                ->toArray();
                // return response()->json($monthlyAreaData);
        } else {
            // Provide an empty array or a default structure if no data
            $monthlyAreaData = [];
        }

        // --- 10. Recent Activities (Dynamic) ---
        $recentOrders = Order::with(['user', 'orderDetails.product'])
            ->whereNotNull('confirmed_at')
            ->latest('confirmed_at')
            ->take(5)
            ->get();

        $recentReviews = Review::with(['user', 'product'])
            ->latest()
            ->take(5)
            ->get();

        $activities = collect();

        foreach ($recentOrders as $order) {
            if (!$order->user) continue; // Skip if no user is associated

            $firstDetail = $order->orderDetails->first();
            $itemDescription = 'N/A';
            if ($firstDetail && $firstDetail->product) {
                $itemDescription = $firstDetail->product->name;
                if ($order->orderDetails->count() > 1) {
                    $itemDescription .= ' & lainnya';
                }
            }

            $activities->push([
                'name'   => $order->user->name,
                'action' => 'Melakukan pemesanan',
                'item'   => $itemDescription,
                'time'   => $order->confirmed_at->diffForHumans(),
                'amount' => $order->total,
                'timestamp' => $order->confirmed_at,
            ]);
        }

        foreach ($recentReviews as $review) {
            if (!$review->user || !$review->product) continue; // Skip if no user or product

            $activities->push([
                'name'   => $review->user->name,
                'action' => "Memberikan rating {$review->rating}★",
                'item'   => $review->product->name,
                'time'   => $review->created_at->diffForHumans(),
                'amount' => 0,
                'timestamp' => $review->created_at,
            ]);
        }

        // Sort by timestamp descending and take the top 5
        $recentActivities = $activities->sortByDesc('timestamp')->take(5)->map(function ($activity) {
            unset($activity['timestamp']); // Remove timestamp before sending to frontend
            return $activity;
        })->values()->toArray();

        $props = [
            'monthlyCustomers' => $monthlyCustomers,
            'customerSegmentation' => $customerSegmentation,
            'statsData' => $statsData,
            'customersData' => $customersData,
            'productsData' => $productsData,
            'ratingDistribution' => $ratingDistribution,
            'areaData' => $areaData,
            'monthlyAreaData' => $monthlyAreaData,
            'recentActivities' => $recentActivities,
        ];

        return Inertia::render('admin/customer-management', $props);
    }

    public function cashflowManagement() {
        $allOrders = Order::all();
        $totalRevenue = $allOrders->sum('subtotal');
        $totalOrders = $allOrders->count();
        $avgOrder = $totalOrders > 0 ? $totalRevenue / $totalOrders : 0;

        // --- Growth Calculation (Month-over-Month) ---
        $now = Carbon::now();

        // Current period (this month to date)
        $currentPeriodStart = $now->copy()->startOfMonth();
        $currentPeriodOrders = Order::where('confirmed_at', '>=', $currentPeriodStart)->get();
        $currentRevenue = $currentPeriodOrders->sum('subtotal');
        $currentOrdersCount = $currentPeriodOrders->count();
        $currentAverageOrder = $currentOrdersCount > 0 ? $currentRevenue / $currentOrdersCount : 0;

        // Previous period (full previous month)
        $previousPeriodStart = $now->copy()->subMonth()->startOfMonth();
        $previousPeriodEnd = $now->copy()->subMonth()->endOfMonth();
        $previousPeriodOrders = Order::whereBetween('confirmed_at', [$previousPeriodStart, $previousPeriodEnd])->get();
        $previousRevenue = $previousPeriodOrders->sum('subtotal');
        $previousOrdersCount = $previousPeriodOrders->count();
        $previousAverageOrder = $previousOrdersCount > 0 ? $previousRevenue / $previousOrdersCount : 0;

        // Helper function for growth percentage
        $calculateGrowth = function ($current, $previous) {
            if ($previous == 0) {
                return $current > 0 ? 100.0 : 0.0;
            }
            return (($current - $previous) / $previous) * 100;
        };

        $revenueGrowth = $calculateGrowth($currentRevenue, $previousRevenue);
        $ordersGrowth = $calculateGrowth($currentOrdersCount, $previousOrdersCount);
        $averageGrowth = $calculateGrowth($currentAverageOrder, $previousAverageOrder);

        $summaryData = [
            'totalRevenue' => $totalRevenue,
            'totalOrders' => $totalOrders,
            'averageOrder' => $avgOrder,
            'growth' => $revenueGrowth, // Using revenue growth as the main 'growth' metric
            'revenueGrowth' => $revenueGrowth,
            'ordersGrowth' => $ordersGrowth,
            'averageGrowth' => $averageGrowth,
        ];

        // return response()->json($summaryData);

        $trendQuery = fn($format, $column) => Order::select(
                DB::raw("$format as name"),
                DB::raw('SUM(subtotal) as pendapatan'),
                DB::raw('COUNT(id) as pesanan')
            )
            ->where('created_at', '>=', Carbon::now()->subYear())
            ->groupBy('name', DB::raw($column))
            ->orderBy(DB::raw($column), 'asc')
            ->get();

        $trendDataPeriod = [
            'dailyTrendData' => $trendQuery('DATE_FORMAT(created_at, "%a")', 'DAYOFWEEK(created_at)'),
            'weeklyTrendData' => $trendQuery('DATE_FORMAT(created_at, "Week %v")', 'WEEK(created_at)'),
            'monthlyTrendData' => $trendQuery('DATE_FORMAT(created_at, "%b")', 'MONTH(created_at)'),
            'yearlyTrendData' => $trendQuery('YEAR(created_at)', 'YEAR(created_at)'),
        ];

        $categoryData = DB::table('order_details')
            ->join('products', 'order_details.product_id', '=', 'products.id')
            ->select(
                'products.category as name',
                DB::raw('SUM(order_details.subtotal * order_details.quantity) as pendapatan'),
                DB::raw('COUNT(DISTINCT order_details.order_id) as pesanan')
            )
            ->groupBy('products.category')
            ->get();

        // dd($categoryData);

        $transactionsData = Order::with(['user', 'shopBranch', 'orderDetails.product'])
            ->latest('confirmed_at') // Order by the main date
            ->take(50) // Limit to a reasonable number for the dashboard
            ->get()
            ->map(function($order) {
                $firstDetail = $order->orderDetails->first();
                $category = $firstDetail && $firstDetail->product ? $firstDetail->product->category : 'N/A';
                $description = 'Pesanan #' . $order->id;
                if ($firstDetail && $firstDetail->product) {
                    $description .= ' - ' . $firstDetail->product->name;
                    if ($order->orderDetails->count() > 1) {
                        $description .= ' & lainnya';
                    }
                }

                return [
                    'id' => $order->id,
                    'date' => $order->confirmed_at ? $order->confirmed_at->format('Y-m-d H:i') : null,
                    'category' => $category,
                    'description' => $description,
                    'branch' => $order->shopBranch ? $order->shopBranch->name : 'N/A',
                    'amount' => $order->total,
                    'paymentMethod' => $order->payment_method,
                    'customer' => $order->user ? $order->user->name : 'Guest',
                ];
            });

        $props = [
            'summaryData' => $summaryData,
            'trendDataPeriod' => $trendDataPeriod,
            'categoryData' => $categoryData,
            'transactions' => $transactionsData,
        ];

        return Inertia::render('admin/cashflow-management', $props);
    }
    public function productManagement() {
        // Assuming 'shopBranchProducts' is the pivot table/relation for stock and branch
        // And 'shopBranch' is the relation from pivot to the branch details
        $productsData = Product::with(['reviews', 'shopBranchProducts.shopBranch'])->get();

        $products = $productsData->map(function ($product) {
            $shopBranchProduct = $product->shopBranchProducts->first(); // Get first branch for simplicity

            return [
                'id' => $product->id,
                'name' => $product->name,
                'category' => $product->category,
                'price_origin' => $product->price_origin,
                'price_discount' => $product->price_discount ?? null,
                'quantity' => $product->quantity ?? 0,
                'branch' => $shopBranchProduct->shopBranch->name ?? 'N/A',
                'image' => $product->image,
                'description' => $product->description,
                'rating' => round($product->reviews->avg('rating'), 1) ?? 0,
                'status' => ($product->quantity > 0) ? 'Aktif' : 'Tidak Aktif',
            ];
        });

        $props = [
            'products' => $products
        ];

        // return response()->json($props);

        // return response()->json($products);

        return Inertia::render('admin/product-management', $props);
    }
}


