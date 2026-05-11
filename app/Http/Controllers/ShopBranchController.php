<?php

namespace App\Http\Controllers;

use App\Models\ShopBranch;
use Illuminate\Http\Request;

class ShopBranchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $shopBranches = ShopBranch::all();
        return response()->json($shopBranches);
    }
}
