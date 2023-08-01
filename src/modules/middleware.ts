import { validationResult } from 'express-validator'
import prisma from '../db'


export const handleInputErrors = (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        res.status(400)
        res.json({ message: errors.array() })
    }
    else {
        next()
    }
}

export const isAdmin = async (req) => {
    const customer = await prisma.customers.findUnique({
        where: {
            id: req.user.id
        },
        select: {
            role: true
        }
    })
    if (customer && customer.role === 'ADMIN') {
        return true
    }
    return false;
}

export const validatePayLoad = (req, res, next) => {
    const { username, password, email, phone, address, role } = req.body
    if (!username || !password || !email || !phone || !address) {
        res.status(400)
        res.json({ message: 'missing fields' })
        return
    }
    if (role !== undefined) {
        res.status(401)
        res.json({ message: 'not authorized to change role' })
        return
    }
    next()
}