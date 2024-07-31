const app = require("./app");
const dotenv=require("dotenv");
const connectDatabase = require("./database");

//Config
dotenv.config();

// Connecting to database
connectDatabase();

const server = app.listen(5000, () => {
  console.log("Server is working");
});
