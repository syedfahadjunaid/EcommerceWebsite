<?php

namespace App\Http\Controllers\api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;
use App\Models\ProductImage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try{
          $product=Product::with('image')
      ->get();
          return response()->json([
            'status' => true,
            'list' => $product,
        ], 200);
        }catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         \Log::error($request->all());
         //dd($request);
        try {
            $validate = Validator::make(
                $request->all(),
                [
                    'title' => 'required',
                    'category' => 'required',
                    'subcategory' => 'required',
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

     
       
            $insert = [
                'title' => $request->title,
                'slug' => Str::slug($request->title),
                'category_id' => $request->category,
                'sub_category_id' => $request->subcategory,
                'innersub_category_id'=>$request->innersub_category_id,
                'sku' => $request->sku,
                'mrp' => $request->mrp ? $request->mrp : 0.00,
                'price' => $request->price ? $request->price : 0.00,
                'specification' => $request->specification,
                'gst'=> $request->gst ? $request->gst:0,
                'short_desc' => $request->short_desc,
                'stock'=> $request->stock,
                'long_desc' => $request->long_desc,
                'new_arrival' => $request->new_arrival ? 1 : 0,
                'featured' => $request->featured ? 1 : 0,
                'best_seller' => $request->best_seller ? 1 : 0,
                'status' => $request->status ? 1 : 0
            ];
       
           $product=Product::create($insert);
           if($request->hasfile('images')) {
            $imgData=[];
            foreach($request->file('images') as $file)
            {
                $name = Str::random().'.'.$file->getClientOriginalName();
                $file->move(public_path().'/storage/product/', $name);  
                $imgData[] = $name;  
            }
            $fileModal = new ProductImage();
            $fileModal->product_id = $product->id;
            $fileModal->image = json_encode($imgData);
            $fileModal->save();
        }

            return response()->json([
                'status' => true,
                'message' => 'Product Added Succesfully.',
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try{
            $product=Product::where('products.id',$id)->with('image')->first();
            return response()->json([
              'status' => true,
              'list' => $product,
          ], 200);
          }catch (\Throwable $th) {
              return response()->json([
                  'status' => false,
                  'message' => $th->getMessage()
              ], 500);
          }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
         //dd($request);
         try {
            $validate = Validator::make(
                $request->all(),
                [
                    'title' => 'required',
                    'category' => 'required',
                    'subcategory' => 'required',
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
                'featured' => $request->featured ? 1 : 0,
                'gst'=> $request->gst ? $request->gst:0,
                'best_seller' => $request->best_seller ? 1 : 0,
                'status' => $request->status ? 1 : 0
            ];
       
           $product->update($insert);
           if($request->hasfile('images')) {
            $imgData=[];
            $productImage=ProductImage::where('product_id',$id)->first();
              $images=json_decode($productImage->image);
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
              $product=Product::find($id);
              $productImage=ProductImage::where('product_id',$id)->first();
              //$images=json_decode($productImage->image);
              foreach($productImage->image as $key=>$image){
          
                $exists = Storage::disk('public')->exists("product/$image");
                if($exists){
                    Storage::disk('public')->delete("product/$image");
                }
              }

            $product->delete();
            $productImage->delete();
            return response()->json([
                'message'=>'Product Deleted Successfully!!'
            ],200);
            
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a product!!'
            ],500);
        }
    }
}