import express, { Request, Response } from 'express'
import cors from 'cors'
import { connectDb } from './db/connect'
import { graphqlHTTP } from 'express-graphql'
import schema from './schemas/schema'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.get('/', (req: Request, res: Response) => {
    res.status(200).send('<h1>Hi mom</h1>')
})
const port = 5000

const start = async(port: number, uri: string) => {
    try {
        app.listen(port, () => {
            console.log(`Server listening on http://localhost:${port}`)
        }) 
        await connectDb(uri)
    } catch (error) {
        console.log(error);
    }
}

start(port, process.env.MONGO_URI as string)