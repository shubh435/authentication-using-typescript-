import mongoose from "mongoose";

mongoose.set("strictQuery", true);
const connectToMongo = () => {
  mongoose
    .connect("mongodb://localhost:27017/authenticationWithExpress")
    .then((obj) => {
      console.log("--- Successfully connected with data base ");
    })
    .catch((error) => {
      console.error("Invalid creadential ", error);
    });
};

export default connectToMongo;
