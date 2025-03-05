'use client';
import { toast } from 'react-toastify';
import { Transaction } from '@/types/Transaction';
import deleteTransaction from '../actions/deleteTransaction';
import { useRef, useState } from 'react';
import updateTransaction from '../actions/updateTransaction';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, ImagePlus, Trash2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const [formData, setFormData] = useState({
    text: transaction.text,
    amount: transaction.amount,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    transaction.imageUrl || null
  );

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleDeleteTransaction = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this');
    if (!confirmed) return;

    const { message, error } = await deleteTransaction(id);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(message);
  };

  const closeEditDialog = () => {
    dialogRef.current?.close();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await updateTransaction({
      id: transaction.id,
      text: formData.text,
      amount: formData.amount,
    });

    if (error) {
      toast.error(error);
      return;
    }

    console.log('data', data);
    toast.success('Successfully updated');
    closeEditDialog();
  };

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(transaction.amount);

  return (
    <Card
      className={`mb-4 ${
        transaction.amount < 0 ? 'border-red-300' : 'border-green-300'
      }`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>{transaction.text}</CardTitle>
          <span
            className={`text-xl font-bold ${
              transaction.amount < 0 ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {formattedAmount}
          </span>
        </div>
        <CardDescription>
          <p>{transaction.amount < 0 ? 'Expense' : 'Income'}</p>
          <p>Created: {new Date(transaction.createdAt).toDateString()}</p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        {transaction.imageUrl && (
          <div className="mt-2">
            <button
              className="w-full rounded-md overflow-hidden"
              onClick={() =>
                transaction.imageUrl &&
                window.open(transaction.imageUrl, '_blank')
              }
            >
              <div className="image-preview">
                <Image
                  src={transaction.imageUrl}
                  alt="Receipt"
                  width={200}
                  height={250}
                  style={{ objectFit: 'contain' }}
                  className="mx-auto"
                />
              </div>
            </button>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-end gap-2 pt-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
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
                    Amount (+ for income, - for expense)
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
                    <ImagePlus className="w-4 h-4 mr-2" />
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
                    <div className="col-span-4 flex justify-center mt-2">
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
                <DialogClose asChild>
                  <Button type="submit">Save changes</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleDeleteTransaction(transaction.id)}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TransactionItem;
