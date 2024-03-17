import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { context } from "../App";

const Blog = () => {
  const dataArticles = useContext(context)[1];

  const shortenText = (text: String, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className='p-5'>
      {dataArticles.map((post) => (
        <div
          key={post.id}
          className='flex flex-col md:flex-row items-center mb-10'
        >
          <NavLink to={`/blog/${post.id}`} className='flex flex-1 items-center'>
            <div className='w-full md:flex md:flex-row'>
              <img
                src={`https://picsum.photos/seed/${post.id}/600/400`}
                alt='Random'
                className='w-auto h-full '
              />
              <div className='p-4 md:w-1/2'>
                <h2 className='font-bold text-xl mb-2'>{post.title}</h2>
                <p>{shortenText(post.content, 100)}</p>
              </div>
            </div>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default Blog;
