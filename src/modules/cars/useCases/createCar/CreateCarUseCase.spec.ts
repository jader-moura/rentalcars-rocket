import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory : CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it("should be able to create a new car", async () => {
       const car = await createCarUseCase.execute({ 
            name: "Name car",
            description: "Description of the car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: '123'
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with an existent license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({ 
                name: "Name car",
                description: "Description of the car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: '123'
            });

            await createCarUseCase.execute({ 
                name: "Name car 2",
                description: "Description of the car 2",
                daily_rate: 120,
                license_plate: "ABC-1234",
                fine_amount: 62,
                brand: "Brand 2",
                category_id: '1234'
            });
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should be able to create a new car with avaiable true", async () => {
        const car = await createCarUseCase.execute({ 
            name: "Car available",
            description: "Description of the car",
            daily_rate: 100,
            license_plate: "ABC-1124",
            fine_amount: 60,
            brand: "Brand",
            category_id: '123'
        });

        expect(car.available).toBe(true)
    });
}) 