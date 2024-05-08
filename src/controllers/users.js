import { Router } from 'express'
import emailValidator from 'email-validator'
import cpfRgValidator from 'cpf-rg-validator'
import { getUsers, getUser, createUser, deleteUser, updateUser } from '../services/users'

const router = Router()

router.get("/", async (request, response) => {
    const users = await getUsers()
    return response.status(200).send(users)
})

router.get("/:id", async (request, response) => {
    const user = await getUser(request.params.id)
    return response.status(200).send(user)
})

router.post("/", async (request, response) => {

    if (!emailValidator.validate(request.body.email)) {
        return response.status(400).json({ error: 'E-mail inválido' });
    }

    if (!cpfRgValidator.cpf(request.body.cpf)) {
        return response.status(400).json({ error: 'CPF inválido' });
    }

    if (!cpfRgValidator.rg(request.body.rg)) {
        return response.status(400).json({ error: 'RG inválido' });
    }

    const params = {
        name: request.body.name,
        email: request.body.email,
        age: request.body.age,
        gender: request.body.gender,
        phone: request.body.phone,
        cpf: request.body.cpf,
        rg: request.body.rg
    }
    const user = await createUser(params)
    return response.status(201).send(user)
})

router.delete("/:id", async (request, response) => {
    await deleteUser(request.params.id)

    return response.status(204).send()
})

router.put("/:id", async (request, response) => {
    if (!emailValidator.validate(request.body.email)) {
        return response.status(400).json({ error: 'E-mail inválido' });
    }

    if (!cpfRgValidator.cpf(request.body.cpf)) {
        return response.status(400).json({ error: 'CPF inválido' });
    }

    if (!cpfRgValidator.rg(request.body.rg)) {
        return response.status(400).json({ error: 'RG inválido' });
    }

    const user = await updateUser(request.params.id, {
        name: request.body.name,
        email: request.body.email,
        age: request.body.age,
        gender: request.body.gender,
        phone: request.body.phone,
        cpf: request.body.cpf,
        rg: request.body.rg
    })

    return response.status(200).send(user)
})

export default router