import { useState, type ReactNode } from 'react';
import { type CarrinhoProps, CarrinhoContext } from './carrinhoContext';

interface CarrinhoProviderProps {
  children: ReactNode;
}

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
  const [items, setitems] = useState<CarrinhoProps[]>([]);

  function adicionarItem(item){
    items.find((item)=>{
      item.id === 
    })
  }



  return (
    <CarrinhoContext.Provider value={{ adicionarItem, items, qtdItems:items.length }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export default CarrinhoProvider;