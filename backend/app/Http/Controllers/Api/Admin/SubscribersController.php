<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscribersController extends Controller
{
    public function index(){
        try {
            $subscribers =  Subscriber::all();
            return response()->json(['message'=>'subcriber data get successfully' , 'data'=>$subscribers],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500); 
        }
       

    }
    public function store(Request $request){
        try {
            $subscriber = new Subscriber();
            $subscriber->name = $request->name;
            $subscriber->email = $request->email;
            $subscriber->phone = $request->phone;
            $subscriber->save();
            return response()->json(['message'=>'subcriber data create successfully' , 'data'=>$subscriber],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500); 
        }
    }
    public function update(Request $request, $id){
        try {
            $subscriber =  Subscriber::find($id);
            $subscriber->name = $request->name;
            $subscriber->email = $request->email;
            $subscriber->phone = $request->phone;
            $subscriber->save();
            return response()->json(['message'=>'subcriber data create successfully' , 'data'=>$subscriber],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500); 
        }
    }

    public function getOne($id){
        try {
            $subscribers =  Subscriber::find($id);
            return response()->json(['message'=>'subcriber data get successfully' , 'data'=>$subscribers],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500); 
        }
    }
}
