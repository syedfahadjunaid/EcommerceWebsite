<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sub_header;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;

class Sub_headerController extends Controller
{
    public function index(){
        try {
            $sub_header = Sub_header::get();
            return response()->json(['message'=>'sub Header data get successfully', 'status'=>true, 'data'=>$sub_header],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function store(Request $request){
        try {
            $sub_header = new Sub_header();
            $sub_header->sub_header = $request->sub_header;
            $sub_header->header_id = $request->header_id;
            $sub_header->save();
            return response()->json(['message'=>'Sub Header data created successfully', 'status'=>true, 'data'=>$sub_header],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function update(Request $request,$id){
        try {
            $sub_header = Sub_header::find($id);
            $sub_header->sub_header = $request->sub_header;
            $sub_header->header_id = $request->header_id;
            $sub_header->save();
            return response()->json(['message'=>'Sub Header data updated successfully', 'status'=>true, 'data'=>$sub_header],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function getone($id){
        try {
            $sub_header = Sub_header::find($id);
            return response()->json(['message'=>'Sub Header data get successfully', 'status'=>true, 'data'=>$sub_header],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        } 
    }


}
