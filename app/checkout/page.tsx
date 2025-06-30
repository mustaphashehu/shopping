import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import CheckOutClient from "./CheckOutClient";

const CheckOut = () => {
    return ( 
        <div className="p-8">
            <Container>
                <FormWrap>
                    <CheckOutClient />
                </FormWrap>
            </Container>
        </div>
     );
}
 
export default CheckOut;