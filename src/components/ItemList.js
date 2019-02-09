import React from "react";
import { connect } from "react-redux";
import InventoryListItem from "./InventoryListItem";
import selectItems from "../selectors/items";

export const ItemList = props => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Items</div>
      <div className="show-for-desktop">Item</div>
      <div className="show-for-desktop">Net Amount</div>
    </div>
    <div className="list-body">
      {props.items.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No items</span>
        </div>
      ) : (
        props.items.map(item => {
          return <InventoryListItem key={item.id} {...item} />;
        })
      )}
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    items: selectItems(state.items, state.filters)
  };
};

export default connect(mapStateToProps)(ItemList);
