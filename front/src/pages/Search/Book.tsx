import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux";
import Card from "../../components/Card/Card";
import {
  getBooks,
  getBooksByPage,
  getNextBooks,
  getPreviousBooks,
  useBooks,
} from "../../slice/book";
import { getCategories, useCategories } from "../../slice/category";
import { selectSearchs, setSearch } from "../../slice/search";
import { SearchBook } from "../../type";
import SearchForm from "./SearchForm";

const Book: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: categories } = useCategories();

  const searchResults = useAppSelector(selectSearchs);
  const { list, pagination, currentPage, totalPages } = useBooks();

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getCategories());
  }, [dispatch]);

  const onSearchSubmit = (search: SearchBook) => {
    dispatch(setSearch(search));
  };

  const handleNext = () => {
    if (pagination.next) {
      dispatch(getNextBooks(pagination.next));
    }
  };

  const handlePrevious = () => {
    if (pagination.previous) {
      dispatch(getPreviousBooks(pagination.previous));
    }
  };

  const handlePageClick = (page: number) => {
    dispatch(getBooksByPage(page));
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const shouldShowPagination = list.length > 0 || currentPage > 1;

  return (
    <div className="search container">
      <SearchForm
        searchResults={searchResults}
        onFormSubmit={onSearchSubmit}
        categories={categories}
      />
      <div className="container">
        {searchResults.length !== 0 ? (
          <div className="row">
            {searchResults.map((search) => (
              <div className="col-4" key={search.id}>
                <Card book={search} />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="row">
              {list.map((book) => (
                <div key={book.id} className="col-4">
                  <Card book={book} />
                </div>
              ))}
            </div>
            {shouldShowPagination && (
              <div className="pagination">
                <button
                  onClick={handlePrevious}
                  disabled={!pagination.previous}
                >
                  Previous
                </button>
                {renderPageNumbers()}
                <button onClick={handleNext} disabled={!pagination.next}>
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Book;

// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../app/redux";
// import Card from "../../components/Card/Card";
// import {
//   getBooks,
//   getBooksByPage,
//   getNextBooks,
//   getPreviousBooks,
//   useBooks,
// } from "../../slice/book";
// import { getCategories, useCategories } from "../../slice/category";
// import { selectSearchs, setSearch } from "../../slice/search";
// import { SearchBook } from "../../type";
// import SearchForm from "./SearchForm";

// const Book: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { list: categories } = useCategories();

//   const searchResults = useAppSelector(selectSearchs);
//   const { list, pagination, currentPage, totalPages } = useBooks();

//   useEffect(() => {
//     dispatch(getBooks());
//     dispatch(getCategories());
//   }, [dispatch]);

//   const onSearchSubmit = (search: SearchBook) => {
//     dispatch(setSearch(search));
//   };

//   const handleNext = () => {
//     if (pagination.next) {
//       dispatch(getNextBooks(pagination.next));
//     }
//   };

//   const handlePrevious = () => {
//     if (pagination.previous) {
//       dispatch(getPreviousBooks(pagination.previous));
//     }
//   };

//   const handlePageClick = (page: number) => {
//     if (page !== currentPage) {
//       dispatch(getBooksByPage(page));
//     }
//   };

//   const renderPageNumbers = () => {
//     const pages = [];
//     const maxPageNumbersToShow = 5;
//     const halfPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

//     let startPage = Math.max(currentPage - halfPageNumbersToShow, 1);
//     let endPage = startPage + maxPageNumbersToShow - 1;

//     if (endPage > totalPages) {
//       endPage = totalPages;
//       startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => handlePageClick(i)}
//           disabled={i === currentPage}
//         >
//           {i}
//         </button>
//       );
//     }

//     return pages;
//   };

//   const shouldShowPagination = list.length > 0 || currentPage > 1;

//   return (
//     <div className="search container">
//       <SearchForm
//         searchResults={searchResults}
//         onFormSubmit={onSearchSubmit}
//         categories={categories}
//       />
//       <div className="container">
//         {searchResults.length > 0 ? (
//           <div className="row">
//             {searchResults.map((search) => (
//               <div className="col-4" key={search.id}>
//                 <Card book={search} />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <>
//             <div className="row">
//               {list.map((book) => (
//                 <div key={book.id} className="col-4">
//                   <Card book={book} />
//                 </div>
//               ))}
//             </div>
//             {shouldShowPagination && (
//               <div className="pagination">
//                 <button
//                   onClick={handlePrevious}
//                   disabled={!pagination.previous || currentPage === 1}
//                 >
//                   Previous
//                 </button>
//                 {renderPageNumbers()}
//                 <button
//                   onClick={handleNext}
//                   disabled={!pagination.next || currentPage === totalPages}
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Book;

// // import React, { useEffect } from "react";
// // import { useAppDispatch, useAppSelector } from "../../app/redux";
// // import Card from "../../components/Card/Card";
// // import {
// //   getBooks,
// //   getBooksByPage,
// //   getNextBooks,
// //   getPreviousBooks,
// //   useBooks,
// // } from "../../slice/book";
// // import { getCategories, useCategories } from "../../slice/category";
// // import { selectSearchs, setSearch } from "../../slice/search";
// // import { SearchBook } from "../../type";
// // import SearchForm from "./SearchForm";

// // const Book: React.FC = () => {
// //   const dispatch = useAppDispatch();
// //   const { list: categories } = useCategories();

// //   const searchResults = useAppSelector(selectSearchs);
// //   const { list, pagination, currentPage, totalPages } = useBooks();

// //   useEffect(() => {
// //     dispatch(getBooks());
// //     dispatch(getCategories());
// //   }, [dispatch]);

// //   const onSearchSubmit = (search: SearchBook) => {
// //     dispatch(setSearch(search));
// //   };

// //   const handleNext = () => {
// //     if (pagination.next) {
// //       dispatch(getNextBooks(pagination.next));
// //     }
// //   };

// //   const handlePrevious = () => {
// //     if (pagination.previous) {
// //       dispatch(getPreviousBooks(pagination.previous));
// //     }
// //   };

// //   const handlePageClick = (page: number) => {
// //     if (page !== currentPage) {
// //       dispatch(getBooksByPage(page));
// //     }
// //   };

// //   const renderPageNumbers = () => {
// //     const pages = [];
// //     const maxPageNumbersToShow = 5;
// //     const halfPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

// //     let startPage = Math.max(currentPage - halfPageNumbersToShow, 1);
// //     let endPage = startPage + maxPageNumbersToShow - 1;

// //     if (endPage > totalPages) {
// //       endPage = totalPages;
// //       startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
// //     }

// //     for (let i = startPage; i <= endPage; i++) {
// //       pages.push(
// //         <button
// //           key={i}
// //           onClick={() => handlePageClick(i)}
// //           disabled={i === currentPage}
// //         >
// //           {i}
// //         </button>
// //       );
// //     }

// //     return pages;
// //   };

// //   const shouldShowPagination = list.length > 0 || currentPage > 1;

// //   return (
// //     <div className="search container">
// //       <SearchForm
// //         searchResults={searchResults}
// //         onFormSubmit={onSearchSubmit}
// //         categories={categories}
// //       />
// //       <div className="container">
// //         {searchResults.length > 0 ? (
// //           <div className="row">
// //             {searchResults.map((search) => (
// //               <div className="col-4" key={search.id}>
// //                 <Card book={search} />
// //               </div>
// //             ))}
// //           </div>
// //         ) : (
// //           <>
// //             <div className="row">
// //               {list.map((book) => (
// //                 <div key={book.id} className="col-4">
// //                   <Card book={book} />
// //                 </div>
// //               ))}
// //             </div>
// //             {shouldShowPagination && (
// //               <div className="pagination">
// //                 <button onClick={handlePrevious} disabled={currentPage === 1}>
// //                   Previous
// //                 </button>
// //                 {renderPageNumbers()}
// //                 <button
// //                   onClick={handleNext}
// //                   disabled={currentPage === totalPages}
// //                 >
// //                   Next
// //                 </button>
// //               </div>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Book;

// // // import React, { useEffect } from "react";
// // // import { useAppDispatch, useAppSelector } from "../../app/redux";
// // // import Card from "../../components/Card/Card";
// // // import {
// // //   getBooks,
// // //   getBooksByPage,
// // //   getNextBooks,
// // //   getPreviousBooks,
// // //   useBooks,
// // // } from "../../slice/book";
// // // import { getCategories, useCategories } from "../../slice/category";
// // // import { selectSearchs, setSearch } from "../../slice/search";
// // // import { SearchBook } from "../../type";
// // // import SearchForm from "./SearchForm";

// // // const Book: React.FC = () => {
// // //   const dispatch = useAppDispatch();
// // //   const { list: categories } = useCategories();

// // //   const searchResults = useAppSelector(selectSearchs);
// // //   const { list, pagination, currentPage, totalPages } = useBooks();

// // //   useEffect(() => {
// // //     dispatch(getBooks());
// // //     dispatch(getCategories());
// // //   }, [dispatch]);

// // //   const onSearchSubmit = (search: SearchBook) => {
// // //     dispatch(setSearch(search));
// // //   };

// // //   const handleNext = () => {
// // //     if (pagination.next) {
// // //       dispatch(getNextBooks(pagination.next));
// // //     }
// // //   };

// // //   const handlePrevious = () => {
// // //     if (pagination.previous) {
// // //       dispatch(getPreviousBooks(pagination.previous));
// // //     }
// // //   };

// // //   const handlePageClick = (page: number) => {
// // //     if (page !== currentPage) {
// // //       dispatch(getBooksByPage(page));
// // //     }
// // //   };

// // //   const renderPageNumbers = () => {
// // //     const pages = [];
// // //     const maxPageNumbersToShow = 5;
// // //     const halfPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

// // //     let startPage = Math.max(currentPage - halfPageNumbersToShow, 1);
// // //     let endPage = startPage + maxPageNumbersToShow - 1;

// // //     if (endPage > totalPages) {
// // //       endPage = totalPages;
// // //       startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
// // //     }

// // //     for (let i = startPage; i <= endPage; i++) {
// // //       pages.push(
// // //         <button
// // //           key={i}
// // //           onClick={() => handlePageClick(i)}
// // //           disabled={i === currentPage}
// // //         >
// // //           {i}
// // //         </button>
// // //       );
// // //     }

// // //     return pages;
// // //   };

// // //   const shouldShowPagination = list.length > 0 || currentPage > 1;

// // //   return (
// // //     <div className="search container">
// // //       <SearchForm
// // //         searchResults={searchResults}
// // //         onFormSubmit={onSearchSubmit}
// // //         categories={categories}
// // //       />
// // //       <div className="container">
// // //         {searchResults.length > 0 ? (
// // //           <div className="row">
// // //             {searchResults.map((search) => (
// // //               <div className="col-4" key={search.id}>
// // //                 <Card book={search} />
// // //               </div>
// // //             ))}
// // //           </div>
// // //         ) : (
// // //           <>
// // //             <div className="row">
// // //               {list.map((book) => (
// // //                 <div key={book.id} className="col-4">
// // //                   <Card book={book} />
// // //                 </div>
// // //               ))}
// // //             </div>
// // //             {shouldShowPagination && (
// // //               <div className="pagination">
// // //                 <button
// // //                   onClick={handlePrevious}
// // //                   disabled={!pagination.previous}
// // //                 >
// // //                   Previous
// // //                 </button>
// // //                 {renderPageNumbers()}
// // //                 <button onClick={handleNext} disabled={!pagination.next}>
// // //                   Next
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Book;

// // // // import React, { useEffect } from "react";
// // // // import { useAppDispatch, useAppSelector } from "../../app/redux";
// // // // import Card from "../../components/Card/Card";
// // // // import {
// // // //   getBooks,
// // // //   getBooksByPage,
// // // //   getNextBooks,
// // // //   getPreviousBooks,
// // // //   useBooks,
// // // // } from "../../slice/book";
// // // // import { getCategories, useCategories } from "../../slice/category";
// // // // import { selectSearchs, setSearch } from "../../slice/search";
// // // // import { SearchBook } from "../../type";
// // // // import SearchForm from "./SearchForm";

// // // // const Book: React.FC = () => {
// // // //   const dispatch = useAppDispatch();
// // // //   const { list: categories } = useCategories();

// // // //   const searchResults = useAppSelector(selectSearchs);
// // // //   const { list, pagination, currentPage, totalPages } = useBooks();

// // // //   useEffect(() => {
// // // //     dispatch(getBooks());
// // // //     dispatch(getCategories());
// // // //   }, [dispatch]);

// // // //   const onSearchSubmit = (search: SearchBook) => {
// // // //     dispatch(setSearch(search));
// // // //   };

// // // //   const handleNext = () => {
// // // //     if (pagination.next) {
// // // //       dispatch(getNextBooks(pagination.next));
// // // //     }
// // // //   };

// // // //   const handlePrevious = () => {
// // // //     if (pagination.previous) {
// // // //       dispatch(getPreviousBooks(pagination.previous));
// // // //     }
// // // //   };

// // // //   const handlePageClick = (page: number) => {
// // // //     if (page !== currentPage) {
// // // //       dispatch(getBooksByPage(page));
// // // //     }
// // // //   };

// // // //   const renderPageNumbers = () => {
// // // //     const pages = [];
// // // //     const maxPageNumbersToShow = 5;
// // // //     const halfPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

// // // //     let startPage = Math.max(currentPage - halfPageNumbersToShow, 1);
// // // //     let endPage = startPage + maxPageNumbersToShow - 1;

// // // //     if (endPage > totalPages) {
// // // //       endPage = totalPages;
// // // //       startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
// // // //     }

// // // //     for (let i = startPage; i <= endPage; i++) {
// // // //       pages.push(
// // // //         <button
// // // //           key={i}
// // // //           onClick={() => handlePageClick(i)}
// // // //           className={i === currentPage ? "active" : ""}
// // // //         >
// // // //           {i}
// // // //         </button>
// // // //       );
// // // //     }

// // // //     return pages;
// // // //   };

// // // //   const shouldShowPagination = list.length > 0 || currentPage > 1;

// // // //   return (
// // // //     <div className="search container">
// // // //       <SearchForm
// // // //         searchResults={searchResults}
// // // //         onFormSubmit={onSearchSubmit}
// // // //         categories={categories}
// // // //       />
// // // //       <div className="container">
// // // //         {searchResults.length > 0 ? (
// // // //           <div className="row">
// // // //             {searchResults.map((search) => (
// // // //               <div className="col-4" key={search.id}>
// // // //                 <Card book={search} />
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         ) : (
// // // //           <>
// // // //             <div className="row">
// // // //               {list.map((book) => (
// // // //                 <div key={book.id} className="col-4">
// // // //                   <Card book={book} />
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //             {shouldShowPagination && (
// // // //               <div className="pagination">
// // // //                 <button
// // // //                   onClick={handlePrevious}
// // // //                   disabled={!pagination.previous}
// // // //                 >
// // // //                   Previous
// // // //                 </button>
// // // //                 {renderPageNumbers()}
// // // //                 <button onClick={handleNext} disabled={!pagination.next}>
// // // //                   Next
// // // //                 </button>
// // // //               </div>
// // // //             )}
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Book;

// // // // // import React, { useEffect } from "react";
// // // // // import { useAppDispatch, useAppSelector } from "../../app/redux";
// // // // // import Card from "../../components/Card/Card";
// // // // // import {
// // // // //   getBooks,
// // // // //   getBooksByPage,
// // // // //   getNextBooks,
// // // // //   getPreviousBooks,
// // // // //   useBooks,
// // // // // } from "../../slice/book";
// // // // // import { getCategories, useCategories } from "../../slice/category";
// // // // // import { selectSearchs, setSearch } from "../../slice/search";
// // // // // import { SearchBook } from "../../type";
// // // // // import SearchForm from "./SearchForm";

// // // // // const Book: React.FC = () => {
// // // // //   const dispatch = useAppDispatch();
// // // // //   const { list: categories } = useCategories();

// // // // //   const searchResults = useAppSelector(selectSearchs);
// // // // //   const { list, pagination, currentPage, totalPages } = useBooks();

// // // // //   useEffect(() => {
// // // // //     dispatch(getBooks());
// // // // //     dispatch(getCategories());
// // // // //   }, [dispatch]);

// // // // //   const onSearchSubmit = (search: SearchBook) => {
// // // // //     dispatch(setSearch(search));
// // // // //   };

// // // // //   const handleNext = () => {
// // // // //     if (pagination.next) {
// // // // //       dispatch(getNextBooks(pagination.next));
// // // // //     }
// // // // //   };

// // // // //   const handlePrevious = () => {
// // // // //     if (pagination.previous) {
// // // // //       dispatch(getPreviousBooks(pagination.previous));
// // // // //     }
// // // // //   };

// // // // //   const handlePageClick = (page: number) => {
// // // // //     dispatch(getBooksByPage(page));
// // // // //   };

// // // // //   const renderPageNumbers = () => {
// // // // //     const pages = [];
// // // // //     for (let i = 1; i <= totalPages; i++) {
// // // // //       pages.push(
// // // // //         <button
// // // // //           key={i}
// // // // //           onClick={() => handlePageClick(i)}
// // // // //           disabled={i === currentPage}
// // // // //         >
// // // // //           {i}
// // // // //         </button>
// // // // //       );
// // // // //     }
// // // // //     return pages;
// // // // //   };

// // // // //   const shouldShowPagination = list.length > 0 || currentPage > 1;

// // // // //   return (
// // // // //     <div className="search container">
// // // // //       <SearchForm
// // // // //         searchResults={searchResults}
// // // // //         onFormSubmit={onSearchSubmit}
// // // // //         categories={categories}
// // // // //       />
// // // // //       <div className="container">
// // // // //         {searchResults.length > 0 ? (
// // // // //           <div className="row">
// // // // //             {searchResults.map((search) => (
// // // // //               <div className="col-4" key={search.id}>
// // // // //                 <Card book={search} />
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         ) : (
// // // // //           <>
// // // // //             <div className="row">
// // // // //               {list.map((book) => (
// // // // //                 <div key={book.id} className="col-4">
// // // // //                   <Card book={book} />
// // // // //                 </div>
// // // // //               ))}
// // // // //             </div>
// // // // //             {shouldShowPagination && (
// // // // //               <div className="pagination">
// // // // //                 <button
// // // // //                   onClick={handlePrevious}
// // // // //                   disabled={!pagination.previous}
// // // // //                 >
// // // // //                   Previous
// // // // //                 </button>
// // // // //                 {renderPageNumbers()}
// // // // //                 <button onClick={handleNext} disabled={!pagination.next}>
// // // // //                   Next
// // // // //                 </button>
// // // // //               </div>
// // // // //             )}
// // // // //           </>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Book;

// // // // // // import React, { useEffect } from "react";
// // // // // // import { useAppDispatch, useAppSelector } from "../../app/redux";
// // // // // // import Card from "../../components/Card/Card";
// // // // // // import {
// // // // // //   getBooks,
// // // // // //   getBooksByPage,
// // // // // //   getNextBooks,
// // // // // //   getPreviousBooks,
// // // // // //   useBooks,
// // // // // // } from "../../slice/book";
// // // // // // import { getCategories, useCategories } from "../../slice/category";
// // // // // // import { selectSearchs, setSearch } from "../../slice/search";
// // // // // // import { SearchBook } from "../../type";
// // // // // // import SearchForm from "./SearchForm";

// // // // // // const Book: React.FC = () => {
// // // // // //   const dispatch = useAppDispatch();
// // // // // //   const { list: categories } = useCategories();

// // // // // //   const searchResults = useAppSelector(selectSearchs);
// // // // // //   const { list, pagination, currentPage, totalPages } = useBooks();

// // // // // //   useEffect(() => {
// // // // // //     dispatch(getBooks());
// // // // // //     dispatch(getCategories());
// // // // // //   }, [dispatch]);

// // // // // //   const onSearchSubmit = (search: SearchBook) => {
// // // // // //     dispatch(setSearch(search));
// // // // // //   };

// // // // // //   const handleNext = () => {
// // // // // //     if (pagination.next) {
// // // // // //       dispatch(getNextBooks(pagination.next));
// // // // // //     }
// // // // // //   };

// // // // // //   const handlePrevious = () => {
// // // // // //     if (pagination.previous) {
// // // // // //       dispatch(getPreviousBooks(pagination.previous));
// // // // // //     }
// // // // // //   };

// // // // // //   const handlePageClick = (page: number) => {
// // // // // //     dispatch(getBooksByPage(page));
// // // // // //   };

// // // // // //   const renderPageNumbers = () => {
// // // // // //     const pages = [];
// // // // // //     for (let i = 1; i <= totalPages; i++) {
// // // // // //       pages.push(
// // // // // //         <button
// // // // // //           key={i}
// // // // // //           onClick={() => handlePageClick(i)}
// // // // // //           disabled={i === currentPage}
// // // // // //         >
// // // // // //           {i}
// // // // // //         </button>
// // // // // //       );
// // // // // //     }
// // // // // //     return pages;
// // // // // //   };

// // // // // //   const shouldShowPagination = list.length > 0 || currentPage > 1;

// // // // // //   return (
// // // // // //     <div className="search container">
// // // // // //       <SearchForm
// // // // // //         searchResults={searchResults}
// // // // // //         onFormSubmit={onSearchSubmit}
// // // // // //         categories={categories}
// // // // // //       />
// // // // // //       <div className="container">
// // // // // //         {searchResults.length !== 0 ? (
// // // // // //           <div className="row">
// // // // // //             {searchResults.map((search) => (
// // // // // //               <div className="col-4" key={search.id}>
// // // // // //                 <Card book={search} />
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           <>
// // // // // //             <div className="row">
// // // // // //               {list.map((book) => (
// // // // // //                 <div key={book.id} className="col-4">
// // // // // //                   <Card book={book} />
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //             {shouldShowPagination && (
// // // // // //               <div className="pagination">
// // // // // //                 <button
// // // // // //                   onClick={handlePrevious}
// // // // // //                   disabled={!pagination.previous}
// // // // // //                 >
// // // // // //                   Previous
// // // // // //                 </button>
// // // // // //                 {renderPageNumbers()}
// // // // // //                 <button onClick={handleNext} disabled={!pagination.next}>
// // // // // //                   Next
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Book;

// // // // // // import React, { useEffect } from "react";
// // // // // // import { useAppDispatch, useAppSelector } from "../../app/redux";
// // // // // // import Card from "../../components/Card/Card";
// // // // // // import {
// // // // // //   getBooks,
// // // // // //   getBooksByPage,
// // // // // //   getNextBooks,
// // // // // //   getPreviousBooks,
// // // // // //   useBooks,
// // // // // // } from "../../slice/book";
// // // // // // import { getCategories, useCategories } from "../../slice/category";
// // // // // // import { selectSearchs, setSearch } from "../../slice/search";
// // // // // // import { SearchBook } from "../../type";
// // // // // // import SearchForm from "./SearchForm";

// // // // // // const Book: React.FC = () => {
// // // // // //   const dispatch = useAppDispatch();
// // // // // //   const { list: categories } = useCategories();

// // // // // //   const searchResults = useAppSelector(selectSearchs);
// // // // // //   const { list, pagination, currentPage, totalPages } = useBooks();

// // // // // //   useEffect(() => {
// // // // // //     dispatch(getBooks());
// // // // // //     dispatch(getCategories());
// // // // // //   }, [dispatch]);

// // // // // //   const onSearchSubmit = (search: SearchBook) => {
// // // // // //     dispatch(setSearch(search));
// // // // // //   };

// // // // // //   const handleNext = () => {
// // // // // //     if (pagination.next) {
// // // // // //       dispatch(getNextBooks(pagination.next));
// // // // // //     }
// // // // // //   };

// // // // // //   const handlePrevious = () => {
// // // // // //     if (pagination.previous) {
// // // // // //       dispatch(getPreviousBooks(pagination.previous));
// // // // // //     }
// // // // // //   };

// // // // // //   const handlePageClick = (page: number) => {
// // // // // //     dispatch(getBooksByPage(page));
// // // // // //   };

// // // // // //   const renderPageNumbers = () => {
// // // // // //     const pages = [];
// // // // // //     for (let i = 1; i <= totalPages; i++) {
// // // // // //       pages.push(
// // // // // //         <button
// // // // // //           key={i}
// // // // // //           onClick={() => handlePageClick(i)}
// // // // // //           disabled={i === currentPage}
// // // // // //         >
// // // // // //           {i}
// // // // // //         </button>
// // // // // //       );
// // // // // //     }
// // // // // //     return pages;
// // // // // //   };

// // // // // //   const shouldShowPagination = list.length > 0 || currentPage > 1;

// // // // // //   return (
// // // // // //     <div className="search container">
// // // // // //       <SearchForm
// // // // // //         searchResults={searchResults}
// // // // // //         onFormSubmit={onSearchSubmit}
// // // // // //         categories={categories}
// // // // // //       />
// // // // // //       <div className="container">
// // // // // //         {searchResults.length !== 0 ? (
// // // // // //           <div className="row">
// // // // // //             {searchResults.map((search) => (
// // // // // //               <div className="col-4" key={search.id}>
// // // // // //                 <Card book={search} />
// // // // // //               </div>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           <>
// // // // // //             <div className="row">
// // // // // //               {list.map((book) => (
// // // // // //                 <div key={book.id} className="col-4">
// // // // // //                   <Card book={book} />
// // // // // //                 </div>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //             {shouldShowPagination && (
// // // // // //               <div className="pagination">
// // // // // //                 <button
// // // // // //                   onClick={handlePrevious}
// // // // // //                   disabled={!pagination.previous}
// // // // // //                 >
// // // // // //                   Previous
// // // // // //                 </button>
// // // // // //                 {renderPageNumbers()}
// // // // // //                 <button onClick={handleNext} disabled={!pagination.next}>
// // // // // //                   Next
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Book;

// // // // // // import React, { useEffect } from "react";
// // // // // // import { useAppDispatch, useAppSelector } from "../../app/redux";
// // // // // // import Card from "../../components/Card/Card";
// // // // // // import {
// // // // // //   getBooks,
// // // // // //   getBooksByPage,
// // // // // //   getNextBooks,
// // // // // //   getPreviousBooks,
// // // // // //   useBooks,
// // // // // // } from "../../slice/book";
// // // // // // import { getCategories, useCategories } from "../../slice/category";
// // // // // // import { selectSearchs, setSearch } from "../../slice/search";
// // // // // // import { SearchBook } from "../../type";
// // // // // // import SearchForm from "./SearchForm";

// // // // // // const Book: React.FC = () => {
// // // // // //   const dispatch = useAppDispatch();
// // // // // //   const { list: categories } = useCategories();

// // // // // //   const searchResults = useAppSelector(selectSearchs);
// // // // // //   const { list, pagination, currentPage, totalPages } = useBooks();

// // // // // //   useEffect(() => {
// // // // // //     dispatch(getBooks());
// // // // // //     dispatch(getCategories());
// // // // // //   }, [dispatch]);

// // // // // //   const onSearchSubmit = (search: SearchBook) => {
// // // // // //     dispatch(setSearch(search));
// // // // // //   };

// // // // // //   const handleNext = () => {
// // // // // //     if (pagination.next) {
// // // // // //       dispatch(getNextBooks(pagination.next));
// // // // // //     }
// // // // // //   };

// // // // // //   const handlePrevious = () => {
// // // // // //     if (pagination.previous) {
// // // // // //       dispatch(getPreviousBooks(pagination.previous));
// // // // // //     }
// // // // // //   };

// // // // // //   const handlePageClick = (page: number) => {
// // // // // //     dispatch(getBooksByPage(page));
// // // // // //   };

// // // // // //   const renderPageNumbers = () => {
// // // // // //     const pages = [];
// // // // // //     for (let i = 1; i <= totalPages; i++) {
// // // // // //       pages.push(
// // // // // //         <button
// // // // // //           key={i}
// // // // // //           onClick={() => handlePageClick(i)}
// // // // // //           disabled={i === currentPage}
// // // // // //         >
// // // // // //           {i}
// // // // // //         </button>
// // // // // //       );
// // // // // //     }
// // // // // //     return pages;
// // // // // //   };

// // // // // //   const shouldShowPagination = list.length >= 9 || currentPage > 1;

// // // // // //   return (
// // // // // //     <div className="search container">
// // // // // //       <SearchForm
// // // // // //         searchResults={searchResults}
// // // // // //         onFormSubmit={onSearchSubmit}
// // // // // //         categories={categories}
// // // // // //       />
// // // // // //       <div className="container">
// // // // // //         {searchResults.length !== 0 ? (
// // // // // //           <div className="row">
// // // // // //             {searchResults.map((search) => {
// // // // // //               return (
// // // // // //                 <div className="col-4" key={search.id}>
// // // // // //                   <Card book={search} />
// // // // // //                 </div>
// // // // // //               );
// // // // // //             })}
// // // // // //           </div>
// // // // // //         ) : (
// // // // // //           <>
// // // // // //             <div className="row">
// // // // // //               {list.map((book) => {
// // // // // //                 return (
// // // // // //                   <div key={book.id} className="col-4">
// // // // // //                     <Card book={book} />
// // // // // //                   </div>
// // // // // //                 );
// // // // // //               })}
// // // // // //             </div>
// // // // // //             <div>
// // // // // //               <button onClick={handlePrevious} disabled={!pagination.previous}>
// // // // // //                 Previous
// // // // // //               </button>
// // // // // //               {renderPageNumbers()}
// // // // // //               <button onClick={handleNext} disabled={!pagination.next}>
// // // // // //                 Next
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default Book;
