<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Page;

class PageController extends Controller
{
    public function pagetitle(){
        try{
            $page = Page::select('title')->get();
            if(!$page){
                return response()->json(['message'=>'Page data is not find'],404);
            }
            return response()->json(['message'=>'Page data get successfully','data'=>$page],200);
        }catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json([
                'message' => 'Something goes wrong while deleting a user!!'
            ]);
        }
    }

    public function store(Request $request){
        try{
            $page = new Page();
            $page->title = $request->title;
            $page->slug = $request->slug;
            $page->save();
            return response()->json(['message'=>'Page created sucessfully']);
        }catch(\Exception $e){
            Log::error($e->getMessage());
            return response()->json([
                'message'=>'Something goes wrong while creating a page!!'
            ],500);
        }
    }

    public function getOnepages($id){
        try {
            $page = Page::find($id);
            return response()->json(['message'=>'Page data get successfully' ,'page'=>$page],200);
        } catch (\Throwable $th) {
            return response()->json(['message'=>'Something goes wrong while getting a page!!'],500);
        }
    }

    public function update(Request $request, $id){
        try {
            $page = Page::find($id);
            if(!$page){
                return response()->json(['message'=>'Page is not fint'],404);
            }
            $page->slug = $request->slug;
            $page->save();
            return response()->json(['message'=>'page data update successfully' , 'page'=>$page],200 );
        } catch (\Throwable $th) {
            return response()->json(['message'=>'Something goes wrong while Upadating a page!!'],500);
        }
    }
        
}
