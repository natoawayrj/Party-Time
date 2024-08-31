const mongoose = require('mongoose')

async function main() {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect('mongodb+srv://natoawayrj:ZBVQvfnG88ytGtJr@cluster0.ljz6y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('conectado ao banco')
    } catch (error) {
        console.log('Erro!')
    }
}

module.exports = main