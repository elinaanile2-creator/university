const db = require("../config/db");

const getCourses = async (req, res) => {

    try {

        const result = await db.query(
            `
            SELECT
                c.id,
                c.course_code,
                c.course_name,
                c.units,
                c.capacity,
                s.title AS semester,
                p.professor_code
            FROM courses c
            LEFT JOIN semesters s
            ON c.semester_id = s.id
            LEFT JOIN professors p
            ON c.professor_id = p.id
            ORDER BY c.id
            `
        );

        res.status(200).json(result.rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const getCourse = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await db.query(
            `
            SELECT *
            FROM courses
            WHERE id = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Course not found"
            });

        }

        res.status(200).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const createCourse = async (req, res) => {

    try {

        const {
            course_code,
            course_name,
            units,
            capacity,
            professor_id,
            semester_id
        } = req.body;

        const result = await db.query(
            `
            INSERT INTO courses
            (
                course_code,
                course_name,
                units,
                capacity,
                professor_id,
                semester_id
            )
            VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING *
            `,
            [
                course_code,
                course_name,
                units,
                capacity,
                professor_id,
                semester_id
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const updateCourse = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            course_code,
            course_name,
            units,
            capacity,
            professor_id,
            semester_id
        } = req.body;

        const result = await db.query(
            `
            UPDATE courses
            SET
                course_code = $1,
                course_name = $2,
                units = $3,
                capacity = $4,
                professor_id = $5,
                semester_id = $6
            WHERE id = $7
            RETURNING *
            `,
            [
                course_code,
                course_name,
                units,
                capacity,
                professor_id,
                semester_id,
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


const deleteCourse = async (req, res) => {

    try {

        const { id } = req.params;

        await db.query(
            `
            DELETE FROM courses
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json({
            message: "Course deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse
};