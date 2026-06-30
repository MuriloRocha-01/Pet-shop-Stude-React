import { useState, type ReactNode } from 'react';
import { CarrinhoContext } from './carrinhoContext';
import type { ProductsProps } from '../types/product';
import type { CarrinhoProps } from '../types/carrinho';

interface CarrinhoProviderProps {
  children: ReactNode;
}

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
  const [items, setitems] = useState<CarrinhoProps[]>([]);

  function adicionarItem(item: ProductsProps) {
    const itemExiste = items.find((i) => i.id === item.id);
    
    if (!itemExiste) {
      setitems((itemAtual) => [
        ...itemAtual, 
        { ...item, amount: 1, total: item.price }
      ]);
    } else {
      setitems((itensAtuais) => 
        itensAtuais.map((noCarrinho) => {
          if (noCarrinho.id === item.id) {
            const novaQuantidade = noCarrinho.amount + 1;
            return {
              ...noCarrinho,
              amount: novaQuantidade,
              total: novaQuantidade * noCarrinho.price 
            };
          }
          return noCarrinho;
        })
      );
    } 
  }

  return (
    <CarrinhoContext.Provider value={{ 
      adicionarItem, 
      items, 
      qtdItems: items.reduce((acc, item) => acc + item.amount, 0) 
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export default CarrinhoProvider;