import React from "react";
import App from "./App";
import Sudoku from "./Sudoku";
import NumberBox from "./NumberBox";

import { shallow } from "enzyme";

describe("rendering components", () => {
  it("renders App conponent without chrashng", () => {
    shallow(<App />);
  });
  it("renders Sudoku without crashing", () => {
    shallow(<Sudoku />);
  });
  it("renders NumberBox without crashing", () => {
    shallow(<NumberBox />);
  });
});
