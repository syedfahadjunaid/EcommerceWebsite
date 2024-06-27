<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Product;
class CommonController extends Controller
{
    public function getSubcategory(String $id)
    {
        try {
            $subCategory = subCategory::where('category_id',$id)->get();
            return response()->json([
                'status'=>true,
                'list'=>$subCategory
            ]);
            } catch (\Exception $e) {
                \Log::error($e->getMessage());
                return response()->json([
                    'message'=>'Something goes wrong while deleting!!'
                ]);
            }
    }
}
