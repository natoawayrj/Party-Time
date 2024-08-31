const {Service: ServiceModel} = require('../models/Service')

const ServiceController = {
    create: async(req,res)=>{
        try {
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
            }

            const response = await ServiceModel.create(service);
            res.status(201).json({response, msg: "Serviço criado com sucesso"})
            
        } catch (error) {
            console.log('tem algum erro')
        }
    }, 
    getAll: async (req, res) => {
        try {
            const services = await ServiceModel.find()

            res.json(services) 
        } catch (error) {
         console.log('deu ruim')   
        }
    },
    get: async(req, res)=>{
        try {
            //resgatando o dado de cada serviço
            const id = req.params.id
            //resgatando o serviço do banco
            const service =  await ServiceModel.findById(id)
            //identificando se o serviço não veio
            if(!service){
                res.status(404).json({msg:"serviço não encontrado"})
                return
            }
            //retornando o serviço
            res.json(service)
            
        } catch (error) {
            console.log(error)
        }
    },
    delete: async(req, res)=>{
        try {
            const id = req.params.id
            const service = await ServiceModel.findById(id)

            if(!service){
                res.status(404).json({msg:"serviço não encontrado"})
                return
            }

            const deletedService = await ServiceModel.findByIdAndDelete(id)
            res.status(200).json({deletedService, msg: "serviço deletado com sucesso"})
            
        } catch (error) {
            console.log(error)
        }
    }, 
    update: async(req, res)=>{
        //pegando o id 
        const id = req.params.id
        //o objeto com os serviços
        const service = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
        }
        //atualizando o serviço
        const updateService = await ServiceModel.findByIdAndUpdate(id, service)

        //verificando se existe o serviço
        if(!updateService){
            res.status(404).json({msg:"serviço não encontrado"})
            return
        }
        res.status(200).json({service, msg: "Serviço atualizado com sucesso!"})
    }


    
}

module.exports = ServiceController;