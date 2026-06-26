import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from "../../services/api";

interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}

function Produto() {
    const [product, setProduct] = useState<ProductProps>();
    const { id } = useParams();


    useEffect(() => {
        async function loadProducts() {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data);
        }
        loadProducts();

    }, [])
    return (
        <div className=''>
        <p>{product?.description}</p>
        <img src={product?.cover}></img>
        <span>{product?.price}</span>
        <h1>{product?.title}</h1>
        </div>
    )

}

export default Produto;