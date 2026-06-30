import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from "../../services/api";
import { useContext } from "react";
import { CarrinhoContext } from "../../context/carrinhoContext";
import { type ProductsProps } from '../../types/product';

function Produto() {
    const { adicionarItem } = useContext(CarrinhoContext);
    const [product, setProduct] = useState<ProductsProps>();
    const { id } = useParams();


    useEffect(() => {
        async function loadProducts() {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data);
        }
        loadProducts();

    }, [])
    return (
        <section className='gap-[3rem] px-[10%] flex flex-col lg:flex-row w-[100%] h-[80vh] items-center '>
        <section>
            <img src={product?.cover} className='border border-gray-300 rounded-xl min-w-100 max-h-100 lg:min-h-130 lg:min-w-130 lg:max-w-140 lg:max-h-140 '></img>
        </section>
        <section className='flex flex-col gap-4'>
            <h1 className='text-[2rem] font-bold text-start'>{product?.title}</h1>
            <p>{product?.description}</p>
            <span>R$ {product?.price}</span>
            <button className='mt-[3%] flex bg-black text-white p-3 text-center cursor-pointer' onClick={()=> { 
                if(product){
                adicionarItem(product)}
                }}>Adiconar ao Carrinho</button>
        </section>
        </section>
    )

}

export default Produto;