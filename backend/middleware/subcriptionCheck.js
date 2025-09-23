// middlewares/subscriptionCheck.js
import UserSubscription from "../models/UserSubscription.js";

export const checkSubscription = async (req,res,next)=>{
  const userId = req.userId;

  const subscription = await UserSubscription.findOne({
    userId,
    isActive: true,
    endDate: {$gte: new Date()}
  }).sort({endDate:-1});

  if(!subscription){
    return res.status(403).json({message:"Subscription expired. Start free trial or buy a plan."});
  }

  req.subscription = subscription;
  next();
};