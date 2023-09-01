import app from './server'
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("server is running on port " + PORT)
})