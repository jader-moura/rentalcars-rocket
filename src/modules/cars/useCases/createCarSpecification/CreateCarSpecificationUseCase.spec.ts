import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory()

        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
    })

    it("should not be able to add new specification to an car", async () => {
       expect(async () => {
            const car_id = "1234"
            const specifications_id = ["421", "123"]    

            await createCarSpecificationUseCase.execute({ car_id, specifications_id })
       }).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to add new specification to an car", async () => {
        const { id: car_id } = await carsRepositoryInMemory.create({
            "name": "Name car",
            "description": "Car description",
            "daily_rate": 500,
            "license_plate": "ABC-12334",
            "fine_amount": 60,
            "brand": "Audi",
            "category_id": "category_id"
        })

        const { id: specifications_id } = await specificationsRepositoryInMemory.create({ 
            name: 'specification name', 
            description: 'description name'
        })


        const specificationsCars = await createCarSpecificationUseCase.execute({ car_id, specifications_id: [specifications_id] })

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);

    })
})