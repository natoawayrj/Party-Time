import partyFetch from "../axios/config";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import './Home.css'


const Home = () => {
  const [parties, setParties] = useState(null);

  // Load parties
  useEffect(() => {

    //função para chamar a API
    const loadParties = async () => {
      //esperando a resposta da api da rota específica que no caso é das festas 
      const res = await partyFetch.get("/parties");
      console.log(res.data)
      //o state vai ser a resposta da api(as festas cadastradas)
      setParties(res.data);
    };
     //executando a função
    loadParties();
  }, []);

  if (!parties) return <p>Carregando...</p>;

  return (
    <div className="home">
      <h1>Suas Festas</h1>
      {/* criando uma div que vamos usar o parties com o map */}
      <div className="parties-container">
        {/* se não tiver nenhuma festa vai retornar uma msg  */}
        {parties.length === 0 && <p>Não há festas cadastradas.</p>}
        {/* tendo as festas vamos renderizá-las dinamicamente com o map */}
        {parties.map((party)=> (
          <div className="party" key={party._id}>
            <p>Orçamento:{party.budget}</p>
            <img src={party.image} alt={party.title} />
            <h3>{party.title}</h3>
            <Link to={`party/${party._id}`} className="btn-secundary">Detalhes</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home