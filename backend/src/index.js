import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
import Razorpay from "razorpay";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 5000;

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_ID_SECRET,
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error in connecting to MongoDB: ", error);
  });
