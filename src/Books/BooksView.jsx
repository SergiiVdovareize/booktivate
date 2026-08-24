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
      <div className="books-header">
        <h2>Books Collection</h2>
        <button
          type="button"
          className="add-book-trigger-btn"
          onClick={controller.openAddModal}
        >
          + Add Book
        </button>
      </div>

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
          Private Books ({controller.privateBooksCount})
        </button>
      </div>

      {controller.isLoading && (
        <div className="loading">
          <span className="spinner"></span> Loading library collection...
        </div>
      )}

      {controller.errorMessage && (
        <div className="error">{controller.errorMessage}</div>
      )}

      <div className="books-list">
        {controller.filteredBooks.map((book, index) => (
          <div key={book.id || index} className="book-item">
            <div className="book-info">
              <span className="book-author">{book.author}</span>
              <span className="book-title">{book.title || book.name}</span>
            </div>
            {book.isPrivate ? (
              <span className="book-badge private">
                <span role="img" aria-label="private">
                  🔒
                </span>{" "}
                Private
              </span>
            ) : (
              <span className="book-badge public">
                <span role="img" aria-label="public">
                  🌐
                </span>{" "}
                Public
              </span>
            )}
          </div>
        ))}

        {!controller.isLoading && controller.filteredBooks.length === 0 && (
          <div className="empty-state">
            <p>No books found in this view.</p>
          </div>
        )}
      </div>

      <AddBookModal controller={controller} />
    </div>
  );
});

export default BooksView;
