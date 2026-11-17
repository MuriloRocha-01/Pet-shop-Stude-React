import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CarrinhoContext } from "../../context/carrinhoContext";

import { moeda } from "../../utils/moeda";

// Botões de toque com 44px (mínimo recomendado) e foco visível para teclado.
const botaoQtd =
  "w-11 h-11 border border-gray-400 rounded-lg flex items-center justify-center hover:bg-gray-100 " +
  "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";
const botaoPrimario =
  "bg-blue-600 hover:bg-blue-700 text-white font-bold min-h-12 px-6 rounded-lg " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";
const botaoEscuro =
  "bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

function Card() {
  const { items, qtdItems, valorTotal, adicionarItem, diminuirItem, removerItem, limparCarrinho } =
    useContext(CarrinhoContext);
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);

  function finalizarCompra() {
    // Projeto de estudo: não há pagamento, só simula o pedido e esvazia o carrinho.
    limparCarrinho();
    setPedidoFinalizado(true);
  }

  if (pedidoFinalizado) {
    return (
      <div className="p-[5%] flex flex-col items-center gap-4 text-center" role="status">
        <h2 className="text-2xl font-bold">Pedido realizado!</h2>
        <p className="text-gray-600">Obrigado pela compra (simulação de um projeto de estudo).</p>
        <Link to="/" onClick={() => setPedidoFinalizado(false)} className={botaoEscuro}>
          Voltar para a loja
        </Link>
      </div>
    );
  }

  if (qtdItems < 1) {
    return (
      <div className="p-[5%] flex flex-col items-center gap-4 text-center">
        <h2 className="text-xl font-bold">Seu carrinho está vazio</h2>
        <p className="text-gray-600">Você não adicionou nenhum produto ainda.</p>
        <Link to="/" className={botaoEscuro}>
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full p-[3%] pb-28 md:pb-[3%] md:items-start">
      <section className="flex flex-col gap-4 w-full md:flex-1 min-w-0" aria-labelledby="titulo-carrinho">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="titulo-carrinho" className="text-xl font-bold text-start">
            Meu carrinho <span className="text-gray-600 font-normal text-base">({qtdItems} {qtdItems === 1 ? "item" : "itens"})</span>
          </h2>
          <Link to="/" className="text-blue-700 underline hover:text-blue-900">
            Continuar comprando
          </Link>
        </div>

        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <li className="flex items-center gap-4 border-b border-gray-400 pb-4" key={item.id}>
              <img
                src={item.cover}
                alt={item.title}
                className="w-28 h-28 md:w-56 md:h-56 object-contain shrink-0"
              />
              <div className="flex flex-col gap-2 min-w-0 flex-1">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <span className="text-gray-600">{moeda(item.price)} cada</span>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2" role="group" aria-label={`Quantidade de ${item.title}`}>
                    <button
                      aria-label="Diminuir quantidade"
                      onClick={() => diminuirItem(item.id)}
                      disabled={item.amount <= 1}
                      className={botaoQtd}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-8 text-center font-semibold" aria-live="polite">
                      {item.amount}
                    </span>
                    <button aria-label="Aumentar quantidade" onClick={() => adicionarItem(item)} className={botaoQtd}>
                      <Plus size={18} />
                    </button>
                  </div>
                  <button
                    onClick={() => removerItem(item.id)}
                    className="min-h-11 px-2 flex items-center gap-1 text-red-700 hover:text-red-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 rounded"
                  >
                    <Trash2 size={18} /> Remover
                  </button>
                </div>

                <span className="font-bold">Subtotal: {moeda(item.total)}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Desktop: resumo fixo ao lado, acompanha a rolagem */}
      <aside
        className="hidden md:flex p-4 flex-col gap-4 w-[35%] shrink-0 border border-gray-400 rounded-lg md:sticky md:top-24"
        aria-label="Resumo do pedido"
      >
        <h2 className="text-xl font-bold text-start ">Resumo do pedido</h2>
        <span className="border-b border-gray-400"></span>
        <p className="flex justify-between text-gray-600">
          <span>Itens</span>
          <span>{qtdItems}</span>
        </p>
        <p className="flex justify-between text-xl font-bold" aria-live="polite">
          <span>Total</span>
          <span>{moeda(valorTotal)}</span>
        </p>
        <button onClick={finalizarCompra} className={botaoPrimario}>
          Finalizar Compra
        </button>
        <p className="text-sm text-gray-600">Projeto de estudo: nenhum pagamento é realizado.</p>
      </aside>

      {/* Celular: barra fixa embaixo, total e botão sempre à mão */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-10 bg-white border-t border-gray-400 p-3 flex items-center justify-between gap-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div aria-live="polite">
          <p className="text-sm text-gray-600">Total ({qtdItems} {qtdItems === 1 ? "item" : "itens"})</p>
          <p className="text-lg font-bold">{moeda(valorTotal)}</p>
        </div>
        <button onClick={finalizarCompra} className={botaoPrimario}>
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}

export default Card;
