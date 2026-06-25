const bcrypt = require("bcrypt");
const db = require("../config/db");

const getUsers = async (req, res) => {

    try {

        const result = await db.query(
            `SELECT id,
                    first_name,
                    last_name,
                    username,
                    role
             FROM users`
        );

        res.status(200).json(result.rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const getUser = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await db.query(
            `SELECT id,
                    first_name,
                    last_name,
                    username,
                    role
             FROM users
             WHERE id=$1`,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.status(200).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const createUser = async (req, res) => {

    try {

        const {
            first_name,
            last_name,
            username,
            password,
            role
        } = req.body;

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const result = await db.query(
            `INSERT INTO users
            (first_name,last_name,username,password,role)
            VALUES($1,$2,$3,$4,$5)
            RETURNING id,first_name,last_name,username,role`,
            [
                first_name,
                last_name,
                username,
                hashedPassword,
                role
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const updateUser = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            first_name,
            last_name,
            username
        } = req.body;

        const result = await db.query(
            `UPDATE users
             SET first_name=$1,
                 last_name=$2,
                 username=$3
             WHERE id=$4
             RETURNING id,
                       first_name,
                       last_name,
                       username,
                       role`,
            [
                first_name,
                last_name,
                username,
                id
            ]
        );

        res.status(200).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const removeUser = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(
            "DELETE FROM users WHERE id=$1",
            [id]
        );

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    removeUser
};