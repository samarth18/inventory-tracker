import React from "react";
import { connect } from "react-redux";
import ItemForm from "./ItemForm";
import { startEditItem, startRemoveItem } from "../actions/items";

export class EditItemPage extends React.Component {
  onSubmit = item => {
    this.props.startEditItem(this.props.item.id, item);
    this.props.history.push("/");
  };
  onRemove = () => {
    this.props.startRemoveItem({ id: this.props.item.id });
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Item</h1>
          </div>
        </div>
        <div className="content-container">
          <ItemForm item={this.props.item} onSubmit={this.onSubmit} />
          <button className="button button--secondary" onClick={this.onRemove}>
            <span>Remove Item</span>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  item: state.items.find(item => item.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditItem: (id, item) => dispatch(startEditItem(id, item)),
  startRemoveItem: data => dispatch(startRemoveItem(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditItemPage);
