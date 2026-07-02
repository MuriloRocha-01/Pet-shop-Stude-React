import { useContext } from "react";
import { CarrinhoContext } from "../../context/carrinhoContext";

function Card() {
  const { items, qtdItems } = useContext(CarrinhoContext);
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full h-full p-[3%]">
      <section className="flex flex-col gap-4 w-full md:w-[70%] h-full ">
      <h2 className="text-xl font-bold text-start">Meu carrinho</h2>
      {items.map((item) => {
        return (
          <div className="flex items-center gap-4 border-b border-gray-400" key={item.id}>
            <img src={item.cover} className="w-64 h-64"></img>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-semibold ">{item.title}</h1>
              <span>R$ {item.price}</span>
            </div>
          </div>
        );
      })}
      </section>
      <section className="p-4 flex flex-col gap-4 w-full md:w-[40%] h-full border border-gray-400 rounded-lg">
        <h2 className="text-xl font-bold text-start ">Resumo do pedido</h2>
        <span className="border-b border-gray-400"></span>
        <p>Total: </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Finalizar Compra
        </button>
      </section>


      {qtdItems < 1 && (
        <span className="text-gray-500">
          {" "}
          Você não adicionou nenhum produto ainda!{" "}
        </span>
      )}
    </div>
  );
}

export default Card;
