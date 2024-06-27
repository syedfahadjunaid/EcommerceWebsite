<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\SubCategory;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            
            $subcategory=SubCategory::get();
             foreach($subcategory as $s)
             {
                 $data=[
                   'id'=>$s->id,
                   'category_id'=>$s->category->id,
                   'category_title'=>$s->category->title,
                   'title'=>$s->title,
                   'slug'=>$s->slug
                 ];
             }
             
            return response()->json([
                'status' => true,
                'list' => $subcategory
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
                'category_id'=>'required',
                'title' => 'required',
            ]);

            if($validate->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validate->errors()
                ], 401);
            }

            $insert=[
                'category_id'=>$request->category_id,
               'title'=>$request->title,
               'slug'=>Str::slug($request->title)
            ];
            SubCategory::create($insert);
            return response()->json([
                'status' => true,
                'message' => 'Sub category Added Succesfully.',
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
        $subcategory=SubCategory::find($id);
        return response()->json([
            'status'=>true,
            'data'=>$subcategory
        ],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
       
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

            $subcategory=SubCategory::find($id);
            $subcategory->category_id = $request->category_id;
            $subcategory->title = $request->title;
            $subcategory->slug = Str::slug($request->title);
            $subcategory->save();
            return response()->json([
                'status'=>true,
                'message'=>'Sub category Updated Successfully!!'
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
              $subcategory=SubCategory::find($id);

            $subcategory->delete();

            return response()->json([
                'message'=>'Sub category Deleted Successfully!!'
            ]);
            
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while deleting a product!!'
            ]);
        }
    }
}
