import React from "react";
import { observer } from "mobx-react";

export const AddBookModal = observer(({ controller }) => {
  if (!controller.isAddModalOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add New Book</h3>

        <div className="form-group">
          <label htmlFor="book-name-input">Title</label>
          <input
            id="book-name-input"
            type="text"
            value={controller.newBookName}
            onChange={(e) => controller.setNewBookName(e.target.value)}
            placeholder="Enter book title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="book-author-input">Author</label>
          <input
            id="book-author-input"
            type="text"
            value={controller.newBookAuthor}
            onChange={(e) => controller.setNewBookAuthor(e.target.value)}
            placeholder="Enter author name"
          />
        </div>

        <div className="modal-actions">
          <button
            onClick={controller.addBook}
            disabled={controller.isSubmitting}
          >
            {controller.isSubmitting ? "Adding..." : "Add"}
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
      </div>
    </div>
  );
});

export default AddBookModal;
