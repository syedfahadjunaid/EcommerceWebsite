<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupans;
use Illuminate\Http\Request;

class CoupansController extends Controller
{
    public function index(){
        try {
            $coupans = Coupans::all();
            return response()->json(['message'=>'all coupans data get successfully ', 'coupans'=>$coupans],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500); 
        }
        
    }

    public function store(Request $request){
        try {
            $coupans = new Coupans();
            $coupans->coupan_code = $request->coupan_code;
            $coupans->discount = $request->discount;
            if($request->categories_id){
                $coupans->categories_id = $request->categories_id;
            }
            if($request->sub_categories_id){
                $coupans->sub_categories_id = $request->sub_categories_id;
            }
            if($request->categories_id){
                $coupans->inner_subcategories_id = $request->inner_subcategories_id;
            }
            if($request->new_user){
                $coupans->new_user = $request->new_user;
            } 
            $coupans->start_date = $request->start_date;
            $coupans->end_date = $request->end_date;
            $coupans->status = $request->status;   
            $coupans->save(); 
            return response()->json(['message'=>'coupans created succefully', 'data'=>$coupans],200);   
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500); 
        }
    }

    public function update(Request $request , $id){
        try {
            $coupans = Coupans::find($id);
            $coupans->coupan_code = $request->coupan_code;
            $coupans->discount = $request->discount;
            if($request->categories_id){
                $coupans->categories_id = $request->categories_id;
            }
            if($request->sub_categories_id){
                $coupans->sub_categories_id = $request->sub_categories_id;
            }
            if($request->categories_id){
                $coupans->inner_subcategories_id = $request->inner_subcategories_id;
            }
            if($request->new_user){
                $coupans->new_user = $request->new_user;
            } 
            $coupans->start_date = $request->start_date;
            $coupans->end_date = $request->end_date;
            $coupans->status = $request->status;   
            $coupans->save();
            return response()->json(['message'=>'coupans created succefully', 'update'=>$coupans],200);   
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500); 
        }
    }

    public function getone($id){
        try {
            $coupans = Coupans::find($id);
            return response()->json(['message'=>'coupan get succefully', 'data'=>$coupans],200);   
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500); 
        }
    }
}
