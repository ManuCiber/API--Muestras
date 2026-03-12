import { Request, Response } from "express";
import { prisma } from "lib/prisma";

export const getSamples = async (req: Request, res: Response) => {
    try {
        const samples = await prisma.muestras.findMany();
        res.status(200).json(samples);
        console.log(samples);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        console.log(error);
    }
}

export const getSample = async (req: Request, res: Response) => {
    try {
        const { nombre } = req.body;
        const sample = await prisma.muestras.findFirst({
            where: {
                nombre: nombre
            }
        });

        if (!sample) {
            return res.status(404).json({ message: "Sample not found" });
        }

        return res.status(200).json(sample);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const createSample = async (req: Request, res: Response) => {
    try {
        const {nombre, descripcion, existencias} = req.body;
        const newSample = await prisma.muestras.create({
            data: {
                nombre,
                descripcion,
                existencias
            }
        })
        return res.status(201).json(newSample);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateSample = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, existencias } = req.body;
        const sample = await prisma.muestras.update({
            where: {
                id: Number(id),
            },
            data: {
                nombre,
                descripcion,
                existencias
            }
        })
        return res.status(200).json(sample);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteSample = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const sample = await prisma.muestras.delete({
            where: {
                id: Number(id),
            }
        })
        console.log(sample);
        return res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}