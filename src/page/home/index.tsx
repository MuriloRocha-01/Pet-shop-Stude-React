import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarrinhoContext } from "../../context/carrinhoContext";
import { ShoppingCart } from "lucide-react";


interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}


function Home() {
  const { adicionarItem } = useContext(CarrinhoContext);

  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/products");
      setProducts(response.data);
    }

    getProducts();
  }, []);

  return (
    <div className="flex flex-row items-center justify-center py-[5%] px-[5%] flex-wrap gap-8">
      {products.map((product) => {
        return (
            <section
              key={product.id}
              className="w-80 border-2 border-gray-200 rounded-[1rem] overflow-hidden flex flex-col gap-3"
            > 
              <Link to={`/produto/${product.id}`}>
              <img
                src={product.cover}
                alt={product.title}
                className="w-80 h-80"
              ></img>
              <h2 className="text-lg text-center">{product.title}</h2>
              </Link>
              <div className="flex flex-row justify-between p-4">
                <button className="rounded-lg w-10 h-10 border-2 border-gray-300 text-black text-center flex items-center justify-center" onClick={()=> adicionarItem(product)}><ShoppingCart /></button>
                <p className="text-[1.5rem]">R$ {product.price}</p>
              </div>
            </section>
        );
      })}
    </div>
  );
}

export default Home;
