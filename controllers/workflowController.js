const db = require("../config/db");


// مشاهده وضعیت سیستم
const getWorkflowStatus = async (req, res) => {

    try {

        const result = await db.query(
            `
            SELECT
                enrollment_open,
                grading_open
            FROM workflow_settings
            WHERE id = 1
            `
        );

        res.status(200).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// تغییر وضعیت انتخاب واحد
const updateEnrollmentStatus = async (req, res) => {

    try {

        const { enrollment_open } = req.body;

        const result = await db.query(
            `
            UPDATE workflow_settings
            SET enrollment_open = $1
            WHERE id = 1
            RETURNING *
            `,
            [enrollment_open]
        );

        res.status(200).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// تغییر وضعیت ثبت نمرات
const updateGradingStatus = async (req, res) => {

    try {

        const { grading_open } = req.body;

        const result = await db.query(
            `
            UPDATE workflow_settings
            SET grading_open = $1
            WHERE id = 1
            RETURNING *
            `,
            [grading_open]
        );

        res.status(200).json(result.rows[0]);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    getWorkflowStatus,
    updateEnrollmentStatus,
    updateGradingStatus
};