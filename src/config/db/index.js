
const mongoose = require('mongoose')

async function connect () {
    try {
        mongoose.connect('mongodb+srv://cjcoding:ducvu0969@cluster0.d70fi.mongodb.net/cjcoding?retryWrites=true&w=majority',{})
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {connect}