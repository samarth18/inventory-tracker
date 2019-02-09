import React from "react";
import ItemList from "./ItemList";
import ItemListFilters from "./ItemListFilters";
import InventorySummary from "./InventorySummary";

const InventoryDashboardPage = () => (
  <div>
    <InventorySummary />
    <ItemListFilters />
    <ItemList />
  </div>
);

export default InventoryDashboardPage;
