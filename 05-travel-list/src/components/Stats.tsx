import type {ItemType} from "./../App";

export default function Stats({item}: {item: ItemType[]}) {
  const itemCount = item.length;
  if (itemCount === 0)
    return <footer className="stats">You have no items in your list.😒</footer>;
  const packedCount = item.filter((item) => item.packed).length;
  const percentage =
    itemCount === 0 ? 0 : ((packedCount * 100) / itemCount).toFixed(0);

  return (
    <footer className="stats">
      {percentage === "100"
        ? "You are ready to go! 🥳"
        : `You have
      ${itemCount} items on the List,and you already packed ${packedCount} (
      ${percentage}%).`}
    </footer>
  );
}
