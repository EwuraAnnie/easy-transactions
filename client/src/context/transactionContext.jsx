import { createContext, useContext, useState } from "react";

const TransactionContext = createContext({
  allTransactions: [],
  setAllTransactions: (transactions) => {},
  filteredTransactions: [],
  setFilteredTransactions: (transactions) => {},
  filterTransaction: () => {},
});

export const TransactionContextProvider = ({ children }) => {
  const [allTransactions, setAllTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const filterTransaction = (value) => {
    console.log(value);
    if (value.transactionType === "" && value.status === "") {
      setFilteredTransactions(allTransactions);
    } else if (value.status === "") {
      const newTransaction = allTransactions.map((transaction) => {
        return {
          ...transaction,
          actions: transaction.actions.filter(
            (item) => item.transactionType === value.transactionType
          ),
        };
      });
      setFilteredTransactions(newTransaction);
    } else if (value.transactionType === "") {
      const newTransaction = allTransactions.map((transaction) => {
        return {
          ...transaction,
          actions: transaction.actions.filter(
            (item) => item.status === value.status
          ),
        };
      });
      setFilteredTransactions(newTransaction);
    } else {
      const newTransaction = allTransactions.map((transaction) => {
        return {
          ...transaction,
          actions: transaction.actions.filter(
            (item) =>
              item.transactionType === value.transactionType &&
              item.status === value.status
          ),
        };
      });
      setFilteredTransactions(newTransaction);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        setAllTransactions,
        setFilteredTransactions,
        filteredTransactions,
        filterTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => useContext(TransactionContext);
