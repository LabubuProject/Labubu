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
  const { username, password } = req.body;

  console.log('🚀 login attempt');
  console.log('👤 Username:', username);
  console.log('🔑 Password:', password);

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: '❌ user not found' });
    }

    console.log('⚙️ Hashed password in DB:', user.password);

    const isMatch = await user.comparePassword(password);
    console.log('🔋 Passwords match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: '❌ Invalid password' });
    }
    res.locals.user = user;
    return next();
  } catch (err) {
    console.error('🚩 Error in verifyUser:' , err);
    
    return next(err);
  }
};

//adding new method updateUserScore for new feature Scoreboard
userController.updateUserScore = async (req, res, next) => {
  const { bestTime, highestLevel } = req.body;
  const username = req.user?.username; // provided by tokenController.verifyUserToken, or maybe use ._id?

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: 'User not found' });

    // Update only if new score is better
    if (!user.bestTime || bestTime < user.bestTime) {
      user.bestTime = bestTime;
    }
    if (!user.highestLevel || highestLevel > user.highestLevel) {
      user.highestLevel = highestLevel;
    }

    const updatedUser = await user.save();
    res.locals.user = updatedUser;
    return next();
  } catch (err) {
    return next({
      log: 'Error in updateUserScore',
      status: 500,
      message: { err: 'Failed to update user score' },
    });
  }
};
// this below is for after the Dropdown Scoreboard layout is done

userController.getScoreboard = async (_req, res, next) => {
  try {
    const users = await User.find({}, 'username bestTime highestLevel')
    .sort({ highestLevel: -1, bestTime: 1});
    res.locals.scoreboard = users;
    return next();
  } catch (err) {
    return next ({
      log: '❌ Error in userController.getScoreboard',
      status: 500,
      message: { err: '❌ Error occurred while fetching scoreboard' },
    });
  }
};


// userController.getScoreboard = async (req, res, next) => {
//   try {
//     const scoreboard = await User.find()
//       .sort({ highestLevel: -1, bestTime: 1 })
//       .select('username highestLevel bestTime -_id')
//       .limit(10);
//     res.locals.scoreboard = scoreboard;
//     return next();
//   } catch (err) {
//     return next({
//       log: 'Error in getScoreboard',
//       status: 500,
//       message: { err: 'Failed to fetch scoreboard' },
//     });
//   }
// };
export default userController;
