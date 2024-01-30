import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function BookListApp() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: {
          Authorization: "whatever-you-want",
        },
      })
      .then((response) => {
        setBooks(response.data.books);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 404) {
          console.error("Status 404 - Not Found");
        }
      });
  }, []);

  return (
    <div className="BookListApp">
      <header className="BookListApp-header">
        {books.length ? (
          <div className="book-container">
            {books.map((book, index) => (
              <div key={index} className="book">
                <h2>{book.title}</h2>
                <div className="book-details">
                  <img src={book.imageLinks.thumbnail} alt={book.title} />
                  <p>{book.description}</p>
                </div>
                <p>{book.authors.join(", ")}</p>
                {index !== books.length - 1 && <hr />}
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
}

export default BookListApp;
