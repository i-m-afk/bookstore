import express from 'express'
import morgan from 'morgan'
import { createNewCustomer, signin } from './handlers/customer'
import router from './router'
import { protect } from './modules/auth'
import cors from 'cors'
import { validatePayLoad } from './modules/middleware'

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    console.log("hello")
    res.status(200)
    res.json({ message: 'hello' })
})

app.post('/customer', validatePayLoad, createNewCustomer)
app.post('/signin', signin)
app.use('/api', protect, router)

app.use((err, req, res, next) => {
    if (err.type === 'auth') {
        res.status(401).json({ message: 'unauthorized' })
    }
    else if (err.type === 'input') {
        res.status(400).json({ message: 'invalid input' })
    }
    else {
        res.status(500).json({ message: 'internal server error' })
    }
})


export default app;