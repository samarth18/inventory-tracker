import moment from "moment";
import selectItems from "../../selectors/items";
import items from "../fixtures/items";

test("should filter by text value", () => {
  const filters = {
    text: "e",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };
  const result = selectItems(items, filters);
  expect(result).toEqual([items[2], items[1]]);
});

test("should filter by startDate", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: moment(0),
    endDate: undefined
  };
  const result = selectItems(items, filters);
  expect(result).toEqual([items[2], items[0]]);
});

test("should filter by endDate", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: moment(0).add(2, "days")
  };
  const result = selectItems(items, filters);
  expect(result).toEqual([items[0], items[1]]);
});

test("should sort by date", () => {
  const filters = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined
  };
  const result = selectItems(items, filters);
  expect(result).toEqual([items[2], items[0], items[1]]);
});

test("should sort by cost", () => {
  const filters = {
    text: "",
    sortBy: "cost",
    startDate: undefined,
    endDate: undefined
  };
  const result = selectItems(items, filters);
  expect(result).toEqual([items[1], items[2], items[0]]);
});
