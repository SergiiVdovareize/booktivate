import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { ControllerProvider } from "../Shared/ControllerContext";
import BooksView from "./BooksView";

describe("BooksView Component", () => {
  let container;
  let mockController;

  const mockBooks = [
    { id: 1, title: "Dune", author: "Frank Herbert" },
    { id: 2, title: "Foundation", author: "Isaac Asimov" }
  ];

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    mockController = {
      filter: "all",
      isLoading: false,
      errorMessage: null,
      filteredBooks: mockBooks,
      isAddModalOpen: false,
      loadBooks: jest.fn(),
      setFilter: jest.fn(),
      openAddModal: jest.fn()
    };
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test("triggers controller.loadBooks on mount and renders books list", () => {
    act(() => {
      ReactDOM.render(
        <ControllerProvider controller={mockController}>
          <BooksView />
        </ControllerProvider>,
        container
      );
    });

    expect(mockController.loadBooks).toHaveBeenCalled();
    expect(container.textContent).toContain("Frank Herbert: Dune");
    expect(container.textContent).toContain("Isaac Asimov: Foundation");
  });

  test("clicking filter tabs calls setFilter", () => {
    act(() => {
      ReactDOM.render(
        <ControllerProvider controller={mockController}>
          <BooksView />
        </ControllerProvider>,
        container
      );
    });

    const filterBtns = container.querySelectorAll(".filter-btn");

    act(() => {
      filterBtns[1].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(mockController.setFilter).toHaveBeenCalledWith("private");
  });

  test("renders loading state, error message, and empty state", () => {
    mockController.isLoading = true;
    mockController.errorMessage = "Failed to fetch";
    mockController.filteredBooks = [];

    act(() => {
      ReactDOM.render(
        <ControllerProvider controller={mockController}>
          <BooksView />
        </ControllerProvider>,
        container
      );
    });

    expect(container.textContent).toContain("Loading books...");
    expect(container.textContent).toContain("Failed to fetch");
  });

  test("renders empty state when not loading and filteredBooks is empty", () => {
    mockController.isLoading = false;
    mockController.filteredBooks = [];

    act(() => {
      ReactDOM.render(
        <ControllerProvider controller={mockController}>
          <BooksView />
        </ControllerProvider>,
        container
      );
    });

    expect(container.textContent).toContain("No books found in this view.");
  });

  test("clicking Add Book button calls openAddModal", () => {
    act(() => {
      ReactDOM.render(
        <ControllerProvider controller={mockController}>
          <BooksView />
        </ControllerProvider>,
        container
      );
    });

    const addBtn = container.querySelector("button:not(.filter-btn)");

    act(() => {
      addBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(mockController.openAddModal).toHaveBeenCalled();
  });
});
