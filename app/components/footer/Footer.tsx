import Link from "next/link";
import Container from "../Container";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

interface FooterListProps {
    children: React.ReactNode;
}
const FooterList: React.FC<FooterListProps> = ({children}) => {
    return ( 
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-6 flex flex-col gap-2">
            {children}
        </div>
     );
}
 
const Footer = () => {
    const currentYear = new Date().getFullYear();
    return ( 
        <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">shop category</h3>
                        <Link href="#">Phones</Link>
                        <Link href="#">Laptops</Link>
                        <Link href="#">Desktops</Link>
                        <Link href="#">Watches</Link>
                        <Link href="#">TVs</Link>
                        <Link href="#">Accessories</Link>
                    </FooterList>

                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Customer Service</h3>
                        <Link href="#">Contact Us</Link>
                        <Link href="#">Shipping policy</Link>
                        <Link href="#">Returns & Exchanges</Link>
                        <Link href="#">Watches</Link>
                        <Link href="#">TVs</Link>
                        <Link href="#">FAQs</Link>
                    </FooterList>

                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-base font-bold mb-2">About Us</h3>
                        <p className="mb-2"> At our elecrtonics store. we are dedicated to providing the latest and greatest devices and accessories to our customers. with a wide selection of phones, TVs, laptops, watches and accessories.</p>
                        <p>&copy; {currentYear !== null ? currentYear : ""} E-Shop. All rights reserved</p>
                    </div>

                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Follow Us</h3>
                        <div className="flex gap-2">
                            <Link href="#"><MdFacebook size={24} /></Link>
                            <Link href="#"><AiFillTwitterCircle size={24} /></Link>
                            <Link href="#"><AiFillInstagram size={24} /></Link>
                            <Link href="#"><AiFillYoutube size={24} /></Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
     );
}

export default Footer;