import { Request, Response } from "express";
import userValidationSchema from "./user.validator";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const { body } = req;

        const zodParsedData = userValidationSchema.parse(body);

        const result = await userServices.createUserInDB(zodParsedData);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsersFromDB();
        res.status(201).json({
            success: true,
            message: "All users fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
};

export const userControllers = {
    createUser,
    getAllUsers,
};
