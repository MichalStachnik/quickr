'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

const getUserBalance = async (): Promise<{
  balance?: number;
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

    const balance = transactions.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);

    return {
      balance,
    };
  } catch (error) {
    console.error('error', error);
    return {
      error: 'Error getting transaction',
    };
  }
};

export default getUserBalance;
