<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Http\Request;

class CratController extends Controller
{
    public function cart_by_user($id){
       try {
        $cart = Cart::where('user_id',$id)->join('products', 'carts.product_id' ,'=', 'products.id')->join('product_images', 'carts.product_id','=','product_images.product_id')->select('carts.id as cart_id' , 'carts.user_id as user_id', 
                    'carts.product_id','carts.count','products.*','product_images.*')->get();
        return response()->json(['message'=>'cart get succefully', 'data'=>$cart],200);  
       } catch (\Throwable $th) {
        return response()->json(['status' => false,'message' => $th->getMessage()], 500);
       }
    }

    public function store(Request $request){
        try {
            $cart = new Cart();
            $cart->user_id = $request->user_id;
            $cart->product_id = $request->product_id;
            $cart->count = $request->count;
            $cart->save();
            return response()->json(['message'=>'cart created succefully', 'data'=>$cart],200);  
        } catch (\Throwable $th) {
             return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request, $id){
        try {
            $cart = Cart::find($id);
            $cart->count = $request->count;
            return response()->json(['message'=>'cart update succefully', 'data'=>$cart],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function remove($id){
        try {
            $cart = Cart::find($id);
            $cart->delete();
            return response()->json(['message'=>'cart removed succefully'],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }
}
