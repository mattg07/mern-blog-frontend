import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import backendURL from "../../apiConfig";
function Post({ title, content, cover, createdAt, _id }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <Link to={`/post/${_id}`}>
        {" "}
        <h2 className="text-xl font-bold mb-2">{title}</h2>
<img className="w-96 h-1/4" src={`${backendURL}/${cover}`} />
      </Link>
      <p className="text-gray-600 mb-2">By mati</p>
      <time className="text-gray-800 mb-2">{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
    </div>
  );
}

export default Post;
