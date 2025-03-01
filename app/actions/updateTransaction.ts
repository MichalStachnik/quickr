'use server';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import uploadImage from '@/lib/uploadImage';

interface UpdateTransactionData {
  id: string;
  text: string;
  amount: number;
  receipt?: File | null;
}

interface TransactionResult {
  data?: {
    id: string;
    text: string;
    amount: number;
    receiptUrl?: string | null;
  };
  error?: string;
}

const updateTransaction = async (
  data: UpdateTransactionData
): Promise<TransactionResult> => {
  const { id, text, amount, receipt } = data;

  if (!text || text.trim() === '') {
    return {
      error: 'Description is required',
    };
  }

  if (!amount) {
    return {
      error: 'Amount must be greater than 0',
    };
  }

  const { userId } = await auth();

  if (!userId) {
    return {
      error: 'User not found',
    };
  }

  try {
    const existingTransaction = await db.transaction.findUnique({
      where: {
        id,
        userId,
      },
    });

    if (!existingTransaction) {
      return {
        error: 'Transaction not found',
      };
    }

    // Handle receipt upload if provided
    let receiptUrl = '';

    if (receipt && receipt.size > 0) {
      const { url, error } = await uploadImage(receipt);

      if (error) {
        return { error };
      }

      if (url) {
        receiptUrl = url;
      }
    }

    await db.transaction.update({
      where: { id, userId },
      data: { text, amount, imageUrl: receiptUrl },
    });

    revalidatePath('/');

    return { data: { id, text, amount, receiptUrl } };
  } catch (error) {
    console.error('error', error);
    return {
      error: 'Failed to update transaction',
    };
  }
};

export default updateTransaction;
