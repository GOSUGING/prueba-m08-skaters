import { Router } from 'express';
import { SkaterController } from '../controllers/skater.controller.js';
import { verifyTokenJWT } from '../middlewares/jwt.middleware.js';

const router = Router();


router.get('/user/:email', SkaterController.getUser);
router.get('/users', SkaterController.getAll)
router.post('/login', SkaterController.login);
router.post('/register', SkaterController.register);
router.put('/edit', verifyTokenJWT, SkaterController.editProfile);
router.delete('/delete', verifyTokenJWT, SkaterController.deleteAccount);
router.put('/state', SkaterController.changeState)


export default router;