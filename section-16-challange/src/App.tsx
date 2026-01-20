import {useReducer} from "react";
import Form from "./components/Form.tsx";
import "./index.css";

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

const initialState = {
  balance: 0,
  loan: 0,
  isActive: true,
  errorMessage: "",
};
interface State {
  balance: number;
  loan: number;
  isActive: boolean;
  errorMessage: string;
}
interface Action {
  type: string;
  payload?: number;
}
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "openAccount":
      return {...state, isActive: false, balance: action.payload ?? 500};
    case "deposit":
      return {...state, balance: state.balance + (action.payload ?? 0)};
    case "withdraw": {
      const amount = action.payload ?? 0;
      // Prevent withdrawal if it would cause negative balance
      if (amount > state.balance)
        return {...state, errorMessage: "Insufficient funds"};
      return {...state, balance: state.balance - amount};
    }
    case "requestLoan": {
      // Only allow loan request if there's no existing loan
      if (state.loan > 0)
        return {...state, errorMessage: "Existing loan must be paid off first"};
      const amount = action.payload ?? 0;
      return {
        ...state,
        loan: amount,
        balance: state.balance + amount,
      };
    }
    case "payLoan": {
      if (state.balance < action.payload!)
        return {...state, errorMessage: "Insufficient funds to pay loan"};
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: state.loan - action.payload!,
      };
    }
    case "closeAccount":
      if (state.loan > 0 || state.balance !== 0)
        return {
          ...state,
          errorMessage:
            "Account cannot be closed with outstanding loan or non-zero balance",
        };
      return {...initialState};
    default:
      return state;
  }
}

export default function App() {
  const [{balance, loan, isActive, errorMessage}, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({type: "openAccount", payload: 500});
        }}>
        <button type="submit" disabled={!isActive}>
          Open Account
        </button>
      </form>
      <Form
        btnName={"Deposit"}
        callback={(amount?: number) => {
          if (amount) dispatch({type: "deposit", payload: amount});
        }}
        disabled={isActive}
      />
      <Form
        btnName={"Withdraw"}
        callback={(amount?: number) => {
          if (amount) dispatch({type: "withdraw", payload: amount});
        }}
        disabled={isActive}
      />
      <Form
        btnName={"Request a loan"}
        callback={(amount?: number) => {
          if (amount) dispatch({type: "requestLoan", payload: amount});
        }}
        disabled={isActive}
      />
      <Form
        btnName={"Pay loan"}
        callback={(amount?: number) => {
          if (amount) dispatch({type: "payLoan", payload: amount});
        }}
        disabled={isActive}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({type: "closeAccount"});
        }}>
        <button type="submit" disabled={isActive}>
          Close account
        </button>
      </form>
    </div>
  );
}
