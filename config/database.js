require("dotenv").config();
const { Sequelize } = require("sequelize");

// now, we are creating an instance of Sequelize
const sqlize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

// we are testing db connection
async function connectToDb() {
    try {
        await sqlize.authenticate();
        console.log("Connected to PostgreSQL successfully");

        await sqlize.sync();
        console.log("Database connected and synced");
    } catch (error) {
        console.error("Database connection unsuccessful", error);
        process.exit(1);
    }
}

module.exports = { sqlize, connectToDb };