"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form"

function Prompt() {
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [editing , setEditing ] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }

    if (promptId) getPromptDetails();
  }, [promptId])

  async function updatePrompt(e) {
    e.preventDefault();
    setEditing (true);

    if(!promptId) return alert("Prompt ID not found")

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) router.push("/profile");
    } catch (error) {
      console.log(error.message);
    } finally {
      setEditing (false);
    }
  }

  return (
    <Form
      type="edit"
      post={post}
      setPost={setPost}
      editing={editing}
      handleSubmit={updatePrompt}
    />
  );
}



export default function UpdatePrompt() {
  <Suspense fallback={<div>Loading...</div>}>
    <Prompt />
  </Suspense>;
}