import { useState, type ReactNode } from 'react';
import { CarrinhoContext } from './carrinhocontext';

interface CarrinhoProviderProps {
  children: ReactNode;
}

export function CarrinhoProvider({ children }: CarrinhoProviderProps) {
  const [items, setitems] = useState([]);


  return (
    <CarrinhoContext.Provider value={{ items, qtdItems:items.length }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export default CarrinhoProvider;