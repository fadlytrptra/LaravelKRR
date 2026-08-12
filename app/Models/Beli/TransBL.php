<?php

namespace App\Models\Beli;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class TransBL extends Authenticatable
{
    // TAMBAHKAN FILTER UNTUK KRR
    protected $connection = 'ConnPurchase';
    protected $table = 'YTRANSBL';
    protected $fillable = ['Tgl_batal_Acc','Batal_acc','Direktur','Dir_Agree','Tgl_Direktur','StatusOrder','Tgl_acc','Manager'];
    public $timestamps = false;
}
