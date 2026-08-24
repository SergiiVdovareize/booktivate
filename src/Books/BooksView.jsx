import React, { useEffect } from "react";
import { observer } from "mobx-react";

export const BooksView = observer(({ controller }) => {
  useEffect(() => {
    controller.loadBooks();
  }, [controller]);

  return (
    <div className="books-container">
      <h2>Books List</h2>

      {controller.isLoading && <div className="loading">Loading books...</div>}
      {controller.errorMessage && <div className="error">{controller.errorMessage}</div>}

      <div className="books-list">
        {controller.allBooks.map((book, index) => (
          <div key={book.id || index} className="book-item">
            <strong>{book.author}</strong>: {book.name}
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          alert("TBD");
        }}
      >
        Add
      </button>
    </div>
  );
});

export default BooksView;
