import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { ControllerProvider } from "../Shared/ControllerContext";
import HeaderView from "./HeaderView";

describe("HeaderView Component", () => {
  let container;
  let mockController;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    mockController = {
      username: "svdovareize",
      draftUsername: "svdovareize",
      isEditingUsername: false,
      privateBooksCount: 3,
      startEditingUsername: jest.fn(),
      cancelEditingUsername: jest.fn(),
      setDraftUsername: jest.fn(),
      applyUsername: jest.fn(),
    };
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test("renders read-only username and Switch user button", () => {
    act(() => {
      ReactDOM.render(
        <ControllerProvider controller={mockController}>
          <HeaderView />
        </ControllerProvider>,
        container,
      );
    });

    expect(container.textContent).toContain("svdovareize");
    expect(container.textContent).toContain("Switch user");
  });

  test("clicking Switch user triggers startEditingUsername", () => {
    act(() => {
      ReactDOM.render(
        <ControllerProvider controller={mockController}>
          <HeaderView />
        </ControllerProvider>,
        container,
      );
    });

    const button = container.querySelector(".change-user-btn");
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(mockController.startEditingUsername).toHaveBeenCalled();
  });

  test("renders text input, Apply, and Cancel buttons when in editing mode", () => {
    mockController.isEditingUsername = true;

    act(() => {
      ReactDOM.render(
        <ControllerProvider controller={mockController}>
          <HeaderView />
        </ControllerProvider>,
        container,
      );
    });

    const input = container.querySelector("#user-input");
    expect(input).not.toBeNull();
    expect(input.value).toBe("svdovareize");

    const applyBtn = container.querySelector(".apply-user-btn");
    const cancelBtn = container.querySelector(".cancel-user-btn");

    act(() => {
      applyBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(mockController.applyUsername).toHaveBeenCalled();

    act(() => {
      cancelBtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(mockController.cancelEditingUsername).toHaveBeenCalled();
  });

  test("handles Enter and Escape keydown events in input", () => {
    mockController.isEditingUsername = true;

    act(() => {
      ReactDOM.render(
        <ControllerProvider controller={mockController}>
          <HeaderView />
        </ControllerProvider>,
        container,
      );
    });

    const input = container.querySelector("#user-input");

    act(() => {
      input.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
      );
    });
    expect(mockController.applyUsername).toHaveBeenCalled();

    act(() => {
      input.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
    });
    expect(mockController.cancelEditingUsername).toHaveBeenCalled();
  });
});
