import { observer } from "mobx-react";
import React from "react";
import { useController } from "../Shared/ControllerContext";

export const HeaderView = observer(({ controller: propController }) => {
  const contextController = useController();
  const controller = propController || contextController;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      controller.applyUsername();
    } else if (e.key === "Escape") {
      controller.cancelEditingUsername();
    }
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="header-title">Reaktivate Books</h1>
        <div className="header-right">
          <div className="user-selector">
            <label htmlFor="user-input">User: </label>
            {controller.isEditingUsername ? (
              <>
                <input
                  id="user-input"
                  type="text"
                  className="user-input"
                  value={controller.draftUsername}
                  onChange={(e) => controller.setDraftUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter username"
                  autoFocus
                />
                <button
                  type="button"
                  className="apply-user-btn"
                  onClick={controller.applyUsername}
                >
                  Apply
                </button>
                <button
                  type="button"
                  className="secondary cancel-user-btn"
                  onClick={controller.cancelEditingUsername}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="username-text">{controller.username}</span>
                <button
                  type="button"
                  className="change-user-btn"
                  onClick={controller.startEditingUsername}
                >
                  Switch user
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
});

export default HeaderView;
