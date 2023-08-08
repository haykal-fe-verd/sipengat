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
        Schema::create('tb_pemasukan', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('supplier_id');
            $table->unsignedBigInteger('satuan_id');
            $table->string('nomor_faktur');
            $table->string('jenis_atk');
            $table->date('tanggal_masuk');
            $table->integer('jumlah_masuk');
            $table->timestamps();

            $table->foreign('supplier_id')
                ->references('id')
                ->on('tb_supplier')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('satuan_id')
                ->references('id')
                ->on('tb_satuan')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_pemasukan');
    }
};
