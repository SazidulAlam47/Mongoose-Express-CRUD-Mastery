import { Request, Response } from "express";
import userValidationSchema, { orderValidationSchema } from "./user.validator";
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
        const result = await userServices.getUserByIdFromDB(Number(userId));

        res.status(200).json({
            success: true,
            message: `userId:${userId} fetched successfully`,
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
        // eslint-disable-next-line no-console
        console.log(error);
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { body } = req;
        const zodParsedData = userValidationSchema.parse(body);
        const result = await userServices.updateUserInDB(
            Number(userId),
            zodParsedData,
        );
        if (result) {
            result.password = "";
        }
        res.status(200).json({
            success: true,
            message: `userId:${userId} updated successfully`,
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
        // eslint-disable-next-line no-console
        console.log(error);
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.deleteTrueInDB(Number(userId));
        if (!result.acknowledged) {
            throw new Error();
        }
        res.status(200).json({
            success: true,
            message: `userId:${userId} deleted successfully`,
            data: null,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
        // eslint-disable-next-line no-console
        console.log(error);
    }
};

const addProductToUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { body } = req;
        const zodParsedData = await orderValidationSchema.parse(body);
        const result = await userServices.addProductToUserInDB(
            Number(userId),
            zodParsedData,
        );
        if (!result.acknowledged) {
            throw new Error();
        }
        res.status(200).json({
            success: true,
            message: `Order created successfully`,
            data: null,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
        // eslint-disable-next-line no-console
        console.log(error);
    }
};

const getOrdersOfUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getAllOrdersOfUserFromDB(
            Number(userId),
        );
        res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
        // eslint-disable-next-line no-console
        console.log(error);
    }
};

const getTotalPriceOfOrders = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const result = await userServices.getTotalPriceOfOrdersFromDB(
            Number(userId),
        );
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
        // eslint-disable-next-line no-console
        console.log(error);
    }
};

export const userControllers = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    addProductToUser,
    getOrdersOfUser,
    getTotalPriceOfOrders,
};
