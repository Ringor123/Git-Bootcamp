import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBookForm from "./components/NewBookForm";

const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);

  const setNotify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <Authors show={page === "authors"} setNotify={setNotify} />

      <Books show={page === "books"} setNotify={setNotify}/>

      <NewBookForm show={page === "add"} setNotify={setNotify} />
    </div>
  );
};

export default App;
