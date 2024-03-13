import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Carousele from "../Components/Carousele";

const posts = [
  {
    id: 1,
    title: "Kupujesz dom? Na co zwrócić uwagę?",
    content:
      "Kupno domu to jedna z najważniejszych decyzji w życiu. Sprawdź stan prawny nieruchomości, jakość budowy, lokalizację oraz potencjalne koszty utrzymania. Nie zapomnij o wizytach w różnych porach dnia, aby poczuć atmosferę miejsca.",
    images: [
      "https://picsum.photos/seed/1/600/400",
      "https://picsum.photos/seed/2/600/400",
      "https://picsum.photos/seed/3/600/400",
      "https://picsum.photos/seed/4/600/400",
    ],
  },
  {
    id: 2,
    title: "Poradnik dla sprzedających nieruchomość",
    content:
      "Sprzedaż nieruchomości może być skomplikowana. Kluczowe jest ustalenie atrakcyjnej ceny, przygotowanie nieruchomości do pokazów, a także posiadanie kompletnych dokumentów. Zastanów się nad skorzystaniem z usług pośrednika dla maksymalizacji zysków.",
    images: [
      "https://picsum.photos/seed/5/600/400",
      "https://picsum.photos/seed/6/600/400",
      "https://picsum.photos/seed/7/600/400",
      "https://picsum.photos/seed/8/600/400",
    ],
  },
  {
    id: 3,
    title: "ABC wynajmu mieszkania",
    content:
      "Wynajem mieszkania to świetny sposób na dodatkowy dochód, ale wymaga znajomości praw najemcy i wynajmującego. Pamiętaj o odpowiedniej umowie, która zabezpieczy obie strony, oraz o przeprowadzeniu dokładnej weryfikacji potencjalnych najemców.",
    images: [
      "https://picsum.photos/seed/10/600/400",
      "https://picsum.photos/seed/11/600/400",
      "https://picsum.photos/seed/12/600/400",
      "https://picsum.photos/seed/13/600/400",
    ],
  },
  {
    id: 4,
    title: "Remont mieszkania: jak podpisywać umowy z podwykonawcami",
    content:
      "Przed rozpoczęciem remontu upewnij się, że masz szczegółowo spisaną umowę z każdym z podwykonawców. Określ zakres prac, terminy, koszty, a także warunki dotyczące ewentualnych opóźnień czy dodatkowych prac. Dobre przygotowanie to klucz do uniknięcia problemów.",
    images: [
      "https://picsum.photos/seed/13/600/400",
      "https://picsum.photos/seed/14/600/400",
      "https://picsum.photos/seed/15/600/400",
      "https://picsum.photos/seed/16/600/400",
    ],
  },
];

const BlogPost = () => {
  const { id } = useParams(); // Wyodrębnia 'id' z URL
  const navigate = useNavigate();
  const [data, setData] = useState(posts[0]);
  useEffect(() => {
    const postId = Number(id) - 1;

    if (isNaN(postId) || postId < 0 || postId >= posts.length) {
      navigate("/");
      return;
    }
    setData(posts[postId]);
  }, [id, navigate]);

  return (
    <div className='flex flex-col items-center justify-center space-y-4'>
      <h1 className='text-3xl font-bold'>{data.title}</h1>
      <p className='text-lg'>{data.content}</p>
      <Carousele imgs={data.images} />
    </div>
  );
};

export default BlogPost;
