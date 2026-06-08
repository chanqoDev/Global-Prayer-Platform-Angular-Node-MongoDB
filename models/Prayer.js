import mongoose from "mongoose";

const prayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  region: {
    type: String,
    required: true, 
    default: 'USA', 
  }, 
  request: { type: String, required: true },
  dateRaw: { type: String },        // ISO string
  dateFormatted: { type: String },  // es-MX display string
  urgency: { type: String, 
    enum: ["high", "medium", "low"], 
    default: "low",
    required: true 
  },
  userPrayed: { type: Boolean, default: false },
  userCandled: { type: Boolean, default: false },
  prayedCount: { type: Number, default: 0 },
  candleCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Prayer = mongoose.model("Prayer", prayerSchema);
export default Prayer;
