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
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone_number')->nullable();
            $table->date('birth_date')->nullable();
            $table->string('gender')->nullable();
            $table->string('street')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('label')->nullable();
            $table->string('alt_street')->nullable();
            $table->string('alt_city')->nullable();
            $table->string('alt_state')->nullable();
            $table->string('alt_label')->nullable();
            $table->string('role')->default('user');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'phone_number',
                'birth_date',
                'gender',
                'street',
                'city',
                'state',
                'label',
                'alt_street',
                'alt_city',
                'alt_state',
                'alt_label',
                'role',
            ]);
        });
    }
};
