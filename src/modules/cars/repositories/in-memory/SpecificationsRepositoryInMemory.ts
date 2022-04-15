import { Specifications } from "@modules/cars/infra/typeorm/entities/Specifications";
import { ICreateSpecificationsDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specifications[] = []

    async create({ description, name }: ICreateSpecificationsDTO): Promise<Specifications> {
        const specification = new Specifications();

        Object.assign(specification, {
            description,
            name
        })

        this.specifications.push(specification)
        return specification
    }

    async findByName(name: string): Promise<Specifications> {
        return this.specifications.find(specification => specification.name === name)
    }

    async findByIds(ids: string[]): Promise<Specifications[]> {
        return this.specifications.filter(specification => ids.includes(specification.id))
    }

}

export { SpecificationsRepositoryInMemory }