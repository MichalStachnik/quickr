'use client';
import { useRef, useState } from 'react';
import addTransaction from '../actions/addTransaction';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImagePlus, Plus } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import { BorderTrail } from '@/components/motion/border-trail';

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
    <div className="flex justify-end mt-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="relative" variant="outline" size="lg">
            <BorderTrail
              className="bg-linear-to-l from-blue-200 via-blue-500 to-blue-200 dark:from-blue-400 dark:via-blue-500 dark:to-blue-700"
              size={20}
            />
            <Plus />
            Add Transaction
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form action={clientAction}>
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
              <DialogDescription>Add an income or expense</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="text" className="text-right">
                  Description
                </Label>
                <Input
                  className="col-span-3"
                  type="text"
                  id="text"
                  name="text"
                  placeholder="Enter a description"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  className="col-span-3"
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="+ for income, - for expense"
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
                  onClick={() => document.getElementById('receipt')?.click()}
                >
                  <ImagePlus className="w-4 h-4 mr-2" />
                  Add Receipt Image
                </Button>
                <Input
                  className="hidden"
                  type="file"
                  id="receipt"
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
                <Button type="submit">Add Transaction</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddTransaction;
