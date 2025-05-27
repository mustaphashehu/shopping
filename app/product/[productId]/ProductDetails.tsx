'use client';

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { Rating } from "@mui/material";
import React, { useCallback, useState } from "react";

interface ProductDetailsProps {
    product: any
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: selectedImgType,
    quantity: number,
    price: number
}

export type selectedImgType = {
    color: string,
    colorCode: string,
    image: string
}

const HorizontalLine = () => <hr className="w-[30%] my-2" />;

const ProductDetails: React.FC<ProductDetailsProps> = ({product}) => {
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: {...product.images[0]},
        quantity: 1,
        price: product.price
    });
    
    const handleColorSelect = useCallback((value: selectedImgType) => {
        setCartProduct((prev) => ({
            ...prev,
            selectedImg: value
        }));
    }, [cartProduct.selectedImg]);

    const handleQtyDecrease = useCallback(() => {
        setCartProduct((prev) => ({
            ...prev,
            quantity: prev.quantity > 1 ? prev.quantity - 1 : 1
        }));
    }, []);

    const handleQtyIncrease = useCallback(() => {
        setCartProduct((prev) => ({
            ...prev,
            quantity: prev.quantity < 99 ? prev.quantity + 1 : 99
        }));
    }, []);
    const productRating = product.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / product.reviews.length;
    return ( 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect}/>
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly/>
                    <div>{product.reviews.length} reviews</div>
                </div>
                <HorizontalLine />
                <div className="text-justify">{product.description}</div>
                <HorizontalLine />
                <div>
                    <span className="font-semibold">CATEGORY: </span> {product.category}
                </div>
                <div>
                    <span className="">BRAND: </span> {product.brand}
                </div>
                <div className={product.inStock ? 'text-teal-400' : "text-rose-400"}>{product.inStock ? "In Stock" : "Out of Stock"}</div>
                <HorizontalLine />
                <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect} />
                <HorizontalLine />
                <SetQuantity cartProduct={cartProduct} handleQtyDecrease={handleQtyDecrease} handleQtyIncrease={handleQtyIncrease} />
                <HorizontalLine />
                <div className="max-w-[300px]">
                    <Button
                    label="Add to Cart"
                    onClick={() => {}}
                    />
                </div>
            </div>
        </div>
     );
}
 
export default ProductDetails;