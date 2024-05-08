import express from 'express'
import userController from './controllers/users'
import databaseConnection from './utils/database'

const app = express()
app.use(express.json())
const port = 3000

app.get("/", (request, response) => {
    response.status(200).send("Bem vindo à API de Usuários.")
})

app.use('/users', userController)

app.listen(port, async () => {
    await databaseConnection()
    console.log(`App running in http://localhost:${port}`)
})