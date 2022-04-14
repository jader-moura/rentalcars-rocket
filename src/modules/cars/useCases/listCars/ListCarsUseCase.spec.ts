import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase"

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
    })

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car 1",
            "description": "Car description",
            "daily_rate": 500,
            "license_plate": "ABC-12334",
            "fine_amount": 60,
            "brand": "car brand",
            "category_id": "category_id"
        })
        const cars = await listCarsUseCase.execute({})

        expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car 1",
            "description": "Car description",
            "daily_rate": 500,
            "license_plate": "ABC-12334",
            "fine_amount": 60,
            "brand": "car brand",
            "category_id": "category_id"
        })
        const cars = await listCarsUseCase.execute({
            brand: "car brand"
        })

        expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car name teste",
            "description": "Car description",
            "daily_rate": 500,
            "license_plate": "ABC-12334",
            "fine_amount": 60,
            "brand": "car brand",
            "category_id": "category_id"
        })
        const cars = await listCarsUseCase.execute({
            name: "Car name teste"
        })

        expect(cars).toEqual([car])
    })

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            "name": "Car name",
            "description": "Car description",
            "daily_rate": 500,
            "license_plate": "ABC-12334",
            "fine_amount": 60,
            "brand": "car brand",
            "category_id": "category_test"
        })
        const cars = await listCarsUseCase.execute({
            category_id: "category_test"
        })

        expect(cars).toEqual([car])
    })

})