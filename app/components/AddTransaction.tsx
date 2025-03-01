'use client';
import { useRef, useState } from 'react';
import addTransaction from '../actions/addTransaction';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImagePlus, Plus } from 'lucide-react';

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const clientAction = async (formData: FormData) => {
    const { data, error } = await addTransaction(formData);
    console.log('data', data);

    if (error) {
      toast.error(error);
    } else {
      toast.success('Transaction added');
      setPreviewUrl(null);
      formRef.current?.reset();
    }
  };
  return (
    <div>
      <h3>Add Transaction</h3>
      <form ref={formRef} action={clientAction}>
        <div className="form-control">
          <label htmlFor="text">Income or Expense</label>
          <Input
            type="text"
            id="text"
            name="text"
            placeholder="Enter Icome or Expense"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="amount">Amount (+ for income, - for expense)</label>
          <Input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            step="0.01"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="receipt">Receipt Image (optional)</label>
          <div className="relative">
            <Button
              type="button"
              variant="secondary"
              className="relative"
              onClick={() => document.getElementById('receipt')?.click()}
            >
              <ImagePlus />
              Add Receipt Image
            </Button>
            <input
              type="file"
              id="receipt"
              name="receipt"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {previewUrl && (
            <div className="image-preview mt-4">
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
        <div className="flex items-center justify-center mt-4">
          <Button>
            <Plus />
            Add Transaction
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
