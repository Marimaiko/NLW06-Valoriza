import { EntityRepository, Repository } from "typeorm";
import { Compliment } from "../entities/Compliments";

@EntityRepository(Compliment)
class ComplimentsRepositorie extends Repository<Compliment>{

}

export { ComplimentsRepositorie }