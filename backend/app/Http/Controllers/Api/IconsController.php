<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Icons;
use App\Models\Website;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IconsController extends Controller
{
    public function index(){
        try {
             $icons = Icons::select('id','title','link','slug',\DB::raw('CONCAT("'.asset('storage/Icons/image').'/", image) as image'))->get();
             return response()->json(['status'=>true , 'message'=>'Icons data get successfully', 'data'=>$icons],200);
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

    public function getwebsitesetting(){
        $websitesetting = Website::get();
        return response()->json($websitesetting);
    }
}
