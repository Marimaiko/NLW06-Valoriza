import { getCustomRepository } from "typeorm"
import { ComplimentsRepositorie } from "../repositories/ComplimentsRepository"

class ListUserReceiveComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositorie);
    const compliments = await complimentsRepositories.find({
      where: {
        user_sender:user_id
      },
      relations: ["userSender", "userReceiver", "tag"]
    })
    return compliments;
  }
}

export { ListUserReceiveComplimentsService }