import {useState} from "react";
import type {ItemType} from "./../App";
import {Item} from "./Item";

export default function PackingList({
  items,
  removeItem,
  toggleItem,
  resetItems,
}: {
  items: ItemType[];
  removeItem: (id: number) => void;
  toggleItem: (id: number) => void;
  resetItems: (items: ItemType[]) => void;
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems = [...items];
  if (sortBy === "description") {
    sortedItems.sort((a, b) => a.description.localeCompare(b.description));
  } else if (sortBy === "packed") {
    sortedItems.sort((a, b) => Number(a.packed) - Number(b.packed));
  } else if (sortBy === "quantity") {
    sortedItems.sort((a, b) => a.quantity - b.quantity);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            removeItem={() => removeItem(item.id)}
            toggleItem={() => toggleItem(item.id)}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          name="sortBy"
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
          <option value="quantity">Sort by quantity</option>
        </select>
        <button onClick={() => resetItems(items)}>Clear sort</button>
      </div>
    </div>
  );
}
