<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable=[
                'id',
                'title',
                'slug',
                'category_id',
                'sub_category_id',
                'sku',
                'innersub_category_id',
                'mrp',
                'price',
                'specification',
                'short_desc',
                'long_desc',
                'new_arrival',
                'featured',
                'best_seller',
                'status',
                'gst',
                'stock',
                'images'
    ];

    public function image()
    {
        return $this->hasOne(ProductImage::class);
    }
    
    
    public function getCategoryIdAttribute($id)
    {
        $cat=Category::select('id','title')->where('id',$id)->first();
        return $cat;
    }
    public function getSubCategoryIdAttribute($id)
    {
        $cat=SubCategory::select('id','title')->where('id',$id)->first();
        return $cat;
    }
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];
}
