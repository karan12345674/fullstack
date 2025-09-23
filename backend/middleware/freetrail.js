export const startFreeTrialIfNotExists = async (userId) => {
  const existingTrial = await UserSubscription.findOne({userId,type:"free-trial"});
  if(existingTrial) return;

  const now = new Date();
  const endDate = new Date();
  endDate.setDate(now.getDate()+2); // 2-day trial

  await UserSubscription.create({
    userId,
    type:"free-trial",
    startDate: now,
    endDate
  });

  console.log("Free trial started for user:", userId);
};