
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {
    constructor(
        private rentalsRepository: IRentalsRepository,
        private dateProvider: IDateProvider
    ){}

    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental>{
        const openRentalByCar = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(openRentalByCar){
            throw new AppError("Car is unavailable!");
        }

        const openRentalByUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

          if(openRentalByUser){
            throw new AppError("There's a rental in progress for this user.");
        }

        const compareDates = this.dateProvider.compareInHours(expected_return_date)

        if(compareDates < 24 ) {
            throw new AppError("The rental need to have a expected return date with minimum time of 24 hours")
        }
        

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        })

        return rental
    }

}

export { CreateRentalUseCase }