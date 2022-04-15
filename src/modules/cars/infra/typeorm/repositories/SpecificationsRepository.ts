import { ICreateSpecificationsDTO, ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { getRepository, Repository } from "typeorm";
import { Specifications } from "../entities/Specifications";


class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specifications>

    constructor(){
        this.repository = getRepository(Specifications)
    }
    
    async create({ description, name }: ICreateSpecificationsDTO): Promise<Specifications> {
        const specifications = this.repository.create({
            description,
            name
        })

        await this.repository.save(specifications)

        return specifications
    }

    async findByName(name: string): Promise<Specifications> {
        const specifications = await this.repository.findOne({name})
        return specifications
    }

    async findByIds(ids: string[]): Promise<Specifications[]> {
        const specifications = await this.repository.findByIds(ids)

        return specifications
    }

}

export { SpecificationsRepository }