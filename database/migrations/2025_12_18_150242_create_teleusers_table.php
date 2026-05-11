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
       Schema::create('teleusers', function (Blueprint $table) {
            $table->id(); // bigint unsigned auto increment
            $table->unsignedBigInteger('users_id')->nullable();
            $table->bigInteger('chat_id');
            $table->string('name');
            $table->string('languange_code');
            $table->timestamps();

            $table->foreign('users_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teleusers');
    }
};
