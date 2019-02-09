import React from "react";
import { shallow } from "enzyme";
import { AddItemPage } from "../../components/AddItemPage";
import items from "../fixtures/items";

let startAddItem, history, wrapper;

beforeEach(() => {
  startAddItem = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <AddItemPage startAddItem={startAddItem} history={history} />
  );
});

test("should render AddItemPage correctly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle onSubmit", () => {
  wrapper.find("ItemForm").prop("onSubmit")(items[1]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startAddItem).toHaveBeenLastCalledWith(items[1]);
});
