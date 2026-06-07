
import mongoose from "mongoose";

const ProfileViewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    viewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    referrer: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    duration: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ProfileView = mongoose.models.ProfileView || mongoose.model("ProfileView", ProfileViewSchema);

export default ProfileView;
