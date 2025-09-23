// controllers/messageStatsController.js
import MessageLog from "../models/MessageLog.js";

export const getBulkStats = async (req,res)=>{
  try{
    const { templateId } = req.query;
    const logs = await MessageLog.find({userId:req.userId, templateId});

    const total = logs.length;
    const sent = logs.filter(l=>l.status==="sent").length;
    const failed = logs.filter(l=>l.status==="failed").length;
    const replied = logs.filter(l=>l.status==="replied").length;

    // actual reply messages bhi bhej do
    const replies = logs.filter(l=>l.status==="replied")
                        .map(l=>({ phoneNumber: l.phoneNumber, message: l.replyMessage }));

    res.json({total, sent, failed, replied, replies});
  } catch(err){
    console.error(err);
    res.status(500).json({message:err.message});
  }
};