import { useContext } from "react";
import { CarrinhoContext } from "../../context/carrinhoContext";



function Card() {
  const { items } = useContext(CarrinhoContext);
  return (
    <>
    {items.map ((item)=>{
      <span>{item.title}</span>
    })
      }
    </>
  );
}

export default Card;
