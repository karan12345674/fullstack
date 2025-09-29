// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import UserSubscription from "../models/UserSubscription.js";

// // ✅ JWT generate function
// // const generateToken = (userId) => {
// //   return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
// // };

// export const startFreeTrial = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // 👉 check if user exists
//     let user = await User.findOne({ email });

//     if (!user) {
//       // naya user → hash password
//       const hashedPassword = await bcrypt.hash(password, 10);
//       user = await User.create({ name, email, password: hashedPassword });
//     } else {
//       // existing user → password verify
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({
//           success: false,
//           message: "Wrong password",
//         });
//       }
//     }

//     // 👉 check if already used trial
//     const existingTrial = await UserSubscription.findOne({
//       userId: user._id,
//       type: "free-trial",
//     });

//     if (existingTrial) {
//       return res.status(400).json({
//         success: false,
//         message: "Free trial already used",
//       });
//     }

//     // 👉 start new trial
//     const now = new Date();
//     const endDate = new Date();
//     endDate.setDate(now.getDate() + 2);

//     await UserSubscription.create({
//       userId: user._id,
//       type: "free-trial",
//       startDate: now,
//       endDate,
//       status: "active",
//     });

//     // ✅ generate JWT and set cookie
//     // const token = generateToken(user._id);
//     // res.cookie("token", token, {
//     //   httpOnly: true,
//     //   secure: process.env.NODE_ENV === "production",
//     //   sameSite: "strict",
//     //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//     // });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
//             res.cookie("token", token, {
//                 httpOnly: true,
//                 secure: false,
//                 sameSite: "lax",
//                 maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
//             });

//     // ✅ response with user info
//     res.status(200).json({
//       success: true,
//       message: "Free trial started & user logged in",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//       trial: { startDate: now, endDate },
//     });
//   } catch (error) {
//     console.error("Free trial error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };







// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import UserSubscription from "../models/UserSubscription.js";
// import Plan from "../models/Plan.js"; // Plan model

// export const startFreeTrial = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // 1️⃣ check if user exists
//     let user = await User.findOne({ email });

//     if (!user) {
//       // create new user
//       const hashedPassword = await bcrypt.hash(password, 10);
//       user = await User.create({ name, email, password: hashedPassword });
//     } else {
//       // login existing user
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ success: false, message: "Wrong password" });
//       }
//     }

//     // 2️⃣ check if user already has free trial
//     const existingTrial = await UserSubscription.findOne({
//       userId: user._id,
//       type: "free-trial",
//       isActive: true,
//       endDate: { $gte: new Date() }
//     });

//     if (existingTrial) {
//       return res.status(400).json({ success: false, message: "Free trial already active" });
//     }

//     // 3️⃣ get free trial plan from Plan collection
//     const freeTrialPlan = await Plan.findOne({ type: "free-trial" });
//     if (!freeTrialPlan) {
//       return res.status(400).json({ success: false, message: "Free trial plan not found" });
//     }

//     // 4️⃣ start free trial
//     const now = new Date();
//     const endDate = new Date();
//     endDate.setDate(now.getDate() + 2); // 2 days trial

//     const newSubscription = await UserSubscription.create({
//       userId: user._id,
//       planId: freeTrialPlan._id,  // ✅ required field
//       type: "free-trial",
//       startDate: now,
//       endDate,
//       isActive: true
//     });

//     // 5️⃣ generate JWT
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false, // production me true
//       sameSite: "lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000
//     });

//     // 6️⃣ response
//     res.status(200).json({
//       success: true,
//       message: "Free trial started & user logged in",
//       user: { id: user._id, name: user.name, email: user.email },
//       trial: { startDate: now, endDate }
//     });

//   } catch (error) {
//     console.error("Free trial error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };















// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import UserSubscription from "../models/UserSubscription.js";
// import Plan from "../models/Plan.js"; // Plan model

// export const startFreeTrial = async (req, res) => {
//   try {
//     const { name, email, password, planId } = req.body;

