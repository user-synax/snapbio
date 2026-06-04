
import mongoose from "mongoose";

const PromoCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    plan: {
      type: String,
      enum: ["monthly", "quarterly", "annual"],
      required: true,
    },
    isRedeemed: {
      type: Boolean,
      default: false,
    },
    redeemedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    redeemedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const PromoCode =
  mongoose.models.PromoCode || mongoose.model("PromoCode", PromoCodeSchema);

export default PromoCode;
