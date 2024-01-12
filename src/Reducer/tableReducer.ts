import { ADD_ROW } from "../Actions/tableActions";

const initialState: any[] = [];

const tableReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_ROW:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default tableReducer;
