// import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { Book, Category, SearchBook } from "../../type";
// import searchSvg from "../../assets/Form/Search.svg";
// import Select from "./Select";

// interface Props {
//   searchResults: Book[];
//   categories: Category[];
//   onFormSubmit: (state: SearchBook) => void;
// }

// const SearchForm: React.FC<Props> = ({
//   searchResults,
//   categories,
//   onFormSubmit,
// }) => {
//   const [state, setState] = useState<SearchBook>({
//     title: "",
//     category_id: "",
//   });

//   // Load state from session storage on component mount
//   useEffect(() => {
//     // Check if this is the first load
//     const isInitialLoad = sessionStorage.getItem("isInitialLoad");

//     if (!isInitialLoad) {
//       // Mark the session as initialized
//       sessionStorage.setItem("isInitialLoad", "true");
//     } else {
//       // Load the saved state from session storage if not the initial load
//       const savedState = sessionStorage.getItem("searchFormState");
//       if (savedState) {
//         setState(JSON.parse(savedState));
//       }
//     }
//   }, []);

//   // Save state to session storage whenever it changes
//   useEffect(() => {
//     sessionStorage.setItem("searchFormState", JSON.stringify(state));
//   }, [state]);

//   const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { value, name } = e.target;
//     setState((prev) => ({ ...prev, [name]: value }));
//   };

//   const onSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     onFormSubmit(state);
//   };

//   return (
//     <form onSubmit={onSubmit} className="form">
//       <Select
//         onChange={onChange}
//         onSubmit={onSubmit}
//         searchResults={searchResults}
//         categories={categories}
//       />
//       <div className="form__row">
//         <input
//           onChange={onChange}
//           name="title"
//           className="form__row-input"
//           type="text"
//           value={state.title}
//         />
//         <button type="submit" className="form__row-btn">
//           <img src={searchSvg} alt="search" />
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SearchForm;

// import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { Book, Category, SearchBook } from "../../type";
// import searchSvg from "../../assets/Form/Search.svg";
// import Select from "./Select";

// interface Props {
//   searchResults: Book[];
//   categories: Category[];
//   onFormSubmit: (state: SearchBook) => void;
// }

// const SearchForm: React.FC<Props> = ({
//   searchResults,
//   categories,
//   onFormSubmit,
// }) => {
//   const [state, setState] = useState<SearchBook>({
//     title: "",
//     category_id: "",
//   });

//   // Load state from session storage on component mount
//   useEffect(() => {
//     const savedState = sessionStorage.getItem("searchFormState");
//     if (savedState) {
//       setState(JSON.parse(savedState));
//     }
//   }, []);

//   // Save state to session storage whenever it changes
//   useEffect(() => {
//     sessionStorage.setItem("searchFormState", JSON.stringify(state));
//   }, [state]);

//   const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { value, name } = e.target;
//     setState((prev) => ({ ...prev, [name]: value }));
//   };

//   const onSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     onFormSubmit(state);
//   };

//   return (
//     <form onSubmit={onSubmit} className="form">
//       <Select
//         onChange={onChange}
//         onSubmit={onSubmit}
//         searchResults={searchResults}
//         categories={categories}
//       />
//       <div className="form__row">
//         <input
//           onChange={onChange}
//           name="title"
//           className="form__row-input"
//           type="text"
//           value={state.title}
//         />
//         <button type="submit" className="form__row-btn">
//           <img src={searchSvg} alt="search" />
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SearchForm;

import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Book, Category, SearchBook } from "../../type";
import searchSvg from "../../assets/Form/Search.svg";
import Select from "./Select";
import { useLocation } from "react-router-dom";

interface Props {
  searchResults: Book[];
  categories: Category[];
  onFormSubmit: (state: SearchBook) => void;
}

