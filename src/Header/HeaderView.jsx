import React from "react";
import { observer } from "mobx-react";

export const HeaderView = observer(({ controller }) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="header-title">Reaktivate Books</h1>
        <div className="private-books-badge">
          Your books: <strong>{controller.privateBooksCount}</strong>
        </div>
      </div>
    </header>
  );
});

export default HeaderView;
