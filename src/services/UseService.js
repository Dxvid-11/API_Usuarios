import * as UserModel from "../models/userModel.js";

// Obtener todos los usuarios
const getAll = async () => {
    return await UserModel.findAll();
};

// Obtener un usuario por ID
const getById = async (id) => {
    const user = await UserModel.findById(id);

    if (!user) {
        const error = new Error(`El usuario con id ${id} no existe`);
        error.status = 404;
        throw error;
    }

    return user;
};

// Crear usuario
const create = async ({ name, email }) => {
    if (!name) {
        const error = new Error("El campo name es requerido");
        error.status = 400;
        throw error;
    }

    if (!email) {
        const error = new Error("El campo email es requerido");
        error.status = 400;
        throw error;
    }

    return await UserModel.createUser({ name, email });
};

// Actualizar usuario
const update = async (id, data) => {
    const user = await UserModel.findById(id);

    if (!user) {
        const error = new Error(`El usuario con id ${id} no existe`);
        error.status = 404;
        throw error;
    }

    return await UserModel.updateUser(id, data);
};

// Eliminar usuario
const remove = async (id) => {
    const deleted = await UserModel.removeUser(id);

    if (!deleted) {
        const error = new Error(`ID: ${id} Usuario no encontrado`);
        error.status = 404;
        throw error;
    }

    return {
        message: `ID: ${id} Usuario eliminado`
    };
};

export {
    getAll,
    getById,
    create,
    update,
    remove
};