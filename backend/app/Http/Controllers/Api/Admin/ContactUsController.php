<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactUs;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    public function index(){
        try {
            $contact_us = ContactUs::get();
            return response()->json(['message'=>'contact_us get succefully', 'data'=>$contact_us],200);   
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function getOne($id){
        try {
            $contact_us = ContactUs::find($id);
            return response()->json(['message'=>'contact_us get succefully', 'data'=>$contact_us],200);   
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }
}
