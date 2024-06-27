<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ProductreviewController extends Controller
{
    public function index(){
        try {
            $review = Review::join('products','products.id','=','reviews.product_id')->join('categories', 'categories.id','=','reviews.category_id')
            ->select('products.title as product_name', 'categories.title as categories_name' ,'reviews.id','reviews.rating','reviews.product_review' )
            ->get();
            return response()->json(['message'=>'review data get sucessfully ', 'data'=>$review],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
       
    }

    public function getone($id){
        try {
            $review = Review::where('id',$id)->join('products','products.id','=','reviews.product_id')->join('categories', 'categories.id','=','reviews.category_id')
            ->select('products.title as product_name', 'categories.title as categories_name' ,'reviews.id','reviews.rating','reviews.product_review' )
            ->first();
            return response()->json(['message'=>'review data get sucessfully ', 'data'=>$review],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function store(Request $request){
        try {
            $review = new Review();
            $review->product_id = $request->product_id;
            $review->category_id = $request->category_id;
            $review->product_review = $request->product_review;
            $review->rating = $request->rating;
            $review->user_id = $request->user_id;
            $review->save();
            return response()->json(['messege'=>'Review create sucessfully ', 'data'=>$review],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
       
    }

    public function update(Request $request, $id){
        try {
            $review =  Review::find($id);
            $review->product_id = $request->product_id;
            $review->category_id = $request->category_id;
            $review->product_review = $request->product_review;
            $review->rating = $request->rating;
            $review->user_id = $request->user_id;
            $review->save();
            return response()->json(['messege'=>'Review update sucessfully ', 'data'=>$review],200);

        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }
}
