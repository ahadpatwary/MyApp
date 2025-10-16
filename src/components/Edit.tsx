'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { FormEvent, ReactNode } from "react"; // ✅ এখানে ReactNode import করা হয়েছে

interface DialogDemoProps {
  children?: ReactNode; // ✅ এখন কোনো error থাকবে না
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  cardTitle: string;
  disabled?: boolean;
  loading: boolean;
  error: string;
  handleUpdate?: () => void;
}

export function DialogDemo({
  children,
  setIsOpen,
  name,
  cardTitle,
  disabled = false,
  loading,
  error,
  handleUpdate,
}: DialogDemoProps) {

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleUpdate?.(); // ✅ Optional chaining — handleUpdate না থাকলে error হবে না
    setIsOpen?.(false);
  };

  return (
    <Dialog onOpenChange={(open) => setIsOpen?.(open)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full cursor-pointer">
          {name}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{cardTitle}</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          {children} {/* ✅ এখন children perfectly কাজ করবে */}

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" disabled={loading || disabled}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}