//criando o modelo
const PartyModel = require('../models/Party')
const { get } = require('../routes/parties')

//criando uma função que irá validar se o orçamento cabe nos serviços, os parâmetros seram: o orçamento(bugedt) e os serviços(services)
const checkPartyBudget=(budget, services)=>{
    //criando uma variável em que vai pegar os serviços e reduzí-los, com o reduce(que tem como premissa, reduzir vários valores a um só, ou seja passamos como parametro a soma e services, assim ele vai somar cada serviço e "guardar a some em um único objeto")e como será feito sum+ service.price e começando com o preço de 0
    const priceSum = services.reduce((sum, service)=>sum + service.price,0)

    console.log(priceSum, budget)
    //condicionando se o valor for maior que o orçamanto
    if(priceSum > budget){
        return false
    }
    //se não for retorna verdadeiro
    return true
}

//criando o controller

const partyController = {
    create: async (req, res)=>{
        try {
            //nesta const terá todos os dados vindo da requisição do modelo da festa(título,autor,imagem...etc)
            const party = {
                title: req.body.title, 
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services
            }
            //fazendo uma validação se o budget(preço) for < que o valor dos serviços, não pode ser criado o serviço, primeiro passo no if, chegando se a festa tem serviço e a outra checagem vai vir da função que irá confirtmar se os serviços cabem no orçamento
            if(party.services && !checkPartyBudget(party.budget, party.services)){
               res.status(406).json({msg: "serviço impossível de ser criado"})
               return
            }
            const response =  await PartyModel.create(party)
            res.status(201).json({response, msg:"Festa criada com sucesso"})
            
        } catch (error) {
            console.log(error)
        }
    },
    //resgatando todas as festas
    getAll: async(req,res)=>{
        try {
            const parties = await PartyModel.find()
            res.json(parties)
            
        } catch (error) {
            console.log(error)
        }
    },
    //resgatando uma festa
    get: async(req,res)=>{
        try {
            //encontrar o dado no banco de dados
            const id = req.params.id
            //encontrando o id pela festa
            const party = await PartyModel.findById(id)
            //validando se não for encontrado e encontrado
            if(!party){
                res.status(404).json({msg: "festa não encontrada!"})
                return
            }
            //mandando a validação
            res.json(party)
            
        } catch (error) {
            console.log(error)
        }
    },
    //deletando a festa 

    delete: async(req,res)=>{
        const id = req.params.id
        const party = await PartyModel.findById(id)
        if(!party){
            res.status(404).json({msg: "festa não encontrada!"})
            return
        }
        const deleteParty = await PartyModel.findByIdAndDelete(id)

        res.status(200).json({msg: "Festa excluida com sucesso!"})
    },
    update: async(req,res)=>{
        try {
            const id = req.params.id
            const party = {
                title: req.body.title, 
                author: req.body.author,
                budget: req.body.budget,
                description: req.body.description,
                image: req.body.image,
                services: req.body.services
            }
            if(party.services && !checkPartyBudget(party.budget, party.services)){
                res.status(406).json({msg: "serviço impossível de ser criado"})
                return
             }
             const updateParty = await PartyModel.findByIdAndUpdate(id, party)
             if(!updateParty){
                res.status(404).json({msg: "festa não encontrada!"})
                return
             }
             res.status(200).json({msg: "Festa atualizada com sucesso!"})
        } catch (error) {
            console.log(error)
        }
    }
}



//exportando

module.exports = partyController