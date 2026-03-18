import { Request, Response } from "express";
import { DeliveriesService } from "../services/deliveries.service";
import { catchAsync } from "../utils/catch-async.util";

export const getDeliveries = catchAsync(async (req: Request, res: Response) => {
    const deliveries = await DeliveriesService.getAll();
    res.status(200).json(deliveries);
});

export const getDelivery = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const delivery = await DeliveriesService.getById(id as string);
    res.status(200).json(delivery);
});

export const createDelivery = catchAsync(async (req: Request, res: Response) => {
    const result = await DeliveriesService.create(req.body);
    res.status(201).json(result);
});

export const updateDelivery = catchAsync(async (req: Request, res: Response) => {
    res.status(501).json({ message: "Update delivery not fully implemented in service yet" });
});

export const deleteDelivery = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await DeliveriesService.delete(id as string);
    res.status(204).json();
});
