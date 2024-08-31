//criando o elemento que irá editar os serviços contratados que foi preenchido quando foi criado, basicamente iremos refazer o mesmo processo.
//1-importando os hooks


//o partyFetch para fazer a requisição da api
import partyFetch from "../axios/config"
//useState e useEffect para guardar os dados e fazer a requisição de get e input respectivamente,
import { useState, useEffect } from "react" 
//useNavigate para redirecionar e useParams para pegar o parametro na url do id
import {useNavigate,useParams} from 'react-router-dom'
//useToast para a msg de sucesso ou erro
import useToast from "../hook/useToast"




const EditParty = () => {

  const {id} = useParams()

  const [party, setParty] = useState(null)

  const [services, setServices] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{

    //função para pegar os dados da api
     const loadServices = async ()=>{
       // pegando os dados da api que está no partyFetch e com o get vamos pegar os dados dos serviços(endpoint)
       const res = await partyFetch.get("/services")
       
       console.log(res.data)
       //guardando as informações que vieram da api
       setServices(res.data)
       loadParty()
     }

     const loadParty = async ()=>{
      const res = await partyFetch.get(`/parties/${id}`)
      console.log(res.data)
      
      setParty(res.data)
  }
       loadServices()
    },[])
    const handleServices =(e)=>{
      
      const checked = e.target.checked
      
      const value = e.target.value
    
      const filteredServices = services.filter((s)=> s._id === value)
      
      let partyServices = party.services
      if(checked){
        
        partyServices=[...partyServices, filteredServices[0]]
      }else{
        
        partyServices = partyServices.filter((s)=> s._id !== value)
      }
  
        setParty({...party, services:partyServices})
    }
    console.log(party)

  const upDateParty = async(e)=>{
     e.preventDefault()
     try {
      const res = await partyFetch.put(`/parties/${party._id}`, party);

      console.log(res.data.msg);

      if (res.status === 200) {
        navigate(`/party/${id}`);

        useToast(res.data.msg);
      }
    } catch (err) {
      useToast(err.response.data.msg, "error");
    }
  }

  if(!party) return <p>Carregando...</p>




  return (
 <div className='form-page'>
    <h2>Editando:{party.title}</h2>
    <p>Ajuste as informações da sua festa</p>
    {/* no formulário criamos um evento de submit que invoca a função */}
    <form onSubmit={(e)=>upDateParty(e)}>
      <label>
        <span>Nome da festa</span>
        <input type="text" 
        placeholder='Seja criativo...' 
        required 
        onChange={(e)=>setParty({...party, title: e.target.value})}
        value={party.title}/>
      </label>
      <label>
        <span>Anfitrião:</span>
        <input type="text" 
        placeholder='Quem está dando a festa?'
         required 
         onChange={(e)=>setParty({...party, author: e.target.value})}
         value={party.author}/>
      </label>
      <label>
        <span>Descrição</span>
        <textarea 
        placeholder='conte mais sobre a festa'
         required
         onChange={(e)=>setParty({...party, description: e.target.value})}
         value={party.description}></textarea>
      </label>
      <label>
        <span>Orçamento</span>
        <input type="number"
         placeholder='Quanto você pode investir?'
          required
          onChange={(e)=>setParty({...party, budget: e.target.value})} 
          value={party.budget}/>
      </label>
      <label>
        <span>Imagem</span>
        <input type="text" 
        placeholder='insira a url de uma imagem'
        required 
        onChange={(e)=>setParty({...party, image: e.target.value})}
        value={party.image}/>
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
                <input type="checkbox"
                 value={service._id} onChange={(e)=>handleServices(e)}
                 checked={party.services.find((partyService)=> partyService._id === service._id )||""}/>
                <p>Marque para solicitar</p>
              </div>
            </div>
          )
          
        })}
      </div>
      <input type="submit" value="Editar festa"  className='btn'/>
    </form>
    
  </div>
  )
}

//exportando para o main e criando a rota
export default EditParty

