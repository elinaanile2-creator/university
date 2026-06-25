const db = require("../config/db");


// کارنامه ترم
const getSemesterTranscript = async (req, res) => {

    try {

        const studentId = req.params.studentId;
        const semesterId = req.params.semesterId;

        const result = await db.query(
            `
            SELECT
                c.course_code,
                c.course_name,
                c.units,
                g.grade
            FROM enrollments e
            JOIN courses c
                ON e.course_id = c.id
            JOIN grades g
                ON e.id = g.enrollment_id
            WHERE e.student_id = $1
            AND c.semester_id = $2
            `,
            [studentId, semesterId]
        );

        res.status(200).json(result.rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// کارنامه کل
const getFullTranscript = async (req, res) => {

    try {

        const studentId = req.params.studentId;

        const result = await db.query(
            `
            SELECT
                c.course_code,
                c.course_name,
                c.units,
                s.title AS semester,
                g.grade
            FROM enrollments e
            JOIN courses c
                ON e.course_id = c.id
            JOIN grades g
                ON e.id = g.enrollment_id
            JOIN semesters s
                ON c.semester_id = s.id
            WHERE e.student_id = $1
            ORDER BY s.title
            `,
            [studentId]
        );

        res.status(200).json(result.rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// معدل ترم
const getSemesterAverage = async (req, res) => {

    try {

        const studentId = req.params.studentId;
        const semesterId = req.params.semesterId;

        const result = await db.query(
            `
            SELECT
                ROUND(
                    SUM(c.units * g.grade)
                    /
                    SUM(c.units)
                ,2)
                AS average
            FROM enrollments e
            JOIN courses c
                ON e.course_id = c.id
            JOIN grades g
                ON e.id = g.enrollment_id
            WHERE e.student_id = $1
            AND c.semester_id = $2
            `,
            [studentId, semesterId]
        );

        res.status(200).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// معدل کل
const getTotalAverage = async (req, res) => {

    try {

        const studentId = req.params.studentId;

        const result = await db.query(
            `
            SELECT
                ROUND(
                    SUM(c.units * g.grade)
                    /
                    SUM(c.units)
                ,2)
                AS average
            FROM enrollments e
            JOIN courses c
                ON e.course_id = c.id
            JOIN grades g
                ON e.id = g.enrollment_id
            WHERE e.student_id = $1
            `,
            [studentId]
        );

        res.status(200).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    getSemesterTranscript,
    getFullTranscript,
    getSemesterAverage,
    getTotalAverage
};