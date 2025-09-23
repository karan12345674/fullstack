import fs from "fs";
import { parse } from "csv-parse";
// import csvParse from "csv-parse";
import path from "path";

export const uploadCSV = async (req,res) => {
  if(!req.file) return res.status(400).json({ error: "No file" });
  const content = fs.readFileSync(req.file.path);
  csvParse(content, { columns: true, trim: true }, (err, records) => {
    if(err) return res.status(400).json({ error: err.message });
    // records is array of {name,phone,email,segment}
    res.json({ success:true, recipients: records });
  });
};