'use client';

import { useTransactions } from '@/context/TransactionContext';
import GlowingCard from '../GlowingCard';

const LocalIncomeExpense = () => {
  const { income, expense } = useTransactions();

  return (
    <div className="grid grid-cols-2 gap-4 my-8">
      <GlowingCard
        title="Income"
        numberValue={income}
        numberColor="text-emerald-400"
      />
      <GlowingCard
        title="Expenses"
        numberValue={expense}
        numberColor="text-rose-400"
      />
    </div>
  );
};

export default LocalIncomeExpense;
