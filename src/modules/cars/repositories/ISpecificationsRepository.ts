import { Specifications } from "../infra/typeorm/entities/Specifications";

interface ICreateSpecificationsDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ description, name }: ICreateSpecificationsDTO): Promise<Specifications>;
    findByName(name: string): Promise<Specifications>;
    findByIds(ids: string[]): Promise<Specifications[]>;
}

export { ISpecificationsRepository, ICreateSpecificationsDTO }