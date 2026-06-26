import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import { CarrinhoContext } from "../../context/carrinhoContext";
import { useContext } from "react";

function Header() {
  const { qtdItems } = useContext(CarrinhoContext);

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
          {qtdItems > 0 &&  (
            <span className="absolute top-4 right-19 px-2.5 bg-green-400 rounded-full w-6 h-6 flex items-center justify-center"> 
              {qtdItems}
            </span>
          )}
        </Link>
      </section>
    </div>
  );
}

export default Header;
