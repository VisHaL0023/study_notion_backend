const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timeDuration: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  additionalUrl: {
    type: String,
  },
});

const SubSection = mongoose.model("subsection", subSectionSchema);

module.exports = SubSection;
