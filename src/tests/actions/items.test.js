import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startAddItem,
  addItem,
  editItem,
  startEditItem,
  removeItem,
  startRemoveItem,
  setItems,
  startSetItems
} from "../../actions/items";
import items from "../fixtures/items";
import database from "../../firebase/firebase";

const uid = "thisismytestuid";
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
  const itemsData = {};
  items.forEach(({ id, description, note, cost, createdAt }) => {
    itemsData[id] = { description, note, cost, createdAt };
  });
  database
    .ref(`users/${uid}/items`)
    .set(itemsData)
    .then(() => done());
});

test("should setup remove item action object", () => {
  const action = removeItem({ id: "123abc" });
  expect(action).toEqual({
    type: "REMOVE_ITEM",
    id: "123abc"
  });
});

test("should remove item from firebase", done => {
  const store = createMockStore(defaultAuthState);
  const id = items[2].id;
  store
    .dispatch(startRemoveItem({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_ITEM",
        id
      });
      return database.ref(`users/${uid}/items/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test("should setup edit item action object", () => {
  const action = editItem("123abc", { note: "New note value" });
  expect(action).toEqual({
    type: "EDIT_ITEM",
    id: "123abc",
    updates: {
      note: "New note value"
    }
  });
});

test("should edit item from firebase", done => {
  const store = createMockStore(defaultAuthState);
  const id = items[0].id;
  const updates = { cost: 21045 };
  store
    .dispatch(startEditItem(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_ITEM",
        id,
        updates
      });
      return database.ref(`users/${uid}/items/${id}`).once("value");
    })
    .then(snapshot => {
      expect(snapshot.val().cost).toBe(updates.cost);
      done();
    });
});

test("should setup add item action object with provided values", () => {
  const action = addItem(items[2]);
  expect(action).toEqual({
    type: "ADD_ITEM",
    item: items[2]
  });
});

test("should add item to database and store", done => {
  const store = createMockStore(defaultAuthState);
  const itemData = {
    description: "Mouse",
    cost: 3000,
    note: "This one is better",
    createdAt: 1000
  };

  store
    .dispatch(startAddItem(itemData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_ITEM",
        item: {
          id: expect.any(String),
          ...itemData
        }
      });

      return database
        .ref(`users/${uid}/items/${actions[0].item.id}`)
        .once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(itemData);
      done();
    });
});

test("should add item with defaults to database and store", done => {
  const store = createMockStore(defaultAuthState);
  const itemDefaults = {
    description: "",
    cost: 0,
    note: "",
    createdAt: 0
  };

  store
    .dispatch(startAddItem({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_ITEM",
        item: {
          id: expect.any(String),
          ...itemDefaults
        }
      });

      return database
        .ref(`users/${uid}/items/${actions[0].item.id}`)
        .once("value");
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(itemDefaults);
      done();
    });
});

test("should setup set item action object with data", () => {
  const action = setItems(items);
  expect(action).toEqual({
    type: "SET_ITEMS",
    items
  });
});

test("should fetch the items from firebase", done => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetItems()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_ITEMS",
      items
    });
    done();
  });
});
