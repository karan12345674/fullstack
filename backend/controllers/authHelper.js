// authHelper.js
import fs from "fs";
import path from "path";

// Delete auth folder for a session
export const removeAuthFolder = (sessionId) => {
  const dir = path.join("./.wwebjs_auth_", sessionId);
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`🗑️ Auth folder removed for session: ${sessionId}`);
  }
};
