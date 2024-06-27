<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\WebsiteAnalysis;
use Illuminate\Http\Request;

class WebsiteAnayliecesController extends Controller
{
    public function index(){
        try {
            $website_analysis = WebsiteAnalysis::get();
            return response()->json(['message'=>'Analysis data get successfully', 'data'=>$website_analysis],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function getone($id){
        try {
            $website_analysis = WebsiteAnalysis::find($id);
            return response()->json(['message'=>'Analysis data get successfully', 'data'=>$website_analysis],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function store(Request $request){
       try {
            $website_analysis = new WebsiteAnalysis();
            $website_analysis->title = $request->title;
            $website_analysis->script = $request->script;
            $website_analysis->save();
        return response()->json(['message'=>'Analysis data store successfully', 'data'=>$website_analysis],200);
       } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
       }
    }

    public function update(Request $request, $id){
        try {
            $website_analysis = WebsiteAnalysis::find($id);
            $website_analysis->title = $request->title;
            $website_analysis->script = $request->script;
            $website_analysis->save();
        return response()->json(['message'=>'Analysis data store successfully', 'data'=>$website_analysis],200);
       } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
       }
    }

    public function update_status(Request $request,$id){
        try {
            $website_analysis = WebsiteAnalysis::find($id);
            if(!$website_analysis){
                return response()->json(['message'=>"WebsiteAnalysis not found"],404);
            }elseif($request->status == 0){
                $website_analysis->status = 0;
                $website_analysis->save();
                return response()->json(['message'=>'WebsiteAnalysis is Inactive'],200);
            } elseif($request->status ==1){
                $website_analysis->status =1;
                $website_analysis->save();
                return response()->json(['message'=>'WebsiteAnalysis is Active'],200);
            }  
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }
}
