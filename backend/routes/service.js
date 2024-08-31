//consumindo o router via express
const router = require('express').Router()

//atrelando os serviços pela rota
const serviceController = require("../controllers/serviceController")
//criando um endpoit com a função criada,Esta linha define uma rota para o caminho /services.
// O método route('/services') é utilizado para especificar o caminho da rota.
// O método post() define que esta rota responderá às requisições HTTP do tipo POST. O POST geralmente é utilizado para enviar dados ao servidor, como na criação de um novo serviço.
// O callback (req, res) => serviceController(req, res) é uma função que será executada quando uma requisição POST for feita para /services. Aqui, o serviceController é chamado diretamente, passando os objetos req (request) e res (response) como argumentos. Isso sugere que serviceController é uma função que lida diretamente com a requisição e a resposta.
router.route('/services').post((req,res)=>serviceController.create(req,res))

// resgatando os dados
router.route("/services").get((req, res)=>serviceController.getAll(req,res))

//lembrando que ainda vão a lógica do código aqui
//resgatan os dados com parâmetros, vimos que também é um método get e para não haver conflito, determinamos com :id para saber que está esperando um id e não haver conflito
router.route("/services/:id").get((req,res)=>serviceController.get(req,res))

//deletando dados 
router.route("/services/:id").delete((req,res)=>serviceController.delete(req,res))

//atualizando dados
router.route("/services/:id").put((req,res)=>serviceController.update(req,res))

//exportando a rota
module.exports = router