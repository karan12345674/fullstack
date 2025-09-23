import Contact from "../models/Contact.js";
import csvParser from "csv-parser";   // ✅ csv-parser module import
import fs from "fs";

/**
 * Upload CSV & Import Contacts
 * - CSV se contacts save karo
 * - Frontend ko turant contacts list bhejo
 */
export const uploadContacts = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "CSV file required" });

    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csvParser())   // ✅ yaha use kiya
      .on("data", (data) => {
        if (data.phoneNumber) {
          results.push({
            userId: req.userId, // ✅ middleware se
            name: data.name || "",
            phoneNumber: data.phoneNumber,
            tags: data.tags ? data.tags.split(",") : [],
          });
        }
      })
      .on("end", async () => {
        // ✅ Save contacts
        const contacts = await Contact.insertMany(results);
        fs.unlinkSync(req.file.path);

        // ✅ Return full contacts list for frontend
        res.json({
          message: "Contacts imported successfully",
          contacts,
        });
      });
  } catch (err) {
    console.error("❌ uploadContacts error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Add Single Contact
 */
export const addContact = async (req, res) => {
  try {
    const { name, phoneNumber, tags } = req.body;
    if (!phoneNumber) return res.status(400).json({ message: "Phone number required" });

    const contact = await Contact.create({
      userId: req.userId,
      name,
      phoneNumber,
      tags,
    });

    res.json({ message: "Contact added", contact });
  } catch (err) {
    console.error("❌ addContact error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Get All Contacts (user ke saare contacts)
 */
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.userId });
    res.json(contacts);
  } catch (err) {
    console.error("❌ getContacts error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Update Contact
 */
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phoneNumber, tags } = req.body;

    const contact = await Contact.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { name, phoneNumber, tags },
      { new: true }
    );

    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact updated", contact });
  } catch (err) {
    console.error("❌ updateContact error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * Delete Single Contact
 */
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Contact.findOneAndDelete({ _id: id, userId: req.userId });
    if (!result) return res.status(404).json({ message: "Contact not found" });

    res.json({ message: "Contact deleted", id });
  } catch (err) {
    console.error("❌ deleteContact error:", err);
    res.status(500).json({ message: err.message });
  }
};