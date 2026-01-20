import {createSlice, type Dispatch} from "@reduxjs/toolkit";

interface AccountStates {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
}
const initialState: AccountStates = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(loanAmount: number, loanPurpose: string) {
        return {
          payload: {loanAmount, loanPurpose},
          meta: undefined,
          error: undefined,
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.loanAmount;
        state.balance = state.balance + action.payload.loanAmount;
        state.loanPurpose = action.payload.loanPurpose;
      },
    },
    payLoan(state) {
      if (state.loan <= 0 || state.loan > state.balance) return;
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});
export const accountReducer = accountSlice.reducer;
export const {withdraw, requestLoan, payLoan} = accountSlice.actions;

export function deposit(amount: number, currency: string) {
  if (currency === "USD") return {type: "account/deposit", payload: amount};
  return async function (dispatch: Dispatch) {
    dispatch({type: "account/convertingCurrency"});
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
    );
    const data = await res.json();
    dispatch({type: "account/deposit", payload: data.rates.USD * amount});
  };
}
// export default function accountReducer(
//   state: AccountStates = initialState,
//   action: any
// ): AccountStates {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return {...state, balance: state.balance - action.payload};
//     case "account/convertingCurrency":
//       return {...state, isLoading: true};
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.loanAmount,
//         balance: state.balance + action.payload.loanAmount,
//         loanPurpose: action.payload.loanPurpose,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: 0,
//         loanPurpose: "",
//       };
//     default:
//       return state;
//   }
// }

// export function deposit(amount: number, currency: string) {
//   if (currency === "USD") return {type: "account/deposit", payload: amount};
//   return async function (dispatch: Dispatch) {
//     dispatch({type: "account/convertingCurrency"});
//     const res = await fetch(
//       `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
//     );
//     const data = await res.json();
//     dispatch({type: "account/deposit", payload: data.rates.USD * amount});
//   };
// }
// export function withdraw(amount: number): AccountActions {
//   return {type: "account/withdraw", payload: amount};
// }
// export function requestLoan(
//   loanAmount: number,
//   loanPurpose: string
// ): AccountActions {
//   return {
//     type: "account/requestLoan",
//     payload: {loanAmount, loanPurpose},
//   };
// }
// export function payLoan(
//   loanAmount: number,
//   loanPurpose: string
// ): AccountActions {
//   return {type: "account/payLoan", payload: {loanAmount, loanPurpose}};
// }
