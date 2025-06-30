"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrice";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps {
    currentUser: SafeUser | null;
}
const CartClient: React.FC<CartClientProps> = ({currentUser}) => {
    const { cartTotalQty, cartProducts, clearCart, cartTotalAmount } = useCart();
    const router = useRouter()
    console.log(cartProducts, "cartProducts in CartClient");

    if (!cartProducts || cartProducts.length === 0) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <h1 className="text-2xl font-semibold">Your cart is empty</h1>
                <Link href={"/"} className="ml-4 text-blue-500 hover:underline">
                    <div className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Start Shopping
                    </div>
                </Link>
            </div>
        );
    }
    return (
        <div>
            <Heading title="Shopping Cart" center />
            <div className="mt-8 grid grid-cols-5 text-xs gap-4 pb-2 items-center">
                <div className="col-span-2 justify-self-start">PRODUCT</div>
                <div className="justify-self-center">PRICE</div>
                <div className="justify-self-center">QUANTITY</div>
                <div className="justify-self-center">TOTAL</div>
            </div>
            <div>
                {cartProducts && cartProducts.map((product) => {
                    return (
                        <ItemContent key={product.id} item={product} />
                    );
                })}
            </div>
            <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
                <div className="w-[90px]">
                    <Button label="Clear Cart" onClick={() => clearCart()} small outline />
                </div>
                <div className="text-sm flex flex-col gap-1 items-start">
                    <div className="flex justify-between w-full text-base font-semibold">
                        <span>Subtotal</span>
                        <span>{formatPrice(cartTotalAmount)}</span>

                    </div>
                    <p className="text-slate-500">Taxes and Shipping calculate at checkout</p>
                    <Button label={currentUser ? "Checkout" : "Login to checkout"} onClick={() => {currentUser ? router.push("/checkout") : router.push("/login")}} />
                    <Link href={"/"} className="text-blue-500 hover:underline mt-2">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartClient;