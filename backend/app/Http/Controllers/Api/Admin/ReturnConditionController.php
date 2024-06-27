<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Return_Condition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class ReturnConditionController extends Controller
{
    public function index(){
        try {
            $return_Condition =  Return_Condition::all();
            return response()->json(['message'=>'Return_Condition data get successfully' , 'data'=>$return_Condition],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500); 
        }
    }

    public function store(Request $request){
        try{
            $return_Condition = new Return_Condition();
            $return_Condition->title = $request->title;
            $return_Condition->save();
            return response()->json(['message'=>'Return Condition data created successfully', 'data'=>$return_Condition],200);
        }catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500); 
        }
       
    }

    public function getone($id){
        try {
            $return_Condition =  Return_Condition::find($id);
            return response()->json(['message'=>'Return_Condition data get successfully' , 'data'=>$return_Condition],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500); 
        }
    }

    
    public function update(Request $request , $id){
        try{
            $return_Condition = Return_Condition::find($id);
            $return_Condition->title = $request->title;
            $return_Condition->save();
            return response()->json(['message'=>'Return Condition data created successfully', 'data'=>$return_Condition],200);
        }catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500); 
        }
    }

}
