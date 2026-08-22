<?php

namespace App\Models\kencana;

use Illuminate\Foundation\Auth\User as Authenticatable;

class KcnSuratPesanan extends Authenticatable
{
    protected $connection = 'ConnKCNSales';
    protected $table = 'VW_WEB_4384_LIST_SP_AKTIF_BELUM_LUNAS';
    protected $primaryKey = 'IDPesanan';
    protected $fillable = [
        'IDSuratPesanan',
        'Tgl_Pesan',
        'IDCust',
        'NamaCust',
        'NamaSales',
        'JnsSuratPesanan',
    ];
    public $timestamps = false;
}
