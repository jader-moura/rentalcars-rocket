
import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;


describe("Create category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    })

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category test description"
        }
        await createCategoryUseCase.execute(category)

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)
        
        expect(categoryCreated).toHaveProperty("id")
    })

    it("should not be able to create a new category with a name that already exist", async () => {
        expect( async () => {
            const category = {
                name: "Category Test",
                description: "Category test description"
            }

            await createCategoryUseCase.execute(category)
            
            await createCategoryUseCase.execute(category)

        }).rejects.toBeInstanceOf(AppError)
    })
})

