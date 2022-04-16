import dayjs from "dayjs";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "@modules/cars/useCases/createCar/CreateCarUseCase";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory : CarsRepositoryInMemory;


describe("Create Rental", () => {
    const tomorrow = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);

        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it("should be able to create a new rental", async () => {
        const {id : car_id } = await createCarUseCase.execute({ 
            name: "Name car",
            description: "Description of the car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: '123'
        });

        const rental = await createRentalUseCase.execute({
            user_id: "1234",
            car_id,
            expected_return_date: tomorrow
        })

        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    })

    it("should not be able to create a new rental if there is another open rental to the same user", async () => {
        expect( async () => {
            const car_1 = await createCarUseCase.execute({ 
                name: "Name car 1",
                description: "Description of the car 1",
                daily_rate: 100,
                license_plate: "ABC-1235",
                fine_amount: 60,
                brand: "Brand",
                category_id: '123'
            });
            const car_2 = await createCarUseCase.execute({ 
                name: "Name car 2",
                description: "Description of the car 2",
                daily_rate: 100,
                license_plate: "ABC-1236",
                fine_amount: 60,
                brand: "Brand",
                category_id: '123'
            });

            //Rental 1
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: car_1.id,
                expected_return_date: tomorrow
            })

            //Rental 2
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: car_2.id,
                expected_return_date: tomorrow
            })
        }).rejects.toBeInstanceOf(AppError)
    })


    it("should not be able to create a new rental if there is another open rental to the same car", async () => {
        expect( async () => {
            const {id: car_id } = await createCarUseCase.execute({ 
                name: "Name car 1",
                description: "Description of the car 1",
                daily_rate: 100,
                license_plate: "ABC-1235",
                fine_amount: 60,
                brand: "Brand",
                category_id: '123'
            });

            //Rental 1
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id,
                expected_return_date: tomorrow
            })

            //Rental 2
            await createRentalUseCase.execute({
                user_id: "1235",
                car_id,
                expected_return_date: tomorrow
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to create a new rental with a invalid return time", async () => {
        expect( async () => {
            const {id: car_id } = await createCarUseCase.execute({ 
                name: "Name car 1",
                description: "Description of the car 1",
                daily_rate: 100,
                license_plate: "ABC-1235",
                fine_amount: 60,
                brand: "Brand",
                category_id: '123'
            });

            //Rental 1
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id,
                expected_return_date: new Date()
            })
        }).rejects.toBeInstanceOf(AppError)
    })


})