//     // 1️⃣ check if user exists
//     let user = await User.findOne({ email });

//     if (!user) {
//       // create new user
//       const hashedPassword = await bcrypt.hash(password, 10);
//       user = await User.create({ name, email, password: hashedPassword });
//     } else {
//       // login existing user
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ success: false, message: "Wrong password" });
//       }
//     }

//     // 2️⃣ check if user already has free trial
//     const existingTrial = await UserSubscription.findOne({
//       userId: user._id,
//       type: "free-trial",
//       isActive: true,
//       endDate: { $gte: new Date() }
//     });

//     if (existingTrial) {
//       return res.status(400).json({ success: false, message: "Free trial already active" });
//     }

//     // 3️⃣ get plan: frontend planId or default free-trial
//     let selectedPlan;
//     if (planId) {
//       selectedPlan = await Plan.findById(planId);
//       if (!selectedPlan) {
//         return res.status(400).json({ success: false, message: "Plan not found" });
//       }
//     } else {
//       selectedPlan = await Plan.findOne({ type: "free-trial" });
//       if (!selectedPlan) {
//         return res.status(400).json({ success: false, message: "Default free trial plan not found" });
//       }
//     }

//     // 4️⃣ start subscription
//     const now = new Date();
//     const endDate = new Date();
//     // use plan duration if available, otherwise 2 days
//     if (selectedPlan.durationDays) {
//       endDate.setDate(now.getDate() + selectedPlan.durationDays);
//     } else {
//       endDate.setDate(now.getDate() + 2);
//     }

//     await UserSubscription.create({
//       userId: user._id,
//       planId: selectedPlan._id,
//       type: selectedPlan.type,
//       startDate: now,
//       endDate,
//       isActive: true
//     });

//     // 5️⃣ generate JWT
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false, // production me true
//       sameSite: "lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000
//     });

//     // 6️⃣ response
//     res.status(200).json({
//       success: true,
//       message: "Free trial started & user logged in",
//       token, // ✅ send token
//       user: { id: user._id, name: user.name, email: user.email },
//       trial: { startDate: now, endDate, planId: selectedPlan._id }
//     });

//   } catch (error) {
//     console.error("Free trial error:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };











import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import UserSubscription from "../models/UserSubscription.js";
import Plan from "../models/Plan.js";

export const startFreeTrial = async (req, res) => {
  try {
    const { name, email, password, planId } = req.body;

    // 1️⃣ Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({ name, email, password: hashedPassword });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Wrong password" });
      }
    }

    // 2️⃣ Check if user already has an active free trial
    const existingTrial = await UserSubscription.findOne({
      userId: user._id,
      type: "free-trial",
      isActive: true,
      endDate: { $gte: new Date() }
    });

    if (existingTrial) {
      return res.status(400).json({ success: false, message: "Free trial already active" });
    }

    // 3️⃣ Get plan (frontend planId or default free-trial)
    let selectedPlan;
    if (planId) {
      selectedPlan = await Plan.findById(planId);
      if (!selectedPlan) {
        return res.status(400).json({ success: false, message: "Plan not found" });
      }
    } else {
      selectedPlan = await Plan.findOne({ type: "free-trial" });
      if (!selectedPlan) {
        return res.status(400).json({ success: false, message: "Default free trial plan not found" });
      }
    }

    // 4️⃣ Start subscription
    const now = new Date();
    const endDate = new Date();
    endDate.setDate(now.getDate() + (selectedPlan.durationDays || 2)); // fallback 2 days

    await UserSubscription.create({
      userId: user._id,
      planId: selectedPlan._id,
      type: selectedPlan.type || "free-trial",
      startDate: now,
      endDate,
      isActive: true
    });

    // 5️⃣ Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // production me true
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // 6️⃣ Send response
    res.status(200).json({
      success: true,
      message: "Free trial started & user logged in",
      token,
      user: { id: user._id, name: user.name, email: user.email },
      trial: { startDate: now, endDate, planId: selectedPlan._id }
    });

  } catch (error) {
    console.error("Free trial error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
