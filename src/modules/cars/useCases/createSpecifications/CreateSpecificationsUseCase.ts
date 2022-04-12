import { AppError } from "@shared/errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string
}

@injectable()
class CreateSpecificationsUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
        ){}

    async execute({ name, description }: IRequest): Promise<void>{
        const specificationsAlreadyExists = await this.specificationsRepository.findByName(name);

        if(specificationsAlreadyExists){
            throw new AppError("Specifications already exists!")
        }
        await this.specificationsRepository.create({
            name, 
            description
        })
    }
}

export { CreateSpecificationsUseCase }