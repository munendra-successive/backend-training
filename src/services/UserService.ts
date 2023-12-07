import IUser from "../repositories/interface/IUser";
import UserRepoInstance from "../repositories/UserRepository";

class UserService {
  async addUser(userData: IUser) {
    try {
      UserRepoInstance.insert(userData);

      return await UserRepoInstance.find();
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      return await UserRepoInstance.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteByName() {
    try {
      await UserRepoInstance.deleteByUserName();
    } catch (error) {
      console.log(error);
    }
  }

  async updateByName() {
    try {
      await UserRepoInstance.UpdateByUserName();
    } catch (error) {
      console.log(error);
    }
  }

  async findByName() {
    try {
      const condata = await UserRepoInstance.findByUserName();
      console.log(condata);
    } catch (error) {
      console.log("Error is in findName", error);
    }
  }
}

export default new UserService();
