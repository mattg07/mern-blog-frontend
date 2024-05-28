import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import backendURL from "../../apiConfig";
function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`${backendURL}/post/${id}`) 
      .then((response) => response.json())
      .then((postInfo) => setPostInfo(postInfo))
      .catch((error) => console.error("Error fetching post:", error));

    fetch(`${backendURL}/comments/${id}`) 
      .then((response) => response.json())
      .then((comments) => setComments(comments))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    fetch(`${backendURL}/comment`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ postId: id, content: newComment }),
    })
      .then((response) => response.json())
      .then((comment) => {
        setComments([comment, ...comments]);
        setNewComment("");
      })
      .catch((error) => console.error("Error submitting comment:", error));
  };

  if (!postInfo) return null;
  return (
    <div className="flex m-auto flex-col">
      <h1 className="lg:text-2xl font-['Anton'] m-auto sm:text-xl">{postInfo.title}</h1>
      <p className="text-gray-600 mb-2 m-auto">By mati</p>
      <time className="text-gray-600 mb-2 m-auto">
        {format(new Date(postInfo.createdAt), "MMM d, yyyy HH:mm")}
      </time>
      <img
        className="h-1/2 w-96 m-auto pb-5 pt-3"
        src={`${backendURL}/${postInfo.cover}`} 
      ></img>
      <div
        className="w-3/4 m-auto text-justify pb-10 font-['Poppins']"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      ></div>

      <div className="comments-section w-3/4 m-auto">
        <h2 className="font-['Poppins'] text-lg pb-4">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="comment-form ">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            className="w-full p-2 border rounded mb-2"
            placeholder="Write a comment..."
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>

        <div className="comments-list mt-4">
          {comments.map((comment) => (
            <div key={comment._id} className="comment mb-2 p-2 border rounded">
              <p className="font-bold">{comment.username}</p>
              <p className="text-sm">{format(new Date(comment.createdAt), "MMM d, yyyy HH:mm")}</p>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostPage;
