<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'image',
    ];
    
    public function getImageAttribute($image)
    {
        $images=json_decode($image);
        foreach($images as $key=>$image){
            $url[]=asset('storage/product/'.$image);
        }
        return $url;
    }
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];
}
