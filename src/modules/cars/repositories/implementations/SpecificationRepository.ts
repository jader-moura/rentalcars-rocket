import { getRepository, Repository } from "typeorm";
import { Specifications } from "../../entities/Specifications";
import { ICreateSpecificationsDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationRepository implements ISpecificationsRepository {
    private repository: Repository<Specifications>

    constructor(){
        this.repository = getRepository(Specifications)
    }
    async create({ description, name }: ICreateSpecificationsDTO): Promise<void> {
        const specification = this.repository.create({
            description,
            name
        })

        await this.repository.save(specification)
    }

    async findByName(name: string): Promise<Specifications> {
        const specification = await this.repository.findOne({name})
        return specification
    }
}

export { SpecificationRepository }