import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  bestTime: { type: String, default: null },
  highestLevel: { type: Number, default: 0 },
});

const saltRounds = 5;


userSchema.pre('save', async function (next) {
  try {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default model('User', userSchema);
