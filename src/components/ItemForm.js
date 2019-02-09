import React from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";

export default class ItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.item ? props.item.description : "",
      note: props.item ? props.item.note : "",
      quantity: props.item ? props.item.quantity.toString() : "",
      cost: props.item ? (props.item.cost / 100).toString() : "",
      netAmount: props.item
        ? props.item.quantity * (props.item.cost / 100)
        : "",
      createdAt: props.item ? moment(props.item.createdAt) : moment(),
      calendarFocused: false,
      error: ""
    };
  }
  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onNoteChange = e => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  };
  onQuantityChange = e => {
    const quantity = e.target.value;

    if (!quantity || quantity.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ quantity }));
    }
  };
  onAmountChange = e => {
    const cost = e.target.value;

    if (!cost || cost.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ cost }));
    }
  };
  onDateChange = createdAt => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = e => {
    e.preventDefault();

    if (!this.state.description || !this.state.cost || !this.state.quantity) {
      this.setState(() => ({
        error: "Please provide description, quantity and cost."
      }));
    } else {
      this.setState(() => ({ error: "" }));
      this.props.onSubmit({
        description: this.state.description,
        quantity: parseFloat(this.state.quantity, 10),
        cost: parseFloat(this.state.cost, 10) * 100,
        netAmount:
          parseFloat(this.state.quantity, 10) * parseFloat(this.state.cost, 10),
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Description"
          autoFocus
          className="text-input"
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          placeholder="Quantity"
          className="text-input"
          value={this.state.quantity}
          onChange={this.onQuantityChange}
        />
        <input
          type="text"
          placeholder="Cost"
          className="text-input"
          value={this.state.cost}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          placeholder="Add a note for your item (optional)"
          className="textarea"
          value={this.state.note}
          onChange={this.onNoteChange}
        />
        <div>
          <button className="button">
            <span>Save Item</span>
          </button>
        </div>
      </form>
    );
  }
}
