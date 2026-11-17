import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import { CarrinhoContext } from "../../context/carrinhoContext";
import { useContext } from "react";

function Header() {
  const { qtdItems } = useContext(CarrinhoContext);

  return (
    <header className="sticky top-0 z-10 text-[#11381E] bg-[#EAF5E9] py-4 px-[5%] flex justify-between items-center shadow-sm">
      <Link to="/" className="text-xl font-bold">
        PetLover
      </Link>
      <nav className="flex items-center gap-6 sm:gap-12">
        <Link to="/" className="font-bold hover:underline">
          Home
        </Link>
        {/* "relative" prende a bolinha ao ícone: ela acompanha o carrinho em qualquer tela */}
        <Link to="/carrinho" aria-label={`Carrinho, ${qtdItems} itens`} className="relative font-bold">
          <ShoppingCart />
          {qtdItems > 0 && (
            <span className="absolute -top-2 -right-3 min-w-5 h-5 px-1 bg-green-400 text-xs rounded-full flex items-center justify-center">
              {qtdItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
