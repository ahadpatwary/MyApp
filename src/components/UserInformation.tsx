"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AvatarDemo } from "@/components/AvaterDemo";
import { useRouter } from "next/navigation";

export function InputWithLabel() {
  const [preview, setPreview] = useState<string | null>(null);
   const router = useRouter();

  const choosePic = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/feed");
  };

  return (
    <form
      className="grid w-full max-w-lg items-center gap-3 border-2 p-4 rounded-lg shadow-lg"
      onSubmit={handleSubmit} 
    >
      <Label htmlFor="name">Name</Label>
      <Input type="text" id="name" placeholder="Name" />

      <Label htmlFor="date_of_birth">DOB</Label>
      <Input type="date" id="date_of_birth" placeholder="Date of Birth" />

      <Label htmlFor="phone_number">Phone Number</Label>
      <Input type="tel" id="phone_number" placeholder="Phone Number" />

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" onChange={choosePic} />
        {preview && <AvatarDemo src={preview} />}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}