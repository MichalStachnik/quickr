'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export interface ChartData {
  month: string;
  income: number;
  expense: number;
}

const getIncomeExpenseChartData = async (): Promise<{
  chartData?: ChartData[];
  error?: string;
}> => {
  const { userId } = await auth();

  if (!userId) {
    return {
      error: 'User not found',
    };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: {
        userId,
      },
    });

    const chartData = transactions.reduce((acc, transaction) => {
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
    }, [] as ChartData[]);
    return {
      chartData,
    };
  } catch (error) {
    console.error('error', error);
    return {
      error: 'Error getting transaction',
    };
  }
};

export default getIncomeExpenseChartData;
