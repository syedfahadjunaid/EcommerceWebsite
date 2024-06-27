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
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('slug');
            $table->integer('category_id');
            $table->integer('sub_category_id');
            $table->integer('inner_sub_category_id');
            $table->integer('sku');
            $table->integer('stock');
            $table->decimal('mrp',8,2);
            $table->text('specification');
            $table->text('short_desc')->nullable();
            $table->longtext('long_desc')->nullable();
            $table->boolean('new_arrival')->default(0);
            $table->boolean('featured')->default(0);
            $table->boolean('best_seller')->default(0);
            $table->integer('gst');
            $table->boolean('status')->default(1);
            $table->text('images')->nullable();
            $table->timestamps();
          });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
