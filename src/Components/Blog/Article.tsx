import React from "react";
import { NavLink } from "react-router-dom";

const Article: React.FC<Article> = ({ id, title, content }) => {
  const shortenText = (text: String, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <div key={id} className='flex flex-col md:flex-row items-center mb-10'>
      <NavLink to={`/blog/${id}`} className='flex flex-1 items-center'>
        <div className='w-full md:flex md:flex-row'>
          <img
            src={`https://picsum.photos/seed/${id}/600/400`}
            alt='Random'
            className='w-auto h-full '
          />
          <div className='p-4 md:w-1/2'>
            <h2 className='font-bold text-xl mb-2'>{title}</h2>
            <p>{shortenText(content, 100)}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Article;
