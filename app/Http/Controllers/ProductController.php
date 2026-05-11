<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use App\Models\ShopbranchProduct;
use App\Models\ShopBranch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Log::info('Store method called');

        $errors = [];

        // Validasi Name
        if (!$request->has('name') || !is_string($request->name) || strlen($request->name) > 255) {
            $errors['name'][] = 'Name wajib diisi dan maksimal 255 karakter.';
        }

        // Validasi Category
        if (!$request->has('category') || !is_string($request->category) || strlen($request->category) > 255) {
            $errors['category'][] = 'Category wajib diisi dan maksimal 255 karakter.';
        }

        // --- TAMBAHAN VALIDASI BRANCH ---
        if (!$request->has('branch') || !is_string($request->branch) || strlen($request->branch) > 255) {
            $errors['branch'][] = 'Cabang harus dipilih';
        }
        // --------------------------------

        // Validasi Price Origin
        if (!$request->has('price_origin') || !is_numeric($request->price_origin)) {
            $errors['price_origin'][] = 'Price origin wajib berupa angka.';
        }

        // Validasi Price Discount
        if ($request->filled('price_discount') && !is_numeric($request->price_discount)) {
            $errors['price_discount'][] = 'Price discount harus berupa angka.';
        }

        // Validasi Quantity
        if (!$request->has('quantity') || !filter_var($request->quantity, FILTER_VALIDATE_INT)) {
            $errors['quantity'][] = 'Quantity wajib berupa bilangan bulat.';
        }

        // Validasi Description
        if (!$request->has('description') || !is_string($request->description)) {
            $errors['description'][] = 'Description wajib diisi.';
        }

        // Validasi Image
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $allowedMime = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/svg+xml'];
            if (!in_array($image->getMimeType(), $allowedMime)) {
                $errors['image'][] = 'Format image tidak valid.';
            }

            if ($image->getSize() > 2048 * 1024) {
                $errors['image'][] = 'Ukuran image maksimal 2MB.';
            }
        }

        // Return Error jika ada validasi dasar yang gagal
        if (!empty($errors)) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $errors
            ], 422);
        }
        
        Log::info('Validation passed');

        // --- LOGIKA MENCARI SHOP BRANCH ID ---
        // Mencari data cabang berdasarkan nama yang dikirim (misal: 'surabaya')
        $branchData = ShopBranch::where('name', $request->branch)->first();

        // Validasi tambahan: Jika cabang tidak ditemukan di database
        if (!$branchData) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => ['branch' => ['Data cabang tidak ditemukan di database.']]
            ], 422);
        }

        // Mengisi variabel dengan ID dari database (misal: 2)
        $shop_branch_id = $branchData->id;
        // -------------------------------------

        // Simpan Data Produk
        $product = new Product($request->except('image'));
        
        if ($request->hasFile('image')) {
            $path = $request->file(key: 'image')->store('images', 'public');
            $product->image = '/api/images/products/' . basename($path);
        }

        $product->save();

        // Simpan Relasi ke Tabel Pivot (shopbranch_product)
        ShopbranchProduct::create([
            'shop_branch_id' => $shop_branch_id,
            'product_id' => $product->id,
        ]);

        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        Log::info('Update method called');
        $errors = [];

        /**
         * helper: cek sometimes|required|string|max
         */
        function validateString($request, $field, $max, &$errors)
        {
            if ($request->has($field)) {
                if (empty($request->$field) || !is_string($request->$field)) {
                    $errors[$field][] = ucfirst($field).' wajib diisi dan berupa string.';
                } elseif (strlen($request->$field) > $max) {
                    $errors[$field][] = ucfirst($field)." maksimal {$max} karakter.";
                }
            }
        }

        /**
         * helper: cek sometimes|required|numeric
         */
        function validateNumeric($request, $field, &$errors)
        {
            if ($request->has($field)) {
                if ($request->$field === null || !is_numeric($request->$field)) {
                    $errors[$field][] = ucfirst($field).' wajib berupa angka.';
                }
            }
        }

        /**
         * helper: cek sometimes|required|integer
         */
        function validateInteger($request, $field, &$errors)
        {
            if ($request->has($field)) {
                if ($request->$field === null || !filter_var($request->$field, FILTER_VALIDATE_INT)) {
                    $errors[$field][] = ucfirst($field).' wajib berupa bilangan bulat.';
                }
            }
        }

        /* ===== VALIDATION ===== */

        validateString($request, 'name', 255, $errors);
        validateString($request, 'category', 255, $errors);

        // --- TAMBAHAN VALIDASI BRANCH (Required|String|Max:255) ---
        // Kita tidak menggunakan helper validateString karena helper tersebut mengecek 'has',
        // sedangkan request Anda meminta 'required' (wajib ada di payload update).
        if (!$request->has('branch') || !is_string($request->branch) || strlen($request->branch) > 255) {
            $errors['branch'][] = 'Cabang harus dipilih.';
        }
        // -----------------------------------------------------------

        validateNumeric($request, 'price_origin', $errors);
        validateInteger($request, 'quantity', $errors);
        validateString($request, 'description', 10000, $errors);

        /* nullable|numeric */
        if ($request->filled('price_discount') && !is_numeric($request->price_discount)) {
            $errors['price_discount'][] = 'Price discount harus berupa angka.';
        }

        /* nullable|image|mimes|max */
        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $allowedMime = [
                'image/jpeg',
                'image/png',
                'image/jpg',
                'image/gif',
                'image/svg+xml'
            ];

            if (!in_array($image->getMimeType(), $allowedMime)) {
                $errors['image'][] = 'Format image tidak valid.';
            }

            if ($image->getSize() > 2048 * 1024) {
                $errors['image'][] = 'Ukuran image maksimal 2MB.';
            }
        }

        /* ===== RESPONSE ===== */

        if (!empty($errors)) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $errors
            ], 422);
        }
        Log::info('Validation passed');

        try {
            $branch = ShopBranch::where('name', $request->branch)->first();
            $branch_id = $branch ? $branch->id : null;

            if ($branch_id) {
                ShopbranchProduct::where('product_id', $product->id)->delete();

                ShopbranchProduct::create([
                    'product_id' => $product->id,
                    'shop_branch_id' => $branch->id,
                ]);
                Log::info('Branch relation updated', ['product_id' => $product->id, 'branch_id' => $branch->id]);
            }
        } catch (\Exception $e) {
            Log::error('Error updating shop branch relation: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error updating shop branch relation',
                'error' => $e->getMessage()
            ]);
        }

        $product->fill($request->except('image'));

        if ($request->hasFile('image')) {
            Log::info('Image file exists');
            if ($product->image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $product->image));
            }
            $path = $request->file('image')->store('images', 'public');
            $product->image = '/api/images/products/' . basename($path);
        }

        $product->save();
        Log::info('Product saved');

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $product->image));
        }
        $deleted = $product->delete();
        return response()->json([
            'deleted' => $deleted
        ]);
    }

    public function addReview(Request $request) {
        return Review::create([
            'user_id' => $request->user_id,
            'product_id' => $request->product_id,
            'rating' => $request->rating,
            'description' => $request->description,
        ]);
    }

    public function getImage($filename) {
        $path = storage_path('app/public/images/' . $filename);

        if (!file_exists($path)) {
            abort(404);
        }

        return response()->file($path);
    }
}
