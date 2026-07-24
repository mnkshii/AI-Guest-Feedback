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

    
    sentiment: {
      type: String,
      enum: ["positive", "neutral", "negative"],
      default: "neutral",
    },


 

    summary: {
      type: String,
      default: "",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
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
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Review", reviewSchema);