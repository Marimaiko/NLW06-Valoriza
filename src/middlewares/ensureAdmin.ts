import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";


export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { user_id } = request;

  const usersRepositories = getCustomRepository(UserRepositories)

  const { admin } = await usersRepositories.findOne(user_id)

  // Verificar se usuário é admin
  if(admin){
    return next()
  }

  return response.status(401).json({
    error: 'User unauthorized'
  })
}