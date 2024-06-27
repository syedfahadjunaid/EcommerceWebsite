<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            
            $category=Category::select('id','title','slug','status',\DB::raw('CONCAT("'.asset('storage/category/image').'/", image) as image'))->get();
      
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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), 
            [
                'title' => 'required',
                'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
            ]);

            if($validate->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validate->errors()
                ], 401);
            }
            $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('category/image', $request->image,$imageName);
            $insert=[
               'title'=>$request->title,
               'slug'=>Str::slug($request->title),
               'image'=>$imageName
            ];
            Category::create($insert);
            return response()->json([
                'status' => true,
                'message' => 'Category Added Succesfully.',
            ],200);

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
        $category=Category::where('id',$id)->select('id','title','slug','status',\DB::raw('CONCAT("'.asset('storage/category/image').'/", image) as image'))->get();
        return response()->json([
            'status'=>true,
            'data'=>$category
        ],200);
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
        $request->validate([
            'title'=>'required',
        ]);
       
        try{

            $category=Category::find($id);
            $category->title = $request->title;
            $category->slug = Str::slug($request->title);
            if($request->hasFile('image')){

                // remove old image
                if($category->image){
                    $exists = Storage::disk('public')->exists("category/image/{$category->image}");
                    if($exists){
                        Storage::disk('public')->delete("category/image/{$category->image}");
                    }
                }

                $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('category/image', $request->image,$imageName);
                $category->image = $imageName;
            }
            $category->save();
            return response()->json([
                'status'=>true,
                'message'=>'Product Updated Successfully!!'
            ],200);

        }catch(\Exception $e){
            Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a product!!'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
              $category=Category::find($id);
            if($category->image){
                $exists = Storage::disk('public')->exists("category/image/{$category->image}");
                if($exists){
                    Storage::disk('public')->delete("category/image/{$category->image}");
                }
            }

            $category->delete();

            return response()->json([
                'message'=>'Category Deleted Successfully!!'
            ]);
            
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a product!!'
            ]);
        }
    }
}
