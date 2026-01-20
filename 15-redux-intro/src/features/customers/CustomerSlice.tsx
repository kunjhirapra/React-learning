import {createSlice} from "@reduxjs/toolkit";

interface CustomerStates {
  fullName: string;
  nationalId: string;
  createdAt: string;
}

const InitialCustomerState: CustomerStates = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: InitialCustomerState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {fullName, nationalId, createdAt: new Date().toISOString()},
          meta: undefined,
          error: undefined,
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const customerReducer = customerSlice.reducer;
export const {createCustomer, updateName} = customerSlice.actions;

// type CustomerActions =
//   | {
//       type: "customer/createCustomer";
//       payload: {fullName: string; nationalId: string; createdAt: string};
//     }
//   | {
//       type: "customer/updateName";
//       payload: {fullName: string; nationalId: string};
//     };

// export default function customerReducer(
//   state: CustomerStates = InitialCustomerState,
//   action: any
// ): CustomerStates {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalId: action.payload.nationalId,
//         createdAt: action.payload.createdAt,
//       };
//     case "customer/updateName":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//       };
//     default:
//       return state;
//   }
// }

// export function createCustomer(
//   fullName: string,
//   nationalId: string
// ): CustomerActions {
//   return {
//     type: "customer/createCustomer",
//     payload: {fullName, nationalId, createdAt: new Date().toISOString()},
//   };
// }

// export function updateName(
//   fullName: string,
//   nationalId: string
// ): CustomerActions {
//   return {
//     type: "customer/updateName",
//     payload: {fullName, nationalId},
//   };
// }
