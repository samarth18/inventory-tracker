import moment from "moment";

export default [
  {
    id: "1",
    description: "Gum",
    note: "",
    quantity: "2",
    cost: 195,
    createdAt: 0
  },
  {
    id: "2",
    description: "Rent",
    note: "",
    quantity: "4",
    cost: 109500,
    createdAt: moment(0)
      .subtract(4, "days")
      .valueOf()
  },
  {
    id: "3",
    description: "Credit Card",
    note: "",
    quantity: "3",
    cost: 4500,
    createdAt: moment(0)
      .add(4, "days")
      .valueOf()
  }
];
