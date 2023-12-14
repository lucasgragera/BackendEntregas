import { UserModel } from './models/user.model.js';

export default class UserDao {

    async getById(id) {
        try {
            const userExist = await UserModel.findById(id)
            // console.log(userExist);
            if (userExist) {
                return userExist
            } return false
        } catch (error) {
            console.log(error)
            // throw new Error(error)
        }
    }

    async getByEmail(email) {
        try {
            const userExist = await UserModel.findOne({ email });
            // console.log(userExist);
            if (userExist) {
                return userExist
            } return false
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
}