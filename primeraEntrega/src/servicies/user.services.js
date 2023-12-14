import { UserModel } from "../daos/mongodb/models/user.model.js";
import { createHash, isValidPassword } from '../utils.js';

export default class UserServices {
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async register(user) {
    try {
      const { email, password } = user;
      if (email === 'adminCoder@coder.com' && password === 'adminCoder123') {
        return await UserModel.create({ ...user, password: createHash(password), role: 'admin' });
      }
      const exists = await this.findByEmail(email);
      console.log(exists);
      if (!exists) return await UserModel.create(
        {
          ...user,
          password: createHash(password)
        }
      );
      else return false;
    } catch (error) {
      console.log(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await UserModel.findOne({ email });
      if (userExist) {
        const isValid = isValidPassword(password, userExist);
        console.log('isValid__', isValid);
        if (!isValid) return false;
        else return userExist;
        // !isValid ? false : userExist
      } return false;
    } catch (error) {
      console.log(error);
    }
  }
}