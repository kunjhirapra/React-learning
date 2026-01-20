import {useState} from "react";
import type {FriendListTypes} from "./App";

export function FormSplitBill({
  friend,
  onSplitBill,
}: {
  friend: FriendListTypes;
  onSplitBill: (value: number) => void;
}) {
  const [bill, setBill] = useState<string>("");
  const [paidByUser, setPaidByUser] = useState<string>("");
  const [payer, setPayer] = useState<"user" | "friend">("user");

  const billValue = Number(bill) || 0;
  const paidByUserValue = Number(paidByUser) || 0;
  const paidByFriend = billValue - paidByUserValue;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!billValue || !paidByUserValue) return;

    let value: number;
    if (payer === "user") {
      value = paidByFriend;
    } else {
      value = -paidByUserValue;
    }
    onSplitBill(value);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split the bill with {friend.name}</h2>
      <label htmlFor="billValue">💰Bill Value</label>
      <input
        type="number"
        name="billValue"
        id="billValue"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
      />
      <label htmlFor="yourExpense">💸Your Expense</label>
      <input
        type="number"
        name="yourExpense"
        id="yourExpense"
        value={paidByUser}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (value > billValue) return;
          setPaidByUser(e.target.value);
        }}
      />
      <label htmlFor="friendExpense">🤑{friend.name}'s Expense</label>
      <input
        type="number"
        name="friendExpense"
        id="friendExpense"
        disabled
        value={paidByFriend}
      />
      <label htmlFor="payer">Who's paying the bill?</label>
      <select
        name="payer"
        id="payer"
        value={payer}
        onChange={(e) => setPayer(e.target.value as "user" | "friend")}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <button className="button">Split bill</button>
    </form>
  );
}
