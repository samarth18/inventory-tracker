import uuid from "uuid";
import database from "../firebase/firebase";

// ADD_ITEM
export const addItem = item => ({
  type: "ADD_ITEM",
  item
});

export const startAddItem = (itemData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = "",
      note = "",
      quantity = 1,
      cost = 0,
      createdAt = 0,
      netAmount = 0
    } = itemData;
    const item = { description, note, quantity, cost, createdAt, netAmount };

    return database
      .ref(`users/${uid}/items`)
      .push(item)
      .then(ref => {
        dispatch(
          addItem({
            id: ref.key,
            ...item
          })
        );
      });
  };
};

// REMOVE_ITEM
export const removeItem = ({ id } = {}) => ({
  type: "REMOVE_ITEM",
  id
});

export const startRemoveItem = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/items/${id}`)
      .remove()
      .then(() => {
        dispatch(removeItem({ id }));
      });
  };
};

// EDIT_ITEM
export const editItem = (id, updates) => ({
  type: "EDIT_ITEM",
  id,
  updates
});

export const startEditItem = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/items/${id}`)
      .update(updates)
      .then(() => {
        dispatch(editItem(id, updates));
      });
  };
};

// SET_ITEMS
export const setItems = items => ({
  type: "SET_ITEMS",
  items
});

export const startSetItems = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/items`)
      .once("value")
      .then(snapshot => {
        const items = [];

        snapshot.forEach(childSnapshot => {
          items.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });

        dispatch(setItems(items));
      });
  };
};
