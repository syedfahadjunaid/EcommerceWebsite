<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Icons;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class IconsController extends Controller
{
    public function index(){
       try {
            $icons = Icons::select('id','title','link',\DB::raw('CONCAT("'.asset('storage/Icons/image').'/", image) as image'))->get();
            return response()->json(['status'=>true , 'message'=>'Icons data get successfully', 'data'=>$icons],200);
       } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
       }
    }

    public function store(Request $request){
        try {
            $icons          = new Icons;
            $icons->title   = $request->title;
            $icons->link    = $request->link;
            $icons->slug    = $request->slug;
            $imageName      = Str::random().'.'.$request->image->getClientOriginalExtension();
                              Storage::disk('public')->putFileAs('Icons/image', $request->image,$imageName);
            $icons->image    = $imageName;
            $icons->save();
            return response()->json(['status'=>true,'message'=>'Icon create successfully','icons-data'=>$icons],200);

        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request, $id){
        try {
            $icons          = Icons::find($id);
            $icons->title   = $request->title;
            $icons->link    = $request->link;
            $icons->slug    = $request->slug;
            if($request->hasFile('image')){
                if($icons->icons){
                    $exists = Storage::disk('public')->exists("Icons/image/{$icons->image}");
                    if($exists){
                        Storage::disk('public')->delete("Icons/image/{$icons->image}");
                    }
                }
                $imageName = Str::random().'.'.$request->image->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('Icons/image', $request->image,$imageName);
                $icons->image = $imageName;
            }
            $icons->save();
            return response()->json(['status'=>true,'message'=>'Icon Update successfully','icons-data'=>$icons],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function getOne($id){
        try {
            $icon = Icons::where('id',$id)->select('id','title','link',\DB::raw('CONCAT("'.asset('storage/Icons/image').'/", image) as image'))->get();
            return response()->json(['status'=>true,'message'=>'Icon get successfully','icons-data'=>$icon],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    /* **
    * TODO make the soft delete for icons and all other requers API as per requerment 
    */
}
