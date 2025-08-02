import User from '../model/userModel.js';

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    res.locals.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
};

userController.verifyUser = async (req, res, next) => {
  // write code here
  const { username, password } = req.body;
  try {
    // find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      // no such user → back to signup
      return res.redirect('/signup');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      // wrong password → back to signup
      return res.redirect('/signup');
    }
    // otherwise they’re good—stash for downstream if you like
    res.locals.user = user;
    // and send them to the secret page
    return next();
  } catch (err) {
    return next(err);
  }
};
