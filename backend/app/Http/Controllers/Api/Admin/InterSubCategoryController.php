<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\InnerSubCategory;
use Illuminate\Http\Request;

class InterSubCategoryController extends Controller
{
    public function index(){
        try {
            $inner_sub_categories = InnerSubCategory::all();
            return response()->json(['status'=>true ,'message'=>'inner sub categories data get successfully','data' => $inner_sub_categories],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }
    public function store(Request $request){
        try {
            $inner_sub_categories = new InnerSubCategory;
            $inner_sub_categories->title = $request->title;
            $inner_sub_categories->sub_categorise_id = $request->sub_categorise_id;
            $inner_sub_categories->categories_id = $request->categories_id;
            $inner_sub_categories->save();
            return response()->json(['status'=>true ,'message'=>'inner sub categories stored successfully','data' => $inner_sub_categories],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request , $id){
        try {
            $inner_sub_categories = InnerSubCategory::find($id);
            $inner_sub_categories->title = $request->title;
            $inner_sub_categories->sub_categorise_id = $request->sub_categorise_id;
            $inner_sub_categories->categories_id = $request->categories_id;
            $inner_sub_categories->save();
            return response()->json(['status'=>true ,'message'=>'inner sub categories stored successfully','data' => $inner_sub_categories],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function getOne($id){
        try {
            $inner_sub_categories = InnerSubCategory::find($id);
            return response()->json(['status'=>true ,'message'=>'inner sub categories data get successfully','data' => $inner_sub_categories],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }
}
