<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Website;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class WebsiteController extends Controller
{
    public function index(){
        try {
            $website_setting = Website::get();
            return response()->json(['message'=>'website setting data get Successfully', 'data'=>$website_setting],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }


    public function store(Request $request){
        try {
            $website_setting = new Website();
            $website_setting->website_title = $request->website_title;
            $website_setting->toll_free_number = $request->toll_free_number;
            $website_setting->nev_bar_text = $request->nev_bar_text;
            if($request->logo){
                $imageName      = Str::random().'.'.$request->logo->getClientOriginalExtension();
                                    Storage::disk('public')->putFileAs('logo/image', $request->logo,$imageName);
                $website_setting->logo    = $imageName;
            }
            $website_setting->save();
        return response()->json(['message'=>'website setting data created successfully !!', ],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }


    public function update (Request $request, $id){
        try {
            $website_setting =  Website::find($id);
            $website_setting->website_title = $request->website_title;
            $website_setting->toll_free_number = $request->toll_free_number;
            $website_setting->nev_bar_text = $request->nev_bar_text;
            if($request->hasFile('image')){
                if($website_setting->logo){
                    $exists = Storage::disk('public')->exists("logo/image/{$website_setting->image}");
                    if($exists){
                        Storage::disk('public')->delete("logo/image/{$website_setting->image}");
                    }
                }
                $imageName = Str::random().'.'.$request->logo->getClientOriginalExtension();
                Storage::disk('public')->putFileAs('logo/image', $request->logo,$imageName);
                $website_setting->image = $imageName;
            }
            $website_setting->save();
        return response()->json(['message'=>'website setting data created successfully !!', ],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        } 
    }


    public function getone($id){
        try {
            $website_setting = Website::find($id);
            return response()->json(['message'=>'website setting data get Successfully', 'data'=>$website_setting],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }
}
