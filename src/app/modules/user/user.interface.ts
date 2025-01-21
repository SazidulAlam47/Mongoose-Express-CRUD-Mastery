import { Model } from "mongoose";

export interface TFullName {
    firstName: string;
    lastName: string;
}

export interface TAddress {
    street: string;
    city: string;
    country: string;
}

export interface TOrder {
    productName: string;
    price: number;
    quantity: number;
}

export interface TUser {
    userId: number;
    username: string;
    password: string;
    fullName: TFullName;
    age: number;
    email: string;
    isActive: boolean;
    hobbies: string[];
    address: TAddress;
    orders?: TOrder[];
}

export interface TUserModel extends Model<TUser> {
    // eslint-disable-next-line no-unused-vars
    isUserExists(userId: number): Promise<TUser | null>;
}
