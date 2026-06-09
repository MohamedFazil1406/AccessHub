import mongoose from "mongoose";

export async function connectDb() {
  await mongoose
    .connect(process.env.MONGO_DB_URL!)
    .then(() => {
      console.log("DataBase is successFully connected ");
    })
    .catch((err) => {
      console.log("Database is unSuccessFulll ", err);
    });
}
