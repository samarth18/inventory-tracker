import React from "react";
import { shallow } from "enzyme";
import { InventorySummary } from "../../components/InventorySummary";

test("should correctly render InventorySummary with 1 item", () => {
  const wrapper = shallow(<InventorySummary itemCount={1} itemsTotal={235} />);
  expect(wrapper).toMatchSnapshot();
});

test("should correctly render InventorySummary with multiple items", () => {
  const wrapper = shallow(
    <InventorySummary itemCount={23} itemsTotal={23512340987} />
  );
  expect(wrapper).toMatchSnapshot();
});
