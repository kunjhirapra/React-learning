import {useState} from "react";
import type {FriendListTypes} from "./App";
import {Button} from "./Button";

export function AddFriendForm({
  setActive,
  onAddFriend,
}: {
  setActive: (active: boolean) => void;
  onAddFriend: (friend: FriendListTypes) => void;
}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=");
  function handleClick() {
    setActive(true);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = crypto.randomUUID();
    const newFriend = {
      id: id,
      name,
      image: `${image}${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setActive(false);
  }
  function nameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function imageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImage(e.target.value);
  }

  return (
    <form action="post" className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="friendName">😑Friend Name</label>
      <input
        type="text"
        name="friendName"
        id="friendName"
        placeholder="Friend's name"
        value={name}
        onChange={nameChange}
      />
      <label htmlFor="friendImg">😶‍🌫️Image</label>
      <input
        type="text"
        name="friendImg"
        id="friendImg"
        placeholder="https://i.pravatar.cc/48?u=499476"
        value={image}
        onChange={imageChange}
      />
      <Button handleClick={handleClick}>Add</Button>
    </form>
  );
}
