require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const db = require('./models')
const authRoutes = require('./routes/auth')
const apiRoutes = require('./routes/api')

const PORT = process.env.PORT || 3001

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/auth', authRoutes)
app.use('/api', apiRoutes)

app.listen(PORT, async () => {
  await db.sequelize.sync()
  console.log(`Server started on port ${PORT}`)
})
