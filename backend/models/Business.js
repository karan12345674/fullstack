// import mongoose from "mongoose";

// const businessSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   businessName: String,
//    // e.g. Clothing, Electronics, Grocery
//   address: String,
//   city: String,
//   state: String,
//   phone: String,
//   description: String
// }, { timestamps: true });

// export default mongoose.model("Business", businessSchema);



import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  businessName: String,
  address: String,
  city: String,
  state: String,
  phone: String,
  description: String
}, { timestamps: true });

// Check karo agar model pehle se exist karta hai
const Business = mongoose.models.Business || mongoose.model("Business", businessSchema);

export default Business;
