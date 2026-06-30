import { useContext } from "react";
import { CarrinhoContext } from "../../context/carrinhoContext";



function Card() {
  const { items, qtdItems } = useContext(CarrinhoContext);
  return (
    <div className="flex items-center justify-center ">
    {qtdItems < 1 && (
      <span className=""> Você nã adicionou nenhum produto ainda! </span>
    )}
    
    {items.map ((item)=>{
      return(
        <div className="flex items-center justify-center ">
        <img src={item.cover} className="w-64 h-64"></img>
        <h1>{item.title}</h1>
        <span>{item.total}</span>
        </div>
        
      )
    })
      }
    </div>
  );
}

export default Card;
