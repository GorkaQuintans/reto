const mongoose = require('mongoose')



const logSchema = new mongoose.Schema({
    Username: String,
    password: String, 
})


const logModel = mongoose.model('Log', logSchema)

module.exports = logModel 


