import { PostForm } from "@/components/PostForm";

export default function NewPostPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-14">
      <h1 className="font-display text-3xl text-paper mb-8">New Post</h1>
      <PostForm />
    </div>
  );
}
