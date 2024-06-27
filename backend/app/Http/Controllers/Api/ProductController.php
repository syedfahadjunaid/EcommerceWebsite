<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function getallproduct(){
        try {
            $product =Product::with('image')->get();;
            return response()->json(['message'=>'Product data get all successfully' ,'Product'=>$product] ,200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function get_one($id){
        try {
            $product=Product::where('products.id',$id)->with('image')->first();
            return response()->json(['message'=>'Product data get all successfully' ,'Product'=>$product] ,200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function get_product_by_category($category_id){
        try {
            $product = Product::where('category_id',$category_id)->join('product_images','product_images.product_id','=','products.id')->where('status','1')->get();
            return response()->json(['message'=>'Product data  get by category_id successfully' ,'Product'=>$product] ,200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function get_product_by_sub_category($sub_category_id){
        try {
            $product = Product::where('sub_category_id',$sub_category_id)->join('product_images','product_images.product_id','=','products.id')->where('status','1')->get();
            return response()->json(['message'=>'Product data  get by sub_category_id successfully' ,'Product'=>$product] ,200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function new_arrivals_product(){
        try {
            $product = Product::where('new_arrival','=',1)->with("image")->where('status','1')->get();
            return response()->json(['message'=>'Product data  get by sub_category_id successfully' ,'Product'=>$product] ,200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function best_seller_product(){
        try {
            $product = Product::where('best_seller','=',1)->with("image")->where('status','1')->get();
            return response()->json(['message'=>'Product data  get by sub_category_id successfully' ,'Product'=>$product] ,200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function featured_product(){
        try {
            $product = Product::where('featured','=',1)->with("image")->where('status','1')->get();
            return response()->json(['message'=>'Product data  get by sub_category_id successfully' ,'Product'=>$product] ,200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function wishlist_store(Request $request){
       try {
            $wishlist = new Wishlist();
            $wishlist->product_id = $request->product_id;
            $wishlist->user_id = $request->user_id;
            $wishlist->save();
            return response()->json(['status'=>true,'message'=>'wishlish created successfully'],200);
       } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
       }
    }
    
    public function wishlistget($user_id){
        try {
            $wishlist = Wishlist::where('user_id', $user_id)->get();
            return response()->json(['status'=>true, 'message'=>'data get sucessfully ', 'product'=>$wishlist],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function removewishlist($id){
        try {
            $wishlist = Wishlist::find($id);
            if($wishlist){
                $wishlist->delete();
            }
            return response()->json(['status'=>true, 'message'=>'data removed sucessfully '],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function get_all_category(){
        try {  
            $category=Category::select('id','title','slug',\DB::raw('CONCAT("'.asset('storage/category/image').'/", image) as image'))->get();
            return response()->json([
                'status' => true,
                'list' => $category
            ],200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

}
