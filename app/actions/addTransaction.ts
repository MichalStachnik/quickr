'use server';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import uploadImage from '@/lib/uploadImage';

interface TransactionData {
  text: string;
  amount: number;
  receiptUrl?: string;
}

interface TransactionResult {
  data?: TransactionData;
  error?: string;
}

const addTransaction = async (
  formData: FormData
): Promise<TransactionResult> => {
  const textValue = formData.get('text');
  const amountValue = formData.get('amount');
  const receiptFile = formData.get('receipt') as File;

  if (!textValue || textValue === '' || !amountValue) {
    const reason = !textValue || textValue === '' ? 'Text' : 'Amount';
    return {
      error: `${reason} value missing`,
    };
  }

  const text: string = textValue.toString();
  const amount: number = parseFloat(amountValue.toString());

  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    let receiptUrl = '';

    if (receiptFile && receiptFile.size > 0) {
      const { url, error } = await uploadImage(receiptFile);

      if (error) {
        return { error };
      }

      if (url) {
        receiptUrl = url;
      }
    }

    const transactionData: TransactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId,
        imageUrl: receiptUrl,
      },
    });

    revalidatePath('/');

    return { data: transactionData };
  } catch (error) {
    console.error('error', error);
    return {
      error: 'Transaction failed',
    };
  }
};

export default addTransaction;
