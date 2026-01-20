import {accountReducer} from "./features/accounts/AccountSlice";
import {configureStore} from "@reduxjs/toolkit";
import {customerReducer} from "./features/customers/CustomerSlice";

// const rootReducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
