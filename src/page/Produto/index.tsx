import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { getProduct } from "../../services/api";
import { useContext } from "react";
import { CarrinhoContext } from "../../context/carrinhoContext";
import { type ProductsProps } from '../../types/product';
import { moeda } from '../../utils/moeda';

function Produto() {
    const { adicionarItem } = useContext(CarrinhoContext);
    const [product, setProduct] = useState<ProductsProps>();
    const [carregando, setCarregando] = useState(true);
    // Feedback: depois de adicionar, o botão confirma e aparece o atalho "Ver carrinho"
    const [adicionado, setAdicionado] = useState(false);
    const { id } = useParams();


    useEffect(() => {
        async function loadProducts() {
            setCarregando(true);
            setAdicionado(false);
            const data = await getProduct(id);
            setProduct(data);
            setCarregando(false);
        }
        loadProducts();

    }, [id])

    useEffect(() => {
        if (!adicionado) return;
        const timer = setTimeout(() => setAdicionado(false), 2500);
        return () => clearTimeout(timer);
    }, [adicionado])

    if (carregando) {
        return <p role='status' className='px-[5%] py-16 text-center text-gray-600'>Carregando produto...</p>
    }

    if (!product) {
        return (
            <section className='px-[5%] py-16 flex flex-col items-center gap-4 text-center'>
                <h1 className='text-2xl font-bold'>Produto não encontrado</h1>
                <p className='text-gray-600'>Esse produto não existe ou foi removido.</p>
                <Link to='/' className='bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'>Voltar para a loja</Link>
            </section>
        )
    }

    return (
        <div className='px-[5%] lg:px-[10%] py-6'>
        <Link to='/' className='inline-flex items-center gap-1 min-h-11 text-blue-700 hover:text-blue-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 rounded'>
            <ArrowLeft size={18} /> Voltar para a loja
        </Link>
        <section className='gap-8 lg:gap-[3rem] pt-2 flex flex-col lg:flex-row w-[100%] items-center lg:items-start '>
        <section className='w-full lg:w-1/2 flex justify-center'>
            <img src={product.cover} alt={product.title} className='border border-gray-300 rounded-xl w-full max-w-md lg:max-w-lg aspect-square object-contain'></img>
        </section>
        <section className='flex flex-col gap-4 w-full lg:w-1/2'>
            <h1 className='text-2xl lg:text-[2rem] font-bold text-start'>{product.title}</h1>
            <span className='text-3xl font-semibold'>{moeda(product.price)}</span>
            <button
                className={
                    'mt-2 flex items-center justify-center gap-2 min-h-12 text-white px-4 rounded-lg text-center cursor-pointer transition ' +
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ' +
                    (adicionado ? 'bg-green-700' : 'bg-black hover:bg-gray-800')
                }
                onClick={()=> {
                    adicionarItem(product);
                    setAdicionado(true);
                }}>
                {adicionado ? <><Check size={20} /> Adicionado ao carrinho</> : 'Adicionar ao Carrinho'}
            </button>
            <p role='status' className='min-h-6'>
                {adicionado && (
                    <Link to='/carrinho' className='text-blue-700 underline hover:text-blue-900'>Ver carrinho</Link>
                )}
            </p>
            <div>
                <h2 className='font-semibold mb-1'>Descrição</h2>
                <p className='text-gray-700 leading-relaxed'>{product.description}</p>
            </div>
        </section>
        </section>
        </div>
    )

}

export default Produto;
