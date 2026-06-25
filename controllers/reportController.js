const db = require("../config/db");


// لیست دانشجویان
const getStudentsReport = async (req, res) => {

    try {

        const result = await db.query(
            `
            SELECT
                s.id,
                s.student_number,
                u.first_name,
                u.last_name,
                s.major
            FROM students s
            JOIN users u
            ON s.user_id = u.id
            ORDER BY s.student_number
            `
        );

        res.status(200).json(result.rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// لیست اساتید
const getProfessorsReport = async (req, res) => {

    try {

        const result = await db.query(
            `
            SELECT
                p.id,
                p.professor_code,
                u.first_name,
                u.last_name,
                p.department
            FROM professors p
            JOIN users u
            ON p.user_id = u.id
            ORDER BY p.professor_code
            `
        );

        res.status(200).json(result.rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// لیست دروس
const getCoursesReport = async (req, res) => {

    try {

        const result = await db.query(
            `
            SELECT
                id,
                course_code,
                course_name,
                units,
                capacity
            FROM courses
            ORDER BY course_code
            `
        );

        res.status(200).json(result.rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// تعداد دانشجویان هر درس
const getStudentsCountPerCourse = async (req, res) => {

    try {

        const result = await db.query(
            `
            SELECT
                c.course_code,
                c.course_name,
                COUNT(e.student_id) AS student_count
            FROM courses c
            LEFT JOIN enrollments e
            ON c.id = e.course_id
            GROUP BY c.id
            ORDER BY c.course_code
            `
        );

        res.status(200).json(result.rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// جستجوی دانشجو
const searchStudent = async (req, res) => {

    try {

        const studentNumber = req.params.studentNumber;

        const result = await db.query(
            `
            SELECT
                s.student_number,
                u.first_name,
                u.last_name,
                s.major
            FROM students s
            JOIN users u
            ON s.user_id = u.id
            WHERE s.student_number = $1
            `,
            [studentNumber]
        );

        res.status(200).json(result.rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// جستجوی درس
const searchCourse = async (req, res) => {

    try {

        const courseCode = req.params.courseCode;

        const result = await db.query(
            `
            SELECT *
            FROM courses
            WHERE course_code = $1
            `,
            [courseCode]
        );

        res.status(200).json(result.rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    getStudentsReport,
    getProfessorsReport,
    getCoursesReport,
    getStudentsCountPerCourse,
    searchStudent,
    searchCourse
};