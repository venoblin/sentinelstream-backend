require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRouter = require('./routes/auth')

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
