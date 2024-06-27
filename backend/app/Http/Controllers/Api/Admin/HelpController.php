<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\help;
use Illuminate\Http\Request;

class HelpController extends Controller
{
    public function index(){
        try {
            $helps =  help::all();
            return response()->json(['message'=>'help data get successfully' , 'data'=>$helps],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500); 
        }

    }

    public function store(Request $request){
        try {
            $helps = new help();
            $helps->name = $request->name;
            $helps->email = $request->email;
            $helps->subject = $request->subject;
            $helps->message = $request->message;
            $helps->save();
            return response()->json(['message'=>'help data create successfully' , 'data'=>$helps],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500); 
        }

    }

    public function getone($id){
        try {
            $helps =  help::find($id);
            return response()->json(['message'=>'help data get successfully' , 'data'=>$helps],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500); 
        }

    }

    public function update(Request $request, $id){
        try {
            $helps =  help::find($id);
            $helps->name = $request->name;
            $helps->email = $request->email;
            $helps->subject = $request->subject;
            $helps->message = $request->message;
            $helps->save();
            return response()->json(['message'=>'help data create successfully' , 'data'=>$helps],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500); 
        }

    }
}
