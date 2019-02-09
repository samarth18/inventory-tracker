import React from "react";
import { shallow } from "enzyme";
import { ItemList } from "../../components/ItemList";
import items from "../fixtures/items";

test("should render ItemList with items", () => {
  const wrapper = shallow(<ItemList items={items} />);
  expect(wrapper).toMatchSnapshot();
});

test("should render ItemList with empty message", () => {
  const wrapper = shallow(<ItemList items={[]} />);
  expect(wrapper).toMatchSnapshot();
});
