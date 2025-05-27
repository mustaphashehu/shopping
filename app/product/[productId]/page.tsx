import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import {product} from "@/utils/product"; // Assuming you have a product utility to fetch product details
import ListRating from "./ListRating";

interface IPrams {
    productId?: string
}
const Product = ({params}: {params: IPrams}) => {
    console.log(params);
    
    return ( 
        <div className="p-8">
            <Container>
                <ProductDetails product={product}/>
                <div className="flex flex-col gap-4 mt-20">
                    <div>Add Rating</div>
                    <ListRating product={product} />
                </div>
            </Container>
        </div>
     );
}
 
export default Product;