import { createContext } from 'react';

export type CarrinhoContextData = {
  items: CarrinhoProps[];
  qtdItems:number;
  adicionarItem: (item: ProductsProps) =>void;
}


export type ProductsProps = Omit<CarrinhoProps, 'amount' | 'total'>
export interface CarrinhoProps{
  id:number;
  title:string;
  description:string;
  price:number;
  cover:string;
  amount:number;
  total:number;
}

export const CarrinhoContext = createContext({} as CarrinhoContextData );