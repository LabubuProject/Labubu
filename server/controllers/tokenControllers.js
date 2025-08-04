import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';

const tokenController = {};

tokenController.verifyUserToken = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization.startsWith('Bearer') &&
    req.headers.authorization
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (err) {
      return next(err);
    }
  }
};

tokenController.generateToken = (req, res, next) => {
  const id = res.locals.user._id;
  try {
    res.locals.token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '10d',
    });
    next();
  } catch (err) {
    return next(err);
  }
};

export default tokenController;
