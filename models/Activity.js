import mongoose from "mongoose";

const ActivitySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        type: {
            type: String,
            enum: [
                "link_created",
                "link_clicked",
                "profile_viewed",
                "profile_updated",
            ],
            required: true,
        },
        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    },
);

const Activity =
    mongoose.models.Activity || mongoose.model("Activity", ActivitySchema);

export default Activity;
