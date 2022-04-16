import { container } from 'tsyringe'
import "@shared//container/providers"
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'
import { CarImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarImagesRepository'
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository'

//CategoriesRepository
container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository)

//SpecificationsRepository
container.registerSingleton<ISpecificationsRepository>("SpecificationsRepository", SpecificationsRepository)

//UsersRepository
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository)

//CarsRepository
container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository)

// CarImagesRepository
container.registerSingleton<ICarImagesRepository>("CarImagesRepository", CarImagesRepository)

// RentalRepository
container.registerSingleton<IRentalsRepository>("RentalsRepository", RentalsRepository)

