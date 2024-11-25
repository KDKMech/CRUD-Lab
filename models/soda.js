const mongoose = require(`mongoose`)

const sodaSchema = new mongoose.Schema({
    name: String,
    flavor: String,
    tasty: Boolean,
})

const Soda = mongoose.model(`Soda`, sodaSchema)
module.exports = Soda