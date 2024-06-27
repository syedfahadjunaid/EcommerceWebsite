<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Dealofday;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class DealBannerController extends Controller
{
    public function index(){
        try {
            $banner = Dealofday::join('products','products.id', 'dealofdays.product_id')->select('dealofdays.id','products.title','link','alttag','dealofdays.startdate','dealofdays.enddate' ,'products.title')->get();
            return response()->json(['message'=>'Banner data get successfully' ,'Banner'=>$banner] ,200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function store(Request $request){
        try {
           $banner = new Dealofday;
           $banner->title = $request->title;
           $banner->link = $request->link;
           $banner->alttag = $request->alttag;
           $banner->category_id = $request->category_id;
           $banner->sub_category_id = $request->sub_category_id;
           $banner->product_id = $request->product_id;
           $banner->startdate = $request->startdate;
           $banner->enddate = $request->enddate;
        //    $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
        //    Storage::disk('public')->putFileAs('Dealofday/image', $request->image,$imageName);
        //    $banner->image = $imageName;
           $banner->save();
           return response()->json(['message'=>'Banner created successfully ', 'banner'=>$banner],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function getOne($id){
        try {
            $banner = Dealofday::where('dealofdays.id',$id)->join('products','products.id', 'dealofdays.product_id')->select('dealofdays.id','products.title','link','alttag','dealofdays.startdate','dealofdays.enddate' ,'products.title')->first();
            return response()->json(['message'=>'Banner get successfully ', 'banner'=>$banner],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request ,$id){
        try {
            $banner = Dealofday::find($id);
            $banner->title = $request->title;
            $banner->link = $request->link;
            $banner->alttag = $request->alttag;
            $banner->category_id = $request->category_id;
            $banner->sub_category_id = $request->sub_category_id;
            $banner->product_id = $request->product_id;
            $banner->startdate = $request->startdate;
            $banner->enddate = $request->enddate;
            // if($request->hasFile('image')){
            //     if($banner->image){
            //         $exists = Storage::disk('public')->exists("Dealofday/image/{$banner->image}");
            //         if($exists){
            //             Storage::disk('public')->delete("Dealofday/image/{$banner->image}");
            //         }
            //     }
            //     $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
            //     Storage::disk('public')->putFileAs('Dealofday/image', $request->image,$imageName);
            //     $banner->image = $imageName;
            // }
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function delete($id){
        {
            try {
                $banner=Dealofday::find($id);
                if($banner->image){
                    $exists = Storage::disk('public')->exists("Dealofday/image/{$banner->image}");
                    if($exists){
                        Storage::disk('public')->delete("Dealofday/image/{$banner->image}");
                    }
                }
                $banner->delete();
                return response()->json([ 'message'=>'banner Deleted Successfully!!'],200);
            } catch (\Exception $e) {
                Log::error($e->getMessage());
                return response()->json(['message'=>'Something goes wrong while deleting a banner!!'],500);
            }
        }
    }

    public function update_status(Request $request,$id){
        try {
            $banner = Dealofday::find($id);
            if(!$banner){
                return response()->json(['message'=>"Dealofday not found"],404);
            }elseif($request->status == 0){
                $banner->status = 0;
                $banner->save();
                return response()->json(['message'=>'Dealofday is Inactive'],200);
            } elseif($request->status ==1){
                $banner->status =1;
                $banner->save();
                return response()->json(['message'=>'Dealofday is Active'],200);
            }  
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }


}
