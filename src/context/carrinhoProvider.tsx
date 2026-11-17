import { useState, type ReactNode } from 'react';
import { CarrinhoContext } from './carrinhoContext';
import type { ProductsProps } from '../types/product';
import type { CarrinhoProps } from '../types/carrinho';

interface CarrinhoProviderProps {
  children: ReactNode;
}

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
  const [items, setitems] = useState<CarrinhoProps[]>([]);

  // Toda a decisão é feita dentro do setitems: usa sempre o estado mais recente,
  // então cliques rápidos não duplicam o produto nem perdem quantidade.
  function adicionarItem(item: ProductsProps) {
    setitems((itensAtuais) => {
      const itemExiste = itensAtuais.some((i) => i.id === item.id);

      if (!itemExiste) {
        return [...itensAtuais, { ...item, amount: 1, total: item.price }];
      }

      return itensAtuais.map((noCarrinho) => {
        if (noCarrinho.id !== item.id) return noCarrinho;
        const novaQuantidade = noCarrinho.amount + 1;
        return { ...noCarrinho, amount: novaQuantidade, total: novaQuantidade * noCarrinho.price };
      });
    });
  }

  // Diminui 1 unidade; se chegar a 0, o item sai do carrinho.
  function diminuirItem(id: number) {
    setitems((itensAtuais) =>
      itensAtuais
        .map((noCarrinho) => {
          if (noCarrinho.id !== id) return noCarrinho;
          const novaQuantidade = noCarrinho.amount - 1;
          return { ...noCarrinho, amount: novaQuantidade, total: novaQuantidade * noCarrinho.price };
        })
        .filter((noCarrinho) => noCarrinho.amount > 0)
    );
  }

  function removerItem(id: number) {
    setitems((itensAtuais) => itensAtuais.filter((i) => i.id !== id));
  }

  function limparCarrinho() {
    setitems([]);
  }

  return (
    <CarrinhoContext.Provider value={{
      adicionarItem,
      diminuirItem,
      removerItem,
      limparCarrinho,
      items,
      qtdItems: items.reduce((acc, item) => acc + item.amount, 0),
      valorTotal: items.reduce((acc, item) => acc + item.total, 0)
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export default CarrinhoProvider;
