"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard"


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map(post => {
        return (
          <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
        )
      })}
    </div>
  )
}

export default function Feed() {
  const [searchInput, setSearchInput] = useState("");
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const getFetchedData = async () => {
      try {
        const response = await fetch("/api/prompt"); 
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getFetchedData();
  
  }, []);

  console.log(posts);

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input className="search_input peer" type="text" placeholder="Search for a tag or a username" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} required />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}}/>

    </section>
  )
}
