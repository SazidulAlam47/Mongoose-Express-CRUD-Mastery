import bcrypt from "bcrypt";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import config from "../../config";

const createUserInDB = async (user: TUser) => {
    const result = await User.create(user);
    return result;
};

const getAllUsersFromDB = async () => {
    const query = {};
    const projection = {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
    };
    const result = await User.find(query, projection);
    return result;
};

const getUserByIdFromDB = async (userId: number) => {
    const userExists = await User.isUserExists(userId);
    if (!userExists) {
        throw new Error("User not found!");
    }
    const result = await User.findOne({ userId }, { password: 0 });
    return result;
};

const updateUserInDB = async (userId: number, user: TUser) => {
    const userExists = await User.isUserExists(userId);
    if (!userExists) {
        throw new Error("User Not Found");
    }
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_round),
    );
    const result = await User.findOneAndUpdate({ userId }, user);
    return result;
};

export const userServices = {
    createUserInDB,
    getAllUsersFromDB,
    getUserByIdFromDB,
    updateUserInDB,
};
