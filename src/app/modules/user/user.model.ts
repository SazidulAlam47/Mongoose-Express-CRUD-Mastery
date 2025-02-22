import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import {
    TAddress,
    TFullName,
    TOrder,
    TUser,
    TUserModel,
} from "./user.interface";
import config from "../../config";

const fullNameSchema = new Schema<TFullName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

const addressSchema = new Schema<TAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});

const orderSchema = new Schema<TOrder>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, TUserModel>({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: fullNameSchema, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true, default: true },
    hobbies: { type: [String], required: true },
    address: { type: addressSchema, required: true },
    orders: { type: [orderSchema] },
    isDeleted: { type: Boolean, default: false },
});

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_round),
    );
    next();
});

userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});

userSchema.pre("find", async function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

userSchema.pre("findOne", async function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

userSchema.static("isUserExists", async function (userId: number) {
    const existingUser = await User.findOne({ userId });
    const result = Boolean(existingUser);
    return result;
});

export const User = model<TUser, TUserModel>("User", userSchema);
