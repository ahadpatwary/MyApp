'use client';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextareaDemo } from "@/components/TextArea";

type CreatePostProps = {
  disabled? : boolean;
};

function CreatePost({ disabled = true }: CreatePostProps) {
  return (
    <div className="flex flex-col gap-4 p-4 max-w-[550px] min-w-[250px] w-full border shadow-lg rounded-md">
      
      <Label htmlFor="title">Title</Label>
      <Input type="text" id="title" placeholder="title..." />

      <TextareaDemo />

      <Label htmlFor="picture">Picture</Label>
      <Input id="picture" type="file" />

      <button
        hidden={disabled}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        Create Post
      </button>
    </div>
  )
}

export default CreatePost;