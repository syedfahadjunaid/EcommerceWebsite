<?php


use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::group(['namespace' => 'Api'], function()
{
         ///Admin Routes
        Route::group(['namespace' => 'Admin','prefix'=>'admin'], function()
        {
            Route::controller(LoginController::class)->group(function () {
                Route::post('login','login');
                Route::get('logout','logout');
            });
            Route::group(['middleware' => ['auth:sanctum','admin']],function()
                {
                    Route::apiResource('category',CategoryController::class);
                    Route::apiResource('subcategory',SubCategoryController::class);
                    Route::apiResource('product',ProductController::class);
                    Route::apiResource('banner',BannerController::class);
                    Route::apiResource('user',UserController::class);
                    Route::controller(CommonController::class)->group(function(){
                        Route::get('getsubcategory/{id}','getSubcategory');
                    });
                    Route::controller(InterSubCategoryController::class)->group(function(){
                        Route::get('all-InnerSubCategory','index');
                        Route::post('InnerSubCategory-create','store');
                        Route::get('Get-one-InnerSubCategory/{id}','getOne');
                        Route::post('InnerSubCategory-update/{id}','update');
                    });

                    Route::controller(PageController::class)->group(function(){
                        Route::get('Pages','pagetitle');
                        Route::post('Pages','store');
                        Route::get('Pages/{id}','getOnepages');
                        Route::post('Pages/{id}','update');
                    });
                    Route::controller(DealBannerController::class)->group(function(){
                        Route::get('Deal-of-day-all-banner','index');
                        Route::post('Deal-of-day-create','store');
                        Route::get('Get-one-deal-of-day/{id}','getOne');
                        Route::post('deal-od-day-update/{id}','update');
                        Route::post('deal-od-day-update-status/{id}','update_status');

                        Route::delete('Deal-of-day-delete/{id}','delete');
                    });
                    Route::controller(PopupController::class)->group(function(){
                        Route::get('popup-all-banner','index');
                        Route::post('popup-create','store');
                        Route::get('Get-one-popup/{id}','getOne');
                        Route::post('popup-update/{id}','update');
                        Route::delete('popup-delete/{id}','delete');
                    });
                    Route::controller(ProductreviewController::class)->group(function(){
                        Route::get('Productreview-all-banner','index');
                        Route::post('Productreview-create','store');
                        Route::get('Get-one-Productreview/{id}','getOne');
                        Route::post('Productreview-update/{id}','update');
                    });
                    Route::controller(SubscribersController::class)->group(function(){
                        Route::get('Subscribers-all-banner','index');
                        Route::post('Subscribers-create','store');
                        Route::get('Get-one-Subscribers/{id}','getOne');
                        Route::post('Subscribers-update/{id}','update');
                    });
                    Route::controller(HelpController::class)->group(function(){
                        Route::get('help-all','index');
                        Route::post('help-create','store');
                        Route::get('Get-one-help/{id}','getOne');
                        Route::post('help-update/{id}','update');
                    });

                    Route::controller(PaymentgetwayController::class)->group(function(){
                        Route::get('Payment-Getway-all','index');
                        Route::post('Payment-Getway-create','store');
                        Route::get('Get-one-Payment-Getway/{id}','getOne');
                        Route::post('Payment-Getway-update/{id}','update');
                        Route::post('deal-od-day-update-status/{id}','update_status');
                    });
                    Route::controller(IconsController::class)->group(function(){
                        Route::get('all-Icons','index');
                        Route::post('Icons-create','store');
                        Route::get('Get-one-Icons/{id}','getOne');
                        Route::post('Icons-update/{id}','update');
                    });
                    Route::controller(ReturnConditionController::class)->group(function(){
                        Route::get('all-ReturnCondition','index');
                        Route::post('ReturnCondition-create','store');
                        Route::get('Get-one-ReturnCondition/{id}','getone');
                        Route::post('ReturnCondition-update/{id}','update');
                    });

                    Route::controller(CoupansController::class)->group(function(){
                        Route::get('all-Coupans','index');
                        Route::post('Coupans-create','store');
                        Route::get('Get-one-Coupans/{id}','getone');
                        Route::post('Coupans-update/{id}','update');
                    });

                    Route::controller(ContactUsController::class)->group(function(){
                        Route::get('all-contact-us','index');
                        Route::get('contact-us/{id}','getOne');
                    });

                    Route::controller(WebsiteController::class)->group(function(){
                        Route::get('website-setiing-title','index');
                        Route::get('website-setiing-title/{id}','getone');
                        Route::post('website-setiing-title/update/{id}','update');
                        Route::post('website-setiing-title/create','store');
                    });

                    Route::controller(WebsiteAnayliecesController::class)->group(function(){
                        Route::get('website-analysis-title','index');
                        Route::get('website-analysis-title/{id}','getone');
                        Route::post('website-analysis-title/update/{id}','update');
                        Route::post('website-analysis-title/update-status/{id}','update_status');

                        Route::post('website-analysis-title/create','store');
                        
                    });

                    Route::controller(HeaderController::class)->group(function(){
                        Route::get('header','index');
                        Route::get('header/{id}','getone');
                        Route::post('header/update/{id}','update');
                        Route::post('header/create','store');
                        Route::post('header/delete/{id}','delete');

                    });

                    Route::controller(Sub_headerController::class)->group(function(){
                        Route::get('sub-header','index');
                        Route::get('sub-header/$id','getone');
                        Route::post('sub-header/update/{id}','update');
                        Route::post('sub-header/create','store');
                    });

                    Route::controller(ShippingController::class)->group(function(){
                        Route::get('shipping','index');
                        Route::get('shipping/{id}','getone');
                        Route::post('shipping/update/{id}','update');
                        Route::post('shipping/create','store');
                    });

                    Route::controller(UpdateController::class)->group(function(){
                        Route::post("/product/update/{id}",'product_update');
                        Route::post("/update_banner_status/{id}",'update_banner_status');
                        Route::post("/user_status_update/{id}",'user_status_update');
                        Route::post("/update_category_status/{id}",'update_category_status');
                        Route::post("/product/status_update/{id}",'status_update');


                    });
            });

        });
          ///User Authentication
            Route::controller(LoginController::class)->group(function () {
                    Route::post('register','register');
                    Route::post('login','login');
                    Route::post('update/{id}','update');
                    Route::get('logout','logout');
                });
            Route::controller(HomeController::class)->group(function(){
                Route::get('home','index');
                Route::get('search','search');
                Route::get('category-fillter','categoryFillter');
                Route::get('sub-category-fillter','subCategoryFillter');
                Route::get('pages-title','pages_title');
                Route::get('page/{$id}' ,'getOnepages');
                Route::get('popup/{id}','popupone');
                Route::get('deal_of_day','deal_of_day');
                Route::get('header-data','header');

            });

            Route::controller(ProductController::class)->group(function(){
                Route::get('get-all-product','getallproduct');
                Route::get('get-one-product/{id}','get_one');
                Route::get('get-product-by-category/{category_id}','get_product_by_category');
                Route::get('get-product-by-sub-category/{sub_category_id}','get_product_by_sub_category');
                Route::get('new-arrival-product','new_arrivals_product');
                Route::get('best-seller-product','best_seller_product');
                Route::get('new-arrival-product','new_arrivals_product');
                Route::get('featured-product','featured_product');
                Route::get('create-product-wishlist','wishlist_store');
                Route::get('get-product-whishlist/{user_id}','wishlistget');
                Route::post('remove-wishlish/{id}', 'removewishlist');
                Route::get('get-category', 'get_all_category');
            });
            Route::controller(ContactUsController::class)->group(function(){
                Route::post('contact_us','stror');
            });

            Route::controller(CratController::class)->group(function(){
                Route::get('/product-cart/{user_id}', 'cart_by_user');
                Route::post('/product-cart-create', 'store');
                Route::post('/product-cart-update/{id}', 'update');
                Route::post('/product-cart-remove/{id}', 'remove');
            });
            Route::controller(IconsController::class)->group(function(){
                Route::get('all-Icons','index');
                Route::get('Get-one-Icons/{id}','getOne');
                Route::get('get-website-setting',"getwebsitesetting");
            });

            Route::controller(ReviewsController::class)->group(function(){
                Route::get('Productreview-all-banner/{product_id}','index');
                Route::post('Productreview-create','store');
                Route::get('Get-one-Productreview/{id}','getOne');
                Route::post('Productreview-update/{id}','update');
            });
            Route::controller(CupansController::class)->group(function(){
                Route::post('coupans-varifaction','varification_coupana');
            });

            Route::controller(OrderController::class)->group(function(){
                Route::get('Order/{id}','index');
                Route::post('Order/placed','store');
            });
            Route::group(['namespace' => 'CMS'], function () {
                Route::controller(AboutusController::class)->group(function(){
                    Route::get('about-us','index');
                });
            });

});