import { Link } from "react-router-dom";


function NotFound(){
    return(
        <>
        <h1>404 - Pagina não encontrada</h1>
        <Link to="/">Voltar para a página inicial</Link>
        </>
    )
}

export default NotFound;