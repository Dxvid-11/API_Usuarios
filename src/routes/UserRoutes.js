import { Router } from "express";
import * as userService from "../services/UseService.js";

const router = Router();

// Obtener todos los usuarios
router.get("/", async (req, res, next) => {
    try {
        const users = await userService.getAll();
        res.status(200).json({ data: users });
    } catch (error) {
        next(error);
    }
});

// Obtener un usuario por ID
router.get("/:id", async (req, res, next) => {
    try {
        const user = await userService.getById(req.params.id);
        res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
});

// Crear un usuario
router.post("/", async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const newUser = await userService.create({ name, email });
        res.status(201).json({ data: newUser });
    } catch (error) {
        next(error);
    }
});

// Actualizar un usuario
router.put("/:id", async (req, res, next) => {
    try {
        const { name, email } = req.body;
        const updatedUser = await userService.update(req.params.id, {
            name,
            email,
        });

        res.status(200).json({ data: updatedUser });
    } catch (error) {
        next(error);
    }
});

// Eliminar un usuario
router.delete("/:id", async (req, res, next) => {
    try {
        await userService.remove(req.params.id);
        res.status(200).json({
            message: `Usuario ${req.params.id} eliminado correctamente`,
        });
    } catch (error) {
        next(error);
    }
});

export default router;
