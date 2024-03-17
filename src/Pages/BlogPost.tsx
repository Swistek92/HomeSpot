import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Carousele } from "../Components";
import { context } from "../App";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dataArticles: Article[] = useContext(context)[1];
  const [data, setData] = useState<Article>(dataArticles[0]);
  useEffect(() => {
    const postId = Number(id) - 1;

    if (isNaN(postId) || postId < 0 || postId >= dataArticles.length) {
      navigate("/");
      return;
    }
    setData(dataArticles[postId]);
  }, [dataArticles, id, navigate]);

  return (
    <div className='flex flex-col items-center justify-center space-y-4'>
      <h1 className='text-3xl font-bold'>{data.title}</h1>
      <p className='text-lg'>{data.content}</p>
      <Carousele imgs={data.images} />
    </div>
  );
};

export default BlogPost;
