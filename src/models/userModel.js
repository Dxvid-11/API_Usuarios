import { pool } from "../db/pool.js";

// Obtener todos los usuarios
export const findAll = async () => {
    const [rows] = await pool.execute(
        "SELECT * FROM users ORDER BY name"
    );
    return rows;
};

// Obtener un usuario por ID
export const findById = async (id) => {
    const [rows] = await pool.execute(
        "SELECT * FROM users WHERE id = ?",
        [id]
    );

    return rows[0];
};

// Crear un usuario
export const createUser = async ({ name, email }) => {
    const [result] = await pool.execute(
        "INSERT INTO users (name, email) VALUES (?, ?)",
        [name, email]
    );

    return findById(result.insertId);
};

// Actualizar un usuario
export const updateUser = async (id, { name, email }) => {
    const fields = [];
    const values = [];

    if (name !== undefined) {
        fields.push("name = ?");
        values.push(name);
    }

    if (email !== undefined) {
        fields.push("email = ?");
        values.push(email);
    }

    if (fields.length === 0) {
        return findById(id);
    }

    values.push(id);

    await pool.execute(
        `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
        values
    );

    return findById(id);
};

// Eliminar un usuario
export const removeUser = async (id) => {
    const [result] = await pool.execute(
        "DELETE FROM users WHERE id = ?",
        [id]
    );

    return result.affectedRows > 0;
};