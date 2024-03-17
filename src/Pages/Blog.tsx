import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { context } from "../App";
import { Article } from "../Components";
const Blog = () => {
  const dataArticles = useContext(context)[1];

  return (
    <div className='p-5'>
      {dataArticles.map((post) => (
        <Article
          id={post.id}
          title={post.title}
          content={post.content}
          images={post.images}
        />
      ))}
    </div>
  );
};

export default Blog;
