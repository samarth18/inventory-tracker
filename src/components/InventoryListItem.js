import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const InventoryListItem = ({
  id,
  description,
  netAmount,
  createdAt,
  quantity
}) => (
  <Link className="list-item" to={`/edit/${id}`}>
    <div>
      <h3 className="list-item__title">{description}</h3>
      <div>
        <span className="list-item__sub-title">Quantity: {quantity}</span>
      </div>
      <span className="list-item__sub-title">
        {moment(createdAt).format("MMMM Do, YYYY")}
      </span>
    </div>
    <h3 className="list-item__data">{numeral(netAmount).format("$0,0.00")}</h3>
  </Link>
);

export default InventoryListItem;
