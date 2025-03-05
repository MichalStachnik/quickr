'use client';

import { toast } from 'react-toastify';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlus } from 'lucide-react';
import { useTransactions } from '@/context/TransactionContext';
import { Transaction } from '@/types/Transaction';

const LocalTransactionItem = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  const { deleteTransaction, updateTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    text: transaction.text,
    amount: transaction.amount,
  });
  const [previewUrl, setPreviewUrl] = useState(transaction.imageUrl || null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteTransaction = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this?');
    if (!confirmed) return;

    deleteTransaction(id);
    toast.success('Transaction deleted');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTransaction(
      transaction.id,
      formData.text,
      formData.amount,
      previewUrl || undefined
    );
    toast.success('Transaction updated');
    setIsOpen(false);
  };

  return (
    <>
      <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
        <div className="transaction-content">
          <span className="transaction-text">{transaction.text}</span>
          <span className="transaction-amount">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(transaction.amount)}
          </span>

          {transaction.imageUrl && (
            <div>
              <button
                className="view-receipt-btn"
                onClick={() =>
                  transaction.imageUrl &&
                  window.open(transaction.imageUrl, '_blank')
                }
              >
                <div className="image-preview">
                  <Image
                    src={transaction.imageUrl}
                    alt="Receipt preview"
                    width={200}
                    height={250}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </button>
            </div>
          )}
        </div>

        <div className="transaction-actions">
          <button
            onClick={() => handleDeleteTransaction(transaction.id)}
            className="delete-btn"
            aria-label="Delete transaction"
          >
            x
          </button>
        </div>
      </li>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Transaction</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Edit transaction</DialogTitle>
              <DialogDescription>
                Make changes to your transaction here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-text" className="text-right">
                  Description
                </Label>
                <Input
                  className="col-span-3"
                  type="text"
                  id="edit-text"
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-amount" className="text-right">
                  Amount
                </Label>
                <Input
                  className="col-span-3"
                  type="number"
                  id="edit-amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  step="0.01"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-receipt" className="text-right">
                  Receipt Image
                </Label>
                <Button
                  type="button"
                  variant="secondary"
                  className="col-span-3"
                  onClick={() =>
                    document.getElementById('edit-receipt')?.click()
                  }
                >
                  <ImagePlus />
                  Add Receipt Image
                </Button>
                <Input
                  className="hidden"
                  type="file"
                  id="edit-receipt"
                  name="receipt"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                {previewUrl && (
                  <div className="image-preview col-span-4 mt-2">
                    <Image
                      src={previewUrl}
                      alt="Receipt preview"
                      width={200}
                      height={250}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LocalTransactionItem;
