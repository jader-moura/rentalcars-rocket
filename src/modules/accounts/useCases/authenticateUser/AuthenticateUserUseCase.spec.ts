import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO ={
            driver_license: 'asd912312',
            email: 'user@mail.com',
            password: '1234',
            name: 'test'
        }

        await createUserUseCase.execute(user)

        const session = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(session).toHaveProperty("token");
    })

    it("should not be able to signin with a nonesixtent user", async () => {
        expect( async () => {
            await authenticateUserUseCase.execute({
                email: 'user@mail.com',
                password: '1234'
            })
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to signin with an incorrect password", () => {
        expect( async() => {
            await createUserUseCase.execute({
                driver_license: 'asd912312',
                email: 'user@mail.com',
                password: 'correct-password',
                name: 'test'
            });

             await authenticateUserUseCase.execute({
                email: 'user@mail.com',
                password: 'incorrect-password'
            });
        }).rejects.toBeInstanceOf(AppError);
    })
});