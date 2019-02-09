import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import ItemForm from "../../components/ItemForm";
import items from "../fixtures/items";

test("should render ItemForm correctly", () => {
  const wrapper = shallow(<ItemForm />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ItemForm correctly with item data", () => {
  const wrapper = shallow(<ItemForm item={items[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render error for invalid form submission", () => {
  const wrapper = shallow(<ItemForm />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error").length).toBeGreaterThan(0);
  expect(wrapper).toMatchSnapshot();
});

test("should set description on input change", () => {
  const value = "New description";
  const wrapper = shallow(<ItemForm />);
  wrapper
    .find("input")
    .at(0)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("description")).toBe(value);
});

test("should set note on textarea change", () => {
  const value = "New note value";
  const wrapper = shallow(<ItemForm />);
  wrapper.find("textarea").simulate("change", {
    target: { value }
  });
  expect(wrapper.state("note")).toBe(value);
});

test("should set cost if valid input", () => {
  const value = "23.50";
  const wrapper = shallow(<ItemForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("cost")).toBe(value);
});

test("should not set cost if invalid input", () => {
  const value = "12.122";
  const wrapper = shallow(<ItemForm />);
  wrapper
    .find("input")
    .at(1)
    .simulate("change", {
      target: { value }
    });
  expect(wrapper.state("cost")).toBe("");
});

test("should call onSubmit prop for valid form submission", () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<ItemForm item={items[0]} onSubmit={onSubmitSpy} />);
  wrapper.find("form").simulate("submit", {
    preventDefault: () => {}
  });
  expect(wrapper.state("error")).toBe("");
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: items[0].description,
    cost: items[0].cost,
    note: items[0].note,
    createdAt: items[0].createdAt
  });
});

test("should set new date on date change", () => {
  const now = moment();
  const wrapper = shallow(<ItemForm />);
  wrapper.find("SingleDatePicker").prop("onDateChange")(now);
  expect(wrapper.state("createdAt")).toEqual(now);
});

test("should set calendar focus on change", () => {
  const focused = true;
  const wrapper = shallow(<ItemForm />);
  wrapper.find("SingleDatePicker").prop("onFocusChange")({ focused });
  expect(wrapper.state("calendarFocused")).toBe(focused);
});
