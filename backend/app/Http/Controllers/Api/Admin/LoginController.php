<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Admin;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        //dd($request);
        try {
            $validateAdmin = Validator::make($request->all(), 
            [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if($validateAdmin->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateAdmin->errors()
                ], 401);
            }

            if(!Auth::guard('admin')->attempt($request->only(['email', 'password']))){
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.',
                ], 401);
            }

            $Admin = Admin::where('email', $request->email)->first();

            return response()->json([
                'status' => true,
                'message' => 'Admin Logged In Successfully',
                'email' => $Admin->email,
                'token' => $Admin->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function logout()
    {
        try {
        auth()->guard('admin')->user()->tokens()->delete();
        auth()->guard('admin')->logout();
        return response()->json([
            'status' => true,
            'message' => 'You are successfully logout',
        ],200);
    } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => $th->getMessage()
        ], 500);
    }
    }
}

