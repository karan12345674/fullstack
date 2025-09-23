// import Template from "../models/Template.js";
// import path from "path";
// import fs from "fs";

// /**
//  * Create Template with optional file (image/video)
//  */
// export const createTemplate = async (req, res) => {
//   try {
//     const { name, category, type, description, buttons } = req.body;

//     if (!name || !category) return res.status(400).json({ message: "Name and category required" });
//     if (!["image", "video", "none"].includes(type)) return res.status(400).json({ message: "Invalid type" });

//     let fileUrl = null;
//     if ((type === "image" || type === "video") && req.file) {
//       const ext = path.extname(req.file.originalname);
//       const filename = ${Date.now()}_${req.file.originalname};
//       const uploadPath = path.join("uploads", filename);

//       fs.renameSync(req.file.path, uploadPath);
//       fileUrl = /${uploadPath};
//     } else if ((type === "image" || type === "video") && !req.file) {
//       return res.status(400).json({ message: ${type} file is required });
//     }

//     const template = await Template.create({
//       userId: req.userId,
//       name,
//       category,
//       type,
//       description,
//       buttons,
//       fileUrl
//     });

//     res.json({ message: "Template created", template });
//   } catch (err) {
//     console.error("❌ createTemplate error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// /**
//  * Get all templates for user
//  */
// export const getTemplates = async (req, res) => {
//   try {
//     const templates = await Template.find({ userId: req.userId });
//     res.json(templates);
//   } catch (err) {
//     console.error("❌ getTemplates error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// /**
//  * Update Template
//  */
// export const updateTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, category, type, description, buttons } = req.body;

//     const template = await Template.findOne({ _id: id, userId: req.userId });
//     if (!template) return res.status(404).json({ message: "Template not found" });

//     // Agar file upload hai, replace old file
//     if (req.file) {
//       if (template.fileUrl) fs.unlinkSync(path.join(".", template.fileUrl));
//       const filename = ${Date.now()}_${req.file.originalname};
//       const uploadPath = path.join("uploads", filename);
//       fs.renameSync(req.file.path, uploadPath);
//       template.fileUrl = /${uploadPath};
//     }

//     template.name = name || template.name;
//     template.category = category || template.category;
//     template.type = type || template.type;
//     template.description = description || template.description;
//     template.buttons = buttons || template.buttons;

//     await template.save();
//     res.json({ message: "Template updated", template });
//   } catch (err) {
//     console.error("❌ updateTemplate error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// /**
//  * Delete Template
//  */
// export const deleteTemplate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const template = await Template.findOne({ _id: id, userId: req.userId });
//     if (!template) return res.status(404).json({ message: "Template not found" });

//     if (template.fileUrl) fs.unlinkSync(path.join(".", template.fileUrl));
//     await Template.deleteOne({ _id: id });

//     res.json({ message: "Template deleted", id });
//   } catch (err) {
//     console.error("❌ deleteTemplate error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };






import Template from "../models/Template.js";
import fs from "fs";
import path from "path";

/**
 * Create Template
 */
export const createTemplate = async (req, res) => {
  try {
    const {
      templateName,
      category,
      language,
      broadcastType,
      body,
      footer,
      buttons: buttonsRaw
    } = req.body;

    if (!templateName || !category || !language || !body) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Parse buttons if sent as JSON string
    let buttons = [];
    if (buttonsRaw) {
      buttons = typeof buttonsRaw === "string" ? JSON.parse(buttonsRaw) : buttonsRaw;

      // Validate each button
      buttons = buttons.map(btn => {
        if (!btn.type || !btn.text) throw new Error("Each button must have type and text");
        if (btn.type === "call-to-action" && !btn.url) btn.url = "";
        return btn;
      });
    }

    // File handling
    let fileUrl = null;
    if (req.file && ["image", "video", "document"].includes(broadcastType)) {
      const filename = `${Date.now()}_${req.file.originalname}`;
      const uploadPath = path.join("uploads", filename);
      fs.renameSync(req.file.path, uploadPath);
      fileUrl = `/${uploadPath}`;
    }

    const template = await Template.create({
      userId: req.userId, // auth middleware sets req.userId
      name: templateName,
      category,
      language,
      type: broadcastType || "none",
      body: body,
      footer: footer || "",
      buttons,
      fileUrl
    });

    res.status(201).json({ message: "Template created", template });
  } catch (err) {
    console.error("❌ createTemplate error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Update Template
 */
export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      templateName,
      category,
      language,
      broadcastType,
      body,
      footer,
      buttons: buttonsRaw
    } = req.body;

    const template = await Template.findOne({ _id: id, userId: req.userId });
    if (!template) return res.status(404).json({ message: "Template not found" });

    let buttons = template.buttons;
    if (buttonsRaw) {
      buttons = typeof buttonsRaw === "string" ? JSON.parse(buttonsRaw) : buttonsRaw;

      // Validate each button
      buttons = buttons.map(btn => {
        if (!btn.type || !btn.text) throw new Error("Each button must have type and text");
        if (btn.type === "call-to-action" && !btn.url) btn.url = "";
        return btn;
      });
    }

    // Update file if uploaded
    if (req.file) {
      if (template.fileUrl) fs.unlinkSync(path.join(".", template.fileUrl));
      const filename = `${Date.now()}_${req.file.originalname}`;
      const uploadPath = path.join("uploads", filename);
      fs.renameSync(req.file.path, uploadPath);
      template.fileUrl = `/${uploadPath}`;
    }

    template.name = templateName || template.name;
    template.category = category || template.category;
    template.language = language || template.language;
    template.type = broadcastType || template.type;
    template.body = body || template.body;
    template.footer = footer || template.footer;
    template.buttons = buttons;

    await template.save();
    res.json({ message: "Template updated", template });
  } catch (err) {
    console.error("❌ updateTemplate error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get all templates for user
 */
export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({ userId: req.userId });
    res.json(templates);
  } catch (err) {
    console.error("❌ getTemplates error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Delete Template
 */
export const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await Template.findOne({ _id: id, userId: req.userId });
    if (!template) return res.status(404).json({ message: "Template not found" });

    if (template.fileUrl) fs.unlinkSync(path.join(".", template.fileUrl));
    await Template.deleteOne({ _id: id });

    res.json({ message: "Template deleted", id });
  } catch (err) {
    console.error("❌ deleteTemplate error:", err);
    res.status(500).json({ message: err.message });
  }
};