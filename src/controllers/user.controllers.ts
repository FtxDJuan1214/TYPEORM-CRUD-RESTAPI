import {Request, Response} from "express"
import {User} from "../entities/User"

// export function createUser(){}
export const createUser = async (req:Request, res:Response)=> {
    
    try {
        const {firstName, lastName, email} = req.body

        const user = new User()
        user.firstName = firstName
        user.lastName = lastName
        user.email = email

        await user.save()
        return res.status(201).json(user)
        
    } catch (error) {
        if(error instanceof Error)
        {
            return res.status(500).json({message: error.message})
        }
    }
}

export const getUsers = async (req:Request, res:Response)=> {
    try {

        const users = await User.find()
        return res.json(users)

    } catch (error) {
        if(error instanceof Error)
        {
            return res.status(500).json({message: error.message})
        }
    }
}

export const getUser = async (req: Request, res: Response) =>{
    try {
        
        const {id} = req.params

        const user = await User.findOneBy({id: Number(id)})
        
        if(!user) return res.status(404).json({message: 'User does not found'})

        return res.status(200).json(user)

    } catch (error) {
        if(error instanceof Error)
        {
            return res.status(500).json({message: error.message})
        }
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {

        const {id} = req.params
        const {firstName, lastName} = req.body

        const user = await User.findOneBy({id: Number(id)})
        
        if(!user) return res.status(404).json({message: 'User does not found'})

        //Primera forma para actualizar
        // user.firstName = firstName
        // user.lastName = lastName
        // user.save()

        //Segunda forma para actualizar
        //User.update({id: Number(id)}, {firstName: firstName, lastName: lastName})

        //Tercera forma para actualizar
        User.update({id: Number(id)}, req.body) //Hace un match entre los elementos

        return res.sendStatus(204)

    } catch (error) {
        if(error instanceof Error)
        {
            return res.status(500).json({message: error.message})
        }
    }
}

export const deleteUser = async (req: Request, res: Response) =>{
    try {
        
        const {id} = req.params

        const result = await User.delete({id: Number(id)})
        
        if(result.affected === 0)
        {
            return res.status(404).json({message: 'User not found'})
        }

        return res.sendStatus(204)

    } catch (error) {
        if(error instanceof Error)
        {
            return res.status(500).json({message: error.message})
        }
    }
}