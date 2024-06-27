<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use App\Models\User;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), 
            [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if($validate->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validate->errors()
                ], 401);
            }

            if(!Auth::attempt($request->only(['email', 'password']))){
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            return response()->json([
                'status' => true,
                'message' => 'Logged In Successfully',
                'user' => $user,
                'token' => $user->createToken("API TOKEN")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function register(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), 
            [
                'name' => 'required',
                'email' => 'required|email',
                'mobile' => 'required|numeric|digits:10',
                'password' => [
                        'required',
                        'string',
                        Password::min(8)
                            ->mixedCase()
                            ->numbers()
                            ->symbols()
                            ->uncompromised(),
                        'confirmed'
                    ]
            ]);

            if($validate->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validate->errors()
                ], 401);
            }
            
            if(User::where('email',$request->email)->first()){
                return response()->json([
                    'status' => false,
                    'message' => 'You are already register , please go for login !.',
                ], 401);
            }

            $insert=[
                'name'=>$request->name,
                'email'=>$request->email,
                'mobile'=>$request->mobile,
                'password'=>bcrypt($request->password),
                'address'=>$request->address,
                'city'=>$request->city,
                'pincode'=>$request->pincode,

            ];
            $user=User::create($insert);


            return response()->json([
                'status' => true,
                'message' => 'Register Successfully',
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }


    public function update(Request $request , $user_id){
        try {
            if(User::where('email',$request->email)->first()){
                return response()->json(['status' => false,'message' => 'You are already register , please go for login !.',], 401);
            }
            $user = User::find($user_id);
            $user->name = $request->name;
            $user->address = $request->address;
            $user->city = $request->city;
            $user->pincode = $request->pincode;
            $user->save();
            return response()->json(['status'=>true, 'message'=>'User update sucessfuly'],200);

        } catch (\Throwable $th) {
            return response()->json(['status' => false,'message' => $th->getMessage()], 500);
        }
    }

    public function logout()
    {
        try {
        auth()->user()->tokens()->delete();
        auth()->logout();
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
