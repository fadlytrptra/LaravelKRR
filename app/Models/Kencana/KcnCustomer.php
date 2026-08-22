<?php

namespace App\Models\Kencana;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class KcnCustomer extends Authenticatable
{
	protected $connection = 'ConnKCNSales';
    protected $table = 'T_Customer';
    protected  $primaryKey = 'IDCust';
    // protected $fillable = ['KodeCust', 'JnsCust', 'NamaCust', 'NPWP', 'LimitBeli', 'ContactPerson',
    // 'AlamatKirim', 'Alamat', 'Kota', 'Propinsi', 'Negara', 'KodePos', 'NoTelp1', 'NoTelp2', 'NoFax1', 'NoFax2',
    // 'NoHp1', 'NoHp2', 'NoTelex', 'Email', 'NamaNPWP', 'AlamatNPWP', 'TimeInput', 'KdArea_Ppn', 'UserInput',
    // 'UserUpdate', 'TglUpdate', 'KotaKirim'];
    protected $fillable = [
        'IDCust',
        'KodeCust',
        'JnsCust',
        'NamaCust',
        'NPWP',
        'LimitBeli',
        'ContactPerson',
        'AlamatKirim',
        'Alamat',
        'Kota',
        'Propinsi',
        'Negara',
        'KodePos',
        'NoTelp1',
        'NoTelp2',
        'NoHp1',
        'NoHp2',
        'NoTelex',
        'Email',
        'NamaNPWP',
        'AlamatNPWP',
        'TimeInput',
        'KdArea_Ppn',
        'UserInput',
        'UserUpdate',
        'TglUpdate',
        'KotaKirim'
    ];
    protected $casts = [
        'IDCust' => 'string',
    ];
    public $timestamps = false;
}
