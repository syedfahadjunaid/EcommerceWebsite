<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'image',
    ];
    
    
    public function subcategory()
    {
        return $this->hasMany(SubCategory::class);
    }

    public function getImageAttribute($image)
    {
       
         $url=asset('storage/category/'.$image);
        
        return $url;
    }

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];
}
