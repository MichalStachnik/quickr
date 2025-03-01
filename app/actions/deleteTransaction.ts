'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

const deleteTransaction = async (
  id: string
): Promise<{
  message?: string;
  error?: string;
}> => {
  const { userId } = await auth();

  if (!userId) {
    return {
      error: 'User not found',
    };
  }

  try {
    await db.transaction.delete({
      where: {
        id,
        userId,
      },
    });

    revalidatePath('/');
    return {
      message: 'Transaction deleted',
    };
  } catch (error) {
    console.error('error', error);
    return {
      error: 'Error deleting transaction',
    };
  }
};

export default deleteTransaction;
