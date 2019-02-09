// Items Reducer

const itemsReducerDefaultState = [];

export default (state = itemsReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.item];
    case "REMOVE_ITEM":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_ITEM":
      return state.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            ...action.updates
          };
        } else {
          return item;
        }
      });
    case "SET_ITEMS":
      return action.items;
    default:
      return state;
  }
};
