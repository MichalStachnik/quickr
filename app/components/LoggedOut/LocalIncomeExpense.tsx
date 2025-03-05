'use client';

import { useTransactions } from '@/context/TransactionContext';
import GlowingCard from '../GlowingCard';

const LocalIncomeExpense = () => {
  const { income, expense } = useTransactions();

  return (
    <div className="grid grid-cols-2 gap-4 my-8">
      <GlowingCard title="Income" numberValue={income} />
      <GlowingCard title="Expenses" numberValue={expense} />
    </div>
  );
};

export default LocalIncomeExpense;
