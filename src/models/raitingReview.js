const mongoose = require("mongoose");

const raitingSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    raiting: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
      max: [250, "Review cannot be of more than 250 characters"],
    },
  },
  { timestamps: true }
);

const RaitingReview = mongoose.model("raitingReview", raitingSchema);

module.export = RaitingReview;
