const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST } = process.env;

async function dbConnect() {
  try {
    await mongoose.connect(DB_HOST);
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

dbConnect();
