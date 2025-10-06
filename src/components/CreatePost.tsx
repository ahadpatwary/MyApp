"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCard } from "@/hooks/useCreateCard";
import { Textarea } from "@/components/ui/textarea"

type CreatePostProps = {
  disabled?: boolean;
};

function CreatePost({ disabled = false }: CreatePostProps) {
  const {
    title,
    setTitle,
    content,
    setContent,
    setPicture,
    loading,
    error,
    handleSubmit,
  } = useCreateCard();


  return (
    <div className="flex flex-col gap-4 p-4 max-w-[550px] min-w-[250px] w-full border shadow-lg rounded-md">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          id="title"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id = "content"
          placeholder="Type your message here."
          value={content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
      </div>

      <div>
        <Label htmlFor="picture">Picture</Label>
        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setPicture(file);
          }}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading || disabled}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Post"}
      </button>
    </div>
  );
}

export default CreatePost;
