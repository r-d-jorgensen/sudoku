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

describe("sudoku component", () => {
  it("contains h1 header", () => {
    const wraper = shallow(<Sudoku />);
    const text = wraper.find('h1').text();
    expect(text).toEqual('SUDOKU SOLVER');
  });
});

//TODO: checks for each of the components espesialy the main Sudoku one