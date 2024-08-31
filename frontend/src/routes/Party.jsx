//carregando a festa para assim exibir os dados
import partyFetch from "../axios/config"
//salvando os dados e fazendo a requisição
import { useState, useEffect } from "react"
//pegando o id da url, linkando a página e fanzendo a remoção da festa respectivamente com os hook abaixo
import { useParams, Link, useNavigate } from "react-router-dom"

import './Party.css'

import useToast from "../hook/useToast"
const Party = () => {
    //pegando o id do objeto que vem da url, com desestruturação do objeto{}, e este parâmetro é o que foi usado na configuração do router
    const {id} = useParams()
    //criando um state da festa 
    const [party, setParty] = useState(null)

    const navigate = useNavigate()

    //lendo a festa 
    useEffect(()=>{
        const loadParty = async ()=>{
            //pegando a resposta do banco pelo partyFetch e passamos o endpoint com o id que usamos como parametro
            const res = await partyFetch.get(`/parties/${id}`)
            console.log(res.data)
            //armazenando a resposta no state
            setParty(res.data)
        }
        loadParty()
    },[])
    //delete this party
    const handleDelete = async ()=>{
        const res = await partyFetch.delete(`/parties/${id}`)
        console.log(res.data)
        if(res.status === 200)
            navigate('/parties')
            useToast(res.data.msg)
    }

    //com isso já podemos imprimir os dados da festa, primeiro vamos condicionar a renderização se tiver de fato um festa
    if(!party) return <p>Carregando...</p>
    console.log(party)

  return (
    <div className="party">
        <h1>{party.title}</h1>
        <div className="actions-container">
            {/* no link o to vai passar o caminho a ser direcionado */}
            <Link to={`/party/edit/${party._id}`} className="btn">Editar</Link>
            <button className="btn-secundary" onClick={handleDelete}>Excluir</button>
        </div>
        <p>Orçamento:{party.budget}</p>
        <h3>Serviços contratados:</h3>
        <div className="services-container">
                 {party.services.map((service) => (
                    <div className="service" key={service._id}>
                        <img src={service.image} alt={service.name} />
                        <p>{service.name}</p>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Party


