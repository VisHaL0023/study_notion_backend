const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    users: {
      type: mongoose.Schema.Types.ObjectId,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model("invoice", invoiceSchema);

module.exports = Invoice;
