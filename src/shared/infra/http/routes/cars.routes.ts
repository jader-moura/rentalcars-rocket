import { Router } from "express"
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";

const carsRoutes = Router();

const createCarController = new CreateCarController()
const listCarsController = new ListCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.get("/list-cars", listCarsController.handle)

carsRoutes.post(
    "/specifications/:id", 
    ensureAuthenticated, 
    ensureAdmin, 
    createCarSpecificationController.handle
)

export { carsRoutes }