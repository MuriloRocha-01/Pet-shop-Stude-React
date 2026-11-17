import { useEffect, useState } from "react";
import { getProducts } from "../../services/api";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarrinhoContext } from "../../context/carrinhoContext";
import { Check, ShoppingCart } from "lucide-react";
import type { ProductsProps } from "../../types/product";
import { moeda } from "../../utils/moeda";


function Home() {
  const { adicionarItem } = useContext(CarrinhoContext);

  const [products, setProducts] = useState<ProductsProps[]>([]);
  // Feedback visual: por 1,5s o botão do produto adicionado mostra "Adicionado"
  const [adicionadoId, setAdicionadoId] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      const data = await getProducts();
      setProducts(data);
    }

    load();
  }, []);

  useEffect(() => {
    if (adicionadoId === null) return;
    const timer = setTimeout(() => setAdicionadoId(null), 1500);
    return () => clearTimeout(timer);
  }, [adicionadoId]);

  function adicionar(product: ProductsProps) {
    adicionarItem(product);
    setAdicionadoId(product.id);
  }

  return (
    <div className="py-8 px-[5%] max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Produtos <span className="text-gray-600 font-normal text-base">({products.length})</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const adicionado = adicionadoId === product.id;
          return (
            <article
              key={product.id}
              className="w-full border-2 border-gray-300 rounded-[1rem] overflow-hidden flex flex-col hover:shadow-md hover:border-gray-400 transition"
            >
              <Link
                to={`/produto/${product.id}`}
                className="flex flex-col flex-1 border-b border-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-600"
              >
                <img
                  src={product.cover}
                  alt={product.title}
                  loading="lazy"
                  className="w-full aspect-square object-contain p-2"
                ></img>
                {/* 2 linhas fixas: os cards ficam alinhados mesmo com títulos de tamanhos diferentes */}
                <h2 className="text-lg text-center px-3 pb-3 line-clamp-2 min-h-[4.25rem]">{product.title}</h2>
              </Link>
              <div className="flex flex-col gap-3 p-4">
                <p className="text-[1.5rem] font-semibold">{moeda(product.price)}</p>
                <button
                  onClick={() => adicionar(product)}
                  aria-label={`Adicionar ${product.title} ao carrinho`}
                  className={
                    "w-full min-h-12 px-4 rounded-lg border-2 flex items-center justify-center gap-2 font-semibold transition " +
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 " +
                    (adicionado
                      ? "border-green-700 bg-green-700 text-white"
                      : "border-gray-400 text-black hover:bg-gray-100")
                  }
                >
                  {adicionado ? <Check /> : <ShoppingCart />}
                  <span>{adicionado ? "Adicionado" : "Adicionar"}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
