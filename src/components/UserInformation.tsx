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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // POST to API route
    const res = await fetch("/api/user", {
      method: "POST",
      body: formData
    });

    if (res.ok) {
      router.push("/feed");
    } else {
      console.log("erro to post data");
    }
  };

  return (
    <form
      className="grid w-full max-w-lg items-center gap-3 border-2 p-4 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <Label htmlFor="name">Name</Label>
      <Input type="text" name="name" id="name" placeholder="Name" />

      <Label htmlFor="dob">DOB</Label>
      <Input type="date" name="dob" id="dob" placeholder="Date of Birth" />

      <Label htmlFor="phoneNumber">Phone Number</Label>
      <Input type="tel" name="phoneNumber" id="phoneNumber" placeholder="Phone Number" />

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" name="picture" onChange={choosePic} />
        {preview && <AvatarDemo src={preview} />}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}