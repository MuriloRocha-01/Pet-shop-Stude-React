import { useParams } from 'react-router-dom';

function Produto(){

    const { id } = useParams();

    return(
        <h1>{id}</h1>
    )

}

export default Produto;