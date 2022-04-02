import { getRepository, Repository } from "typeorm";
import { Specifications } from "../../entities/Specifications";
import { ICreateSpecificationsDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specifications>

    constructor(){
        this.repository = getRepository(Specifications)
    }
    async create({ description, name }: ICreateSpecificationsDTO): Promise<void> {
        const specifications = this.repository.create({
            description,
            name
        })

        await this.repository.save(specifications)
    }

    async findByName(name: string): Promise<Specifications> {
        const specifications = await this.repository.findOne({name})
        return specifications
    }
}

export { SpecificationsRepository }