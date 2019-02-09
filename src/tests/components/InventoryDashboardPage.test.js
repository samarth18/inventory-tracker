import React from "react";
import { shallow } from "enzyme";
import InventoryDashboardPage from "../../components/InventoryDashboardPage";

test("should render InventoryDashboardPage correctly", () => {
  const wrapper = shallow(<InventoryDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
