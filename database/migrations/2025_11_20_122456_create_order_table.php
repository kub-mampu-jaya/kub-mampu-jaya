<?php

use App\Models\Courier;
use App\Models\ShopBranch;
use App\Models\User;
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
            $table->id()->autoIncrement();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(ShopBranch::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Courier::class)->nullable()->constrained()->nullOnDelete();

            // --- Required for Midtrans ---
            $table->string('order_id')->unique();
            $table->integer('total_amount');
            $table->string('payment_type')->nullable();
            $table->timestamp('paid_at')->nullable();
            // ---

            $table->string('payment_method', 50);
            $table->string('status', 50)->default('cooking');
            $table->string('payment_status', 50)->default('created');
            
            $table->decimal('subtotal', 10, 2);
            $table->decimal('delivery_fee', 10, 2);
            $table->decimal('total', 10, 2);

            $table->timestamp('confirmed_at')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->timestamp('estimated_delivery_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
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
