import ReactQuill from "react-quill";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import backendURL from "../../apiConfig";
function CreatePost() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function handleSubmit(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set("content", content);
    data.set("title", title);
    data.set("file", files[0]);
    try {
      const response = await fetch(`${backendURL}/post`, {
        method: "POST",
      credentials: 'include',
        body: data,
      });

      if (response.ok) {
        console.log("Post created successfully");
        setRedirect(true);
      } else {
        console.error(
          "Failed to create post:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="m-auto bg-slate-100 w-auto flex flex-col">
      <form
        className="flex flex-col h-100 w-4/6 m-auto p-4 bg-gray-300"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="titulo"
          className="p-2 mb-2 w-42"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        ></input>
        <input
          type="file"
          className="p-4"
          onChange={(ev) => setFiles(ev.target.files)}
        ></input>
        <ReactQuill
          className="p-4 h-84"
          theme="snow"
          value={content}
          onChange={(newValue) => setContent(newValue)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
