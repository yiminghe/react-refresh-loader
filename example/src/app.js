import React from "react";
import ReactDOM from "react-dom";
import { Index, IndexClass } from "./component";

const Something = ({ children }) => {
  return <div>Changew here reloads the page {children}</div>;
};

ReactDOM.render(
  <Something>
    <Index/>
    <IndexClass/>
  </Something>,
  document.getElementById("app")
);
