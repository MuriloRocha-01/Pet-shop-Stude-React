import { createContext } from 'react';
import {type CarrinhoProps } from '../types/carrinho'
import {type ProductsProps} from '../types/product'

export type CarrinhoContextData = {
  items: CarrinhoProps[];
  qtdItems:number;
  valorTotal:number;
  adicionarItem: (item: ProductsProps) =>void;
  diminuirItem: (id: number) =>void;
  removerItem: (id: number) =>void;
  limparCarrinho: () =>void;
}



export const CarrinhoContext = createContext({} as CarrinhoContextData );
