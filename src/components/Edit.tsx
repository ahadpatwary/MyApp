import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React from "react";

interface DialogDemoProps {
  children: React.ReactNode;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>; // Dot থেকে আসবে
  name : string;
  title : string;

}

export function DialogDemo({children, setIsOpen, name, title }: DialogDemoProps) {
  return (
    <Dialog onOpenChange={(open) => setIsOpen?.(open)}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full cursor-pointer">{name}</Button> 
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>  
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re done. 
            </DialogDescription>
          </DialogHeader>

          { children }

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" onClick={() => setIsOpen?.(false)}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}