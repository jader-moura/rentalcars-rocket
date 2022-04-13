import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateSpecificationsController } from '../../../../modules/cars/useCases/createSpecifications/CreateSpecificationsController';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const specificationsRoutes = Router();

const createSpecificationsController = new CreateSpecificationsController();

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post(
    "/",    
    ensureAuthenticated, 
    ensureAdmin,  
    createSpecificationsController.handle
);

export { specificationsRoutes };