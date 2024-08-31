import partyFetch from "../axios/config"
import { useState, useEffect } from "react" 
import {useNavigate} from 'react-router-dom'

import './Form.css'
//importando o useToast
import useToast from "../hook/useToast"


const CreateParty = () => {

  const [services, setServices] = useState([])
  //guardando os dados recebidos dos inputs no state
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState(0)
  const [image, setImage] = useState('')
  const [partyServices, setPartyServices] = useState([])

  const navigate = useNavigate()

 //load services
 useEffect(()=>{

 //função para pegar os dados da api
  const loadServices = async ()=>{
    // pegando os dados da api que está no partyFetch e com o get vamos pegar os dados dos serviços(endpoint)
    const res = await partyFetch.get("/services")
    
    console.log(res.data)
    //guardando as informações que vieram da api
    setServices(res.data)
  }
    loadServices()
 },[])
 //add or remove services
  const handleServices =(e)=>{
    //verificando se a checkbox está checada
    const checked = e.target.checked
    //pegando qual foi o serviço, para saber se ele será inserido ou deletado, se chamarmos a função no elemento do checkbox, já podemos ver que ele pega o id e informa se é true(foi clicado) ou false(não foi clicado), com o id podemos saber qual o serviço foi selecionado, agora como os dados do banco de dados em que os serviços estão está so state services, temos que pegar de lá e enviar para o partyServices que é o state que criamos para guardar os dados da criação da festa
    const value = e.target.value
    //identificando o serviço no array original(services), o que está acontecendo na linha abaixo: a const criada vai receber o array services e filtrar, onde o s._id for igual ao valor selecionado
    const filteredServices = services.filter((s)=> s._id === value)
    //se dermos um console da const criada vamos ver que ela retorna o array do objeto selecionado com todas as sua propriedade
    if(checked){
      //ok está sendo condicionado aqui: se estiver checado, o setPartyServices englobará o array services que retornará o array que já existe + o que foi checado
      setPartyServices((services)=>[...services, filteredServices[0]])
    }else{
      //e para remover, com o filter ele irá retornar os que não tiver o id igual ao value
      setPartyServices((services)=> services.filter((s)=> s._id !== value))
    }

      console.log(partyServices)
  }
 //create a new party
  const createParty =async (e)=>{
     e.preventDefault()
     try {
      // criando um objeto com os valores do state
     const party = {
      title,
      author, 
      description,
      budget,
      image, 
      services: partyServices,
     }
     //enviando dados para o banco de dados, esperando a resposta do partyFetch e que vai ser uma requisição de post estamos mandando a requisição da api ("/parties", party)e enviando o objeto com os dados
     const res = await partyFetch.post("/parties",party)
     //condicionando o envio para a página, se a resposta do partyFetch for status 201 a const navigate que é o hook useNavigate vai levar para a página destino
     if(res.status === 201){
      navigate("/")

      useToast(res.data.msg)
     }
     } catch (error) {
      useToast(error.response.data.msg, "error")
     }

  }


  return (
    <div className='form-page'>
      <h2>Crie sua festa.</h2>
      <p>Defina o seu orçamento e escolha os serviços!</p>
      {/* no formulário criamos um evento de submit que invoca a função */}
      <form onSubmit={(e)=>createParty(e)}>
        <label>
          <span>Nome da festa</span>
          <input type="text" 
          placeholder='Seja criativo...' 
          required 
          onChange={(e)=>setTitle(e.target.value)}
          value={title}/>
        </label>
        <label>
          <span>Anfitrião:</span>
          <input type="text" 
          placeholder='Quem está dando a festa?'
           required 
           onChange={(e)=> setAuthor(e.target.value)}
           value={author}/>
        </label>
        <label>
          <span>Descrição</span>
          <textarea 
          placeholder='conte mais sobre a festa'
           required
           onChange={(e)=>setDescription(e.target.value)}
           value={description}></textarea>
        </label>
        <label>
          <span>Orçamento</span>
          <input type="number"
           placeholder='Quanto você pode investir?'
            required
            onChange={(e)=>setBudget(e.target.value)} 
            value={budget}/>
        </label>
        <label>
          <span>Imagem</span>
          <input type="text" 
          placeholder='insira a url de uma imagem'
          required 
          onChange={(e)=>setImage(e.target.value)}
          value={image}/>
        </label>

        <h2>Escolha os serviços</h2>
        <div className="services-container" >
          {/* se o serviço não for "achado" vai ficar carregando */}
          {services.length === 0 && <p>Carregando...</p>}
          {/* a comunicação foi feita então usamos o map para renderizar todos os serviços */}
          {services.length > 0 && services.map((service)=>{
            return(
              <div className="service" key={service.name}>
                <img src={service.image} alt={service.name} />
                <p className="service-name">{service.name}</p>
                <p className="service-price">R$:{service.price}</p>
                <div className="checkbox-container">
                  <input type="checkbox" value={service._id} onChange={(e)=>handleServices(e)}/>
                  <p>Marque para solicitar</p>
                </div>
              </div>
            )
            
          })}
        </div>
        <input type="submit" value="criar festa"  className='btn'/>
      </form>
      
    </div>
  )
}

export default CreateParty
