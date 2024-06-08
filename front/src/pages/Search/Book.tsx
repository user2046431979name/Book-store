import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { useAppDispatch } from "../../app/redux";
import Card from "../../components/Card/Card";
import { getCategories, useCategories } from "../../slice/category";
import {
  getNextSearchs,
  getPreviousSearchs,
  setSearch,
  useSearch,
} from "../../slice/search";
import { SearchBook } from "../../type";
import SearchForm from "./SearchForm";

const Book: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: categories } = useCategories();
  // const searchResult = useAppSelector(selectSearchs);
  // const searchCurrentPage = useAppSelector(selectSearchCurrentPage);
  const { list, pagination, currentPage } = useSearch();
  // const { list, pagination, loading, currentPage, totalPages } = useBooks();
  const location = useLocation();

  useEffect(() => {
    dispatch(setSearch(null));
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearch({}));
  }, [location, dispatch]);

  const onSearchSubmit = (search: SearchBook) => {
    dispatch(setSearch(search));
  };

  const handleNext = () => {
    if (pagination.next) {
      dispatch(getNextSearchs(pagination.next));
    }
  };

  const handlePrevious = () => {
    if (pagination.previous) {
      dispatch(getPreviousSearchs(pagination.previous));
    }
  };

  return (
    <div className="search container">
      {list.length === 0 ? (
        <h1>Книг пока что нет</h1>
      ) : (
        <>
          <SearchForm
            searchResults={list}
            onFormSubmit={onSearchSubmit}
            categories={categories}
          />
          <div className="container">
            <div className="row">
              {list.map((search) => (
                <div className="col-4" key={search.id}>
                  <Card book={search} />
                </div>
              ))}
            </div>
            <div className="pagination">
              <button onClick={handlePrevious} disabled={!pagination.previous}>
                <ArrowBackIcon />
              </button>
              <p>{currentPage}</p>
              <button onClick={handleNext} disabled={!pagination.next}>
                <ArrowForwardIcon />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Book;

// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../app/redux";
// import { useLocation } from "react-router-dom"; // Import useLocation
// import Card from "../../components/Card/Card";
// import {
//   getBooks,
//   getBooksByPage,
//   getNextBooks,
//   getPreviousBooks,
//   useBooks,
// } from "../../slice/book";
// import { getCategories, useCategories } from "../../slice/category";
// import {
//   selectSearchs,
//   setSearch,
//   getSearchByPage,
//   selectSearchPagination,
//   selectSearchCurrentPage,
//   selectSearchTotalPages,
// } from "../../slice/search";
// import { Book as BookArr, SearchBook } from "../../type";
// import SearchForm from "./SearchForm";

// const Book: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { list: categories } = useCategories();
//   const searchResult = useAppSelector(selectSearchs);
//   const searchPagination = useAppSelector(selectSearchPagination);
//   const searchCurrentPage = useAppSelector(selectSearchCurrentPage);
//   const searchTotalPages = useAppSelector(selectSearchTotalPages);
//   const { list, pagination, loading, currentPage, totalPages } = useBooks();
//   const location = useLocation();

//   useEffect(() => {
//     dispatch(getBooks());
//     dispatch(getCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(setSearch({}));
//   }, [location, dispatch]);

//   const onSearchSubmit = (search: SearchBook) => {
//     dispatch(setSearch(search));
//   };

//   const handleNext = () => {
//     if (searchPagination.next) {
//       dispatch(getSearchByPage(searchCurrentPage + 1));
//     } else if (pagination.next) {
//       dispatch(getNextBooks(pagination.next));
//     }
//   };

//   const handlePrevious = () => {
//     if (searchPagination.previous) {
//       dispatch(getSearchByPage(searchCurrentPage - 1));
//     } else if (pagination.previous) {
//       dispatch(getPreviousBooks(pagination.previous));
//     }
//   };

//   const handlePageClick = (page: number) => {
//     if (searchPagination.count > 0) {
//       dispatch(getSearchByPage(page));
//     } else {
//       dispatch(getBooksByPage(page));
//     }
//   };

//   const renderPageNumbers = () => {
//     const pages = [];
//     const totalPagesToShow =
//       searchPagination.count > 0 ? searchTotalPages : totalPages;
//     const currentPageToShow =
//       searchPagination.count > 0 ? searchCurrentPage : currentPage;

//     for (let i = 1; i <= totalPagesToShow; i++) {
//       pages.push(
//         <button
//           key={i}
//           onClick={() => handlePageClick(i)}
//           disabled={i === currentPageToShow}
//         >
//           {i}
//         </button>
//       );
//     }
//     return pages;
//   };

//   const shouldShowPagination =
//     list.length > 0 ||
//     currentPage > 1 ||
//     searchResult.length > 0 ||
//     searchCurrentPage > 1;

//   return (
//     <div className="search container">
//       {list.length === 0 && searchResult.length === 0 ? (
//         <h1>Книг пока что нет</h1>
//       ) : (
//         <>
//           <SearchForm
//             searchResults={searchResult}
//             onFormSubmit={onSearchSubmit}
//             categories={categories}
//           />
//           <div className="container">
//             {searchResult.length !== 0 ? (
//               <>
//                 <div className="row">
//                   {searchResult.map((search) => (
//                     <div className="col-4" key={search.id}>
//                       <Card book={search} />
//                     </div>
//                   ))}
//                 </div>
//                 {shouldShowPagination && (
//                   <div className="pagination">
//                     <button
//                       onClick={handlePrevious}
//                       disabled={!pagination.previous}
//                     >
//                       <ArrowBackIcon />
//                     </button>
//                     <p>{currentPage}</p>
//                     <button onClick={handleNext} disabled={!pagination.next}>
//                       <ArrowForwardIcon />
//                     </button>
//                   </div>
//                 )}
//               </>
//             ) : (
//               <>
//                 <div className="row">
//                   {list.map((book) => (
//                     <div key={book.id} className="col-4">
//                       <Card book={book} />
//                     </div>
//                   ))}
//                 </div>
//                 {shouldShowPagination && (
//                   <div className="pagination">
//                     <button
//                       onClick={handlePrevious}
//                       disabled={!pagination.previous}
//                     >
//                       <ArrowBackIcon />
//                     </button>
//                     <p>{currentPage}</p>
//                     <button onClick={handleNext} disabled={!pagination.next}>
//                       <ArrowForwardIcon />
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Book;

// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../app/redux";
// import { useLocation } from "react-router-dom"; // Import useLocation
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
// import { Book as BookArr, SearchBook } from "../../type";
// import SearchForm from "./SearchForm";

// const Book: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { list: categories } = useCategories();
//   let searchResult = useAppSelector(selectSearchs);
//   const { list, pagination, loading, currentPage, totalPages } = useBooks();
//   const location = useLocation();

//   useEffect(() => {
//     dispatch(getBooks());
//     dispatch(getCategories());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(setSearch({}));
//   }, [location, dispatch]);

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
//     dispatch(getBooksByPage(page));
//   };

//   const renderPageNumbers = () => {
//     const pages = [];
//     for (let i = 1; i <= totalPages; i++) {
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
//       {list.length === 0 ? (
//         <h1>Книг пока что нет</h1>
//       ) : (
//         <>
//           <SearchForm
//             searchResults={searchResult}
//             onFormSubmit={onSearchSubmit}
//             categories={categories}
//           />
//           <div className="container">
//             {searchResult.length !== 0 ? (
//               <>
//                 <div className="row">
//                   {searchResult.map((search) => (
//                     <div className="col-4" key={search.id}>
//                       <Card book={search} />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="pagination">
//                   <button
//                     onClick={handlePrevious}
//                     disabled={!pagination.previous}
//                   >
//                     <ArrowBackIcon />
//                   </button>
//                   <p>{currentPage}</p>
//                   <button onClick={handleNext} disabled={!pagination.next}>
//                     <ArrowForwardIcon />
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="row">
//                   {list.map((book) => (
//                     <div key={book.id} className="col-4">
//                       <Card book={book} />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="pagination">
//                   <button
//                     onClick={handlePrevious}
//                     disabled={!pagination.previous}
//                   >
//                     <ArrowBackIcon />
//                   </button>
//                   <p>{currentPage}</p>
//                   <button onClick={handlePrevious} disabled={!pagination.next}>
//                     <ArrowForwardIcon />
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Book;

// // import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// // import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
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
// // import { Book as BookArr, SearchBook } from "../../type";
// // import SearchForm from "./SearchForm";
// // interface Props {
// //   searchResult?: BookArr[];
// // }
// // const Book: React.FC = () => {
// //   const dispatch = useAppDispatch();
// //   const { list: categories } = useCategories();
// //   let searchResult = useAppSelector(selectSearchs);
// //   const { list, pagination, loading, currentPage, totalPages } = useBooks();
// //   // console.log(location);
// //   // // console.log(searchResults);
// //   // useEffect(() => {
// //   //   searchResults = [];
// //   // }, [location]);
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
// //     dispatch(getBooksByPage(page));
// //   };

// //   const renderPageNumbers = () => {
// //     const pages = [];
// //     for (let i = 1; i <= totalPages; i++) {
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
// //       {list.length === 0 ? (
// //         <h1>Книг пока что нет</h1>
// //       ) : (
// //         <>
// //           <SearchForm
// //             searchResults={searchResult}
// //             onFormSubmit={onSearchSubmit}
// //             categories={categories}
// //           />
// //           <div className="container">
// //             {searchResult.length !== 0 ? (
// //               <div className="row">
// //                 {searchResult.map((search) => (
// //                   <div className="col-4" key={search.id}>
// //                     <Card book={search} />
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <>
// //                 <div className="row">
// //                   {list.map((book) => (
// //                     <div key={book.id} className="col-4">
// //                       <Card book={book} />
// //                     </div>
// //                   ))}
// //                 </div>
// //                 <div className="pagination">
// //                   <button
// //                     onClick={handlePrevious}
// //                     disabled={!pagination.previous}
// //                   >
// //                     <ArrowBackIcon />
// //                   </button>
// //                   <p>{currentPage}</p>
// //                   <button onClick={handleNext} disabled={!pagination.next}>
// //                     <ArrowForwardIcon />
// //                   </button>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Book;
