import prisma from "../db";
import { hashPassword, createJWT, comparePasswords } from "../modules/auth";

export const createNewCustomer = async (req, res, next) => {
    try {
        const customer = await prisma.customers.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password),
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
            }
        })
        const token = createJWT(customer)
        res.json({ token })
    }
    catch (e) {
        e.type = 'input'
        // email already exists
        if (e.code === 'P2002') {
            e.message = 'email already exists'
        }
        // username already exists
        if (e.code === 'P2002' && e.meta.target.includes('username')) {
            e.message = 'username already exists'
        }
        next(e)
    }
}

export const signin = async (req, res) => {
    const customer = await prisma.customers.findUnique({
        where: {
            username: req.body.username,
        }
    })
    const isValid = await comparePasswords(req.body.password, customer.password)

    if (!isValid) {
        res.status(401)
        res.json({ message: 'invalid credentials' })
        return
    }
    const token = createJWT(customer)
    res.json({ token })
}