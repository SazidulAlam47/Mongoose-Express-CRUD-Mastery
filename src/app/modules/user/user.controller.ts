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
        res.status(200).json({
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

const getUserById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getUserById(Number(userId));

        res.status(200).json({
            success: true,
            message: `userId:${userId} fetched successfully`,
            data: result,
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
        // eslint-disable-next-line no-console
        console.log(err);
    }
};

export const userControllers = {
    createUser,
    getAllUsers,
    getUserById,
};
