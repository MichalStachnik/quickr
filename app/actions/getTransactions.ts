'use server';
import { db } from '@/lib/db';
import { Transaction } from '@/types/Transaction';
import { auth } from '@clerk/nextjs/server';

const getTransactions = async (): Promise<{
  transactions?: Transaction[];
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      transactions,
    };
  } catch (error) {
    console.error('error', error);
    return {
      error: 'Error getting transaction',
    };
  }
};

export default getTransactions;
