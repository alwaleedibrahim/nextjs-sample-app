import { default as mongoose } from "mongoose";

export default function dbConnect() {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Connected to DB server");
    })
    .catch((error) => {
      console.error(error.message);
    });
}
