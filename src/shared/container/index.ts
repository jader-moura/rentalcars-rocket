import { container } from 'tsyringe'

import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository'
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository'
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository'

//CategoriesRepository
container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository)

//SpecificationsRepository
container.registerSingleton<ISpecificationsRepository>("SpecificationsRepository", SpecificationsRepository)

//UsersRepository
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository)

//CarsRepository
container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository)