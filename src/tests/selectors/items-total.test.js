import selectItemsTotal from "../../selectors/items-total";
import items from "../fixtures/items";

test("should return 0 if no items", () => {
  const res = selectItemsTotal([]);
  expect(res).toBe(0);
});

test("should correctly add up a single item", () => {
  const res = selectItemsTotal([items[0]]);
  expect(res).toBe(195);
});

test("should correctly add up multiple items", () => {
  const res = selectItemsTotal(items);
  expect(res).toBe(114195);
});
