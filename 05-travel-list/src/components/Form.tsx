import {useState} from "react";
import type {ItemType} from "./../App";

export default function Form({
  onAddItems,
}: {
  onAddItems: (item: ItemType) => void;
}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!description) return;
    const newItem = {description, quantity, packed: false, id: Date.now()};
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
    console.log(e);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip??</h3>
      <select
        name="numbers"
        id="numbers"
        onChange={(e) => {
          console.log(e.target.value);
          setQuantity(Number(e.target.value));
        }}>
        {[...Array(20).keys()].map((num) => (
          <option key={num} value={num + 1}>
            {num + 1}
          </option>
        ))}
      </select>
      <input
        id="itemInuput"
        name="itemInuput"
        type="text"
        placeholder="e.g. boarding pass, ..."
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
