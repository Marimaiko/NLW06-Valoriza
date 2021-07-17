import { getCustomRepository } from "typeorm"
import { ComplimentsRepositorie } from "../repositories/ComplimentsRepository"
import { UserRepositories } from "../repositories/UserRepositories";


interface IComplimentRequest{
  tag_id: string,
  user_sender: string,
  user_receiver: string,
  message: string
}

class CreateComplimentService {

  async execute({tag_id, user_sender, user_receiver, message} : IComplimentRequest) {
     const complimentsRepositories = getCustomRepository(ComplimentsRepositorie);
     const usersRepositories = getCustomRepository(UserRepositories);

     if(user_sender === user_receiver){
       throw new Error ('You can not send it for yourself')
     }

     const userReceiverExists = await usersRepositories.findOne(user_receiver)

     if(!userReceiverExists) {
       throw new Error ('User Receiver does not exists')
     }

     const compliment = complimentsRepositories.create({
       tag_id,
       user_receiver,
       user_sender,
       message
     });

     await complimentsRepositories.save(compliment)

     return compliment;
  }
}

export { CreateComplimentService }