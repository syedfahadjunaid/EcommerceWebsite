<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Coupans;
use Illuminate\Http\Request;

class CupansController extends Controller
{
    public function varification_coupana(Request $request){
        try {
            $coupans  = Coupans::where("coupan_code" ,'=',$request->coupan_code)->first();
            if($this->varify_coupans($coupans,$request->date)){
                return response()->json(['message'=>'Coupan varifed',"data"=>$coupans],200);
            }  
            return response()->json(['message'=>'Coupan code is not valid'],404);
        } catch (\Throwable $th) {
            return response()->json(["message"=>"Internal server error "],500);
        }
    }


    private function varify_coupans($coupans, $today){
        if($coupans->new_user =='newuser' && $coupans->end_date <= $today ){
            

        }else if($coupans->product_id && $coupans->end_date >= $today ){
            return true;
        }else if($coupans->categories_id && $coupans->end_date >= $today ){
            return true;
        }else if($coupans->sub_categories_id && $coupans->end_date >= $today ){
            return true;
        }else if($coupans->inner_subcategories_id && $coupans->end_date >= $today ){
            return true;
        }
    }
}



