const db = require("../config/db");


// مشاهده نمرات یک درس
const getGradesByCourse = async (req, res) => {

    try {

        const courseId = req.params.courseId;

        const result = await db.query(
            `
            SELECT
                g.id,
                s.student_number,
                u.first_name,
                u.last_name,
                g.grade
            FROM grades g
            JOIN enrollments e
                ON g.enrollment_id = e.id
            JOIN students s
                ON e.student_id = s.id
            JOIN users u
                ON s.user_id = u.id
            WHERE e.course_id = $1
            `,
            [courseId]
        );

        res.status(200).json(result.rows);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// ثبت نمره
const addGrade = async (req, res) => {

    try { 
        
         // بررسی باز بودن ثبت نمرات
          const workflow = await db.query(
    `
               SELECT grading_open
               FROM workflow_settings
               WHERE id = 1
    `
            );

            if (!workflow.rows[0].grading_open) {

             return res.status(403).json({
             message: "Grading is closed"
              });

             }


        const {
            enrollment_id,
            grade
        } = req.body;


        const exists = await db.query(
            `
            SELECT *
            FROM grades
            WHERE enrollment_id = $1
            `,
            [enrollment_id]
        );

        if (exists.rows.length > 0) {

            return res.status(400).json({
                message: "Grade already exists"
            });

        }

        const result = await db.query(
            `
            INSERT INTO grades
            (
                enrollment_id,
                grade
            )
            VALUES ($1,$2)
            RETURNING *
            `,
            [
                enrollment_id,
                grade
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    
    }



        

    
};


// ویرایش نمره
const updateGrade = async (req, res) => {

    try {

           // بررسی باز بودن ویرایش نمرات
           const workflow = await db.query(
    `
            SELECT grading_open
            FROM workflow_settings
            WHERE id = 1
    `
          );

          if (!workflow.rows[0].grading_open) {

         return res.status(403).json({
          message: "Grading is closed"
           });

            }



        const id = req.params.id;

        const { grade } = req.body;

        const result = await db.query(
            `
            UPDATE grades
            SET grade = $1
            WHERE id = $2
            RETURNING *
            `,
            [
                grade,
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


module.exports = {
    getGradesByCourse,
    addGrade,
    updateGrade
};