import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

interface IPayLoad {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  //Receber o token
  const authToken = request.headers.authorization;

  //Validar se token está preenchido
  if(!authToken) {
    return response.status(401).end();
  }
  const [, token] = authToken.split(' ')

  //Validar se token é válido
  try {
    const {sub} = verify(token, 'faa123e6a2cdb8e84d9611b74eab5e7c') as IPayLoad;
    
    //Recuperar informações do usuário
    request.user_id = sub;
    return next()
  } catch (err) {
    return response.status(401).end()
  }

}