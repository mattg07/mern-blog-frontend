import React, { useState, useEffect, useRef } from "react";
import Post from "../post/post";
import backendURL from "../../apiConfig";

const PostPreviews = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isInitialCall, setIsInitialCall] = useState(true);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const loadingRef = useRef(null);

  const fetchPosts = async () => {
    const response = await fetch(`${backendURL}/posts?page=${page}`);
    const data = await response.json();

    setIsInitialCall(false);
    if (data.length === 0) {
      setHasMorePosts(false);
    } else {
      setPosts((posts) => [...posts, ...data]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    if (!loadingRef.current || !hasMorePosts) return;

    const loadingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInitialCall) {
          setPage((page) => page + 1);
        }
      },
      { threshold: 1 }
    );

    loadingObserver.observe(loadingRef.current);

    return () => {
      if (loadingRef.current) loadingObserver.unobserve(loadingRef.current);
    };
  }, [posts, hasMorePosts]);

  return (
    <div>
      <div className="bg-gray-200">
        {posts.map((post) => (
          <Post key={post._id} {...post} />
        ))}
      </div>
      {hasMorePosts && <div ref={loadingRef}>Loading</div>}
    </div>
  );
};

export default PostPreviews;
