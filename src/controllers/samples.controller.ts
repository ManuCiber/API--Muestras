import { Request, Response } from "express";
import { SamplesService } from "../services/samples.service";
import { catchAsync } from "../utils/catch-async.util";

export const getSamples = catchAsync(async (req: Request, res: Response) => {
    const samples = await SamplesService.getAll();
    res.status(200).json(samples);
});

export const getSample = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const sample = await SamplesService.getById(id as string);
    res.status(200).json(sample);
});

export const createSample = catchAsync(async (req: Request, res: Response) => {
    const newSample = await SamplesService.create(req.body);
    res.status(201).json(newSample);
});

export const updateSample = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const sample = await SamplesService.update(id as string, req.body);
    res.status(200).json(sample);
});

export const deleteSample = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await SamplesService.delete(id as string);
    res.status(204).json();
});