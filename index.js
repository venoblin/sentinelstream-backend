require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./models')
const authRouter = require('./routes/auth')
const apiRouter = require('./routes/api')

const PORT = process.env.PORT || 3001

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/auth', authRouter)
app.use('/api', apiRouter)

app.listen(PORT, async () => {
  await db.sequelize.sync()
  console.log(`Server started on port ${PORT}`)
})
