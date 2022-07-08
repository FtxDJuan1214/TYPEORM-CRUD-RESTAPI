import {Router} from "express"
import {
    createUser, 
    getUsers, 
    updateUser,
    deleteUser,
    getUser
} from "../controllers/user.controllers"

const router = Router()

//Listar ususarios
router.get('/users', getUsers)

//Consultar ususario
router.get('/users/:id', getUser)

//Crear usuario
router.post('/users', createUser)

//Actualizar usuario
router.put('/users/:id', updateUser)

//Borrar usuario
router.delete('/users/:id', deleteUser)

export default router