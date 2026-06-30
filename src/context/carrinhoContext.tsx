import { createContext } from 'react';
import {type CarrinhoProps } from '../types/carrinho'
import {type ProductsProps} from '../types/product'

export type CarrinhoContextData = {
  items: CarrinhoProps[];
  qtdItems:number;
  adicionarItem: (item: ProductsProps) =>void;
}



export const CarrinhoContext = createContext({} as CarrinhoContextData );