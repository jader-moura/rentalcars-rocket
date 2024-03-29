import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor(){
        this.repository = getRepository(Car)
    }

    async create({
        name, 
        brand, 
        category_id, 
        daily_rate, 
        description, 
        fine_amount, 
        license_plate,
        specifications,
        id
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name, 
            brand, 
            category_id, 
            daily_rate, 
            description, 
            fine_amount, 
            license_plate,
            specifications,
            id
        })

        await this.repository.save(car)
        return car
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate })
        return car
    }

    async findAvailable(category_id?: string, brand?: string, name?: string): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("c")
            .where("available = :available", { available: true });
        
        category_id && carsQuery.andWhere("c.category_id = :category_id", { category_id })
        brand && carsQuery.andWhere("c.brand = :brand", { brand })
        name && carsQuery.andWhere("c.name = :name", { name })

        const cars = await carsQuery.getMany()
        return cars
    }

    async findById(id: string): Promise<Car> {
        return await this.repository.findOne(id)
    }

}

export { CarsRepository }