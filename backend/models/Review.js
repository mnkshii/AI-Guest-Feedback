const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    guest: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      required: true,
    },

    images: [
    {
      type: String,
      default: ""
    },
    ],
    
    sentiment: {
      type: String,
      enum: ["positive", "neutral", "negative"],
      default: "neutral",
    },


 

    summary: {
      type: String,
      default: "",
    },

    aiResponse: {
      type: String,
      default: "",
    },

    aiStatus: {
      type: String,
      enum: ["Pending", "Generated"],
      default: "Pending",
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Review", reviewSchema);