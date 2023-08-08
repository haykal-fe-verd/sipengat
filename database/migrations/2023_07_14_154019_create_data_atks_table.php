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
        Schema::create('tb_data_atk', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pemasukan_id');
            $table->unsignedBigInteger('kategori_id');
            $table->integer('stok');
            $table->timestamps();

            $table->foreign('pemasukan_id')
                ->references('id')
                ->on('tb_pemasukan')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('kategori_id')
                ->references('id')
                ->on('tb_kategori')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_data_atk');
    }
};
