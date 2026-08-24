import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useController } from "../Shared/ControllerContext";
import AddBookModal from "./AddBookModal";

export const BooksView = observer(({ controller: propController }) => {
  const contextController = useController();
  const controller = propController || contextController;

  useEffect(() => {
    controller.loadBooks();
  }, [controller]);

  return (
    <div className="books-container">
      <h2>Books List</h2>

      {/* Filter Switch Tabs */}
      <div className="filter-tabs">
        <button
          type="button"
          className={`filter-btn ${controller.filter === "all" ? "active" : ""}`}
          onClick={() => controller.setFilter("all")}
        >
          All Books
        </button>
        <button
          type="button"
          className={`filter-btn ${controller.filter === "private" ? "active" : ""}`}
          onClick={() => controller.setFilter("private")}
        >
          Private Books
        </button>
      </div>

      {controller.isLoading && <div className="loading">Loading books...</div>}
      {controller.errorMessage && (
        <div className="error">{controller.errorMessage}</div>
      )}

      <div className="books-list">
        {controller.filteredBooks.map((book, index) => (
          <div key={book.id || index} className="book-item">
            <span>
              <strong>{book.author}</strong>: {book.title || book.name}
            </span>
          </div>
        ))}

        {!controller.isLoading && controller.filteredBooks.length === 0 && (
          <div className="empty-state">No books found in this view.</div>
        )}
      </div>

      <button type="button" onClick={controller.openAddModal}>
        Add Book
      </button>

      <AddBookModal controller={controller} />
    </div>
  );
});

export default BooksView;
