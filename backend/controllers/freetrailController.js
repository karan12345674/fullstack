import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import UserSubscription from "../models/UserSubscription.js";

// ✅ JWT generate function
// const generateToken = (userId) => {
//   return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

export const startFreeTrial = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 👉 check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // naya user → hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({ name, email, password: hashedPassword });
    } else {
      // existing user → password verify
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Wrong password",
        });
      }
    }

    // 👉 check if already used trial
    const existingTrial = await UserSubscription.findOne({
      userId: user._id,
      type: "free-trial",
    });

    if (existingTrial) {
      return res.status(400).json({
        success: false,
        message: "Free trial already used",
      });
    }

    // 👉 start new trial
    const now = new Date();
    const endDate = new Date();
    endDate.setDate(now.getDate() + 2);

    await UserSubscription.create({
      userId: user._id,
      type: "free-trial",
      startDate: now,
      endDate,
      status: "active",
    });

    // ✅ generate JWT and set cookie
    // const token = generateToken(user._id);
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

    // ✅ response with user info
    res.status(200).json({
      success: true,
      message: "Free trial started & user logged in",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      trial: { startDate: now, endDate },
    });
  } catch (error) {
    console.error("Free trial error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};