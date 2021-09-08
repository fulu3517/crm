<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'name'=>'required',
            'email'=>'required|string|email|unique:users',
            'password'=>'required|string|confirmed'
        ]);

        // burada validasyon faile düşerse return yapılacak
        $user = new User([
            'name'=>$request->name,
            'email'=>$request->email,
            // 'password'=> Hash::make($request->password),
            'password'=>md5($request->password) //md5 ile yapınca vendordan değiştirmek gerekiyor
        ]);
        $user->save();

        $crendentials = [
                'email'=>$request->email,
                'password'=> $request->password
        ];

        if(!Auth::attempt($crendentials)) {
            return response()->json([
                'message' => 'Lütfen giriş bilgilerinizi kontrol ediniz'
            ], 401);
        }
        $user = $request->user();

        $tokenResult = $user->createToken('Personal Access');
        $token = $tokenResult->token;

        if($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }
        $token->save();

        return response()->json([
            'success' => true,
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
        ], 201);
    }

    public function login(Request $request){
        $request->validate([
            'email'=>'required|string|email',
            'password'=>'required|string',
            'remember_me'=>'boolean'
        ]);
        $credentials = request(['email','password']);

        if(!Auth::attempt($credentials)){
            return response()->json([
                'message'=>'Bilgiler Hatalı Kontrol Ediniz'
            ],401);
        }

        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if($request->remember_me){
            $token->expires_at = Carbon::now()->addWeeks(1);
        }
        $token->save();
        return response()->json([
            'success'=>true,
            'id'=>$user->id,
            'name'=>$user->name,
            'email'=>$user->email,
            'access_token'=>$tokenResult->accessToken,
            'token_type'=>'Bearer',
            'expires_at'=>Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
        ],201);
    }

    public function logout( Request $request ) {
        $request->user()->token()->revoke(); // Buraları parantezli yaptı. fonksiyon gibi

        return response()->json([
            'message' => 'Başarıyla çıkış yapıldı'
        ]);
    }

    public function user(Request $request) {
        return response()->json($request->user());
    }

    public function authenticate(Request $request){
        $user = [];

        if(Auth::check()){
            $user = $request->user();
        }
        return response()->json([
            'user'=>$user,
            'isLoggedIn'=>Auth::check()
        ]);
    }
}
