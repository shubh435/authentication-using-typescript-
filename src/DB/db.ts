import mongoose from "mongoose";

mongoose.set("strictQuery", true);
const connectToMongo = () => {
  mongoose
    .connect("mongodb://localhost:27017/crud-operation")
    .then((obj) => {
      console.log("---successfully connected with data base ");
    })
    .catch((error) => {
      console.error("Invalid creadential ", error);
    });
};

export default connectToMongo;
