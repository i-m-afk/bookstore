import express from 'express'
import morgan from 'morgan'
import { createNewCustomer, signin } from './handlers/customer'
import router from './router'
import { protect } from './modules/auth'
//import cors from 'cors'

const app = express()
app.use(morgan('dev'))
//app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    console.log("hello")
    res.status(200)
    res.json({ message: 'hello' })
})

app.post('/customer', createNewCustomer)
app.post('/signin', signin)
app.use('/api', protect, router)

export default app;