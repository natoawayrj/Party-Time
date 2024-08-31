const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

//DB connection 
const conn = require('./db/conn')

conn()

//Routes importando a rota
const routes= require('./routes/router')

//configurando para que se tenha um único lugar com as rotas
app.use('/api', routes)

app.listen(3000, function(){
    console.log('Server is running on port 3000') 
})

// usuário:natoawayrj senha:ZBVQvfnG88ytGtJr mongo db

//mongodb+srv://natoawayrj:ZBVQvfnG88ytGtJr@cluster0.ljz6y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0                                                  