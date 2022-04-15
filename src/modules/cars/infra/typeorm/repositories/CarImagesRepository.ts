import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { getRepository, Repository } from "typeorm";
import { CarImages } from "../entities/CarImages";

class CarImagesRepository implements ICarImagesRepository{
    private respository: Repository<CarImages>;

    constructor() {
        this.respository = getRepository(CarImages)
    }

    async create(car_id: string, image_name: string): Promise<CarImages> {
        const carImages = this.respository.create({
            car_id,
            image_name
        })

        await this.respository.save(carImages);

        return carImages
    }

}

export { CarImagesRepository }