'use client';

import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
    cartTotalQty: number;
    cartProducts: CartProductType[] | null;
    handleAddproductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    clearCart: () => void;
    cartTotalAmount: number;
    paymentIntent: string | null,
    handleSetPaymentIntent: (val: string | null) => void
}
export const CartContext = createContext<CartContextType | null>(null)

interface props {
    [propName: string]: any;
}
export const CartContextProvider = (props: props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)

    useEffect(() => {
        const cartItems: any = localStorage.getItem("eShopCartItems");
        const parsedCartItems: CartProductType[] | null = JSON.parse(cartItems);
        const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent")
        const paymentIntent: string | null = JSON.parse(eShopPaymentIntent)

        setCartProducts(parsedCartItems);
        setPaymentIntent(paymentIntent)
    }, [])

    const handleAddproductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            const updatedCartProducts = prev ? [...prev, product] : [product];
            // toast.success("Product added to cart");
            localStorage.setItem("eShopCartItems", JSON.stringify(updatedCartProducts));
            return updatedCartProducts;
        });
    }, [])

    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            if (!prev) return null;
            const updatedCartProducts = prev.filter((item) => item.id !== product.id);
            localStorage.setItem("eShopCartItems", JSON.stringify(updatedCartProducts));
            return updatedCartProducts.length > 0 ? updatedCartProducts : null;
        });
    }, [])

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {

        if (product.quantity === 99) {
            return toast.error("You can only add 99 items of a product to the cart");
        }

        setCartProducts((prev) => {
            if (!prev) return null;
            const updatedCartProducts = prev.map((item) => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            localStorage.setItem("eShopCartItems", JSON.stringify(updatedCartProducts));
            return updatedCartProducts;
        });

    }, [cartProducts]);

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {

        if (product.quantity === 1) {
            return toast.error("oops! minimum quantity is 1");
        }

        setCartProducts((prev) => {
            if (!prev) return null;
            const updatedCartProducts = prev.map((item) => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
            localStorage.setItem("eShopCartItems", JSON.stringify(updatedCartProducts));
            return updatedCartProducts;
        });

    }, [cartProducts]);

    const clearCart = useCallback(() => {
        setCartProducts(null);
        setCartTotalQty(0);
        localStorage.removeItem("eShopCartItems");
        toast.success("Cart cleared successfully");
    }, [cartProducts])


    useEffect(() => {
        if (!cartProducts || cartProducts.length === 0) {
            setCartTotalAmount(0);
            return;
        }

        const totalQty = cartProducts.reduce((acc, item) => acc + item.quantity, 0);
        const totalAmount = cartProducts.reduce((acc, item) => acc + item.quantity * item.price, 0);
        setCartTotalAmount(totalAmount);
        setCartTotalQty(totalQty);

    }, [cartProducts]);


    const handleSetPaymentIntent = useCallback((val: string | null) => {
        setPaymentIntent(val)
        localStorage.setItem("eShopPaymentIntent", JSON.stringify(val))
    },[paymentIntent])




    const value = {
        cartTotalQty,
        cartProducts,
        handleAddproductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        clearCart,
        cartTotalAmount,
        paymentIntent,
        handleSetPaymentIntent
    };
    return <CartContext.Provider value={value} {...props} />
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartContextProvider");
    }
    return context;
}