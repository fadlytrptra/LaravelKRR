<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class UserDiv extends Authenticatable
{
    protected $connection = 'ConnPurchase';
    protected $table = 'YUSER_DIVISI';

    public $timestamps = false;
}
