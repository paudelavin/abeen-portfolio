"use client";
import { useEffect, useState } from "react";

export function PostViewCounter({ postId, initialViews }: { postId: string, initialViews: number }) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    const viewed = sessionStorage.getItem(`viewed-post-${postId}`);
    if (viewed) return;

    const recordView = async () => {
      try {
        const res = await fetch("/api/post-views", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postId }),
        });
        const data = await res.json();
        if (data.views) {
          setViews(data.views);
          sessionStorage.setItem(`viewed-post-${postId}`, "true");
        }
      } catch (error) {
        console.error("Failed to record view");
      }
    };

    recordView();
  }, [postId]);

  return <span>{views} views</span>;
}