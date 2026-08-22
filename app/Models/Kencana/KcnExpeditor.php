<?php

namespace App\Models\Kencana;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class KcnExpeditor extends Authenticatable
{
    protected $connection = 'ConnKCNSales';
    protected $table = 'T_Expeditor';
    protected $primaryKey = 'IDExpeditor';
    protected $fillable = [
        'IDExpeditor',
        'NamaExpeditor',
        'ContactPerson',
        'Alamat',
        'Kota',
        'Propinsi',
        'Negara',
        'KodePos',
        'NoTelp1',
        'NoTelp2',
        'NoFax1',
        'NoFax2',
        'NoHp1',
        'NoHp2',
        'NoTelex',
        'Email',
        'IsActive',
    ];
    protected $casts = [
        'IDExpeditor' => 'string',
    ];
    public $timestamps = false;
}
