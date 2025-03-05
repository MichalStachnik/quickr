'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Transaction } from '@/types/Transaction';
import { ChartData } from '@/app/actions/getIncomeExpenseChartData';
import { v4 as uuidv4 } from 'uuid';

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (text: string, amount: number, imageUrl?: string) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (
    id: string,
    text: string,
    amount: number,
    imageUrl?: string
  ) => void;
  balance: number;
  income: number;
  expense: number;
  chartData: ChartData[];
};

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quickr_transactions');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Calculate derived values
  const balance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = Math.abs(
    transactions
      .filter((t) => t.amount < 0)
      .reduce((acc, t) => acc + t.amount, 0)
  );

  // Generate chart data
  const chartData = transactions.reduce((acc: ChartData[], transaction) => {
    const date = new Date(transaction.createdAt);
    const month = date.toLocaleString('default', { month: 'long' });

    const existingMonth = acc.find((item) => item.month === month);

    if (!existingMonth) {
      acc.push({
        month,
        income: transaction.amount > 0 ? transaction.amount : 0,
        expense: transaction.amount < 0 ? Math.abs(transaction.amount) : 0,
      });
    } else {
      if (transaction.amount > 0) {
        existingMonth.income += transaction.amount;
      } else {
        existingMonth.expense += Math.abs(transaction.amount);
      }
    }

    return acc;
  }, []);

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('quickr_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // CRUD operations
  const addTransaction = (text: string, amount: number, imageUrl?: string) => {
    const newTransaction: Transaction = {
      id: uuidv4(),
      text,
      amount,
      imageUrl: imageUrl || null,
      userId: 'guest',
      createdAt: new Date(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  const updateTransaction = (
    id: string,
    text: string,
    amount: number,
    imageUrl?: string
  ) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id
          ? {
              ...transaction,
              text,
              amount,
              imageUrl: imageUrl || transaction.imageUrl,
            }
          : transaction
      )
    );
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        balance,
        income,
        expense,
        chartData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      'useTransactions must be used within a TransactionProvider'
    );
  }
  return context;
};
