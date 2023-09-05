import { Sequelize } from "sequelize";

const nameBd = `${process.env.NAMEBD}`;
const userBd = `${process.env.USERBD}`;
const passwordBd = `${process.env.PASSBD}`;
const host = `${process.env.HOST}`;

const sequelize = new Sequelize(nameBd, userBd, passwordBd, {
  host: host,
  dialect: "mysql",
});

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

export { sequelize, connectDatabase };
