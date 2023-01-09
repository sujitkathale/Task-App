const mongoose = require("mongoose");
const db = process.env.MONGO_URL;
async function connectDB() {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
  }
}
module.exports = connectDB;
