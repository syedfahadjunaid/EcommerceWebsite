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
        Schema::create('paymentgetways', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('public_key')->nullable();
            $table->string('client_id')->nullable();
            $table->string('production_public_key')->nullable();
            $table->string('secret_key')->nullable();
            $table->string('production_secret_key')->nullable();
            $table->string('production_client_id')->nullable();
            $table->integer('status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paymentgetways');
    }
};
