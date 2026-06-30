import {type CarrinhoProps } from './carrinho'

export type ProductsProps = Omit<CarrinhoProps, 'amount' | 'total'>
