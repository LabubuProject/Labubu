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

userController.updateUser = async (req, res, next) => {
  const { username, bestTime, highestLevel } = req.body;
  const userInfo = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log('no user');
      throw new Error('User does not exist');
    }

    await User.findOneAndUpdate(
      { username },
      {
        $set: userInfo,
      }
    );

    user.username = user.username;
    user.password = user.password;
    user.bestTime = bestTime || user.bestTime;
    user.highestLevel = highestLevel || user.highestLevel;

    const updatedUser = await user.save();

    res.locals.user = updatedUser;
    next();
  } catch {}
};

userController.verifyUser = async (req, res, next) => {
  // write code here
  const { username, password } = req.body;
  try {
    // find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    // otherwise they’re good—stash for downstream if you like
    res.locals.user = user;
    // and send them to the secret page
    return next();
  } catch (err) {
    return next(err);
  }
};

export default userController;
