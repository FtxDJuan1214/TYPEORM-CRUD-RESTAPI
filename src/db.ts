import {DataSource} from "typeorm"
import {User} from "./entities/User"//Aquí se importan todas las entidades que vayamos creando
//Database connection

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "typeormdb",
    entities: [User], //Aqui se agregan las entidades importadas
    logging: true,
    synchronize: true
})