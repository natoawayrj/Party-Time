//consumindo o router
const router = require('express').Router()

//atrelando as rotas
const partyController = require("../controllers/partyController")


//rota da criação de festa

router.route("/parties").post((req,res)=>partyController.create(req,res))

//resgatando as festas
router.route("/parties").get((req,res)=>partyController.getAll(req,res))

//resgatando uma festa 
router.route("/parties/:id").get((req,res)=>partyController.get(req,res))

//deletando festa
router.route("/parties/:id").delete((req,res)=>partyController.delete(req,res))

//update da festa
router.route("/parties/:id").put((req,res)=>partyController.update(req,res))

//exportando a rota

module.exports = router