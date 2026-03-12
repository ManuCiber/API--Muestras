import { Request, Response } from "express";

import { prisma } from "lib/prisma";

export const getVisitors = async (req: Request, res: Response) => {
    try {
        const visitors = await prisma.visitadores.findMany();
        res.status(200).json(visitors);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getVisitor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const visitor = await prisma.visitadores.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!visitor) {
            return res.status(404).json({ message: "Visitor not found" });
        }

        return res.status(200).json(visitor);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const createVisitor = async (req: Request, res: Response) => {
    try {
        const { nombre, apellido, zona, muestras_asignadas} = req.body;
        const newVisitor = await prisma.visitadores.create({
            data: {
                nombre,
                apellido,
                zona,
                muestras_asignadas
            }
        })
        return res.status(201).json(newVisitor);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateVisitor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, zona, muestras_asignadas } = req.body;
        const visitor = await prisma.visitadores.update({
            where: {
                id: Number(id),
            },
            data: {
                nombre,
                apellido,
                zona,
                muestras_asignadas
            }
        })
        return res.status(200).json(visitor);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteVisitor = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.visitadores.delete({
            where: {
                id: Number(id),
            }
        })
        return res.status(204).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}