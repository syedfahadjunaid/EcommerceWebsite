<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Popup;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;


class PopupController extends Controller
{
    public function index(){
        try {
            $banner = Popup::select('id','title','link','alttag',\DB::raw('CONCAT("'.asset('storage/Popup/image').'/", image) as image'))->get();
            return response()->json(['message'=>'Banner data get successfully' ,'Banner'=>$banner] ,200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function store(Request $request){
        try {
           $banner = new Popup;
           $banner->title = $request->title;
           $banner->link = $request->link;
           $banner->alttag = $request->alttag;
           $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
           Storage::disk('public')->putFileAs('Popup/image', $request->image,$imageName);
           $banner->image = $imageName;
           $banner->save();
           return response()->json(['message'=>'Banner created successfully ', 'banner'=>$banner],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function getOne($id){
        try {
            $banner = Popup::where('id',$id)->select('id','title','link','alttag',\DB::raw('CONCAT("'.asset('storage/Popup/image').'/", image) as image'))->first();
            return response()->json(['message'=>'Banner get successfully ', 'banner'=>$banner],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request ,$id){
        try {
            $banner = Popup::find($id);
            $banner->title = $request->title;
            $banner->link = $request->link;
            $banner->alttag = $request->alttag;
            if($request->hasFile('image')){
                if($banner->image){
                    $exists = Storage::disk('public')->exists("Popup/image/{$banner->image}");
                    if($exists){
                        Storage::disk('public')->delete("Popup/image/{$banner->image}");
                    }
                }
                $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('Popup/image', $request->image,$imageName);
                $banner->image = $imageName;
            }
            $banner->save();
            return response()->json(['message'=>'Banner updated successfully ', 'banner'=>$banner],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function delete($id){
        {
            try {
                $banner=Popup::find($id);
                if($banner->image){
                    $exists = Storage::disk('public')->exists("Popup/image/{$banner->image}");
                    if($exists){
                        Storage::disk('public')->delete("Popup/image/{$banner->image}");
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
}
