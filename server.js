
const dotenv = require(`dotenv`)
dotenv.config()
const express = require(`express`)
const mongoose = require(`mongoose`)
const methodOverride = require(`method-override`)
const morgan = require(`morgan`)
const app = express()
const PORT = 3002
const Soda = require(`./models/soda.js`)

app.use(express.urlencoded({ extended: false}))
app.use(methodOverride(`_method`))
app.use(morgan(`dev`))
mongoose.connect(process.env.MONGODB_URI)


mongoose.connection.on(`connected`, () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
})



// routes
// ==========================================================================
app.get(`/`, async (req, res) => {//home
    console.log(`Soda home page`);
    res.render(`index.ejs`)
    
})

app.get(`/sodas`, async (req, res) => {//all sodas
    const allSodas = await Soda.find({})
    res.render(`sodas/index.ejs`, {sodas: allSodas})
})
app.get(`/sodas/addSoda`, async (req, res) => {//add soda
    res.render(`sodas/addSoda.ejs`)
})

app.post(`/sodas`, async (req, res) => {//add soda function to post
    console.log(req.body)
    if (req.body.tasty === `on`) {
        req.body.tasty = true
    }
    else {
        req.body.tasty = false
    }
    await Soda.create(req.body)
    res.redirect(`/sodas`)
    
})
app.get(`/sodas/:sodaId`, async (req, res) => {///show for soda
    const foundSoda = await Soda.findById(req.params.sodaId)
    res.render(`sodas/show.ejs`, {soda: foundSoda})
})

app.get(`/sodas/:sodaId/editSoda`, async (req, res) => {//edit soda
    const foundSoda = await Soda.findById(req.params.sodaId)
    console.log(foundSoda);
    res.render(`sodas/editSoda.ejs`, {
        soda: foundSoda,
    })
    
})
app.put(`/sodas/:sodaId`, async (req, res) => {// updating a soda
    if (req.body.tasty === `on`) {
        req.body.tasty = true
    }
    else {
        req.body.tasty = false
    }
    await Soda.findByIdAndUpdate(req.params.sodaId, req.body)
    res.redirect(`/sodas/${req.params.sodaId}`)
})
app.delete(`/sodas/:sodaId`, async (req, res) => {///delet a soda
    await Soda.findByIdAndDelete(req.params.sodaId)
    res.redirect(`/sodas`)
})


// Listener
// +++++++++++++++++++=========================++++++++++++++++++++++++++++++===============================
app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`);
    
})