import React from "react";
import { shallow } from "enzyme";
import items from "../fixtures/items";
import InventoryListItem from "../../components/InventoryListItem";

test("should render InventoryListItem correctly", () => {
  const wrapper = shallow(<InventoryListItem {...items[0]} />);
  expect(wrapper).toMatchSnapshot();
});
