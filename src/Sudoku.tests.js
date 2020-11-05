import React from "react";
import { shallow } from "enzyme";
import { Sudoku } from "Sudoku";

it("should have explain text" , () => {
    const wrapper = shallow(<Sudoku />);
    const div = wrapper.find("div");
    const result = div.text();

    expect(result.toBe("This system is meant to solve Sudoku puzzles.<br /> Just enter the numbers in, or to see how it works press the \"Test\" Button. When ready to have it solve press the \"Solve\" Button. It will either come back with a complete puzzle or will say that it is Unsolvable."));
});