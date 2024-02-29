"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Profile from "@components/Profile"


function ProfilePage() {
  const [posts, setPosts] = useState();
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const getFetchedPost = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
        // setPosts(data.filter((post) => post.author._id === session?.user.id));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if(session?.user.id) getFetchedPost();
    
  }, [session?.user.id]);

  console.log(posts);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (hasConfirmed){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p => p._id !== post._id))

        setPosts(filteredPosts)
      
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  return (
    <Profile
      name="My"
      description="Welcome to your personalised page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}

export default ProfilePage;
