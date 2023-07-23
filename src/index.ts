import app from './server'
import * as dotenv from 'dotenv'
dotenv.config()

app.listen(6666, () => {
    console.log("hi from server on http://localhost:6666")
})