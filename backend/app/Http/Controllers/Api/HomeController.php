<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Banner;
use App\Models\Product;
use App\Models\Category;
use App\Models\Dealofday;
use App\Models\Header;
use App\Models\SubCategory;
use App\Models\Page;
use App\Models\Popup;
use Illuminate\Support\Facades\Log;

class HomeController extends Controller
{
    Public $data=[];
    public function index()
    {
        $data['banner'] = Banner::select('id','title','link','alt_tag',\DB::raw('CONCAT("'.asset('storage/banner').'/", image) as image'))->get();
        $data['product'] = Product::with('image')->where('status',1)->get();
        $data['new_arrival'] = Product::with('image')->where('new_arrival',1)->where('status',1)->get();
        $data['featured'] = Product::with('image')->where('featured',1)->where('status',1)->get();
        $data['best_seller'] = Product::with('image')->where('best_seller',1)->where('status',1)->get();
        $data['categories'] = Category::with('subcategory')->get();
        return response()->json([
            'status'=>true,
            'data'=>$data
        ]);
    }

        public function search(Request $request)
    {
        $dataSearch = Product::where('title','LIKE','%'.$request->search.'%')->get();
        return response()->json([
           'status'=>true,
           'searchdata'=>$dataSearch
        ]);
    }

    public function categoryFillter(Request $request)
    {
        $filterCategory = Category::where('title','LIKE','%'.$request->search.'%')->get();
        return response()->json([
           'status'=>true,
           'searchdata'=>$filterCategory
        ]);
    }

    public function subCategoryFillter(Request $request)
    {
        $filterSubCategory = SubCategory::where('title','LIKE','%'.$request->search.'%')->get();
        return response()->json([
           'status'=>true,
           'searchdata'=>$filterSubCategory
        ]);
    }

    public function pages_title(){
        try{
            $page = Page::get();
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

    public function getOnepages($id){
        try {
            $page = Page::find($id);
            return response()->json(['message'=>'Page data get successfully' ,'page'=>$page],200);
        } catch (\Throwable $th) {
            return response()->json(['message'=>'Something goes wrong while getting a page!!'],500);
        }
    }

    public function popupone($id){
        try {
            $popup = Popup::where('id',$id)->get();
            return response()->json(['message'=>'Pop up data get successfully' ,'Pop_up'=>$popup],200);
        } catch (\Throwable $th) {
            return response()->json(['message'=>'Something goes wrong while getting a page!!'],500);
        }
    }

    public function deal_of_day(){
        try {
            $deal_of_day = Dealofday::get();
            return response()->json(['message'=>'Pop up data get successfully' ,'deal_of_day'=>$deal_of_day],200);
        } catch (\Throwable $th) {
            return response()->json(['message'=>'Something goes wrong while getting a page!!'],500);
            
        }
    }

    public function header(){
        try {
            $header = Header::with('subHeaders')->get();
            return response()->json(['message'=>'header data get successfully' ,'header'=>$header],200);
        } catch (\Throwable $th) {
            return response()->json(['message'=>'Something goes wrong while getting a header!!'],500);
        }
    }
}
