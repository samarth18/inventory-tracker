import React from "react";
import { connect } from "react-redux";
import ItemForm from "./ItemForm";
import { startAddItem } from "../actions/items";

export class AddItemPage extends React.Component {
  onSubmit = item => {
    this.props.startAddItem(item);
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Add Item</h1>
          </div>
        </div>
        <div className="content-container">
          <ItemForm onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startAddItem: item => dispatch(startAddItem(item))
});

export default connect(
  undefined,
  mapDispatchToProps
)(AddItemPage);
