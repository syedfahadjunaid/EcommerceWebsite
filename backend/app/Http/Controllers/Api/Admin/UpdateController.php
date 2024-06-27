<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UpdateController extends Controller
{
    public function product_update(Request $request, string $id)
    {
         \Log::error($request->all());
         try {
            $validate = Validator::make(
                $request->all(),
                [
                    'title' => 'required',
                    'category_id' => 'required',
                    'sub_category_id' => 'required',
                    'sku' => 'required',
                    'mrp' => 'required',
                    'price' => 'required',
                    'new_arrival' => 'boolean',
                    'featured' => 'boolean',
                    'best_seller' => 'boolean',
                    'status' => 'boolean',
                ]
            );

            if ($validate->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validate->errors()
                ], 401);
            }

     
            $product=Product::find($id);
            if(!$product){
                return response()->json(["message"=>"product not found"], 404);
            }
            $insert = [
                'title' => $request->title,
                'slug' => Str::slug($request->title),
                'category_id' => $request->category,
                'sub_category_id' => $request->subcategory,
                'inner_sub_category_id'=>$request->inner_sub_category_id,
                'sku' => $request->sku,
                'mrp' => $request->mrp ? $request->mrp : 0.00,
                'price' => $request->price ? $request->price : 0.00,
                'specification' => $request->specification,
                'short_desc' => $request->short_desc,
                'long_desc' => $request->long_desc,
                'new_arrival' => $request->new_arrival ? 1 : 0,
                'stock'=> $request->stock,
                'featured' => $request->featured ? 1 : 0,
                'gst'=> $request->gst ? $request->gst:0,
                'best_seller' => $request->best_seller ? 1 : 0,
                'status' => $request->status ? 1 : 0
            ];
       
           $product->update($insert);
           if($request->hasfile('images')) {
            $imgData=[];
            $productImage=ProductImage::where('product_id',$id)->first();
              $images= ($productImage->image);
              foreach($images as $key=>$image){
                $exists = Storage::disk('public')->exists("product/$image");
                if($exists){
                    Storage::disk('public')->delete("product/$image");
                }
              }
            foreach($request->file('images') as $file)
            {
                $name = Str::random().'.'.$file->getClientOriginalName();
                $file->move(public_path().'/storage/product/', $name);  
                $imgData[] = $name;  
            }
            $productImage->product_id = $product->id;
            $productImage->image = json_encode($imgData);
            $productImage->save();
        }

            return response()->json([
                'status' => true,
                'message' => 'Product update succesfully.',
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function status_update(Request $request,$id){
        try {
            $product = Product::find($id);
            if(!$product){
                return response()->json(['message'=>"product not found"],404);
            }elseif($request->status == 0){
                $product->status = 0;
                $product->save();
                return response()->json(['message'=>'Produt is Inactive'],200);
            } elseif($request->status ==1){
                $product->status =1;
                $product->save();
                return response()->json(['message'=>'Produt is Active'],200);
            }          
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()], 500);
        }
    }

    public function update_category_status(Request $request, $id){
        try {
            $category = Category::find($id);
            if(!$category){
                return response()->json(['message'=>"Category not found"],404);
            }elseif($request->status == 0){
                $category->status = 0;
                $category->save();
                return response()->json(['message'=>'category is Inactive'],200);
            } elseif($request->status ==1){
                $category->status =1;
                $category->save();
                return response()->json(['message'=>'category is Active'],200);
            }          
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()], 500);
        }
    }

    public function user_status_update(Request $request,$id){
        try {
            $user = User::find($id);
            if(!$user){
                return response()->json(['message'=>"User not found"],404);
            }elseif($request->status == 0){
                $user->status = 0;
                $user->save();
                return response()->json(['message'=>'User is Inactive'],200);
            } elseif($request->status ==1){
                $user->status =1;
                $user->save();
                return response()->json(['message'=>'User is Active '],200);
            }    
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()], 500);
        }
    }

    public function update_banner_status(Request $request, $id){
        try {
            $benner = Banner::find($id);
            if(!$benner){
                return response()->json(['message'=>"benner not found"],404);
            }elseif($request->status == 0){
                $benner->status = 0;
                $benner->save();
                return response()->json(['message'=>'benner is Inactive'],200);
            } elseif($request->status ==1){
                $benner->status =1;
                $benner->save();
                return response()->json(['message'=>'benner is Active'],200);
            }    
        } catch (\Throwable $th) {
            return response()->json(['status' => false, 'message' => $th->getMessage()], 500);
        }
    }
}
