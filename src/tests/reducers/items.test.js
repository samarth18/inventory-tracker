import itemsReducer from "../../reducers/items";
import items from "../fixtures/items";

test("should set default state", () => {
  const state = itemsReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove item by id", () => {
  const action = {
    type: "REMOVE_ITEM",
    id: items[1].id
  };
  const state = itemsReducer(items, action);
  expect(state).toEqual([items[0], items[2]]);
});

test("should not remove items if id not found", () => {
  const action = {
    type: "REMOVE_ITEM",
    id: "-1"
  };
  const state = itemsReducer(items, action);
  expect(state).toEqual(items);
});

test("should add an item", () => {
  const item = {
    id: "109",
    description: "Laptop",
    note: "",
    createdAt: 20000,
    cost: 29500
  };
  const action = {
    type: "ADD_ITEM",
    item
  };
  const state = itemsReducer(items, action);
  expect(state).toEqual([...items, item]);
});

test("should edit an item", () => {
  const cost = 122000;
  const action = {
    type: "EDIT_ITEM",
    id: items[1].id,
    updates: {
      cost
    }
  };
  const state = itemsReducer(items, action);
  expect(state[1].cost).toBe(cost);
});

test("should not edit an item if id not found", () => {
  const cost = 122000;
  const action = {
    type: "EDIT_ITEM",
    id: "-1",
    updates: {
      cost
    }
  };
  const state = itemsReducer(items, action);
  expect(state).toEqual(items);
});

test("should set items", () => {
  const action = {
    type: "SET_ITEMS",
    items: [items[1]]
  };
  const state = itemsReducer(items, action);
  expect(state).toEqual([items[1]]);
});
