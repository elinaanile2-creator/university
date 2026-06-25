const db = require("../config/db");


// مشاهده دروس اخذ شده دانشجو
const getEnrollments = async (req, res) => {

    try {

        const studentId = req.params.studentId;

        const result = await db.query(
            `
            SELECT
                e.id,
                c.course_code,
                c.course_name,
                c.units
            FROM enrollments e
            JOIN courses c
            ON e.course_id = c.id
            WHERE e.student_id = $1
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


// انتخاب واحد
const enrollCourse = async (req, res) => {

    try {

        const {
            student_id,
            course_id
        } = req.body;


        
        // بررسی باز بودن انتخاب واحد
        const workflow = await db.query(
    `
        SELECT enrollment_open
        FROM workflow_settings
        WHERE id = 1
    `
        );

     if (!workflow.rows[0].enrollment_open) {

     return res.status(403).json({
        message: "Enrollment is closed"
     });

     }

        // بررسی انتخاب تکراری
        const exists = await db.query(
            `
            SELECT *
            FROM enrollments
            WHERE student_id = $1
            AND course_id = $2
            `,
            [student_id, course_id]
        );

        if (exists.rows.length > 0) {

            return res.status(400).json({
                message: "Course already selected"
            });

        }


        // ظرفیت باقی مانده
        const count = await db.query(
            `
            SELECT COUNT(*) AS total
            FROM enrollments
            WHERE course_id = $1
            `,
            [course_id]
        );

        const course = await db.query(
            `
            SELECT capacity
            FROM courses
            WHERE id = $1
            `,
            [course_id]
        );


        if (
            Number(count.rows[0].total) >=
            course.rows[0].capacity
        ) {

            return res.status(400).json({
                message: "Course capacity is full"
            });

        }


        const result = await db.query(
            `
            INSERT INTO enrollments
            (
                student_id,
                course_id
            )
            VALUES ($1,$2)
            RETURNING *
            `,
            [
                student_id,
                course_id
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// حذف درس
const deleteEnrollment = async (req, res) => {

    try {

        // بررسی باز بودن حذف انتخاب واحد
        const workflow = await db.query(
    `
        SELECT enrollment_open
        FROM workflow_settings
        WHERE id = 1
    `
        );

       if (!workflow.rows[0].enrollment_open) {

        return res.status(403).json({
        message: "Enrollment is closed"
        });

       }

        const id = req.params.id;

        await db.query(
            `
            DELETE FROM enrollments
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json({
            message: "Course removed successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    getEnrollments,
    enrollCourse,
    deleteEnrollment
};
