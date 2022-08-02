import React, { useState } from "react";
import { useEffect } from "react";
import { useTransactionContext } from "../context/transactionContext";
import { getAllTransactions } from "../services/api";

const Home = () => {
  const [filter, setFilter] = useState({
    transactionType: "",
    status: "",
  });
  const {
    filterTransaction,
    setAllTransactions,
    setFilteredTransactions,
    filteredTransactions,
  } = useTransactionContext();

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getTransactions = async () => {
      const transactions = await getAllTransactions();

      setAllTransactions(transactions);
      setFilteredTransactions(transactions);
    };
    getTransactions();
  }, []);

  useEffect(() => {
    filterTransaction(filter);
  }, [filter]);

  console.log(filteredTransactions);

  return (
    <div className="h-[calc(100vh_-_56px)] flex gap-10 w-screen justify-center items-start pt-20">
      <div className="bg-white p-5">
        <h3 className="text-2xl mb-5">Filter:</h3>
        <form>
          <div>
            <label htmlFor="type" className="block text-lg mb-2">
              Transaction Type
            </label>
            <select
              name="transactionType"
              id="transactionType"
              className="border-2 p-2"
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
              className="border-2 p-2"
              onChange={handleChange}
            >
              <option value="">Select Transaction Status</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
              <option value="Success">Success</option>
            </select>
          </div>
        </form>
      </div>
      <table className="shadow-lg bg-white border-collapse">
        <thead>
          <tr>
            <th className="bg-gray-500 text-white border text-left px-8 py-4">
              #SN
            </th>
            <th className="bg-gray-500 text-white border text-left px-8 py-4">
              Party
            </th>
            <th className="bg-gray-500 text-white border text-left px-8 py-4">
              Amount
            </th>
            <th className="bg-gray-500 text-white border text-left px-8 py-4">
              Transaction Type
            </th>
            <th className="bg-gray-500 text-white text-left px-8 py-4">
              Status
            </th>
            <th className="bg-gray-500 text-white text-left px-8 py-4">Ref</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <>
              {transaction.actions.length > 0 && (
                <tr>
                  <td></td>
                  <td className="px-8 py-4 font-bold">{transaction.date}</td>
                </tr>
              )}
              {transaction.actions.map((item, idx) => (
                <tr
                  className={`border-l-4 ${
                    item.status === "Success" && "border-green-500"
                  } ${item.status === "Pending" && "border-orange-500"}
                ${item.status === "Failed" && "border-red-500"}`}
                >
                  <td className="border px-8 py-4">{idx + 1}</td>
                  <td className="border px-8 py-4">{item.party}</td>
                  <td className="border px-8 py-4">{item.amount}</td>
                  <td className="border px-8 py-4">{item.transactionType}</td>
                  <td className="border px-8 py-4">{item.status}</td>
                  <td className="border px-8 py-4">{item.ref}</td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
