'use client';

import { useTransactions } from '@/context/TransactionContext';
import SimpleChart from '../SimpleChart';

const LocalIncomeExpenseChart = () => {
  const { chartData } = useTransactions();

  if (!chartData || chartData.length === 0) return null;
  return <SimpleChart chartData={chartData} />;
};

export default LocalIncomeExpenseChart;
