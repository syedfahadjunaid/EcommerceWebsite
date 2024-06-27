<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Shiping;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
    public function index(){
        try {
            $shipping  = Shiping::all();
            return response()->json(['status'=>true, "message"=>"data get successfully", 'data'=>$shipping]);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }    
    }

    public function getone($id){
        try {
            $shipping  = Shiping::find($id);
            return response()->json(['status'=>true, "message"=>"data get successfully", 'data'=>$shipping]);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }    
    }

    public function store(Request $request){
        try {
            $shipping = new Shiping();
            $shipping->title = $request->title;
            $shipping->public_key = $request->public_key;
            $shipping->scoure_key = $request->scoure_key;
            $shipping->status = $request->status;
            $shipping->save();
            return response()->json(['status'=>true, 'message'=>'created successfully'],200);

        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request, $id){
        try {
            $shipping =  Shiping::find($id);
            $shipping->title = $request->title;
            $shipping->public_key = $request->public_key;
            $shipping->scoure_key = $request->scoure_key;
            $shipping->status = $request->status;
            $shipping->save();
            return response()->json(['status'=>true, 'message'=>'update successfully'],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }
}
