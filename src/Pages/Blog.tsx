import React from "react";
import { NavLink } from "react-router-dom";

// Przykładowe dane o postach
const posts = [
  {
    id: 1,
    title: "Kupujesz dom? Na co zwrócić uwagę?",
    content:
      "Kupno domu to jedna z najważniejszych decyzji w życiu. Sprawdź stan prawny nieruchomości, jakość budowy, lokalizację oraz potencjalne koszty utrzymania. Nie zapomnij o wizytach w różnych porach dnia, aby poczuć atmosferę miejsca.",
  },
  {
    id: 2,
    title: "Poradnik dla sprzedających nieruchomość",
    content:
      "Sprzedaż nieruchomości może być skomplikowana. Kluczowe jest ustalenie atrakcyjnej ceny, przygotowanie nieruchomości do pokazów, a także posiadanie kompletnych dokumentów. Zastanów się nad skorzystaniem z usług pośrednika dla maksymalizacji zysków.",
  },
  {
    id: 3,
    title: "ABC wynajmu mieszkania",
    content:
      "Wynajem mieszkania to świetny sposób na dodatkowy dochód, ale wymaga znajomości praw najemcy i wynajmującego. Pamiętaj o odpowiedniej umowie, która zabezpieczy obie strony, oraz o przeprowadzeniu dokładnej weryfikacji potencjalnych najemców.",
  },
  {
    id: 4,
    title: "Remont mieszkania: jak podpisywać umowy z podwykonawcami",
    content:
      "Przed rozpoczęciem remontu upewnij się, że masz szczegółowo spisaną umowę z każdym z podwykonawców. Określ zakres prac, terminy, koszty, a także warunki dotyczące ewentualnych opóźnień czy dodatkowych prac. Dobre przygotowanie to klucz do uniknięcia problemów.",
  },
];
const Blog = () => {
  const shortenText = (text: String, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className='p-5'>
      {posts.map((post) => (
        <div
          key={post.id}
          className='flex flex-col md:flex-row items-center mb-10'
        >
          <NavLink to={`/blog/${post.id}`} className='flex flex-1 items-center'>
            <div className='w-full md:flex md:flex-row'>
              <img
                src={`https://picsum.photos/seed/${post.id}/600/400`}
                alt='Random'
                className='w-full h-auto md:w-1/2'
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
