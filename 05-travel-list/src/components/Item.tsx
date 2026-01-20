import type {ItemType} from "./../App";

export function Item({
  item,
  removeItem,
  toggleItem,
}: {
  item: ItemType;
  removeItem: (id: number) => void;
  toggleItem: (id: number) => void;
}) {
  return (
    <li>
      <input
        type="checkbox"
        name={`itemSelect-${item.id}`}
        id={`itemSelect-${item.id}`}
        value={item.packed ? "true" : "false"}
        onChange={() => toggleItem(item.id)}
      />
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => removeItem(item.id)}>❌</button>
    </li>
  );
}