const SearchForm: React.FC<Props> = ({
  searchResults,
  categories,
  onFormSubmit,
}) => {
  const [state, setState] = useState<SearchBook>({
    title: "",
    category_id: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFormSubmit(state);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="form">
        <Select
          onChange={onChange}
          onSubmit={onSubmit}
          searchResults={searchResults}
          categories={categories}
        />
        <div className="form__row">
          <input
            onChange={onChange}
            name="title"
            className="form__row-input"
            type="text"
          />
          <button type="submit" className="form__row-btn">
            <img src={searchSvg} alt="" />
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchForm;

// import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
// import { Book, Category, SearchBook } from "../../type";
// import searchSvg from "../../assets/Form/Search.svg";
// import Select from "./Select";

// interface Props {
//   searchResults: Book[];
//   categories: Category[];
//   onFormSubmit: (state: SearchBook) => void;
// }

// const SearchForm: React.FC<Props> = ({
//   searchResults,
//   categories,
//   onFormSubmit,
// }) => {
//   const initialState = {
//     title: "",
//     category_id: "",
//   };

//   const [state, setState] = useState<SearchBook>(initialState);

//   useEffect(() => {
//     // Сброс состояния при загрузке компонента (обновлении страницы)
//     localStorage.removeItem("searchState");
//   }, []);

//   const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setState((prev) => ({ ...prev, [name]: value }));
//   };

//   const onSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     localStorage.setItem("searchState", JSON.stringify(state));
//     onFormSubmit(state);
//   };

//   return (
//     <>
//       <form onSubmit={onSubmit} className="form">
//         <Select
//           onChange={onChange}
//           onSubmit={onSubmit}
//           searchResults={searchResults}
//           categories={categories}
//         />
//         <div className="form__row">
//           <input
//             onChange={onChange}
//             name="title"
//             value={state.title}
//             className="form__row-input"
//             type="text"
//           />
//           <button type="submit" className="form__row-btn">
//             <img src={searchSvg} alt="" />
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default SearchForm;

// import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
// import { Book, Category, SearchBook } from "../../type";
// import searchSvg from "../../assets/Form/Search.svg";
// import Select from "./Select";

// interface Props {
//   searchResults: Book[];
//   categories: Category[];
//   onFormSubmit: (state: SearchBook) => void;
// }

// const SearchForm: React.FC<Props> = ({
//   searchResults,
//   categories,
//   onFormSubmit,
// }) => {
//   const initialState = {
//     title: "",
//     category_id: "",
//   };

//   const [state, setState] = useState<SearchBook>(() => {
//     const savedState = localStorage.getItem("searchState");
//     return savedState ? JSON.parse(savedState) : initialState;
//   });

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === "visible") {
//         setState(initialState);
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//     };
//   }, []);

//   const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setState((prev) => ({ ...prev, [name]: value }));
//   };

//   const onSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     localStorage.setItem("searchState", JSON.stringify(state));
//     onFormSubmit(state);
//   };

//   return (
//     <>
//       <form onSubmit={onSubmit} className="form">
//         <Select
//           onChange={onChange}
//           onSubmit={onSubmit}
//           searchResults={searchResults}
//           categories={categories}
//         />
//         <div className="form__row">
//           <input
//             onChange={onChange}
//             name="title"
//             value={state.title}
//             className="form__row-input"
//             type="text"
//           />
//           <button type="submit" className="form__row-btn">
//             <img src={searchSvg} alt="" />
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default SearchForm;

// import React, { ChangeEvent, FormEvent, useState } from "react";
// import { Book, Category, SearchBook } from "../../type";
// import searchSvg from "../../assets/Form/Search.svg";
// import Select from "./Select";
// interface Props {
//   searchResults: Book[];
//   categories: Category[];
//   onFormSubmit: (state: SearchBook) => void;
// }

// const SearchForm: React.FC<Props> = ({
//   searchResults,
//   categories,
//   onFormSubmit,
// }) => {
//   const [state, setState] = useState<SearchBook>({
//     title: "",
//     category_id: "",
//   });
//   const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setState((prev) => ({ ...prev, [name]: value }));
//   };
//   const onSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     onFormSubmit(state);
//   };

//   return (
//     <>
//       <form onSubmit={onSubmit} className="form">
//         <Select
//           onChange={onChange}
//           onSubmit={onSubmit}
//           searchResults={searchResults}
//           categories={categories}
//         />
//         <div className="form__row">
//           <input
//             onChange={onChange}
//             name="title"
//             className="form__row-input"
//             type="text"
//             // required
//           />
//           <button type="submit" className="form__row-btn">
//             <img src={searchSvg} alt="" />
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default SearchForm;
