import Link from "next/link";

export default function Form({
  type,
  post,
  setPost,
  editing,
  handleSubmit,
}) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient capitalize">{type} </span>
        Post
      </h1>
      <p className="desc text-left  max-w-md">
        <span className="capitalize">{type}</span> and share amazing prompts
        with the world and let your imagination run wild
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <div>
          <label
            htmlFor="text_prompts"
            className="font-satoshi font-semibold text-base text-gray-700"
          >
            Your AI Prompt
          </label>
          <textarea
            name="text_prompts"
            id="text_prompts"
            cols="30"
            rows="10"
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompts here...."
            className="form_textarea"
            required
          />
        </div>

        <div>
          <label
            htmlFor="text_prompts"
            className="font-satoshi font-semibold text-base text-gray-700"
          >
            Tags <br></br>
            <span className="font-normal italic">#product, #webdevelopment, #socialmedia</span>
          </label>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: `${e.target.value}` })}
            placeholder="#tags...."
            required
            className="form_input"
          />
        </div>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link className="text-gray-500 text-sm" href="/">
            Cancel
          </Link>
          <button  type="submit" disabled={editing} className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white capitalize">
            {editing ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}
