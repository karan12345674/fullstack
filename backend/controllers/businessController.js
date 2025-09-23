import Business from "../models/Business.js";

// ✅ Register Business
export const registerBusiness = async (req, res) => {
  try {
    const { businessName,  address,city,state, phone, description } = req.body;

    const newBusiness = new Business({
      userId: req.userId, // ✅ logged-in user ka ID (auth middleware se aana chahiye)
      businessName,
      
      address,
      city,
      state,
      phone,
      description,
    });

    await newBusiness.save();

    res.status(201).json({
      success: true,
      message: "Business registered successfully",
      business: newBusiness,
    });
  } catch (err) {
    console.error("Register business error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while registering business",
      error: err.message,
    });
  }
};

// ✅ Get all businesses of logged-in user
export const getMyBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find({ userId: req.userId });

    res.status(200).json({
      success: true,
      count: businesses.length,
      businesses,
    });
  } catch (err) {
    console.error("Get businesses error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching businesses",
      error: err.message,
    });
  }
};

// ✅ Update business (delete option hata diya)
export const updateBusiness = async (req, res) => {
  try {
    const business = await Business.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId }, // ✅ user ki ownership check
      req.body,
      { new: true }
    );

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found or not yours",
      });
    }

    res.status(200).json({
      success: true,
      message: "Business updated successfully",
      business,
    });
  } catch (err) {
    console.error("Update business error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while updating business",
      error: err.message,
    });
  }
};