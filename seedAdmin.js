const bcrypt = require("bcrypt");
const db = require("./config/db");

async function seed() {
    try {
        console.log("Seed started");

        const hash = await bcrypt.hash("123456", 10);

        await db.query(
            `INSERT INTO users
            (first_name,last_name,username,password,role)
            VALUES($1,$2,$3,$4,$5)`,
            [
                "Admin",
                "System",
                "admin",
                hash,
                "manager"
            ]
        );

        console.log("Admin created");

    } catch (err) {
        console.error(err);
    } finally {
        process.exit();
    }
}

seed();