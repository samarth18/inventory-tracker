import React from "react";
import { shallow } from "enzyme";
import items from "../fixtures/items";
import { EditItemPage } from "../../components/EditItemPage";

let startEditItem, startRemoveItem, history, wrapper;

beforeEach(() => {
  startEditItem = jest.fn();
  startRemoveItem = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditItemPage
      startEditItem={startEditItem}
      startRemoveItem={startRemoveItem}
      history={history}
      item={items[2]}
    />
  );
});

test("should render EditItemPage", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should handle startEditItem", () => {
  wrapper.find("ItemForm").prop("onSubmit")(items[2]);
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startEditItem).toHaveBeenLastCalledWith(items[2].id, items[2]);
});

test("should handle startRemoveItem", () => {
  wrapper.find("button").simulate("click");
  expect(history.push).toHaveBeenLastCalledWith("/");
  expect(startRemoveItem).toHaveBeenLastCalledWith({
    id: items[2].id
  });
});
