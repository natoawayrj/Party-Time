//importanto o router via express
const router = require('express').Router()

//rotas do elemento service
const serviceRouter = require("./service")

//centralizando a rota
router.use("/", serviceRouter)

//rotas do parties
const partyRouter =  require("./parties")

//centralizando rota
router.use("/", partyRouter)

module.exports = router;