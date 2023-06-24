const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const db = require('./src/config/db')
const authRouter = require('./src/routes/auth')
const userRouter  = require('./src/routes/user')
const morgan = require('morgan')
const app = express()
const port = 8080 

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/uploads', express.static('uploads'));
dotenv.config()
app.use(morgan('combined'))
app.use(cors())


// Connect MongoDB
db.connect()

// Routes
app.use('/v1/auth', authRouter)
app.use('/v1/user', userRouter)

app.get('/',(req,  res) => {
  res.send('Welcome')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})