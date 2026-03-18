import { Request, Response } from "express";
import { VisitorsService } from "../services/visitors.service";
import { catchAsync } from "../utils/catch-async.util";

export const getVisitors = catchAsync(async (req: Request, res: Response) => {
    const visitors = await VisitorsService.getAll();
    res.status(200).json(visitors);
});

export const getVisitor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const visitor = await VisitorsService.getById(id as string);
    res.status(200).json(visitor);
});

export const createVisitor = catchAsync(async (req: Request, res: Response) => {
    const newVisitor = await VisitorsService.create(req.body);
    res.status(201).json(newVisitor);
});

export const updateVisitor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const visitor = await VisitorsService.update(id as string, req.body);
    res.status(200).json(visitor);
});

export const deleteVisitor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await VisitorsService.delete(id as string);
    res.status(204).json();
});