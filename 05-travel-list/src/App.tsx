import {useState} from "react";
import "./index.css";
import Stats from "./components/Stats";
import PackingList from "./components/PackingList";
import Logo from "./components/Logo";
import Form from "./components/Form";

export interface ItemType {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}
function App() {
  const [items, setItems] = useState<ItemType[]>([]);
  function handleAddItems(item: ItemType) {
    setItems((items) => {
      const updatedItems = [...items, item];
      console.log(updatedItems);
      return updatedItems;
    });
  }
  function handleItemRemoval(id: number) {
    setItems((items) => items.filter((currentItem) => currentItem.id !== id));
    console.log(items);
  }
  function handleToggleItem(id: number) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? {...item, packed: !item.packed} : item
      )
    );
  }
  function deleteAllItems(items: ItemType[]) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (!confirmDelete) return;
    items = [];
    setItems(items);
  }
  return (
    <>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        removeItem={handleItemRemoval}
        toggleItem={handleToggleItem}
        resetItems={deleteAllItems}
      />
      <Stats item={items} />
    </>
  );
}

export default App;
