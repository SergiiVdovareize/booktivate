import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { ControllerProvider } from "../Shared/ControllerContext";
import AddBookModal from "./AddBookModal";

describe("AddBookModal Component", () => {
  let container;
  let mockController;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    mockController = {
      isAddModalOpen: true,
      newBookName: "Dune",
      newBookAuthor: "Frank Herbert",
      isSubmitting: false,
      errorMessage: null,
      setNewBookName: jest.fn(),
      setNewBookAuthor: jest.fn(),
      addBook: jest.fn(),
      closeAddModal: jest.fn(),
    };
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test("returns null when isAddModalOpen is false", () => {
    mockController.isAddModalOpen = false;

    act(() => {
      ReactDOM.render(
        <ControllerProvider controller={mockController}>
          <AddBookModal />
        </ControllerProvider>,
        container,
      );
    });

    expect(container.textContent).toBe("");
  });

  test("renders form inputs, error message, and action buttons when open", () => {
    mockController.errorMessage = "Title required";

    act(() => {
      ReactDOM.render(
        <ControllerProvider controller={mockController}>
          <AddBookModal />
        </ControllerProvider>,
        container,
      );
    });

    expect(container.textContent).toContain("Add New Book");
    expect(container.textContent).toContain("Title required");

    const nameInput = container.querySelector("#book-name");
    const authorInput = container.querySelector("#book-author");

    expect(nameInput.value).toBe("Dune");
    expect(authorInput.value).toBe("Frank Herbert");

    const addBtn = container.querySelector("button:not(.secondary)");
    const cancelBtn = container.querySelector("button.secondary");

    act(() => {
      addBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(mockController.addBook).toHaveBeenCalled();

    act(() => {
      cancelBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(mockController.closeAddModal).toHaveBeenCalled();
  });

  test("disables action buttons when isSubmitting is true", () => {
    mockController.isSubmitting = true;

    act(() => {
      ReactDOM.render(
        <ControllerProvider controller={mockController}>
          <AddBookModal />
        </ControllerProvider>,
        container,
      );
    });

    const addBtn = container.querySelector("button:not(.secondary)");
    const cancelBtn = container.querySelector("button.secondary");

    expect(addBtn.disabled).toBe(true);
    expect(cancelBtn.disabled).toBe(true);
    expect(addBtn.textContent).toBe("Adding...");
  });
});
