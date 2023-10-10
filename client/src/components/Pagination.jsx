// import { useState } from 'react';
// const apiKey = import.meta.env.VITE_API_KEY;

export default function Pagination() {
  // const [data, setData] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 40;

  // useEffect(() => {
  //   async function fetchPages() {
  //     try {
  //       const res = await fetch(
  //         `https://api.rawg.io/api/games?page=${currentPage}&page_size=40&key=${apiKey}`
  //       );
  //       if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  //       console.log(res);
  //       setData(res.data);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   }
  //   fetchPages();
  // }, [currentPage]);

  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentItems = data.results.slice(startIndex, endIndex);

  // function handlePrevPage() {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // }

  // function handleNextPage() {
  //   const totalPages = Math.ceil(data.length / itemsPerPage);
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // }

  return (
    <>
      {/* <ul>
        {currentItems.map((item) => (
          <li>{item.pages}</li>
        ))}
      </ul> */}
      <button>Previous</button>
      <button>Next</button>
    </>
  );
}
