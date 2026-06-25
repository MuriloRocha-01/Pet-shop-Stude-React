import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarrinhoContext } from "../../context/carrinhoContext";


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
              className="w-80 shadow-xl rounded-lg overflow-hidden flex flex-col gap-3"
            > 
              <Link to={`/produto/${product.id}`}>
              <img
                src={product.cover}
                alt={product.title}
                className="w-80 h-80"
              ></img>
              <h2 className="text-lg font-bold text-center">{product.title}</h2>
              </Link>
              <button className="p-3 bg-red-400 text-white" onClick={()=> adicionarItem(product)}>Adicionar ao carrinho</button>
            </section>
        );
      })}
    </div>
  );
}

export default Home;
