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
import { ContentField } from "@/components/contentField";
import { useUpdateCard } from "@/hooks/useUpdateCard";
import React, { FormEvent } from "react";

interface DialogDemoProps {
  children?: React.ReactNode;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>; // Dot থেকে আসবে
  name: string;
  cardTitle: string;
  disabled?: boolean;
  cardId:string;
}

export function DialogDemo({cardId, setIsOpen, name, cardTitle, disabled = false }: DialogDemoProps) {
  const {
    title,
    setTitle,
    content,
    setContent,
    picture,
    setPicture,
    loading,
    error,
    handleUpdate,
  } = useUpdateCard(cardId);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await handleUpdate();
    setIsOpen?.(false);
  };

  return (
    <Dialog onOpenChange={(open) => setIsOpen?.(open)}>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full cursor-pointer">{name}</Button> 
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{cardTitle}</DialogTitle>  
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done. 
            </DialogDescription>
          </DialogHeader>

          <ContentField
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
            picture={picture}
            setPicture={setPicture}
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button type="submit" disabled={loading || disabled}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}