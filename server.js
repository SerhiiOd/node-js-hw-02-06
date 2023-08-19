const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DB_HOST)
  .then(() => app.listen(3000), console.log("Server started"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
