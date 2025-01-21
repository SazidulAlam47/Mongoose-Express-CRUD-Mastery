import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserInDB = async (user: TUser) => {
    const result = await User.create(user);
    return result;
};

export const userServices = {
    createUserInDB,
};
