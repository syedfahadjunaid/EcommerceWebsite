<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactUs;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    public function store(Request $request){
        try {
            $contact_us = new ContactUs();
            $contact_us->name = $request->name;
            $contact_us->email = $request->email;
            $contact_us->subject = $request->subject;
            $contact_us->message = $request->message;
            $contact_us->save();
            return response()->json(['message'=>'Contact us data save successfully' ,'message'=>$contact_us] ,200);
        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }
}
