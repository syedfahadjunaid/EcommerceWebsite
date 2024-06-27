<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Paymentgetway;
use Illuminate\Http\Request;

class PaymentgetwayController extends Controller
{
    public function index(){
        try {
            $payment = Paymentgetway::all();
            return response()->json(['message'=>'Payment getwate data get successfull' , 'PaymentGetaway'=>$payment],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }  
    }
    /**
     *  Stor the payment getway data 
     */
    public function store(Request $request){
       try {
            $payment                           = new Paymentgetway;
            $payment->title                    = $request->title;
            $payment->public_key               = $request->public_key;
            $payment->client_id                = $request->client_id;
            $payment->secret_key               = $request->secret_key;
            $payment->production_public_key    = $request->production_public_key;
            $payment->production_client_id     = $request->production_client_id;
            $payment->production_secret_key    = $request->production_secret_key;
            $payment->status                   = $request->status;
            $payment->save();
            return response()->json(['status'=>true, 'meassage'=> "Payment Gatewat data created successfully"],200);
       } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
       }
    }
    /**
     *  Update the payment getway data 
     */ 
    public function update(Request $request, $id){
        try {
            $payment                           = Paymentgetway::find($id);
            $payment->public_key               = $request->public_key;
            $payment->client_id                = $request->client_id;
            $payment->secret_key               = $request->secret_key;
            $payment->production_public_key    = $request->production_public_key;
            $payment->production_client_id     = $request->production_client_id;
            $payment->production_secret_key    = $request->production_secret_key;
            $payment->status                   = $request->status;
            $payment()->save();
            return response()->json(['status'=>true, 'meassage'=> "Payment Gatewat data created successfully"],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }
    public function getOne($id){
        try {
            $payment = Paymentgetway::find($id);
            return response()->json(['message'=>'Payment getwate data get successfull' , 'PaymentGetaway'=>$payment],200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }  
    }

    public function update_status(Request $request,$id){
        try {
            $payment = Paymentgetway::find($id);
            if(!$payment){
                return response()->json(['message'=>"Paymentgetway not found"],404);
            }elseif($request->status == 0){
                $payment->status = 0;
                $payment->save();
                return response()->json(['message'=>'Paymentgetway is Inactive'],200);
            } elseif($request->status ==1){
                $payment->status =1;
                $payment->save();
                return response()->json(['message'=>'Paymentgetway is Active'],200);
            }  
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    /* **
    *Todo create the delete and update status api 
    */
}
