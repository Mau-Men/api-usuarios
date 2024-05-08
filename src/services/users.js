import User from '../models/user'

export const getUsers = async () => {
    const users = await User.find()
    return users
}

export const getUser = async (id) => {
    const user = await User.findById(id)
    return user
}

export const createUser = async (params) => {
    const user = new User({
        name: params.name,
        email: params.email,
        age: params.age,
        gender: params.gender,
        phone: params.phone,
        cpf: params.cpf,
        rg: params.rg
    })

    await user.save()
    return user
}

export const deleteUser = async (id) => {
    await User.findByIdAndDelete(id)
}

export const updateUser = async (id, params) => {
    const user = await User.findByIdAndUpdate(id, {
        name: params.name,
        email: params.email,
        age: params.age,
        gender: params.gender,
        phone: params.phone,
        cpf: params.cpf,
        rg: params.rg
    }, {
        new: true
    })
    return user
}