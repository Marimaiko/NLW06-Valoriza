import { getCustomRepository } from "typeorm"
import { UserRepositories } from "../repositories/UserRepositories"
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest {
  email: string,
  password: string
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UserRepositories)

    //Verificar se email existe
    const userExists = await usersRepositories.findOne({
      email
    })

    if(!userExists) {
      throw new Error ('Incorrect email/password')
    }

    //Verificar se senha está correta
    const passwordMatch = await compare(password, userExists.password)

    if(!passwordMatch) {
      throw new Error ('Incorrect email/password')
    }

    //Gerar o token
    const token = sign( {
      email: userExists.email,
    }, 'faa123e6a2cdb8e84d9611b74eab5e7c', {
      subject: userExists.id,
      expiresIn: '1d'
    })

    return token;

  }
}

export { AuthenticateUserService }