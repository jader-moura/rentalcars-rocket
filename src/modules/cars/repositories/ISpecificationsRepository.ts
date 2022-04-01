import { Specifications } from "../entities/Specifications";

interface ICreateSpecificationsDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ description, name }: ICreateSpecificationsDTO): Promise<void>;
    findByName(name: string): Promise<Specifications>
}

export { ISpecificationsRepository, ICreateSpecificationsDTO }