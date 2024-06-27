<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('product_id');
            $table->integer('category_id');
            $table->integer('sub_category_id');
            $table->integer('inner_category_id');
            $table->integer('status');//1- oder placed 2- oder processing 3 - shilped order 4-out for delavery , 5->deliverd 0->oder canceled 6 for return 
            $table->integer('address_id');
            $table->integer('payment_mode')->nullable(); // 0 for Cod 1 for online payment 
            $table->integer('patment_status')->nullable(); // 0:fails,1 processing, 3 succefull this is change according to getway status ;  
            $table->integer('quantity');
            $table->integer('cart_id');
            $table->integer('price');
            $table->integer('total_price');
            $table->integer('coupan_id')->nullable();
            $table->integer('payment_received');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
