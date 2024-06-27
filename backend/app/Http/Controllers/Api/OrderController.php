<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index($user_id){
        $order = Order::where('user_id',$user_id)->get();
        return response()->json(['message'=>'data created sucessfully', $order],200);
    }

    public function store(Request $request){
        try {
            $data = $request->all();    
            $inserted = DB::table('orders')->insert($data);
            if ($inserted) {
                return response()->json(['message' => 'Order created successfully'], 201);
            } else {
                return response()->json(['message' => 'Failed to create order'], 500);
            }
        } catch (\Throwable $th) {
            return response()->json(['status'=>false, 'message'=>$th->getMessage()]);
        }
    }
}
