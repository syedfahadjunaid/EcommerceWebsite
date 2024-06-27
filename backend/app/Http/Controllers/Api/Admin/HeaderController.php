<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Header;
use App\Models\Sub_header;
use Illuminate\Http\Request;

class HeaderController extends Controller
{
    public function index(){
        try {
            $header = Header::get();
            return response()->json(['message'=>'Header data get successfully', 'status'=>true, 'data'=>$header],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function store(Request $request){
        try {            
            $header = new Header();
            $header->title = $request->title;
            $header->link = $request->link;
            $header->save();
            if($request->sub_header){
                if($header){
                    $sub_header = json_decode($request->sub_header);
                    foreach($sub_header as$subheader){
                        $sub_header = new Sub_header();
                        $sub_header->sub_header = $subheader->title;
                        $sub_header->sub_header_link = $subheader->sub_header_link;
                        $sub_header->header_id = $header->id;
                        $sub_header->save();
                    }
                }
            }
            return response()->json(['message'=>'Header data created successfully', 'status'=>true, 'data'=>$header],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);

        }
    }

    public function update(Request $request,$id){
        try {
            $header = Header::find($id);
            $header->title = $request->title;
            $header->save();
            return response()->json(['message'=>'Header data updated successfully', 'status'=>true, 'data'=>$header],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        } 
    }

    public function getone($id){
        try {
            $header = Header::find($id);
            return response()->json(['message'=>'Header data get successfully', 'status'=>true, 'data'=>$header],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        } 
    }

    public function delete($id){
        try {
            $header = Header::find($id);
            if ($header){
                $header->delete();
                $sub_header = Sub_header::where('header_id',$id)->delete();
                return response()->json(['status'=>true,'message'=>'Header deleted successfuly '],200);
            }
                return response()->json(['status'=>false,'messaage'=>'Header not fount'],404);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }
}
