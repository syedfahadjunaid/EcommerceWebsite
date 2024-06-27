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
        Schema::create('coupans', function (Blueprint $table) {
            $table->id();
            $table->string('coupan_code');
            $table->integer('discount');
            $table->integer('categories_id')->nullable();
            $table->integer('sub_categories_id')->nullable();
            $table->integer('inner_subcategories_id')->nullable();
            $table->integer('product_id')->nullable();
            $table->string('new_user')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupans');
    }
};
