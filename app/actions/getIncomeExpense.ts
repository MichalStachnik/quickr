'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

const getIncomeExpense = async (): Promise<{
  income?: number;
  expense?: number;
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

    const amounts = transactions.map((t) => t.amount);

    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, curr) => acc + curr, 0);

    const expense = amounts
      .filter((item) => item < 0)
      .reduce((acc, curr) => acc + curr, 0);

    return {
      income,
      expense: Math.abs(expense),
    };
  } catch (error) {
    console.error('error', error);
    return {
      error: 'Error getting transaction',
    };
  }
};

export default getIncomeExpense;
