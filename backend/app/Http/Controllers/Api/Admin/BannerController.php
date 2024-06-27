<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\Banner;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            
            $banner=Banner::select('id','title','link','alt_tag','status',\DB::raw('CONCAT("'.asset('storage/banner').'/", image) as image'))->get();
      
            return response()->json([
                'status' => true,
                'list' => $banner
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
        //
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
                'link' => 'required',
                'alt_tag' => 'required',
                'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg',
            ]);

            if($validate->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validate->errors()
                ], 401);
            }
            $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
            Storage::disk('public')->putFileAs('banner', $request->image,$imageName);
            $insert=[
               'title'=>$request->title,
               'link'=>$request->link,
               'alt_tag'=>$request->alt_tag,
               'image'=>$imageName
            ];
            Banner::create($insert);
            return response()->json([
                'status' => true,
                'message' => 'Banner Added Succesfully.',
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
        $banner=Banner::where('id',$id)->select('id','title','link','alt_tag','status',\DB::raw('CONCAT("'.asset('storage/banner').'/", image) as image'))->get();

        return response()->json([
            'status'=>true,
            'data'=>$banner
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
        try{

            $banner=Banner::find($id);
            $banner->title = $request->title;
            $banner->link = $request->link;
            $banner->alt_tag = $request->alt_tag;
            if($request->hasFile('image')){

                // remove old image
                if($banner->image){
                    $exists = Storage::disk('public')->exists("banner/{$banner->image}");
                    if($exists){
                        Storage::disk('public')->delete("banner/{$banner->image}");
                    }
                }

                $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('banner', $request->image,$imageName);
                $banner->image = $imageName;
            }
            $banner->save();
            return response()->json([
                'status'=>true,
                'message'=>'Banner Updated Successfully!!'
            ],200);

        }catch(\Exception $e){
            \Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while updating a banner!!'
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $banner=Banner::find($id);
          if($banner->image){
              $exists = Storage::disk('public')->exists("banner/{$banner->image}");
              if($exists){
                  Storage::disk('public')->delete("banner/{$banner->image}");
              }
          }

          $banner->delete();

          return response()->json([
              'message'=>'Banner Deleted Successfully!!'
          ]);
          
      } catch (\Exception $e) {
          \Log::error($e->getMessage());
          return response()->json([
              'message'=>'Something goes wrong while deleting a product!!'
          ]);
      }
    }
}
