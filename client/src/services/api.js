import axios from "axios";

const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getAllTransactions = async () => {
  try {
    const result = await api.get("/transactions");
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
