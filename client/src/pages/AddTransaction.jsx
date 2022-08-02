import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactionContext } from "../context/transactionContext";
import { api, getAllTransactions } from "../services/api";

const AddTransaction = () => {
  const [data, setData] = useState({
    party: "",
    amount: "",
    transactionType: "",
    status: "",
  });
  const { setAllTransactions, setFilteredTransactions } =
    useTransactionContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/transactions", data);
      const transactions = await getAllTransactions();

      setAllTransactions(transactions);
      setFilteredTransactions(transactions);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh_-_56px)] w-full  justify-center items-center">
      <h1 className="text-teal-500 text-5xl text-center my-10 italic font-serif">
        Add Transaction
      </h1>
      <div className="bg-white max-w-xl mx-auto p-10">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="party" className="block text-lg">
              Party
            </label>
            <input
              type="party"
              name="party"
              id="party"
              value={data.party}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 outline-none p-1 text-gray-600 focus:border-teal-500"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-lg">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={data.amount}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 outline-none p-1 text-gray-600 focus:border-teal-500"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-lg mb-2">
              Transaction Type
            </label>
            <select
              name="transactionType"
              id="transactionType"
              className="border-2 p-2 w-full"
              onChange={handleChange}
            >
              <option value="">Select Transaction Type</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
              <option value="Reversal">Reversal</option>
            </select>
          </div>
          <div className="mt-5">
            <label htmlFor="status" className="block text-lg mb-2">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="border-2 p-2 w-full"
              onChange={handleChange}
            >
              <option value="">Select Transaction Status</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Success">Success</option>
            </select>
          </div>

          <button
            type="submit"
            className="border-2 border-teal-500 text-teal-500 py-2 w-full font-bold hover:bg-teal-500 hover:text-white duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
