import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const createJWT = (user) => {

    const token = jwt.sign({
        id: user.id, username: user.username
    }, process.env.JWT_SECRET, { expiresIn: '1d' }) // set expiry date for token

    return token
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        res.status(401)
        res.json({ message: 'not authorized' })
        return
    }

    // to check for valid token
    const [, token] = bearer.split(' ') // split the bearer header

    if (!token) {
        res.status(401)

        res.json({ message: 'not valid token' })
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (e) {
        console.error(e)
        res.status(401)
        res.json({ message: 'not valid token' })
        return
    }
}

export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5)
}


// export const isAdmin = (req, res, next) => {
//     if (req.user.role !== 'admin') {
//         res.status(403)
//         res.json({ message: 'not allowed' })
//         return
//     }
//     next()
// }


