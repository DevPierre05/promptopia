"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form"

function UpdatePrompt() {
  const [editing , setEditing ] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const router = useRouter();

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

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
    <Suspense fallback={<div>Loading...</div>}>
      <Form
        type="edit"
        post={post}
        setPost={setPost}
        editing={editing}
        handleSubmit={updatePrompt}
      />
    </Suspense>
  );
}

export default UpdatePrompt;
