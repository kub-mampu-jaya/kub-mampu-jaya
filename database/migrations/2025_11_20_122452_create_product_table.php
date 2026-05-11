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
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('category');
            $table->decimal('price_origin', 10, 2)->nullable();
            $table->decimal('price_discount', 10, 2);
            $table->integer('quantity')->default(0);
            $table->string('image')->nullable();
            $table->boolean('popular')->default(false);
            $table->decimal('rating', 2, 1)->default(0);
            $table->string('preparation_time')->nullable();
            $table->string('badge')->nullable();
            $table->json('food_type')->nullable();
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
