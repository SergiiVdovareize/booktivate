import { observer } from "mobx-react";
import React from "react";
import { useController } from "../Shared/ControllerContext";

export const AddBookModal = observer(({ controller: propController }) => {
  const contextController = useController();
  const controller = propController || contextController;

  if (!controller.isAddModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add New Book</h3>

        {controller.errorMessage && (
          <div className="error">{controller.errorMessage}</div>
        )}

        <div className="form-group">
          <label htmlFor="book-name">Book Title</label>
          <input
            id="book-name"
            type="text"
            value={controller.newBookName}
            onChange={(e) => controller.setNewBookName(e.target.value)}
            placeholder="Enter book title"
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
            type="button"
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
