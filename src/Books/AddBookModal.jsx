import { observer } from "mobx-react";
import React from "react";
import { useController } from "../Shared/ControllerContext";

export const AddBookModal = observer(({ controller: propController }) => {
  const contextController = useController();
  const controller = propController || contextController;

  if (!controller.isAddModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    controller.addBook();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Add New Book</h3>
          <span className="modal-user-badge">{controller.username}</span>
        </div>

        {controller.errorMessage && (
          <div className="error">{controller.errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="book-name">Book Title</label>
            <input
              id="book-name"
              type="text"
              value={controller.newBookName}
              onChange={(e) => controller.setNewBookName(e.target.value)}
              placeholder="Enter book title"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="book-author">Author</label>
            <input
              id="book-author"
              type="text"
              value={controller.newBookAuthor}
              onChange={(e) => controller.setNewBookAuthor(e.target.value)}
              placeholder="Enter author name"
            />
          </div>

          <div className="modal-actions">
            <button
              type="submit"
              className="primary-btn"
              disabled={controller.isSubmitting}
            >
              {controller.isSubmitting ? "Adding..." : "Add Book"}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={controller.closeAddModal}
              disabled={controller.isSubmitting}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default AddBookModal;
