import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import selectItems from "../selectors/items";
import selectItemsTotal from "../selectors/items-total";

export const InventorySummary = ({ itemCount, itemsTotal }) => {
  const itemWord = itemCount === 1 ? "item" : "items";
  const formattedItemsTotal = numeral(itemsTotal).format("$0,0.00");

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Displaying <span>{itemCount}</span> {itemWord} with a total of{" "}
          <span>{formattedItemsTotal}</span>
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">
            <span>Add Item</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const visibleItems = selectItems(state.items, state.filters);

  return {
    itemCount: visibleItems.length,
    itemsTotal: selectItemsTotal(visibleItems)
  };
};

export default connect(mapStateToProps)(InventorySummary);
