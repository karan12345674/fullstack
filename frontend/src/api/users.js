import axios from "axios";

const API = "http://localhost:5000/api";

export async function getUsers() {
  try {
    const res = await axios.get(`${API}/users`);
    return res.data;
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}