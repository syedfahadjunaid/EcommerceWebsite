<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Header extends Model
{
    use HasFactory;
    public function subHeaders()
    {
        return $this->hasMany(Sub_header::class, 'header_id');
    }
}
