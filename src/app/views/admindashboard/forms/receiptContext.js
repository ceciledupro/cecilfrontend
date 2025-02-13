// src/context/receiptContex.js
import React, { createContext, useContext, useReducer } from "react";

const receiptContex = createContext();

const initialState = {
  loading: false,
};

const receiptReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_RECEIPT_START":
      return { ...state, loading: true };
    case "CREATE_RECEIPT_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_RECEIPT_ERROR":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const ReceiptProvider = ({ children }) => {
  const [state, dispatch] = useReducer(receiptReducer, initialState);

  return (
    <receiptContex.Provider value={{ state, dispatch }}>
      {children}
    </receiptContex.Provider>
  );
};

const useReceipt = () => {
  const context = useContext(receiptContex);
  if (!context) {
    throw new Error("useReceipt must be used within a ReceiptProvider");
  }
  return context;
};

export { ReceiptProvider, useReceipt };
