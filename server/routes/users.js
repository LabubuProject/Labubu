import express from 'express';
import userController from '../controllers/userControllers.js';
import tokenController from '../controllers/tokenControllers.js';

const router = express.Router();

router.get('/myProfile', tokenController.verifyUserToken, (req, res) => {
  res.status(200).json({ profile: req.user });
});

router.post(
  '/signup',
  userController.createUser,
  tokenController.generateToken,
  (_req, res) => {
    res.status(200).send({ token: res.locals.token, user: res.locals.user });
  }
);

router.put(
  '/updateuser',
  tokenController.protect,
  userController.updateUser,
  (_req, res) => {
    res.status(200).send({ stats: res.locals.user });
  }
);

router.post(
  '/login',
  userController.verifyUser,
  tokenController.generateToken,
  (_req, res) => {
    res.status(200).send({ token: res.locals.token, user: res.locals.user });
  }
);

export default router;
