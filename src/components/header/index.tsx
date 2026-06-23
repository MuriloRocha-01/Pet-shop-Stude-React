import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Header() {
  return (
    <div className="text-[#11381E] bg-[#EAF5E9] py-6 px-[5%] flex justify-between items-center">
      <section>
        <Link to="/">PetLover</Link>
      </section>
      <section className="gap-12 flex">
        <Link to="/" className="font-bold">
          Home
        </Link>
        <Link to="/carrinho" className="font-bold ">
          <ShoppingCart />
        </Link>
      </section>
    </div>
  );
}

export default Header;
