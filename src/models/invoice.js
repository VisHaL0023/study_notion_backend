import { Schema, model } from "mongoose";

const invoiceSchema = new Schema(
  {
    users: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    courseName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Courses",
    },
  },
  { timestamps: true }
);

const Invoice = model("invoice", invoiceSchema);

export default Invoice;
