const mongoose = require("mongoose");
const db =
  "mongodb+srv://sujitkathale:Sujit1234@cluster0.nkz9tla.mongodb.net/?retryWrites=true&w=majority";
async function connectDB() {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
  }
}
module.exports = connectDB;
