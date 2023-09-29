import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from '../../services/api';
import './filme-info.css';


function Filme(){
    const {id}                  = useParams();
    const [filme,setFilme]      = useState({});
    const [loading,setLoading]  = useState(true);
    const navigate              = useNavigate();
    useEffect(() =>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:"501a66414a43cb1afdf43e792064408d",
                    language:"pt-BR",
                }
            })
            .then((response) => {
                //console.log(response.data);
                setFilme(response.data);
                //console.log(response.data);
                setLoading(false);
                console.log(setLoading());
            })
            .catch(()=>{
                console.log("FILME NAO ENCONTRADO");
                navigate("/", { replace: true });
                return;
            })
        }

        loadFilme();

        return () => {
            console.log("COMPONENTE FOI DESMONTADO!!!");
        }

    }, [navigate,id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmeSalvos = JSON.parse(minhaLista) || [];

        const hasFilmes = filmeSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);//método que verifica se tem pelo menos um item igual dentro do array

        if(hasFilmes){
            alert("ESSE FILME JÁ ESTÁ NA LISTA");

            return;
        }
        filmeSalvos.push(filme);
        localStorage.setItem("@primeflix",JSON.stringify(filmeSalvos));
        alert("FILME SALVO COM SUCESSO!")

    }

    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando Detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img  src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} /10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;