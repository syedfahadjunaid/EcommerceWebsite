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
        Schema::create('dealofdays', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('link');
            $table->string('alttag');
            $table->string('image');
            $table->integer('category_id');
            $table->integer('sub_category_id');
            $table->integer('product_id');
            $table->date('startdate');
            $table->date('enddate');
            $table->integer('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dealofdays');
    }
};
