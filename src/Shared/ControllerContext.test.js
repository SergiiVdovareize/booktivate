import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { ControllerProvider, useController } from "./ControllerContext";

describe("ControllerContext & useController hook", () => {
  test("provides custom controller instance to children via useController", () => {
    const mockController = { name: "MockController" };
    let renderedName = "";

    const TestComponent = () => {
      const controller = useController();
      renderedName = controller.name;
      return <div>{controller.name}</div>;
    };

    const container = document.createElement("div");
    act(() => {
      ReactDOM.render(
        <ControllerProvider controller={mockController}>
          <TestComponent />
        </ControllerProvider>,
        container
      );
    });

    expect(renderedName).toBe("MockController");
    expect(container.textContent).toBe("MockController");
  });
});
